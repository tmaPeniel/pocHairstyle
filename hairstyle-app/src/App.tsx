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
import FavoritesPage from './pages/FavoritesPage'
import SearchResultsPage from './pages/SearchResultsPage'

const SHOW_NAV_PATHS = ['/', '/hairstyles', '/hairstylists', '/reservations', '/profile', '/profile/favorites']

function SplashScreen() {
  return (
    <div
      aria-label="Chargement Ub’Hair"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-8 splash-screen"
      style={{ background: 'radial-gradient(circle at 50% 30%, #FFF8F0 0%, #F8EFE4 52%, #FFFFFF 100%)' }}
    >
      <img src="/images/ubhair-logo-transparent.png" alt="Ub’Hair — Coiffe ta couronne, honore ton héritage" className="h-[350px] w-[250px] object-contain splash-logo" />
      <div className="w-40 h-1.5 rounded-full overflow-hidden mt-5" style={{ background: 'var(--surface-2)' }}>
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
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/favorites" element={<FavoritesPage />} />
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
