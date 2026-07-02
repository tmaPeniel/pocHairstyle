import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import CategoryCarousel from '../components/CategoryCarousel'
import hairstyles from '../data/hairstyles.json'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

type SortKey = 'popular' | 'price_asc' | 'price_desc'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'popular',    label: 'Popularité' },
  { key: 'price_asc',  label: 'Prix ↑' },
  { key: 'price_desc', label: 'Prix ↓' },
]

const badgeStyle: Record<string, { bg: string; color: string }> = {
  Populaire: { bg: 'rgba(201,168,76,0.18)', color: '#B8850A' },
  Premium:   { bg: 'rgba(139,92,246,0.15)', color: '#7C3AED' },
  Tendance:  { bg: 'rgba(239,68,68,0.12)',  color: '#DC2626' },
}

export default function HairstyleListPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sort, setSort] = useState<SortKey>('popular')
  const navigate = useNavigate()
  const [favorites, setFavorites] = useDemoFavorites()

  const filtered = useMemo(() => {
    let list = [...hairstyles]
    if (selectedCategory) list = list.filter(s => s.category === selectedCategory)
    if (sort === 'price_asc')  list.sort((a, b) => a.startingPrice - b.startingPrice)
    if (sort === 'price_desc') list.sort((a, b) => b.startingPrice - a.startingPrice)
    if (sort === 'popular')    list.sort((a, b) => b.reviewCount - a.reviewCount)
    return list
  }, [selectedCategory, sort])

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>
      <Header title="Styles" showBack />

      <div className="pt-4">
        <CategoryCarousel selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Sort bar */}
        <div className="px-4 mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSort(opt.key)}
              className="flex-shrink-0 px-3.5 py-2 rounded-full active-scale"
              style={{
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'Inter',
                background: sort === opt.key ? 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' : 'var(--surface)',
                color: sort === opt.key ? '#1A1A1A' : 'var(--text-2)',
                border: sort === opt.key ? '1.5px solid transparent' : '1.5px solid var(--border)',
                boxShadow: sort === opt.key ? '0 2px 8px rgba(201,168,76,0.3)' : 'none',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div className="px-4 mb-4 flex items-center justify-between">
          <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>{filtered.length}</span> style{filtered.length > 1 ? 's' : ''}
            {selectedCategory && <span style={{ color: 'var(--gold)', fontWeight: 600 }}> · {selectedCategory}</span>}
          </p>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory('')}
              style={{
                fontSize: 11, fontWeight: 500, color: 'var(--text-2)',
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 99, padding: '3px 10px', fontFamily: 'Inter',
              }}
              className="active-scale"
            >
              Réinitialiser ✕
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="px-4 grid grid-cols-2 gap-3">
          {filtered.map(style => (
            <div
              key={style.id}
              onClick={() => navigate(`/hairstylists?category=${style.category}`)}
              className="rounded-2xl overflow-hidden cursor-pointer active-scale"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Image */}
              <div className="relative" style={{ height: 180 }}>
                <img src={style.image} alt={style.name} className="w-full h-full object-cover" loading="lazy" />
                <button
                  type="button"
                  aria-label={favorites.hairstyleIds.includes(style.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  onClick={event => {
                    event.stopPropagation()
                    setFavorites(current => ({
                      ...current,
                      hairstyleIds: toggleId(current.hairstyleIds, style.id),
                    }))
                  }}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full active-scale"
                  style={{
                    background: favorites.hairstyleIds.includes(style.id) ? 'rgba(201,168,76,0.94)' : 'rgba(0,0,0,0.35)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.35)',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={favorites.hairstyleIds.includes(style.id) ? 'white' : 'none'} stroke="white" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>

                {style.badge && (
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-full backdrop-blur-sm"
                    style={{
                      background: badgeStyle[style.badge]?.bg ?? 'rgba(0,0,0,0.5)',
                      color: badgeStyle[style.badge]?.color ?? '#fff',
                      fontSize: 10, fontWeight: 700, fontFamily: 'Inter',
                      border: `1px solid ${badgeStyle[style.badge]?.color ?? '#fff'}30`,
                    }}
                  >
                    {style.badge}
                  </div>
                )}

                {/* Bottom gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-2.5 pb-2.5 pt-8"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
                >
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Inter' }}>{style.name}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#F0D060', fontFamily: 'Inter' }}>
                      dès {style.startingPrice}€
                    </span>
                    <div className="flex items-center gap-0.5">
                      <span style={{ color: '#F59E0B', fontSize: 11 }}>★</span>
                      <span style={{ fontSize: 11, color: '#fff', fontFamily: 'Inter' }}>{style.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-2.5 py-2 flex items-center justify-between">
                <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter' }}>
                  {style.duration}
                </p>
                <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter' }}>
                  {style.reviewCount} avis
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
