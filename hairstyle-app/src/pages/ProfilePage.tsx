import Header from '../components/Header'

const mockUser = {
  name: 'Sophia Laurent',
  email: 'sophia.laurent@email.com',
  avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
  bookingsCount: 2,
  joinDate: 'Mars 2025',
}

const menuItems = [
  { icon: '💳', label: 'Paiement & cartes', sub: 'Gérer vos moyens de paiement' },
  { icon: '📍', label: 'Adresses', sub: 'Vos adresses enregistrées' },
  { icon: '🔔', label: 'Notifications', sub: 'Rappels et alertes' },
  { icon: '⭐', label: 'Mes avis', sub: 'Avis laissés sur les coiffeuses' },
  { icon: '🎁', label: 'Parrainage', sub: 'Gagnez 10€ par ami invité' },
  { icon: '❓', label: 'Aide & support', sub: 'FAQ et contact' },
  { icon: '⚙️', label: 'Paramètres', sub: 'Confidentialité et compte' },
]

export default function ProfilePage() {
  return (
    <div className="pb-24">
      <Header title="Mon profil" />
      <div className="px-4 pt-2">

        {/* User card */}
        <div className="p-5 rounded-2xl mb-5" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: '#c9a84c' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            </div>
            <div>
              <p className="text-base font-bold" style={{ color: '#f5f0e8' }}>{mockUser.name}</p>
              <p className="text-xs" style={{ color: '#666' }}>{mockUser.email}</p>
              <p className="text-xs mt-1" style={{ color: '#444' }}>Membre depuis {mockUser.joinDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-4" style={{ borderTop: '1px solid #1f1f1f' }}>
            <div className="text-center">
              <p className="text-lg font-bold text-gold">{mockUser.bookingsCount}</p>
              <p className="text-xs" style={{ color: '#555' }}>Réservations</p>
            </div>
            <div className="text-center" style={{ borderLeft: '1px solid #1f1f1f', borderRight: '1px solid #1f1f1f' }}>
              <p className="text-lg font-bold text-gold">4.8</p>
              <p className="text-xs" style={{ color: '#555' }}>Note moy.</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gold">3</p>
              <p className="text-xs" style={{ color: '#555' }}>Avis</p>
            </div>
          </div>
        </div>

        {/* Promo banner */}
        <div className="p-4 rounded-2xl mb-5 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, #1a0e00 0%, #2d1a00 100%)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <span className="text-2xl">🎁</span>
          <div>
            <p className="text-sm font-semibold text-gold">Code parrainage actif</p>
            <p className="text-xs font-mono" style={{ color: '#888' }}>SOPHIA2025 · 10€ par ami</p>
          </div>
        </div>

        {/* Menu */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-4 active-scale"
              style={{
                borderBottom: i < menuItems.length - 1 ? '1px solid #1a1a1a' : 'none',
              }}
            >
              <span className="text-lg w-8">{item.icon}</span>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium" style={{ color: '#f5f0e8' }}>{item.label}</p>
                <p className="text-xs" style={{ color: '#555' }}>{item.sub}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))}
        </div>

        <button
          className="w-full mt-5 py-3.5 rounded-2xl text-sm font-medium active-scale"
          style={{ background: '#141414', color: '#ef4444', border: '1px solid rgba(239,68,68,0.15)' }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
