import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDemoBookings } from '../lib/demoStore'

const MONTH = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: 'Confirmé', color: '#15803D', bg: 'rgba(34,197,94,0.1)' },
  pending: { label: 'Attente', color: '#B45309', bg: 'rgba(245,158,11,0.1)' },
  cancelled: { label: 'Annulé', color: '#DC2626', bg: 'rgba(239,68,68,0.09)' },
}

function daysUntil(dateStr: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const date = new Date(dateStr)
  return Math.round((date.getTime() - today.getTime()) / 86400000)
}


function dateChip(date: Date) {
  return (
    <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope', lineHeight: 1 }}>{date.getDate()}</span>
      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Manrope', textTransform: 'uppercase', marginTop: 2 }}>{MONTH[date.getMonth()]}</span>
    </div>
  )
}

export default function ReservationsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const [bookingList, setBookingList] = useDemoBookings()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = bookingList
    .filter(booking => new Date(booking.date) >= today && booking.status !== 'cancelled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const past = bookingList
    .filter(booking => new Date(booking.date) < today || booking.status === 'cancelled')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const list = tab === 'upcoming' ? upcoming : past

  const cancelBooking = (id: string) => {
    setBookingList(current => current.map(booking => booking.id === id ? { ...booking, status: 'cancelled' } : booking))
    setTab('past')
  }

  const next = upcoming[0]

  return (
    <div className="pb-24" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Header title={'R\u00e9servations'} showBrand={false} />

      <div className="px-4 pt-4">
        <div className="grid grid-cols-2 gap-1 mb-4 p-1 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          {(['upcoming', 'past'] as const).map(item => {
            const active = tab === item
            return (
              <button
                key={item}
                onClick={() => setTab(item)}
                className="py-2.5 rounded-xl active-scale"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: 'Manrope',
                  background: active ? '#FFFFFF' : 'transparent',
                  color: active ? 'var(--text-1)' : 'var(--text-3)',
                  boxShadow: active ? '0 2px 8px rgba(82,32,54,0.06)' : 'none',
                }}
              >
                {item === 'upcoming' ? `À venir ${upcoming.length}` : `Passées ${past.length}`}
              </button>
            )
          })}
        </div>

        {tab === 'upcoming' && next && (() => {
          const date = new Date(next.date)
          const days = daysUntil(next.date)
          return (
            <button
              type="button"
              onClick={() => navigate(`/hairstylist/${next.stylistId}`)}
              className="w-full text-left p-3.5 rounded-3xl mb-4 active-scale"
              style={{ background: '#FFFFFF', border: '1px solid var(--primary-border)', boxShadow: '0 8px 24px rgba(82,32,54,0.08)' }}
            >
              <div className="flex items-center gap-3">
                {dateChip(date)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>Prochain RDV</span>
                    <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)', background: 'var(--surface-2)', fontFamily: 'Manrope' }}>{days === 0 ? 'Aujourd’hui' : days === 1 ? 'Demain' : `J-${days}`}</span>
                  </div>
                  <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{next.serviceName}</p>
                  <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{next.stylistName} · {next.time}</p>
                </div>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{next.price}€</span>
              </div>
            </button>
          )
        })()}

        {list.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.6">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>
              {tab === 'upcoming' ? 'Aucun RDV à venir' : 'Aucun historique'}
            </p>
            {tab === 'upcoming' && (
              <button onClick={() => navigate('/')} className="active-scale" style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', background: 'var(--cta-gradient)', borderRadius: 14, padding: '11px 22px', fontFamily: 'Manrope' }}>
                Réserver
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {list.map(booking => {
              const date = new Date(booking.date)
              const status = STATUS[booking.status] ?? STATUS.pending
              const days = daysUntil(booking.date)
              const isPast = tab === 'past'

              return (
                <div key={booking.id} className="p-3 rounded-3xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-3">
                    {dateChip(date)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{booking.serviceName}</p>
                        <span className="px-2 py-0.5 rounded-full flex-shrink-0" style={{ fontSize: 10, fontWeight: 700, color: status.color, background: status.bg, fontFamily: 'Manrope' }}>{status.label}</span>
                      </div>
                      <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{booking.stylistName} · {booking.time} · {booking.price}€</p>
                      {booking.address && <p className="truncate" style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope', marginTop: 2 }}>{booking.address}</p>}
                    </div>
                  </div>

                  {!isPast && days >= 0 && (
                    <div className="mt-3 px-3 py-2 rounded-2xl" style={{ background: 'var(--surface-2)' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', fontFamily: 'Manrope' }}>{days === 0 ? "Aujourd'hui" : days === 1 ? 'Demain' : `Dans ${days} jours`}</span>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <button onClick={() => navigate(`/hairstylist/${booking.stylistId}`)} className="flex-1 py-2.5 rounded-2xl active-scale" style={{ fontSize: 12, fontWeight: 800, fontFamily: 'Manrope', color: 'var(--text-2)', background: '#FFFFFF', border: '1px solid var(--border)' }}>Profil</button>
                    {isPast && booking.status !== 'cancelled' ? (
                      <button onClick={() => navigate(`/booking?serviceId=${booking.serviceId}&stylistId=${booking.stylistId}`)} className="flex-1 py-2.5 rounded-2xl active-scale" style={{ fontSize: 12, fontWeight: 800, fontFamily: 'Manrope', color: '#FFFFFF', background: 'var(--cta-gradient)' }}>Réserver</button>
                    ) : !isPast && booking.status !== 'cancelled' ? (
                      <button onClick={() => cancelBooking(booking.id)} className="flex-1 py-2.5 rounded-2xl active-scale" style={{ fontSize: 12, fontWeight: 700, fontFamily: 'Manrope', color: '#DC2626', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.16)' }}>Annuler</button>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
