import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const UNAVAILABLE = new Set(['12:00', '13:00'])

const DAY  = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
const MONTH = ['jan','fév','mar','avr','mai','juin','juil','août','sep','oct','nov','déc']

function getDates(n: number) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1); return d
  })
}

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const serviceId  = searchParams.get('serviceId')
  const stylistId  = searchParams.get('stylistId')

  const service = services.find(s => s.id === serviceId)
  const stylist = hairstylists.find(s => s.id === stylistId)

  const dates = getDates(14)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [address, setAddress]   = useState('')
  const [notes, setNotes]       = useState('')

  const canContinue = !!(selectedDate && selectedTime && address.trim())

  const params = new URLSearchParams({
    serviceId:  serviceId ?? '',
    stylistId:  stylistId ?? '',
    date:       selectedDate?.toISOString() ?? '',
    time:       selectedTime ?? '',
    address,
    notes,
  })

  return (
    <div className="pb-28" style={{ background: 'var(--bg)' }}>
      <Header title="Choisir un créneau" showBack />

      <div className="px-4 pt-3">

        {/* Service summary */}
        {service && stylist && (
          <div
            className="flex items-center gap-3 p-3.5 rounded-2xl mb-6"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <img src={service.image} alt={service.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope' }}>
                {service.name}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>
                avec {stylist.name} · {service.duration}
              </p>
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>
              {service.price}€
            </span>
          </div>
        )}

        {/* Date selector */}
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope', marginBottom: 12 }}>
          Choisir une date
        </h2>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-0.5 mb-6">
          {dates.map((d, i) => {
            const isSelected = selectedDate?.toDateString() === d.toDateString()
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className="flex-shrink-0 flex flex-col items-center px-3.5 py-3 rounded-2xl active-scale transition-all duration-150"
                style={{
                  minWidth: 56,
                  background: isSelected ? 'var(--cta-gradient)' : 'var(--surface)',
                  border: isSelected ? '1.5px solid transparent' : '1.5px solid var(--border)',
                  boxShadow: isSelected ? '0 4px 14px rgba(196,69,115,0.28)' : 'var(--shadow-sm)',
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 500, fontFamily: 'Manrope', color: isSelected ? '#1A1A1A' : 'var(--text-3)', marginBottom: 2 }}>
                  {DAY[d.getDay()]}
                </span>
                <span style={{ fontSize: 17, fontWeight: 800, fontFamily: 'Manrope', color: isSelected ? '#1A1A1A' : 'var(--text-1)' }}>
                  {d.getDate()}
                </span>
                <span style={{ fontSize: 10, fontFamily: 'Manrope', color: isSelected ? '#1A1A1A' : 'var(--text-3)' }}>
                  {MONTH[d.getMonth()]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Time selector */}
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope', marginBottom: 12 }}>
          Choisir un horaire
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {TIMES.map(time => {
            const isUnavailable = UNAVAILABLE.has(time)
            const isSelected    = selectedTime === time
            return (
              <button
                key={time}
                onClick={() => !isUnavailable && setSelectedTime(time)}
                disabled={isUnavailable}
                className="py-3 rounded-xl active-scale transition-all duration-150 relative"
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'Manrope',
                  background: isUnavailable ? 'var(--surface-2)'
                    : isSelected ? 'var(--cta-gradient)'
                    : 'var(--surface)',
                  color: isUnavailable ? 'var(--text-3)' : isSelected ? '#1A1A1A' : 'var(--text-1)',
                  border: isSelected ? '1.5px solid transparent' : '1.5px solid var(--border)',
                  opacity: isUnavailable ? 0.5 : 1,
                  textDecoration: isUnavailable ? 'line-through' : 'none',
                  boxShadow: isSelected ? '0 2px 8px rgba(196,69,115,0.24)' : 'none',
                }}
              >
                {time}
                {isUnavailable && (
                  <span
                    style={{
                      position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                      fontSize: 8, color: 'var(--text-3)', fontFamily: 'Manrope',
                    }}
                  >
                    Complet
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Address */}
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope', marginBottom: 8 }}>
          Adresse d'intervention <span style={{ color: '#DC2626' }}>*</span>
        </h2>
        <div className="relative mb-4">
          <div className="absolute left-3.5 top-3.5 pointer-events-none">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Ex : 12 rue de la Paix, Paris 75001"
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl text-sm outline-none"
            style={{
              background: 'var(--surface)',
              color: 'var(--text-1)',
              border: `1.5px solid ${address ? 'var(--gold)' : 'var(--border)'}`,
              fontFamily: 'Manrope',
              caretColor: 'var(--gold)',
              boxShadow: 'var(--shadow-sm)',
            }}
          />
        </div>

        {/* Notes */}
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope', marginBottom: 8 }}>
          Informations complémentaires
          <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-3)', marginLeft: 6 }}>(optionnel)</span>
        </h2>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Ex : longueur souhaitée, couleur d'extensions, code d'accès…"
          rows={3}
          className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none resize-none mb-6"
          style={{
            background: 'var(--surface)',
            color: 'var(--text-1)',
            border: '1.5px solid var(--border)',
            fontFamily: 'Manrope',
            caretColor: 'var(--gold)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      {/* Sticky CTA */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 z-40"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        }}
      >
        {!canContinue && (
          <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope', textAlign: 'center', marginBottom: 8 }}>
            {!selectedDate ? '📅 Sélectionne une date' : !selectedTime ? '🕙 Sélectionne un horaire' : '📍 Ajoute ton adresse'}
          </p>
        )}
        <button
          onClick={() => canContinue && navigate(`/confirmation?${params}`)}
          className="w-full py-4 rounded-2xl active-scale flex items-center justify-center gap-2"
          style={{
            background: canContinue
              ? 'var(--cta-gradient)'
              : 'var(--surface)',
            color: canContinue ? '#1A1A1A' : 'var(--text-3)',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Manrope',
            border: canContinue ? 'none' : '1.5px solid var(--border)',
            boxShadow: canContinue ? '0 4px 20px rgba(196,69,115,0.32)' : 'none',
          }}
        >
          Continuer →
        </button>
      </div>
    </div>
  )
}
