import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const MONTH_LABELS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const DAY_LABELS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isPaying, setIsPaying] = useState(false)

  const serviceId = searchParams.get('serviceId')
  const stylistId = searchParams.get('stylistId')
  const dateStr = searchParams.get('date')
  const time = searchParams.get('time')

  const service = services.find(s => s.id === serviceId)
  const stylist = hairstylists.find(s => s.id === stylistId)
  const date = dateStr ? new Date(dateStr) : null

  const deposit = service ? Math.round(service.price * 0.25) : 0

  const formatDate = (d: Date) =>
    `${DAY_LABELS[d.getDay()]} ${d.getDate()} ${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`

  const handlePay = () => {
    setIsPaying(true)
    setTimeout(() => {
      navigate(`/success?serviceId=${serviceId}&stylistId=${stylistId}&date=${dateStr}&time=${time}`)
    }, 2000)
  }

  return (
    <div className="pb-28">
      <Header title="Confirmation" showBack />
      <div className="px-4 pt-4">

        {/* Summary card */}
        <div className="p-4 rounded-2xl mb-4" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: '#555' }}>Résumé</h2>

          {service && (
            <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #1f1f1f' }}>
              <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover"/>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{service.name}</p>
                <p className="text-xs" style={{ color: '#666' }}>{service.duration}</p>
              </div>
            </div>
          )}

          {stylist && (
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="text-sm" style={{ color: '#aaa' }}>{stylist.name}</span>
            </div>
          )}

          {date && (
            <div className="flex items-center gap-2 mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className="text-sm" style={{ color: '#aaa' }}>{formatDate(date)}</span>
            </div>
          )}

          {time && (
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="text-sm" style={{ color: '#aaa' }}>{time}</span>
            </div>
          )}
        </div>

        {/* Price breakdown */}
        <div className="p-4 rounded-2xl mb-6" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
          <h2 className="text-xs font-semibold mb-3 uppercase tracking-widest" style={{ color: '#555' }}>Prix</h2>
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: '#888' }}>Service</span>
            <span className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{service?.price}€</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: '#888' }}>Déplacement</span>
            <span className="text-sm font-semibold text-green-400">Gratuit</span>
          </div>
          <div className="h-px my-3" style={{ background: '#1f1f1f' }}/>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>Total</span>
            <span className="text-sm font-bold text-gold">{service?.price}€</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl mt-2"
            style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <div>
              <p className="text-xs font-semibold text-gold">Acompte à payer maintenant</p>
              <p className="text-xs" style={{ color: '#666' }}>25% du total · reste dû le jour J</p>
            </div>
            <span className="text-xl font-bold text-gold">{deposit}€</span>
          </div>
        </div>

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={isPaying}
          className="w-full py-4 rounded-2xl text-sm font-bold active-scale flex items-center justify-center gap-2"
          style={{ background: isPaying ? '#1a1a1a' : 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)', color: isPaying ? '#555' : '#000' }}
        >
          {isPaying ? (
            <>
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
              </svg>
              Paiement en cours...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Payer {deposit}€ d'acompte
            </>
          )}
        </button>

        <p className="text-center text-xs mt-3" style={{ color: '#444' }}>
          🔒 Paiement 100% sécurisé · Remboursable jusqu'à 48h avant
        </p>
      </div>
    </div>
  )
}
