# Kaleidoscope UI

The frontend for **Kaleidoscope** — a single React SPA that serves multiple tenant sites
(andrewslai.com, caheriaguilar.com, sahiltalkingcents.com, kaleidoscope.pub). The same bundle is
served everywhere; the backend (`../kaleidoscope`, a Clojure CMS) inspects the HTTP `Host` header to
decide which tenant's data to serve. Static chrome (`/static/*`, `/favicon.ico`) is shared across
all tenants from one store, not resolved by Host — see "Build → deploy pipeline" below. This repo
builds and deploys only the client; it does not run the API.

---

## Stack

- **React 19 + TypeScript 6 + Vite 8** — SPA, ES modules, `@` aliased to `src/`.
- **MUI 9** (`@mui/material`, icons, x-data-grid) for UI; **Emotion** for styling.
- **Auth0** (`@auth0/auth0-react`) — shares the backend's dev tenant (`dev-722l4eivlaenj2h1`).
- **TanStack Query** for server state; **Zustand** for client/UI state. Don't hand-roll either.
- **React Router 7** for routing.
- **TipTap** rich-text editor (article editor).
- **Bugsnag** for error reporting.
- **Storybook 8**, **Vitest** (unit), **Playwright** (e2e), **MSW** (API mocking).
- Theming via `@adobe/leonardo-contrast-colors` — see `src/theme/`.

---

## Commands

Node **22** (`.nvmrc`); `npm` with `legacy-peer-deps=true` + `engine-strict=true` (`.npmrc`) — install
with `npm ci`.

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server; proxies `/api` → backend (see below) |
| `npm run build` | Production build → `resources/kaleidoscope.client/static/dist/` |
| `npm run preview` | Serve the built bundle locally |
| `npm run deploy` | `npm version patch`, then sync the built bundle to `s3://kaleidoscope.client` |
| `npm test` | Vitest unit suite (jsdom) |
| `npm run test:watch` / `test:coverage` | Watch / coverage variants |
| `npm run test:e2e` | Playwright end-to-end suite (`e2e/`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` / `lint:fix` | ESLint over `src` |
| `npm run format` / `format:check` | Prettier over `src` |
| `npm run ci` | `typecheck && lint && test` — run this before pushing |
| `npm run storybook` / `build-storybook` | Component workbench |

---

## Running locally

```bash
npm ci
npm run dev          # this repo
```

In `../kaleidoscope`, run the backend separately (`task run`). The dev server proxies `/api/*` to the
backend, **stripping the `/api` prefix** and rewriting the `Host` header to `andrewslai.com.localhost`
so the backend's multi-tenant routing resolves to the andrewslai tenant. The proxy target is set in
`vite.config.ts` (`server.proxy`).

Env vars are Vite `VITE_*` values in `.env.development` / `.env.production` (`.env.production.example`
is the template):

| Variable | Notes |
|---|---|
| `VITE_API_BASE_URL` | `/api` in dev (proxied); empty in prod (same-origin) |
| `VITE_AUTH0_DOMAIN` / `_CLIENT_ID` / `_AUDIENCE` | Shared Auth0 dev tenant with the backend |
| `VITE_BUGSNAG_API_KEY` | Error reporting; blank locally |

---

## Build → deploy pipeline

`vite build` writes **only** `index.html` + hashed `assets/*` to
`resources/kaleidoscope.client/static/dist/` (`emptyOutDir: true`, `copyPublicDir: false`). That
bundle — the SPA shell — is the single artifact served for **every** tenant; the backend hardcodes
`/` and `static/*` to the shared `kaleidoscope.client` S3 bucket regardless of Host.

Static site chrome (images, CSS, favicon) lives under `resources/kaleidoscope.client/static/` —
the single canonical source for **all** tenants (the per-tenant `andrewslai.com`,
`caheriaguilar.com`, `sahiltalkingcents.com`, and `kaleidoscope.pub` asset folders and their deploy
scripts were retired now that assets aren't multi-tenant). It sits alongside the `dist/` build
output in the same folder. `deploy-kaleidoscope-client` (prod, `npm run deploy`) and
`deploy-ephemeral` (ephemeral envs) both sync it into the shared `kaleidoscope.client` store
alongside the SPA bundle (excluding `dist/` and `js/`); it is **not** produced by `vite build`.

---

## Code layout

```
src/
  api/         Typed API clients, one file per domain (articles, agents, groups, images, payments).
               All backend calls go through here — never fetch inline in a component.
  auth/        Auth0 provider + useAuth() hook.
  components/  Feature-grouped UI (agents, article, editor, workflows, tasks, projects, layout, …).
  pages/       Route-level page components.
  store/       Zustand stores (editorStore, themeStore, uiStore).
  theme/       Design tokens + Leonardo contrast config.
  types/       Shared TS types mirroring backend domain (article, agent, project, workflow, tasks, …).
  data/        Static data (skills, timeline).
  utils/       Small helpers (url).
  test/        Vitest setup, MSW server, fixtures, mockEditor.
e2e/           Playwright specs.
resources/     Shared static chrome + Vite build output, both under kaleidoscope.client/static/.
```

The domain types under `src/types/` (projects, workflows, tasks, agents, articles) mirror the
backend's AI-workflow and CMS data model — keep them in sync with `../kaleidoscope`'s API.

---

## Testing

- **Unit**: Vitest + Testing Library + jsdom, setup in `src/test/setup.ts`, API mocked with MSW
  (`src/test/server.ts`). Tests are **co-located** as `*.test.ts` / `*.test.tsx` next to source.
- **E2E**: Playwright specs in `e2e/`.
- **Every feature needs a test** (unit or e2e) — this repo mirrors the backend's testing discipline.

---

## Conventions

- TypeScript throughout; import from `@/…` (aliased to `src/`).
- Server state → TanStack Query; client/UI state → Zustand. Don't mix or reinvent.
- API access only through `src/api/*` typed clients.
- Auth only through `useAuth()` — don't call the Auth0 SDK directly in components.
- Theming through `src/theme` tokens (Leonardo contrast), not hardcoded colors.
- Run `npm run ci` (typecheck + lint + test) before pushing.

---

## Sharp edges

1. **`vite build` empties the output dir** (`emptyOutDir`) and **does not copy `publicDir`**
   (`copyPublicDir: false`) — the shared static chrome is deployed by `deploy-kaleidoscope-client` /
   `deploy-ephemeral`, not the build. `publicDir` (`resources/kaleidoscope.client`) is the *parent*
   of `outDir` (`.../static/dist`); `copyPublicDir: false` is what keeps the chrome and the nested
   build output from stepping on each other.
2. **`npm run deploy` mutates git** — it runs `npm version patch`, bumping and committing the version.
3. **Install quirks**: `legacy-peer-deps=true` + `engine-strict=true` in `.npmrc`; use Node 22.
4. The dev API proxy rewrites the `Host` header to `andrewslai.com.localhost` — other tenants aren't
   reachable via the default dev proxy without changing `vite.config.ts`.
```
