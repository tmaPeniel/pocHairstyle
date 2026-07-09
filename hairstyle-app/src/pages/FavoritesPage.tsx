import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import { formatFcfa, hairstyles, services } from '../data/catalog'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

type FavoriteTab = 'all' | 'stylists' | 'cuts'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<FavoriteTab>('all')
  const [favorites, setFavorites] = useDemoFavorites()

  const savedStylists = useMemo(
    () => hairstylists.filter(stylist => favorites.hairstylistIds.includes(stylist.id)),
    [favorites.hairstylistIds],
  )
  const savedServices = useMemo(
    () => services.filter(service => favorites.serviceIds.includes(service.id)),
    [favorites.serviceIds],
  )
  const savedStyles = useMemo(
    () => hairstyles.filter(style => favorites.hairstyleIds.includes(style.id) && !favorites.serviceIds.includes(style.id)),
    [favorites.hairstyleIds, favorites.serviceIds],
  )
  const cutCount = savedServices.length + savedStyles.length
  const total = savedStylists.length + cutCount

  return (
    <main className="min-h-[100svh] pb-24" style={{ background: '#FFF8F0' }}>
      <header className="grid grid-cols-[38px_1fr_38px] items-center border-b border-[#E7DACA] px-4 pb-3 pt-5">
        <button type="button" onClick={() => navigate(-1)} aria-label="Retour" className="grid h-9 w-9 place-items-center rounded-full active-scale">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.8"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
        </button>
        <h1 className="text-center text-[16px] font-bold">Mes favoris</h1>
        <span />
      </header>

      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-[#3B0A45] p-4 text-white">
          <p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#D4AF37]">Votre sélection</p>
          <div className="mt-1 flex items-end justify-between">
            <h2 className="text-[22px] font-bold" style={{ fontFamily: 'Playfair Display' }}>Vos envies coiffure</h2>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px]">{total} favori{total > 1 ? 's' : ''}</span>
          </div>
          <p className="mt-2 max-w-[280px] text-[9px] leading-4 text-white/70">Retrouvez les coiffeuses et les coupes que vous avez mises de côté.</p>
        </div>

        <div className="mt-4 grid grid-cols-3 rounded-xl bg-[#F0E5D7] p-1">
          {([
            ['all', `Tout (${total})`],
            ['stylists', `Coiffeuses (${savedStylists.length})`],
            ['cuts', `Coupes (${cutCount})`],
          ] as const).map(([key, label]) => (
            <button key={key} type="button" onClick={() => setTab(key)} className="rounded-lg py-2 text-[9px] font-semibold active-scale" style={{ background: tab === key ? '#FFFFFF' : 'transparent', color: tab === key ? '#5B2A6F' : '#756B65', boxShadow: tab === key ? '0 2px 8px rgba(49,9,60,.08)' : 'none' }}>{label}</button>
          ))}
        </div>

        {total === 0 && (
          <div className="flex flex-col items-center px-8 py-20 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#F0E5D7] text-3xl text-[#5B2A6F]">♡</div>
            <h2 className="mt-4 text-[15px] font-bold">Aucun favori pour le moment</h2>
            <p className="mt-2 text-[10px] leading-4 text-[#756B65]">Explorez les coupes et enregistrez vos coups de cœur.</p>
            <button type="button" onClick={() => navigate('/hairstyles')} className="mt-5 rounded-xl bg-[#5B0B62] px-5 py-3 text-[10px] font-bold text-white active-scale">Explorer les catégories</button>
          </div>
        )}

        {(tab === 'all' || tab === 'stylists') && savedStylists.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[.08em] text-[#756B65]">Coiffeuses</h2>
            <div className="space-y-3">
              {savedStylists.map(stylist => (
                <article key={stylist.id} className="flex items-center gap-3 rounded-2xl border border-[#E7DACA] bg-white p-3">
                  <img src={stylist.image} alt={stylist.name} className="h-16 w-16 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-bold">{stylist.name}</p>
                    <p className="mt-0.5 text-[8px] text-[#B88900]">★ {stylist.rating} · {stylist.reviewCount} avis</p>
                    <p className="mt-1 truncate text-[8px] text-[#756B65]">{stylist.categories.join(' · ')}</p>
                    <button type="button" onClick={() => navigate(`/hairstylist/${stylist.id}`)} className="mt-2 rounded-lg bg-[#5B0B62] px-3 py-1.5 text-[8px] font-semibold text-white">Voir le profil</button>
                  </div>
                  <button type="button" onClick={() => setFavorites(current => ({ ...current, hairstylistIds: toggleId(current.hairstylistIds, stylist.id) }))} aria-label={`Retirer ${stylist.name} des favoris`} className="grid h-8 w-8 place-items-center rounded-full bg-[#F2E9DE] text-[#5B2A6F]">
                    <span className="text-lg">♥</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {(tab === 'all' || tab === 'cuts') && cutCount > 0 && (
          <div className="mt-5">
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-[.08em] text-[#756B65]">Coupes</h2>
            <div className="grid grid-cols-2 gap-3">
              {savedServices.map(service => (
                <article key={`service-${service.id}`} className="overflow-hidden rounded-2xl border border-[#E7DACA] bg-white">
                  <button type="button" onClick={() => navigate(`/service/${service.id}`)} className="w-full text-left">
                    <img src={service.image} alt={service.name} className="h-28 w-full object-cover" />
                    <div className="p-2.5">
                      <p className="truncate text-[10px] font-bold">{service.name}</p>
                      <p className="mt-1 text-[8px] font-semibold text-[#5B2A6F]">{formatFcfa(service.price)}</p>
                    </div>
                  </button>
                  <button type="button" onClick={() => setFavorites(current => ({ ...current, serviceIds: toggleId(current.serviceIds, service.id) }))} className="w-full border-t border-[#E7DACA] py-2 text-[8px] font-semibold text-[#9B3C45]">Retirer des favoris</button>
                </article>
              ))}
              {savedStyles.map(style => (
                <article key={`style-${style.id}`} className="overflow-hidden rounded-2xl border border-[#E7DACA] bg-white">
                  <button type="button" onClick={() => navigate(`/service/${style.id}`)} className="w-full text-left">
                    <img src={style.image} alt={style.name} className="h-28 w-full object-cover" />
                    <div className="p-2.5">
                      <p className="truncate text-[10px] font-bold">{style.name}</p>
                      <p className="mt-1 text-[8px] font-semibold text-[#5B2A6F]">{formatFcfa(style.startingPrice)}</p>
                    </div>
                  </button>
                  <button type="button" onClick={() => setFavorites(current => ({ ...current, hairstyleIds: toggleId(current.hairstyleIds, style.id) }))} className="w-full border-t border-[#E7DACA] py-2 text-[8px] font-semibold text-[#9B3C45]">Retirer des favoris</button>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
