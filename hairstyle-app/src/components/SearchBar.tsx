import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  value?: string
}

export default function SearchBar({ placeholder = 'Quelle coiffure veux-tu ?', onSearch, value: externalValue }: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('')
  const navigate = useNavigate()
  const isControlled = externalValue !== undefined
  const value = isControlled ? externalValue : internalValue

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) onSearch(value)
    else navigate(`/hairstylists?q=${encodeURIComponent(value)}`)
  }

  const handleChange = (nextValue: string) => {
    if (!isControlled) setInternalValue(nextValue)
    if (onSearch) onSearch(nextValue)
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 mb-5">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-sm font-medium outline-none transition-all duration-200"
          style={{
            background: 'var(--surface)',
            color: 'var(--text-1)',
            border: '1.5px solid var(--border)',
            fontFamily: 'Manrope',
            caretColor: 'var(--gold)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />

        {value && (
          <button
            type="button"
            aria-label="Effacer la recherche"
            onClick={() => handleChange('')}
            className="absolute right-11 p-1 active-scale"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          aria-label="Lancer la recherche"
          className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-xl active-scale"
          style={{ background: 'var(--cta-gradient)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  )
}
