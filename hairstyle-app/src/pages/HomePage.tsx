import { type FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, formatFcfa, hairstyles } from '../data/catalog'
import { searchCatalog, type SearchType } from '../lib/searchCatalog'

const TYPE_OPTIONS: Array<{ value: SearchType; label: string }> = [
  { value: 'all', label: 'Tout' },
  { value: 'cuts', label: 'Coupes' },
  { value: 'stylists', label: 'Coiffeuses' },
  { value: 'categories', label: 'Catégories' },
]

const PRICE_OPTIONS = [
  { value: null, label: 'Tous les prix' },
  { value: 20000, label: '≤ 20 000' },
  { value: 30000, label: '≤ 30 000' },
  { value: 50000, label: '≤ 50 000' },
] as const

export default function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [type, setType] = useState<SearchType>('all')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const searchResults = useMemo(
    () => searchCatalog(query, { type, category, maxPrice }),
    [category, maxPrice, query, type],
  )

  const buildSearchPath = () => {
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (type !== 'all') params.set('type', type)
    if (category) params.set('category', category)
    if (maxPrice !== null) params.set('maxPrice', String(maxPrice))
    return `/search?${params.toString()}`
  }

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    if (query.trim() && searchResults.length > 0) navigate(searchResults[0].path)
    else navigate(buildSearchPath())
  }

  return (
    <main className="min-h-[100svh] pb-24" style={{ background: '#FFF8F0' }}>
      <section className="relative min-h-[390px] overflow-visible bg-[#3B0A45] px-4 pb-12 pt-5 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/images/hairstyles/fulani-braids-cutout.png" alt="" className="absolute bottom-0 right-[-18px] h-[338px] w-[292px] object-contain object-bottom" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,#3B0A45 0%,#4C0D55 48%,rgba(59,10,69,.12) 82%)' }} />
        </div>

        <header className="relative z-10 flex items-center justify-between">
          <span aria-hidden="true" className="h-9 w-9" />
          <div className="grid h-[54px] w-[54px] place-items-center rounded-2xl bg-white shadow-lg" aria-label="Ub’Hair">
            <img src="/images/ubhair-symbol-transparent.png" alt="" className="h-[46px] w-[46px] object-contain" />
          </div>
          <button type="button" onClick={() => navigate('/notifications')} aria-label="Notifications" className="grid h-9 w-9 place-items-center">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M14 21h-4" /></svg>
          </button>
        </header>

        <div className="relative z-10 mt-7 max-w-[185px]">
          <h1 className="text-[24px] font-bold leading-[1.02]" style={{ fontFamily: 'Playfair Display' }}>
            Bonjour,<br />belle couronne ! <span className="text-[16px]">👑</span>
          </h1>
          <p className="mt-5 text-[11px] leading-[1.6] text-white/85">Trouvez la coiffure parfaite et réservez avec des coiffeuses professionnelles près de chez vous.</p>
        </div>

        <form onSubmit={submitSearch} className="absolute bottom-9 left-4 right-4 z-30 flex h-[52px] items-center rounded-xl bg-white px-3 shadow-xl">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#302B28" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
          <input
            value={query}
            onFocus={() => setShowSuggestions(true)}
            onChange={event => { setQuery(event.target.value); setShowSuggestions(true) }}
            placeholder="Rechercher une coiffure, une coiffeuse..."
            className="min-w-0 flex-1 bg-transparent px-3 text-[9px] text-[#1F1F1F] outline-none"
          />
          <button type="button" onClick={() => setShowFilters(true)} aria-label="Filtres" className="relative grid h-8 w-8 place-items-center rounded-lg text-[#3B0A45]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M7 14v6" /></svg>
            {(type !== 'all' || category || maxPrice !== null) && <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#D4AF37]" />}
          </button>
          {showSuggestions && query.trim() && (
            <div className="absolute left-0 right-0 top-[58px] overflow-hidden rounded-xl border border-[#E7DACA] bg-white shadow-xl">
              {searchResults.length === 0 ? (
                <button type="button" onClick={() => navigate(buildSearchPath())} className="w-full px-4 py-4 text-left text-[10px] text-[#756B65]">Aucun résultat direct — afficher la recherche</button>
              ) : (
                <>
                  {searchResults.slice(0, 5).map(result => (
                    <button key={result.id} type="button" onClick={() => navigate(result.path)} className="flex w-full items-center gap-3 border-b border-[#F0E5D7] px-3 py-2.5 text-left last:border-b-0">
                      <img src={result.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[9px] font-bold">{result.title}</span>
                        <span className="mt-0.5 block truncate text-[7px] text-[#756B65]">{result.subtitle}</span>
                      </span>
                      <span className="text-[12px] text-[#5B2A6F]">›</span>
                    </button>
                  ))}
                  <button type="button" onClick={() => navigate(buildSearchPath())} className="w-full bg-[#F8F0E6] py-2.5 text-[8px] font-semibold text-[#5B2A6F]">Voir tous les résultats</button>
                </>
              )}
            </div>
          )}
        </form>
      </section>

      <section className="relative z-10 -mt-5 mx-3 rounded-[22px] bg-white px-3 pb-4 pt-4 shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[12px] font-bold">Catégories populaires</h2>
          <button type="button" onClick={() => navigate('/hairstyles')} className="text-[9px] font-semibold text-[#5B2A6F]">Voir tout ›</button>
        </div>
        <div className="flex justify-between gap-1 overflow-x-auto no-scrollbar">
          {categories.slice(0, 5).map(category => (
            <button key={category.name} type="button" onClick={() => navigate(`/hairstyles?category=${encodeURIComponent(category.name)}`)} className="w-[63px] flex-shrink-0 text-center active-scale">
              <img src={category.image} alt="" className="mx-auto h-[52px] w-[52px] rounded-full object-cover" />
              <span className="mt-1.5 block text-[8px] font-semibold leading-[1.15] text-[#322B28]">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-4 mt-4 overflow-hidden rounded-2xl bg-[#F5E7D5]">
        <button type="button" onClick={() => navigate('/hairstylists')} className="relative flex h-[92px] w-full items-center text-left active-scale">
          <div className="relative z-10 w-[58%] px-4">
            <p className="text-[12px] font-bold text-[#3B0A45]">-20% sur votre première réservation ✨</p>
            <p className="mt-1 text-[9px] text-[#554E4A]">avec le code : <strong>BIENVENUE20</strong></p>
          </div>
          <img src="/images/hairstyles/vanilles.png" alt="" className="absolute right-0 h-full w-[43%] object-cover object-top" />
        </button>
      </section>

      <section className="px-4 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-bold">Inspirations du moment</h2>
          <button type="button" onClick={() => navigate('/hairstyles')} className="text-[10px] font-semibold text-[#5B2A6F]">Tout voir ›</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {hairstyles.slice(0, 4).map(style => (
            <button key={style.id} type="button" onClick={() => navigate(`/service/${style.id}`)} className="w-[138px] flex-shrink-0 overflow-hidden rounded-xl bg-white text-left active-scale">
              <img src={style.image} alt={style.name} className="h-[112px] w-full object-cover" />
              <div className="p-2">
                <p className="truncate text-[10px] font-bold">{style.name}</p>
                <p className="mt-0.5 text-[8px] font-semibold text-[#5B2A6F]">dès {formatFcfa(style.startingPrice)}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45" onClick={() => setShowFilters(false)}>
          <section className="w-full max-w-[430px] rounded-t-[28px] bg-[#FFF8F0] px-4 pb-7 pt-4" onClick={event => event.stopPropagation()}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#D4C8BA]" />
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-bold">Filtrer la recherche</h2>
              <button type="button" onClick={() => setShowFilters(false)} aria-label="Fermer" className="grid h-8 w-8 place-items-center rounded-full bg-[#F0E5D7]">×</button>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold">Je recherche</p>
              <div className="grid grid-cols-4 gap-2">
                {TYPE_OPTIONS.map(option => (
                  <button key={option.value} type="button" onClick={() => setType(option.value)} className="rounded-xl border py-2.5 text-[8px] font-semibold" style={{ background: type === option.value ? '#5B0B62' : '#FFFFFF', color: type === option.value ? '#FFFFFF' : '#554E4A', borderColor: type === option.value ? '#5B0B62' : '#E7DACA' }}>{option.label}</button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold">Catégorie</p>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setCategory('')} className="rounded-full border px-3 py-2 text-[8px] font-semibold" style={{ background: !category ? '#5B0B62' : '#FFFFFF', color: !category ? '#FFFFFF' : '#554E4A', borderColor: !category ? '#5B0B62' : '#E7DACA' }}>Toutes</button>
                {categories.map(item => (
                  <button key={item.name} type="button" onClick={() => setCategory(item.name)} className="rounded-full border px-3 py-2 text-[8px] font-semibold" style={{ background: category === item.name ? '#5B0B62' : '#FFFFFF', color: category === item.name ? '#FFFFFF' : '#554E4A', borderColor: category === item.name ? '#5B0B62' : '#E7DACA' }}>{item.name}</button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold">Budget maximum</p>
              <div className="grid grid-cols-4 gap-2">
                {PRICE_OPTIONS.map(option => (
                  <button key={option.label} type="button" onClick={() => setMaxPrice(option.value)} className="rounded-xl border py-2.5 text-[8px] font-semibold" style={{ background: maxPrice === option.value ? '#D4AF37' : '#FFFFFF', color: '#322B28', borderColor: maxPrice === option.value ? '#D4AF37' : '#E7DACA' }}>{option.label}</button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => { setType('all'); setCategory(''); setMaxPrice(null) }} className="flex-1 rounded-xl border border-[#D9CCBE] py-3 text-[10px] font-semibold">Réinitialiser</button>
              <button type="button" onClick={() => { setShowFilters(false); setShowSuggestions(Boolean(query.trim())) }} className="flex-[1.4] rounded-xl bg-[#5B0B62] py-3 text-[10px] font-bold text-white">Appliquer ({searchResults.length})</button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
