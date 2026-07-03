import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import services from '../data/services.json'
import reviews from '../data/reviews.json'
import { toggleId, useDemoFavorites } from '../lib/demoStore'

const MONTH = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map(index => (
        <span key={index} style={{ color: index <= rating ? '#F59E0B' : '#E5E7EB', fontSize: 12 }}>★</span>
      ))}
    </span>
  )
}

export default function HairstylistProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'services' | 'galerie' | 'avis'>('services')
  const [favorites, setFavorites] = useDemoFavorites()

  const stylist = hairstylists.find(item => item.id === id)
  const isFavorite = id ? favorites.hairstylistIds.includes(id) : false

  if (!stylist) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4" style={{ background: 'var(--bg)' }}>
        <p style={{ fontSize: 16, color: 'var(--text-2)', fontFamily: 'Manrope' }}>Coiffeuse introuvable</p>
        <button onClick={() => navigate(-1)} className="px-4 py-3 rounded-2xl active-scale" style={{ background: 'var(--surface)', color: 'var(--gold)', border: '1px solid var(--border)', fontFamily: 'Manrope', fontWeight: 800 }}>Retour</button>
      </div>
    )
  }

  const stylistServices = services.filter(service => stylist.services.includes(service.id))
  const stylistReviews = reviews.filter(review => review.stylistId === id)
  const avgRating = stylistReviews.length
    ? (stylistReviews.reduce((total, review) => total + review.rating, 0) / stylistReviews.length).toFixed(1)
    : stylist.rating

  const tabs = [
    { key: 'services', label: 'Services' },
    { key: 'galerie', label: 'Galerie' },
    { key: 'avis', label: 'Avis' },
  ] as const

  return (
    <main className="pb-28" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <section className="relative" style={{ height: 300 }}>
        <img src={stylist.cover} alt={stylist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(36,21,28,0.05) 0%, rgba(36,21,28,0.72) 100%)' }} />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Retour"
            className="w-10 h-10 rounded-full flex items-center justify-center active-scale"
            style={{ background: 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(10px)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            onClick={() => {
              if (!id) return
              setFavorites(current => ({ ...current, hairstylistIds: toggleId(current.hairstylistIds, id) }))
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center active-scale"
            style={{ background: isFavorite ? 'var(--gold)' : 'rgba(255,255,255,0.22)', border: '1px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(10px)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? '#fff' : 'none'} stroke="#fff" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>

        <div className="absolute left-4 right-4 bottom-5">
          <div className="flex items-end gap-3">
            <img src={stylist.image} alt={stylist.name} className="w-18 h-18 rounded-3xl object-cover" style={{ width: 72, height: 72, border: '2px solid rgba(255,255,255,0.86)' }} />
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 10, fontWeight: 800, fontFamily: 'Manrope' }}>Disponible</span>
                <span style={{ color: '#F59E0B', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>★ {avgRating}</span>
              </div>
              <h1 className="truncate" style={{ fontSize: 25, fontWeight: 800, color: '#fff', fontFamily: 'Fraunces', lineHeight: 1.05 }}>{stylist.name}</h1>
              <p className="truncate" style={{ fontSize: 12, color: 'rgba(255,255,255,0.76)', fontFamily: 'Manrope', marginTop: 4 }}>{stylist.city} · dès {stylist.priceFrom}€</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="grid grid-cols-3 gap-2 -mt-4 mb-4 relative z-10">
          {[
            { label: 'Note', value: `${avgRating}` },
            { label: 'Avis', value: stylist.reviewCount },
            { label: 'Services', value: stylistServices.length },
          ].map(stat => (
            <div key={stat.label} className="py-3 rounded-2xl text-center" style={{ background: '#fff', border: '1px solid var(--border)', boxShadow: '0 6px 18px rgba(82,32,54,0.06)' }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope', marginTop: 1 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
          {stylist.categories.map(category => (
            <span key={category} className="flex-shrink-0 px-3 py-2 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-2)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>{category}</span>
          ))}
        </div>

        <div className="p-4 rounded-3xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-2)', fontFamily: 'Manrope' }}>{stylist.bio}</p>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            {['Certifiée', 'Chez vous', '< 2h'].map(item => (
              <div key={item} className="py-2 rounded-2xl text-center" style={{ background: 'var(--surface-2)' }}>
                <p style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 800, fontFamily: 'Manrope' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl mb-4" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          {tabs.map(tab => {
            const active = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className="py-2.5 rounded-xl active-scale"
                style={{ background: active ? '#fff' : 'transparent', color: active ? 'var(--text-1)' : 'var(--text-3)', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope', boxShadow: active ? '0 2px 8px rgba(82,32,54,0.06)' : 'none' }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'services' && (
          <div className="flex flex-col gap-3">
            {stylistServices.map(service => (
              <button
                key={service.id}
                type="button"
                onClick={() => navigate(`/service/${service.id}?stylistId=${stylist.id}`)}
                className="w-full p-3 rounded-3xl active-scale text-left"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center gap-3">
                  <img src={service.image} alt={service.name} className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{service.name}</p>
                    <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope', marginTop: 2 }}>{service.duration}</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope', marginTop: 7 }}>{service.price}€</p>
                  </div>
                  <span className="px-3 py-2 rounded-2xl" style={{ background: 'var(--cta-gradient)', color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: 'Manrope' }}>Choisir</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'galerie' && (
          <div className="grid grid-cols-2 gap-2">
            {stylist.gallery.map((image, index) => (
              <div key={image} className="rounded-3xl overflow-hidden" style={{ aspectRatio: index === 0 ? '1 / 1.25' : '1 / 1', border: '1px solid var(--border)' }}>
                <img src={image} alt={`Réalisation ${index + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'avis' && (
          <div className="flex flex-col gap-3">
            {stylistReviews.length === 0 ? (
              <div className="text-center py-12 rounded-3xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>Aucun avis</p>
              </div>
            ) : (
              stylistReviews.map(review => {
                const date = new Date(review.date)
                return (
                  <div key={review.id} className="p-4 rounded-3xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{review.author}</p>
                        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{date.getDate()} {MONTH[date.getMonth()]} {date.getFullYear()}</p>
                      </div>
                      <Stars rating={review.rating} />
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-2)', fontFamily: 'Manrope' }}>{review.comment}</p>
                    <span className="inline-flex mt-3 px-2.5 py-1 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 10, fontWeight: 800, fontFamily: 'Manrope' }}>{review.serviceLabel}</span>
                  </div>
                )
              })
            )}
          </div>
        )}
      </section>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 z-40" style={{ background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(14px)', borderTop: '1px solid var(--border)', paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope' }}>à partir de</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{stylist.priceFrom}€</p>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/service/${stylist.services[0]}?stylistId=${stylist.id}`)}
            className="flex-1 py-3.5 rounded-2xl active-scale"
            style={{ background: 'var(--cta-gradient)', color: '#fff', fontSize: 14, fontWeight: 800, fontFamily: 'Manrope' }}
          >
            Réserver
          </button>
        </div>
      </div>
    </main>
  )
}
