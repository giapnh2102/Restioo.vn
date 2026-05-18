import type { BookingStatus, PodStatus } from '../domain/restiooDomain';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(value: Date): string {
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(value);
}

export function podStatusLabel(status: PodStatus): string {
  const labels: Record<PodStatus, string> = {
    available: 'Trống',
    occupied: 'Đang dùng',
    maintenance: 'Bảo trì',
    cleaning: 'Đang làm sạch',
  };
  return labels[status];
}

export function bookingStatusLabel(status: BookingStatus): string {
  const labels: Record<BookingStatus, string> = {
    pendingPayment: 'Chờ thanh toán',
    confirmed: 'Đã xác nhận',
    checkedIn: 'Đang sử dụng',
    completed: 'Hoàn tất',
    cancelled: 'Đã hủy',
    expired: 'Hết hạn',
  };
  return labels[status];
}

export function statusTone(status: PodStatus | BookingStatus): string {
  if (status === 'available' || status === 'confirmed' || status === 'completed') return 'good';
  if (status === 'occupied' || status === 'checkedIn') return 'active';
  if (status === 'maintenance' || status === 'cancelled' || status === 'expired') return 'danger';
  return 'muted';
}
