import { Link, Navigate, useParams } from 'react-router-dom';
import { Fan, Leaf, MapPinned, ShieldCheck, SlidersHorizontal, Thermometer } from 'lucide-react';
import { useRestioo } from '../context/RestiooContext';
import { podStatusLabel, statusTone } from '../utils/format';

export function PodDetailPage() {
  const { podId } = useParams();
  const { state } = useRestioo();
  const pod = state.pods.find((item) => item.id === podId);

  if (!pod) {
    return <Navigate to="/app/map" replace />;
  }

  const location = state.locations.find((item) => item.id === pod.locationId);

  return (
    <div className="page-stack">
      <section className="detail-hero">
        <img src={pod.image} alt={pod.name} />
        <div>
          <p className="utility-label">Pod Detail</p>
          <h2>{pod.name}</h2>
          <p>
            <MapPinned size={16} /> {location?.name} · {location?.address}
          </p>
          <em className={`status-dot ${statusTone(pod.status)}`}>{podStatusLabel(pod.status)}</em>
          <div className="hero-actions">
            <Link className="primary-button" to={`/app/bookings/new?pod=${pod.id}`}>
              Đặt pod này
            </Link>
            <Link className="secondary-button" to="/app/map">
              Xem pod khác
            </Link>
          </div>
        </div>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <Thermometer size={20} />
          <p>Nhiệt độ</p>
          <strong>{pod.temperature}°C</strong>
          <span>Điều chỉnh khi booking</span>
        </article>
        <article className="metric-card">
          <Leaf size={20} />
          <p>Không khí</p>
          <strong>{pod.airQuality}%</strong>
          <span>Lọc khí đang hoạt động</span>
        </article>
        <article className="metric-card">
          <ShieldCheck size={20} />
          <p>Quyền riêng tư</p>
          <strong>100%</strong>
          <span>Check-in bằng QR</span>
        </article>
      </section>

      <section className="two-column">
        <div className="panel">
          <h3>Tiện ích</h3>
          <div className="value-row left">
            {pod.amenities.map((amenity) => (
              <span key={amenity}>
                <Fan size={16} /> {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="panel">
          <h3>Cấu hình hỗ trợ</h3>
          <div className="settings-preview">
            <span>
              <SlidersHorizontal size={16} /> Ánh sáng: soft/dim/focus
            </span>
            <span>Âm thanh: rain/deep-focus/silent</span>
            <span>Thời lượng: 15, 30, 45 hoặc 60 phút</span>
          </div>
        </div>
      </section>
    </div>
  );
}
