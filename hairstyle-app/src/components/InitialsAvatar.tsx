import type { CSSProperties } from 'react'

interface InitialsAvatarProps {
  name: string
  className?: string
  style?: CSSProperties
  textStyle?: CSSProperties
}

function getInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) return '?'

  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''

  return `${first}${last}`.toUpperCase()
}

export default function InitialsAvatar({ name, className = '', style, textStyle }: InitialsAvatarProps) {
  return (
    <div
      role="img"
      aria-label={name}
      className={`flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--gold-light), #fff)',
        color: 'var(--gold)',
        border: '1px solid var(--gold-border)',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: 'Manrope',
          fontWeight: 900,
          letterSpacing: '0.02em',
          ...textStyle,
        }}
      >
        {getInitials(name)}
      </span>
    </div>
  )
}