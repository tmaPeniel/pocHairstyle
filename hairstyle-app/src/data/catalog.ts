export const categories = [
  { name: 'Tresses', icon: '💇🏾', count: 14, image: '/images/hairstyles/box-braids.png' },
  { name: 'Vanilles & Twists', icon: '✨', count: 6, image: '/images/hairstyles/vanilles.png' },
  { name: 'Locks', icon: '🔒', count: 8, image: '/images/hairstyles/dreadlocks.png' },
  { name: 'Perruques & Lace', icon: '👑', count: 8, image: '/images/hairstyles/perruque-frontale.png' },
  { name: 'Tissages', icon: '💖', count: 7, image: '/images/hairstyles/tissage-ouvert.png' },
  { name: 'Soins capillaires', icon: '🌿', count: 4, image: '/images/hairstyles/soin-hydratant.png' },
] as const

type CatalogSeed = {
  name: string
  category: string
  price: number
  duration: string
  image: string
  description?: string
}

const seeds: CatalogSeed[] = [
  { name: 'Box Braids', category: 'Tresses', price: 80, duration: '3-6h', image: 'box-braids.png' },
  { name: 'Knotless Braids', category: 'Tresses', price: 100, duration: '4-7h', image: 'knotless-braids.png' },
  { name: 'French Curl Braids', category: 'Tresses', price: 110, duration: '4-6h', image: 'french-curl-braids.png' },
  { name: 'Bohemian Braids', category: 'Tresses', price: 120, duration: '4-7h', image: 'bohemian-braids.png' },
  { name: 'Goddess Braids', category: 'Tresses', price: 115, duration: '4-6h', image: 'goddess-braids.png' },
  { name: 'Fulani Braids', category: 'Tresses', price: 95, duration: '3-5h', image: 'fulani-braids.png' },
  { name: 'Tribal Braids', category: 'Tresses', price: 95, duration: '3-5h', image: 'tresses-collees.png' },
  { name: 'Cornrows', category: 'Tresses', price: 55, duration: '2-4h', image: 'tresses-collees.png' },
  { name: 'Feed-in Braids', category: 'Tresses', price: 75, duration: '3-5h', image: 'tresses-collees.png' },
  { name: 'Lemonade Braids', category: 'Tresses', price: 85, duration: '3-5h', image: 'lemonade-braids.png' },
  { name: 'Micro Braids', category: 'Tresses', price: 150, duration: '6-9h', image: 'micro-braids.png' },
  { name: 'Crochet Braids', category: 'Tresses', price: 70, duration: '2-4h', image: 'crochet-braids.png' },
  { name: 'Crochet Twists', category: 'Tresses', price: 75, duration: '2-4h', image: 'passion-twists.png' },
  { name: 'Crochet Locs', category: 'Tresses', price: 85, duration: '3-5h', image: 'soft-locs.png' },

  { name: 'Senegalese Twists', category: 'Vanilles & Twists', price: 85, duration: '3-6h', image: 'vanilles.png' },
  { name: 'Marley Twists', category: 'Vanilles & Twists', price: 95, duration: '4-6h', image: 'vanilles.png' },
  { name: 'Passion Twists', category: 'Vanilles & Twists', price: 105, duration: '4-7h', image: 'passion-twists.png' },
  { name: 'Havana Twists', category: 'Vanilles & Twists', price: 95, duration: '3-5h', image: 'vanilles.png' },
  { name: 'Spring Twists', category: 'Vanilles & Twists', price: 90, duration: '3-5h', image: 'passion-twists.png' },
  { name: 'Mini Twists', category: 'Vanilles & Twists', price: 75, duration: '3-5h', image: 'vanilles.png' },

  { name: 'Starter Locks', category: 'Locks', price: 100, duration: '3-5h', image: 'dreadlocks.png' },
  { name: 'Retwist Locks', category: 'Locks', price: 60, duration: '2-4h', image: 'dreadlocks.png' },
  { name: 'Faux Locs', category: 'Locks', price: 130, duration: '5-8h', image: 'soft-locs.png' },
  { name: 'Soft Locs', category: 'Locks', price: 125, duration: '4-7h', image: 'soft-locs.png' },
  { name: 'Butterfly Locs', category: 'Locks', price: 135, duration: '5-8h', image: 'butterfly-locs.png' },
  { name: 'Goddess Locs', category: 'Locks', price: 145, duration: '5-8h', image: 'soft-locs.png' },
  { name: 'Microlocs', category: 'Locks', price: 220, duration: '8-12h', image: 'soft-locs.png' },
  { name: 'Sisterlocks', category: 'Locks', price: 260, duration: '10-14h', image: 'dreadlocks.png' },

  { name: 'Pose de perruque', category: 'Perruques & Lace', price: 55, duration: '1-2h', image: 'perruque-frontale.png' },
  { name: 'Pose de lace wig', category: 'Perruques & Lace', price: 90, duration: '2-3h', image: 'perruque-frontale.png' },
  { name: 'Pose de frontal', category: 'Perruques & Lace', price: 90, duration: '2-3h', image: 'perruque-frontale.png' },
  { name: 'Pose de closure', category: 'Perruques & Lace', price: 75, duration: '2-3h', image: 'perruque-frontale.png' },
  { name: 'Installation glueless', category: 'Perruques & Lace', price: 65, duration: '1-2h', image: 'perruque-frontale.png' },
  { name: 'Personnalisation de perruque', category: 'Perruques & Lace', price: 70, duration: '2-4h', image: 'perruque-frontale.png' },
  { name: 'Coloration de perruque', category: 'Perruques & Lace', price: 100, duration: '3-5h', image: 'perruque-frontale.png' },
  { name: 'Entretien de perruque', category: 'Perruques & Lace', price: 45, duration: '1-2h', image: 'perruque-frontale.png' },

  { name: 'Tissage ouvert', category: 'Tissages', price: 80, duration: '2-4h', image: 'tissage-ouvert.png' },
  { name: 'Tissage fermé', category: 'Tissages', price: 90, duration: '3-4h', image: 'tissage-closure.png' },
  { name: 'Tissage avec closure', category: 'Tissages', price: 105, duration: '3-5h', image: 'tissage-closure.png' },
  { name: 'Tissage avec frontal', category: 'Tissages', price: 125, duration: '3-5h', image: 'perruque-frontale.png' },
  { name: 'Tissage invisible', category: 'Tissages', price: 95, duration: '3-5h', image: 'tissage-ouvert.png' },
  { name: 'Tissage cousu', category: 'Tissages', price: 90, duration: '3-5h', image: 'tissage-ouvert.png' },
  { name: 'Tissage collé', category: 'Tissages', price: 70, duration: '2-3h', image: 'tissage-closure.png' },

  { name: 'Diagnostic capillaire', category: 'Soins capillaires', price: 25, duration: '30min', image: 'diagnostic-capillaire.png' },
  { name: 'Soin hydratant profond', category: 'Soins capillaires', price: 45, duration: '1-2h', image: 'soin-hydratant.png' },
  { name: 'Soin détox du cuir chevelu', category: 'Soins capillaires', price: 55, duration: '1-2h', image: 'diagnostic-capillaire.png' },
  { name: 'Routine cheveux naturels', category: 'Soins capillaires', price: 65, duration: '2h', image: 'soin-hydratant.png' },
]

