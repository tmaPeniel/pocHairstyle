export const categories = [
  { name: 'Tresses', icon: '💇🏾', count: 14, image: '/images/hairstyles/box-braids.png' },
  { name: 'Vanilles & Twists', icon: '✨', count: 6, image: '/images/hairstyles/vanilles.png' },
  { name: 'Locks', icon: '🔒', count: 8, image: '/images/hairstyles/dreadlocks.png' },
  { name: 'Perruques & Lace', icon: '👑', count: 8, image: '/images/hairstyles/perruque-frontale.png' },
  { name: 'Tissages', icon: '💖', count: 7, image: '/images/hairstyles/fulani-braids.png' },
  { name: 'Soins capillaires', icon: '🌿', count: 4, image: '/images/hairstyles/keratine.png' },
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
  { name: 'Box Braids', category: 'Tresses', price: 25000, duration: '3-6h', image: 'box-braids.png' },
  { name: 'Knotless Braids', category: 'Tresses', price: 30000, duration: '4-7h', image: 'knotless-braids.png' },
  { name: 'French Curl Braids', category: 'Tresses', price: 30000, duration: '4-6h', image: 'fulani-braids.png' },
  { name: 'Bohemian Braids', category: 'Tresses', price: 35000, duration: '4-7h', image: 'box-braids.png' },
  { name: 'Goddess Braids', category: 'Tresses', price: 32000, duration: '4-6h', image: 'knotless-braids.png' },
  { name: 'Fulani Braids', category: 'Tresses', price: 28000, duration: '3-5h', image: 'fulani-braids.png' },
  { name: 'Tribal Braids', category: 'Tresses', price: 28000, duration: '3-5h', image: 'tresses-collees.png' },
  { name: 'Cornrows', category: 'Tresses', price: 15000, duration: '2-4h', image: 'tresses-collees.png' },
  { name: 'Feed-in Braids', category: 'Tresses', price: 22000, duration: '3-5h', image: 'tresses-collees.png' },
  { name: 'Lemonade Braids', category: 'Tresses', price: 25000, duration: '3-5h', image: 'fulani-braids.png' },
  { name: 'Micro Braids', category: 'Tresses', price: 45000, duration: '6-9h', image: 'box-braids.png' },
  { name: 'Crochet Braids', category: 'Tresses', price: 20000, duration: '2-4h', image: 'box-braids.png' },
  { name: 'Crochet Twists', category: 'Tresses', price: 22000, duration: '2-4h', image: 'vanilles.png' },
  { name: 'Crochet Locs', category: 'Tresses', price: 25000, duration: '3-5h', image: 'dreadlocks.png' },

  { name: 'Senegalese Twists', category: 'Vanilles & Twists', price: 25000, duration: '3-6h', image: 'vanilles.png' },
  { name: 'Marley Twists', category: 'Vanilles & Twists', price: 28000, duration: '4-6h', image: 'vanilles.png' },
  { name: 'Passion Twists', category: 'Vanilles & Twists', price: 30000, duration: '4-7h', image: 'vanilles.png' },
  { name: 'Havana Twists', category: 'Vanilles & Twists', price: 28000, duration: '3-5h', image: 'vanilles.png' },
  { name: 'Spring Twists', category: 'Vanilles & Twists', price: 26000, duration: '3-5h', image: 'vanilles.png' },
  { name: 'Mini Twists', category: 'Vanilles & Twists', price: 22000, duration: '3-5h', image: 'vanilles.png' },

  { name: 'Starter Locks', category: 'Locks', price: 30000, duration: '3-5h', image: 'dreadlocks.png' },
  { name: 'Retwist Locks', category: 'Locks', price: 18000, duration: '2-4h', image: 'dreadlocks.png' },
  { name: 'Faux Locs', category: 'Locks', price: 35000, duration: '5-8h', image: 'dreadlocks.png' },
  { name: 'Soft Locs', category: 'Locks', price: 35000, duration: '4-7h', image: 'dreadlocks.png' },
  { name: 'Butterfly Locs', category: 'Locks', price: 38000, duration: '5-8h', image: 'dreadlocks.png' },
  { name: 'Goddess Locs', category: 'Locks', price: 40000, duration: '5-8h', image: 'dreadlocks.png' },
  { name: 'Microlocs', category: 'Locks', price: 65000, duration: '8-12h', image: 'dreadlocks.png' },
  { name: 'Sisterlocks', category: 'Locks', price: 80000, duration: '10-14h', image: 'dreadlocks.png' },

  { name: 'Pose de perruque', category: 'Perruques & Lace', price: 15000, duration: '1-2h', image: 'perruque-frontale.png' },
  { name: 'Pose de lace wig', category: 'Perruques & Lace', price: 25000, duration: '2-3h', image: 'perruque-frontale.png' },
  { name: 'Pose de frontal', category: 'Perruques & Lace', price: 25000, duration: '2-3h', image: 'perruque-frontale.png' },
  { name: 'Pose de closure', category: 'Perruques & Lace', price: 20000, duration: '2-3h', image: 'perruque-frontale.png' },
  { name: 'Installation glueless', category: 'Perruques & Lace', price: 18000, duration: '1-2h', image: 'perruque-frontale.png' },
  { name: 'Personnalisation de perruque', category: 'Perruques & Lace', price: 20000, duration: '2-4h', image: 'perruque-frontale.png' },
  { name: 'Coloration de perruque', category: 'Perruques & Lace', price: 30000, duration: '3-5h', image: 'perruque-frontale.png' },
  { name: 'Entretien de perruque', category: 'Perruques & Lace', price: 12000, duration: '1-2h', image: 'perruque-frontale.png' },

  { name: 'Tissage ouvert', category: 'Tissages', price: 22000, duration: '2-4h', image: 'fulani-braids.png' },
  { name: 'Tissage fermé', category: 'Tissages', price: 25000, duration: '3-4h', image: 'fulani-braids.png' },
  { name: 'Tissage avec closure', category: 'Tissages', price: 30000, duration: '3-5h', image: 'perruque-frontale.png' },
  { name: 'Tissage avec frontal', category: 'Tissages', price: 35000, duration: '3-5h', image: 'perruque-frontale.png' },
  { name: 'Tissage invisible', category: 'Tissages', price: 28000, duration: '3-5h', image: 'fulani-braids.png' },
  { name: 'Tissage cousu', category: 'Tissages', price: 25000, duration: '3-5h', image: 'fulani-braids.png' },
  { name: 'Tissage collé', category: 'Tissages', price: 20000, duration: '2-3h', image: 'fulani-braids.png' },

  { name: 'Diagnostic capillaire', category: 'Soins capillaires', price: 5000, duration: '30min', image: 'keratine.png' },
  { name: 'Soin hydratant profond', category: 'Soins capillaires', price: 12000, duration: '1-2h', image: 'keratine.png' },
  { name: 'Soin détox du cuir chevelu', category: 'Soins capillaires', price: 15000, duration: '1-2h', image: 'keratine.png' },
  { name: 'Routine cheveux naturels', category: 'Soins capillaires', price: 18000, duration: '2h', image: 'keratine.png' },
]

const badges = ['Populaire', 'Premium', 'Tendance'] as const

const categoryGalleries: Record<string, string[]> = {
  Tresses: [
    '/images/hairstyles/box-braids.png',
    '/images/hairstyles/knotless-braids.png',
    '/images/hairstyles/fulani-braids.png',
    '/images/hairstyles/tresses-collees.png',
  ],
  'Vanilles & Twists': [
    '/images/hairstyles/vanilles.png',
    '/images/hairstyles/knotless-braids.png',
    '/images/hairstyles/fulani-braids.png',
  ],
  Locks: [
    '/images/hairstyles/dreadlocks.png',
    '/images/hairstyles/vanilles.png',
  ],
  'Perruques & Lace': [
    '/images/hairstyles/perruque-frontale.png',
    '/images/hairstyles/lissage-bresilien.png',
    '/images/hairstyles/keratine.png',
  ],
  Tissages: [
    '/images/hairstyles/fulani-braids.png',
    '/images/hairstyles/perruque-frontale.png',
    '/images/hairstyles/lissage-bresilien.png',
  ],
  'Soins capillaires': [
    '/images/hairstyles/keratine.png',
    '/images/hairstyles/lissage-bresilien.png',
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

export function formatFcfa(value: number) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`
}
