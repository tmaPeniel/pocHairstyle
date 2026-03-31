import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const MONTH = ['jan','fév','mar','avr','mai','juin','juil','août','sep','oct','nov','déc']

const NEXT_STEPS = [
  { icon: '📱', label: 'Confirmez par SMS', desc: 'Un SMS de confirmation vous a été envoyé' },
  { icon: '📅', label: 'Notez le rendez-vous', desc: 'Ajoutez-le à votre agenda' },
  { icon: '💆', label: 'Préparez vos cheveux', desc: 'Cheveux lavés & secs le jour J' },
]

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const serviceId = searchParams.get('serviceId')
  const stylistId = searchParams.get('stylistId')
  const dateStr   = searchParams.get('date')
  const time      = searchParams.get('time')
  const ref       = searchParams.get('ref') ?? 'HLY-' + Math.random().toString(36).substring(2, 8).toUpperCase()

  const service = services.find(s => s.id === serviceId)
  const stylist = hairstylists.find(s => s.id === stylistId)
  const date    = dateStr ? new Date(dateStr) : null
  const deposit = service ? Math.round(service.price * 0.25) : 0

  useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

  const fadeUp = (delay: number) => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
  })

  return (
    <div className="min-h-screen flex flex-col px-4 pb-10 pt-14" style={{ background: 'var(--bg)' }}>

      {/* Animated checkmark */}
      <div className="flex justify-center mb-6" style={fadeUp(0)}>
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
            boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-2" style={fadeUp(120)}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 6 }}>
          Réservation confirmée !
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>
          Votre coiffeuse vous attend 💛
        </p>
      </div>

      {/* Ref */}
      <div
        className="flex items-center justify-center gap-2 mb-6 py-2.5 px-4 rounded-full mx-auto"
        style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)', ...fadeUp(180) }}
      >
        <span style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Inter' }}>Réf.</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter', letterSpacing: 1 }}>{ref}</span>
      </div>

      {/* Booking card */}
      <div
        className="w-full p-5 rounded-2xl mb-5"
        style={{
          background: 'var(--surface)',
          border: '1.5px solid var(--gold-border)',
          boxShadow: '0 4px 20px rgba(201,168,76,0.12)',
          ...fadeUp(250),
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#22C55E', fontFamily: 'Inter' }}>Réservation active</span>
        </div>

        {service && (
          <div className="flex items-center gap-3 pb-4 mb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{service.name}</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{service.duration}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 2 }}>Coiffeuse</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{stylist?.name}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 2 }}>Heure</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{time}</p>
          </div>
          {date && (
            <div className="p-3 rounded-xl col-span-2" style={{ background: '#fff', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 2 }}>Date</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                {date.getDate()} {MONTH[date.getMonth()]} {date.getFullYear()}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>Acompte payé</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>{deposit}€</p>
          </div>
          <div className="text-right">
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>Reste le jour J</p>
            <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>
              {(service?.price ?? 0) - deposit}€
            </p>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="w-full mb-6" style={fadeUp(380)}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 10 }}>
          Prochaines étapes
        </p>
        <div className="flex flex-col gap-2.5">
          {NEXT_STEPS.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3.5 rounded-xl"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <span style={{ fontSize: 20 }}>{step.icon}</span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{step.label}</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="w-full flex flex-col gap-3" style={fadeUp(480)}>
        <button
          onClick={() => navigate('/reservations')}
          className="w-full py-4 rounded-2xl active-scale"
          style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
            color: '#1A1A1A',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'Inter',
            boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
          }}
        >
          Voir mes réservations
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3.5 rounded-2xl active-scale"
          style={{
            background: 'var(--surface)',
            color: 'var(--text-2)',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'Inter',
            border: '1px solid var(--border)',
          }}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}
