import { useNavigate } from 'react-router-dom'

export default function PromoBanner() {
  const navigate = useNavigate()

  return (
    <div className="px-4 mb-6">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #1A0E00 0%, #3A2200 60%, #1A0E00 100%)',
          minHeight: 140,
          boxShadow: '0 4px 24px rgba(201,168,76,0.18)',
        }}
      >
        {/* Left — content */}
        <div className="relative z-10 p-5" style={{ maxWidth: '60%' }}>
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3"
            style={{
              background: 'rgba(201,168,76,0.18)',
              border: '1px solid rgba(201,168,76,0.35)',
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: '#C9A84C', fontFamily: 'Inter' }}>
              🎁 Offre du moment
            </span>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 4, fontFamily: 'Inter' }}>
            <span style={{ color: '#F0D060' }}>-20%</span> sur<br />les tresses
          </h3>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 14, fontFamily: 'Inter' }}>
            Du 25 → 30 mars 2026
          </p>

          <button
            onClick={() => navigate('/hairstylists?category=Tresses')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl active-scale"
            style={{
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
              color: '#1A1A1A',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'Inter',
            }}
          >
            Réserver maintenant
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right — image */}
        <div className="absolute top-0 right-0 bottom-0" style={{ width: '44%' }}>
          <img
            src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=300&h=300&fit=crop&crop=face"
            alt="Box braids"
            className="w-full h-full object-cover"
            style={{ borderRadius: '0 16px 16px 0' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #3A2200 0%, transparent 55%)',
              borderRadius: '0 16px 16px 0',
            }}
          />
        </div>
      </div>
    </div>
  )
}
