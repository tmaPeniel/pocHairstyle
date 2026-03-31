import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const MOCK_USER = {
  name: 'Sophia Laurent',
  email: 'sophia.laurent@email.com',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
  bookingsCount: 7,
  reviewsCount: 3,
  avgRating: 4.8,
  joinDate: 'Mars 2025',
  loyaltyPoints: 340,
  tier: 'Gold',
  savedCount: 4,
  referralCode: 'SOPHIA2026',
}

const MENU_SECTIONS = [
  {
    title: 'Mon compte',
    items: [
      { icon: '💳', label: 'Paiement & cartes',  sub: 'Gérer vos moyens de paiement',  path: null },
      { icon: '📍', label: 'Mes adresses',         sub: '3 adresses enregistrées',        path: null },
      { icon: '❤️', label: 'Coiffeuses favorites', sub: `${MOCK_USER.savedCount} coiffeuses sauvegardées`, path: '/hairstylists' },
    ],
  },
  {
    title: 'Fidélité & offres',
    items: [
      { icon: '⭐', label: 'Programme fidélité',   sub: `${MOCK_USER.loyaltyPoints} pts · Tier ${MOCK_USER.tier}`, path: null },
      { icon: '🎁', label: 'Parrainage',            sub: 'Gagnez 10€ par ami invité',       path: null },
      { icon: '🏷️', label: 'Mes codes promo',       sub: '1 code actif',                    path: null },
    ],
  },
  {
    title: 'Préférences',
    items: [
      { icon: '🔔', label: 'Notifications',   sub: 'Rappels et alertes',     path: null },
      { icon: '⚙️', label: 'Paramètres',      sub: 'Confidentialité & sécurité', path: null },
      { icon: '❓', label: 'Aide & support',   sub: 'FAQ et contact',          path: null },
    ],
  },
]

const TIER_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Gold:     { bg: 'rgba(201,168,76,0.12)', color: '#B8850A',  border: 'rgba(201,168,76,0.3)' },
  Silver:   { bg: 'rgba(156,163,175,0.12)', color: '#6B7280', border: 'rgba(156,163,175,0.3)' },
  Platinum: { bg: 'rgba(139,92,246,0.12)', color: '#7C3AED',  border: 'rgba(139,92,246,0.3)' },
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [name,  setName]  = useState(MOCK_USER.name)
  const [email, setEmail] = useState(MOCK_USER.email)
  const [phone, setPhone] = useState(MOCK_USER.phone)

  const tier = TIER_COLORS[MOCK_USER.tier]
  const nextTierPts = 500
  const progress = Math.min((MOCK_USER.loyaltyPoints / nextTierPts) * 100, 100)

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>
      <Header title="Mon profil" />

      <div className="px-4 pt-4">

        {/* User card */}
        <div
          className="p-5 rounded-2xl mb-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                className="w-16 h-16 rounded-2xl object-cover"
                style={{ border: '2px solid var(--gold-border)' }}
              />
              <button
                onClick={() => setEditMode(v => !v)}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center active-scale"
                style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2.5">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
            <div className="flex-1">
              {editMode ? (
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-sm font-bold outline-none rounded-lg px-2 py-1 mb-1"
                  style={{ background: '#fff', border: '1.5px solid var(--gold)', color: 'var(--text-1)', fontFamily: 'Inter' }}
                />
              ) : (
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{name}</p>
              )}
              {editMode ? (
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-xs outline-none rounded-lg px-2 py-1 mb-1"
                  style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'Inter' }}
                />
              ) : (
                <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{email}</p>
              )}
              {editMode ? (
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs outline-none rounded-lg px-2 py-1"
                  style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'Inter' }}
                />
              ) : (
                <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{phone}</p>
              )}
            </div>
          </div>

          {/* Edit / Save button */}
          <button
            onClick={() => setEditMode(v => !v)}
            className="w-full py-2.5 rounded-xl active-scale"
            style={{
              fontSize: 13, fontWeight: 600, fontFamily: 'Inter',
              background: editMode ? 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' : 'var(--surface-2)',
              color: editMode ? '#1A1A1A' : 'var(--text-2)',
              border: editMode ? 'none' : '1px solid var(--border)',
            }}
          >
            {editMode ? '✓ Enregistrer les modifications' : '✏️ Modifier le profil'}
          </button>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px mt-4 pt-4 rounded-xl overflow-hidden" style={{ borderTop: '1px solid var(--border)', background: 'var(--border)' }}>
            {[
              { label: 'Réservations', value: MOCK_USER.bookingsCount },
              { label: 'Note moy.',    value: MOCK_USER.avgRating },
              { label: 'Avis laissés', value: MOCK_USER.reviewsCount },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center py-3" style={{ background: 'var(--surface)' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', textAlign: 'center', marginTop: 1 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty card */}
        <div
          className="p-4 rounded-2xl mb-5"
          style={{
            background: 'linear-gradient(135deg, #1A0E00 0%, #3A2200 60%, #1A0E00 100%)',
            boxShadow: '0 4px 20px rgba(201,168,76,0.18)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter' }}>Programme fidélité</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  style={{
                    fontSize: 12, fontWeight: 700,
                    color: tier.color, background: tier.bg, border: `1px solid ${tier.border}`,
                    borderRadius: 99, padding: '1px 10px', fontFamily: 'Inter',
                  }}
                >
                  ⭐ {MOCK_USER.tier}
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>
                  Membre depuis {MOCK_USER.joinDate}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p style={{ fontSize: 24, fontWeight: 800, color: '#F0D060', fontFamily: 'Inter' }}>
                {MOCK_USER.loyaltyPoints}
              </p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter' }}>points</p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter' }}>
                {MOCK_USER.loyaltyPoints} pts
              </span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter' }}>
                {nextTierPts} pts → Platinum
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #C9A84C 0%, #F0D060 100%)',
                }}
              />
            </div>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter', marginTop: 4 }}>
              Encore {nextTierPts - MOCK_USER.loyaltyPoints} pts pour atteindre le rang Platinum
            </p>
          </div>
        </div>

        {/* Referral */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-5"
          style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}
        >
          <span style={{ fontSize: 24 }}>🎁</span>
          <div className="flex-1">
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>
              Parrainage actif
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Inter' }}>
              Code : <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{MOCK_USER.referralCode}</span>
              {' '}· 10€ par ami invité
            </p>
          </div>
          <button
            className="active-scale"
            style={{
              fontSize: 12, fontWeight: 600, color: '#1A1A1A',
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
              borderRadius: 10, padding: '6px 12px', fontFamily: 'Inter',
            }}
          >
            Partager
          </button>
        </div>

        {/* Menu sections */}
        {MENU_SECTIONS.map(section => (
          <div key={section.title} className="mb-4">
            <p
              style={{
                fontSize: 11, fontWeight: 700, color: 'var(--text-3)',
                fontFamily: 'Inter', textTransform: 'uppercase',
                letterSpacing: '0.07em', marginBottom: 8, paddingLeft: 4,
              }}
            >
              {section.title}
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => item.path && navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active-scale"
                  style={{
                    background: '#fff',
                    borderBottom: i < section.items.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 18, width: 28 }}>{item.icon}</span>
                  <div className="flex-1 text-left">
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{item.sub}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          className="w-full mt-1 mb-6 py-3.5 rounded-2xl active-scale"
          style={{
            background: 'rgba(239,68,68,0.07)',
            color: '#DC2626',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: 'Inter',
            border: '1px solid rgba(239,68,68,0.18)',
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  )
}
