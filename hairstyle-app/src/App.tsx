import { useEffect, useState } from 'react'
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

function SplashScreen() {
  return (
    <div
      aria-label="Chargement Hairly"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-8 splash-screen"
      style={{ background: 'radial-gradient(circle at 50% 30%, rgba(252,238,243,0.95) 0%, rgba(255,247,249,1) 46%, #FFFFFF 100%)' }}
    >
      <div className="w-24 h-24 rounded-[28px] gold-gradient flex items-center justify-center shadow-lg splash-logo" style={{ boxShadow: '0 18px 45px rgba(196,69,115,0.22)' }}>
        <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 42, fontFamily: 'Fraunces', lineHeight: 1 }}>H</span>
      </div>
      <p style={{ marginTop: 18, fontWeight: 900, fontSize: 34, color: 'var(--text-1)', fontFamily: 'Fraunces', lineHeight: 1 }}>Hairly</p>
      <p style={{ marginTop: 6, fontWeight: 700, fontSize: 12, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{'Beaut\u00e9 afro \u00e0 port\u00e9e de main'}</p>
      <div className="w-40 h-1.5 rounded-full overflow-hidden mt-8" style={{ background: 'var(--surface-2)' }}>
        <div className="h-full rounded-full splash-progress" style={{ background: 'var(--cta-gradient)' }} />
      </div>
    </div>
  )
}

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
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 2000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <AppLayout />
      {showSplash && <SplashScreen />}
    </BrowserRouter>
  )
}