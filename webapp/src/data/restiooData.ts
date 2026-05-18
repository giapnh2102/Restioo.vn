import type {
  B2BLead,
  Booking,
  Location,
  MembershipPlan,
  NewsletterSignup,
  Payment,
  Pod,
  RestiooState,
  RestiooUser,
} from '../types';

export const companyProfile = {
  legalName: 'CÔNG TY TRÁCH NHIỆM HỮU HẠN RESTIOO',
  shortName: 'RESTIOO CO., LTD.',
  address: 'TP. Hà Nội',
  taxCode: 'Đang hoàn tất đăng ký',
  phone: 'Đang cập nhật',
  email: 'info@restioo.vn',
  mission:
    'Cung cấp không gian nghỉ ngắn hạn riêng tư, hiện đại và dễ tiếp cận cho người học tập, làm việc cường độ cao tại đô thị.',
  vision:
    'Trở thành mô hình nghỉ ngắn hạn thông minh tại đô thị, giúp người dùng phục hồi năng lượng nhanh, an toàn và văn minh.',
  values: [
    'Không gian tiêu chuẩn',
    'Cá nhân hóa trải nghiệm',
    'Công nghệ đặt chỗ ưu việt',
    'Hỗ trợ sức khỏe tối ưu',
    'Vị trí và giá cả linh hoạt',
  ],
  founders: [
    { name: 'Nguyễn Thế Hoàng Nam', capital: '200.000.000 VNĐ', ownership: '40%' },
    { name: 'Đoàn Ngọc Đức', capital: '150.000.000 VNĐ', ownership: '30%' },
    { name: 'Đỗ Thị Thu Trang', capital: '150.000.000 VNĐ', ownership: '30%' },
  ],
};

export const demoUsers: RestiooUser[] = [
  {
    id: 'user-demo',
    displayName: 'Khách hàng Restioo',
    email: 'demo@restioo.vn',
    phone: '0900000000',
    role: 'customer',
    membershipPlanId: 'starter',
    remainingMinutes: 180,
    defaultPreferences: { temperature: 24, light: 'dim', sound: 'rain' },
  },
  {
    id: 'admin-demo',
    displayName: 'Quản trị Restioo',
    email: 'admin@restioo.vn',
    phone: '0900000001',
    role: 'admin',
    membershipPlanId: 'business',
    remainingMinutes: 1200,
    defaultPreferences: { temperature: 23, light: 'soft', sound: 'deep-focus' },
  },
];

export const locations: Location[] = [
  {
    id: 'ptit',
    name: 'Restioo PTIT Pilot',
    address: 'Học viện Công nghệ Bưu chính Viễn thông, Hà Đông',
    type: 'campus',
    district: 'Hà Đông',
    distanceKm: 1.2,
    coordinates: { lat: 20.9808, lng: 105.7871 },
  },
  {
    id: 'office-central',
    name: 'Restioo Office Central',
    address: 'Tòa nhà văn phòng khu trung tâm Hà Nội',
    type: 'office',
    district: 'Cầu Giấy',
    distanceKm: 3.8,
    coordinates: { lat: 21.0357, lng: 105.7906 },
  },
  {
    id: 'coworking-hub',
    name: 'Restioo Coworking Hub',
    address: 'Không gian làm việc chung khu vực Thanh Xuân',
    type: 'coworking',
    district: 'Thanh Xuân',
    distanceKm: 5.1,
    coordinates: { lat: 20.995, lng: 105.8044 },
  },
];

