import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { formatEuro, services } from '../data/catalog'
import { type DemoBooking, useDemoBookings } from '../lib/demoStore'

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

function formatBookingPrice(value: number) {
  return formatEuro(value)
}

function serviceImage(booking: DemoBooking) {
  return services.find(service => service.id === booking.serviceId)?.image ?? '/images/hairstyles/box-braids.png'
}

function dateLabel(date: Date) {
  return `${date.getDate()} ${MONTH[date.getMonth()]}`
}

function dateChip(date: Date) {
  return (
    <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins', lineHeight: 1 }}>{date.getDate()}</span>
      <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Poppins', textTransform: 'uppercase', marginTop: 2 }}>{MONTH[date.getMonth()]}</span>
    </div>
  )
}

function EmptyState({ tab, onBook }: { tab: 'upcoming' | 'past'; onBook: () => void }) {
  return (
    <div className="flex flex-col items-center py-16 gap-3">
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.6">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins' }}>
        {tab === 'upcoming' ? 'Aucun RDV à venir' : 'Aucun historique'}
      </p>
      {tab === 'upcoming' && (
        <button onClick={onBook} className="active-scale" style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', background: 'var(--cta-gradient)', borderRadius: 14, padding: '11px 22px', fontFamily: 'Poppins' }}>
          Réserver
        </button>
      )}
    </div>
  )
}

