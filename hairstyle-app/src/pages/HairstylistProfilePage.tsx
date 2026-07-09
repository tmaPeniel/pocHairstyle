import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import { formatFcfa, hairstyles, services } from '../data/catalog'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

export default function HairstylistProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [favorites, setFavorites] = useDemoFavorites()
  const stylist = hairstylists.find(item => item.id === id)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(searchParams.get('serviceId'))

  if (!stylist) return null

  const isFavorite = favorites.hairstylistIds.includes(stylist.id)
  const portfolio = hairstyles.filter(style => stylist.services.includes(style.id)).slice(0, 4)
  const proposedServices = services.filter(service => stylist.services.includes(service.id))

  return (
    <main className="min-h-[100svh] pb-24" style={{ background: '#FFF8F0' }}>
      <section className="relative h-[250px] overflow-hidden" style={{ background: '#31093C' }}>
        <img src={stylist.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(49,9,60,.96) 0%, rgba(72,14,78,.72) 48%, rgba(49,9,60,.24) 100%)' }} />
        <button type="button" onClick={() => navigate(-1)} aria-label="Retour" className="absolute left-4 top-5 z-10 grid h-9 w-9 place-items-center rounded-full text-white active-scale" style={{ background: 'rgba(255,255,255,.12)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>
        <div className="absolute right-4 top-5 z-10 flex gap-2">
          <button type="button" aria-label="Partager" className="grid h-9 w-9 place-items-center rounded-full text-white active-scale" style={{ background: 'rgba(255,255,255,.12)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 16V3m0 0L7 8m5-5 5 5" /><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
          </button>
          <button type="button" aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={() => setFavorites(current => ({ ...current, hairstylistIds: toggleId(current.hairstylistIds, stylist.id) }))} className="grid h-9 w-9 place-items-center rounded-full text-white active-scale" style={{ background: isFavorite ? '#D4AF37' : 'rgba(255,255,255,.12)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg>
          </button>
        </div>
        <p className="absolute bottom-12 left-5 max-w-[190px] text-[23px] italic leading-[1.18] text-[#E3C157]" style={{ fontFamily: 'Playfair Display' }}>
          Sublimer chaque femme est ma mission.
        </p>
      </section>

      <section className="relative -mt-6 rounded-t-[28px] bg-[#FFF8F0] px-4 pb-6 pt-12">
        <img src={stylist.image} alt={stylist.name} className="absolute -top-10 left-5 h-20 w-20 rounded-full border-4 border-[#FFF8F0] object-cover shadow-md" />
        <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-[#F4EBDD] px-3 py-1.5 text-[10px] font-semibold text-[#5B2A6F]">
          Disponible aujourd’hui
        </div>

        <div className="flex items-center gap-2">
          <h1 className="text-[22px] font-extrabold leading-tight text-[#1F1F1F]">{stylist.name}</h1>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#D4AF37] text-[9px] text-white">✓</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] text-[#6B625D]">
          <span className="font-semibold text-[#B88900]">★ {stylist.rating} ({stylist.reviewCount} avis)</span>
          <span>│</span><span>⌖ 2,3 km</span><span>│</span><span>2 ans d’expérience</span>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {stylist.categories.map(category => (
            <span key={category} className="whitespace-nowrap rounded-full bg-[#F3E8D8] px-3 py-1.5 text-[10px] font-semibold text-[#4E413A]">{category}</span>
          ))}
          <span className="whitespace-nowrap rounded-full bg-[#F3E8D8] px-3 py-1.5 text-[10px] font-semibold text-[#4E413A]">Chez vous</span>
        </div>

        <div className="mt-5">
          <h2 className="text-[13px] font-bold">À propos</h2>
          <p className="mt-1 text-[11px] leading-5 text-[#554E4A]">{stylist.bio}</p>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[13px] font-bold">Portfolio</h2>
            <button type="button" className="text-[10px] font-semibold text-[#5B2A6F]">Voir tout ›</button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {portfolio.map((style, index) => (
              <div key={style.id} className="aspect-square overflow-hidden rounded-xl">
                <img src={style.image} alt={`Réalisation ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#E7DACA] bg-white p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-[#8E8680]">Prochaine disponibilité</p>
              <p className="mt-0.5 text-[12px] font-bold">Demain · 11:00</p>
            </div>
            <p className="text-right text-[10px] text-[#8E8680]">Prestations dès<br /><strong className="text-[12px] text-[#5B2A6F]">{formatFcfa(stylist.priceFrom)}</strong></p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[13px] font-bold">Coupes proposées</h2>
              <p className="mt-0.5 text-[9px] text-[#8E8680]">Sélectionnez la prestation souhaitée</p>
            </div>
            <span className="text-[9px] font-semibold text-[#5B2A6F]">{proposedServices.length} choix</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {proposedServices.map(service => {
              const selected = selectedServiceId === service.id
              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedServiceId(current => current === service.id ? null : service.id)}
                  className="flex items-center gap-2 rounded-xl border p-2 text-left active-scale"
                  style={{
                    background: selected ? 'rgba(91,42,111,.08)' : '#FFFFFF',
                    borderColor: selected ? '#5B2A6F' : '#E7DACA',
                    boxShadow: selected ? '0 0 0 1px #5B2A6F' : 'none',
                  }}
                >
                  <img src={service.image} alt="" className="h-10 w-10 flex-shrink-0 rounded-lg object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate text-[9px] font-bold">{service.name}</span>
                    <span className="mt-0.5 block text-[8px] font-semibold text-[#5B2A6F]">{formatFcfa(service.price)}</span>
                  </span>
                  {selected && <span className="ml-auto grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-[#5B2A6F] text-[9px] text-white">✓</span>}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[#E7DACA] bg-white/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          disabled={!selectedServiceId}
          onClick={() => selectedServiceId && navigate(`/booking?serviceId=${selectedServiceId}&stylistId=${stylist.id}`)}
          className="w-full rounded-xl py-3.5 text-[13px] font-bold text-white active-scale disabled:cursor-not-allowed"
          style={{ background: selectedServiceId ? '#5B0B62' : '#CFC4CC', color: selectedServiceId ? '#FFFFFF' : '#746B71' }}
        >
          {selectedServiceId ? 'Voir les disponibilités' : 'Sélectionnez une coupe'}
        </button>
      </div>
    </main>
  )
}
