import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

function getDatesFromToday(n: number) {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }
  return dates
}

const DAY_LABELS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const MONTH_LABELS = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const serviceId = searchParams.get('serviceId')
  const stylistId = searchParams.get('stylistId')

  const service = services.find(s => s.id === serviceId)
  const stylist = hairstylists.find(s => s.id === stylistId)

  const dates = getDatesFromToday(14)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const canContinue = selectedDate && selectedTime

  return (
    <div className="pb-28">
      <Header title="Choisir un créneau" showBack />
      <div className="px-4 pt-2">

        {/* Service summary */}
        {service && stylist && (
          <div className="flex items-center gap-3 p-3 rounded-2xl mb-6"
            style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
            <img src={service.image} alt={service.name} className="w-12 h-12 rounded-xl object-cover"/>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{service.name}</p>
              <p className="text-xs" style={{ color: '#666' }}>avec {stylist.name}</p>
            </div>
            <span className="text-sm font-bold text-gold">{service.price}€</span>
          </div>
        )}

        {/* Date selector */}
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f5f0e8' }}>Choisir une date</h2>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1 mb-6">
          {dates.map((d, i) => {
            const isSelected = selectedDate?.toDateString() === d.toDateString()
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className="flex-shrink-0 flex flex-col items-center px-3.5 py-3 rounded-2xl min-w-[56px] active-scale transition-all duration-150"
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)' : '#141414',
                  border: isSelected ? 'none' : '1px solid #1f1f1f',
                }}
              >
                <span className="text-[10px] font-medium mb-1" style={{ color: isSelected ? '#000' : '#666' }}>
                  {DAY_LABELS[d.getDay()]}
                </span>
                <span className="text-base font-bold" style={{ color: isSelected ? '#000' : '#f5f0e8' }}>
                  {d.getDate()}
                </span>
                <span className="text-[10px]" style={{ color: isSelected ? '#000' : '#555' }}>
                  {MONTH_LABELS[d.getMonth()]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Time selector */}
        <h2 className="text-sm font-semibold mb-3" style={{ color: '#f5f0e8' }}>Choisir un horaire</h2>
        <div className="grid grid-cols-4 gap-2 mb-8">
          {TIMES.map(time => {
            const isSelected = selectedTime === time
            const isUnavailable = time === '13:00' || time === '11:00'
            return (
              <button
                key={time}
                onClick={() => !isUnavailable && setSelectedTime(time)}
                disabled={isUnavailable}
                className="py-3 rounded-xl text-sm font-semibold active-scale transition-all duration-150"
                style={{
                  background: isUnavailable
                    ? '#0f0f0f'
                    : isSelected
                      ? 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)'
                      : '#141414',
                  color: isUnavailable ? '#333' : isSelected ? '#000' : '#f5f0e8',
                  border: isUnavailable ? '1px solid #1a1a1a' : isSelected ? 'none' : '1px solid #1f1f1f',
                  textDecoration: isUnavailable ? 'line-through' : 'none',
                  opacity: isUnavailable ? 0.4 : 1,
                }}
              >
                {time}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => canContinue && navigate(`/confirmation?serviceId=${serviceId}&stylistId=${stylistId}&date=${selectedDate?.toISOString()}&time=${selectedTime}`)}
          className="w-full py-4 rounded-2xl text-sm font-bold transition-all duration-200 active-scale"
          style={{
            background: canContinue
              ? 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)'
              : '#1a1a1a',
            color: canContinue ? '#000' : '#444',
          }}
        >
          {canContinue ? 'Continuer →' : 'Sélectionne une date et un horaire'}
        </button>
      </div>
    </div>
  )
}
