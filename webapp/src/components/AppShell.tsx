import { Activity, CalendarCheck, History, Home, MapPinned, ShieldCheck, User, WalletCards } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useRestioo } from '../context/RestiooContext';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { to: '/app', label: 'Tổng quan', icon: Home },
  { to: '/app/map', label: 'Pod', icon: MapPinned },
  { to: '/app/bookings/new', label: 'Đặt chỗ', icon: CalendarCheck },
  { to: '/app/history', label: 'Lịch sử', icon: History },
  { to: '/app/membership', label: 'Hội viên', icon: WalletCards },
  { to: '/app/profile', label: 'Hồ sơ', icon: User },
];

export function AppShell({ children }: AppShellProps) {
  const { state, actions, lastError } = useRestioo();
  const user = state.currentUser;

  return (
    <div className="app-page">
      <aside className="app-sidebar">
        <NavLink to="/" className="brand-lockup">
          <img src="/image/logoRestioo.png" alt="Restioo" />
        </NavLink>
        <nav className="app-nav" aria-label="Restioo web app">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/app'} className="app-nav-link">
              <item.icon aria-hidden="true" size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          {user?.role === 'admin' ? (
            <NavLink to="/admin" className="app-nav-link">
              <ShieldCheck aria-hidden="true" size={18} />
              <span>Quản trị</span>
            </NavLink>
          ) : null}
        </nav>
      </aside>

      <main className="app-main">
        <header className="app-topbar">
          <div>
            <p className="utility-label">Restioo Web App</p>
            <h1>{user?.displayName ?? 'Khách hàng'}</h1>
          </div>
          <div className="topbar-actions">
            <div className="status-chip">
              <Activity size={16} />
              <span>{state.pods.filter((pod) => pod.status === 'available').length} pod trống</span>
            </div>
            <button type="button" className="ghost-button" onClick={actions.signOut}>
              Đăng xuất
            </button>
          </div>
        </header>
        {lastError ? <div className="error-banner">{lastError}</div> : null}
        {children}
      </main>
    </div>
  );
}
