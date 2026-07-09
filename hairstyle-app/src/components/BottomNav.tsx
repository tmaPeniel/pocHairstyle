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
    label: 'Explorer',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#9A9A9A'} strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    path: '/hairstylists',
    label: 'Réserver',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#FFFFFF'} strokeWidth="2">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    path: '/reservations',
    label: 'RDV',
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFFFFF' : '#9A9A9A'} strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2.5" />
        <path d="M16 2v4M8 2v4M3 10h18M8 15h3M13 15h3" />
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

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    if (path === '/reservations') return location.pathname === '/reservations'
    if (path === '/profile') return location.pathname === '/profile' || (
      location.pathname.startsWith('/profile/') &&
      location.pathname !== '/profile/favorites'
    )
    return location.pathname.startsWith(path)
  }

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
          borderRadius: 22,
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 10,
          paddingRight: 10,
          boxShadow: '0 4px 24px rgba(0,0,0,0.13), 0 1px 6px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.7)',
          width: '100%',
        }}
      >
        {tabs.map(tab => {
          const active = isActive(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center active-scale"
              style={{
                padding: '2px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minWidth: 52,
              }}
            >
              <div
                style={{
                  width: tab.path === '/hairstylists' ? 40 : 30,
                  height: tab.path === '/hairstylists' ? 40 : 30,
                  borderRadius: tab.path === '/hairstylists' ? 999 : 10,
                  background: active || tab.path === '/hairstylists' ? (tab.path === '/hairstylists' ? '#D4AF37' : 'var(--primary)') : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.18s ease',
                }}
              >
                {tab.icon(active || tab.path === '/hairstylists')}
              </div>
              <span style={{ fontSize: 8.5, fontWeight: active ? 700 : 500, color: active ? 'var(--primary)' : 'var(--text-3)', fontFamily: 'Poppins', marginTop: 1 }}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
