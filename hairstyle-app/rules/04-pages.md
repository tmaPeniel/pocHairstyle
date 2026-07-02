# 04 — Pages : structure et responsabilités

## Tableau des routes

| Page | Route | Description |
|---|---|---|
| `HomePage` | `/` | Accueil avec search, catégories, promos, carousels, liste |
| `HairstylistListPage` | `/hairstylists` | Liste filtrée + triée des coiffeuses |
| `HairstyleListPage` | `/hairstyles` | Grille des styles par catégorie |
| `HairstylistProfilePage` | `/hairstylist/:id` | Profil coiffeuse : tabs Services/Galerie/Avis |
| `ServicePage` | `/service/:id` | Détail d'un service + avis + similaires |
| `BookingPage` | `/booking` | Sélection date + horaire + adresse + notes |
| `ConfirmationPage` | `/confirmation` | Récap réservation + paiement acompte |
| `SuccessPage` | `/success` | Confirmation animée + prochaines étapes |
| `ReservationsPage` | `/reservations` | Tabs À venir / Passées |
| `ProfilePage` | `/profile` | Profil utilisateur + fidélité + menu |

---

## Paramètres URL importants

### `/hairstylists`
- `?category=Tresses` — pré-filtre sur une catégorie
- `?q=nomrecherche` — pré-remplit la recherche

### `/hairstylist/:id`
- `:id` — id de la coiffeuse dans `hairstylists.json`

### `/service/:id`
- `:id` — id du service dans `services.json`
- `?stylistId=X` — id de la coiffeuse sélectionnée

### `/booking`
- `?serviceId=X&stylistId=X` — service et coiffeuse choisis

### `/confirmation`
- `?serviceId=X&stylistId=X&date=ISO&time=HH:MM&address=X&notes=X`

### `/success`
- `?serviceId=X&stylistId=X&date=ISO&time=HH:MM&ref=HLY-XXXXX`

---

## Règles par page

### `HomePage`
- **Ordre des sections** : Header → Search → Catégories → PromoBanner → Styles populaires → Coiffeuses près de vous → Liste verticale
- La liste verticale se filtre selon `selectedCategory`
- `pb-24` pour ne pas être masquée par la BottomNav

### `HairstylistListPage`
- Recherche **fonctionnelle** : filtre sur nom, ville, catégorie
- Tri : par note (défaut), prix croissant, prix décroissant
- Chips de filtres actifs supprimables individuellement
- État vide avec illustration et bouton "Réinitialiser"

### `HairstylistProfilePage`
- Cover image plein-écran (`h-260`) avec overlay gradient
- **Stats bar** : Note / Avis / Services (juste sous la cover)
- **Onglets** : Services · Galerie · Avis
- Sticky CTA bas de page avec prix et bouton "Réserver →"
- Les reviews viennent de `reviews.json` filtrées par `stylistId`

### `ServicePage`
- Hero image `h-280` avec titre et note en overlay
- Section "Ce qui est inclus" : 4 items avec checkmarks gold
- Avis : `reviews.json` filtrés par `serviceId`
- Services similaires : même `category`, différent `id`, max 3
- Sticky CTA avec prix total

### `BookingPage`
- Champ **adresse obligatoire** (marqué `*`) — le bouton "Continuer" est bloqué sans
- Notes optionnelles (textarea)
- Hint dynamique dans le sticky CTA selon ce qui manque
- Créneaux indisponibles : `12:00` et `13:00` (hardcodés)

### `ConfirmationPage`
- Référence générée aléatoirement : `HLY-XXXXXX`
- Acompte = **25%** du prix total (arrondi)
- Simulation paiement : spinner 2.2s → navigation `/success`
- Passer la `ref` dans les query params de `/success`

### `SuccessPage`
- Animation fade-up **étagée** (delays : 0ms, 120ms, 180ms, 250ms, 380ms, 480ms)
- Section "Prochaines étapes" (3 items)
- Pas de BottomNav (configuré dans `App.tsx`)

### `ReservationsPage`
- Tab "À venir" : bookings dont `date >= aujourd'hui` ET status ≠ `cancelled`
- Tab "Passées" : bookings dont `date < aujourd'hui` OU status = `cancelled`
- Bannière J-N : uniquement sur "À venir", pour le prochain RDV
- Bouton "Réserver à nouveau" sur les bookings passés

### `ProfilePage`
- Mode édition **inline** (pas de page séparée) — toggle au clic sur le crayon
- Carte fidélité : fond sombre (#1A0E00) — **exception au thème blanc**
- Barre de progression vers le tier Platinum (500pts)

---

## App.tsx — Configuration

```tsx
// Pages sans BottomNav
const HIDE_NAV_PATHS = ['/confirmation', '/success']
```

Ne pas modifier cette liste sans raison valable.
