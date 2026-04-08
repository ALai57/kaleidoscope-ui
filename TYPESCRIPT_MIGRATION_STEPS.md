# TypeScript Migration — Execution Steps

Companion to `TYPESCRIPT_MIGRATION.md`. Each step is a single commit. Steps within a phase are ordered; steps in different phases are independent of each other unless noted.

**Verification conventions**
- `tsc` — run `npx tsc --noEmit` from repo root
- `test` — run `npm test` (Vitest)
- `lint` — run `npm run lint`
- `build` — run `npm run build` (Vite)
- `storybook` — run `npm run storybook`, open browser, confirm no errors
- `cljs` — run `npx shadow-cljs release app` to confirm the CLJS app still compiles (used in early phases while the two builds coexist)

---

# Phase 0 — Foundation

### Step 0.1 — Remove unused packages
Uninstall `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `react-cool-inview`, `lazysizes`, and `pretty` from `package.json`. These packages are installed but have zero usage in the codebase.

**Verify:** `cljs` — Shadow-CLJS still compiles. `npm ls` no longer shows the removed packages.
**Commit:** `chore: remove unused packages (three.js, lazysizes, react-cool-inview, pretty)`

---

### Step 0.2 — Delete dead test scaffolding and stale static build
Delete `cypress/e2e/` (all files are Cypress's own example tests; they test `example.cypress.io`, not this app). Delete `storybook-static/` (51 MB of stale build output that should be a CI artifact, not committed).

**Verify:** `git status` shows only deletions. `cljs` still passes.
**Commit:** `chore: delete cypress example scaffolding and stale storybook-static`

---

### Step 0.3 — Install Vite + TypeScript core dependencies
Install: `vite`, `@vitejs/plugin-react`, `typescript`. Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': '/src' } },
});
```

**Verify:** `npx vite --version` prints a version number. No build yet.
**Commit:** `chore: install vite and typescript`

---

### Step 0.4 — Add tsconfig.json
Create `tsconfig.json` at repo root with strict settings:

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
    "paths": { "@/*": ["src/*"] },
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**Verify:** `tsc` — completes with no errors (no source files yet, so this is trivially true).
**Commit:** `chore: add strict tsconfig.json`

---

### Step 0.5 — Create minimal Vite entry point
Create `index.html` in the repo root (separate from `resources/public/index.html` which the CLJS app uses). Create `src/main.tsx` that renders `<div>TypeScript app coming soon</div>` into `#app`.

Install `react` and `react-dom` type definitions: `@types/react`, `@types/react-dom`.

**Verify:** `build` — Vite produces output in `dist/`. `tsc` — clean. `cljs` — the CLJS app still compiles and the existing `resources/public/index.html` is untouched.
**Commit:** `chore: add minimal vite entry point (does not affect cljs build)`

---

### Step 0.6 — Add .env files and type the environment variables
Create `.env.development` with placeholder Vite-prefixed vars:
```
VITE_AUTH_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=test
VITE_KEYCLOAK_CLIENT_ID=test-login
VITE_BUGSNAG_API_KEY=
```
Create `.env.production.example` as documentation with the same keys but no values. Create `src/vite-env.d.ts` that extends `ImportMetaEnv` with typed keys. Add `.env*.local` and `.env.production` to `.gitignore`.

**Verify:** `tsc` — `import.meta.env.VITE_AUTH_URL` typed as `string` in any `.ts` file.
**Commit:** `chore: add vite env files and typed ImportMetaEnv`

---

### Step 0.7 — Install and configure ESLint + Prettier
Install: `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`, `prettier`, `eslint-config-prettier`. Create `eslint.config.js` and `.prettierrc`. Add `lint`, `lint:fix`, and `format` scripts to `package.json`.

**Verify:** `lint` — runs with zero errors on `src/main.tsx`. `npx prettier --check src/` passes.
**Commit:** `chore: add eslint and prettier config`

---

