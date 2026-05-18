import { Link } from 'react-router-dom';
import { History, QrCode } from 'lucide-react';
import { useRestioo } from '../context/RestiooContext';
import { bookingStatusLabel, formatCurrency, formatDateTime, statusTone } from '../utils/format';

export function HistoryPage() {
  const { state } = useRestioo();
  const bookings = state.bookings.filter((booking) => booking.userId === state.currentUser?.id);

  return (
    <div className="page-stack">
      <section className="page-heading-row">
        <div>
          <p className="utility-label">History</p>
          <h2>Lịch sử phiên nghỉ và booking sắp tới.</h2>
        </div>
        <Link className="primary-button" to="/app/bookings/new">
          Đặt phiên mới
        </Link>
      </section>

      <section className="panel">
        <div className="booking-table">
          {bookings.map((booking) => {
            const pod = state.pods.find((item) => item.id === booking.podId);
            const location = state.locations.find((item) => item.id === booking.locationId);
            return (
              <article className="booking-row" key={booking.id}>
                <div className="booking-icon">
                  <History size={18} />
                </div>
                <div>
                  <strong>{pod?.name ?? booking.podId}</strong>
                  <span>{location?.name}</span>
                </div>
                <div>
                  <span>{formatDateTime(booking.startAt)}</span>
                  <small>{booking.durationMinutes} phút</small>
                </div>
                <div>
                  <strong>{formatCurrency(booking.price)}</strong>
                  <em className={`status-dot ${statusTone(booking.status)}`}>{bookingStatusLabel(booking.status)}</em>
                </div>
                {booking.qrToken && booking.status !== 'completed' ? (
                  <Link className="icon-button" to={`/app/bookings/${booking.id}/qr`} aria-label="QR">
                    <QrCode size={18} />
                  </Link>
                ) : (
                  <span />
                )}
              </article>
            );
          })}
          {bookings.length === 0 ? <div className="empty-state">Chưa có booking nào.</div> : null}
        </div>
      </section>
    </div>
  );
}
