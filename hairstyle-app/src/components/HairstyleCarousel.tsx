import { useNavigate } from 'react-router-dom'
import hairstyles from '../data/hairstyles.json'

interface HairstyleCarouselProps {
  onSelect?: (category: string) => void
}

const badgeColors: Record<string, string> = {
  Populaire: 'rgba(201,168,76,0.15)',
  Premium: 'rgba(147,51,234,0.2)',
  Tendance: 'rgba(239,68,68,0.15)',
}
const badgeTextColors: Record<string, string> = {
  Populaire: '#c9a84c',
  Premium: '#c084fc',
  Tendance: '#f87171',
}

export default function HairstyleCarousel({ onSelect }: HairstyleCarouselProps) {
  const navigate = useNavigate()

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 className="text-base font-semibold flex items-center gap-1.5" style={{ color: '#f5f0e8' }}>
            <span>🔥</span> Styles populaires
          </h2>
        <button
          onClick={() => navigate('/hairstyles')}
          className="text-xs font-medium text-gold active-scale"
        >
          See all →
        </button>
      </div>
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
        {hairstyles.map(style => (
          <div
            key={style.id}
            onClick={() => onSelect ? onSelect(style.category) : navigate(`/hairstyles`)}
            className="flex-shrink-0 w-36 rounded-2xl overflow-hidden cursor-pointer active-scale"
            style={{ background: '#141414', border: '1px solid #1f1f1f' }}
          >
            <div className="relative h-44">
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {style.badge && (
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm"
                  style={{
                    background: badgeColors[style.badge] || 'rgba(0,0,0,0.5)',
                    color: badgeTextColors[style.badge] || '#fff',
                    border: `1px solid ${badgeTextColors[style.badge] || '#fff'}40`,
                  }}
                >
                  {style.badge}
                </div>
              )}
            </div>
            <div className="p-2.5">
              <p className="text-xs font-semibold mb-0.5 truncate" style={{ color: '#f5f0e8' }}>{style.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gold">À partir de {style.startingPrice}€</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs" style={{ color: '#888' }}>{style.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
