import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import { categories, formatEuro } from '../data/catalog'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

const LOCATION_OPTIONS = ['Rouen', 'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille'] as const
const PRICE_OPTIONS = [
  { value: null, label: 'Tous' },
  { value: 50, label: '≤ 50 €' },
  { value: 60, label: '≤ 60 €' },
  { value: 70, label: '≤ 70 €' },
] as const

export default function HairstylistListPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const serviceId = searchParams.get('serviceId')
  const [favorites, setFavorites] = useDemoFavorites()
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCity, setSelectedCity] = useState('Rouen')
  const [selectedCategory, setSelectedCategory] = useState(category ?? '')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const visible = useMemo(() => hairstylists
    .filter(stylist => !selectedCategory || stylist.categories.includes(selectedCategory))
    .filter(stylist => stylist.city === selectedCity)
    .filter(stylist => maxPrice === null || stylist.priceFrom <= maxPrice), [maxPrice, selectedCategory, selectedCity])

  const activeFilterCount = [selectedCategory, maxPrice].filter(Boolean).length

  return (
    <main className="min-h-[100svh] pb-8" style={{ background: '#FFF8F0' }}>
      <header className="grid grid-cols-[38px_1fr_38px] items-center border-b border-[#E7DACA] px-4 pb-3 pt-5">
        <button type="button" onClick={() => navigate(-1)} aria-label="Retour" className="grid h-9 w-9 place-items-center rounded-full active-scale">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.8"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
        </button>
        <h1 className="text-center text-[15px] font-bold">Coiffeuses disponibles</h1>
        <button type="button" onClick={() => setShowFilters(true)} aria-label="Filtres" className="relative grid h-9 w-9 place-items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.7"><path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M7 14v6" /></svg>
          {activeFilterCount > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#D4AF37]" />}
        </button>
      </header>

      <div className="flex items-center justify-between px-4 py-3 text-[10px]">
        <span>⌖ {selectedCity}, France</span>
        <button type="button" onClick={() => setShowFilters(true)} className="font-semibold text-[#5B2A6F]">Modifier</button>
      </div>

      <section className="px-4">
        {visible.length === 0 && <p className="rounded-xl bg-white p-5 text-center text-[11px]">Aucune coiffeuse disponible pour ces critères.</p>}
        <div className="divide-y divide-[#E7DACA]">
          {visible.map((stylist, index) => {
            const liked = favorites.hairstylistIds.includes(stylist.id)
            return (
              <article key={stylist.id} className="flex gap-3 py-4">
                <img src={stylist.image} alt={stylist.name} className="h-[74px] w-[74px] flex-shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[12px] font-bold">{stylist.name} <span className="text-[#D4AF37]">●</span></p>
                      <p className="mt-0.5 text-[8px] text-[#756B65]"><span className="text-[#B88900]">★ {stylist.rating} ({stylist.reviewCount})</span> · ⌖ {2 + index * .6} km · ◷ {25 + index * 5} min</p>
                    </div>
                    <button type="button" aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={() => setFavorites(current => ({ ...current, hairstylistIds: toggleId(current.hairstylistIds, stylist.id) }))}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#5B2A6F' : 'none'} stroke="#1F1F1F" strokeWidth="1.7"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg>
                    </button>
                  </div>
                  <p className="mt-2 text-[9px] text-[#554E4A]">{stylist.bio.split('.')[0]}</p>
                  <p className="mt-1 text-[9px]">À partir de <strong>{formatEuro(stylist.priceFrom)}</strong></p>
                  <button
                    type="button"
                    onClick={() => navigate(serviceId
                      ? `/booking?serviceId=${serviceId}&stylistId=${stylist.id}`
                      : `/hairstylist/${stylist.id}`)}
                    className="mt-2 w-full rounded-md bg-[#5B0B62] py-2 text-[9px] font-semibold text-white active-scale"
                  >
                    {serviceId ? 'Choisir cette coiffeuse' : 'Voir le profil'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45" onClick={() => setShowFilters(false)}>
          <section className="w-full max-w-[430px] rounded-t-[24px] bg-[#FFF8F0] px-4 pb-7 pt-4" onClick={event => event.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#D4C8BA]" />
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold">Filtres</h2>
              <button type="button" onClick={() => setShowFilters(false)} aria-label="Fermer" className="grid h-8 w-8 place-items-center rounded-full bg-[#F0E5D7]">×</button>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold">Localisation</p>
              <div className="grid grid-cols-3 gap-2">
                {LOCATION_OPTIONS.map(city => (
                  <button key={city} type="button" onClick={() => setSelectedCity(city)} className="rounded-xl border py-2.5 text-[9px] font-semibold" style={{ background: selectedCity === city ? '#5B0B62' : '#FFFFFF', color: selectedCity === city ? '#FFFFFF' : '#554E4A', borderColor: selectedCity === city ? '#5B0B62' : '#E7DACA' }}>{city}</button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold">Catégorie</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setSelectedCategory('')} className="rounded-full border px-3 py-2 text-[8px] font-semibold" style={{ background: !selectedCategory ? '#5B0B62' : '#FFFFFF', color: !selectedCategory ? '#FFFFFF' : '#554E4A', borderColor: !selectedCategory ? '#5B0B62' : '#E7DACA' }}>Toutes</button>
                {categories.map(item => (
                  <button key={item.name} type="button" onClick={() => setSelectedCategory(item.name)} className="rounded-full border px-3 py-2 text-[8px] font-semibold" style={{ background: selectedCategory === item.name ? '#5B0B62' : '#FFFFFF', color: selectedCategory === item.name ? '#FFFFFF' : '#554E4A', borderColor: selectedCategory === item.name ? '#5B0B62' : '#E7DACA' }}>{item.name}</button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold">Budget de départ</p>
              <div className="grid grid-cols-4 gap-2">
                {PRICE_OPTIONS.map(option => (
                  <button key={option.label} type="button" onClick={() => setMaxPrice(option.value)} className="rounded-xl border py-2.5 text-[8px] font-semibold" style={{ background: maxPrice === option.value ? '#D4AF37' : '#FFFFFF', color: '#322B28', borderColor: maxPrice === option.value ? '#D4AF37' : '#E7DACA' }}>{option.label}</button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => { setSelectedCity('Rouen'); setSelectedCategory(category ?? ''); setMaxPrice(null) }} className="flex-1 rounded-xl border border-[#D9CCBE] py-3 text-[10px] font-semibold">Réinitialiser</button>
              <button type="button" onClick={() => setShowFilters(false)} className="flex-[1.4] rounded-xl bg-[#5B0B62] py-3 text-[10px] font-bold text-white">Afficher ({visible.length})</button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
