import { useNavigate, useSearchParams } from 'react-router-dom'
import { categories, formatFcfa, hairstyles } from '../data/catalog'

export default function HairstyleListPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category')
  const visibleStyles = selectedCategory ? hairstyles.filter(style => style.category === selectedCategory) : []

  return (
    <main className="min-h-[100svh] pb-24" style={{ background: '#FFF8F0' }}>
      <header className="grid grid-cols-[38px_1fr_38px] items-center px-4 pb-4 pt-5">
        <button type="button" onClick={() => selectedCategory ? setSearchParams({}) : navigate('/')} aria-label="Retour" className="grid h-9 w-9 place-items-center rounded-full active-scale">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1F1F1F" strokeWidth="1.8"><path d="M19 12H5m7 7-7-7 7-7" /></svg>
        </button>
        <h1 className="text-center text-[16px] font-bold">{selectedCategory ?? 'Catégories'}</h1>
        <span />
      </header>

      {!selectedCategory ? (
        <section className="grid grid-cols-2 gap-3 px-4">
          {categories.map(category => (
            <button key={category.name} type="button" onClick={() => setSearchParams({ category: category.name })} className="relative h-[185px] overflow-hidden rounded-xl text-left shadow-sm active-scale">
              <img src={category.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(22,10,14,.86),transparent 68%)' }} />
              <span className="absolute bottom-3 left-3 right-2 text-white">
                <span className="block text-[14px] font-bold leading-tight">{category.name}</span>
                <span className="mt-0.5 block text-[9px]">{category.count} prestations</span>
              </span>
            </button>
          ))}
        </section>
      ) : (
        <section className="px-4">
          <p className="mb-3 text-[10px] text-[#756B65]">{visibleStyles.length} prestations disponibles</p>
          <div className="grid grid-cols-2 gap-3">
            {visibleStyles.map(style => (
              <button key={style.id} type="button" onClick={() => navigate(`/service/${style.id}`)} className="overflow-hidden rounded-xl border border-[#E7DACA] bg-white text-left active-scale">
                <img src={style.image} alt={style.name} className="h-[150px] w-full object-cover" />
                <div className="p-3">
                  <p className="truncate text-[11px] font-bold">{style.name}</p>
                  <p className="mt-1 text-[9px] font-semibold text-[#5B2A6F]">dès {formatFcfa(style.startingPrice)}</p>
                  <p className="mt-1 text-[8px] text-[#8E8680]">★ {style.rating} · {style.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
