# Hairly — Règles du projet

Ce fichier est lu automatiquement par Claude Code à chaque session.
Les règles détaillées sont dans le dossier [`rules/`](./rules/).

## Résumé rapide

- **Stack** : React 19 + TypeScript + Vite + Tailwind CSS + React Router
- **App** : `hairstyle-app/` — POC mobile-first (max-width 430px)
- **Thème** : Fond blanc `#FFFFFF` · Texte noir `#1A1A1A` · Boutons dorés `#C9A84C`
- **Police** : Inter (Google Fonts)
- **Données** : 100% mockées (JSON dans `src/data/`) — aucun backend
- **Branche de dev** : `claude/hairstylist-booking-poc-PsjH7`

## Règles critiques

1. **Pas de backend** — tout est simulé côté client
2. **Mobile-first** — max-width 430px, tester en vue mobile
3. **Inline styles** pour les valeurs thématiques via les CSS tokens (ex: `var(--gold)`)
4. **Jamais de `#0a0a0a`** ni couleurs sombres — le thème est blanc/noir/or
5. **Police Inter** sur tous les textes via `fontFamily: 'Inter'`
6. **Pas de Redux** — `useState` uniquement
7. **Données mockées** — modifier les JSON dans `src/data/`, jamais d'API call réel

## Références

| Fichier | Contenu |
|---|---|
| [`rules/01-overview.md`](./rules/01-overview.md) | Architecture & stack technique |
| [`rules/02-design-system.md`](./rules/02-design-system.md) | Couleurs, typographie, espacements |
| [`rules/03-composants.md`](./rules/03-composants.md) | Règles par composant |
| [`rules/04-pages.md`](./rules/04-pages.md) | Structure et responsabilités des pages |
| [`rules/05-donnees-mock.md`](./rules/05-donnees-mock.md) | Schémas des données JSON |
| [`rules/06-conventions-code.md`](./rules/06-conventions-code.md) | Style de code, nommage, patterns |
| [`rules/07-ux-guidelines.md`](./rules/07-ux-guidelines.md) | Principes UX/UI à respecter |
