import Header from '../components/Header'
import bookings from '../data/bookings.json'
import { useNavigate } from 'react-router-dom'

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: 'Confirmée', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  pending: { label: 'En attente', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  cancelled: { label: 'Annulée', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
}

const MONTH_LABELS = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

export default function ReservationsPage() {
  const navigate = useNavigate()

  return (
    <div className="pb-24">
      <Header title="Mes réservations" showBack={false} />
      <div className="px-4 pt-2">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#141414' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p className="text-sm" style={{ color: '#555' }}>Aucune réservation pour le moment</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-2xl text-sm font-semibold active-scale"
              style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)', color: '#000' }}
            >
              Trouver une coiffeuse
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookings.map(booking => {
              const date = new Date(booking.date)
              const status = statusConfig[booking.status] || statusConfig.pending
              return (
                <div key={booking.id} className="p-4 rounded-2xl" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{booking.serviceName}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#666' }}>avec {booking.stylistName}</p>
                    </div>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="p-2.5 rounded-xl" style={{ background: '#0a0a0a' }}>
                      <p className="text-[10px] mb-0.5" style={{ color: '#444' }}>Date</p>
                      <p className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>
                        {date.getDate()} {MONTH_LABELS[date.getMonth()]}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl" style={{ background: '#0a0a0a' }}>
                      <p className="text-[10px] mb-0.5" style={{ color: '#444' }}>Heure</p>
                      <p className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>{booking.time}</p>
                    </div>
                    <div className="p-2.5 rounded-xl" style={{ background: '#0a0a0a' }}>
                      <p className="text-[10px] mb-0.5" style={{ color: '#444' }}>Total</p>
                      <p className="text-xs font-bold text-gold">{booking.price}€</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/hairstylist/${booking.stylistId}`)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-semibold active-scale"
                      style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}
                    >
                      Voir profil
                    </button>
                    {booking.status !== 'cancelled' && (
                      <button
                        className="flex-1 py-2.5 rounded-xl text-xs font-semibold active-scale"
                        style={{ background: '#0a0a0a', color: '#555', border: '1px solid #1a1a1a' }}
                      >
                        Annuler
                      </button>
                    )}
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
