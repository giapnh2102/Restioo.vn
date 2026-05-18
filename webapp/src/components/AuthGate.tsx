import type { FormEvent } from 'react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRestioo } from '../context/RestiooContext';

interface AuthGateProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function AuthGate({ children, adminOnly = false }: AuthGateProps) {
  const { state, actions } = useRestioo();
  const [email, setEmail] = useState('demo@restioo.vn');
  const [password, setPassword] = useState('restioo2026');

  if (state.currentUser && adminOnly && state.currentUser.role !== 'admin') {
    return <Navigate to="/app" replace />;
  }

  if (state.currentUser) {
    return <>{children}</>;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    actions.signIn(email, password);
  }

  return (
    <div className="auth-screen">
      <NavBrand />
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="utility-label">Đăng nhập Web App</p>
        <h1>Đặt pod, nhận QR và quản lý phiên nghỉ trong một nơi.</h1>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        </label>
        <label>
          Mật khẩu
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
        </label>
        <button type="submit" className="primary-button">
          Tiếp tục
        </button>
        <div className="auth-shortcuts">
          <button type="button" onClick={() => actions.signIn('demo@restioo.vn', 'restioo2026')}>
            Khách hàng demo
          </button>
          <button type="button" onClick={() => actions.signIn('admin@restioo.vn', 'restioo2026')}>
            Admin demo
          </button>
        </div>
      </form>
    </div>
  );
}

function NavBrand() {
  return (
    <a className="auth-brand" href="/">
      <img src="/image/logoRestioo.png" alt="Restioo" />
    </a>
  );
}
