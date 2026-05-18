import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { AuthGate } from './components/AuthGate';
import { RestiooContext } from './context/RestiooContext';
import { useRestiooStore } from './state/useRestiooStore';
import { AdminPage } from './pages/AdminPage';
import { BookingPage } from './pages/BookingPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { LandingPage } from './pages/LandingPage';
import { MembershipPage } from './pages/MembershipPage';
import { PodDetailPage } from './pages/PodDetailPage';
import { PodMapPage } from './pages/PodMapPage';
import { ProfilePage } from './pages/ProfilePage';
import { QrCheckInPage } from './pages/QrCheckInPage';

export function App() {
  const store = useRestiooStore();

  return (
    <RestiooContext.Provider value={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/app"
            element={
              <AuthGate>
                <AppShell>
                  <DashboardPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/app/map"
            element={
              <AuthGate>
                <AppShell>
                  <PodMapPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/app/pods/:podId"
            element={
              <AuthGate>
                <AppShell>
                  <PodDetailPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/app/bookings/new"
            element={
              <AuthGate>
                <AppShell>
                  <BookingPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/app/bookings/:bookingId/qr"
            element={
              <AuthGate>
                <AppShell>
                  <QrCheckInPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/app/history"
            element={
              <AuthGate>
                <AppShell>
                  <HistoryPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/app/membership"
            element={
              <AuthGate>
                <AppShell>
                  <MembershipPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/app/profile"
            element={
              <AuthGate>
                <AppShell>
                  <ProfilePage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGate adminOnly>
                <AppShell>
                  <AdminPage />
                </AppShell>
              </AuthGate>
            }
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </RestiooContext.Provider>
  );
}
