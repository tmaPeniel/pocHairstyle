import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import HairstylistListPage from './pages/HairstylistListPage'
import HairstyleListPage from './pages/HairstyleListPage'
import HairstylistProfilePage from './pages/HairstylistProfilePage'
import ServicePage from './pages/ServicePage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import SuccessPage from './pages/SuccessPage'
import ReservationsPage from './pages/ReservationsPage'
import ProfilePage from './pages/ProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import ProfileDetailPage from './pages/ProfileDetailPage'

const SHOW_NAV_PATHS = ['/', '/hairstyles', '/hairstylists', '/reservations', '/profile']

function AppLayout() {
  const location = useLocation()
  const hideNav = !SHOW_NAV_PATHS.includes(location.pathname)

  return (
    <div style={{ minHeight: '100svh', background: 'var(--bg)' }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hairstylists" element={<HairstylistListPage />} />
        <Route path="/hairstyles" element={<HairstyleListPage />} />
        <Route path="/hairstylist/:id" element={<HairstylistProfilePage />} />
        <Route path="/service/:id" element={<ServicePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:section" element={<ProfileDetailPage />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

