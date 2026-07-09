import { type FormEvent, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchCatalog, type SearchType } from '../lib/searchCatalog'

const TYPE_LABELS: Record<SearchType, string> = {
  all: 'Tout',
  cuts: 'Coupes',
  stylists: 'Coiffeuses',
  categories: 'Catégories',
}

export default function SearchResultsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const type = (searchParams.get('type') as SearchType | null) ?? 'all'
  const category = searchParams.get('category') ?? ''
  const maxPriceParam = searchParams.get('maxPrice')
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : null

  const results = useMemo(
    () => searchCatalog(searchParams.get('q') ?? '', { type, category, maxPrice }),
    [category, maxPrice, searchParams, type],
  )

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (query.trim()) next.set('q', query.trim())
    else next.delete('q')
    setSearchParams(next)
  }

  return (
    <main className="min-h-[100svh] pb-10" style={{ background: '#FFF8F0' }}>
      <header className="border-b border-[#E7DACA] px-4 pb-3 pt-5">
        <div className="grid grid-cols-[38px_1fr_38px] items-center">
          <button type="button" onClick={() => navigate(-1)} aria-label="Retour" className="grid h-9 w-9 place-items-center">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.8"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
          </button>
          <h1 className="text-center text-[15px] font-bold">Résultats de recherche</h1>
          <span />
        </div>
        <form onSubmit={submit} className="mt-3 flex h-11 items-center rounded-xl border border-[#E7DACA] bg-white px-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#756B65" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
          <input value={query} onChange={event => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 text-[11px] outline-none" placeholder="Rechercher..." />
        </form>
      </header>

      <section className="px-4 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] text-[#756B65]"><strong className="text-[#1F1F1F]">{results.length}</strong> résultat{results.length > 1 ? 's' : ''}</p>
          <span className="rounded-full bg-[#F0E5D7] px-3 py-1 text-[9px] text-[#5B2A6F]">{TYPE_LABELS[type]}</span>
        </div>

        {results.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[14px] font-bold">Aucun résultat</p>
            <p className="mt-2 text-[10px] text-[#756B65]">Essayez un autre terme ou élargissez les filtres.</p>
            <button type="button" onClick={() => navigate('/')} className="mt-5 rounded-xl bg-[#5B0B62] px-5 py-3 text-[10px] font-bold text-white">Retour à l’accueil</button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {results.map(result => (
              <button key={result.id} type="button" onClick={() => navigate(result.path)} className="flex w-full items-center gap-3 rounded-2xl border border-[#E7DACA] bg-white p-3 text-left active-scale">
                <img src={result.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-bold">{result.title}</span>
                  <span className="mt-1 block truncate text-[8px] text-[#756B65]">{result.subtitle}</span>
                </span>
                <span className="text-[#5B2A6F]">›</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
