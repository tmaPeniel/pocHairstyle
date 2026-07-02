import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDemoBookings } from '../lib/demoStore'

const MONTH = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'aout', 'sep', 'oct', 'nov', 'dec']

const STATUS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  confirmed: { label: 'Confirm\u00e9e', color: '#15803D', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  pending: { label: 'En attente', color: '#B45309', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  cancelled: { label: 'Annul\u00e9e', color: '#DC2626', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
}

function daysUntil(dateStr: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(dateStr)
  return Math.round((date.getTime() - today.getTime()) / 86400000)
}

export default function ReservationsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const [bookingList, setBookingList] = useDemoBookings()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcoming = bookingList.filter(booking => new Date(booking.date) >= today && booking.status !== 'cancelled')
  const past = bookingList.filter(booking => new Date(booking.date) < today || booking.status === 'cancelled')
  const list = tab === 'upcoming' ? upcoming : past

  const cancelBooking = (id: string) => {
    setBookingList(current => current.map(booking => booking.id === id ? { ...booking, status: 'cancelled' } : booking))
    setTab('past')
  }

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>
      <Header title="Mes r\u00e9servations" />

      <div className="px-4 pt-4">
        <div className="flex mb-5 rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 3 }}>
          {(['upcoming', 'past'] as const).map(item => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className="flex-1 py-2.5 rounded-lg active-scale transition-all duration-150"
              style={{
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Inter',
                background: tab === item ? '#fff' : 'transparent',
                color: tab === item ? 'var(--text-1)' : 'var(--text-3)',
                boxShadow: tab === item ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {item === 'upcoming' ? `\u00c0 venir (${upcoming.length})` : `Pass\u00e9es (${past.length})`}
            </button>
          ))}
        </div>

        {tab === 'upcoming' && upcoming.length > 0 && (() => {
          const next = upcoming[0]
          const days = daysUntil(next.date)
          const date = new Date(next.date)
          return (
            <div className="p-4 rounded-2xl mb-5 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, var(--gold-light) 0%, rgba(240,208,96,0.08) 100%)', border: '1.5px solid var(--gold-border)' }}>
              <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A', fontFamily: 'Inter', lineHeight: 1 }}>{date.getDate()}</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: '#1A1A1A', fontFamily: 'Inter', textTransform: 'uppercase' }}>{MONTH[date.getMonth()]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>Prochain rendez-vous</p>
                <p className="truncate" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }}>{next.serviceName} · {next.time}</p>
              </div>
              <div className="px-3 py-1.5 rounded-xl" style={{ background: 'var(--gold)', color: '#1A1A1A' }}>
                <p style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Inter', textAlign: 'center', lineHeight: 1.2 }}>J-{days}</p>
              </div>
            </div>
          )
        })()}

        {list.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }}>
              {tab === 'upcoming' ? 'Aucun rendez-vous \u00e0 venir' : 'Aucune r\u00e9servation pass\u00e9e'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Inter', textAlign: 'center', maxWidth: 220 }}>
              {tab === 'upcoming' ? 'Trouve ta prochaine coiffeuse et r\u00e9serve en quelques clics' : 'Tes r\u00e9servations pass\u00e9es appara\u00eetront ici'}
            </p>
            {tab === 'upcoming' && (
              <button onClick={() => navigate('/')} className="active-scale mt-1" style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)', borderRadius: 12, padding: '10px 24px', fontFamily: 'Inter', boxShadow: '0 2px 10px rgba(201,168,76,0.3)' }}>
                Trouver une coiffeuse
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {list.map(booking => {
            const date = new Date(booking.date)
            const status = STATUS[booking.status] ?? STATUS.pending
            const days = daysUntil(booking.date)
            const isPast = tab === 'past'

            return (
              <div key={booking.id} className="p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{booking.serviceName}</p>
                    <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter', marginTop: 1 }}>avec {booking.stylistName}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: status.color, background: status.bg, border: `1px solid ${status.border}`, borderRadius: 99, padding: '3px 10px', fontFamily: 'Inter', flexShrink: 0, marginLeft: 8 }}>{status.label}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="p-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>Date</p><p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{date.getDate()} {MONTH[date.getMonth()]}</p></div>
                  <div className="p-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>Heure</p><p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{booking.time}</p></div>
                  <div className="p-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>Total</p><p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>{booking.price}€</p></div>
                </div>

                {booking.address && <div className="px-3 py-2 rounded-xl mb-3" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>Adresse</p><p className="truncate" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', fontFamily: 'Inter' }}>{booking.address}</p></div>}

                {!isPast && days >= 0 && <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}><span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', fontFamily: 'Inter' }}>{days === 0 ? "Aujourd'hui !" : days === 1 ? 'Demain !' : `Dans ${days} jours`}</span></div>}

                <div className="flex gap-2">
                  <button onClick={() => navigate(`/hairstylist/${booking.stylistId}`)} className="flex-1 py-2.5 rounded-xl active-scale" style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Inter', color: 'var(--gold)', background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}>Voir profil</button>
                  {isPast && booking.status !== 'cancelled' ? <button onClick={() => navigate(`/booking?serviceId=${booking.serviceId}&stylistId=${booking.stylistId}`)} className="flex-1 py-2.5 rounded-xl active-scale" style={{ fontSize: 12, fontWeight: 700, fontFamily: 'Inter', color: '#1A1A1A', background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)', boxShadow: '0 2px 8px rgba(201,168,76,0.3)' }}>R\u00e9server \u00e0 nouveau</button> : !isPast && booking.status !== 'cancelled' ? <button onClick={() => cancelBooking(booking.id)} className="flex-1 py-2.5 rounded-xl active-scale" style={{ fontSize: 12, fontWeight: 500, fontFamily: 'Inter', color: '#DC2626', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>Annuler</button> : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}