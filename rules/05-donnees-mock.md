# 05 — Données mockées

> Toutes les données sont dans `hairstyle-app/src/data/`. Aucun appel API réel.

---

## `hairstylists.json`

Tableau de coiffeuses.

```ts
interface Hairstylist {
  id: string           // "1", "2", …
  name: string         // "Amara Diallo"
  rating: number       // 4.9
  reviewCount: number  // 214
  city: string         // "Paris 11e"
  priceFrom: number    // 45  (en euros)
  image: string        // URL Unsplash (400x400, crop=face)
  cover: string        // URL Unsplash (800x400)
  bio: string          // Description 1-2 phrases
  gallery: string[]    // 4 URLs Unsplash (300x300)
  services: string[]   // IDs de services.json  ["1","2","3"]
  categories: string[] // ["Tresses","Locks"]
}
```

**Catégories valides** : `Tresses` · `Locks` · `Lissage` · `Perruques` · `Vanilles`

---

## `hairstyles.json`

Tableau de styles de coiffure (affiché dans les carousels et la grille).

```ts
interface Hairstyle {
  id: string           // "1", "2", …
  name: string         // "Box Braids"
  category: string     // Doit correspondre à une catégorie valide
  image: string        // URL Unsplash (400x500, portrait)
  startingPrice: number // 80
  rating: number       // 4.9
  reviewCount: number  // 342
  badge: string        // "Populaire" | "Premium" | "Tendance"
  duration: string     // "4-6h"
}
```

**Badges valides** : `Populaire` (or) · `Premium` (violet) · `Tendance` (rouge)

---

## `services.json`

Tableau des prestations proposées.

```ts
interface Service {
  id: string           // "1", "2", …
  name: string         // "Box Braids"
  category: string     // Catégorie valide
  description: string  // 1 phrase descriptive
  price: number        // 80 (en euros, tout inclus)
  duration: string     // "4-6h"
  image: string        // URL Unsplash (200x200)
}
```

**Règle** : `services[].id` doit correspondre exactement aux valeurs dans `hairstylists[].services[]`.

---

## `bookings.json`

Historique des réservations mockées (pour la page ReservationsPage).

```ts
interface Booking {
  id: string           // "b1", "b2", …
  stylistId: string    // Référence hairstylists.json
  stylistName: string  // Dénormalisé pour affichage direct
  serviceId: string    // Référence services.json
  serviceName: string  // Dénormalisé
  date: string         // "YYYY-MM-DD"
  time: string         // "14:00"
  price: number        // 80
  deposit: number      // 20
  status: string       // "confirmed" | "pending" | "cancelled"
  address: string      // Adresse complète
}
```

**Statuts** : `confirmed` (vert) · `pending` (orange) · `cancelled` (rouge)

---

## `reviews.json`

Avis clients liés aux coiffeuses et services.

```ts
interface Review {
  id: string           // "r1", "r2", …
  stylistId: string    // Référence hairstylists.json
  serviceId: string    // Référence services.json
  author: string       // "Kiara M."
  avatar: string       // URL Unsplash (80x80, crop=face)
  rating: number       // 1 à 5
  date: string         // "YYYY-MM-DD"
  comment: string      // Texte de l'avis
  serviceLabel: string // Label affiché sur le badge (ex: "Box Braids")
}
```

---

## Règles générales sur les données

1. **Ne jamais appeler une API** — importer les JSON directement via `import data from '../data/xxx.json'`
2. **Cohérence des IDs** — vérifier que les références croisées existent (services dans hairstylists, etc.)
3. **URLs Unsplash** — utiliser uniquement des URLs Unsplash avec paramètres `?w=X&h=X&fit=crop`
4. **Dates** — format ISO `YYYY-MM-DD` dans les JSON, instancier avec `new Date(str)` dans les composants
5. **Ajouter des données** — toujours maintenir la cohérence entre les 5 fichiers JSON
6. **Modifier les prix** — toujours en euros entiers (pas de décimales)
