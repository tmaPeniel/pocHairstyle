import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDemoBookings, useDemoFavorites, useDemoProfile } from '../lib/demoStore'

const TIER_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Gold: { bg: 'rgba(196,69,115,0.12)', color: '#B8850A', border: 'rgba(196,69,115,0.24)' },
  Silver: { bg: 'rgba(156,163,175,0.12)', color: '#6B7280', border: 'rgba(156,163,175,0.3)' },
  Platinum: { bg: 'rgba(139,92,246,0.12)', color: '#7C3AED', border: 'rgba(139,92,246,0.3)' },
}

type IconName = 'card' | 'pin' | 'heart' | 'star' | 'gift' | 'tag' | 'bell' | 'settings' | 'help'

type MenuItem = {
  icon: IconName
  label: string
  sub: string
  path: string
}

type MenuSection = {
  title: string
  items: MenuItem[]
}

function MenuIcon({ name }: { name: IconName }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  const paths: Record<IconName, ReactNode> = {
    card: <><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M2 10h20" /><path d="M6 15h4" /></>,
    pin: <><path d="M12 22s7-5.2 7-12A7 7 0 105 10c0 6.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
    heart: <path d="M20.8 4.6a5.4 5.4 0 00-7.7 0L12 5.7l-1.1-1.1a5.4 5.4 0 00-7.7 7.7L12 21l8.8-8.7a5.4 5.4 0 000-7.7z" />,
    star: <path d="M12 2l2.9 6 6.6.9-4.8 4.7 1.1 6.6L12 17.1l-5.8 3.1 1.1-6.6-4.8-4.7 6.6-.9L12 2z" />,
    gift: <><path d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8" /><path d="M2 7h20v5H2z" /><path d="M12 22V7" /><path d="M12 7H8.5A2.5 2.5 0 1112 3.5V7z" /><path d="M12 7h3.5A2.5 2.5 0 1012 3.5V7z" /></>,
    tag: <><path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z" /><circle cx="8" cy="8" r="1.4" /></>,
    bell: <><path d="M18 8a6 6 0 00-12 0c0 7-3 8-3 8h18s-3-1-3-8" /><path d="M13.7 21a2 2 0 01-3.4 0" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6v.2a2 2 0 01-4 0V21a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 010-4h.2a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1A2 2 0 017.2 4.2l.1.1a1.7 1.7 0 001.9.3 1.7 1.7 0 001-1.6V3a2 2 0 014 0v.2a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1A2 2 0 0119.8 7l-.1.1a1.7 1.7 0 00-.3 1.9 1.7 1.7 0 001.6 1h.2a2 2 0 010 4H21a1.7 1.7 0 00-1.6 1z" /></>,
    help: <><circle cx="12" cy="12" r="10" /><path d="M9.2 9a3 3 0 115.4 2c-.9.8-1.6 1.3-1.6 2.5" /><path d="M12 17h.01" /></>,
  }

  return <svg {...common}>{paths[name]}</svg>
}

