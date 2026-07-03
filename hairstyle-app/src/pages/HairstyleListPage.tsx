import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hairstyles from '../data/hairstyles.json'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

type SortKey = 'popular' | 'price_asc' | 'price_desc'

const CATEGORIES = ['Tresses', 'Locks', 'Lissage', 'Perruques', 'Vanilles']
const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Populaires' },
  { key: 'price_asc', label: 'Prix croissant' },
  { key: 'price_desc', label: 'Prix d\u00e9croissant' },
]

const BADGE_STYLE: Record<string, { bg: string; color: string }> = {
  Populaire: { bg: 'rgba(196,69,115,0.14)', color: '#C44573' },
  Premium: { bg: 'rgba(183,121,77,0.14)', color: '#B7794D' },
  Tendance: { bg: 'rgba(239,68,68,0.10)', color: '#DC2626' },
}

export default function HairstyleListPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sort, setSort] = useState<SortKey>('popular')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [favorites, setFavorites] = useDemoFavorites()

  const filtered = useMemo(() => {
    let list = [...hairstyles]
    if (selectedCategory) list = list.filter(style => style.category === selectedCategory)
    if (showFavoritesOnly) list = list.filter(style => favorites.hairstyleIds.includes(style.id))
    if (sort === 'price_asc') list.sort((a, b) => a.startingPrice - b.startingPrice)
    if (sort === 'price_desc') list.sort((a, b) => b.startingPrice - a.startingPrice)
    if (sort === 'popular') list.sort((a, b) => b.reviewCount - a.reviewCount)
    return list
  }, [favorites.hairstyleIds, selectedCategory, showFavoritesOnly, sort])

  const featured = useMemo(() => {
    return [...hairstyles].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating
      return b.reviewCount - a.reviewCount
    })[0]
  }, [])

  return (
    <main className="pb-24" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <section className="px-4 pt-4 pb-3">
        <div className="grid grid-cols-[40px_1fr_40px] items-center mb-4">
          <button type="button" onClick={() => navigate('/')} aria-label="Retour accueil" className="w-10 h-10 rounded-full flex items-center justify-center active-scale" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-1)" strokeWidth="2.2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <div className="text-center min-w-0">
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope', fontWeight: 800 }}>Inspiration</p>
            <h1 className="truncate" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Fraunces', lineHeight: 1.05 }}>Styles</h1>
          </div>
          <span aria-hidden="true" className="w-10 h-10" />
        </div>

        <button type="button" onClick={() => navigate(`/hairstylists?category=${encodeURIComponent(featured.category)}`)} className="w-full text-left rounded-3xl overflow-hidden active-scale relative" style={{ height: 190, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 10px 28px rgba(82,32,54,0.10)' }}>
          <img src={featured.image} alt={featured.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(36,21,28,0.78) 0%, rgba(36,21,28,0.08) 72%)' }} />
          <div className="absolute left-4 right-4 bottom-4">
            {featured.badge && <span className="inline-flex px-2.5 py-1 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.86)', color: 'var(--text-1)', fontSize: 10, fontWeight: 800, fontFamily: 'Manrope' }}>{featured.badge}</span>}
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate" style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Fraunces', lineHeight: 1.05 }}>{featured.name}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', fontFamily: 'Manrope', marginTop: 4 }}>{featured.duration} {'\u00b7'} {'\u2605'} {featured.rating}</p>
              </div>
              <span className="px-3 py-2 rounded-2xl" style={{ background: '#fff', color: '#9F2E5B', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>d{`\u00e8`}s {featured.startingPrice}{'\u20ac'}</span>
            </div>
          </div>
        </button>
      </section>

      <section className="mb-4"><div className="flex gap-2 px-4 overflow-x-auto no-scrollbar pb-1">
        <button type="button" onClick={() => setShowFavoritesOnly(active => !active)} className="flex-shrink-0 px-4 py-2.5 rounded-2xl active-scale inline-flex items-center gap-2" style={{ background: showFavoritesOnly ? 'var(--text-1)' : 'var(--surface)', color: showFavoritesOnly ? '#fff' : 'var(--text-2)', border: showFavoritesOnly ? '1px solid var(--text-1)' : '1px solid var(--border)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={showFavoritesOnly ? '#fff' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg>
          Favoris {favorites.hairstyleIds.length}
        </button>
        {CATEGORIES.map(category => {
          const active = selectedCategory === category
          return <button key={category} type="button" onClick={() => setSelectedCategory(active ? '' : category)} className="flex-shrink-0 px-4 py-2.5 rounded-2xl active-scale" style={{ background: active ? 'var(--text-1)' : 'var(--surface)', color: active ? '#fff' : 'var(--text-2)', border: active ? '1px solid var(--text-1)' : '1px solid var(--border)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>{category}</button>
        })}
      </div></section>

      <section className="px-4 mb-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Manrope', whiteSpace: 'nowrap' }}><strong style={{ color: 'var(--text-1)' }}>{filtered.length}</strong> styles</p>
          <div className="flex gap-1 p-1 rounded-2xl overflow-x-auto no-scrollbar" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
            {SORT_OPTIONS.map(option => {
              const active = sort === option.key
              return <button key={option.key} type="button" onClick={() => setSort(option.key)} className="px-2.5 py-1.5 rounded-xl active-scale flex-shrink-0" style={{ background: active ? '#fff' : 'transparent', color: active ? 'var(--text-1)' : 'var(--text-3)', fontSize: 10.5, fontWeight: 800, fontFamily: 'Manrope', boxShadow: active ? '0 2px 8px rgba(82,32,54,0.06)' : 'none', whiteSpace: 'nowrap' }}>{option.label}</button>
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-14 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg></div>
            <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>Aucun style favori ici</p>
            <button type="button" onClick={() => { setShowFavoritesOnly(false); setSelectedCategory('') }} className="px-4 py-3 rounded-2xl active-scale" style={{ background: 'var(--cta-gradient)', color: '#fff', fontSize: 13, fontWeight: 800, fontFamily: 'Manrope' }}>Tout afficher</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(style => {
              const liked = favorites.hairstyleIds.includes(style.id)
              const badge = style.badge ? BADGE_STYLE[style.badge] : undefined
              return <button key={style.id} type="button" onClick={() => navigate(`/hairstylists?category=${encodeURIComponent(style.category)}`)} className="rounded-3xl overflow-hidden active-scale text-left" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="relative" style={{ height: 178 }}>
                  <img src={style.image} alt={style.name} className="w-full h-full object-cover" loading="lazy" />
                  <button type="button" aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={event => { event.stopPropagation(); setFavorites(current => ({ ...current, hairstyleIds: toggleId(current.hairstyleIds, style.id) })) }} className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center active-scale" style={{ background: liked ? 'var(--gold)' : 'rgba(36,21,28,0.42)', backdropFilter: 'blur(8px)' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={liked ? '#fff' : 'none'} stroke="#fff" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                  </button>
                  {badge && <span className="absolute top-2 left-2 px-2 py-1 rounded-full" style={{ background: badge.bg, color: badge.color, fontSize: 10, fontWeight: 800, fontFamily: 'Manrope' }}>{style.badge}</span>}
                </div>
                <div className="p-3"><p className="truncate" style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{style.name}</p><div className="flex items-center justify-between mt-1"><span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>d{`\u00e8`}s {style.startingPrice}{'\u20ac'}</span><span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{'\u2605'} {style.rating}</span></div></div>
              </button>
            })}
          </div>
        )}
      </section>
    </main>
  )
}