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
          ? 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, transparent 100%)'
          : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: transparent ? 'none' : '1px solid var(--border)',
      }}
    >
      {showBack ? (
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full active-scale"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-1)" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl gold-gradient flex items-center justify-center shadow-sm">
            <span style={{ color: '#1A1A1A', fontWeight: 800, fontSize: 13, fontFamily: 'Inter' }}>H</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-1)', letterSpacing: '-0.3px' }}>
            Hairly
          </span>
        </div>
      )}

      {title && (
        <h1
          className="absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)' }}
        >
          {title}
        </h1>
      )}

      {action || (
        !showBack && (
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full relative active-scale"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--text-1)" strokeWidth="1.8">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: 'var(--gold)', border: '1.5px solid white' }}
            />
          </button>
        )
      )}
    </header>
  )
}
