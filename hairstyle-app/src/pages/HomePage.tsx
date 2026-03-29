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

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
  }

  return (
    <div className="pb-24">
      <Header />

      {/* Hero greeting */}
      <div className="px-4 mb-5">
        <p className="text-xs text-gold mb-1 font-medium tracking-widest uppercase">Bonjour 👋</p>
        <h1 className="text-2xl font-bold leading-tight" style={{ color: '#f5f0e8' }}>
          Quelle coiffure<br/>
          <span className="text-gold">tu veux aujourd'hui ?</span>
        </h1>
      </div>

      <SearchBar />
      <CategoryCarousel selected={selectedCategory} onSelect={handleCategorySelect} />
      <PromoBanner />
      <HairstyleCarousel onSelect={handleCategorySelect} />

      {/* Coiffeuses proches */}
      <div className="mb-6">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="text-base font-semibold" style={{ color: '#f5f0e8' }}>Coiffeuses proches</h2>
          <button onClick={() => navigate('/hairstylists')} className="text-xs font-medium text-gold active-scale">
            See all →
          </button>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
          {hairstylists.slice(0, 4).map(s => (
            <HairstylistCard key={s.id} stylist={s} compact />
          ))}
        </div>
      </div>

      {/* Filtered list */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold" style={{ color: '#f5f0e8' }}>
            {selectedCategory ? (
              <span>Résultats pour : <span className="text-gold">{selectedCategory}</span></span>
            ) : (
              'Toutes les coiffeuses'
            )}
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
