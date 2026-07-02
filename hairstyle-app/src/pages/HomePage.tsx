import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import CategoryCarousel from '../components/CategoryCarousel'
import PromoBanner from '../components/PromoBanner'
import HairstyleCarousel from '../components/HairstyleCarousel'
import HairstylistCard from '../components/HairstylistCard'
import hairstylists from '../data/hairstylists.json'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const categoryFromUrl = searchParams.get('category') ?? ''
  const [manualCategory, setManualCategory] = useState<string | null>(null)
  const selectedCategory = manualCategory ?? categoryFromUrl

  const filteredStylists = selectedCategory
    ? hairstylists.filter(s => s.categories.includes(selectedCategory))
    : hairstylists

  return (
    <div className="pb-24" style={{ background: 'var(--bg)' }}>

      {/* 1. Header */}
      <Header />

      {/* 2. Search bar */}
      <div className="pt-3">
        <SearchBar />
      </div>    

      {/* 3. Offre du moment */}
      <PromoBanner />

       {/* 4. CatÃ©gories */}
      <CategoryCarousel selected={selectedCategory} onSelect={setManualCategory} />

      {/* 5. Liste principale â€” Coiffeuses disponibles */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
            {selectedCategory ? (
              <>RÃ©sultats : <span style={{ color: 'var(--gold)' }}>{selectedCategory}</span></>
            ) : (
              'Coiffeuses disponibles'
            )}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setManualCategory('')}
              className="active-scale"
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: 'var(--text-2)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 99,
                padding: '4px 12px',
                fontFamily: 'Inter',
              }}
            >
              RÃ©initialiser
            </button>
          )}
        </div>

        {filteredStylists.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'var(--surface)' }}
            >
              <span style={{ fontSize: 28 }}>ðŸ˜”</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>
              Aucune coiffeuse pour cette catÃ©gorie
            </p>
            <button
              onClick={() => setManualCategory('')}
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
              Voir toutes les coiffeuses
            </button>
          </div>
        ) : (
          filteredStylists.map(s => <HairstylistCard key={s.id} stylist={s} />)
        )}
      </div>

      {/* 6. ðŸ”¥ Styles populaires */}
      <HairstyleCarousel onSelect={setManualCategory} />

      {/* 7. ðŸ“ Coiffeuses prÃ¨s de vous */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: 6 }}>
            ðŸ“ Coiffeuses prÃ¨s de vous
          </h2>
          <button
            onClick={() => navigate('/hairstylists')}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', fontFamily: 'Inter' }}
            className="active-scale"
          >
            See all â†’
          </button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
          {hairstylists.slice(0, 4).map(s => (
            <div key={s.id} className="flex-shrink-0 w-32">
              <HairstylistCard stylist={s} compact />
            </div>
          ))}
        </div>
      </div>

     
    </div>
  )
}


