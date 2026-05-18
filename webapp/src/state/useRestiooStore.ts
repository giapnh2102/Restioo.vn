import { useEffect, useMemo, useState } from 'react';
import {
  assertPodBookable,
  createQrToken,
  createRestiooBooking,
  isQrTokenExpired,
  readQrPayload,
  type BookingDuration,
  type BookingPreferences,
  type PodStatus,
} from '../domain/restiooDomain';
import { initialRestiooState } from '../data/restiooData';
import type { B2BLead, Booking, NewsletterSignup, RestiooState, RestiooUser } from '../types';

const STORAGE_KEY = 'restioo-webapp-state-v1';

interface BookingDraft {
  podId: string;
  durationMinutes: BookingDuration;
  preferences: BookingPreferences;
}

interface ProfileInput {
  displayName: string;
  phone: string;
  defaultPreferences: BookingPreferences;
}

interface LeadInput {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
}

export function useRestiooStore() {
  const [state, setState] = useState<RestiooState>(() => loadState());
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const actions = useMemo(
    () => ({
      signIn(email: string, password: string) {
        if (!email.trim() || password.length < 4) {
          setLastError('Email và mật khẩu tối thiểu 4 ký tự là bắt buộc.');
          return;
        }

        setState((current) => {
          const normalizedEmail = email.trim().toLowerCase();
          const existing = current.users.find((user) => user.email === normalizedEmail);
          const user =
            existing ??
            createUser({
              email: normalizedEmail,
              role: normalizedEmail.includes('admin') ? 'admin' : 'customer',
            });

          return {
            ...current,
            currentUser: user,
            users: existing ? current.users : [...current.users, user],
          };
        });
        setLastError(null);
      },
      signOut() {
        setState((current) => ({ ...current, currentUser: null }));
      },
      createBooking(input: BookingDraft): Booking | null {
        let created: Booking | null = null;

        setState((current) => {
          if (!current.currentUser) {
            setLastError('Bạn cần đăng nhập trước khi đặt chỗ.');
            return current;
          }

          const pod = current.pods.find((item) => item.id === input.podId);
          if (!pod) {
            setLastError('Không tìm thấy pod đã chọn.');
            return current;
          }

          try {
            assertPodBookable(pod);
          } catch (error) {
            setLastError(error instanceof Error ? error.message : 'Pod không sẵn sàng.');
            return current;
          }

          const booking = createRestiooBooking({
            userId: current.currentUser.id,
            pod,
            locationId: pod.locationId,
            durationMinutes: input.durationMinutes,
            startAt: new Date(),
            paymentStatus: 'paid',
            preferences: input.preferences,
          });
          const payment = {
            id: `pay_${booking.id}`,
            bookingId: booking.id,
            userId: current.currentUser.id,
            amount: booking.price,
            method: 'mock' as const,
            status: 'paid' as const,
            createdAt: new Date(),
          };

          created = booking;
          setLastError(null);

          return {
            ...current,
            bookings: [booking, ...current.bookings],
            payments: [payment, ...current.payments],
          };
        });

        return created;
      },
      checkIn(bookingId: string, token: string) {
        setState((current) => {
          const booking = current.bookings.find((item) => item.id === bookingId);
          if (!booking) {
            setLastError('Không tìm thấy booking.');
            return current;
          }

          try {
            const payload = readQrPayload(token);
            if (payload.bookingId !== bookingId || isQrTokenExpired(token, new Date())) {
              setLastError('QR đã hết hạn hoặc không đúng booking.');
              return current;
            }
          } catch (error) {
            setLastError(error instanceof Error ? error.message : 'QR không hợp lệ.');
            return current;
          }

          setLastError(null);
          return {
            ...current,
            bookings: current.bookings.map((item) =>
              item.id === bookingId ? { ...item, status: 'checkedIn' } : item,
            ),
            pods: current.pods.map((pod) =>
              pod.id === booking.podId
                ? { ...pod, status: 'occupied', currentBookingId: bookingId }
                : pod,
            ),
          };
        });
      },
      completeBooking(bookingId: string) {
        setState((current) => {
          const booking = current.bookings.find((item) => item.id === bookingId);
          if (!booking) return current;

          return {
            ...current,
            bookings: current.bookings.map((item) =>
              item.id === bookingId ? { ...item, status: 'completed' } : item,
            ),
            pods: current.pods.map((pod) =>
              pod.id === booking.podId
                ? { ...pod, status: 'cleaning', currentBookingId: undefined }
                : pod,
            ),
          };
        });
      },
      updatePodStatus(podId: string, status: PodStatus) {
        setState((current) => ({
          ...current,
          pods: current.pods.map((pod) =>
            pod.id === podId
              ? { ...pod, status, currentBookingId: status === 'occupied' ? pod.currentBookingId : undefined }
              : pod,
          ),
        }));
      },
      saveProfile(input: ProfileInput) {
        setState((current) => {
          if (!current.currentUser) return current;

          const updatedUser = {
            ...current.currentUser,
            displayName: input.displayName,
            phone: input.phone,
            defaultPreferences: input.defaultPreferences,
          };

          return {
            ...current,
            currentUser: updatedUser,
            users: current.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
          };
        });
      },
      purchaseMembership(planId: string) {
        setState((current) => {
          if (!current.currentUser) return current;
          const plan = current.membershipPlans.find((item) => item.id === planId);
          if (!plan) return current;

          const updatedUser = {
            ...current.currentUser,
            membershipPlanId: plan.id,
            remainingMinutes: current.currentUser.remainingMinutes + plan.hours * 60,
          };

          return {
            ...current,
            currentUser: updatedUser,
            users: current.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
            payments:
              plan.price > 0
                ? [
                    {
                      id: `pay_plan_${Date.now()}`,
                      bookingId: `membership_${plan.id}`,
                      userId: updatedUser.id,
                      amount: plan.price,
                      method: 'mock',
                      status: 'paid',
                      createdAt: new Date(),
                    },
                    ...current.payments,
                  ]
                : current.payments,
          };
        });
      },
      addB2BLead(input: LeadInput) {
        const lead: B2BLead = {
          id: `lead_${Date.now()}`,
          ...input,
          createdAt: new Date(),
        };
        setState((current) => ({ ...current, b2bLeads: [lead, ...current.b2bLeads] }));
      },
      addNewsletterSignup(email: string) {
        const signup: NewsletterSignup = {
          id: `signup_${Date.now()}`,
          email,
          createdAt: new Date(),
        };
        setState((current) => ({
          ...current,
          newsletterSignups: [signup, ...current.newsletterSignups],
        }));
      },
      resetDemoData() {
        setState(initialRestiooState);
        setLastError(null);
      },
      refreshQrToken(bookingId: string) {
        setState((current) => ({
          ...current,
          bookings: current.bookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, qrToken: createQrToken(booking, new Date()) }
              : booking,
          ),
        }));
      },
    }),
    [],
  );

  return { state, actions, lastError };
}

