import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const MONTH_LABELS = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const serviceId = searchParams.get('serviceId')
  const stylistId = searchParams.get('stylistId')
  const dateStr = searchParams.get('date')
  const time = searchParams.get('time')

  const service = services.find(s => s.id === serviceId)
  const stylist = hairstylists.find(s => s.id === stylistId)
  const date = dateStr ? new Date(dateStr) : null
  const deposit = service ? Math.round(service.price * 0.25) : 0

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 pb-28 pt-12"
      style={{ background: '#0a0a0a' }}>

      {/* Animated checkmark */}
      <div
        className="transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
        }}
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto"
          style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      </div>

      <div
        className="text-center mb-8 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '200ms'
        }}
      >
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#f5f0e8' }}>
          Réservation confirmée ! 🎉
        </h1>
        <p className="text-sm" style={{ color: '#666' }}>
          Un email de confirmation vous a été envoyé
        </p>
      </div>

      {/* Booking details card */}
      <div
        className="w-full p-5 rounded-2xl mb-6 transition-all duration-700"
        style={{
          background: '#141414',
          border: '1px solid rgba(201,168,76,0.2)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '350ms'
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }}/>
          <span className="text-xs font-semibold text-green-400">Réservation active</span>
        </div>

        {service && (
          <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid #1f1f1f' }}>
            <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover"/>
            <div>
              <p className="font-semibold" style={{ color: '#f5f0e8' }}>{service.name}</p>
              <p className="text-xs" style={{ color: '#666' }}>{service.duration}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl" style={{ background: '#0a0a0a' }}>
            <p className="text-xs mb-1" style={{ color: '#555' }}>Coiffeuse</p>
            <p className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{stylist?.name}</p>
          </div>
          <div className="p-3 rounded-xl" style={{ background: '#0a0a0a' }}>
            <p className="text-xs mb-1" style={{ color: '#555' }}>Horaire</p>
            <p className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{time}</p>
          </div>
          {date && (
            <div className="p-3 rounded-xl col-span-2" style={{ background: '#0a0a0a' }}>
              <p className="text-xs mb-1" style={{ color: '#555' }}>Date</p>
              <p className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>
                {date.getDate()} {MONTH_LABELS[date.getMonth()]} {date.getFullYear()}
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #1f1f1f' }}>
          <div className="flex justify-between items-center">
            <span className="text-sm" style={{ color: '#888' }}>Acompte payé</span>
            <span className="text-sm font-bold text-gold">{deposit}€</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm" style={{ color: '#888' }}>Reste à payer le jour J</span>
            <span className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{(service?.price || 0) - deposit}€</span>
          </div>
        </div>
      </div>

      <div
        className="w-full flex flex-col gap-3 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: '500ms'
        }}
      >
        <button
          onClick={() => navigate('/reservations')}
          className="w-full py-4 rounded-2xl text-sm font-bold active-scale"
          style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)', color: '#000' }}
        >
          Voir mes réservations
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3.5 rounded-2xl text-sm font-medium active-scale"
          style={{ background: '#141414', color: '#888', border: '1px solid #1f1f1f' }}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}
