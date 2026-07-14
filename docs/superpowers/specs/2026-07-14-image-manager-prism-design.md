# Image Manager → Prism (P2, slice 1) — Design

**Status:** Approved design (2026-07-14). Next: implementation plan via writing-plans.

**Goal:** Re-skin the Image Manager surface (`/images`) to the Prism dark "mission-control" look, elevating the image grid to the Prism tile treatment (hairline border, spring hover-lift, filename/meta overlay) and adding the Prism drop-tile upload affordance — all **token-driven**, so the same `ImageBrowser` reused as the article-editor's image picker stays light.

**Context:** This is the first slice of P2 (see `admin-prism-p1` memory + the Prism-adoption audit). P1 brought the `AdminLayout` admin shell onto Prism. The Image Manager's *structure* (responsive grid + detail panel) already shipped in the 2026-07-12 grid redesign; this slice is a **visual re-skin of that existing structure**, not a rebuild.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push. Commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under `src/theme/**`, tests, stories). Read colors from `theme.palette` (`background.paper`, `divider`, `primary.main`, `text.*`, `action.hover`) or `theme.tokens.*`.
- **Token-driven styling only, no `prism/*` imports inside `src/components/images/*`.** The Prism voice (mono type, spring motion, accent) comes from `theme.tokens.*` **with non-token fallbacks** — the established pattern in `NavBar`/`AdminNavRail`/`AdminTopBar`/`common/*`. This is what lets a single component render Prism-dark under `PrismThemeProvider` and light under the app theme. `prism/*` primitives are pinned-dark contexts and are allowed **only** in `ImageManagerPage`'s own page chrome, which is never shared with the picker.
- **Reuse invariant:** `ImageBrowser` renders in two places — `ImageManagerPage` (`mode="edit"`, wrapped in `PrismThemeProvider` → dark) and `RichTextEditor` (`mode="select"`, in a Modal, no provider → light). Every change must keep the `select`/light path visually correct. This is a hard acceptance criterion with its own regression tests.
- Server state → TanStack Query; the images query (`['images']`) and `addPhoto`/`editPhoto` mutations, and all API access via `src/api/images`, are unchanged. This is styling + prop-threading only.

---

## Architecture / Approach

Token-driven, in-place re-skin. No new `prism/` primitive: the `images/*` components are app-specific and already *are* the grid, so re-skinning them is DRYer than a parallel primitive and keeps the shared picker correct for free (exactly how P1 re-skinned `common/*`).

Three layers of change:
1. **Shell** — `ImageManagerPage` wraps its body in `PrismThemeProvider` and gains a Prism page header.
2. **Grid** — `ImageThumbnail` becomes the Prism tile; a new drop-tile replaces the edit-mode "Add photo" toolbar button.
3. **Detail** — the detail panel, `EditorPanel`, `FullImageCard`, `VersionSelector`, empty state, and mobile modal re-skin through the ambient theme (they already read `background.paper`/`divider`/`primary.main`), with the mono voice applied where cheap.

---

## Component Changes

### 1. `src/pages/ImageManagerPage.tsx`
- Wrap the content `Box` (everything below `NavBar`) in `PrismThemeProvider` so the manager renders Prism-dark. `NavBar` stays *outside/above* the provider (light), per the accepted RecipesPage precedent.
- Replace the bare `<Typography variant="h4">Image Manager</Typography>` with a small Prism page header: a mono uppercase eyebrow (e.g. `IMAGE MANAGER`) + title, styled from `theme.tokens.typography.mono` with a fallback. `prism/*` primitives are permitted here (page chrome, not shared).
- `LoadingScreen`, `Snackbar` re-skin via the theme; the empty gap between `NavBar` and content should read as the dark plane (`background.default`).

### 2. `src/components/images/ImageThumbnail.tsx` → Prism tile
Current: square (`aspectRatio 1/1`), `action.hover` background, `selected` outline via `primary.main`, `useAuthorizedImage` lazy load.

Add (token-driven, square kept):
- **Surface:** 1px `divider` border, radius from `theme.shape.borderRadius` (Prism = 10px), `overflow: hidden`.
- **Hover:** `translateY(-4px) scale(1.02)` using `theme.tokens.motion.easing.springSettle` + duration (fallbacks `ease`/`350ms`), a lift shadow, and border → emphasized (`text.disabled`/`line-2`-equivalent). Guarded by `@media (prefers-reduced-motion: reduce)`.
- **Selected / focus-visible:** 2px `primary.main` outline + a soft accent glow (`box-shadow` via `alpha(theme.palette.primary.main, …)`). Keep the existing keyboard affordance (`role="button"`, Enter/Space).
- **Overlay:** an absolutely-positioned bottom band — a scrim gradient (transparent → dark rgba, allowed via `alpha(theme.palette.common.black, …)`), padding, showing:
  - filename = `name` (mono, single-line ellipsis),
  - meta = `${width}×${height}` when the version has `width`/`height` (mono), else omitted.
  - Hidden at rest (`opacity: 0`, slight `translateY`), fades in on hover **and** `:focus-visible`.
  - **Overlay text color is fixed light in BOTH themes**, because the scrim is always dark: use `theme.palette.common.white` for the filename and `alpha(theme.palette.common.white, 0.7)` for the meta. Do **not** use `text.primary`/`text.secondary` here — they flip to dark in the light picker and would fail contrast on the dark scrim.
