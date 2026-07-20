# Kaleidoscope UI

The frontend for **Kaleidoscope** — a single React SPA that serves multiple tenant sites
(andrewslai.com, caheriaguilar.com, sahiltalkingcents.com, kaleidoscope.pub). The same bundle is
served everywhere; the backend (a separate Clojure CMS repo) inspects the HTTP `Host` header to
decide which tenant's data to serve. Static chrome (`/static/*`, `/favicon.ico`) is shared across
all tenants from one store, not resolved by Host — see "Build → deploy" below. This repo builds
and deploys only the client; it does not run the API.

## Stack

- React 18 + TypeScript + Vite — SPA, ES modules, `@` aliased to `src/`.
- MUI 6 (`@mui/material`, icons, x-data-grid) for UI; Emotion for styling.
- Auth0 (`@auth0/auth0-react`) for authentication.
- TanStack Query for server state; Zustand for client/UI state.
- React Router 7 for routing.
- TipTap + Slate rich-text editors (article editor).
- Bugsnag for error reporting.
- Storybook, Vitest (unit), Playwright (e2e), MSW (API mocking).
- Theming via `@adobe/leonardo-contrast-colors` — see `src/theme/`.

## Requirements

Node **22** (`.nvmrc`). Install with `npm ci` (`.npmrc` sets `legacy-peer-deps=true` and
`engine-strict=true`).

## Running locally

```sh
npm ci
npm run dev
```

The dev server proxies `/api/*` requests to the backend, stripping the `/api` prefix and
rewriting the `Host` header so the backend's multi-tenant routing resolves to a specific tenant
(see `server.proxy` in `vite.config.ts`). Run the backend separately alongside this.

Configure `.env.development` with the `VITE_*` variables described below (`.env.production.example`
is a template for the production equivalents).

| Variable | Notes |
|---|---|
| `VITE_API_BASE_URL` | `/api` in dev (proxied); empty in prod (same-origin) |
| `VITE_AUTH0_DOMAIN` / `_CLIENT_ID` / `_AUDIENCE` | Auth0 tenant shared with the backend |
| `VITE_BUGSNAG_API_KEY` | Error reporting; blank locally |

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `resources/kaleidoscope.client/static/dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run deploy` | Bumps the package version and syncs the built bundle to `s3://kaleidoscope.client` |
| `npm test` | Vitest unit suite (jsdom) |
| `npm run test:watch` / `test:coverage` | Watch / coverage variants |
| `npm run test:e2e` | Playwright end-to-end suite (`e2e/`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` / `lint:fix` | ESLint over `src` |
| `npm run format` / `format:check` | Prettier over `src` |
| `npm run ci` | `typecheck && lint && test` — run before pushing |
| `npm run storybook` / `build-storybook` | Component workbench |

## Build → deploy

`vite build` writes only `index.html` and hashed `assets/*` to
`resources/kaleidoscope.client/static/dist/`, emptying the output directory and not copying
`public/`. That bundle is the single SPA shell served for every tenant.

Static site chrome (images, CSS, favicon) lives under `resources/kaleidoscope.client/static/` —
the single canonical source for all tenants, alongside the `dist/` build output — and is deployed
separately via the scripts in `scripts/deployment/`:

- `deploy-kaleidoscope-client` — the SPA bundle + shared static chrome, to `kaleidoscope.client` (`npm run deploy`)
- `deploy-ephemeral` — SPA bundle + shared static chrome, to an ephemeral env's S3 prefix (`npm run ephemeral:deploy`)

The formerly per-tenant deploy scripts and resource folders (one per hostname, including the
`kaleidoscope.pub` bucket) have been retired — `resources/kaleidoscope.client/static/` is now the
single canonical source shipped to every tenant.

See `scripts/deployment/deployment.md` for details.

## Code layout

```
src/
  api/         Typed API clients, one file per domain (articles, agents, groups, images, payments).
  auth/        Auth0 provider + useAuth() hook.
  components/  Feature-grouped UI (agents, article, editor, workflows, tasks, projects, layout, …).
  pages/       Route-level page components.
  store/       Zustand stores (editorStore, themeStore, uiStore).
  theme/       Design tokens + Leonardo contrast config.
  types/       Shared TS types mirroring the backend domain model.
  data/        Static data (skills, timeline).
  utils/       Small helpers.
  test/        Vitest setup, MSW server, fixtures.
e2e/           Playwright specs.
resources/     Per-tenant static assets + Vite build output.
```

## Testing

- **Unit**: Vitest + Testing Library + jsdom, setup in `src/test/setup.ts`, API mocked with MSW
  (`src/test/server.ts`). Tests are co-located as `*.test.ts` / `*.test.tsx` next to source.
- **E2E**: Playwright specs in `e2e/`.

Run `npm run ci` before pushing.

## Conventions

- Import from `@/…` (aliased to `src/`).
- Server state → TanStack Query; client/UI state → Zustand.
- API access only through `src/api/*` typed clients.
- Auth only through `useAuth()` — don't call the Auth0 SDK directly in components.
- Theming through `src/theme` tokens, not hardcoded colors.

See `CLAUDE.md` for more detail, including known sharp edges in the build/deploy pipeline.
