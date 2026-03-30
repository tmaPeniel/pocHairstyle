import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

export default function ServicePage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const stylistId = searchParams.get('stylistId')

  const service = services.find(s => s.id === id)
  const stylist = hairstylists.find(s => s.id === stylistId)

  if (!service) return null

  return (
    <div className="pb-28">
      <div className="relative h-72">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover"/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,10,10,1) 100%)' }}/>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full active-scale"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      </div>

      <div className="px-4 -mt-6">
        <div className="p-5 rounded-2xl mb-4" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium mb-3 inline-block"
            style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.2)' }}>
            {service.category}
          </span>
          <h1 className="text-xl font-bold mb-2" style={{ color: '#f5f0e8' }}>{service.name}</h1>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#888' }}>{service.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl" style={{ background: '#0a0a0a' }}>
              <p className="text-xs mb-1" style={{ color: '#555' }}>Prix</p>
              <p className="text-lg font-bold text-gold">{service.price}€</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: '#0a0a0a' }}>
              <p className="text-xs mb-1" style={{ color: '#555' }}>Durée</p>
              <p className="text-lg font-bold" style={{ color: '#f5f0e8' }}>{service.duration}</p>
            </div>
          </div>
        </div>

        {stylist && (
          <div className="p-4 rounded-2xl mb-6" style={{ background: '#141414', border: '1px solid #1f1f1f' }}>
            <p className="text-xs mb-3" style={{ color: '#555' }}>Coiffeuse sélectionnée</p>
            <div className="flex items-center gap-3">
              <img src={stylist.image} alt={stylist.name} className="w-12 h-12 rounded-xl object-cover"/>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#f5f0e8' }}>{stylist.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xs">★</span>
                  <span className="text-xs" style={{ color: '#888' }}>{stylist.rating} · {stylist.city}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate(`/booking?serviceId=${id}&stylistId=${stylistId}`)}
          className="w-full py-4 rounded-2xl text-sm font-bold active-scale"
          style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)', color: '#000' }}
        >
          Réserver ce service →
        </button>
      </div>
    </div>
  )
}
