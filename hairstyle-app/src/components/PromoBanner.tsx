import { useNavigate } from 'react-router-dom'

export default function PromoBanner() {
  const navigate = useNavigate()

  return (
    <div className="px-4 mb-6">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #5B2038 0%, #C44573 58%, #F7C7D4 100%)',
          minHeight: 140,
          boxShadow: '0 10px 30px rgba(196,69,115,0.22)',
        }}
      >
        {/* Left content */}
        <div className="relative z-10 p-5" style={{ maxWidth: '60%' }}>
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3"
            style={{
              background: 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.32)',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', fontFamily: 'Manrope' }}>
              Offre du moment
            </span>
          </div>

          <h3 style={{ fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1.13, marginBottom: 5, fontFamily: 'Fraunces' }}>
            <span style={{ color: '#FFE1EA' }}>-20%</span> sur<br />les tresses
          </h3>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', marginBottom: 14, fontFamily: 'Manrope' }}>
            Du 25 au 30 mars 2026
          </p>

          <button
            onClick={() => navigate('/hairstylists?category=Tresses')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl active-scale"
            style={{
              background: '#FFFFFF',
              color: '#9F2E5B',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'Manrope',
              boxShadow: '0 6px 18px rgba(91,32,56,0.18)',
            }}
          >
            Réserver
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right image */}
        <div className="absolute top-0 right-0 bottom-0" style={{ width: '44%' }}>
          <img
            src="https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
            alt="Femme avec box braids"
            className="w-full h-full object-cover"
            style={{ borderRadius: '0 16px 16px 0' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #C44573 0%, rgba(196,69,115,0.18) 48%, transparent 100%)',
              borderRadius: '0 16px 16px 0',
            }}
          />
        </div>
      </div>
    </div>
  )
}
