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
    <div className="pb-24">

      {/* 1. Header */}
      <Header />

      {/* 2. Search bar */}
      <div className="pt-2 pb-1">
        <SearchBar />
      </div>

      

      {/* 3. Offre du moment */}
      <PromoBanner />

      {/* 4. Styles populaires */}
      <HairstyleCarousel onSelect={setSelectedCategory} />

      {/* 5. Coiffeuses près de vous */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-base font-semibold flex items-center gap-1.5" style={{ color: '#f5f0e8' }}>
            <span>📍</span> Coiffeuses près de vous
          </h2>
          <button
            onClick={() => navigate('/hairstylists')}
            className="text-xs font-medium text-gold active-scale"
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
          <h2 className="text-base font-semibold" style={{ color: '#f5f0e8' }}>
            {selectedCategory
              ? <>Résultats pour : <span className="text-gold">{selectedCategory}</span></>
              : 'Coiffeuses disponibles'
            }
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory('')}
              className="text-xs px-3 py-1 rounded-full font-medium active-scale"
              style={{ background: '#1a1a1a', color: '#888', border: '1px solid #2a2a2a' }}
            >
              Réinitialiser
            </button>
          )}
        </div>

        {filteredStylists.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-2xl mb-2">😔</p>
            <p className="text-sm" style={{ color: '#666' }}>Aucune coiffeuse pour cette catégorie</p>
          </div>
        ) : (
          filteredStylists.map(s => (
            <HairstylistCard key={s.id} stylist={s} />
          ))
        )}
      </div>

    </div>
  )
}
