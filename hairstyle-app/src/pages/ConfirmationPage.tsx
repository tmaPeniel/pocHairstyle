import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const DAY_FR   = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi']
const MONTH_FR = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']

function genRef() {
  return 'HLY-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}
const BOOKING_REF = genRef()

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isPaying, setIsPaying] = useState(false)

  const serviceId = searchParams.get('serviceId')
  const stylistId = searchParams.get('stylistId')
  const dateStr   = searchParams.get('date')
  const time      = searchParams.get('time')
  const address   = searchParams.get('address') ?? ''
  const notes     = searchParams.get('notes') ?? ''

  const service = services.find(s => s.id === serviceId)
  const stylist = hairstylists.find(s => s.id === stylistId)
  const date = dateStr ? new Date(dateStr) : null

  const deposit = service ? Math.round(service.price * 0.25) : 0
  const remaining = (service?.price ?? 0) - deposit

  const formatDate = (d: Date) =>
    `${DAY_FR[d.getDay()]} ${d.getDate()} ${MONTH_FR[d.getMonth()]} ${d.getFullYear()}`

  const handlePay = () => {
    setIsPaying(true)
    const params = new URLSearchParams({ serviceId: serviceId ?? '', stylistId: stylistId ?? '', date: dateStr ?? '', time: time ?? '', ref: BOOKING_REF })
    setTimeout(() => navigate(`/success?${params}`), 2200)
  }

  const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-center gap-2.5 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="w-8 h-8 flex items-center justify-center rounded-xl" style={{ background: 'var(--gold-light)' }}>
        {icon}
      </div>
      <div className="flex-1">
        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>{label}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }}>{value}</p>
      </div>
    </div>
  )

  return (
    <div className="pb-28" style={{ background: 'var(--bg)' }}>
      <Header title="Confirmation" showBack />

      <div className="px-4 pt-4">

        {/* Booking ref banner */}
        <div
          className="flex items-center justify-between p-4 rounded-2xl mb-5"
          style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}
        >
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Inter' }}>Référence de réservation</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter', letterSpacing: 1 }}>
              {BOOKING_REF}
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
              <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
          </div>
        </div>

        {/* Service + stylist */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Détails
          </p>

          {service && (
            <div className="flex items-center gap-3 pb-3 mb-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{service.name}</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{service.duration}</p>
              </div>
            </div>
          )}

          <Row
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            label="Coiffeuse"
            value={stylist?.name ?? '—'}
          />
          {date && (
            <Row
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
              label="Date"
              value={formatDate(date)}
            />
          )}
          <Row
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            label="Heure"
            value={time ?? '—'}
          />
          {address && (
            <Row
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>}
              label="Adresse"
              value={address}
            />
          )}
          {notes && (
            <div className="pt-2.5">
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 3 }}>Notes</p>
              <p style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Inter', fontStyle: 'italic' }}>"{notes}"</p>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div
          className="p-4 rounded-2xl mb-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Inter', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            Prix
          </p>
          <div className="flex justify-between mb-2">
            <span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>Service</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }}>{service?.price}€</span>
          </div>
          <div className="flex justify-between mb-3 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>Déplacement</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#22C55E', fontFamily: 'Inter' }}>Gratuit</span>
          </div>
          <div className="flex justify-between mb-3">
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>Total</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>{service?.price}€</span>
          </div>

          {/* Deposit callout */}
          <div
            className="p-3.5 rounded-xl"
            style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>
                  Acompte dû maintenant
                </p>
                <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginTop: 2 }}>
                  25% du total · {remaining}€ à régler le jour J
                </p>
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>
                {deposit}€
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky pay */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 z-40"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        }}
      >
        <button
          onClick={handlePay}
          disabled={isPaying}
          className="w-full py-4 rounded-2xl active-scale flex items-center justify-center gap-2"
          style={{
            background: isPaying ? 'var(--surface)' : 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
            color: isPaying ? 'var(--text-3)' : '#1A1A1A',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Inter',
            border: isPaying ? '1.5px solid var(--border)' : 'none',
            boxShadow: isPaying ? 'none' : '0 4px 20px rgba(201,168,76,0.4)',
          }}
        >
          {isPaying ? (
            <>
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Paiement en cours…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Payer {deposit}€ d'acompte
            </>
          )}
        </button>
        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', textAlign: 'center', marginTop: 6 }}>
          🔒 Paiement sécurisé · Remboursable jusqu'à 48h avant
        </p>
      </div>
    </div>
  )
}
