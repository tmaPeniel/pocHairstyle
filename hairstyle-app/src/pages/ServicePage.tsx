import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'
import reviews from '../data/reviews.json'

const MONTH = ['jan','fév','mar','avr','mai','juin','juil','août','sep','oct','nov','déc']

const INCLUDED = [
  'Déplacement à votre domicile',
  'Produits professionnels inclus',
  'Conseils personnalisés',
  'Finitions soignées',
]

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#F59E0B' : '#E5E7EB', fontSize: 12 }}>★</span>
      ))}
    </span>
  )
}

export default function ServicePage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const stylistId = searchParams.get('stylistId')

  const service = services.find(s => s.id === id)
  const stylist = hairstylists.find(s => s.id === stylistId)
  const serviceReviews = reviews.filter(r => r.serviceId === id)

  // Related services (same category, different id)
  const related = services.filter(s => s.category === service?.category && s.id !== id).slice(0, 3)

  if (!service) return null

  return (
    <div className="pb-28" style={{ background: 'var(--bg)' }}>

      {/* Hero */}
      <div className="relative" style={{ height: 280 }}>
        <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full active-scale"
          style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        {/* Title on image */}
        <div className="absolute bottom-5 left-5 right-5">
          <span
            style={{
              fontSize: 10, fontWeight: 700, color: '#C9A84C',
              background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: 99, padding: '2px 10px', fontFamily: 'Inter', display: 'inline-block', marginBottom: 6,
            }}
          >
            {service.category}
          </span>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: 'Inter', lineHeight: 1.2 }}>
            {service.name}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Inter' }}>
              {serviceReviews.length > 0
                ? (serviceReviews.reduce((a, r) => a + r.rating, 0) / serviceReviews.length).toFixed(1)
                : '4.9'}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter' }}>
              ({serviceReviews.length} avis)
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>·</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter' }}>{service.duration}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">

        {/* Price + duration cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div
            className="p-4 rounded-2xl flex flex-col items-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 4 }}>Prix</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Inter' }}>
              {service.price}€
            </p>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter' }}>tout inclus</p>
          </div>
          <div
            className="p-4 rounded-2xl flex flex-col items-center"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
          >
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 4 }}>Durée</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>
              {service.duration.split('-')[0]}h
            </p>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter' }}>environ</p>
          </div>
        </div>

        {/* Description */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 8 }}>
            Description
          </h2>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-2)', fontFamily: 'Inter' }}>
            {service.description}
          </p>
        </div>

        {/* Ce qui est inclus */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 10 }}>
            Ce qui est inclus
          </h2>
          <div className="flex flex-col gap-2.5">
            {INCLUDED.map(item => (
              <div key={item} className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-1)', fontFamily: 'Inter' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stylist selected */}
        {stylist && (
          <div
            className="p-4 rounded-2xl mb-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 10 }}>
              Coiffeuse sélectionnée
            </h2>
            <div className="flex items-center gap-3">
              <img src={stylist.image} alt={stylist.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                  {stylist.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span style={{ color: '#F59E0B', fontSize: 12 }}>★</span>
                  <span style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Inter' }}>
                    {stylist.rating} · {stylist.city}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate(`/hairstylist/${stylist.id}`)}
                style={{
                  fontSize: 12, fontWeight: 600, color: 'var(--gold)',
                  background: 'var(--gold-light)', border: '1px solid var(--gold-border)',
                  borderRadius: 10, padding: '6px 12px', fontFamily: 'Inter',
                }}
                className="active-scale"
              >
                Profil
              </button>
            </div>
          </div>
        )}

        {/* Avis */}
        {serviceReviews.length > 0 && (
          <div className="mb-4">
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 10 }}>
              Avis clients
            </h2>
            <div className="flex flex-col gap-3">
              {serviceReviews.slice(0, 3).map(r => {
                const d = new Date(r.date)
                return (
                  <div
                    key={r.id}
                    className="p-3.5 rounded-2xl"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <img src={r.avatar} alt={r.author} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1">
                        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>
                          {r.author}
                        </p>
                        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter' }}>
                          {d.getDate()} {MONTH[d.getMonth()]} {d.getFullYear()}
                        </p>
                      </div>
                      <Stars rating={r.rating} />
                    </div>
                    <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-2)', fontFamily: 'Inter' }}>
                      "{r.comment}"
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Services similaires */}
        {related.length > 0 && (
          <div className="mb-6">
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 10 }}>
              Services similaires
            </h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {related.map(s => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/service/${s.id}?stylistId=${stylistId}`)}
                  className="flex-shrink-0 w-32 rounded-2xl overflow-hidden cursor-pointer active-scale"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div style={{ height: 80 }}>
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-2">
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-1)', fontFamily: 'Inter' }} className="truncate">
                      {s.name}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Inter' }}>{s.price}€</p>
                  </div>
                </div>
              ))}
            </div>
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
        <button
          onClick={() => navigate(`/booking?serviceId=${id}&stylistId=${stylistId}`)}
          className="w-full py-4 rounded-2xl active-scale flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
            color: '#1A1A1A',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Inter',
            boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
          }}
        >
          Réserver ce service — {service.price}€ →
        </button>
      </div>
    </div>
  )
}
