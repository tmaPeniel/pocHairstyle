interface CategoryCarouselProps {
  selected?: string
  onSelect: (category: string) => void
}

const categories = [
  { name: 'Tresses',   emoji: '💫' },
  { name: 'Locks',     emoji: '🌿' },
  { name: 'Lissage',   emoji: '✨' },
  { name: 'Perruques', emoji: '👑' },
  { name: 'Vanilles',  emoji: '🌸' },
]

export default function CategoryCarousel({ selected, onSelect }: CategoryCarouselProps) {
  return (
    <div className="mb-5">
      <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar pb-0.5">
        {categories.map(cat => {
          const isSelected = selected === cat.name
          return (
            <button
              key={cat.name}
              onClick={() => onSelect(isSelected ? '' : cat.name)}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 active-scale"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', minWidth: 56 }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={isSelected ? {
                  background: 'var(--cta-gradient)',
                  boxShadow: '0 2px 10px rgba(196,69,115,0.32)',
                } : {
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                }}
              >
                <span style={{ fontSize: 24 }}>{cat.emoji}</span>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? 'var(--gold)' : 'var(--text-2)',
                  fontFamily: 'Manrope',
                }}
              >
                {cat.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
