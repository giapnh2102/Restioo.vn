import { Link } from 'react-router-dom';
import { CalendarCheck, MapPinned, QrCode, TimerReset } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { useRestioo } from '../context/RestiooContext';
import { bookingStatusLabel, formatCurrency, formatDateTime, podStatusLabel, statusTone } from '../utils/format';

export function DashboardPage() {
  const { state } = useRestioo();
  const user = state.currentUser;
  const userBookings = state.bookings.filter((booking) => booking.userId === user?.id);
  const nextBooking = userBookings.find((booking) => booking.status === 'confirmed' || booking.status === 'checkedIn');
  const availablePods = state.pods.filter((pod) => pod.status === 'available');
  const membership = state.membershipPlans.find((plan) => plan.id === user?.membershipPlanId);

  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <p className="utility-label">Home</p>
          <h2>Chọn pod gần nhất và nhận QR check-in ngay sau thanh toán.</h2>
          <p>
            Quản lý trọn vẹn hành trình nghỉ ngắn hạn: tìm pod trống, đặt chỗ, nhận QR, xem lịch sử
            và theo dõi hội viên.
          </p>
          <Link className="primary-button" to="/app/bookings/new">
            Đặt chỗ nhanh
          </Link>
        </div>
        <div className="quick-book-card">
          <QrCode size={30} />
          <strong>{nextBooking ? bookingStatusLabel(nextBooking.status) : 'Sẵn sàng đặt pod'}</strong>
          <span>{nextBooking ? formatDateTime(nextBooking.startAt) : 'Chọn thời lượng 15/30/45/60 phút'}</span>
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard label="Pod trống" value={String(availablePods.length)} detail="Có thể đặt ngay" />
        <MetricCard label="Phiên của bạn" value={String(userBookings.length)} detail="Bao gồm lịch sử và sắp tới" />
        <MetricCard
          label="Hội viên"
          value={membership?.name ?? 'Linh hoạt'}
          detail={`${user?.remainingMinutes ?? 0} phút còn lại`}
        />
      </section>

      <section className="two-column">
        <div className="panel">
          <div className="panel-header">
            <h3>Pod gần nhất</h3>
            <Link to="/app/map">Xem tất cả</Link>
          </div>
          <div className="pod-list compact">
            {state.pods.slice(0, 4).map((pod) => {
              const location = state.locations.find((item) => item.id === pod.locationId);
              return (
                <Link className="pod-row" key={pod.id} to={`/app/pods/${pod.id}`}>
                  <img src={pod.image} alt={pod.name} />
                  <div>
                    <strong>{pod.name}</strong>
                    <span>{location?.name}</span>
                  </div>
                  <em className={`status-dot ${statusTone(pod.status)}`}>{podStatusLabel(pod.status)}</em>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Phiên gần đây</h3>
            <Link to="/app/history">Lịch sử</Link>
          </div>
          <div className="timeline-list">
            {userBookings.slice(0, 4).map((booking) => {
              const pod = state.pods.find((item) => item.id === booking.podId);
              return (
                <article key={booking.id}>
                  <CalendarCheck size={18} />
                  <div>
                    <strong>{pod?.name ?? booking.podId}</strong>
                    <span>
                      {booking.durationMinutes} phút · {formatCurrency(booking.price)}
                    </span>
                  </div>
                  <em>{bookingStatusLabel(booking.status)}</em>
                </article>
              );
            })}
            {userBookings.length === 0 ? (
              <div className="empty-state">
                <TimerReset size={24} />
                <span>Chưa có phiên nghỉ nào.</span>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
