import { useNavigate } from 'react-router-dom'

export default function PromoBanner() {
  const navigate = useNavigate()

  return (
    <div className="px-4 mb-6">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #1a0e00 0%, #2d1a00 60%, #1f1200 100%)',
          border: '1px solid rgba(201,168,76,0.3)',
          minHeight: '140px',
        }}
      >
        {/* Left — text content */}
        <div className="relative z-10 p-5 pr-2" style={{ maxWidth: '62%' }}>
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2.5"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}
          >
            <span className="text-xs font-semibold text-gold">🎁 Offre du moment</span>
          </div>

          <h3 className="text-xl font-bold leading-tight mb-1" style={{ color: '#f5f0e8' }}>
            <span className="text-gold">-20%</span> sur<br />les tresses
          </h3>

          <p className="text-[11px] mb-3.5" style={{ color: '#888' }}>
            Du 25 → 30 mars 2026
          </p>

          <button
            onClick={() => navigate('/hairstylists?category=Tresses')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold active-scale"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)', color: '#000' }}
          >
            Réserver maintenant
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Right — image */}
        <div className="absolute top-0 right-0 bottom-0 w-[42%]">
          <img
            src="https://images.unsplash.com/photo-1605980776566-0486c3ac7617?w=300&h=300&fit=crop&crop=face"
            alt="Box braids"
            className="w-full h-full object-cover"
            style={{ borderRadius: '0 16px 16px 0' }}
          />
          {/* Dark fade from left so text stays readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #2d1a00 0%, transparent 60%)',
              borderRadius: '0 16px 16px 0',
            }}
          />
        </div>
      </div>
    </div>
  )
}
