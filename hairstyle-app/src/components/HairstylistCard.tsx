import { useNavigate } from 'react-router-dom'

interface Hairstylist {
  id: string
  name: string
  rating: number
  city: string
  priceFrom: number
  image: string
  reviewCount: number
}

interface HairstylistCardProps {
  stylist: Hairstylist
  compact?: boolean
}

export default function HairstylistCard({ stylist, compact = false }: HairstylistCardProps) {
  const navigate = useNavigate()

  if (compact) {
    return (
      <div
        onClick={() => navigate(`/hairstylist/${stylist.id}`)}
        className="flex-shrink-0 w-32 cursor-pointer active-scale"
      >
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden mb-2"
          style={{ border: '2px solid #1f1f1f' }}>
          <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" loading="lazy"/>
          <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-semibold text-white">{stylist.rating}</span>
          </div>
        </div>
        <p className="text-xs font-semibold truncate px-0.5" style={{ color: '#f5f0e8' }}>{stylist.name}</p>
        <p className="text-xs text-gold font-medium px-0.5">dès {stylist.priceFrom}€</p>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate(`/hairstylist/${stylist.id}`)}
      className="flex items-center gap-3 p-3 rounded-2xl mb-3 cursor-pointer active-scale"
      style={{ background: '#141414', border: '1px solid #1f1f1f' }}
    >
      <div className="relative flex-shrink-0">
        <img
          src={stylist.image}
          alt={stylist.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#141414]"
          style={{ background: '#22c55e' }}/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-sm font-semibold truncate" style={{ color: '#f5f0e8' }}>{stylist.name}</p>
          <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs font-semibold" style={{ color: '#f5f0e8' }}>{stylist.rating}</span>
          </div>
        </div>
        <p className="text-xs mb-1" style={{ color: '#666' }}>{stylist.city} · {stylist.reviewCount} avis</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gold">Dès {stylist.priceFrom}€</span>
          <button
            className="text-xs px-3 py-1 rounded-full font-medium active-scale"
            style={{ background: 'rgba(201,168,76,0.12)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            Voir profil
          </button>
        </div>
      </div>
    </div>
  )
}
