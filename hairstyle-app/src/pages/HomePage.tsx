import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import CategoryCarousel from '../components/CategoryCarousel'
import PromoBanner from '../components/PromoBanner'
import HairstyleCarousel from '../components/HairstyleCarousel'
import HairstylistCard from '../components/HairstylistCard'
import hairstylists from '../data/hairstylists.json'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

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

      {/* 4. 🔥 Styles populaires */}
      <HairstyleCarousel onSelect={setSelectedCategory} />

      {/* 5. 📍 Coiffeuses près de vous */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: 6 }}>
            📍 Coiffeuses près de vous
          </h2>
          <button
            onClick={() => navigate('/hairstylists')}
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--gold)', fontFamily: 'Inter' }}
            className="active-scale"
          >
            See all →
          </button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
          {hairstylists.slice(0, 4).map(s => (
            <HairstylistCard key={s.id} stylist={s} compact />
          ))}
        </div>
      </div>

      {/* 6. Catégories */}
      <CategoryCarousel selected={selectedCategory} onSelect={setSelectedCategory} />

      {/* 7. Liste principale — Coiffeuses disponibles */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
            {selectedCategory ? (
              <>Résultats : <span style={{ color: 'var(--gold)' }}>{selectedCategory}</span></>
            ) : (
              'Coiffeuses disponibles'
            )}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory('')}
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
              Réinitialiser
            </button>
          )}
        </div>

        {filteredStylists.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'var(--surface)' }}
            >
              <span style={{ fontSize: 28 }}>😔</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>
              Aucune coiffeuse pour cette catégorie
            </p>
            <button
              onClick={() => setSelectedCategory('')}
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
    </div>
  )
}