- **New props:** extend `ImageThumbnailProps` with `name?: string` and reuse the passed `image: ImageVersion` for `width`/`height`. `ImageBrowser` passes `name={image.name}` and the thumbnail version (which carries `width`/`height`).
- **Light-safe:** the scrim is dark by design and its text is fixed-light (above); the tile surface, border, and selected accent come from the palette. So the tile is correct in both the Prism-dark manager and the light picker.

### 3. Drop-tile (new) in `src/components/images/ImageBrowser.tsx`
- Add a `DropTile` (local to `ImageBrowser`, or a small `images/DropTile.tsx`) rendered as the **first grid child in `mode="edit"` only**: square, 1.5px dashed `divider` border, centered add icon (`AddPhotoAlternateIcon`) + mono "Add photo" label; hover → accent (`primary.main` border/text + `alpha(primary.main)` background). It wraps a hidden `<input type="file" accept="image/*" multiple>` via `component="label"` (keyboard-accessible), wired to the existing `addPhoto`. While `isUploading`: disabled, label reads "Uploading…".
- **Remove** the edit-mode toolbar `NewPhotoButton` (the drop-tile replaces it — one affordance, YAGNI). The `select`-mode toolbar keeps its `SelectButton` ("Insert image") unchanged.
- **Empty state (`images.length === 0`, edit mode):** show the drop-tile (not just the dashed "No photos yet" box) so upload is reachable; keep an explanatory line. In `select` mode keep the current empty message.
- Grid container: keep `repeat(auto-fill, minmax(112px, 1fr))` (square tiles) and gap; optionally lift gap/min to match Prism spacing via tokens — cosmetic, keep minimal.

### 4. Detail panel & editor (re-skin via ambient theme)
- `ImageBrowser` detail panel `Box`, resize handle, and mobile `Modal`: already use `background.paper`/`divider`/`primary.main` → re-skin dark under Prism automatically. Verify the resize handle's `primary.main` hover reads well on dark; verify the modal backdrop (`alpha(common.black, .6)`) is fine.
- `src/components/images/EditorPanel.tsx`: MUI `TextField`/`Stack`/`Button`/`FormControl` re-skin dark automatically. Apply the mono voice to the field labels via `theme.tokens.typography.mono` (fallback `inherit`) where it elevates the Prism look; `SaveButton` stays MUI `variant="contained"` (re-skins). Do **not** import `prism/*` here (shared with the light picker).
- `src/components/images/FullImageCard.tsx`, `src/components/images/VersionSelector.tsx`: re-skin via theme; confirm no hardcoded light assumptions.

---

## Data Flow & Error Handling
Unchanged. Images come from `useQuery(['images'], getImageMetadata)`; upload/edit via the existing mutations; success/error surface through `Snackbar`. The only data change is threading `image.name` (and the version's `width`/`height`) into `ImageThumbnail` for the overlay.

---

## Testing

Co-located Vitest + Testing Library (jsdom), MSW where network is touched; Storybook variants for visual QA.

- **`ImageThumbnail`:** renders the image; overlay exposes the filename (`name`) and `w×h` meta when present, and omits meta when absent; `selected` and `focus-visible` apply the accent state; keyboard Enter/Space fire `onClick`.
- **Theme-reuse regression guards (the critical invariant):**
  - Render `ImageThumbnail` under `PrismThemeProvider` → asserts it mounts under `palette.mode === 'dark'` with content intact.
  - Render `ImageBrowser` `mode="select"` under the **light** app theme (via `testUtils.render`) → asserts `palette.mode === 'light'`, that **no drop-tile** appears, and the `SelectButton` ("Insert image") is present. This is the picker-stays-light guard.
- **Drop-tile:** in `mode="edit"`, changing the hidden file input fires `addPhoto` with the files; the tile is disabled and labeled "Uploading…" while `isUploading`; the drop-tile is **absent** in `mode="select"`.
- **Empty state:** `images=[]` + `mode="edit"` shows the drop-tile; `mode="select"` shows the empty message.
- **`ImageManagerPage`:** renders under Prism (`palette.mode === 'dark'`) with the header text present; upload/save success + error paths still notify via `Snackbar` (existing coverage retained/adjusted).
- **Existing tests/stories:** update `ImageBrowser`/`ImageThumbnail`/`EditorPanel`/`FullImageCard` tests for the new props/structure (drop-tile replacing the toolbar button); update stories to include a `PrismThemeProvider`-wrapped variant alongside a light variant.

---

## Out of Scope
- The article editor / `RichTextEditor` chrome itself (a later P2 slice) — only its embedded `ImageBrowser` picker must stay light, which the token-driven rule guarantees.
- The public `NavBar` and reader/portfolio pages (stay tenant-light, per the P1 scope decision).
- Any new generic `prism/*` primitive; changing the upload/version/edit APIs; changing tiles from square to the library's 4/3 (square kept deliberately to avoid layout churn).

---

## Decisions Resolved (during brainstorming)
1. **Shell:** `PrismThemeProvider` wrap (RecipesPage precedent), image-manager only — no `AdminLayout` adoption, no nav-rail/entry-point changes. *(user)*
2. **Tiles:** keep **square** (not the library's 4/3). *(user)*
3. **Upload affordance:** the Prism **drop-tile replaces** the toolbar "Add photo" button. *(user)*
4. **No new primitive:** re-skin the existing `images/*` in place, token-driven; `prism/*` only in the page chrome. *(design)*
5. **Reuse safety:** all `images/*` styling is ambient-theme-driven so the light picker is unaffected; enforced by regression tests. *(design)*