function createUser(input: { email: string; role: RestiooUser['role'] }): RestiooUser {
  return {
    id: input.role === 'admin' ? `admin_${Date.now()}` : `user_${Date.now()}`,
    displayName: input.email.split('@')[0] || 'Restioo User',
    email: input.email,
    phone: '',
    role: input.role,
    membershipPlanId: 'starter',
    remainingMinutes: 0,
    defaultPreferences: { temperature: 24, light: 'dim', sound: 'rain' },
  };
}

function loadState(): RestiooState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return initialRestiooState;

  try {
    return reviveState(JSON.parse(raw) as RestiooState);
  } catch {
    return initialRestiooState;
  }
}

function reviveState(state: RestiooState): RestiooState {
  return {
    ...state,
    bookings: state.bookings.map((booking) => ({
      ...booking,
      startAt: new Date(booking.startAt),
      endAt: new Date(booking.endAt),
      createdAt: new Date(booking.createdAt),
    })),
    payments: state.payments.map((payment) => ({
      ...payment,
      createdAt: new Date(payment.createdAt),
    })),
    b2bLeads: state.b2bLeads.map((lead) => ({
      ...lead,
      createdAt: new Date(lead.createdAt),
    })),
    newsletterSignups: state.newsletterSignups.map((signup) => ({
      ...signup,
      createdAt: new Date(signup.createdAt),
    })),
  };
}
