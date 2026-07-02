import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import CategoryCarousel from '../components/CategoryCarousel'
import HairstylistCard from '../components/HairstylistCard'
import hairstylists from '../data/hairstylists.json'

type SortKey = 'rating' | 'price_asc' | 'price_desc'

const SORT_LABELS: Record<SortKey, string> = {
  rating:     'Mieux notÃ©es',
  price_asc:  'Prix croissant',
  price_desc: 'Prix dÃ©croissant',
}

export default function HairstylistListPage() {
  const [sort, setSort] = useState<SortKey>('rating')
  const [showSort, setShowSort] = useState(false)
  const [searchParams] = useSearchParams()
  const [manualCategory, setManualCategory] = useState<string | null>(null)
  const [manualQuery, setManualQuery] = useState<string | null>(null)
  const selectedCategory = manualCategory ?? searchParams.get('category') ?? ''
  const query = manualQuery ?? searchParams.get('q') ?? ''

  const filtered = useMemo(() => {
    let list = [...hairstylists]
    if (selectedCategory) list = list.filter(s => s.categories.includes(selectedCategory))
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.categories.some(c => c.toLowerCase().includes(q))
      )
    }
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating)
    if (sort === 'price_asc')  list.sort((a, b) => a.priceFrom - b.priceFrom)
    if (sort === 'price_desc') list.sort((a, b) => b.priceFrom - a.priceFrom)
    return list
  }, [selectedCategory, query, sort])

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>
      <Header title="Coiffeuses" showBack />

      <div className="pt-3">
        <SearchBar placeholder="Rechercher par nom, villeâ€¦" onSearch={setManualQuery} value={query} />
      </div>

      <CategoryCarousel selected={selectedCategory} onSelect={setManualCategory} />

      {/* Toolbar */}
      <div className="px-4 mb-4 flex items-center justify-between">
        <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>{filtered.length}</span> coiffeuse{filtered.length > 1 ? 's' : ''}
          {selectedCategory && (
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}> Â· {selectedCategory}</span>
          )}
        </p>

        <div className="relative">
          <button
            onClick={() => setShowSort(v => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl active-scale"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-1)',
              fontFamily: 'Inter',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="6" y1="12" x2="18" y2="12" />
              <line x1="9" y1="18" x2="15" y2="18" />
            </svg>
            {SORT_LABELS[sort]}
          </button>

          {showSort && (
            <div
              className="absolute right-0 top-10 z-20 rounded-2xl overflow-hidden"
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                minWidth: 160,
              }}
            >
              {(Object.keys(SORT_LABELS) as SortKey[]).map(key => (
                <button
                  key={key}
                  onClick={() => { setSort(key); setShowSort(false) }}
                  className="w-full text-left px-4 py-3 active-scale"
                  style={{
                    fontSize: 13,
                    fontWeight: sort === key ? 700 : 400,
                    color: sort === key ? 'var(--gold)' : 'var(--text-1)',
                    borderBottom: key !== 'price_desc' ? '1px solid var(--border)' : 'none',
                    fontFamily: 'Inter',
                    background: sort === key ? 'var(--gold-light)' : 'transparent',
                  }}
                >
                  {SORT_LABELS[key]}
                  {sort === key && <span className="float-right">âœ“</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reset filters row */}
      {(selectedCategory || query) && (
        <div className="px-4 mb-3 flex gap-2 flex-wrap">
          {selectedCategory && (
            <span
              onClick={() => setManualCategory('')}
              className="flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer active-scale"
              style={{
                background: 'var(--gold-light)',
                border: '1px solid var(--gold-border)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--gold)',
                fontFamily: 'Inter',
              }}
            >
              {selectedCategory} âœ•
            </span>
          )}
          {query && (
            <span
              onClick={() => setManualQuery('')}
              className="flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer active-scale"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-2)',
                fontFamily: 'Inter',
              }}
            >
              "{query}" âœ•
            </span>
          )}
        </div>
      )}

      <div className="px-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-14 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)' }}>
              <span style={{ fontSize: 28 }}>ðŸ”</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }}>
              Aucun rÃ©sultat
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Inter', textAlign: 'center' }}>
              Essaie une autre recherche ou retire les filtres
            </p>
            <button
              onClick={() => { setManualQuery(''); setManualCategory('') }}
              className="active-scale"
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1A1A1A',
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
                borderRadius: 12,
                padding: '10px 24px',
                fontFamily: 'Inter',
              }}
            >
              RÃ©initialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filtered.map(s => <HairstylistCard key={s.id} stylist={s} compact />)}
          </div>
        )}
      </div>
    </div>
  )
}



