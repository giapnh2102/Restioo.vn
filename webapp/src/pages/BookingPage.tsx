import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CalendarCheck, CreditCard, SlidersHorizontal } from 'lucide-react';
import { calculateBookingPrice, type BookingDuration, type BookingPreferences } from '../domain/restiooDomain';
import { useRestioo } from '../context/RestiooContext';
import { formatCurrency, podStatusLabel, statusTone } from '../utils/format';

const durations: BookingDuration[] = [15, 30, 45, 60];

export function BookingPage() {
  const { state, actions } = useRestioo();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defaultPodId = params.get('pod') ?? state.pods.find((pod) => pod.status === 'available')?.id ?? '';
  const [podId, setPodId] = useState(defaultPodId);
  const [durationMinutes, setDurationMinutes] = useState<BookingDuration>(30);
  const [preferences, setPreferences] = useState<BookingPreferences>(
    state.currentUser?.defaultPreferences ?? { temperature: 24, light: 'dim', sound: 'rain' },
  );

  const selectedPod = state.pods.find((pod) => pod.id === podId);
  const location = state.locations.find((item) => item.id === selectedPod?.locationId);
  const price = useMemo(
    () =>
      calculateBookingPrice({
        durationMinutes,
        startAt: new Date(),
        membershipDiscountPercent:
          state.membershipPlans.find((plan) => plan.id === state.currentUser?.membershipPlanId)?.discountPercent ?? 0,
      }),
    [durationMinutes, state.currentUser?.membershipPlanId, state.membershipPlans],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const booking = actions.createBooking({ podId, durationMinutes, preferences });
    if (booking) {
      navigate(`/app/bookings/${booking.id}/qr`);
    }
  }

  return (
    <form className="page-stack" onSubmit={handleSubmit}>
      <section className="page-heading-row">
        <div>
          <p className="utility-label">Booking Flow</p>
          <h2>Chọn pod, thời lượng và cấu hình nghỉ.</h2>
        </div>
        <button className="primary-button" type="submit" disabled={!selectedPod || selectedPod.status !== 'available'}>
          Thanh toán thử nghiệm
        </button>
      </section>

      <section className="booking-grid">
        <div className="panel">
          <h3>1. Chọn pod</h3>
          <div className="pod-list">
            {state.pods.map((pod) => {
              const podLocation = state.locations.find((item) => item.id === pod.locationId);
              const isSelected = pod.id === podId;
              return (
                <button
                  type="button"
                  className={`pod-card selectable ${isSelected ? 'selected' : ''}`}
                  key={pod.id}
                  onClick={() => setPodId(pod.id)}
                >
                  <img src={pod.image} alt={pod.name} />
                  <span>
                    <strong>{pod.name}</strong>
                    <small>{podLocation?.name}</small>
                  </span>
                  <em className={`status-dot ${statusTone(pod.status)}`}>{podStatusLabel(pod.status)}</em>
                </button>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <h3>2. Thời lượng</h3>
          <div className="segmented-control">
            {durations.map((duration) => (
              <button
                type="button"
                className={durationMinutes === duration ? 'active' : ''}
                key={duration}
                onClick={() => setDurationMinutes(duration)}
              >
                {duration} phút
              </button>
            ))}
          </div>

          <h3>3. Cá nhân hóa</h3>
          <div className="form-grid one">
            <label>
              Nhiệt độ
              <input
                type="range"
                min="20"
                max="28"
                value={preferences.temperature}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    temperature: Number(event.target.value),
                  }))
                }
              />
              <span>{preferences.temperature}°C</span>
            </label>
            <label>
              Ánh sáng
              <select
                value={preferences.light}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    light: event.target.value as BookingPreferences['light'],
                  }))
                }
              >
                <option value="soft">Soft</option>
                <option value="dim">Dim</option>
                <option value="focus">Focus</option>
              </select>
            </label>
            <label>
              Âm thanh
              <select
                value={preferences.sound}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    sound: event.target.value as BookingPreferences['sound'],
                  }))
                }
              >
                <option value="rain">Rain</option>
                <option value="deep-focus">Deep focus</option>
                <option value="silent">Silent</option>
              </select>
            </label>
          </div>
        </div>

        <aside className="summary-card">
          <CalendarCheck size={24} />
          <h3>Xác nhận</h3>
          <dl>
            <div>
              <dt>Pod</dt>
              <dd>{selectedPod?.name ?? 'Chưa chọn'}</dd>
            </div>
            <div>
              <dt>Địa điểm</dt>
              <dd>{location?.name ?? 'Chưa chọn'}</dd>
            </div>
            <div>
              <dt>Thời lượng</dt>
              <dd>{durationMinutes} phút</dd>
            </div>
            <div>
              <dt>Giá</dt>
              <dd>{formatCurrency(price)}</dd>
            </div>
          </dl>
          <div className="payment-note">
            <CreditCard size={18} />
            <span>Thanh toán thử nghiệm xác nhận ngay và phát hành QR check-in.</span>
          </div>
          <div className="payment-note">
            <SlidersHorizontal size={18} />
            <span>
              {preferences.temperature}°C · {preferences.light} · {preferences.sound}
            </span>
          </div>
        </aside>
      </section>
    </form>
  );
}
