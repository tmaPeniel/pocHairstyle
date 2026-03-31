interface CategoryCarouselProps {
  selected?: string
  onSelect: (category: string) => void
}

const categories = [
  { name: 'Tresses', emoji: '💫' },
  { name: 'Locks',   emoji: '🌿' },
  { name: 'Lissage', emoji: '✨' },
  { name: 'Perruques', emoji: '👑' },
  { name: 'Vanilles', emoji: '🌸' },
]

export default function CategoryCarousel({ selected, onSelect }: CategoryCarouselProps) {
  return (
    <div className="mb-5">
      <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map(cat => {
          const isSelected = selected === cat.name
          return (
            <button
              key={cat.name}
              onClick={() => onSelect(isSelected ? '' : cat.name)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active-scale"
              style={isSelected ? {
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
                color: '#1A1A1A',
                border: '1.5px solid transparent',
                boxShadow: '0 2px 8px rgba(201,168,76,0.35)',
              } : {
                background: 'var(--surface)',
                color: 'var(--text-2)',
                border: '1.5px solid var(--border)',
              }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
