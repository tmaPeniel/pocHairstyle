# 07 — Principes UX/UI

## Mobile-first : règles absolues

- **Largeur max** : `430px` centrée dans `#root` — ne jamais dépasser
- **Touch targets** : minimum `44px × 44px` pour tous les éléments cliquables
- **Padding horizontal** : toujours `px-4` (16px) minimum sur les contenus de page
- **Bottom padding** : `pb-24` (96px) pour les pages avec BottomNav, `pb-28` pour celles avec sticky CTA
- **Safe area** : `paddingBottom: 'env(safe-area-inset-bottom, Xpx)'` sur tous les éléments fixed bottom

---

## Navigation

### BottomNav (navigation principale)
- Toujours visible sauf sur `/confirmation` et `/success`
- L'onglet actif est déterminé par `location.pathname`
- Tap sur onglet déjà actif → aucune action supplémentaire (pas de scroll-to-top dans ce POC)

### Bouton retour
- `navigate(-1)` — jamais de route hardcodée dans le back button
- Bouton retour flottant sur les pages avec cover image (cercle semi-transparent)
- `Header` avec `showBack={true}` sur les pages intérieures

### Sticky CTA
- Pages avec un seul CTA important : `ServicePage`, `BookingPage`, `ConfirmationPage`, `HairstylistProfilePage`
- Position : `fixed bottom-0`, `z-40`, fond frosted glass
- Le bouton est **désactivé visuellement** quand l'action n'est pas possible (ex: BookingPage sans adresse)

---

## Feedback utilisateur

### Tap feedback
- Classe `active-scale` sur TOUS les éléments interactifs
- Effet : `transform: scale(0.96)` sur `:active` (0.13s)

### États de chargement
- Paiement : spinner animé (`animate-spin`) + texte "Paiement en cours…"
- Durée simulée : 2.2 secondes

### États vides
- Toujours afficher : une icône/emoji, un titre, un sous-texte, et si pertinent un CTA
- Pas d'affichage de liste vide sans contexte

### Indicateurs de statut
- En ligne : point vert `#22C55E` sur l'avatar
- Disponible : badge vert avec point pulsé
- Statut réservation : `confirmed` vert · `pending` orange · `cancelled` rouge

---

## Carousels et scrolls horizontaux

- Toujours `overflow-x-auto no-scrollbar` — jamais de scrollbar visible
- Padding droit implicite : le dernier item doit avoir `px-4` cohérent avec la page
- Pas de scroll-snap dans ce POC (trop contraignant sur mobile)
- Gap entre items : `gap-3` (12px)

---

## Formulaires (BookingPage)

- Champs **obligatoires** : marqués d'un `*` rouge
- Focus : border gold `var(--gold)` via `onFocus`/`onBlur`
- Feedback immédiat : le bouton CTA indique ce qui manque
- Placeholder : texte d'exemple concret (ex: "Ex : 12 rue de la Paix, Paris 75001")
- Textarea : `resize: none` pour cohérence visuelle

---

## Hiérarchie visuelle des sections

Chaque section d'une page suit ce pattern :

```
[Titre 15px bold]         [Action secondaire 12px gold]
[Contenu / liste / carousel]
[Spacing mb-5 ou mb-6 avant la prochaine section]
```

Les titres de section avec emoji ont la priorité visuelle :
- 🔥 Styles populaires
- 📍 Coiffeuses près de vous

---

## Images

- **Cover image** (HairstylistProfilePage, ServicePage) : toujours plein-largeur, `h-260` à `h-280`
- **Avatar coiffeuse** : toujours carré avec `rounded-2xl`, bordure gold sur les profils
- **Gallery** : grille 2 colonnes, aspect ratio carré

---

## Accessibilité minimale

- `alt` descriptif sur toutes les images
- Boutons avec contenu textuel ou `aria-label` si icône seule
- Contraste : texte gold `#C9A84C` sur fond blanc — acceptable pour les tailles ≥ 12px bold

---

## Tonalité et langue

- **Langue** : Français uniquement dans les textes d'interface
- **Exception** : "See all →" (intentionnellement anglais, style Airbnb)
- **Vouvoiement** : dans les messages système et confirmations
- **Tutoiement** : dans les placeholders et titres inspirants (ex: "Quelle coiffure tu veux ?")
- **Emojis** : utilisés avec parcimonie dans les titres de section et états vides
- **Prix** : toujours avec le symbole `€` après le nombre (ex: `80€`, `dès 45€`)

---

## Patterns à éviter

| ❌ Éviter | ✅ Préférer |
|---|---|
| Modal/overlay pour des détails | Page dédiée |
| Navigation via bouton "Accueil" sur toutes les pages | BottomNav |
| Texte tronqué sans tooltip | `line-clamp-1` avec contexte suffisant |
| Loading infinies | Données mockées immédiates |
| Confirmation dialog pour annulation | Bouton direct "Annuler" (POC) |
| Scroll infini | Liste complète (5 coiffeuses max en POC) |
