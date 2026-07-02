# 02 — Système de design

## Palette de couleurs

### Tokens CSS (définis dans `src/index.css`)

```css
:root {
  --bg:          #F8F7F5;   /* Fond général */
  --surface:     #FFFFFF;   /* Cards, inputs */
  --surface-2:   #F0EDE7;   /* Hover, disabled */
  --border:      #E8E4DC;   /* Bordures légères */
  --border-2:    #D5CFC3;   /* Bordures marquées */
  --text-1:      #1A1A1A;   /* Texte principal */
  --text-2:      #6B6B6B;   /* Texte secondaire */
  --text-3:      #9A9A9A;   /* Placeholder, labels */
  --gold:        #C9A84C;   /* Accent principal */
  --gold-light:  rgba(201,168,76,0.12);   /* Background doré léger */
  --gold-border: rgba(201,168,76,0.28);   /* Bordure dorée */
  --shadow-sm:   0 1px 3px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04);
  --shadow-md:   0 4px 20px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05);
}
```

### Règles d'utilisation couleurs

| Contexte | Token à utiliser |
|---|---|
| Fond de page | `var(--bg)` |
| Card / input | `var(--surface)` |
| Texte principal | `var(--text-1)` |
| Texte secondaire | `var(--text-2)` |
| Label, placeholder | `var(--text-3)` |
| CTA principal | gradient `#C9A84C → #E8C040` |
| Badge doré | `var(--gold-light)` + `var(--gold-border)` |
| Succès / online | `#22C55E` |
| Erreur / annulation | `#DC2626` |
| Warning | `#F59E0B` |

> ❌ Ne jamais utiliser `#0a0a0a`, `#141414`, `#1a1a1a` comme fond — le thème est **blanc**.

---

## Typographie

### Police
- **Inter** uniquement, chargée via Google Fonts dans `index.html`
- Toujours préciser `fontFamily: 'Inter'` dans les inline styles

### Échelle de tailles

| Usage | Taille | Poids |
|---|---|---|
| Titre section | 15px | 700 |
| Titre page (cover) | 20–24px | 800 |
| Corps texte | 13–14px | 400–500 |
| Label secondaire | 11–12px | 500–600 |
| Micro label | 9–10px | 500–700 |
| Prix (accent) | 18–24px | 800 |

---

## Espacement

- Padding horizontal des pages : `px-4` (16px)
- Gap entre cards : `gap-3` (12px)
- Padding intérieur d'une card : `p-4` (16px)
- Margin bottom entre sections : `mb-5` ou `mb-6`

---

## Border radius

| Élément | Valeur |
|---|---|
| Card principale | `rounded-2xl` (16px) |
| Bouton CTA | `rounded-2xl` (16px) |
| Image thumbnail | `rounded-full` |
| Avatar / photo ronde | `rounded-full` |
| Badge / chip | `rounded-full` |
| Input | `rounded-2xl` (16px) |
| Onglet actif (tab) | `rounded-lg` (8px) |

---

## Ombres

- Toujours utiliser `var(--shadow-sm)` pour les cards
- Utiliser `var(--shadow-md)` pour les éléments flottants (sticky bars, modals)
- **Jamais** d'ombre noire dure — uniquement des ombres douces

---

## Boutons

### CTA principal (gold)
```tsx
style={{
  background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)',
  color: '#1A1A1A',
  fontWeight: 700,
  fontFamily: 'Inter',
  boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
}}
className="active-scale"
```

### Bouton secondaire
```tsx
style={{
  background: 'var(--surface)',
  color: 'var(--text-2)',
  border: '1px solid var(--border)',
}}
className="active-scale"
```

### Bouton doré léger (ghost)
```tsx
style={{
  background: 'var(--gold-light)',
  color: 'var(--gold)',
  border: '1px solid var(--gold-border)',
}}
```

---

## Sticky bars

Les barres sticky (CTA bas de page, bottom nav) utilisent :

```tsx
style={{
  background: 'rgba(255,255,255,0.96)',
  backdropFilter: 'blur(12px)',
  borderTop: '1px solid var(--border)',
  paddingBottom: 'env(safe-area-inset-bottom, 12px)',
}}
```

---

## Images

- Toujours `object-cover` pour les images de profil/cover
- Toujours `loading="lazy"` sauf image above-the-fold
- Overlay gradient sur les images avec texte :
  ```tsx
  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)'
  ```
- Sur images : le texte reste **blanc** (pas `var(--text-1)`)
