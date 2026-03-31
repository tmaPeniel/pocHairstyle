import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import services from '../data/services.json'
import reviews from '../data/reviews.json'

const MONTH = ['jan','fév','mar','avr','mai','juin','juil','août','sep','oct','nov','déc']

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#F59E0B' : '#E5E7EB', fontSize: 13 }}>★</span>
      ))}
    </span>
  )
}

export default function HairstylistProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'services' | 'galerie' | 'avis'>('services')

  const stylist = hairstylists.find(s => s.id === id)
  if (!stylist) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p style={{ fontSize: 16, color: 'var(--text-2)', fontFamily: 'Inter' }}>Coiffeuse introuvable</p>
      <button onClick={() => navigate(-1)} style={{ color: 'var(--gold)', fontFamily: 'Inter' }}>← Retour</button>
    </div>
  )

  const stylistServices = services.filter(s => stylist.services.includes(s.id))
  const stylistReviews = reviews.filter(r => r.stylistId === id)
  const avgRating = stylistReviews.length
    ? (stylistReviews.reduce((a, r) => a + r.rating, 0) / stylistReviews.length).toFixed(1)
    : stylist.rating

  const TABS = [
    { key: 'services', label: `Services (${stylistServices.length})` },
    { key: 'galerie',  label: 'Galerie' },
    { key: 'avis',     label: `Avis (${stylistReviews.length})` },
  ] as const

  return (
    <div className="pb-28" style={{ background: 'var(--bg)' }}>

      {/* Cover image */}
      <div className="relative" style={{ height: 260 }}>
        <img src={stylist.cover} alt={stylist.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full active-scale"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Favourite */}
        <button
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full active-scale"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Profile summary overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3">
          <img
            src={stylist.image}
            alt={stylist.name}
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
            style={{ border: '2.5px solid #C9A84C', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
          />
          <div className="flex-1 pb-0.5">
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: 'Inter', lineHeight: 1.2 }}>
              {stylist.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <span style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Inter' }}>{avgRating}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>
                  ({stylist.reviewCount} avis)
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>·</span>
              <div className="flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontSize: 12, color: '#C9A84C', fontFamily: 'Inter', fontWeight: 600 }}>
                  {stylist.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="mx-4 -mt-4 relative z-10 grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
        style={{ background: 'var(--border)', boxShadow: 'var(--shadow-md)' }}
      >
        {[
          { label: 'Note', value: `${avgRating}/5` },
          { label: 'Avis', value: stylist.reviewCount },
          { label: 'Services', value: stylistServices.length },
        ].map(stat => (
          <div key={stat.label} className="py-3 flex flex-col items-center" style={{ background: '#fff' }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>
              {stat.value}
            </span>
            <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginTop: 1 }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="px-4 pt-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stylist.categories.map(cat => (
            <span
              key={cat}
              style={{
                fontSize: 11, fontWeight: 600, color: 'var(--gold)',
                background: 'var(--gold-light)', border: '1px solid var(--gold-border)',
                borderRadius: 99, padding: '3px 12px', fontFamily: 'Inter',
              }}
            >
              {cat}
            </span>
          ))}
          <span
            style={{
              fontSize: 11, fontWeight: 600, color: '#22C55E',
              background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 99, padding: '3px 12px', fontFamily: 'Inter',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
            Disponible
          </span>
        </div>

        {/* Bio */}
        <div
          className="mb-5 p-4 rounded-2xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-2)', fontFamily: 'Inter' }}>
            {stylist.bio}
          </p>
          <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Inter' }}>
                Répond en &lt; 2h
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Inter' }}>
                Certifiée
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span style={{ fontSize: 11, color: 'var(--text-2)', fontFamily: 'Inter' }}>
                À domicile
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex mb-5 rounded-xl overflow-hidden"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 3 }}
        >
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2 rounded-lg active-scale transition-all duration-150"
              style={{
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'Inter',
                background: activeTab === tab.key ? '#fff' : 'transparent',
                color: activeTab === tab.key ? 'var(--text-1)' : 'var(--text-3)',
                boxShadow: activeTab === tab.key ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Services */}
        {activeTab === 'services' && (
          <div className="flex flex-col gap-3">
            {stylistServices.map(service => (
              <div
                key={service.id}
                className="flex items-center gap-3 p-3.5 rounded-2xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
              >
                <img src={service.image} alt={service.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 2 }}>
                    {service.name}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 6 }} className="line-clamp-1">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>
                      {service.price}€
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>· {service.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/service/${service.id}?stylistId=${stylist.id}`)}
                  className="flex-shrink-0 px-3 py-2 rounded-xl active-scale"
                  style={{
                    fontSize: 12, fontWeight: 700, color: '#1A1A1A',
                    background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
                    fontFamily: 'Inter',
                    boxShadow: '0 2px 8px rgba(201,168,76,0.3)',
                  }}
                >
                  Choisir
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Galerie */}
        {activeTab === 'galerie' && (
          <div className="grid grid-cols-2 gap-2">
            {stylist.gallery.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <img src={img} alt={`gallery-${i}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {/* Tab: Avis */}
        {activeTab === 'avis' && (
          <div className="flex flex-col gap-3">
            {stylistReviews.length === 0 ? (
              <div className="text-center py-10">
                <p style={{ fontSize: 28, marginBottom: 8 }}>💬</p>
                <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>
                  Aucun avis pour le moment
                </p>
              </div>
            ) : (
              stylistReviews.map(r => {
                const d = new Date(r.date)
                return (
                  <div
                    key={r.id}
                    className="p-4 rounded-2xl"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                          {r.author}
                        </p>
                        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter' }}>
                          {d.getDate()} {MONTH[d.getMonth()]} {d.getFullYear()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Stars rating={r.rating} />
                        <span
                          style={{
                            fontSize: 10, color: 'var(--gold)', fontWeight: 600,
                            background: 'var(--gold-light)', border: '1px solid var(--gold-border)',
                            borderRadius: 99, padding: '1px 8px', fontFamily: 'Inter',
                          }}
                        >
                          {r.serviceLabel}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-2)', fontFamily: 'Inter' }}>
                      "{r.comment}"
                    </p>
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 z-40"
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border)',
          paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>À partir de</p>
            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>
              {stylist.priceFrom}€
            </p>
          </div>
          <button
            onClick={() => navigate(`/service/${stylist.services[0]}?stylistId=${stylist.id}`)}
            className="flex-1 py-3.5 rounded-2xl active-scale"
            style={{
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
              color: '#1A1A1A',
              fontSize: 14,
              fontWeight: 700,
              fontFamily: 'Inter',
              boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
            }}
          >
            Réserver →
          </button>
        </div>
      </div>
    </div>
  )
}