function BookingCard({
  booking,
  isPast,
  onCancel,
}: {
  booking: DemoBooking
  isPast: boolean
  onCancel: (id: string) => void
}) {
  const navigate = useNavigate()
  const date = new Date(booking.date)
  const status = STATUS[booking.status] ?? STATUS.pending

  return (
    <article className="overflow-hidden rounded-[22px] bg-white shadow-sm" style={{ border: '1px solid var(--border)' }}>
      <button type="button" onClick={() => navigate(`/hairstylist/${booking.stylistId}`)} className="block w-full text-left active-scale">
        <div className="relative h-[112px] overflow-hidden">
          <img src={serviceImage(booking)} alt={booking.serviceName} className="h-full w-full object-cover" />
          <span className="absolute left-2 top-2 rounded-full px-2 py-1" style={{ background: status.bg, color: status.color, fontSize: 8.5, fontWeight: 800, fontFamily: 'Poppins' }}>
            {status.label}
          </span>
          <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1" style={{ color: 'var(--text-1)', fontSize: 9, fontWeight: 800, fontFamily: 'Poppins' }}>
            {dateLabel(date)} · {booking.time}
          </span>
        </div>
        <div className="p-2.5">
          <p className="line-clamp-2 min-h-[30px]" style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins', lineHeight: 1.25 }}>{booking.serviceName}</p>
          <p className="mt-1 truncate" style={{ fontSize: 9.5, color: 'var(--text-3)', fontFamily: 'Poppins' }}>{booking.stylistName}</p>
          <p className="mt-1" style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Poppins' }}>{formatBookingPrice(booking.price)}</p>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-1 px-2.5 pb-2.5">
        <button onClick={() => navigate(`/hairstylist/${booking.stylistId}`)} className="rounded-xl py-2 active-scale" style={{ fontSize: 9.5, fontWeight: 800, fontFamily: 'Poppins', color: 'var(--text-2)', background: '#FFFFFF', border: '1px solid var(--border)' }}>
          Profil
        </button>
        {isPast && booking.status !== 'cancelled' ? (
          <button onClick={() => navigate(`/booking?serviceId=${booking.serviceId}&stylistId=${booking.stylistId}`)} className="rounded-xl py-2 active-scale" style={{ fontSize: 9.5, fontWeight: 800, fontFamily: 'Poppins', color: '#FFFFFF', background: 'var(--cta-gradient)' }}>
            Réserver
          </button>
        ) : !isPast && booking.status !== 'cancelled' ? (
          <button onClick={() => onCancel(booking.id)} className="rounded-xl py-2 active-scale" style={{ fontSize: 9.5, fontWeight: 800, fontFamily: 'Poppins', color: '#DC2626', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.16)' }}>
            Annuler
          </button>
        ) : (
          <span />
        )}
      </div>
    </article>
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
  const next = upcoming[0]
  const otherUpcoming = upcoming.slice(1)
  const gridList = tab === 'upcoming' ? otherUpcoming : past

  const cancelBooking = (id: string) => {
    setBookingList(current => current.map(booking => booking.id === id ? { ...booking, status: 'cancelled' } : booking))
    setTab('past')
  }

  return (
    <div className="pb-24" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Header title="Mes rendez-vous" showBrand={false} />

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
                  fontFamily: 'Poppins',
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
          const status = STATUS[next.status] ?? STATUS.pending
          return (
            <section className="mb-5 overflow-hidden rounded-[28px] bg-white shadow-md" style={{ border: '1px solid var(--primary-border)' }}>
              <button
                type="button"
                onClick={() => navigate(`/hairstylist/${next.stylistId}`)}
                className="block w-full text-left active-scale"
              >
                <div className="relative h-[185px] overflow-hidden">
                  <img src={serviceImage(next)} alt={next.serviceName} className="h-full w-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(59,10,69,0.04) 0%, rgba(59,10,69,0.78) 100%)' }} />
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full px-3 py-1" style={{ background: '#D4AF37', color: '#1F1F1F', fontSize: 10, fontWeight: 900, fontFamily: 'Poppins' }}>
                      Prochain RDV
                    </span>
                    <span className="rounded-full px-2.5 py-1" style={{ background: status.bg, color: status.color, fontSize: 10, fontWeight: 800, fontFamily: 'Poppins' }}>
                      {status.label}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-white/92 px-2.5 py-1" style={{ color: '#3B0A45', fontSize: 10, fontWeight: 900, fontFamily: 'Poppins' }}>{days === 0 ? 'Aujourd’hui' : days === 1 ? 'Demain' : `J-${days}`}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'Poppins' }}>{dateLabel(date)} · {next.time}</span>
                    </div>
                    <h2 className="truncate" style={{ fontSize: 21, fontWeight: 900, fontFamily: 'Playfair Display', lineHeight: 1.08 }}>{next.serviceName}</h2>
                    <p className="mt-1 truncate" style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Poppins', opacity: 0.92 }}>{next.stylistName}</p>
                  </div>
                </div>
              </button>
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-3.5">
                {dateChip(date)}
                <div className="min-w-0">
                  <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Poppins' }}>{next.address}</p>
                  <p style={{ fontSize: 13, fontWeight: 900, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{formatBookingPrice(next.price)}</p>
                </div>
                <button onClick={() => cancelBooking(next.id)} className="rounded-2xl px-3 py-2 active-scale" style={{ fontSize: 11, fontWeight: 800, fontFamily: 'Poppins', color: '#DC2626', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.16)' }}>
                  Annuler
                </button>
              </div>
            </section>
          )
        })()}

        {tab === 'upcoming' && upcoming.length === 0 ? (
          <EmptyState tab={tab} onBook={() => navigate('/')} />
        ) : (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 style={{ fontSize: 14, fontWeight: 900, color: 'var(--text-1)', fontFamily: 'Poppins' }}>
                {tab === 'upcoming' ? 'Autres rendez-vous' : 'Historique'}
              </h2>
              <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-3)', fontFamily: 'Poppins' }}>
                {gridList.length} RDV
              </span>
            </div>

            {gridList.length === 0 ? (
              <div className="rounded-3xl px-4 py-8 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-2)', fontFamily: 'Poppins' }}>
                  {tab === 'upcoming' ? 'Aucun autre rendez-vous pour le moment.' : 'Aucun historique pour le moment.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {gridList.map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    isPast={tab === 'past'}
                    onCancel={cancelBooking}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
