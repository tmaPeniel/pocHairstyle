import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import CategoryCarousel from '../components/CategoryCarousel'
import HairstylistCard from '../components/HairstylistCard'
import hairstylists from '../data/hairstylists.json'

export default function HairstylistListPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

  const filtered = selectedCategory
    ? hairstylists.filter(s => s.categories.includes(selectedCategory))
    : hairstylists

  return (
    <div className="pb-24">
      <Header title="Coiffeuses" showBack />
      <div className="pt-2">
        <SearchBar placeholder="Rechercher une coiffeuse..." onSearch={() => {}} />
        <CategoryCarousel selected={selectedCategory} onSelect={setSelectedCategory} />
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: '#666' }}>
              {filtered.length} coiffeuse{filtered.length > 1 ? 's' : ''}
              {selectedCategory && <span className="text-gold"> · {selectedCategory}</span>}
            </p>
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
          {filtered.map(s => <HairstylistCard key={s.id} stylist={s} />)}
        </div>
      </div>
    </div>
  )
}
