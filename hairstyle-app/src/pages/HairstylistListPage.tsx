import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import { formatFcfa } from '../data/catalog'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

export default function HairstylistListPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const serviceId = searchParams.get('serviceId')
  const [favorites, setFavorites] = useDemoFavorites()

  const visible = useMemo(() => category
    ? hairstylists.filter(stylist => stylist.categories.includes(category))
    : hairstylists, [category])

  return (
    <main className="min-h-[100svh] pb-8" style={{ background: '#FFF8F0' }}>
      <header className="grid grid-cols-[38px_1fr_38px] items-center border-b border-[#E7DACA] px-4 pb-3 pt-5">
        <button type="button" onClick={() => navigate(-1)} aria-label="Retour" className="grid h-9 w-9 place-items-center rounded-full active-scale">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.8"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
        </button>
        <h1 className="text-center text-[15px] font-bold">Coiffeuses disponibles</h1>
        <button type="button" aria-label="Filtres" className="grid h-9 w-9 place-items-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.7"><path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M7 14v6" /></svg>
        </button>
      </header>

      <div className="flex items-center justify-between px-4 py-3 text-[10px]">
        <span>⌖ Abidjan, Cocody</span>
        <button type="button" className="font-semibold text-[#5B2A6F]">Modifier</button>
      </div>

      <section className="px-4">
        {visible.length === 0 && <p className="rounded-xl bg-white p-5 text-center text-[11px]">Aucune coiffeuse disponible pour cette catégorie.</p>}
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
                  <p className="mt-1 text-[9px]">À partir de <strong>{formatFcfa(stylist.priceFrom)}</strong></p>
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
    </main>
  )
}