export const pods: Pod[] = [
  {
    id: 'ptit-a1',
    locationId: 'ptit',
    name: 'PTIT Pod A1',
    status: 'available',
    amenities: ['Đèn dịu mắt', 'Lọc khí', 'Âm thanh thư giãn'],
    image: '/image/sleepbox2.jpg',
    airQuality: 96,
    temperature: 24,
  },
  {
    id: 'ptit-a2',
    locationId: 'ptit',
    name: 'PTIT Pod A2',
    status: 'occupied',
    amenities: ['Chống ồn', 'Khử khuẩn UV', 'Sạc USB-C'],
    image: '/image/sleepbox3.jpg',
    airQuality: 91,
    temperature: 23,
    currentBookingId: 'seed-active',
  },
  {
    id: 'ptit-a3',
    locationId: 'ptit',
    name: 'PTIT Pod A3',
    status: 'cleaning',
    amenities: ['Tự làm sạch', 'Đèn đọc sách', 'Điều hòa riêng'],
    image: '/image/sleepbox4.jpg',
    airQuality: 88,
    temperature: 25,
  },
  {
    id: 'office-b1',
    locationId: 'office-central',
    name: 'Office Pod B1',
    status: 'available',
    amenities: ['Không gian riêng tư', 'Đánh thức nhẹ', 'Tủ đồ mini'],
    image: '/image/sleepbox5.jpg',
    airQuality: 97,
    temperature: 24,
  },
  {
    id: 'office-b2',
    locationId: 'office-central',
    name: 'Office Pod B2',
    status: 'maintenance',
    amenities: ['IoT lock', 'Cảm biến CO2', 'Âm nền'],
    image: '/image/sleep-box-6.jpg',
    airQuality: 82,
    temperature: 24,
  },
  {
    id: 'cowork-c1',
    locationId: 'coworking-hub',
    name: 'Cowork Pod C1',
    status: 'available',
    amenities: ['Đặt chỗ nhanh', 'Lọc khí HEPA', 'Đèn ngủ'],
    image: '/image/BG2.jpg',
    airQuality: 94,
    temperature: 23,
  },
];

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'starter',
    name: 'Linh hoạt',
    hours: 0,
    price: 0,
    description: 'Trả theo từng phiên nghỉ.',
    benefits: ['Đặt pod theo nhu cầu', 'QR check-in', 'Lưu lịch sử phiên nghỉ'],
    discountPercent: 0,
  },
  {
    id: 'ten-hour',
    name: '10 giờ phục hồi',
    hours: 10,
    price: 350_000,
    description: 'Phù hợp sinh viên và nhân sự dùng đều mỗi tuần.',
    benefits: ['10 giờ sử dụng', 'Ưu tiên pod trống', 'Giảm 8% booking lẻ'],
    discountPercent: 8,
  },
  {
    id: 'twenty-hour',
    name: '20 giờ năng lượng',
    hours: 20,
    price: 600_000,
    description: 'Tối ưu cho người dùng thường xuyên và nhóm nhỏ.',
    benefits: ['20 giờ sử dụng', 'Ưu tiên giờ cao điểm', 'Giảm 12% booking lẻ'],
    discountPercent: 12,
  },
  {
    id: 'business',
    name: 'Doanh nghiệp',
    hours: 80,
    price: 0,
    description: 'Gói B2B theo vị trí, số lượng pod và SLA vận hành.',
    benefits: ['Dashboard quản trị', 'Báo cáo sử dụng', 'Hỗ trợ triển khai tại văn phòng'],
    discountPercent: 15,
  },
];

export const initialBookings: Booking[] = [
  {
    id: 'seed-active',
    userId: 'user-demo',
    podId: 'ptit-a2',
    locationId: 'ptit',
    startAt: minutesFromNow(-15),
    endAt: minutesFromNow(15),
    durationMinutes: 30,
    price: 25_000,
    paymentStatus: 'paid',
    preferences: { temperature: 24, light: 'dim', sound: 'rain' },
    status: 'checkedIn',
    qrToken: 'rst_seed_active_session',
    createdAt: minutesFromNow(-20),
  },
  {
    id: 'seed-history',
    userId: 'user-demo',
    podId: 'office-b1',
    locationId: 'office-central',
    startAt: daysFromNow(-2),
    endAt: new Date(daysFromNow(-2).getTime() + 45 * 60_000),
    durationMinutes: 45,
    price: 37_500,
    paymentStatus: 'paid',
    preferences: { temperature: 23, light: 'soft', sound: 'silent' },
    status: 'completed',
    qrToken: 'rst_seed_history',
    createdAt: daysFromNow(-2),
  },
];

export const initialPayments: Payment[] = [
  {
    id: 'pay-seed-active',
    bookingId: 'seed-active',
    userId: 'user-demo',
    amount: 25_000,
    method: 'mock',
    status: 'paid',
    createdAt: minutesFromNow(-20),
  },
  {
    id: 'pay-seed-history',
    bookingId: 'seed-history',
    userId: 'user-demo',
    amount: 37_500,
    method: 'mock',
    status: 'paid',
    createdAt: daysFromNow(-2),
  },
];

export const initialB2BLeads: B2BLead[] = [];
export const initialNewsletterSignups: NewsletterSignup[] = [];

export const initialRestiooState: RestiooState = {
  currentUser: null,
  users: demoUsers,
  locations,
  pods,
  bookings: initialBookings,
  payments: initialPayments,
  membershipPlans,
  b2bLeads: initialB2BLeads,
  newsletterSignups: initialNewsletterSignups,
};

function minutesFromNow(minutes: number): Date {
  return new Date(Date.now() + minutes * 60_000);
}

function daysFromNow(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60_000);
}
