import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDemoBookings } from '../lib/demoStore'

const MONTH = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'aout', 'sep', 'oct', 'nov', 'dec']

const STATUS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  confirmed: { label: 'Confirmée', color: '#15803D', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  pending: { label: 'En attente', color: '#B45309', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  cancelled: { label: 'Annulée', color: '#DC2626', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
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
      <Header title="Rendez-vous" />

      <div className="px-4 pt-4">
        <div className="flex mb-4 rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 3 }}>
          {(['upcoming', 'past'] as const).map(item => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className="flex-1 py-2 rounded-lg active-scale transition-all duration-150"
              style={{
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'Inter',
                background: tab === item ? '#fff' : 'transparent',
                color: tab === item ? 'var(--text-1)' : 'var(--text-3)',
                boxShadow: tab === item ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {item === 'upcoming' ? 'À venir ' + upcoming.length : 'Passées ' + past.length}
            </button>
          ))}
        </div>

        {tab === 'upcoming' && upcoming[0] && (() => {
          const next = upcoming[0]
          const days = daysUntil(next.date)
          const date = new Date(next.date)
          return (
            <div className="p-3.5 rounded-2xl mb-4 flex items-center gap-3" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}>
              <div className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A', fontFamily: 'Inter', lineHeight: 1 }}>{date.getDate()}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#1A1A1A', fontFamily: 'Inter', textTransform: 'uppercase' }}>{MONTH[date.getMonth()]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate" style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>{next.serviceName}</p>
                <p className="truncate" style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Inter' }}>{next.stylistName} ? {next.time}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#1A1A1A', background: 'var(--gold)', borderRadius: 99, padding: '5px 9px', fontFamily: 'Inter' }}>
                {'J-' + days}
              </span>
            </div>
          )
        })()}

        {list.length === 0 && (
          <div className="flex flex-col items-center py-14 gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)' }}>
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.7">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>
              {tab === 'upcoming' ? 'Aucun rendez-vous' : 'Aucun historique'}
            </p>
            {tab === 'upcoming' && (
              <button onClick={() => navigate('/')} className="active-scale" style={{ fontSize: 13, fontWeight: 800, color: '#1A1A1A', background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)', borderRadius: 12, padding: '10px 24px', fontFamily: 'Inter' }}>
                Explorer
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
              <div key={booking.id} className="p-3.5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>{booking.serviceName}</p>
                    <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter', marginTop: 1 }}>{booking.stylistName}</p>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 800, color: status.color, background: status.bg, border: '1px solid ' + status.border, borderRadius: 99, padding: '3px 8px', fontFamily: 'Inter', flexShrink: 0 }}>
                    {status.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', background: '#fff', border: '1px solid var(--border)', borderRadius: 99, padding: '5px 9px', fontFamily: 'Inter' }}>{date.getDate()} {MONTH[date.getMonth()]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', background: '#fff', border: '1px solid var(--border)', borderRadius: 99, padding: '5px 9px', fontFamily: 'Inter' }}>{booking.time}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', background: '#fff', border: '1px solid var(--border)', borderRadius: 99, padding: '5px 9px', fontFamily: 'Inter' }}>{booking.price}?</span>
                  {!isPast && days >= 0 && <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', background: 'var(--gold-light)', border: '1px solid var(--gold-border)', borderRadius: 99, padding: '5px 9px', fontFamily: 'Inter' }}>{days === 0 ? "Aujourd'hui" : days === 1 ? 'Demain' : 'J-' + days}</span>}
                </div>

                {booking.address && <p className="truncate mb-3" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{booking.address}</p>}

                <div className="flex gap-2">
                  <button onClick={() => navigate('/hairstylist/' + booking.stylistId)} className="flex-1 py-2.5 rounded-xl active-scale" style={{ fontSize: 12, fontWeight: 700, fontFamily: 'Inter', color: 'var(--gold)', background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}>Profil</button>
                  {isPast && booking.status !== 'cancelled' ? (
                    <button onClick={() => navigate('/booking?serviceId=' + booking.serviceId + '&stylistId=' + booking.stylistId)} className="flex-1 py-2.5 rounded-xl active-scale" style={{ fontSize: 12, fontWeight: 800, fontFamily: 'Inter', color: '#1A1A1A', background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' }}>Réserver</button>
                  ) : !isPast && booking.status !== 'cancelled' ? (
                    <button onClick={() => cancelBooking(booking.id)} className="flex-1 py-2.5 rounded-xl active-scale" style={{ fontSize: 12, fontWeight: 700, fontFamily: 'Inter', color: '#DC2626', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>Annuler</button>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
