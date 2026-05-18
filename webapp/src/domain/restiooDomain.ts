export type PodStatus = 'available' | 'occupied' | 'maintenance' | 'cleaning';
export type BookingStatus =
  | 'pendingPayment'
  | 'confirmed'
  | 'checkedIn'
  | 'completed'
  | 'cancelled'
  | 'expired';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type BookingDuration = 15 | 30 | 45 | 60;

export interface BookablePod {
  id: string;
  status: PodStatus;
}

export interface BookingPreferences {
  temperature: number;
  light: 'soft' | 'dim' | 'focus';
  sound: 'rain' | 'deep-focus' | 'silent';
}

export interface BookingLike {
  id: string;
  status: BookingStatus;
  endAt: Date;
}

export interface RestiooBooking extends BookingLike {
  userId: string;
  podId: string;
  locationId: string;
  startAt: Date;
  durationMinutes: BookingDuration;
  price: number;
  paymentStatus: PaymentStatus;
  preferences: BookingPreferences;
  qrToken?: string;
  createdAt: Date;
}

export interface PriceInput {
  durationMinutes: BookingDuration;
  startAt: Date;
  membershipDiscountPercent?: number;
}

export interface CreateBookingInput {
  userId: string;
  pod: BookablePod;
  locationId: string;
  durationMinutes: BookingDuration;
  startAt: Date;
  paymentStatus: PaymentStatus;
  preferences: BookingPreferences;
}

const OFF_PEAK_RATE_PER_HOUR = 50_000;
const PEAK_RATE_PER_HOUR = 80_000;

export function getVietnamHour(date: Date): number {
  return (date.getUTCHours() + 7) % 24;
}

export function isPeakHour(date: Date): boolean {
  const hour = getVietnamHour(date);
  return hour >= 11 && hour < 14;
}

export function calculateBookingPrice(input: PriceInput): number {
  const hourlyRate = isPeakHour(input.startAt) ? PEAK_RATE_PER_HOUR : OFF_PEAK_RATE_PER_HOUR;
  const gross = hourlyRate * (input.durationMinutes / 60);
  const discount = input.membershipDiscountPercent ?? 0;
  return Math.round(gross * (1 - discount / 100));
}

export function assertPodBookable(pod: BookablePod): true {
  if (pod.status !== 'available') {
    throw new Error(`Pod ${pod.id} không sẵn sàng để đặt chỗ.`);
  }

  return true;
}

export function createRestiooBooking(input: CreateBookingInput): RestiooBooking {
  assertPodBookable(input.pod);

  const endAt = new Date(input.startAt.getTime() + input.durationMinutes * 60_000);
  const status: BookingStatus = input.paymentStatus === 'paid' ? 'confirmed' : 'pendingPayment';
  const booking: RestiooBooking = {
    id: createBookingId(input.userId, input.pod.id, input.startAt),
    userId: input.userId,
    podId: input.pod.id,
    locationId: input.locationId,
    startAt: input.startAt,
    endAt,
    durationMinutes: input.durationMinutes,
    price: calculateBookingPrice({
      durationMinutes: input.durationMinutes,
      startAt: input.startAt,
    }),
    paymentStatus: input.paymentStatus,
    preferences: input.preferences,
    status,
    createdAt: new Date(),
  };

  if (booking.status === 'confirmed') {
    booking.qrToken = createQrToken(booking, booking.createdAt);
  }

  return booking;
}

export function createQrToken(booking: BookingLike, issuedAt: Date): string {
  if (booking.status !== 'confirmed' && booking.status !== 'checkedIn') {
    throw new Error('QR chỉ được sinh cho booking hợp lệ đã xác nhận.');
  }

  const payload = {
    bookingId: booking.id,
    exp: booking.endAt.getTime(),
    iat: issuedAt.getTime(),
  };

  return `rst_${toBase64Url(JSON.stringify(payload))}`;
}

export function isQrTokenExpired(token: string, at: Date): boolean {
  const payload = readQrPayload(token);
  return at.getTime() > payload.exp;
}

export function readQrPayload(token: string): { bookingId: string; exp: number; iat: number } {
  if (!token.startsWith('rst_')) {
    throw new Error('QR token không đúng định dạng Restioo.');
  }

  const raw = fromBase64Url(token.slice(4));
  const payload = JSON.parse(raw) as { bookingId: string; exp: number; iat: number };

  if (!payload.bookingId || !payload.exp || !payload.iat) {
    throw new Error('QR token thiếu dữ liệu hợp lệ.');
  }

  return payload;
}

export function hasTimeOverlap(
  first: { startAt: Date; endAt: Date },
  second: { startAt: Date; endAt: Date },
): boolean {
  return first.startAt < second.endAt && second.startAt < first.endAt;
}

function createBookingId(userId: string, podId: string, startAt: Date): string {
  const source = `${userId}-${podId}-${startAt.toISOString()}-${Math.random().toString(36).slice(2, 8)}`;
  return `bk_${toBase64Url(source).slice(0, 18)}`;
}

function toBase64Url(value: string): string {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string): string {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), '=');
  return atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
}