### Step 0.8 — Install and configure Vitest + React Testing Library + MSW
Install: `vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `msw`. Add to `vite.config.ts`:

```ts
test: {
  environment: 'jsdom',
  setupFiles: ['src/test/setup.ts'],
  globals: true,
}
```

Create `src/test/setup.ts` (imports `@testing-library/jest-dom`). Create `src/test/server.ts` (empty MSW `setupServer()`). Add `test` and `test:coverage` scripts.

Write one smoke test: `src/test/smoke.test.ts` — `expect(1 + 1).toBe(2)`.

**Verify:** `test` — smoke test passes.
**Commit:** `chore: add vitest, react testing library, and msw`

---

### Step 0.9 — Upgrade Storybook to v8 with Vite builder
Run `npx storybook@latest upgrade`. Switch the framework in `.storybook/main.ts` from `@storybook/react-webpack5` to `@storybook/react-vite`. Update the `stories` glob to `src/**/*.stories.tsx`. Remove the Webpack-specific Storybook devDependencies (`webpack`, `webpack-cli`, `babel-loader`, and all `@babel/*` packages that are no longer needed).

**Verify:** `storybook` — dev server starts without errors. `build` — Vite build still succeeds.
**Commit:** `chore: upgrade storybook to v8 with vite builder, remove webpack and babel`

---

### Step 0.10 — Add CI scripts to package.json
Add a `ci` script that runs `typecheck`, `lint`, and `test` in sequence:
```json
"typecheck": "tsc --noEmit",
"ci": "npm run typecheck && npm run lint && npm run test"
```

**Verify:** `npm run ci` — all three pass.
**Commit:** `chore: add ci script (typecheck + lint + test)`

---

# Phase 1 — Types and Data Layer

### Step 1.1 — Define Article domain types
Create `src/types/article.ts` with `Article`, `ArticleBranch`, and `ArticleVersion` interfaces. Source the field names from `kaleidoscope.cljs` (the API client) and `db.cljs`.

**Verify:** `tsc` — clean.
**Commit:** `feat(types): add Article, ArticleBranch, ArticleVersion types`

---

### Step 1.2 — Define Image domain types
Create `src/types/image.ts` with `ImageVersion` and `Image` interfaces.

**Verify:** `tsc` — clean.
**Commit:** `feat(types): add Image and ImageVersion types`

---

### Step 1.3 — Define User, Group, and Theme types
Create `src/types/user.ts` (`UserProfile`), `src/types/group.ts` (`Group`, `GroupMember`, `Audience`), `src/types/theme.ts` (`ThemeParams`).

**Verify:** `tsc` — clean.
**Commit:** `feat(types): add UserProfile, Group, GroupMember, Audience, ThemeParams`

---

### Step 1.4 — Write url utility and tests
Create `src/utils/url.ts` with a `titleToSlug(title: string): string` function. This ports `title->url` from `kaleidoscope.cljs` — lowercases the string, strips punctuation, and replaces spaces with hyphens.

Write `src/utils/url.test.ts` with cases covering spaces, punctuation, empty strings, and unicode.

**Verify:** `test` — all url tests pass. `tsc` — clean.
**Commit:** `feat(utils): add titleToSlug with tests`

---

### Step 1.5 — Write the API base client
Create `src/api/client.ts` with a `request<T>()` helper that:
- Accepts a path, method, optional body, and optional auth token
- Attaches `Authorization: Bearer <token>` when provided
- Parses JSON responses
- Throws a typed `ApiError` (with `status` and `message`) for non-2xx responses

Write `src/api/client.test.ts` using MSW to mock a success response, a 401, and a 500. Add MSW server setup/teardown to the test file.

**Verify:** `test` — all client tests pass. `tsc` — clean.
**Commit:** `feat(api): add typed fetch client with error handling`

---

### Step 1.6 — Write the Articles API module
Create `src/api/articles.ts` porting all functions from `kaleidoscope.cljs` that deal with compositions, branches, and versions: `getArticles`, `getArticle`, `getBranches`, `getBranchVersions`, `saveArticleVersion`, `publishBranch`, `togglePublicVisibility`. Return types should use the types from Step 1.1.

Write `src/api/articles.test.ts` using MSW handlers. Test at least: successful fetch, 404, and that the auth header is sent when a token is provided.

**Verify:** `test` — all articles tests pass. `tsc` — clean.
**Commit:** `feat(api): add articles API module with tests`

---

### Step 1.7 — Write the Images API module
Create `src/api/images.ts` porting `getImageMetadata`, `addPhoto`, and `editPhoto`. The `addPhoto` function uses multipart `FormData` — ensure the test covers that the body is a `FormData` instance.

Write `src/api/images.test.ts`.

**Verify:** `test` — all image tests pass. `tsc` — clean.
**Commit:** `feat(api): add images API module with tests`

---

### Step 1.8 — Write the Groups and Themes API modules
Create `src/api/groups.ts` (portring `getGroups`, `addGroup`, `deleteGroup`, `addGroupMember`, `deleteGroupMember`, `addAudience`, `deleteAudience`, `getAudiencesForArticle`) and `src/api/themes.ts` (`getThemes`, `updateTheme`). Write tests for each.

**Verify:** `test` — all groups and themes tests pass. `tsc` — clean.
**Commit:** `feat(api): add groups and themes API modules with tests`

---

### Step 1.9 — Write the Payments and Users API modules
Create `src/api/payments.ts` (`getDomainAvailability`, `newPaymentSecret`) and `src/api/users.ts` (user profile fetch). Write tests for each.

**Verify:** `test` — all tests pass. `tsc` — clean.
**Commit:** `feat(api): add payments and users API modules with tests`

---

### Step 1.10 — Write KeycloakProvider and useKeycloak
Create `src/auth/KeycloakProvider.tsx`. It should:
- Accept `authConfig` as a prop (the values from `import.meta.env`)
- Instantiate `keycloak-js` on mount
- Call `.init({ onLoad: 'check-sso', silentCheckSsoRedirectUri: ..., pkceMethod: 'S256' })`
- Wire `onTokenExpired` to call `.updateToken()`
- Expose `{ keycloak, isAuthenticated, token, userProfile, login, logout }` via context

Create `src/auth/useKeycloak.ts` as a typed context consumer hook.

Write `src/auth/KeycloakProvider.test.tsx`: mock `keycloak-js`, verify that `isAuthenticated` is `false` before init completes and `true` after. Verify `login()` calls `keycloak.login()`.

**Verify:** `test` — auth tests pass. `tsc` — clean.
**Commit:** `feat(auth): add KeycloakProvider and useKeycloak hook`

---

# Phase 2 — App Shell

### Step 2.1 — Install app shell dependencies
Install: `react-router-dom`, `zustand`, `@tanstack/react-query`, `@mui/material@6`, `@mui/icons-material@6`, `@emotion/react`, `@emotion/styled`, `@bugsnag/js`, `@bugsnag/plugin-react`.

**Verify:** `tsc` — clean. `build` — Vite resolves all new imports.
**Commit:** `chore: install react-router, zustand, tanstack-query, mui v6, bugsnag`

---

### Step 2.2 — Write the MUI theme with dark mode
Create `src/theme/index.ts`. Port the `make-theme` and `BASE_THEME` logic from `theme.cljs`:
- `makePalette(params: ThemeParams)` computes primary, secondary, tertiary colors from HSL + angle math
- `makeTheme(params: ThemeParams)` calls `createTheme` with MUI v6's `colorSchemes` API, providing both a light and dark palette (dark uses `100 - lightness`)

Write `src/theme/index.test.ts` — given the default `BASE_THEME` params, assert that primary/secondary colors are valid hex strings and that the dark palette lightness is the complement of the light palette.

**Verify:** `test` — theme tests pass. `tsc` — clean.
**Commit:** `feat(theme): add MUI v6 theme with light/dark mode support`

---

### Step 2.3 — Write Zustand stores
Create:
- `src/store/uiStore.ts` — `modal: ModalState | null`, `notificationType: 'modal' | 'snackbar'`, actions `openModal`, `closeModal`, `setNotificationType`
- `src/store/themeStore.ts` — `themeParams: ThemeParams`, action `setThemeParams`
- `src/store/editorStore.ts` — `editorBranchId: string | null`, `initialEditorData: ArticleVersion | null`, actions `setEditorBranchId`, `setInitialEditorData`

Write one test file per store covering initial state and each action.

**Verify:** `test` — all store tests pass. `tsc` — clean.
**Commit:** `feat(store): add uiStore, themeStore, and editorStore with tests`

---

### Step 2.4 — Write the LoadingScreen component
Create `src/components/layout/LoadingScreen.tsx` — a full-viewport centered MUI `CircularProgress`. Write a test confirming it renders. Write a Storybook story.

**Verify:** `test` — component test passes. `storybook` — story renders.
**Commit:** `feat(components): add LoadingScreen component`

---

### Step 2.5 — Wire app shell: router, providers, and page stubs
Create stub page components (each renders its name in an `<h1>`) for all routes: `HomePage`, `ArticlePage`, `ArticleManagerPage`, `ArticleEditorPage`, `ImageManagerPage`, `UIManagerPage`, `GroupsPage`, `SignUpPage`, `AdminPage`, `AboutThisSitePage`, `ManagerPage`.

Create `src/App.tsx` with `createBrowserRouter` defining all 12 routes using the stubs.

Update `src/main.tsx` to wrap the app in `QueryClientProvider`, `KeycloakProvider`, `ThemeProvider` (using `makeTheme(BASE_THEME)`), `RouterProvider`, and `BugsnagErrorBoundary`.

**Verify:** `build` — Vite builds without errors. Open `dist/index.html` in a browser — navigating to `/` shows "HomePage", `/groups` shows "GroupsPage", etc.
**Commit:** `feat(shell): add router with all page stubs and global providers`

---

### Step 2.6 — Add hash-fragment redirect for backward compatibility
In `App.tsx` (or a root-level `useEffect` in `main.tsx`), add a one-time check on page load: if `window.location.hash` starts with `#/`, replace the URL with the hash path using `window.location.replace`. This ensures old shared links like `/#/content/my-article` continue to work after the switch to history-based routing.

Write a test: render `App` with `initialEntries={['/']}`, set `window.location.hash = '#/groups'`, trigger the effect, assert the router is now at `/groups`.

**Verify:** `test` — redirect test passes. `tsc` — clean.
**Commit:** `feat(shell): redirect legacy hash-based URLs to history-based routes`

---

# Phase 3 — Shared Components

> Each step follows the same pattern: read the CLJS source, define typed Props, write the TSX component, write an RTL test, write a Storybook story. One commit per component.

---

### Step 3.1 — ImageCard
Port `ImageCard.tsx` from `src/kaleidoscope-js/`. Replace the implicit props with a typed `ImageCardProps` interface. Remove the `as HTMLImageElement` type cast — use a proper `useRef<HTMLImageElement>`.

**Verify:** `test` — renders with a given image src. `storybook` — story shows the card.
**Commit:** `feat(components): type ImageCard props`

---

### Step 3.2 — ImageThumbnail
Port `ImageThumbnail.tsx`. Add typed `ImageThumbnailProps` with `image: ImageVersion`, `authToken?: string`, `onClick?: () => void`.

**Verify:** `test` — click handler fires. `storybook` — story renders.
**Commit:** `feat(components): type ImageThumbnail props`

---

### Step 3.3 — FullImageCard
Port `FullImageCard.tsx`. Add typed props. The `useEffect` for the auth header injection should have a typed `HTMLImageElement` ref.

**Verify:** `test` — renders image with correct src. `storybook` — story renders.
**Commit:** `feat(components): type FullImageCard props`

---

### Step 3.4 — InputTags
Port `InputTags.tsx`. Replace all `any` with a generic type parameter: `InputTags<T extends string>` with `options: T[]`, `vals: T[]`, `onAdd: (val: T) => void`, `onRemove: (val: T) => void`. Keep `tagType` and `disabled` as optional.

**Verify:** `test` — add and remove handlers fire with the correct value. `storybook` — story renders. `tsc` — no `any` types remaining in the file.
**Commit:** `feat(components): replace any types in InputTags with generics`

---

### Step 3.5 — Extract ImageBrowser sub-components
Before re-typing `ImageBrowser`, extract its two internal components into their own files: `src/components/images/EditorPanel.tsx` and `src/components/images/VersionSelector.tsx`. No behavior changes — just file extraction. Write tests for each extracted component.

**Verify:** `test` — extracted component tests pass. `build` — no regressions. `tsc` — clean.
**Commit:** `refactor(components): extract EditorPanel and VersionSelector from ImageBrowser`

---

### Step 3.6 — ImageBrowser
Now type `ImageBrowser.tsx` properly. Replace all `any` props with typed interfaces using `Image`, `ImageVersion`, and callback types. The `photoManager` prop should be typed as `{ addPhoto?: (e: ChangeEvent<HTMLInputElement>) => void; editPhoto?: (payload: EditPhotoPayload) => void; selectPhoto?: (src: string) => void }`.

**Verify:** `test` — keyboard navigation (left/right arrow) changes selected image. `storybook` — story renders with mock images. `tsc` — no `any` remaining.
**Commit:** `feat(components): type ImageBrowser props and remove all any`

---

### Step 3.7 — Button
Port `src/kaleidoscope/ui/components/button.cljs` to `src/components/layout/Button.tsx`. This is a thin MUI `Button` wrapper — read the CLJS source for which props it exposes.

**Verify:** `test` — onClick fires. `storybook` — story renders.
**Commit:** `feat(components): add Button component`

---

### Step 3.8 — Slider
Port `slider.cljs` to `src/components/layout/Slider.tsx`.

**Verify:** `test` — onChange fires with new value. `storybook` — story renders.
**Commit:** `feat(components): add Slider component`

---

### Step 3.9 — Modal
Port `modal.cljs` to `src/components/layout/Modal.tsx`. The CLJS implementation has both a `basic-modal` and a managed variant — port both as named exports.

**Verify:** `test` — modal appears when `open` is true, closes when backdrop is clicked. `storybook` — both variants render.
**Commit:** `feat(components): add Modal component`

---

### Step 3.10 — Snackbar
Port `snackbar.cljs` to `src/components/layout/Snackbar.tsx`.

**Verify:** `test` — snackbar renders with the given message. `storybook` — story renders.
**Commit:** `feat(components): add Snackbar component`

---

### Step 3.11 — NotificationCard
Port `notification_card.cljs` to `src/components/layout/NotificationCard.tsx`.

**Verify:** `test` — renders with a status and message. `storybook` — story renders.
**Commit:** `feat(components): add NotificationCard component`

---

### Step 3.12 — NavBar
Port `navbar.cljs` to `src/components/layout/NavBar.tsx`. Add a dark mode toggle button that calls `useColorScheme().setMode()` from MUI v6. Wire `login` and `logout` to `useKeycloak()`.

**Verify:** `test` — login button is visible when unauthenticated; logout button is visible when authenticated; dark mode toggle fires `setMode`. `storybook` — authenticated and unauthenticated stories render.
**Commit:** `feat(components): add NavBar with dark mode toggle`

---

### Step 3.13 — SideMenu
Port `side_menu.cljs` to `src/components/layout/SideMenu.tsx`.

**Verify:** `test` — menu items render; click navigates via the provided handler. `storybook` — story renders.
**Commit:** `feat(components): add SideMenu component`

---

### Step 3.14 — Table
Port `table.cljs` to `src/components/layout/Table.tsx`. This wraps `@mui/x-data-grid` — type the `columns` and `rows` props using DataGrid's exported types.

**Verify:** `test` — renders rows from provided data. `storybook` — story renders with mock data.
**Commit:** `feat(components): add Table component (MUI DataGrid wrapper)`

---

### Step 3.15 — RadioGroup
Port `radio_group.cljs` to `src/components/layout/RadioGroup.tsx`.

**Verify:** `test` — onChange fires when a radio is selected. `storybook` — story renders.
**Commit:** `feat(components): add RadioGroup component`

---

### Step 3.16 — ArticleCard
Port `article_cards.cljs` to `src/components/article/ArticleCard.tsx`.

**Verify:** `test` — renders title and date. `storybook` — story renders.
**Commit:** `feat(components): add ArticleCard component`

---

### Step 3.17 — Color sub-components (ColorFamily, SaturationLightnessGrid)
Port `colors/color_family.cljs` and `colors/saturation_lightness_grid.cljs` to `src/components/colors/`. These are display-only components driven by HSL values.

**Verify:** `test` — each renders without errors given valid props. `storybook` — stories render with sample palettes.
**Commit:** `feat(components): add ColorFamily and SaturationLightnessGrid`

---

### Step 3.18 — ColorWheel
Port `colors/color_wheel.cljs` to `src/components/colors/ColorWheel.tsx`. This is the largest component in the colors group (~430 LOC) — take care to preserve the mouse-drag hue calculation (`atan2`-based angle math) exactly. Note: there is no Three.js involved despite what the old packages implied — it's pure CSS gradients and pointer events.

**Verify:** `test` — `onChange` fires with a new hue value when `mousedown` + `mousemove` is simulated. `storybook` — story renders and is visually inspectable.
**Commit:** `feat(components): add ColorWheel component`

---

### Step 3.19 — ColorPicker
Port `colors/color_picker.cljs` to `src/components/colors/ColorPicker.tsx`. Composes `ColorWheel`, `SaturationLightnessGrid`, `ColorFamily`, and `Slider` components.

**Verify:** `test` — renders without errors; `onChange` fires when child components update. `storybook` — story renders as a complete color picker.
**Commit:** `feat(components): add ColorPicker component`

---

# Phase 4 — Rich Text Editor

### Step 4.1 — Capture article HTML snapshots
Before touching the editor, capture ground-truth HTML from the running CLJS app. Fetch the content of at least 3 representative articles (one basic, one with code blocks, one with images) and save the raw HTML strings as files in `src/test/fixtures/articles/`. These become the acceptance criteria for TipTap parity.

**Verify:** Files exist in `src/test/fixtures/articles/`. `cljs` — CLJS app still serves those articles correctly.
**Commit:** `test: add article HTML fixtures for editor migration parity check`

---

### Step 4.2 — Install TipTap dependencies
Install: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-code-block-lowlight`, `@tiptap/extension-link`, `@tiptap/extension-image`, `@tiptap/extension-underline`, `@tiptap/extension-text-align`, `@tiptap/extension-color`, `@tiptap/extension-highlight`, `@tiptap/extension-text-style`, `lowlight`.

**Verify:** `tsc` — clean. `build` — resolves new imports.
**Commit:** `chore: install tiptap and lowlight`

---

### Step 4.3 — Create the TipTap extensions config
Create `src/components/editor/extensions.ts` with the exported `extensions` array (see `TYPESCRIPT_MIGRATION.md` Phase 4 for the full list). This file has no React — it is pure configuration.

**Verify:** `tsc` — clean. Write a trivial test that imports `extensions` and checks `extensions.length > 0`.
**Commit:** `feat(editor): add tiptap extensions config`

---

### Step 4.4 — Build the EditorToolbar component
Create `src/components/editor/EditorToolbar.tsx`. It accepts a TipTap `Editor` instance and renders a toolbar with buttons for: bold, italic, underline, strikethrough, H1–H3, blockquote, code block, ordered list, unordered list, left/center/right/justify alignment, link, image (triggers a callback), indent, outdent. Map each button to the corresponding TipTap chain command.

Write a test that renders the toolbar with a mock editor and asserts that clicking Bold calls `editor.chain().focus().toggleBold().run()`.

**Verify:** `test` — toolbar interaction tests pass. `storybook` — story renders with all buttons visible.
**Commit:** `feat(editor): add EditorToolbar component`

---

### Step 4.5 — Build the RichTextEditor component
Create `src/components/editor/RichTextEditor.tsx`. It:
- Calls `useEditor({ extensions, content: initialContent })` where `initialContent` is an HTML string prop
- Renders `<EditorContent editor={editor} />` below `<EditorToolbar editor={editor} />`
- Exposes an `onChange?: (html: string) => void` prop that fires when content changes (use `editor.on('update', ...)`)

Write a test: render the editor with initial HTML, simulate typing, assert `onChange` fires with updated HTML content. Write a test that loads the fixture HTML (from Step 4.1) and asserts `editor.getHTML()` produces equivalent HTML.

**Verify:** `test` — all editor tests pass, including the fixture-based parity tests. `storybook` — story renders a functional editor.
**Commit:** `feat(editor): add RichTextEditor with change propagation and fixture parity tests`

---

### Step 4.6 — Wire ImageBrowser into RichTextEditor
Add an `onInsertImage` flow to `RichTextEditor`: when the toolbar's image button is clicked, open a `Modal` containing `ImageBrowser` in `mode="select"`. When the user selects an image, call `editor.chain().focus().setImage({ src }).run()` and close the modal.

Write a test: render `RichTextEditor` with mock images, click the image toolbar button, assert the `ImageBrowser` modal opens.

**Verify:** `test` — image insertion tests pass. `storybook` — story demonstrates image selection flow.
**Commit:** `feat(editor): wire ImageBrowser modal into RichTextEditor`

---

# Phase 5 — Page Components

> Each page step: port the page, wire data fetching with TanStack Query, wire mutations with `useMutation`, write at least one integration test that mounts the page with a mocked API (MSW) and asserts the primary content renders.

---

### Step 5.1 — ArticlePage
Replace the `ArticlePage` stub. Fetch the article by `useParams().slug` with `useQuery`. Render the article HTML using `dangerouslySetInnerHTML` (same as the CLJS implementation). Handle loading and 404 states.

**Verify:** `test` — MSW returns a mock article; `ArticlePage` renders the article title. 404 renders a "not found" message.
**Commit:** `feat(pages): implement ArticlePage`

---

### Step 5.2 — AboutThisSitePage
Replace the `AboutThisSitePage` stub with the ported content.

**Verify:** `test` — page renders without errors.
**Commit:** `feat(pages): implement AboutThisSitePage`

---

### Step 5.3 — AdminPage
Replace the `AdminPage` stub. If `isAuthenticated` from `useKeycloak()` is false, show a "Log in" button that calls `login()`. If authenticated, show the admin panel content.

**Verify:** `test` — unauthenticated renders login button; authenticated renders admin content.
**Commit:** `feat(pages): implement AdminPage`

---

### Step 5.4 — Extract homepage data to constants
Create `src/data/timeline.ts` with the career/event timeline entries as a typed constant array (`TimelineEntry[]`). Create `src/data/skills.ts` with the skills data. This is a pure data extraction — no rendering changes yet. Source from `home.cljs`.

**Verify:** `tsc` — clean. `test` — trivial test that the arrays have the expected length.
**Commit:** `refactor(data): extract timeline and skills data from HomePage to typed constants`

---

### Step 5.5 — Timeline and TimelineEntry components
Create `src/components/layout/TimelineEntry.tsx` and `src/components/layout/Timeline.tsx` using the data types from Step 5.4.

**Verify:** `test` — renders a list of entries. `storybook` — story renders with the real data.
**Commit:** `feat(components): add Timeline and TimelineEntry components`

---

### Step 5.6 — SkillsSection and BioSection components
Create `src/components/layout/SkillsSection.tsx` and `src/components/layout/BioSection.tsx`.

**Verify:** `test` — both render without errors. `storybook` — stories render.
**Commit:** `feat(components): add SkillsSection and BioSection`

---

### Step 5.7 — PortfolioSection component
Create `src/components/layout/PortfolioSection.tsx`. Accepts `portfolioCards` as a prop (data from TanStack Query in the parent).

**Verify:** `test` — renders cards from provided data. `storybook` — story renders with mock cards.
**Commit:** `feat(components): add PortfolioSection component`

---

### Step 5.8 — HomePage
Replace the `HomePage` stub. Compose `BioSection`, `Timeline`, `SkillsSection`, and `PortfolioSection`. Fetch recent articles and portfolio cards via `useQuery`. The page component should be ~80 lines.

**Verify:** `test` — MSW returns mock articles and portfolio; page renders both. `tsc` — clean.
**Commit:** `feat(pages): implement HomePage`

---

### Step 5.9 — ArticleManagerPage
Replace the stub. Fetch all articles with `useQuery`. Use `useMutation` for toggling `public_visibility` and publishing a branch. Render using the `Table` component.

**Verify:** `test` — renders article list; clicking the visibility toggle calls the correct mutation.
**Commit:** `feat(pages): implement ArticleManagerPage`

---

### Step 5.10 — GroupsPage
Replace the stub. Fetch groups with `useQuery`. Mutations for add/delete group and add/delete member.

**Verify:** `test` — renders groups; add group mutation is called with correct payload.
**Commit:** `feat(pages): implement GroupsPage`

---

### Step 5.11 — SignUpPage
Replace the stub. Wire Stripe using `@stripe/react-stripe-js`. Port the domain availability check + payment intent flow as a sequential pair of `useMutation` calls.

**Verify:** `test` — MSW mocks domain availability endpoint; page shows availability result.
**Commit:** `feat(pages): implement SignUpPage with Stripe payment flow`

---

### Step 5.12 — ImageManagerPage
Replace the stub. Compose `ImageBrowser` in `mode="edit"`. Wire `addPhoto` (multipart POST), `editPhoto` (PUT), and `selectPhoto` to their API functions via `useMutation`. Wire React DnD for drag-and-drop ordering — type the drag item as `{ type: 'IMAGE'; index: number }`.

**Verify:** `test` — renders image browser with mock images; edit mutation fires with correct payload on save.
**Commit:** `feat(pages): implement ImageManagerPage`

---

### Step 5.13 — UIManagerPage
Replace the stub. Render `ColorPicker` and wire its `onChange` to `themeStore.setThemeParams`. Add a "Save theme" button that calls `updateTheme` via `useMutation`. Add a dark mode toggle button using MUI v6's `useColorScheme()`.

**Verify:** `test` — color picker change updates the Zustand store; save button calls the mutation.
**Commit:** `feat(pages): implement UIManagerPage with color picker and dark mode toggle`

---

### Step 5.14 — ArticleEditorPage
Replace the stub. This is the most complex page — compose `RichTextEditor`, a branch selector, and save/publish controls.

Wire:
- `useQuery(['branches'])` to populate the branch dropdown
- `useQuery(['version', branchId])` to load content into `RichTextEditor` when branch changes
- `useMutation(saveArticleVersion)` for save — passes `editor.getHTML()` as content
- `useMutation(publishBranch)` for publish
- `editorStore.setEditorBranchId` on branch selection

**Verify:** `test` — MSW provides branches and version content; `RichTextEditor` receives the article HTML as `initialContent`; save mutation fires with correct payload.
**Commit:** `feat(pages): implement ArticleEditorPage`

---

### Step 5.15 — ManagerPage
Replace the stub. This is the navigation hub for authenticated users — render links or cards for article manager, image manager, UI manager, groups.

**Verify:** `test` — renders navigation links for all manager routes.
**Commit:** `feat(pages): implement ManagerPage`

---

# Phase 6 — Testing Pass

### Step 6.1 — Vitest coverage baseline
Run `npm run test:coverage`. Review the report and add missing tests to reach 80% line coverage on `src/`. Focus on untested branches in utility functions and API modules.

**Verify:** `test:coverage` — `src/` reports ≥80% line coverage.
**Commit:** `test: add missing unit tests to reach 80% line coverage`

---

### Step 6.2 — Install Playwright
Install `@playwright/test` and run `npx playwright install`. Create `playwright.config.ts` pointing at `http://localhost:5173` (Vite dev server). Add a `test:e2e` script. Write one smoke test: navigate to `/`, assert the page title is correct.

**Verify:** `test:e2e` — smoke test passes against the running dev server.
**Commit:** `chore: install playwright and add smoke e2e test`

---

### Step 6.3 — Playwright: unauthenticated article reading flow
Write a Playwright test: navigate to `/`, assert recent articles are visible, click one, assert the article page loads with the article title in the heading. Use Playwright's network mock to return fixture article data without needing a real backend.

**Verify:** `test:e2e` — test passes.
**Commit:** `test(e2e): unauthenticated user views homepage and reads article`

---

### Step 6.4 — Playwright: authenticated article editor flow
Write a Playwright test: mock the Keycloak token so the app treats the user as authenticated. Navigate to `/editor`, assert branches are loaded, type into the editor, click save, assert the save API was called with the editor HTML.

**Verify:** `test:e2e` — test passes.
**Commit:** `test(e2e): authenticated user creates and saves article draft`

---

### Step 6.5 — Playwright: image upload and theme change flows
Write two Playwright tests:
1. Navigate to `/image-manager`, click "Add new photo", mock the file upload API, assert the mutation was called.
2. Navigate to `/ui-manager`, interact with the color picker, click "Save theme", assert the theme update mutation was called.

**Verify:** `test:e2e` — both tests pass.
**Commit:** `test(e2e): image upload and theme change flows`

---

# Phase 7 — Cutover

### Step 7.1 — Verify Vite build output and document index.html switch

`vite.config.ts` now outputs to `resources/andrewslai.com/static/dist/` (with `emptyOutDir: true`).
The production HTML switch — updating `resources/andrewslai.com/static/index.html` to load
`dist/assets/index.js` — happens at deploy time once the CLJS app is fully retired.
The `resources/andrewslai.com/static/dist/` directory is gitignored; it is a CI/deploy artifact.

To switch production HTML after build:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" charset="utf-8">
    <title>Andrew S Lai</title>
    <link rel="icon" href="static/images/nav-bar/favicon.png" type="image/png">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/dist/assets/index.js"></script>
  </body>
</html>
```

**Verify:** `build` — `resources/andrewslai.com/static/dist/assets/` contains chunk files.
**Commit:** `chore: verify vite build output and document index.html switch approach`

---

### Step 7.2 — Add lazy loading for heavy pages
In `src/App.tsx`, wrap `ArticleEditorPage`, `ImageManagerPage`, and `UIManagerPage` with `React.lazy()` and wrap the router outlet in `<Suspense fallback={<LoadingScreen />}>`. Vite will automatically create separate chunks for these routes and their large dependencies (TipTap/ProseMirror, Stripe, `@adobe/leonardo-contrast-colors`).

**Verify:** `build` — `dist/assets/` contains separate chunk files for the lazy-loaded pages. Initial page load does not include TipTap.
**Commit:** `perf: lazy load ArticleEditorPage, ImageManagerPage, UIManagerPage`

---

### Step 7.3 — Final type check pass
Run `tsc --noEmit`. Fix every remaining error. This step should have no application changes — only type annotation fixes.

**Verify:** `tsc` — zero errors.
**Commit:** `fix(types): resolve all remaining tsc errors`

---

### Step 7.4 — Delete CLJS source
Delete `src/kaleidoscope/` (all 77 `.cljs` files). Delete `src/kaleidoscope-js/` (the old interop package). The app runs entirely from `src/` TypeScript files now.

**Verify:** `build` — Vite builds without errors. `tsc` — clean. The app runs correctly from the Vite build.
**Commit:** `chore: delete cljs source and kaleidoscope-js interop package`

---

### Step 7.5 — Remove Shadow-CLJS and CLJS tooling
Delete `shadow-cljs.edn` and `pom.xml`. Remove all CLJS-related npm packages from `package.json`: `shadow-cljs`, `reagent`, `re-frame`, and any other CLJS runtime packages. Remove CLJS build scripts from `package.json`. Add `"build": "vite build"` and `"preview": "vite preview"`.

**Verify:** `npm install` — clean. `build` — succeeds. `npm run ci` — all checks pass. No JVM tooling required.
**Commit:** `chore: remove shadow-cljs, pom.xml, and all cljs tooling`

---

### Step 7.6 — Bundle analysis
Install `rollup-plugin-visualizer`. Run `vite build` with it enabled to generate `dist/stats.html`. Review the treemap. Verify that Three.js does not appear (it was removed in Step 0.1). Verify TipTap and ProseMirror are only in the editor chunk. Remove the plugin after review (it's a one-off diagnostic, not a permanent addition).

**Verify:** `dist/stats.html` confirms expected chunk composition. Initial load chunk is under 200KB gzipped.
**Commit:** `chore: verify bundle composition; initial chunk under 200kb gzipped`
