import { useNavigate } from 'react-router-dom'

export default function PromoBanner() {
  const navigate = useNavigate()

  return (
    <div className="px-4 mb-6">
      <div
        className="relative overflow-hidden rounded-2xl p-5"
        style={{
          background: 'linear-gradient(135deg, #1a0e00 0%, #2d1a00 50%, #1a0e00 100%)',
          border: '1px solid rgba(201,168,76,0.3)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)' }}/>
        <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #f0d060 0%, transparent 70%)' }}/>

        <div className="relative">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)' }}>
            <span className="text-xs font-semibold text-gold">Offre du moment</span>
            <span className="text-xs">⚡</span>
          </div>
          <h3 className="text-2xl font-bold mb-1" style={{ color: '#f5f0e8' }}>
            <span className="text-gold">-20%</span> sur les tresses
          </h3>
          <p className="text-xs mb-4" style={{ color: '#888' }}>
            Valable jusqu'au 31 mars 2026 · Code : <span className="text-gold font-mono">TRESSES20</span>
          </p>
          <button
            onClick={() => navigate('/hairstylists?category=Tresses')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold active-scale"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)', color: '#000' }}
          >
            Réserver maintenant
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
