import { useNavigate } from 'react-router-dom'
import InitialsAvatar from './InitialsAvatar'

interface Hairstylist {
  id: string
  name: string
  rating: number
  city: string
  priceFrom: number
  reviewCount: number
  categories: string[]
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
        className="w-full cursor-pointer active-scale"
      >
        <div
          className="relative w-full rounded-2xl overflow-hidden mb-2"
          style={{ aspectRatio: '1 / 1', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <InitialsAvatar name={stylist.name} className="w-full h-full" textStyle={{ fontSize: 28 }} />
          {/* Online dot */}
          <div
            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
            style={{ background: '#22C55E', border: '1.5px solid white' }}
          />
          <div
            className="absolute bottom-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.55)' }}
          >
            <span style={{ color: '#F59E0B', fontSize: 10 }}>★</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#fff', fontFamily: 'Manrope' }}>{stylist.rating}</span>
          </div>
        </div>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Manrope' }} className="truncate px-0.5">
          {stylist.name}
        </p>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--gold)', fontFamily: 'Manrope' }} className="px-0.5">
          dès {stylist.priceFrom}€
        </p>
      </div>
    )
  }

  return (
    <div
      onClick={() => navigate(`/hairstylist/${stylist.id}`)}
      className="flex items-center gap-3 p-3.5 rounded-2xl mb-3 cursor-pointer active-scale"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <InitialsAvatar name={stylist.name} className="w-16 h-16 rounded-full" textStyle={{ fontSize: 18 }} />
        <div
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full"
          style={{ background: '#22C55E', border: '2px solid white' }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Manrope' }} className="truncate">
            {stylist.name}
          </p>
          <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
            <span style={{ color: '#F59E0B', fontSize: 12 }}>★</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope' }}>
              {stylist.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-1.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
            <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>
            {stylist.city} · {stylist.reviewCount} avis
          </p>
        </div>

        {/* Category chips */}
        <div className="flex gap-1 flex-wrap mb-2">
          {stylist.categories.slice(0, 2).map(c => (
            <span
              key={c}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--gold)',
                background: 'var(--gold-light)',
                border: '1px solid var(--gold-border)',
                borderRadius: 99,
                padding: '1px 7px',
                fontFamily: 'Manrope',
              }}
            >
              {c}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Manrope' }}>
            Dès {stylist.priceFrom}€
          </span>
          <button
            className="active-scale"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#1A1A1A',
              background: 'var(--cta-gradient)',
              borderRadius: 10,
              padding: '4px 12px',
              fontFamily: 'Manrope',
              boxShadow: '0 1px 4px rgba(196,69,115,0.24)',
            }}
          >
            Voir profil
          </button>
        </div>
      </div>
    </div>
  )
}
