# TypeScript Migration Plan

## Overview

This document outlines a phased migration of kaleidoscope-ui from its current ClojureScript + React hybrid architecture to an exclusively TypeScript/React codebase.

The current app is ~98% ClojureScript using [re-frame](https://github.com/day8/re-frame) (FRP state management) and [Reagent](https://reagent-project.github.io/) (React wrapper), built with [Shadow-CLJS](https://shadow-cljs.github.io/docs/UsersGuide.html). A small component library (`src/kaleidoscope-js/`) already exists in TypeScript/JSX and is consumed by the main app via interop.

This migration is effectively a **full rewrite** of the application layer. The goal is not to do a line-by-line translation of ClojureScript idioms — it's to rebuild the app cleanly in idiomatic TypeScript/React while preserving all user-facing functionality.

---

## Goals

- Full TypeScript coverage with strict mode enabled
- Feature parity with the existing app (small behavioral differences are acceptable)
- Clean architecture with clear separation of concerns
- Comprehensive tests at the unit, integration, and E2E levels
- Improved developer experience (fast builds, good tooling, no JVM dependency)
- Improve areas of the architecture where the CLJS implementation had rough edges

## Non-Goals

- Preserving ClojureScript idioms in TypeScript (write idiomatic TS/React)
- Supporting the `kaleidoscope.pub` build as a separate concern (migrate together)
- Maintaining the `kaleidoscope-js` npm package interop layer (delete it once migration is complete)

---

## Architecture Decisions

### Build Tool: Shadow-CLJS → Vite

Shadow-CLJS is tightly coupled to ClojureScript. Replace it with **Vite**, which has native TypeScript support, excellent HMR, fast builds, and straightforward code splitting via dynamic `import()`.

### State Management: re-frame → Zustand + TanStack Query

re-frame is a disciplined unidirectional FRP architecture. In TypeScript/React, split those concerns:

- **[Zustand](https://github.com/pmndrs/zustand)** for ephemeral UI state (active panel, modal state, notifications, theme, editor metadata). Zustand is lightweight, hooks-based, and requires minimal boilerplate compared to Redux. This replaces re-frame's `app-db` + `reg-event-db` for client-side state.
- **[TanStack Query](https://tanstack.com/query/latest)** (React Query) for server state (articles, images, groups, user profile, payment details). This replaces the `reg-event-fx` + `http-xhrio` + success/failure event pattern used throughout the CLJS events. TanStack Query handles caching, refetching, loading/error states, and optimistic updates natively.

This is a deliberate architectural improvement over the current approach, where server and UI state are mixed in a single `app-db` atom. The split gives us better cache invalidation, eliminates most of the boilerplate in `events/`, and makes data fetching logic much more testable.

### Routing: secretary + reitit → React Router v6

The current routing is split between `secretary` (hash-based) and `reitit` (partially initialized but unused). Replace both with **React Router v6**, which has excellent TypeScript support and a declarative, component-based routing model.

### API Client: cljs-ajax → fetch with a typed wrapper

The `kaleidoscope.cljs` client already defines all API shapes cleanly. Rewrite it as a typed `api/` module using the native `fetch` API with a thin wrapper for auth headers and JSON deserialization. No library needed.

### Auth: Preserve Keycloak, add a typed React hook

`keycloak-js` is already a JavaScript library — wrap it in a `useKeycloak` hook and a `KeycloakProvider` context. The token refresh logic, SSO check, and login/logout flows map directly from the existing CLJS implementation.

### Styling: MUI v5 → v6

The existing component library uses MUI 5 with Emotion. Since the theming system is being rebuilt from scratch in TypeScript anyway, upgrade to **MUI v6** during Phase 3 rather than after the migration. The cost of upgrading mid-migration is lower than a separate post-migration upgrade pass. MUI v6 brings meaningfully better TypeScript support, a revised `createTheme` API that fits the hue-based theming model here, and improved tree-shaking.

### Testing: Vitest + React Testing Library + MSW + Playwright

- **[Vitest](https://vitest.dev/)** for unit and integration tests. It is Vite-native, Jest-compatible API, and orders of magnitude faster than Jest with Babel.
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** for component tests that reflect how users interact with the UI (not implementation details).
- **[MSW (Mock Service Worker)](https://mswjs.io/)** for mocking API calls at the network level in both tests and development. This is significantly more reliable than mocking `fetch` directly.
- **[Playwright](https://playwright.dev/)** for E2E tests, replacing Cypress. Playwright has better parallelization, runs across all browsers without a cloud subscription, has a superior network interception API, and has a built-in codegen tool for recording interactions. The current Cypress setup is entirely scaffolded example tests (they test the Cypress documentation site, not this app), so there is no migration cost — delete the `cypress/e2e/` directory and start fresh with Playwright.

### Rich Text Editor: Slate/Plate → TipTap

The current editor uses `@udecode/plate` v20 (a high-level abstraction over Slate) and totals ~600 LOC — but approximately 350 of those lines are plugin configuration and framework workarounds. Most tellingly, the implementation suppresses `console.error` globally to hide hydration warnings caused by Plate's `serializeHtml` using `ReactDOMServer` incorrectly on the client. That is a red flag worth removing, not working around.

Replace with **[TipTap](https://tiptap.dev/)**, which provides the same feature set (rich formatting, code blocks with syntax highlighting, images, links, autoformat, custom elements) with a fraction of the configuration:

```typescript
const editor = useEditor({
  extensions: [
    StarterKit,          // paragraph, heading, bold, italic, lists, blockquote, code
    CodeBlockLowlight.configure({ lowlight }),  // syntax highlighting via lowlight/highlight.js
    Link,
    Image,
    Underline,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Color,
    Highlight,
  ],
});
```

TipTap serializes to and from HTML natively, has first-class TypeScript support, has a clean extension API for the image-browser modal integration, and does not require suppressing framework warnings. It also uses ProseMirror under the hood (battle-tested) rather than Slate's less mature transform model.

The primary risk is that the HTML output format will differ from Plate's. Mitigate by snapshotting the HTML of several representative articles before the migration and using those as acceptance criteria for the TipTap serialization.

---

## Target Folder Structure

```
src/
├── api/                      # Typed API client functions (replaces clients/kaleidoscope.cljs)
│   ├── articles.ts
│   ├── images.ts
│   ├── groups.ts
│   ├── payments.ts
│   ├── themes.ts
│   ├── users.ts
│   └── client.ts             # Base fetch wrapper with auth
├── auth/                     # Keycloak integration
│   ├── KeycloakProvider.tsx
│   └── useKeycloak.ts
├── components/               # Shared, reusable UI components
│   ├── article/
│   ├── colors/
│   ├── images/
│   ├── layout/
│   └── editor/               # TipTap editor components
├── pages/                    # Route-level page components
│   ├── ArticleEditorPage.tsx
│   ├── ArticleManagerPage.tsx
│   ├── ArticlePage.tsx
│   ├── GroupsPage.tsx
│   ├── HomePage.tsx
│   ├── ImageManagerPage.tsx
│   ├── SignUpPage.tsx
│   ├── UIManagerPage.tsx
│   └── AdminPage.tsx
├── store/                    # Zustand stores for UI state
│   ├── uiStore.ts            # active panel, notification type, modal state
│   ├── editorStore.ts        # editor-specific state
│   └── themeStore.ts         # theme config
├── types/                    # Shared TypeScript interfaces and types
│   ├── article.ts
│   ├── image.ts
│   ├── user.ts
│   ├── group.ts
│   └── theme.ts
├── hooks/                    # Shared custom hooks
│   └── useNotification.ts
├── theme/                    # MUI theme setup
│   └── index.ts
├── utils/                    # Pure utility functions
│   └── url.ts
├── App.tsx                   # Root component with router + providers
└── main.tsx                  # Entry point (replaces core.cljs)
```

---

## Type System Design

Start with the domain types that the API already exposes. These directly reflect the shapes coming back from the backend.

```typescript
// types/article.ts
export interface Article {
  article_id: string;
  article_url: string;
  article_title: string;
  article_tags: string;
  public_visibility: boolean;
  created_at: string;
}

export interface ArticleBranch {
  branch_id: string;
  branch_name: string;
  article_id: string;
  article_url: string;
}

export interface ArticleVersion {
  version_id: string;
  branch_id: string;
  content: string;
  title: string;
  created_at: string;
}

// types/image.ts
export interface ImageVersion {
  src: string;
  width?: number;
  height?: number;
}

export interface Image {
  name: string;
  title: string;
  description: string;
  creator: string;
  created_at: string;
  versions: {
    raw?: ImageVersion;
    thumbnail?: ImageVersion;
    [key: string]: ImageVersion | undefined;
  };
}

// types/user.ts
export interface UserProfile {
  sub: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
}

// types/group.ts
export interface Group {
  group_id: string;
  display_name: string;
}

export interface GroupMember {
  member_id: string;
  group_id: string;
  email: string;
}
```

TipTap's type system is built into the extension model — no module augmentation needed. Custom extensions are typed through TipTap's `Extension`, `Node`, and `Mark` generics. The main type work is defining the attributes for custom nodes:

```typescript
// Typed attributes for the Image node extension
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    kaleidoscopeImage: {
      setImage: (attrs: { src: string; alt?: string; title?: string }) => ReturnType;
    };
  }
}
```

---

## Opportunistic Improvements

These are changes that are not strictly required for feature parity but are low-effort relative to their impact and are natural to do during a rewrite rather than retrofitting later.

### 1. Environment variables: closure-defines → Vite `.env` files

The current build uses Closure compiler `goog-define` to embed configuration (Keycloak URL, realm, client ID) at compile time. This means **every environment requires a separate build artifact**, and changing any config value requires a full recompile.

Vite supports `.env` files out of the box with zero configuration:

```
# .env.development
VITE_AUTH_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=test
VITE_KEYCLOAK_CLIENT_ID=test-login

# .env.production
VITE_AUTH_URL=https://keycloak.andrewslai.com
VITE_KEYCLOAK_REALM=andrewslai
VITE_KEYCLOAK_CLIENT_ID=andrewslai
```

```typescript
// src/auth/config.ts
export const authConfig = {
  url:      import.meta.env.VITE_AUTH_URL,
  realm:    import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
} as const;
```

This enables a single build artifact deployable to any environment by injecting environment variables at runtime, which is standard practice in containerized deployments. Add `.env*.local` to `.gitignore` and commit `.env.development` and `.env.production.example` as documentation.

### 2. Remove unused Three.js packages

The packages `three`, `@react-three/fiber`, `@react-three/drei`, and `@types/three` are installed but have zero usage anywhere in the codebase. The color wheel component uses plain CSS `conic-gradient` and mouse event math — no Three.js. Remove all four packages. This saves roughly 300KB from the dependency tree and eliminates a significant source of spurious security audit noise.

### 3. MUI v6 upgrade (do during migration, not after)

Since the MUI theme is being rewritten in TypeScript anyway (Phase 3), upgrade to MUI v6 at the same time rather than scheduling it as a separate pass. The `createTheme` API in v6 has better inference for the palette extensions this app uses (the `accent` color key), tree-shaking improved, and the Grid component gained a simpler v2 API that reduces the markup needed in page layouts. The migration guide is mechanical and well-documented.

### 4. Dark mode

The existing theme is built around a single HSL hue value that derives primary, secondary, and tertiary colors mathematically. Extending this to support dark mode is straightforward — MUI v6's `colorSchemes` API handles light/dark switching automatically, and the hue-based palette derivation just needs a brightness adjustment for the dark variant:

```typescript
createTheme({
  colorSchemes: {
    light: { palette: makePalette(params) },
    dark:  { palette: makePalette({ ...params, lightness: 100 - params.lightness }) },
  },
});
```

Add a toggle button to the existing navbar. This is roughly a day of work and meaningfully improves the app for users who prefer dark mode.

### 5. Decompose `HomePage` (525 LOC)

The home page is a 525-line file containing hardcoded resume/timeline data, responsive layout logic, and component definitions all mixed together. During Phase 5 migration, extract:

- `src/data/timeline.ts` — the hardcoded event/career data as a typed constant array
- `<Timeline>` and `<TimelineEntry>` components in `src/components/layout/`
- `<SkillsSection>`, `<BioSection>`, `<PortfolioSection>` as separate components

The resulting `HomePage.tsx` should be ~80 lines: a page layout composing those components with data from TanStack Query.

### 6. Playwright for E2E tests (replace Cypress scaffolding)

The `cypress/e2e/` directory contains only Cypress's own example tests — they test `example.cypress.io`, not this application. There are zero real tests to preserve. Delete the directory.

Use **Playwright** instead of writing new Cypress tests. Playwright parallelizes across browsers without a cloud subscription, has a better network interception API (important for mocking Keycloak redirects), and integrates naturally into the same Vitest/npm scripts workflow. The Playwright VS Code extension also includes a test recorder, which helps write tests quickly against a running dev server.

### 7. Storybook 7 → 8 with Vite builder

The existing Storybook setup uses `@storybook/react-webpack5` and points at **compiled JavaScript artifacts** in `resources/` as its stories — not source files. This means Storybook HMR is broken by default (you have to recompile the CLJS stories separately before Storybook picks up changes).

Upgrading to Storybook 8 with the Vite builder and writing `.stories.tsx` files co-located with components gives instant HMR, TypeScript-typed args, and no separate compilation step. The `storybook-static/` directory (51MB) should also be removed from the repository and generated as a CI artifact instead.

### 8. Dependency pruning

Remove packages that will be unused after the migration:

| Package | Why it can go |
|---|---|
| `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` | Never actually used in the codebase |
| `react-cool-inview` | Not found in any source file |
| `lazysizes` | No evidence of active use |
| `pretty` | Used only in Slate serialization debugging; not needed with TipTap |
| `@udecode/plate` and all `@udecode/*` packages | Replaced by TipTap |
| `slate`, `slate-react`, `slate-history`, `slate-hyperscript` | Replaced by TipTap |
| All `@babel/*` packages | Replaced by Vite + tsc |
| `babel-loader` | Replaced by Vite |
| `webpack`, `webpack-cli` | Replaced by Vite |

Post-migration the total package count should drop by roughly 40 packages.

---

## Migration Phases

Each phase ends in a shippable state. The app should remain fully functional at the end of every phase.

---

### Phase 0: Foundation (Week 1)

Set up the TypeScript project infrastructure before writing any application code.

**Tasks:**

1. **Dependency audit and pruning** — before writing any new code, remove unused packages: `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `react-cool-inview`, `lazysizes`, `pretty`. Verify nothing breaks (they're unused, but confirm with a CLJS build). This keeps the starting point clean.

2. **Init Vite project alongside existing app** — create `src/main.tsx` and `index.html` targeting the same `#app` root as the existing app. Both can coexist during migration since they target the same HTML element; switching between them is a one-line change in `index.html`.

3. **TypeScript configuration** — `tsconfig.json` at repo root:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "lib": ["ES2020", "DOM", "DOM.Iterable"],
       "module": "ESNext",
       "moduleResolution": "bundler",
       "jsx": "react-jsx",
       "strict": true,
       "noUncheckedIndexedAccess": true,
       "exactOptionalPropertyTypes": true,
       "skipLibCheck": false,
       "baseUrl": ".",
       "paths": { "@/*": ["src/*"] }
     }
   }
   ```
   Start with `strict: true` from day one. It is far easier than retrofitting strictness onto a permissive codebase.

3. **ESLint + Prettier** — install `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, and `prettier`. Use the recommended configs. Add `lint` and `format` scripts to `package.json`.

4. **Vitest + React Testing Library + MSW** — install and configure. Create `src/test/setup.ts` for global test setup (jsdom, RTL matchers). Create a `src/test/server.ts` with an MSW service worker for API mocking.

5. **Update Storybook** — migrate `.storybook/` to use the Vite builder. Existing stories still work; just update the config.

6. **CI checks** — add `tsc --noEmit`, `eslint`, and `vitest run` to the build pipeline.

**Deliverable:** A Vite + TypeScript project that compiles and passes CI. No application code yet.

---

### Phase 1: Types, API Client, and Auth (Week 2)

Establish the data layer before building any UI.

**Tasks:**

1. **Define all domain types** in `src/types/`. Work from the existing `kaleidoscope.cljs` client and the `db.cljs` default state shape — these are the canonical contracts.

2. **Write the API client** in `src/api/`. One file per resource domain. Use a shared `client.ts` with a `request()` helper that:
   - Attaches `Authorization: Bearer <token>` when a token is available
   - Parses JSON responses
   - Throws typed errors for non-2xx responses
   - Returns typed response shapes

   The `title->url` utility in `kaleidoscope.cljs` should move to `src/utils/url.ts` with unit tests.

3. **Keycloak auth** in `src/auth/`:
   - `KeycloakProvider.tsx` — initializes the Keycloak instance, handles `check-sso`, manages the `onTokenExpired` refresh logic. Mirrors `keycloak.cljs` but as a React context.
   - `useKeycloak()` — exposes `{ keycloak, isAuthenticated, login, logout, token, userProfile }`.

4. **Write tests** for `src/api/` and `src/utils/`. Use MSW handlers to mock all API endpoints. This gives us a regression baseline before any UI is built.

**Deliverable:** Full typed API layer with test coverage. Can be imported by any component.

---

### Phase 2: App Shell (Week 3)

Build the routing and global state infrastructure.

**Tasks:**

1. **React Router v6 setup** in `src/App.tsx` with routes corresponding to the existing panels in `views.cljs`:

   ```tsx
   const router = createBrowserRouter([
     { path: '/',                  element: <HomePage /> },
     { path: '/content/:slug',     element: <ArticlePage /> },
     { path: '/archive',           element: <ArticlePage archive /> },
     { path: '/manager',           element: <ManagerPage /> },
     { path: '/article-manager',   element: <ArticleManagerPage /> },
     { path: '/image-manager',     element: <ImageManagerPage /> },
     { path: '/ui-manager',        element: <UIManagerPage /> },
     { path: '/groups',            element: <GroupsPage /> },
     { path: '/editor',            element: <ArticleEditorPage /> },
     { path: '/sign-up',           element: <SignUpPage /> },
     { path: '/admin',             element: <AdminPage /> },
     { path: '/about-this-site',   element: <AboutThisSitePage /> },
   ]);
   ```

   The hash-based routing from `secretary` (`#/content/my-article`) should be preserved via a redirect in `App.tsx` that strips the `#` and pushes to the history API. This maintains backward compatibility with any shared links.

2. **Zustand stores** in `src/store/`:
   - `uiStore` — `activePanel`, `notificationType`, `modal` (replaces the UI-state parts of `app-db`)
   - `editorStore` — `editorBranchId`, `initialEditorData` (replaces editor-specific DB keys)
   - `themeStore` — `theme` config (replaces `:theme` in DB and the `ui-customization` events)

3. **MUI v6 theme** in `src/theme/index.ts` — port `theme.cljs`'s `make-theme` and `BASE-THEME` to TypeScript using MUI v6's `colorSchemes` API. Add a dark mode variant using the inverted lightness formula described in the Opportunistic Improvements section. This is the right moment to do the MUI v5 → v6 upgrade since the theme is being rewritten anyway.

4. **Global providers** in `src/main.tsx`: `QueryClientProvider`, `KeycloakProvider`, `ThemeProvider`, `RouterProvider`, `BugsnagErrorBoundary`.

5. **Loading screen component** — simple full-screen spinner used as Suspense fallback and initial load state.

**Deliverable:** App shell renders, routing works, auth initializes, all providers wired up. Page components can be empty placeholders for now.

---

### Phase 3: Shared Components (Weeks 4–5)

Migrate and type all reusable components. These are the leaves of the component tree — no data fetching, pure presentational logic.

**Components to migrate (from `kaleidoscope-js/` and `components/`):**

| Component | Source | Notes |
|-----------|--------|-------|
| `ImageCard` | `ImageCard.tsx` | Already TSX, needs proper typing |
| `FullImageCard` | `FullImageCard.tsx` | Already TSX, needs proper typing |
| `ImageThumbnail` | `ImageThumbnail.tsx` | Already TSX, needs proper typing |
| `ImageBrowser` | `ImageBrowser.tsx` | Largest existing TSX file — good types exist, clean up `any` |
| `InputTags` | `InputTags.tsx` | Replace all `any` with proper types |
| `Button` | `button.cljs` | Simple wrapper, trivial to port |
| `Slider` | `slider.cljs` | MUI Slider wrapper |
| `Modal` | `modal.cljs` | MUI Modal wrapper |
| `Snackbar` | `snackbar.cljs` | MUI Snackbar |
| `NotificationCard` | `notification_card.cljs` | |
| `NavBar` | `navbar.cljs` | |
| `SideMenu` | `side_menu.cljs` | |
| `Table` | `table.cljs` | MUI DataGrid wrapper |
| `RadioGroup` | `radio_group.cljs` | |
| `LoadingScreen` | `loading_screen.cljs` | Already done in Phase 2 |
| `ArticleCard` | `article_cards.cljs` | |
| `ColorPicker` | `colors/color_picker.cljs` | Uses `@adobe/leonardo-contrast-colors` |
| `ColorWheel` | `colors/color_wheel.cljs` | Uses Three.js / React Three Fiber |

**Approach for each component:**

1. Read the CLJS source to understand props and behavior
2. Define a `Props` interface
3. Write the component in TSX
4. Write RTL tests that cover interaction (clicks, keyboard, state changes)
5. Add a Storybook story

**Special attention:**

- `ImageBrowser.tsx` already exists but has scattered `any` types and undefined props. The `EditorPanel` and `VersionSelector` sub-components inside it should be extracted to their own files.
- The color wheel uses plain CSS gradients and mouse-event math — **not Three.js** (the Three.js packages were installed but never used and are being removed). The main typing work is the color data structures from `@adobe/leonardo-contrast-colors`.
- `InputTags` wraps MUI `Autocomplete` — type the `options`, `vals`, `onAdd`, and `onRemove` props generically so it can work with strings or objects.

**Deliverable:** Full shared component library with typed props and tests. Storybook runs against TypeScript components.

---

### Phase 4: Rich Text Editor — TipTap (Week 6)

The rich text editor is the most complex part of the app and deserves its own phase. Rather than porting the existing Slate/Plate implementation, this phase builds a fresh TipTap editor that delivers the same features without the configuration overhead or the `console.error` suppression workaround.

**Before starting:** Snapshot the HTML output of several representative articles from the running CLJS app. These become the acceptance criteria for TipTap serialization parity.

**Tasks:**

1. **Install TipTap** and configure the extension set:
   ```typescript
   // src/components/editor/extensions.ts
   import StarterKit from '@tiptap/starter-kit';
   import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
   import { common, createLowlight } from 'lowlight';
   import Link from '@tiptap/extension-link';
   import Image from '@tiptap/extension-image';
   import Underline from '@tiptap/extension-underline';
   import TextAlign from '@tiptap/extension-text-align';
   import Color from '@tiptap/extension-color';
   import Highlight from '@tiptap/extension-highlight';

   export const extensions = [
     StarterKit.configure({ codeBlock: false }),
     CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
     Link,
     Image,
     Underline,
     TextAlign.configure({ types: ['heading', 'paragraph'] }),
     Color,
     Highlight.configure({ multicolor: true }),
   ];
   ```
   This replaces ~350 lines of Plate plugin configuration.

2. **Build `<RichTextEditor>`** in `src/components/editor/RichTextEditor.tsx`. TipTap's `useEditor` hook manages the editor instance. The toolbar maps directly from the current Plate toolbar: bold, italic, underline, strikethrough, heading levels, blockquote, code block, ordered/unordered lists, alignment, links, images, indent/outdent.

3. **Image insertion** — wire the existing `ImageBrowser` component to TipTap's `Image` extension. TipTap's extension API makes this cleaner than the Plate equivalent: the `ImageBrowser` modal calls `editor.chain().focus().setImage({ src }).run()` on selection.

4. **Serialization** — TipTap serializes to and from HTML natively:
   ```typescript
   // To HTML (for saving to the API)
   const html = editor.getHTML();

   // From HTML (for loading from the API)
   editor.commands.setContent(htmlString);
   ```
   No custom serialization module needed. The `slate/serialization.cljs` and `slate/code_block_helpers.cljs` files have no equivalent — TipTap handles this.

5. **Verify against article snapshots** — load each snapshot article into the TipTap editor and confirm the rendered HTML matches the original (or is an acceptable equivalent). Any divergences here are the main migration risk and should be resolved before Phase 5.

**Deliverable:** TipTap editor renders all existing content types, image insertion works, serialization round-trips cleanly against the snapshot articles, no suppressed console errors.

---

### Phase 5: Page Components (Weeks 7–9)

Port each page. Each page composes the shared components with data fetching via TanStack Query and navigation via React Router. No business logic should live in the page components — delegate to hooks and API functions.

**Pages, ordered by complexity:**

#### Simple pages (1–2 days each)
- `HomePage` — fetches recent articles and portfolio cards, displays them
- `AboutThisSitePage` — likely static content
- `SignUpPage` — Stripe payment flow
- `AdminPage` — Keycloak login redirect

#### Medium complexity (2–3 days each)
- `ArticlePage` — fetches and renders an article by slug; handles archive view
- `GroupsPage` — CRUD for groups and group members
- `ArticleManagerPage` — list of articles with publish/visibility controls

#### Complex (3–5 days each)
- `ImageManagerPage` — file uploads (multipart form data), photo editing with `ImageBrowser`, drag-and-drop. Uses React DnD — keep the existing library but type the drag item and drop result interfaces.
- `UIManagerPage` — color customization with the color wheel, theme persistence, and dark mode toggle
- `ArticleEditorPage` — composes the TipTap editor with branch management, version loading, publishing. This is the most complex page and will take the most time. Also decompose `HomePage` here per the Opportunistic Improvements section.

**For each page:**

1. Map the existing subscriptions (`:subscribe`) to `useQuery` calls
2. Map the existing dispatches (`:dispatch`) to `useMutation` calls or Zustand store actions
3. Wire up React Router for navigation (`useNavigate`, `useParams`)
4. Write integration tests that mount the page, use MSW to mock the API, and assert on the rendered output

**Pattern example — replacing a re-frame subscription + event with TanStack Query:**

```typescript
// BEFORE (ClojureScript re-frame pattern):
// (reg-event-fx :load-all-branches ...)   → HTTP GET /branches → :load-all-branches.success
// (reg-sub :branches ...)                 → returns db.branches
// Component: @(subscribe [:branches])

// AFTER (TanStack Query):
const { data: branches, isLoading } = useQuery({
  queryKey: ['branches'],
  queryFn: () => api.branches.getAll(token),
});
```

**Deliverable:** All pages functional with real data fetching. App is at feature parity with the CLJS version.

---

### Phase 6: Testing Pass (Week 10)

Do a dedicated testing pass across the entire application before removing the CLJS app.

**Targets:**

- **Unit tests** — all pure utility functions (URL helpers, serialization, formatters) at 100% coverage
- **Component tests** — all shared components have RTL tests for: renders without errors, prop variations, user interactions (click, keyboard, form input)
- **Page integration tests** — each page has at least one test that mounts with a real router and mocked API and asserts on the primary user flow
- **Playwright E2E** — delete `cypress/e2e/` (it contains only Cypress example tests, not tests for this app) and write real Playwright tests for the critical paths:
  - Unauthenticated user views the homepage and reads an article
  - Authenticated user creates and saves an article draft
  - Authenticated user uploads an image
  - Authenticated user changes the UI theme and verifies dark mode

**Test coverage goal:** ~80% line coverage on `src/`. Focus on behavior, not coverage percentage — the percentage is a useful signal, not a target in itself.

---

### Phase 7: Cleanup and Build Optimization (Week 11)

Once the TypeScript app is at parity and the test suite passes:

1. **Switch `index.html`** to load the Vite build instead of the Shadow-CLJS output
2. **Delete** `src/kaleidoscope/` (all CLJS source)
3. **Delete** `src/kaleidoscope-js/` (the old interop package)
4. **Remove CLJS dependencies** from `package.json` and `shadow-cljs.edn` / `pom.xml`
5. **Update `package.json` scripts** — remove `shadow-cljs` build scripts, add `vite build`, `vite preview`
6. **Code splitting** — lazy-load heavy pages (as the CLJS app did with `shadow.lazy`):
   ```typescript
   const ArticleEditorPage = lazy(() => import('./pages/ArticleEditorPage'));
   const ImageManagerPage  = lazy(() => import('./pages/ImageManagerPage'));
   const UIManagerPage     = lazy(() => import('./pages/UIManagerPage'));
   ```
   Vite's Rollup-based bundler will also auto-split large vendor dependencies (TipTap/ProseMirror, Stripe) into separate chunks, which the browser can cache independently.
7. **Final type check** — run `tsc --noEmit` with zero errors

---

## Testing Strategy

### Unit Tests (Vitest)
Target pure functions and hooks. Fast, no DOM, no network.

```
src/api/       → mock fetch, test request construction and response parsing
src/utils/     → test all utility functions with edge cases
src/store/     → test Zustand store actions
src/auth/      → test token refresh logic (mock keycloak-js)
```

### Component Tests (Vitest + RTL)
Target individual components in isolation. Use `render()` from `@testing-library/react` wrapped in a test utility that provides all required context providers (QueryClient, Router, Theme).

```
src/components/ → test all shared components
```

### Integration Tests (Vitest + RTL + MSW)
Mount page-level components with a real router and MSW-mocked API. Test that the page fetches data, renders it, and responds to user interaction correctly.

```
src/pages/ → one test file per page, covering primary user flows
```

### E2E Tests (Playwright)
Run against a real running instance (or a test environment). Cover critical user paths end-to-end including auth redirects. Playwright's network interception API is used to stub the Keycloak redirect in CI so tests do not depend on a live auth server.

### What Not to Test
- MUI component rendering details (MUI tests its own components)
- Keycloak's auth protocol (trust the library)
- The exact HTML structure of rendered output (assert on semantic roles and text content instead)

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| TipTap HTML output differs from Plate's for edge-case content | Medium | Snapshot existing article HTML before starting Phase 4; use snapshots as acceptance criteria |
| Keycloak SSO silent check breaks | Low | Copy the exact init options from `keycloak.cljs`; test in staging before switching |
| Re-frame async-flow boot sequence hard to replicate | Medium | Map the `:boot` event's `async-flow` rules to a sequential set of TanStack Query `enabled` flags that gate on auth completing |
| Hash-based URLs stop working | Low | Redirect `#/path` → `/path` in `App.tsx` on initial load |
| MUI v6 breaking changes in components | Low | MUI provides a codemod for the most common v5→v6 changes; the theme API change is the main thing to watch |
| Stripe integration breaks | Low | Test payment flow in staging with Stripe test keys before switching |

---

## Bundle Size Trade-offs

### Code splitting: equivalent capability

Vite's Rollup-based bundler supports the same patterns the CLJS app uses. Dynamic `import()` with `React.lazy()` produces separate chunks just like `shadow.lazy`. Vite also automatically splits large vendor libraries (Three.js, Slate, MUI, Stripe) into separate cacheable chunks, which actually gives more granular splitting than the current Shadow-CLJS `:modules` config.

### Minification: a real trade-off

The current build uses the **Google Closure Compiler in `ADVANCED_OPTIMIZATIONS` mode**, which is qualitatively more aggressive than any standard JavaScript minifier:

| Capability | Closure ADVANCED | Vite/esbuild (default) | Vite + Terser |
|---|---|---|---|
| Local variable renaming | Yes | Yes | Yes |
| Dead code elimination | Whole-program | Per-module | Per-module |
| Property renaming | Yes | No | No |
| Cross-module inlining | Yes | No | No |

Terser (available as a Vite plugin via `vite-plugin-compression` or `build.minify: 'terser'`) is more thorough than esbuild's default minifier, but neither reaches Closure's whole-program property renaming.

**The practical impact is smaller than it sounds.** The current ClojureScript bundle includes the CLJS standard library, Reagent's React adapter layer, re-frame's scheduler and interceptor machinery, and immutable data structure primitives — all of which Closure has to optimize away. A native TypeScript/React app does not start with that overhead. In practice, production bundles for comparable React apps tend to land in a similar range once brotli compression is applied, because the Closure-compiled CLJS output and the Terser-minified TS output are both compressing well-structured, repetitive code.

If post-compression bundle size turns out to be a concern after the migration, the most impactful levers are:
- **Route-based code splitting** (already planned — Three.js and Slate are only loaded for pages that need them)
- **`@next/bundle-analyzer`** equivalent (`rollup-plugin-visualizer`) to identify unexpected large dependencies
- **`vite-plugin-compression`** to pre-generate brotli-compressed assets at build time rather than compressing on-the-fly
- As a last resort, `@ampproject/rollup-plugin-closure-compiler` exists but has limited maintenance and is not recommended unless bundle size is a hard constraint

## Success Criteria

- `tsc --noEmit` completes with zero errors
- `eslint` passes with zero warnings on `src/`
- Vitest reports ≥80% line coverage on `src/`
- All existing Cypress E2E tests pass
- The app loads, authenticates via Keycloak, displays articles, opens the editor, and accepts image uploads
- Initial page load bundle (HTML + JS needed to render the home page) is under 200KB gzipped
- No JVM or Clojure tooling required to build or develop the app
