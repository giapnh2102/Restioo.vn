import { useMemo, useState } from 'react';
import { Filter, MapPinned, Navigation, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PodStatus } from '../domain/restiooDomain';
import { useRestioo } from '../context/RestiooContext';
import { podStatusLabel, statusTone } from '../utils/format';

const statusFilters: Array<'all' | PodStatus> = ['all', 'available', 'occupied', 'cleaning', 'maintenance'];

export function PodMapPage() {
  const { state } = useRestioo();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | PodStatus>('all');

  const filteredPods = useMemo(
    () =>
      state.pods.filter((pod) => {
        const location = state.locations.find((item) => item.id === pod.locationId);
        const text = `${pod.name} ${location?.name ?? ''} ${location?.district ?? ''}`.toLowerCase();
        const matchesQuery = text.includes(query.toLowerCase());
        const matchesStatus = status === 'all' || pod.status === status;
        return matchesQuery && matchesStatus;
      }),
    [query, state.locations, state.pods, status],
  );

  return (
    <div className="page-stack">
      <section className="page-heading-row">
        <div>
          <p className="utility-label">Map/List Pod</p>
          <h2>Pod theo địa điểm và trạng thái.</h2>
        </div>
        <Link className="primary-button" to="/app/bookings/new">
          Đặt chỗ
        </Link>
      </section>

      <section className="map-layout">
        <div className="map-panel">
          <div className="map-grid-bg">
            {state.locations.map((location, index) => (
              <div
                className="map-pin"
                style={{ left: `${22 + index * 26}%`, top: `${28 + (index % 2) * 28}%` }}
                key={location.id}
              >
                <MapPinned size={20} />
                <strong>{location.name}</strong>
                <span>{location.distanceKm} km</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="search-row">
            <label>
              <Search size={16} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm pod hoặc địa điểm" />
            </label>
            <div className="select-wrap">
              <Filter size={16} />
              <select value={status} onChange={(event) => setStatus(event.target.value as 'all' | PodStatus)}>
                {statusFilters.map((item) => (
                  <option key={item} value={item}>
                    {item === 'all' ? 'Tất cả trạng thái' : podStatusLabel(item)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pod-list">
            {filteredPods.map((pod) => {
              const location = state.locations.find((item) => item.id === pod.locationId);
              return (
                <Link className="pod-card horizontal" key={pod.id} to={`/app/pods/${pod.id}`}>
                  <img src={pod.image} alt={pod.name} />
                  <div>
                    <div className="pod-card-title">
                      <strong>{pod.name}</strong>
                      <em className={`status-dot ${statusTone(pod.status)}`}>{podStatusLabel(pod.status)}</em>
                    </div>
                    <span>
                      <Navigation size={14} /> {location?.name} · {location?.distanceKm} km
                    </span>
                    <p>{pod.amenities.join(' · ')}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
