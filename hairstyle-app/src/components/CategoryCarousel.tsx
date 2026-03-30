interface CategoryCarouselProps {
  selected?: string
  onSelect: (category: string) => void
}

const categories = [
  { name: 'Tresses', emoji: '💫' },
  { name: 'Locks', emoji: '🌿' },
  { name: 'Lissage', emoji: '✨' },
  { name: 'Perruques', emoji: '👑' },
  { name: 'Vanilles', emoji: '🌸' },
]

export default function CategoryCarousel({ selected, onSelect }: CategoryCarouselProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
        {categories.map(cat => {
          const isSelected = selected === cat.name
          return (
            <button
              key={cat.name}
              onClick={() => onSelect(isSelected ? '' : cat.name)}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 active-scale"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, #c9a84c 0%, #f0d060 100%)'
                  : '#1a1a1a',
                color: isSelected ? '#000' : '#888',
                border: isSelected ? 'none' : '1px solid #2a2a2a',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
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
