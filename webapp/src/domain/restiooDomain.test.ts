import { describe, expect, it } from 'vitest';
import {
  assertPodBookable,
  calculateBookingPrice,
  createQrToken,
  createRestiooBooking,
  isQrTokenExpired,
} from './restiooDomain';

describe('Restioo booking domain', () => {
  it('prices 15, 30, 45 and 60 minute bookings from hourly rates', () => {
    const offPeakStart = new Date('2026-05-18T09:00:00+07:00');
    const peakStart = new Date('2026-05-18T12:00:00+07:00');

    expect(calculateBookingPrice({ durationMinutes: 15, startAt: offPeakStart })).toBe(12500);
    expect(calculateBookingPrice({ durationMinutes: 30, startAt: offPeakStart })).toBe(25000);
    expect(calculateBookingPrice({ durationMinutes: 45, startAt: offPeakStart })).toBe(37500);
    expect(calculateBookingPrice({ durationMinutes: 60, startAt: peakStart })).toBe(80000);
  });

  it('rejects pods that are occupied, in maintenance, or cleaning', () => {
    expect(() => assertPodBookable({ id: 'pod-2', status: 'occupied' })).toThrow(/không sẵn sàng/i);
    expect(() => assertPodBookable({ id: 'pod-3', status: 'maintenance' })).toThrow(/không sẵn sàng/i);
    expect(() => assertPodBookable({ id: 'pod-4', status: 'cleaning' })).toThrow(/không sẵn sàng/i);
    expect(assertPodBookable({ id: 'pod-1', status: 'available' })).toBe(true);
  });

  it('creates a confirmed booking with a QR token after mock payment', () => {
    const booking = createRestiooBooking({
      userId: 'user-1',
      pod: { id: 'pod-1', status: 'available' },
      locationId: 'ptit',
      durationMinutes: 30,
      startAt: new Date('2026-05-18T10:00:00+07:00'),
      paymentStatus: 'paid',
      preferences: { temperature: 24, light: 'dim', sound: 'rain' },
    });

    expect(booking.status).toBe('confirmed');
    expect(booking.price).toBe(25000);
    expect(booking.qrToken).toMatch(/^rst_/);
  });

  it('only creates QR tokens for confirmed or checked-in bookings and expires them at booking end', () => {
    const confirmed = {
      id: 'booking-1',
      status: 'confirmed' as const,
      endAt: new Date('2026-05-18T10:30:00+07:00'),
    };

    const token = createQrToken(confirmed, new Date('2026-05-18T10:00:00+07:00'));
    expect(token).toMatch(/^rst_/);
    expect(isQrTokenExpired(token, new Date('2026-05-18T10:29:00+07:00'))).toBe(false);
    expect(isQrTokenExpired(token, new Date('2026-05-18T10:31:00+07:00'))).toBe(true);
    expect(() =>
      createQrToken(
        { id: 'booking-2', status: 'pendingPayment' as const, endAt: confirmed.endAt },
        new Date('2026-05-18T10:00:00+07:00'),
      ),
    ).toThrow(/booking hợp lệ/i);
  });
});