const badges = ['Populaire', 'Premium', 'Tendance'] as const

const categoryGalleries: Record<string, string[]> = {
  Tresses: [
    '/images/hairstyles/box-braids.png',
    '/images/hairstyles/knotless-braids.png',
    '/images/hairstyles/bohemian-braids.png',
    '/images/hairstyles/fulani-braids.png',
    '/images/hairstyles/tresses-collees.png',
  ],
  'Vanilles & Twists': [
    '/images/hairstyles/vanilles.png',
    '/images/hairstyles/passion-twists.png',
    '/images/hairstyles/crochet-braids.png',
  ],
  Locks: [
    '/images/hairstyles/dreadlocks.png',
    '/images/hairstyles/soft-locs.png',
    '/images/hairstyles/butterfly-locs.png',
  ],
  'Perruques & Lace': [
    '/images/hairstyles/perruque-frontale.png',
    '/images/hairstyles/tissage-closure.png',
    '/images/hairstyles/tissage-ouvert.png',
  ],
  Tissages: [
    '/images/hairstyles/tissage-ouvert.png',
    '/images/hairstyles/tissage-closure.png',
    '/images/hairstyles/perruque-frontale.png',
  ],
  'Soins capillaires': [
    '/images/hairstyles/soin-hydratant.png',
    '/images/hairstyles/diagnostic-capillaire.png',
  ],
}

export const hairstyles = seeds.map((seed, index) => ({
  id: String(index + 1),
  name: seed.name,
  category: seed.category,
  image: `/images/hairstyles/${seed.image}`,
  startingPrice: seed.price,
  rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
  reviewCount: 48 + ((index * 37) % 280),
  badge: index < 9 ? badges[index % badges.length] : '',
  duration: seed.duration,
}))

export const services = seeds.map((seed, index) => ({
  id: String(index + 1),
  name: seed.name,
  category: seed.category,
  description: seed.description ?? `${seed.name} réalisée avec soin pour un résultat élégant, protecteur et durable. La prestation est adaptée à votre longueur et à la texture de vos cheveux.`,
  price: seed.price,
  duration: seed.duration,
  image: `/images/hairstyles/${seed.image}`,
  gallery: Array.from(new Set([
    `/images/hairstyles/${seed.image}`,
    ...(categoryGalleries[seed.category] ?? []),
  ])),
}))

export function formatEuro(value: number) {
  return `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)}`
}
