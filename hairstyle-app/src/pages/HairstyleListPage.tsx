import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import CategoryCarousel from '../components/CategoryCarousel'
import hairstyles from '../data/hairstyles.json'

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

export default function HairstyleListPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const navigate = useNavigate()

  const filtered = selectedCategory
    ? hairstyles.filter(s => s.category === selectedCategory)
    : hairstyles

  return (
    <div className="pb-24">
      <Header title="Styles" showBack />
      <div className="pt-4">
        <CategoryCarousel selected={selectedCategory} onSelect={setSelectedCategory} />

        <div className="px-4">
          {selectedCategory && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gold font-medium">Résultats pour : {selectedCategory}</p>
              <button
                onClick={() => setSelectedCategory('')}
                className="text-xs px-3 py-1 rounded-full active-scale"
                style={{ background: '#1a1a1a', color: '#888', border: '1px solid #2a2a2a' }}
              >
                Réinitialiser
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {filtered.map(style => (
              <div
                key={style.id}
                onClick={() => navigate(`/hairstylists?category=${style.category}`)}
                className="rounded-2xl overflow-hidden cursor-pointer active-scale"
                style={{ background: '#141414', border: '1px solid #1f1f1f' }}
              >
                <div className="relative h-48">
                  <img src={style.image} alt={style.name} className="w-full h-full object-cover" loading="lazy"/>
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
                  <div className="absolute bottom-0 left-0 right-0 p-2.5"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
                    <p className="text-sm font-semibold text-white">{style.name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs font-bold text-gold">dès {style.startingPrice}€</span>
                      <div className="flex items-center gap-0.5">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-xs text-white">{style.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2.5 py-2">
                  <p className="text-xs" style={{ color: '#666' }}>{style.duration} · {style.reviewCount} avis</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
