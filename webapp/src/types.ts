import type {
  BookingDuration,
  BookingPreferences,
  BookingStatus,
  PaymentStatus,
  PodStatus,
} from './domain/restiooDomain';

export type UserRole = 'customer' | 'admin';

export interface RestiooUser {
  id: string;
  displayName: string;
  email: string;
  phone: string;
  role: UserRole;
  membershipPlanId: string;
  remainingMinutes: number;
  defaultPreferences: BookingPreferences;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'campus' | 'office' | 'coworking';
  district: string;
  distanceKm: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Pod {
  id: string;
  locationId: string;
  name: string;
  status: PodStatus;
  amenities: string[];
  image: string;
  airQuality: number;
  temperature: number;
  currentBookingId?: string;
}

export interface Booking {
  id: string;
  userId: string;
  podId: string;
  locationId: string;
  startAt: Date;
  endAt: Date;
  durationMinutes: BookingDuration;
  price: number;
  paymentStatus: PaymentStatus;
  preferences: BookingPreferences;
  status: BookingStatus;
  qrToken?: string;
  createdAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: 'mock' | 'momo' | 'zalopay' | 'card';
  status: PaymentStatus;
  createdAt: Date;
}

export interface MembershipPlan {
  id: string;
  name: string;
  hours: number;
  price: number;
  description: string;
  benefits: string[];
  discountPercent: number;
}

export interface B2BLead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

export interface NewsletterSignup {
  id: string;
  email: string;
  createdAt: Date;
}

export interface RestiooState {
  currentUser: RestiooUser | null;
  users: RestiooUser[];
  locations: Location[];
  pods: Pod[];
  bookings: Booking[];
  payments: Payment[];
  membershipPlans: MembershipPlan[];
  b2bLeads: B2BLead[];
  newsletterSignups: NewsletterSignup[];
}
