import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ placeholder = 'Quelle coiffure veux-tu ?', onSearch }: SearchBarProps) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) onSearch(value)
    else navigate(`/hairstylists?q=${encodeURIComponent(value)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="px-4 mb-5">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-12 py-3.5 rounded-2xl text-sm font-medium outline-none transition-all duration-200 focus:ring-1"
          style={{
            background: '#1a1a1a',
            color: '#f5f0e8',
            border: '1px solid #2a2a2a',
            caretColor: '#c9a84c',
          }}
        />
        <button
          type="submit"
          className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-xl active-scale"
          style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </form>
  )
}
