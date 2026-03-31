import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import bookings from '../data/bookings.json'

const MONTH = ['jan','fév','mar','avr','mai','juin','juil','août','sep','oct','nov','déc']

const STATUS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  confirmed: { label: 'Confirmée',  color: '#15803D', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.25)' },
  pending:   { label: 'En attente', color: '#B45309', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  cancelled: { label: 'Annulée',    color: '#DC2626', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.2)' },
}

function daysUntil(dateStr: string) {
  const today = new Date(); today.setHours(0,0,0,0)
  const d = new Date(dateStr)
  return Math.round((d.getTime() - today.getTime()) / 86400000)
}

export default function ReservationsPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  const today = new Date(); today.setHours(0,0,0,0)
  const upcoming = bookings.filter(b => new Date(b.date) >= today && b.status !== 'cancelled')
  const past     = bookings.filter(b => new Date(b.date) < today  || b.status === 'cancelled')

  const list = tab === 'upcoming' ? upcoming : past

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>
      <Header title="Mes réservations" />

      <div className="px-4 pt-4">

        {/* Tab switcher */}
        <div
          className="flex mb-5 rounded-xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 3 }}
        >
          {(['upcoming','past'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-lg active-scale transition-all duration-150"
              style={{
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Inter',
                background: tab === t ? '#fff' : 'transparent',
                color: tab === t ? 'var(--text-1)' : 'var(--text-3)',
                boxShadow: tab === t ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {t === 'upcoming' ? `À venir (${upcoming.length})` : `Passées (${past.length})`}
            </button>
          ))}
        </div>

        {/* Next appointment banner (upcoming only) */}
        {tab === 'upcoming' && upcoming.length > 0 && (() => {
          const next = upcoming[0]
          const days = daysUntil(next.date)
          const d = new Date(next.date)
          return (
            <div
              className="p-4 rounded-2xl mb-5 flex items-center gap-3"
              style={{
                background: 'linear-gradient(135deg, var(--gold-light) 0%, rgba(240,208,96,0.08) 100%)',
                border: '1.5px solid var(--gold-border)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' }}
              >
                <span style={{ fontSize: 15, fontWeight: 800, color: '#1A1A1A', fontFamily: 'Inter', lineHeight: 1 }}>
                  {d.getDate()}
                </span>
                <span style={{ fontSize: 9, fontWeight: 600, color: '#1A1A1A', fontFamily: 'Inter', textTransform: 'uppercase' }}>
                  {MONTH[d.getMonth()]}
                </span>
              </div>
              <div className="flex-1">
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>
                  Prochain rendez-vous
                </p>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                  {next.serviceName} · {next.time}
                </p>
              </div>
              <div
                className="px-3 py-1.5 rounded-xl"
                style={{ background: 'var(--gold)', color: '#1A1A1A' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, fontFamily: 'Inter', textAlign: 'center', lineHeight: 1.2 }}>
                  J-{days}
                </p>
              </div>
            </div>
          )
        })()}

        {/* Empty state */}
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
              {tab === 'upcoming' ? 'Aucun rendez-vous à venir' : 'Aucune réservation passée'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Inter', textAlign: 'center', maxWidth: 220 }}>
              {tab === 'upcoming' ? 'Trouve ta prochaine coiffeuse et réserve en quelques clics' : 'Tes réservations passées apparaîtront ici'}
            </p>
            {tab === 'upcoming' && (
              <button
                onClick={() => navigate('/')}
                className="active-scale mt-1"
                style={{
                  fontSize: 13, fontWeight: 700, color: '#1A1A1A',
                  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
                  borderRadius: 12, padding: '10px 24px', fontFamily: 'Inter',
                  boxShadow: '0 2px 10px rgba(201,168,76,0.3)',
                }}
              >
                Trouver une coiffeuse
              </button>
            )}
          </div>
        )}

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {list.map(booking => {
            const d = new Date(booking.date)
            const status = STATUS[booking.status] ?? STATUS.pending
            const days = daysUntil(booking.date)
            const isPast = tab === 'past'

            return (
              <div
                key={booking.id}
                className="p-4 rounded-2xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                      {booking.serviceName}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter', marginTop: 1 }}>
                      avec {booking.stylistName}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 11, fontWeight: 600,
                      color: status.color, background: status.bg, border: `1px solid ${status.border}`,
                      borderRadius: 99, padding: '3px 10px', fontFamily: 'Inter', flexShrink: 0, marginLeft: 8,
                    }}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="p-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>Date</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                      {d.getDate()} {MONTH[d.getMonth()]}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>Heure</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                      {booking.time}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>Total</p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>
                      {booking.price}€
                    </p>
                  </div>
                </div>

                {/* Countdown (upcoming only) */}
                {!isPast && days >= 0 && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3"
                    style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', fontFamily: 'Inter' }}>
                      {days === 0 ? "Aujourd'hui !" : days === 1 ? 'Demain !' : `Dans ${days} jours`}
                    </span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/hairstylist/${booking.stylistId}`)}
                    className="flex-1 py-2.5 rounded-xl active-scale"
                    style={{
                      fontSize: 12, fontWeight: 600, fontFamily: 'Inter',
                      color: 'var(--gold)', background: 'var(--gold-light)',
                      border: '1px solid var(--gold-border)',
                    }}
                  >
                    Voir profil
                  </button>
                  {isPast && booking.status !== 'cancelled' ? (
                    <button
                      onClick={() => navigate(`/hairstylist/${booking.stylistId}`)}
                      className="flex-1 py-2.5 rounded-xl active-scale"
                      style={{
                        fontSize: 12, fontWeight: 700, fontFamily: 'Inter',
                        color: '#1A1A1A',
                        background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
                        boxShadow: '0 2px 8px rgba(201,168,76,0.3)',
                      }}
                    >
                      Réserver à nouveau
                    </button>
                  ) : !isPast && booking.status !== 'cancelled' ? (
                    <button
                      className="flex-1 py-2.5 rounded-xl active-scale"
                      style={{
                        fontSize: 12, fontWeight: 500, fontFamily: 'Inter',
                        color: '#DC2626', background: 'rgba(239,68,68,0.07)',
                        border: '1px solid rgba(239,68,68,0.2)',
                      }}
                    >
                      Annuler
                    </button>
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
