# 03 — Règles par composant

## `Header`

**Fichier** : `src/components/Header.tsx`

**Props** :
```tsx
interface HeaderProps {
  title?: string        // Titre centré (pages intérieures)
  showBack?: boolean    // Affiche le bouton retour (défaut: false)
  transparent?: boolean // Fond transparent (sur image cover)
  action?: ReactNode    // Slot action droite custom
}
```

**Règles** :
- Sans `showBack` → affiche le logo "Hairly" + cloche
- Avec `showBack` → affiche flèche retour `navigate(-1)`
- Toujours `sticky top-0 z-40` avec `backdropFilter: 'blur(12px)'`
- En mode normal : `borderBottom: '1px solid var(--border)'`
- Ne jamais masquer le Header sur les pages principales

---

## `BottomNav`

**Fichier** : `src/components/BottomNav.tsx`

**5 onglets** : Accueil `/` · Styles `/hairstyles` · Coiffeuses `/hairstylists` · Résa `/reservations` · Profil `/profile`

**Règles** :
- Masqué sur `/confirmation` et `/success` (configuré dans `App.tsx`)
- Fond `rgba(255,255,255,0.96)` + `backdropFilter: 'blur(16px)'`
- Onglet actif : icône et texte en `var(--gold)`
- Onglet inactif : `var(--text-3)`
- Toujours `position: fixed bottom-0`

---

## `SearchBar`

**Fichier** : `src/components/SearchBar.tsx`

**Props** :
```tsx
interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void  // Appelé à chaque frappe
  value?: string                       // Valeur contrôlée
}
```

**Règles** :
- Bouton ✕ visible uniquement si `value !== ''`
- `onFocus` → border gold, `onBlur` → border normale
- Sans `onSearch` → navigation vers `/hairstylists?q=…`
- Avec `onSearch` → callback à chaque keystroke (pas seulement submit)

---

## `CategoryCarousel`

**Fichier** : `src/components/CategoryCarousel.tsx`

**5 catégories** : Tresses 💫 · Locks 🌿 · Lissage ✨ · Perruques 👑 · Vanilles 🌸

**Règles** :
- Tap sur catégorie sélectionnée → déselectionne (toggle)
- Catégorie sélectionnée : gradient gold + ombre dorée
- Scroll horizontal sans scrollbar visible (`no-scrollbar`)
- Passer `selected=""` pour aucune sélection

---

## `HairstyleCarousel`

**Fichier** : `src/components/HairstyleCarousel.tsx`

**Règles** :
- Cards `w-36` (144px) avec image `h-44` (176px)
- Badge en haut à gauche : Populaire (or) · Premium (violet) · Tendance (rouge)
- Tap sur card → appelle `onSelect(category)` ou navigue vers `/hairstyles`
- Titre section toujours : **🔥 Styles populaires**

---

## `HairstylistCard`

**Fichier** : `src/components/HairstylistCard.tsx`

**2 variantes** :

### `compact={true}` (pour les carousels)
- `w-32` (128px), photo carrée `h-32`
- Note sur l'image (overlay sombre)
- Indicateur vert "online" en haut à droite

### `compact={false}` (liste verticale, défaut)
- Layout horizontal : photo `w-16 h-16` + infos
- Chips de catégories (max 2)
- Note + ville + avis count
- Bouton "Voir profil" gold

**Règles communes** :
- `navigate(\`/hairstylist/${stylist.id}\`)` au clic
- `active-scale` obligatoire sur le container

---

## `PromoBanner`

**Fichier** : `src/components/PromoBanner.tsx`

**Règles** :
- Layout split : texte à gauche (60%), image à droite (44%)
- Fond sombre (`#1A0E00 → #3A2200`) — **exception au thème blanc**
- Dégradé de gauche à droite sur l'image pour lisibilité du texte
- CTA navigue vers `/hairstylists?category=Tresses`
- Toujours dans `px-4`
