import { useParams, useNavigate } from 'react-router-dom'
import hairstylists from '../data/hairstylists.json'
import services from '../data/services.json'

export default function HairstylistProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const stylist = hairstylists.find(s => s.id === id)

  if (!stylist) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <p className="text-lg text-gold">Coiffeuse introuvable</p>
      <button onClick={() => navigate(-1)} className="text-sm text-gold underline">Retour</button>
    </div>
  )

  const stylistServices = services.filter(s => stylist.services.includes(s.id))

  return (
    <div className="pb-28">
      {/* Cover image */}
      <div className="relative h-64">
        <img src={stylist.cover} alt={stylist.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(10,10,10,0.8) 100%)' }}/>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full active-scale"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Profile info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end gap-3">
            <img
              src={stylist.image}
              alt={stylist.name}
              className="w-16 h-16 rounded-2xl object-cover"
              style={{ border: '2px solid #c9a84c' }}
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{stylist.name}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm font-semibold text-white">{stylist.rating}</span>
                  <span className="text-xs" style={{ color: '#aaa' }}>({stylist.reviewCount})</span>
                </div>
                <span className="text-xs" style={{ color: '#aaa' }}>·</span>
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-xs text-gold">{stylist.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stylist.categories.map(cat => (
            <span key={cat} className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}>
              {cat}
            </span>
          ))}
        </div>

        {/* Bio */}
        <div className="mb-5 p-4 rounded-2xl" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#aaa' }}>{stylist.bio}</p>
        </div>

        {/* Gallery */}
        <div className="mb-5">
          <h2 className="text-base font-semibold mb-3" style={{ color: '#f5f0e8' }}>Galerie</h2>
          <div className="grid grid-cols-2 gap-2">
            {stylist.gallery.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-square">
                <img src={img} alt={`gallery-${i}`} className="w-full h-full object-cover" loading="lazy"/>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: '#f5f0e8' }}>Services</h2>
          <div className="flex flex-col gap-3">
            {stylistServices.map(service => (
              <div
                key={service.id}
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{ background: '#141414', border: '1px solid #1f1f1f' }}
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold mb-0.5" style={{ color: '#f5f0e8' }}>{service.name}</p>
                  <p className="text-xs mb-1.5 line-clamp-2" style={{ color: '#666' }}>{service.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gold">{service.price}€</span>
                    <span className="text-xs" style={{ color: '#555' }}>· {service.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/service/${service.id}?stylistId=${stylist.id}`)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold active-scale"
                  style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)', color: '#000' }}
                >
                  Choisir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
