import { useLocation, useNavigate } from 'react-router-dom'

const tabs = [
  {
    path: '/',
    label: 'Accueil',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? '#FFFFFF' : 'none'} stroke={active ? '#FFFFFF' : '#9A9A9A'} strokeWidth="1.8">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    path: '/hairstyles',
    label: 'Styles',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#9A9A9A'} strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    path: '/hairstylists',
    label: 'Coiffeuses',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#9A9A9A'} strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    path: '/reservations',
    label: 'Résa',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#9A9A9A'} strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Profil',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#9A9A9A'} strokeWidth="1.8">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex justify-center"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div
        className="flex items-center justify-around"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 9999,
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 10,
          paddingRight: 10,
          boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1px 6px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.7)',
          width: 'fit-content',
        }}
      >
        {tabs.map(tab => {
          const active = isActive(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex items-center justify-center active-scale"
              style={{
                padding: '2px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minWidth: 44,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: active ? 'var(--gold)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.18s ease',
                }}
              >
                {tab.icon(active)}
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