function LoyaltyIllustration() {
  return (
    <svg width="112" height="86" viewBox="0 0 112 86" fill="none" aria-hidden="true">
      <rect x="20" y="14" width="76" height="50" rx="14" fill="rgba(240,208,96,0.18)" stroke="rgba(240,208,96,0.5)" />
      <rect x="29" y="25" width="38" height="6" rx="3" fill="#FFE1EA" />
      <rect x="29" y="38" width="54" height="5" rx="2.5" fill="rgba(255,255,255,0.35)" />
      <rect x="29" y="49" width="29" height="5" rx="2.5" fill="rgba(255,255,255,0.22)" />
      <path d="M80 21l3.1 6.3 6.9 1-5 4.8 1.2 6.8L80 36.7l-6.2 3.2 1.2-6.8-5-4.8 6.9-1L80 21z" fill="#FFE1EA" />
      <path d="M21 70c13-6 25-7 39-3 13 4 24 3 36-4" stroke="rgba(240,208,96,0.45)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function GiftIllustration() {
  return (
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--cta-gradient)' }}>
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H8.5A2.5 2.5 0 1112 3.5V7z" />
        <path d="M12 7h3.5A2.5 2.5 0 1012 3.5V7z" />
      </svg>
    </div>
  )
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
  const menuSections: MenuSection[] = [
    {
      title: 'Mon compte',
      items: [
        { icon: 'card', label: 'Paiement & cartes', sub: 'Gerer vos moyens de paiement', path: '/profile/payments' },
        { icon: 'pin', label: 'Mes adresses', sub: '3 adresses enregistrees', path: '/profile/addresses' },
        { icon: 'heart', label: 'Mes favoris', sub: savedCount + ' element' + (savedCount > 1 ? 's' : '') + ' sauvegarde' + (savedCount > 1 ? 's' : ''), path: '/profile/favorites' },
      ],
    },
    {
      title: 'Fidelite & offres',
      items: [
        { icon: 'star', label: 'Programme fidélité', sub: profile.loyaltyPoints + ' pts · Tier ' + profile.tier, path: '/profile/loyalty' },
        { icon: 'gift', label: 'Parrainage', sub: 'Gagnez 10 euros par ami invite', path: '/profile/referral' },
        { icon: 'tag', label: 'Mes codes promo', sub: '1 code actif', path: '/profile/promo-codes' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'bell', label: 'Notifications', sub: 'Rappels et alertes', path: '/profile/notification-settings' },
        { icon: 'settings', label: 'Paramètres', sub: 'Confidentialité & sécurité', path: '/profile/settings' },
        { icon: 'help', label: 'Aide & support', sub: 'FAQ et contact', path: '/profile/support' },
      ],
    },
  ]

  const showFeedback = (message: string) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 1800)
  }

  const handleShare = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(profile.referralCode).catch(() => undefined)
    showFeedback('Code ' + profile.referralCode + ' copie pour la demo.')
  }

  const handleLogout = () => {
    setIsLoggingOut(true)
    showFeedback("Déconnexion simulée. Retour à l'accueil...")
    window.setTimeout(() => navigate('/'), 900)
  }

  const handleSave = () => {
    if (editMode) {
      setProfile(current => ({ ...current, name: name.trim() || current.name, email: email.trim() || current.email, phone: phone.trim() || current.phone }))
      showFeedback('Profil mis a jour et sauvegarde pour la demo.')
    }
    setEditMode(value => !value)
  }

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>
      <Header title="Mon profil" showBrand={false} />

      <div className="px-4 pt-4">
        {feedback && (
          <div className="mb-3 p-3 rounded-xl" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)', color: 'var(--gold)', fontSize: 12, fontWeight: 700, fontFamily: 'Manrope' }}>
            {feedback}
          </div>
        )}

        <div className="p-5 rounded-2xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover" style={{ border: '2px solid var(--gold-border)' }} />
              <button type="button" aria-label="Modifier le profil" onClick={() => setEditMode(value => !value)} className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center active-scale" style={{ background: 'var(--cta-gradient)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </button>
            </div>
            <div className="flex-1 min-w-0">
              {editMode ? <input value={name} onChange={event => setName(event.target.value)} className="w-full text-sm font-bold outline-none rounded-lg px-2 py-1 mb-1" style={{ background: '#fff', border: '1.5px solid var(--gold)', color: 'var(--text-1)', fontFamily: 'Manrope' }} /> : <p className="truncate" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{name}</p>}
              {editMode ? <input value={email} onChange={event => setEmail(event.target.value)} className="w-full text-xs outline-none rounded-lg px-2 py-1 mb-1" style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'Manrope' }} /> : <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{email}</p>}
              {editMode ? <input value={phone} onChange={event => setPhone(event.target.value)} className="w-full text-xs outline-none rounded-lg px-2 py-1" style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-2)', fontFamily: 'Manrope' }} /> : <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{phone}</p>}
            </div>
          </div>
          <button type="button" onClick={handleSave} className="w-full py-2.5 rounded-xl active-scale" style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Manrope', background: editMode ? 'var(--cta-gradient)' : 'var(--surface-2)', color: editMode ? '#FFFFFF' : 'var(--text-2)', border: editMode ? 'none' : '1px solid var(--border)' }}>{editMode ? 'Enregistrer les modifications' : 'Modifier le profil'}</button>
          <div className="grid grid-cols-3 gap-px mt-4 pt-4 rounded-xl overflow-hidden" style={{ borderTop: '1px solid var(--border)', background: 'var(--border)' }}>
            {[{ label: 'Réservations', value: bookingList.length }, { label: 'Note moy.', value: profile.avgRating }, { label: 'Avis laissés', value: profile.reviewsCount }].map(stat => (
              <div key={stat.label} className="flex flex-col items-center py-3" style={{ background: 'var(--surface)' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>{stat.value}</span>
                <span style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Manrope', textAlign: 'center', marginTop: 1 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button type="button" onClick={() => navigate('/profile/loyalty')} className="w-full text-left p-4 rounded-2xl mb-5 active-scale relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0E00 0%, #3A2200 60%, #1A0E00 100%)', boxShadow: '0 4px 20px rgba(196,69,115,0.18)' }}>
          <div className="absolute right-0 top-1 opacity-95 pointer-events-none"><LoyaltyIllustration /></div>
          <div className="relative z-10 pr-24">
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: 12, fontWeight: 700, color: tier.color, background: tier.bg, border: '1px solid ' + tier.border, borderRadius: 99, padding: '1px 10px', fontFamily: 'Manrope' }}>{profile.tier}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.58)', fontFamily: 'Manrope' }}>Membre depuis {profile.joinDate}</span>
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'Manrope', marginBottom: 1 }}>Programme fidélité</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#FFE1EA', fontFamily: 'Manrope', lineHeight: 1 }}>{profile.loyaltyPoints}</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope', marginTop: 2 }}>points</p>
          </div>
          <div className="relative z-10 mt-4">
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope' }}>{profile.loyaltyPoints} pts</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Manrope' }}>{nextTierPts} pts vers Platinum</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full" style={{ width: progress + '%', background: 'linear-gradient(90deg, #C44573 0%, #FFE1EA 100%)' }} />
            </div>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope', marginTop: 4 }}>Encore {Math.max(nextTierPts - profile.loyaltyPoints, 0)} pts pour atteindre le rang Platinum</p>
          </div>
        </button>

        <div className="flex items-center gap-3 p-4 rounded-2xl mb-5" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}>
          <GiftIllustration />
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Manrope' }}>Parrainage actif</p>
            <p className="truncate" style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Manrope' }}>Code : <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>{profile.referralCode}</span> - 10 euros par ami invite</p>
          </div>
          <button type="button" onClick={handleShare} className="active-scale" style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF', background: 'var(--cta-gradient)', borderRadius: 10, padding: '6px 12px', fontFamily: 'Manrope' }}>Partager</button>
        </div>

        {menuSections.map(section => (
          <div key={section.title} className="mb-4">
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Manrope', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, paddingLeft: 4 }}>{section.title}</p>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              {section.items.map((item, index) => (
                <button key={item.label} type="button" onClick={() => navigate(item.path)} className="w-full flex items-center gap-3 px-4 py-3.5 active-scale" style={{ background: '#fff', borderBottom: index < section.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--gold-light)', color: 'var(--gold)', border: '1px solid var(--gold-border)' }}><MenuIcon name={item.icon} /></span>
                  <div className="flex-1 text-left min-w-0">
                    <p className="truncate" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{item.label}</p>
                    <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{item.sub}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button type="button" disabled={isLoggingOut} onClick={handleLogout} className="w-full mt-1 mb-6 py-3.5 rounded-2xl active-scale" style={{ background: 'rgba(239,68,68,0.07)', color: '#DC2626', fontSize: 13, fontWeight: 600, fontFamily: 'Manrope', border: '1px solid rgba(239,68,68,0.18)', opacity: isLoggingOut ? 0.65 : 1 }}>{isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}</button>
      </div>
    </div>
  )
}
