# 01 — Vue d'ensemble du projet

## Contexte

**Hairly** est un POC (Proof of Concept) d'application mobile-first permettant à des femmes de trouver et réserver une coiffeuse à domicile. L'expérience est inspirée d'Airbnb, Uber et Treatwell.

> ⚠️ C'est un POC uniquement — aucun backend, aucune authentification réelle, paiement simulé.

---

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.x | Typage statique |
| Vite | 8.x | Build tool & dev server |
| Tailwind CSS | v4 (via `@tailwindcss/vite`) | Utilitaires CSS |
| React Router | v7 | Navigation SPA |
| Inter | Google Fonts | Police principale |

## Structure des dossiers

```
pocHairstyle/
├── CLAUDE.md                  ← Règles lues par Claude Code
├── rules/                     ← Règles détaillées du projet
└── hairstyle-app/
    ├── index.html             ← Charge Inter + métadonnées fr
    ├── vite.config.ts
    ├── src/
    │   ├── index.css          ← Tokens CSS globaux + Tailwind
    │   ├── App.tsx            ← Router principal
    │   ├── main.tsx
    │   ├── components/        ← Composants réutilisables
    │   │   ├── Header.tsx
    │   │   ├── BottomNav.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── CategoryCarousel.tsx
    │   │   ├── HairstyleCarousel.tsx
    │   │   ├── HairstylistCard.tsx
    │   │   └── PromoBanner.tsx
    │   ├── pages/             ← Une page = un fichier
    │   │   ├── HomePage.tsx
    │   │   ├── HairstylistListPage.tsx
    │   │   ├── HairstyleListPage.tsx
    │   │   ├── HairstylistProfilePage.tsx
    │   │   ├── ServicePage.tsx
    │   │   ├── BookingPage.tsx
    │   │   ├── ConfirmationPage.tsx
    │   │   ├── SuccessPage.tsx
    │   │   ├── ReservationsPage.tsx
    │   │   └── ProfilePage.tsx
    │   └── data/              ← Données mockées JSON
    │       ├── hairstylists.json
    │       ├── hairstyles.json
    │       ├── services.json
    │       ├── bookings.json
    │       └── reviews.json
```

## Parcours utilisateur principal

```
HomePage
  → HairstylistListPage    (liste filtrée)
  → HairstylistProfilePage (profil + onglets)
  → ServicePage            (détail service)
  → BookingPage            (date + horaire + adresse)
  → ConfirmationPage       (récap + acompte)
  → SuccessPage            (confirmation animée)
```

## Contraintes projet

- **Mobile-first** : `max-width: 430px`, centré dans `#root`
- **Pas de Redux** : état local `useState` uniquement
- **Pas d'API** : toutes les données viennent des fichiers JSON
- **Paiement simulé** : spinner 2.2s puis redirection vers SuccessPage
- **Branche active** : `claude/hairstylist-booking-poc-PsjH7`
