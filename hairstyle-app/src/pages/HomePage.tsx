import { type FormEvent, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import hairstyles from '../data/hairstyles.json'
import hairstylists from '../data/hairstylists.json'
import { useDemoBookings, useDemoProfile } from '../lib/demoStore'
import InitialsAvatar from '../components/InitialsAvatar'

const QUICK_CATEGORIES = [
  { name: 'Tresses', icon: 'braids' },
  { name: 'Locks', icon: 'locks' },
  { name: 'Perruques', icon: 'wig' },
  { name: 'Lissage', icon: 'smooth' },
  { name: 'Vanilles', icon: 'twists' },
]

const MONTH = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

function daysUntil(dateStr: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(dateStr)
  return Math.round((date.getTime() - today.getTime()) / 86400000)
}

function CategoryIcon({ icon, active }: { icon: string; active: boolean }) {
  const stroke = active ? '#FFFFFF' : 'var(--gold)'
  const soft = active ? 'rgba(255,255,255,0.62)' : 'var(--text-3)'

  if (icon === 'braids') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 3c-2 2-2 4 0 6s2 4 0 6-2 4 0 6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 3c-2 2-2 4 0 6s2 4 0 6-2 4 0 6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M16 3c-2 2-2 4 0 6s2 4 0 6-2 4 0 6" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (icon === 'locks') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4v7c0 3 2 3 2 6 0 1.7-1.1 3-2.6 3" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 3v8c0 3.2 2.2 3.3 2.2 6.3 0 1.7-1 3-2.4 3.4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 4v6.8c0 2.5 1.6 3.1 1.6 5.6 0 1.6-.8 2.9-2.2 3.4" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (icon === 'wig') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.5 13.5C4.5 7.7 7.8 4 12 4s7.5 3.7 7.5 9.5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 12.5c1 2.5 2.4 4.2 4.1 5.1M18 12.5c-1 2.5-2.4 4.2-4.1 5.1" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 5.3c-.2 4.4.4 7.1 1.7 10.7M15 5.3c.2 4.4-.4 7.1-1.7 10.7" stroke={soft} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  if (icon === 'smooth') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 15c4-3.5 9-3.5 14 0" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" />
        <path d="M6 18c3.6-2.2 8.7-2.2 12 0" stroke={soft} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 5l.8 1.8L10.5 8l-1.7.8L8 10.5l-.8-1.7L5.5 8l1.7-1.2L8 5z" fill={stroke} />
        <path d="M16.5 3.5l.5 1.2 1.2.5-1.2.6-.5 1.2-.6-1.2-1.2-.6 1.2-.5.6-1.2z" fill={soft} />
      </svg>
    )
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 4c4 2 4 5 0 7s-4 5 0 9" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 4c-4 2-4 5 0 7s4 5 0 9" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8.5 11h7" stroke={soft} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [profile] = useDemoProfile()
  const [bookings] = useDemoBookings()
  const [manualCategory, setManualCategory] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const selectedCategory = manualCategory ?? searchParams.get('category') ?? ''
  const firstName = profile.name.split(' ')[0] || 'Sophia'

  const upcoming = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return bookings
      .filter(booking => new Date(booking.date) >= today && booking.status !== 'cancelled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [bookings])

  const nextBooking = upcoming[0]
  const nearbyStylists = selectedCategory
    ? hairstylists.filter(stylist => stylist.categories.includes(selectedCategory))
    : hairstylists
  const featuredStyles = hairstyles.slice(0, 5)

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (trimmed) navigate(`/hairstylists?q=${encodeURIComponent(trimmed)}`)
  }

  const selectCategory = (category: string) => {
    setManualCategory(selectedCategory === category ? '' : category)
  }

  return (
    <main className="pb-24" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <section className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-5">
          <div className="min-w-0">
            <p style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Manrope', fontWeight: 700 }}>Bonjour {firstName}</p>
            <h1 style={{ fontSize: 25, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Fraunces', lineHeight: 1.05, marginTop: 2 }}>
              Quel style aujourd’hui ?
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
              className="w-10 h-10 rounded-full flex items-center justify-center active-scale relative"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-1)" strokeWidth="1.8">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: 'var(--gold)', border: '1.5px solid #fff' }} />
            </button>
            <button type="button" onClick={() => navigate('/profile')} className="active-scale">
              <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover" style={{ border: '2px solid var(--primary-border)' }} />
            </button>
          </div>
        </div>

        <form onSubmit={submitSearch} className="relative mb-4">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Style, coiffeuse, ville..."
            className="w-full rounded-2xl outline-none"
            style={{ height: 52, paddingLeft: 46, paddingRight: 52, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 14, fontWeight: 700, fontFamily: 'Manrope', boxShadow: '0 6px 18px rgba(82,32,54,0.05)' }}
          />
          <button
            type="submit"
            aria-label="Rechercher"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center active-scale"
            style={{ background: 'var(--cta-gradient)', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        <button
          type="button"
          onClick={() => navigate('/hairstylists?category=Tresses')}
          className="w-full text-left rounded-3xl active-scale overflow-hidden relative"
          style={{ minHeight: 158, background: 'linear-gradient(135deg, #5B2038 0%, #C44573 62%, #F5B6C8 100%)', boxShadow: '0 12px 30px rgba(82,32,54,0.16)' }}
        >
          <div className="relative z-10 p-5" style={{ maxWidth: '62%' }}>
            <span className="inline-flex px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.17)', color: '#fff', fontSize: 11, fontWeight: 800, fontFamily: 'Manrope' }}>Cette semaine</span>
            <p style={{ fontSize: 25, fontWeight: 800, color: '#fff', fontFamily: 'Fraunces', lineHeight: 1.05, marginTop: 12 }}>Tresses à -20%</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', fontFamily: 'Manrope', marginTop: 5 }}>Places limitées</p>
            <span className="inline-flex mt-4 px-4 py-2 rounded-2xl" style={{ background: '#fff', color: '#9F2E5B', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>Réserver</span>
          </div>
          <img
            src="https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
            alt="Box braids"
            className="absolute top-0 right-0 h-full object-cover"
            style={{ width: '45%' }}
          />
          <div className="absolute inset-y-0 right-0" style={{ width: '55%', background: 'linear-gradient(to right, #C44573 0%, rgba(196,69,115,0.2) 45%, transparent 100%)' }} />
        </button>
      </section>

      <section className="mt-2 mb-5">
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar pb-1">
          {QUICK_CATEGORIES.map(category => {
            const active = selectedCategory === category.name
            return (
              <button
                key={category.name}
                type="button"
                onClick={() => selectCategory(category.name)}
                className="flex items-center gap-2 flex-shrink-0 px-3 py-2 rounded-2xl active-scale"
                style={{ background: active ? 'var(--text-1)' : 'var(--surface)', color: active ? '#fff' : 'var(--text-2)', border: active ? '1px solid var(--text-1)' : '1px solid var(--border)' }}
              >
                <span className="w-8 h-8 rounded-2xl flex items-center justify-center" style={{ background: active ? 'rgba(255,255,255,0.14)' : 'var(--surface-2)' }}><CategoryIcon icon={category.icon} active={active} /></span>
                <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>{category.name}</span>
              </button>
            )
          })}
        </div>
      </section>

      {nextBooking && (() => {
        const date = new Date(nextBooking.date)
        const days = daysUntil(nextBooking.date)
        return (
          <section className="px-4 mb-6">
            <button
              type="button"
              onClick={() => navigate('/reservations')}
              className="w-full p-3.5 rounded-3xl active-scale text-left"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope', lineHeight: 1 }}>{date.getDate()}</span>
                  <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--text-3)', fontFamily: 'Manrope', textTransform: 'uppercase' }}>{MONTH[date.getMonth()]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>{days === 0 ? 'Aujourd’hui' : days === 1 ? 'Demain' : `Dans ${days} jours`}</p>
                  <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{nextBooking.serviceName}</p>
                  <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{nextBooking.stylistName} · {nextBooking.time}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2.2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </button>
          </section>
        )
      })()}

      <section className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>Inspiration</h2>
          <button onClick={() => navigate('/hairstyles')} className="active-scale" style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>Tout voir</button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
          {featuredStyles.map(style => (
            <button
              key={style.id}
              type="button"
              onClick={() => navigate(`/hairstylists?category=${encodeURIComponent(style.category)}`)}
              className="flex-shrink-0 w-36 rounded-3xl overflow-hidden active-scale text-left"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="relative" style={{ height: 168 }}>
                <img src={style.image} alt={style.name} className="w-full h-full object-cover" loading="lazy" />
                {style.badge && <span className="absolute top-2 left-2 px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.84)', color: 'var(--text-1)', fontSize: 10, fontWeight: 800, fontFamily: 'Manrope' }}>{style.badge}</span>}
              </div>
              <div className="p-3">
                <p className="truncate" style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{style.name}</p>
                <p style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope', marginTop: 2 }}>dès {style.startingPrice}€</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{selectedCategory ? selectedCategory : 'Près de toi'}</h2>
          <button onClick={() => navigate(selectedCategory ? `/hairstylists?category=${encodeURIComponent(selectedCategory)}` : '/hairstylists')} className="active-scale" style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>Explorer</button>
        </div>

        <div className="flex flex-col gap-2.5">
          {nearbyStylists.slice(0, 3).map(stylist => (
            <button
              key={stylist.id}
              type="button"
              onClick={() => navigate(`/hairstylist/${stylist.id}`)}
              className="w-full p-3 rounded-3xl active-scale text-left"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <InitialsAvatar name={stylist.name} className="w-14 h-14 rounded-2xl flex-shrink-0" textStyle={{ fontSize: 16 }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{stylist.name}</p>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#B7794D', fontFamily: 'Manrope' }}>★ {stylist.rating}</span>
                  </div>
                  <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{stylist.city} · {stylist.categories.slice(0, 2).join(', ')}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>dès</p>
                  <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{stylist.priceFrom}€</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
