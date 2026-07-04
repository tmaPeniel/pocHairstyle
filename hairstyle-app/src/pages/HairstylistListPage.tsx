import { type FormEvent, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import { toggleId, useDemoFavorites } from '../lib/demoStore'
import InitialsAvatar from '../components/InitialsAvatar'

type SortKey = 'rating' | 'price_asc' | 'price_desc'

const CATEGORIES = ['Tresses', 'Locks', 'Lissage', 'Perruques', 'Vanilles']
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'rating', label: 'Top' },
  { key: 'price_asc', label: 'Prix croissant' },
  { key: 'price_desc', label: 'Prix d\u00e9croissant' },
]

export default function HairstylistListPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [sort, setSort] = useState<SortKey>('rating')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') ?? '')
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [favorites, setFavorites] = useDemoFavorites()

  const filtered = useMemo(() => {
    let list = [...hairstylists]
    if (selectedCategory) list = list.filter(stylist => stylist.categories.includes(selectedCategory))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(stylist =>
        stylist.name.toLowerCase().includes(q) ||
        stylist.city.toLowerCase().includes(q) ||
        stylist.categories.some(category => category.toLowerCase().includes(q))
      )
    }
    if (showFavoritesOnly) list = list.filter(stylist => favorites.hairstylistIds.includes(stylist.id))
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    if (sort === 'price_asc') list.sort((a, b) => a.priceFrom - b.priceFrom)
    if (sort === 'price_desc') list.sort((a, b) => b.priceFrom - a.priceFrom)
    return list
  }, [favorites.hairstylistIds, selectedCategory, query, showFavoritesOnly, sort])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const resetFilters = () => {
    setQuery('')
    setSelectedCategory('')
    setShowFavoritesOnly(false)
  }

  return (
    <main className="pb-24" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <section className="px-4 pt-4 pb-3">
        <div className="grid grid-cols-[40px_1fr_40px] items-center mb-4">
          <button type="button" onClick={() => navigate('/')} aria-label="Retour accueil" className="w-10 h-10 rounded-full flex items-center justify-center active-scale" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-1)" strokeWidth="2.2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <div className="text-center min-w-0">
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope', fontWeight: 800 }}>Marketplace</p>
            <h1 className="truncate" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Fraunces', lineHeight: 1.05 }}>Coiffeuses</h1>
          </div>
          <span aria-hidden="true" className="w-10 h-10" />
        </div>

        <form onSubmit={submitSearch} className="relative mb-3">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Nom, ville, style..." className="w-full rounded-2xl outline-none" style={{ height: 52, paddingLeft: 46, paddingRight: 18, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 14, fontWeight: 700, fontFamily: 'Manrope' }} />
        </form>
      </section>

      <section className="mb-4"><div className="flex gap-2 px-4 overflow-x-auto no-scrollbar pb-1">
        <button type="button" onClick={() => setShowFavoritesOnly(active => !active)} className="flex-shrink-0 px-4 py-2.5 rounded-2xl active-scale inline-flex items-center gap-2" style={{ background: showFavoritesOnly ? 'var(--text-1)' : 'var(--surface)', color: showFavoritesOnly ? '#fff' : 'var(--text-2)', border: showFavoritesOnly ? '1px solid var(--text-1)' : '1px solid var(--border)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={showFavoritesOnly ? '#fff' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg>
          Favoris {favorites.hairstylistIds.length}
        </button>
        {CATEGORIES.map(category => {
          const active = selectedCategory === category
          return <button key={category} type="button" onClick={() => setSelectedCategory(active ? '' : category)} className="flex-shrink-0 px-4 py-2.5 rounded-2xl active-scale" style={{ background: active ? 'var(--text-1)' : 'var(--surface)', color: active ? '#fff' : 'var(--text-2)', border: active ? '1px solid var(--text-1)' : '1px solid var(--border)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>{category}</button>
        })}
      </div></section>

      <section className="px-4 mb-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Manrope', whiteSpace: 'nowrap' }}><strong style={{ color: 'var(--text-1)' }}>{filtered.length}</strong> disponibles</p>
          <div className="flex gap-1 p-1 rounded-2xl overflow-x-auto no-scrollbar" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
            {SORT_OPTIONS.map(option => {
              const active = sort === option.key
              return <button key={option.key} type="button" onClick={() => setSort(option.key)} className="px-2.5 py-1.5 rounded-xl active-scale flex-shrink-0" style={{ background: active ? '#fff' : 'transparent', color: active ? 'var(--text-1)' : 'var(--text-3)', fontSize: 10.5, fontWeight: 800, fontFamily: 'Manrope', boxShadow: active ? '0 2px 8px rgba(82,32,54,0.06)' : 'none', whiteSpace: 'nowrap' }}>{option.label}</button>
            })}
          </div>
        </div>

        {(selectedCategory || query || showFavoritesOnly) && (
          <div className="flex gap-2 flex-wrap mb-3">
            {showFavoritesOnly && <button type="button" onClick={() => setShowFavoritesOnly(false)} className="px-3 py-1.5 rounded-full active-scale" style={{ background: 'var(--primary-light)', color: 'var(--gold)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>Favoris x</button>}
            {selectedCategory && <button type="button" onClick={() => setSelectedCategory('')} className="px-3 py-1.5 rounded-full active-scale" style={{ background: 'var(--primary-light)', color: 'var(--gold)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>{selectedCategory} x</button>}
            {query && <button type="button" onClick={() => setQuery('')} className="px-3 py-1.5 rounded-full active-scale" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>&quot;{query}&quot; x</button>}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg></div>
            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>Aucun r{`\u00e9`}sultat</p>
            <button type="button" onClick={resetFilters} className="px-4 py-3 rounded-2xl active-scale" style={{ background: 'var(--cta-gradient)', color: '#fff', fontSize: 13, fontWeight: 800, fontFamily: 'Manrope' }}>R{`\u00e9`}initialiser</button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(stylist => {
              const liked = favorites.hairstylistIds.includes(stylist.id)
              return <div key={stylist.id} role="button" tabIndex={0} onClick={() => navigate(`/hairstylist/${stylist.id}`)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); navigate(`/hairstylist/${stylist.id}`) } }} className="w-full p-3 rounded-3xl active-scale text-left cursor-pointer" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 6px 18px rgba(82,32,54,0.05)' }}>
                <div className="flex gap-3">
                  <div className="relative flex-shrink-0"><InitialsAvatar name={stylist.name} className="w-20 h-20 rounded-3xl" textStyle={{ fontSize: 22 }} /><span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full" style={{ background: '#fff', color: '#B7794D', fontSize: 10, fontWeight: 800, fontFamily: 'Manrope', boxShadow: '0 2px 8px rgba(82,32,54,0.10)' }}>{'\u2605'} {stylist.rating}</span></div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="min-w-0"><p className="truncate" style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{stylist.name}</p><p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{stylist.city} {'\u00b7'} {stylist.reviewCount} avis</p></div>
                      <div className="flex items-center gap-2 flex-shrink-0"><span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{stylist.priceFrom}{'\u20ac'}</span><button type="button" aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={event => { event.stopPropagation(); setFavorites(current => ({ ...current, hairstylistIds: toggleId(current.hairstylistIds, stylist.id) })) }} className="w-8 h-8 rounded-full flex items-center justify-center active-scale" style={{ background: liked ? 'var(--gold)' : 'var(--surface-2)', border: liked ? '1px solid var(--gold)' : '1px solid var(--border)', color: liked ? '#fff' : 'var(--text-3)' }}><svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? '#fff' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg></button></div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mt-2">{stylist.categories.slice(0, 3).map(category => <span key={category} className="px-2 py-1 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 10, fontWeight: 800, fontFamily: 'Manrope' }}>{category}</span>)}</div>
                    <div className="flex items-center justify-between mt-3"><span style={{ fontSize: 11, color: '#15803D', fontWeight: 800, fontFamily: 'Manrope' }}>Disponible</span><span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 800, fontFamily: 'Manrope' }}>Voir profil</span></div>
                  </div>
                </div>
              </div>
            })}
          </div>
        )}
      </section>
    </main>
  )
}