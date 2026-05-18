import { Building2, Mail, ShieldCheck, UsersRound } from 'lucide-react';
import type { PodStatus } from '../domain/restiooDomain';
import { useRestioo } from '../context/RestiooContext';
import { bookingStatusLabel, formatCurrency, formatDateTime, podStatusLabel, statusTone } from '../utils/format';

const podStatuses: PodStatus[] = ['available', 'occupied', 'cleaning', 'maintenance'];

export function AdminPage() {
  const { state, actions } = useRestioo();

  return (
    <div className="page-stack">
      <section className="page-heading-row">
        <div>
          <p className="utility-label">Admin</p>
          <h2>Quản trị pod, booking, liên hệ B2B và email.</h2>
        </div>
        <button type="button" className="secondary-button" onClick={actions.resetDemoData}>
          Khôi phục dữ liệu mẫu
        </button>
      </section>

      <section className="metric-grid">
        <article className="metric-card">
          <ShieldCheck size={20} />
          <p>Pod</p>
          <strong>{state.pods.length}</strong>
          <span>{state.pods.filter((pod) => pod.status === 'available').length} trống</span>
        </article>
        <article className="metric-card">
          <Building2 size={20} />
          <p>Địa điểm</p>
          <strong>{state.locations.length}</strong>
          <span>Pilot tại Hà Nội</span>
        </article>
        <article className="metric-card">
          <UsersRound size={20} />
          <p>Booking</p>
          <strong>{state.bookings.length}</strong>
          <span>{state.payments.length} payment</span>
        </article>
      </section>

      <section className="two-column wide-left">
        <div className="panel">
          <div className="panel-header">
            <h3>Trạng thái pod</h3>
          </div>
          <div className="admin-pod-grid">
            {state.pods.map((pod) => {
              const location = state.locations.find((item) => item.id === pod.locationId);
              return (
                <article className="admin-pod-card" key={pod.id}>
                  <img src={pod.image} alt={pod.name} />
                  <div>
                    <strong>{pod.name}</strong>
                    <span>{location?.name}</span>
                    <em className={`status-dot ${statusTone(pod.status)}`}>{podStatusLabel(pod.status)}</em>
                  </div>
                  <select value={pod.status} onChange={(event) => actions.updatePodStatus(pod.id, event.target.value as PodStatus)}>
                    {podStatuses.map((status) => (
                      <option value={status} key={status}>
                        {podStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </article>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <h3>Lead B2B</h3>
          <div className="timeline-list">
            {state.b2bLeads.map((lead) => (
              <article key={lead.id}>
                <Mail size={18} />
                <div>
                  <strong>{lead.companyName}</strong>
                  <span>
                    {lead.contactName} · {lead.email}
                  </span>
                </div>
              </article>
            ))}
            {state.b2bLeads.length === 0 ? <div className="empty-state">Chưa có liên hệ B2B.</div> : null}
          </div>
          <h3>Email đăng ký</h3>
          <div className="timeline-list">
            {state.newsletterSignups.map((signup) => (
              <article key={signup.id}>
                <Mail size={18} />
                <div>
                  <strong>{signup.email}</strong>
                  <span>{formatDateTime(signup.createdAt)}</span>
                </div>
              </article>
            ))}
            {state.newsletterSignups.length === 0 ? <div className="empty-state">Chưa có email đăng ký.</div> : null}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Booking</h3>
        </div>
        <div className="booking-table">
          {state.bookings.map((booking) => {
            const pod = state.pods.find((item) => item.id === booking.podId);
            const user = state.users.find((item) => item.id === booking.userId);
            return (
              <article className="booking-row" key={booking.id}>
                <div>
                  <strong>{pod?.name ?? booking.podId}</strong>
                  <span>{user?.email ?? booking.userId}</span>
                </div>
                <div>
                  <span>{formatDateTime(booking.startAt)}</span>
                  <small>{booking.durationMinutes} phút</small>
                </div>
                <div>
                  <strong>{formatCurrency(booking.price)}</strong>
                  <em>{bookingStatusLabel(booking.status)}</em>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
