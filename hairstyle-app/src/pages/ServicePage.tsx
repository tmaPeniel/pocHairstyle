import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { formatFcfa, services } from '../data/catalog'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

const LENGTHS = ['Courte', 'Moyenne', 'Longue', 'Extra longue']
const COLORS = ['#171717', '#3D251B', '#613517', '#E7A74C', '#B85D21', '#6E101B']

export default function ServicePage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [length, setLength] = useState('Longue')
  const [color, setColor] = useState(COLORS[0])
  const [photoIndex, setPhotoIndex] = useState(0)
  const [favorites, setFavorites] = useDemoFavorites()
  const service = services.find(item => item.id === id)
  const stylistId = searchParams.get('stylistId')

  if (!service || !id) return null
  const liked = favorites.serviceIds.includes(id)

  return (
    <main className="min-h-[100svh] pb-24" style={{ background: '#FFF8F0' }}>
      <section className="relative h-[330px]">
        <img src={service.gallery[photoIndex]} alt={`${service.name} — photo ${photoIndex + 1}`} className="h-full w-full object-cover object-top" />
        <button type="button" onClick={() => navigate(-1)} aria-label="Retour" className="absolute left-4 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/80 active-scale">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.8"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
        </button>
        <div className="absolute right-4 top-5 flex gap-2">
          <button type="button" aria-label={liked ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={() => setFavorites(current => ({ ...current, serviceIds: toggleId(current.serviceIds, id) }))} className="grid h-9 w-9 place-items-center rounded-full bg-white/80 active-scale">
            <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#5B2A6F' : 'none'} stroke="#1F1F1F" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" /></svg>
          </button>
          <button type="button" aria-label="Partager" className="grid h-9 w-9 place-items-center rounded-full bg-white/80 active-scale">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.8"><path d="M12 16V3m0 0L7 8m5-5 5 5" /><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
          </button>
        </div>
        {service.gallery.length > 1 && (
          <>
            <button type="button" onClick={() => setPhotoIndex(current => (current - 1 + service.gallery.length) % service.gallery.length)} aria-label="Photo précédente" className="absolute bottom-3 left-4 grid h-7 w-7 place-items-center rounded-full bg-black/55 text-white active-scale">‹</button>
            <button type="button" onClick={() => setPhotoIndex(current => (current + 1) % service.gallery.length)} aria-label="Photo suivante" className="absolute bottom-3 right-14 grid h-7 w-7 place-items-center rounded-full bg-black/55 text-white active-scale">›</button>
          </>
        )}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-1 text-[9px] text-white">{photoIndex + 1}/{service.gallery.length}</span>
      </section>

      <section className="-mt-4 rounded-t-[22px] bg-[#FFF8F0] px-4 pb-8 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-[24px] font-extrabold">{service.name}</h1>
          <p className="pt-1 text-right text-[8px] text-[#756B65]">à partir de<br /><strong className="text-[15px] text-[#B88900]">{formatFcfa(service.price)}</strong></p>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[9px] text-[#554E4A]">
          <span className="font-semibold">★ 4,8 (128 avis)</span><span>│</span><span>◷ {service.duration}</span><span>│</span><span>♢ Protection</span>
        </div>
        <p className="mt-4 text-[11px] leading-5 text-[#554E4A]">{service.description}</p>

        <div className="mt-5">
          <h2 className="mb-2 text-[11px] font-bold">Longueur</h2>
          <div className="flex gap-2">
            {LENGTHS.map(item => (
              <button key={item} type="button" onClick={() => setLength(item)} className="flex-1 rounded-full border px-2 py-2 text-[8px] font-medium active-scale" style={{ background: length === item ? '#5B0B62' : 'white', color: length === item ? 'white' : '#3C3632', borderColor: length === item ? '#5B0B62' : '#E7DACA' }}>{item}</button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h2 className="mb-2 text-[11px] font-bold">Couleur des mèches</h2>
          <div className="flex items-center gap-3">
            {COLORS.map(item => (
              <button key={item} type="button" onClick={() => setColor(item)} aria-label={`Couleur ${item}`} className="h-7 w-7 rounded-full active-scale" style={{ background: item, outline: color === item ? '2px solid #D4AF37' : 'none', outlineOffset: 2 }} />
            ))}
            <button type="button" className="grid h-7 w-7 place-items-center rounded-full bg-[#F1E8DE] text-sm">+</button>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-[#E7DACA] bg-white/95 px-4 py-3 backdrop-blur">
        <button type="button" onClick={() => navigate(stylistId ? `/booking?serviceId=${id}&stylistId=${stylistId}` : `/hairstylists?category=${encodeURIComponent(service.category)}&serviceId=${id}`)} className="w-full rounded-xl bg-[#D4AF37] py-3.5 text-[12px] font-bold text-[#1F1F1F] active-scale">
          Choisir une coiffeuse
        </button>
      </div>
    </main>
  )
}
