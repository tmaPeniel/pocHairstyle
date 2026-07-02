# 06 — Conventions de code

## TypeScript

- Toujours typer les `props` avec une `interface` locale dans le fichier
- Pas de `any` — utiliser des types précis ou `unknown`
- Les données JSON importées sont automatiquement typées par TypeScript
- Pas de fichiers de types séparés (projet POC)

---

## Nommage

| Élément | Convention | Exemple |
|---|---|---|
| Composant React | PascalCase | `HairstylistCard` |
| Page | PascalCase + suffixe `Page` | `BookingPage` |
| Props interface | PascalCase + suffixe `Props` | `HairstylistCardProps` |
| Variables locales | camelCase | `selectedCategory` |
| Constantes module | SCREAMING_SNAKE | `HIDE_NAV_PATHS` |
| Fichiers composants | PascalCase.tsx | `SearchBar.tsx` |
| Fichiers pages | PascalCase + Page.tsx | `BookingPage.tsx` |
| Fichiers données | kebab-case.json | `hairstylists.json` |

---

## Structure d'un composant

```tsx
// 1. Imports React
import { useState } from 'react'
// 2. Imports router
import { useNavigate } from 'react-router-dom'
// 3. Imports composants locaux
import Header from '../components/Header'
// 4. Imports données
import hairstylists from '../data/hairstylists.json'

// 5. Types / interfaces locaux
interface MyProps { ... }

// 6. Constantes module (hors composant)
const SOME_CONST = [...]

// 7. Composant default export
export default function MyComponent({ prop }: MyProps) {
  // 8. Hooks
  // 9. Computed values (useMemo si coûteux)
  // 10. Handlers
  // 11. JSX return
}
```

---

## Styles

### Règle principale : inline styles pour les tokens

Utiliser des **inline styles** pour toutes les valeurs qui font référence aux tokens CSS ou qui doivent être dynamiques :

```tsx
// ✅ Correct
<p style={{ color: 'var(--text-2)', fontFamily: 'Inter', fontSize: 13 }}>

// ✅ Correct (dynamique)
<div style={{ background: isSelected ? 'var(--gold-light)' : 'var(--surface)' }}>

// ✅ Correct (Tailwind pour layout/spacing)
<div className="flex items-center gap-3 px-4 mb-5">
```

### Tailwind : uniquement pour le layout

Utiliser Tailwind **uniquement** pour :
- Flexbox / Grid : `flex`, `grid`, `items-center`, `justify-between`
- Spacing : `px-4`, `mb-5`, `gap-3`, `pt-2`
- Width/Height utilitaires : `w-full`, `min-w-0`, `flex-shrink-0`
- Overflow : `overflow-x-auto`, `overflow-hidden`
- Position : `fixed`, `absolute`, `relative`, `sticky`
- Z-index : `z-40`, `z-50`
- Transitions utilitaires : `transition-all`, `duration-150`

### Ne pas utiliser Tailwind pour

- Couleurs de texte (`text-*`) — utiliser `style={{ color: '...' }}`
- Couleurs de fond (`bg-*`) — utiliser `style={{ background: '...' }}`
- Tailles de police (`text-sm`) — utiliser `style={{ fontSize: 13 }}`
- Font weight (`font-bold`) — utiliser `style={{ fontWeight: 700 }}`

---

## Animations & interactions

### `active-scale` obligatoire sur tout élément cliquable

```tsx
<button className="active-scale" ...>
// ou
<div onClick={...} className="cursor-pointer active-scale" ...>
```

### Transitions de page (SuccessPage)

Pattern d'animation fade-up :
```tsx
const [visible, setVisible] = useState(false)
useEffect(() => { setTimeout(() => setVisible(true), 80) }, [])

const fadeUp = (delay: number) => ({
  opacity:    visible ? 1 : 0,
  transform:  visible ? 'translateY(0)' : 'translateY(18px)',
  transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
})
// Usage : <div style={fadeUp(250)}>
```

---

## Gestion d'état

- **Uniquement `useState`** — pas de Zustand, Redux, Context
- Pour les filtres complexes : `useMemo` pour les calculs coûteux
- Les données partagées entre pages passent par les **query params** URL

```tsx
// Passer des données entre pages
navigate(`/booking?serviceId=${id}&stylistId=${stylistId}`)

// Les lire
const [searchParams] = useSearchParams()
const serviceId = searchParams.get('serviceId')
```

---

## Gestion des cas limites

- Toujours afficher un **état vide** quand une liste est vide
- Toujours vérifier l'existence d'un élément avant de l'afficher :
  ```tsx
  const service = services.find(s => s.id === serviceId)
  if (!service) return null
  ```
- Toujours mettre `loading="lazy"` sur les images non critiques

---

## Ce qu'il ne faut PAS faire

```tsx
// ❌ Appel API
const data = await fetch('/api/hairstylists')

// ❌ Couleur sombre comme fond de page
<div style={{ background: '#0a0a0a' }}>

// ❌ Tailwind pour les couleurs
<p className="text-gray-500 text-sm font-bold">

// ❌ Police non-Inter
<p style={{ fontFamily: 'sans-serif' }}>

// ❌ État global
import { useStore } from './store'

// ❌ Composant sans active-scale
<button onClick={...}>Sans feedback tactile</button>
```
