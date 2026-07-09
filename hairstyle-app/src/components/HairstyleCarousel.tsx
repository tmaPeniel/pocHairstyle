import { useNavigate } from 'react-router-dom'
import { hairstyles } from '../data/catalog'

interface HairstyleCarouselProps {
  onSelect?: (category: string) => void
}

const badgeStyle: Record<string, { bg: string; color: string }> = {
  Populaire: { bg: 'rgba(196,69,115,0.18)', color: '#B8850A' },
  Premium:   { bg: 'rgba(139,92,246,0.15)', color: '#7C3AED' },
  Tendance:  { bg: 'rgba(239,68,68,0.12)',  color: '#DC2626' },
}

export default function HairstyleCarousel({ onSelect }: HairstyleCarouselProps) {
  const navigate = useNavigate()

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between px-4 mb-3">
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Poppins', display: 'flex', alignItems: 'center', gap: 6 }}>
          🔥 Styles populaires
        </h2>
        <button
          onClick={() => navigate('/hairstyles')}
          style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)' }}
          className="active-scale"
        >
          See all →
        </button>
      </div>

      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
        {hairstyles.map(style => (
          <div
            key={style.id}
            onClick={() => onSelect ? onSelect(style.category) : navigate('/hairstyles')}
            className="flex-shrink-0 w-36 rounded-2xl overflow-hidden cursor-pointer active-scale"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="relative h-44">
              <img src={style.image} alt={style.name} className="w-full h-full object-cover" loading="lazy" />
              {style.badge && (
                <div
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full backdrop-blur-sm"
                  style={{
                    background: badgeStyle[style.badge]?.bg ?? 'rgba(0,0,0,0.45)',
                    color: badgeStyle[style.badge]?.color ?? '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: 'Poppins',
                    border: `1px solid ${badgeStyle[style.badge]?.color ?? '#fff'}30`,
                  }}
                >
                  {style.badge}
                </div>
              )}
            </div>
            <div className="p-2.5">
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Poppins', marginBottom: 4 }} className="truncate">
                {style.name}
              </p>
              <div className="flex items-center justify-between">
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Poppins' }}>
                  dès {style.startingPrice}€
                </span>
                <div className="flex items-center gap-0.5">
                  <span style={{ color: '#F59E0B', fontSize: 11 }}>★</span>
                  <span style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Poppins' }}>{style.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
