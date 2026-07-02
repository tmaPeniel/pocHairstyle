import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDemoBookings, useDemoFavorites, useDemoProfile } from '../lib/demoStore'

const TIER_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Gold: { bg: 'rgba(201,168,76,0.12)', color: '#B8850A', border: 'rgba(201,168,76,0.3)' },
  Silver: { bg: 'rgba(156,163,175,0.12)', color: '#6B7280', border: 'rgba(156,163,175,0.3)' },
  Platinum: { bg: 'rgba(139,92,246,0.12)', color: '#7C3AED', border: 'rgba(139,92,246,0.3)' },
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useDemoProfile()
  const [favorites] = useDemoFavorites()
  const [bookingList] = useDemoBookings()
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [feedback, setFeedback] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const savedCount = favorites.hairstylistIds.length + favorites.serviceIds.length + favorites.hairstyleIds.length
  const tier = TIER_COLORS[profile.tier] ?? TIER_COLORS.Gold
  const nextTierPts = 500
  const progress = Math.min((profile.loyaltyPoints / nextTierPts) * 100, 100)
  const menuSections = [
    {
      title: 'Compte',
      items: [
        { icon: '??', label: 'Paiement', meta: 'Visa 4242', path: '/profile/payments' },
        { icon: '??', label: 'Adresses', meta: '3', path: '/profile/addresses' },
        { icon: '??', label: 'Favoris', meta: String(savedCount), path: '/profile/favorites' },
      ],
    },
    {
      title: 'Avantages',
      items: [
        { icon: '?', label: 'Fidélité', meta: profile.loyaltyPoints + ' pts', path: '/profile/loyalty' },
        { icon: '??', label: 'Parrainage', meta: profile.referralCode, path: '/profile/referral' },
        { icon: '???', label: 'Promos', meta: '1', path: '/profile/promo-codes' },
      ],
    },
    {
      title: 'Réglages',
      items: [
        { icon: '??', label: 'Notifications', meta: 'On', path: '/profile/notification-settings' },
        { icon: '??', label: 'Paramètres', meta: '', path: '/profile/settings' },
        { icon: '?', label: 'Support', meta: '', path: '/profile/support' },
      ],
    },
  ]

  const showFeedback = (message: string) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 1600)
  }

  const handleShare = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(profile.referralCode).catch(() => undefined)
    showFeedback('Code copié')
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    showFeedback('Déconnexion...')
    window.setTimeout(() => navigate('/'), 800)
  }

  const saveProfile = () => {
    if (editMode) {
      setProfile(current => ({ ...current, name: name.trim() || current.name, email: email.trim() || current.email, phone: phone.trim() || current.phone }))
      showFeedback('Profil sauvé')
    }
    setEditMode(value => !value)
  }

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>
      <Header title="Profil" />

      <div className="px-4 pt-4">
        {feedback && (
          <div className="mb-3 px-3 py-2 rounded-xl" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)', color: 'var(--gold)', fontSize: 12, fontWeight: 800, fontFamily: 'Inter' }}>
            {feedback}
          </div>
        )}

        <div className="p-4 rounded-2xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex items-center gap-3 mb-4">
            <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover" style={{ border: '2px solid var(--gold-border)' }} />
            <div className="flex-1 min-w-0">
              {editMode ? <input value={name} onChange={event => setName(event.target.value)} className="w-full text-sm font-bold outline-none rounded-lg px-2 py-1 mb-1" style={{ background: '#fff', border: '1.5px solid var(--gold)', color: 'var(--text-1)', fontFamily: 'Inter' }} /> : <p className="truncate" style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>{name}</p>}
              {editMode ? <input value={email} onChange={event => setEmail(event.target.value)} className="w-full text-xs outline-none rounded-lg px-2 py-1 mb-1" style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'Inter' }} /> : <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{email}</p>}
              {editMode ? <input value={phone} onChange={event => setPhone(event.target.value)} className="w-full text-xs outline-none rounded-lg px-2 py-1" style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'Inter' }} /> : <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{phone}</p>}
            </div>
            <button type="button" onClick={saveProfile} aria-label="Modifier" className="w-9 h-9 rounded-full flex items-center justify-center active-scale" style={{ background: editMode ? 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' : 'var(--surface-2)', border: editMode ? 'none' : '1px solid var(--border)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={editMode ? '#1A1A1A' : 'var(--text-2)'} strokeWidth="2.4"><path d="M20 6L9 17l-5-5" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden" style={{ background: 'var(--border)' }}>
            {[{ label: 'RDV', value: bookingList.length }, { label: 'Favoris', value: savedCount }, { label: 'Note', value: profile.avgRating }].map(stat => (
              <div key={stat.label} className="flex flex-col items-center py-3" style={{ background: 'var(--surface)' }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--gold)', fontFamily: 'Inter' }}>{stat.value}</span>
                <span style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginTop: 1 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => navigate('/profile/loyalty')} className="w-full text-left p-4 rounded-2xl mb-4 active-scale" style={{ background: 'linear-gradient(135deg, #1A0E00 0%, #3A2200 100%)', boxShadow: '0 4px 20px rgba(201,168,76,0.18)' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: 12, fontWeight: 800, color: tier.color, background: tier.bg, border: '1px solid ' + tier.border, borderRadius: 99, padding: '3px 10px', fontFamily: 'Inter' }}>{profile.tier}</span>
            <span style={{ fontSize: 20, fontWeight: 900, color: '#F0D060', fontFamily: 'Inter' }}>{profile.loyaltyPoints}</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <div className="h-full rounded-full" style={{ width: progress + '%', background: 'linear-gradient(90deg, #C9A84C 0%, #F0D060 100%)' }} />
          </div>
        </button>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl mb-4" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}>
          <span style={{ fontSize: 22 }}>??</span>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>Parrainage</p>
            <p className="truncate" style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'monospace', fontWeight: 800 }}>{profile.referralCode}</p>
          </div>
          <button type="button" onClick={handleShare} className="active-scale" style={{ fontSize: 12, fontWeight: 800, color: '#1A1A1A', background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)', borderRadius: 10, padding: '7px 12px', fontFamily: 'Inter' }}>Partager</button>
        </div>

        {menuSections.map(section => (
          <div key={section.title} className="mb-4">
            <p style={{ fontSize: 10, fontWeight: 900, color: 'var(--text-3)', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingLeft: 4 }}>{section.title}</p>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              {section.items.map((item, index) => (
                <button key={item.label} type="button" onClick={() => navigate(item.path)} className="w-full flex items-center gap-3 px-4 py-3.5 active-scale" style={{ background: '#fff', borderBottom: index < section.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 18, width: 28 }}>{item.icon}</span>
                  <span className="flex-1 text-left" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{item.label}</span>
                  {item.meta && <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-3)', fontFamily: 'Inter' }}>{item.meta}</span>}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button type="button" disabled={isLoggingOut} onClick={handleLogout} className="w-full mt-1 mb-6 py-3.5 rounded-2xl active-scale" style={{ background: 'rgba(239,68,68,0.07)', color: '#DC2626', fontSize: 13, fontWeight: 800, fontFamily: 'Inter', border: '1px solid rgba(239,68,68,0.18)', opacity: isLoggingOut ? 0.65 : 1 }}>
          {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
        </button>
      </div>
    </div>
  )
}
