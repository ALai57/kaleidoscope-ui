# Recipes → Prism Redesign — Plan Overview

This initiative is split into **three sequenced, independently-testable plans**. Build them
in order; each produces working, shippable software on its own.

| # | Plan | Repo | Depends on | Deliverable |
|---|------|------|-----------|-------------|
| 1 | [Backend rename-URL support](2026-07-13-recipes-prism-01-backend-rename-url.md) | `../kaleidoscope` (Clojure) | — | `PUT /recipes/:slug` accepts a new `recipe-url`; slug collisions return 409 |
| 2 | [Prism primitives + preset surfaces](2026-07-13-recipes-prism-02-prism-primitives.md) | `kaleidoscope-ui` | — | Token-driven, framework-agnostic `Card / Chip / Button / IconButton / Menu / Dialog` primitives; Prism dark surfaces match the design artifact |
| 3 | [Recipes as first adopter](2026-07-13-recipes-prism-03-recipes-adopter.md) | `kaleidoscope-ui` | 1 + 2 | `RecipesPage` rebuilt with Prism primitives; per-recipe **Rename URL** and **Delete** via a kebab overflow menu |

## Why this split

- **Plan 1** is a self-contained Clojure change with its own test suite (`embedded-pg`). Rename-URL
  cannot work end-to-end without it, and it has no frontend coupling.
- **Plan 2** establishes the reusable Prism layer the whole app will migrate onto (the token
  system already ships a `prism` preset — see `src/theme/tokens.ts`). It is verifiable in isolation
  via Storybook + unit tests, with zero page changes.
- **Plan 3** is the first consumer: it wires Plans 1 and 2 together on one real screen.

## Reference design

Approved mockup (the "Prism" system): the artifact rendered from
`scratchpad/recipes-prism.html` — https://claude.ai/code/artifact/abb5d15e-e113-4484-b3af-ce7149ab1ef7
Prism design tokens of record: the "Prism — Kaleidoscope Component Library" artifact
(https://claude.ai/code/artifact/b2b118d1-d9fd-4ff7-b574-59e8bf1fc4e2).

## What already exists (do NOT rebuild)

- `deleteRecipe(slug, token)` — `src/api/recipes.ts:52`. Delete is already wired UI-less; Plan 3 only
  adds the confirm dialog + mutation.
- Backend `DELETE /recipes/:slug` — `../kaleidoscope/src/kaleidoscope/http_api/recipes.clj:170`.
- The `prism` **preset** (radii `6/10/14`, spring-overshoot motion, mono heading voice, cyan seed) —
  `src/theme/tokens.ts` `PRESETS.prism`. Plan 2 tunes only the dark **surface/ink** colors to match
  the artifact; it does not create the preset.
- The preset switcher `useSelectPreset()` — `src/theme/useSelectPreset.ts`.
