import { Link, Navigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, QrCode, TimerReset } from 'lucide-react';
import { useRestioo } from '../context/RestiooContext';
import { bookingStatusLabel, formatDateTime } from '../utils/format';

export function QrCheckInPage() {
  const { bookingId } = useParams();
  const { state, actions } = useRestioo();
  const booking = state.bookings.find((item) => item.id === bookingId);

  if (!booking) {
    return <Navigate to="/app/history" replace />;
  }

  const pod = state.pods.find((item) => item.id === booking.podId);
  const location = state.locations.find((item) => item.id === booking.locationId);
  const token = booking.qrToken ?? '';

  return (
    <div className="page-stack">
      <section className="qr-layout">
        <div className="qr-card">
          <QrCode size={28} />
          <h2>QR check-in</h2>
          <div className="qr-box">{token ? <QRCodeSVG value={token} size={220} /> : <span>Không có QR</span>}</div>
          <code>{token}</code>
          <div className="hero-actions centered">
            <button className="primary-button" type="button" onClick={() => actions.checkIn(booking.id, token)}>
              Check-in
            </button>
            <button className="secondary-button" type="button" onClick={() => actions.completeBooking(booking.id)}>
              Kết thúc phiên
            </button>
          </div>
        </div>

        <div className="panel">
          <p className="utility-label">Booking</p>
          <h2>{pod?.name}</h2>
          <dl className="info-list">
            <div>
              <dt>Địa điểm</dt>
              <dd>{location?.name}</dd>
            </div>
            <div>
              <dt>Trạng thái</dt>
              <dd>{bookingStatusLabel(booking.status)}</dd>
            </div>
            <div>
              <dt>Bắt đầu</dt>
              <dd>{formatDateTime(booking.startAt)}</dd>
            </div>
            <div>
              <dt>Kết thúc</dt>
              <dd>{formatDateTime(booking.endAt)}</dd>
            </div>
          </dl>
          <div className="timeline-list">
            <article>
              <CheckCircle2 size={18} />
              <div>
                <strong>Thanh toán</strong>
                <span>Đã ghi nhận thanh toán thành công</span>
              </div>
            </article>
            <article>
              <TimerReset size={18} />
              <div>
                <strong>Tự động hết hạn</strong>
                <span>QR hợp lệ đến thời điểm kết thúc phiên</span>
              </div>
            </article>
          </div>
          <Link className="secondary-button full" to="/app/history">
            Xem lịch sử
          </Link>
        </div>
      </section>
    </div>
  );
}
