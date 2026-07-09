import hairstylists from '../data/hairstylists.json'
import { categories, formatEuro, services } from '../data/catalog'

export type SearchType = 'all' | 'cuts' | 'stylists' | 'categories'

export type SearchFilters = {
  type: SearchType
  category: string
  maxPrice: number | null
}

export type SearchResult = {
  id: string
  kind: Exclude<SearchType, 'all'>
  title: string
  subtitle: string
  image: string
  path: string
  category: string
  price: number
}

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export function searchCatalog(query: string, filters: SearchFilters): SearchResult[] {
  const term = normalize(query)

  const cuts: SearchResult[] = services.map(service => ({
    id: `cut-${service.id}`,
    kind: 'cuts',
    title: service.name,
    subtitle: `${service.category} · ${formatEuro(service.price)}`,
    image: service.image,
    path: `/service/${service.id}`,
    category: service.category,
    price: service.price,
  }))

  const stylists: SearchResult[] = hairstylists.map(stylist => ({
    id: `stylist-${stylist.id}`,
    kind: 'stylists',
    title: stylist.name,
    subtitle: `${stylist.categories.join(' · ')} · ★ ${stylist.rating}`,
    image: stylist.image,
    path: `/hairstylist/${stylist.id}`,
    category: stylist.categories[0] ?? '',
    price: stylist.priceFrom,
  }))

  const categoryResults: SearchResult[] = categories.map(category => ({
    id: `category-${category.name}`,
    kind: 'categories',
    title: category.name,
    subtitle: `${category.count} prestations`,
    image: category.image,
    path: `/hairstyles?category=${encodeURIComponent(category.name)}`,
    category: category.name,
    price: 0,
  }))

  return [...cuts, ...stylists, ...categoryResults]
    .filter(result => filters.type === 'all' || result.kind === filters.type)
    .filter(result => !filters.category || result.category === filters.category)
    .filter(result => filters.maxPrice === null || result.kind === 'categories' || result.price <= filters.maxPrice)
    .filter(result => !term || normalize(`${result.title} ${result.subtitle} ${result.category}`).includes(term))
    .sort((a, b) => {
      if (!term) return a.title.localeCompare(b.title, 'fr')
      const aExact = normalize(a.title) === term ? 1 : 0
      const bExact = normalize(b.title) === term ? 1 : 0
      const aStarts = normalize(a.title).startsWith(term) ? 1 : 0
      const bStarts = normalize(b.title).startsWith(term) ? 1 : 0
      return bExact - aExact || bStarts - aStarts || a.title.localeCompare(b.title, 'fr')
    })
}
