import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title?: string
  showBack?: boolean
  transparent?: boolean
  action?: React.ReactNode
}

export default function Header({ title, showBack = false, transparent = false, action }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 py-3"
      style={{
        background: transparent
          ? 'linear-gradient(to bottom, rgba(10,10,10,0.8) 0%, transparent 100%)'
          : '#0a0a0a',
        backdropFilter: transparent ? 'blur(8px)' : 'none',
      }}
    >
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full active-scale"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center">
            <span className="text-black font-bold text-xs">H</span>
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: '#f5f0e8' }}>
            Hairly
          </span>
        </div>
      )}

      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold" style={{ color: '#f5f0e8' }}>
          {title}
        </h1>
      )}

      {action || (
        !showBack && (
          <button className="w-9 h-9 flex items-center justify-center rounded-full relative active-scale"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5f0e8" strokeWidth="1.8">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold"/>
          </button>
        )
      )}
    </header>
  )
}
