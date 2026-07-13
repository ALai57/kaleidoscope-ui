# Image Manager — Grid Redesign

**Date:** 2026-07-12
**Status:** Approved (design), pending implementation plan
**Component surface:** `src/components/images/*`, `src/pages/ImageManagerPage.tsx`
**Visual spec:** Prism-themed design doc (Artifact) accompanying this document.

---

## Problem

The image manager (`/images`, `ImageManagerPage` → `ImageBrowser`) has two concrete usability
failures with real image libraries:

1. **Infinite horizontal scroll.** The thumbnail strip is a single flex row with
   `overflow-x: auto` (`ImageBrowser.tsx` `thumbnailStrip`). It never wraps, so reaching image
   #200 means scrolling right past the previous 199. There is no overview and no fast navigation.

2. **Grainy blow-up.** The detail view (`FullImageCard`) forces `height: 100%` and inherits MUI
   `CardMedia`'s default `object-fit: cover`. A small image is upscaled and cropped into a large,
   fuzzy block instead of being shown at its natural size. `ImageThumbnail` has the same
   fixed-height + cover distortion.

`ImageBrowser` is **shared** by two callers, and the redesign must keep both working:

- `ImageManagerPage` — `mode="edit"`, full page.
- `RichTextEditor` — `mode="select"`, rendered inside a width-constrained modal to pick an image
  to insert into an article.

A secondary problem: three components (`ImageThumbnail`, `FullImageCard`, `ImageCard`) each
re-implement `fetchWithAuthentication` + the blob/object-URL dance, and each revokes the object
URL **only** on `img.onload`, leaking the URL if the component unmounts mid-flight.

---

## Goals

- Replace the horizontal strip with a **responsive wrapping grid** that scrolls vertically only.
- Render the detail image at its **natural size** (no upscaling, no forced crop).
- Keep **lazy loading** (`IntersectionObserver`) and **authorized image requests** (Bearer token
  → blob → object URL).
- Keep both `edit` and `select` modes, the empty state, the version selector, and keyboard nav.
- Consolidate the duplicated auth-image logic into one hook and fix the object-URL leak.

## Non-goals (out of scope)

- **Delete** — no backend endpoint exists (`src/api/images.ts` has get/add/edit only).
- **Search / filter** — explicitly deferred (YAGNI, per design decision).
- **Multi-select / bulk actions.**
- **`ImageCard`** — a legacy component referenced only by its own tests/stories, not rendered in
  the app. Left untouched; migrating it to the new hook is an optional future cleanup.

---

## Design

### Layout — `ImageBrowser`

Master–detail: a wrapping grid plus a persistent detail panel.

**Wide (desktop, both modes):**

```
┌─ toolbar ─────────────────────────────────────────┐
│ [ Add new photo ]                    33 photos     │   (Add button: edit mode only)
├───────────────────────────────┬───────────────────┤
│  ▢ ▢ ▢ ▢ ▢ ▢   grid           │  ┌─ detail ─────┐  │
│  ▢ ▣ ▢ ▢ ▢ ▢   auto-fill      │  │ [ image ]    │  │   ▣ = selected (cyan ring)
│  ▢ ▢ ▢ ▢ ▢ ▢   minmax(112px)  │  │ Name / date  │  │
│  ▢ ▢ ▢ ▢ ▢ ▢   scrolls ↓      │  │ Title  […]   │  │
│                               │  │ Desc   […]   │  │
│                               │  │ [ Save ]     │  │   (Save → edit; Insert → select)
└───────────────────────────────┴───────────────────┘
```

- **Grid:** CSS grid, `grid-template-columns: repeat(auto-fill, minmax(112px, 1fr))`, a small
  `gap`, `overflow-y: auto`, `overflow-x: hidden`. It fills remaining width and scrolls down.
- **Detail panel:** fixed width (~300–320px), the large selected image on top, the existing
  `EditorPanel` below (name / created / creator / title / description / version selector / Save,
  or **Insert image** in `select` mode).
- **Selection:** the existing `selectedImageIndex` state drives both the highlighted tile and the
  panel. Selected tile gets a cyan outline ring (theme accent).

**Narrow (mobile, and inside the article-picker modal):** below a breakpoint the layout stacks —
the grid goes full width and selecting a tile opens the detail panel as a **modal/drawer overlay**,
reusing the existing mobile-`Modal` pattern already in `ImageBrowser`. This keeps it usable inside
`RichTextEditor`'s own modal, which is too narrow for a side column.

> Breakpoint choice: keep the current `useMediaQuery(theme.breakpoints.down('sm'))` for the mobile
> switch. The article-picker modal on desktop is wide enough for the side-panel layout; if it
> proves too tight in practice, that is a follow-up tweak, not a blocker.

### Tiles — `ImageThumbnail`

- Uniform **square** tiles (`aspect-ratio: 1`), `width: 100%`, `object-fit: cover`, rendering the
  `versions.thumbnail` source. Uniform cropped squares are the scannable-gallery pattern and never
  upscale a small source into a grainy block.
- Lazy load + authorized fetch via the new `useAuthorizedImage` hook (below).
- Click / Enter selects; selected state styled by the parent (ring).

### Detail image — `FullImageCard`

- Replace `height: 100%` + `object-fit: cover` with:
  `max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain`, centered on
  a **plain background** (theme surface, no checkered/patterned stage). Small images render at true
  size and stay crisp; large ones scale down to fit.
- Authorized fetch via `useAuthorizedImage` (non-lazy: the detail image is always visible when a
  tile is selected).

### New hook — `useAuthorizedImage`

`src/components/images/useAuthorizedImage.ts` — one home for the fetch + observer + object-URL
lifecycle that `ImageThumbnail` and `FullImageCard` currently duplicate.

**Interface (proposed):**

```ts
interface UseAuthorizedImageOptions {
  lazy?: boolean;          // default false; when true, defer fetch until in view
  rootMargin?: string;     // observer margin, default '50px'
}

interface UseAuthorizedImage {
  containerRef: React.RefObject<HTMLDivElement>; // attach to the wrapper for the observer
  src: string | undefined;                       // object URL once loaded, else undefined
  inView: boolean;                               // whether the element has intersected
  status: 'idle' | 'loading' | 'loaded' | 'error';
}

function useAuthorizedImage(
  url: string | undefined,
  token: string | null,
  options?: UseAuthorizedImageOptions,
): UseAuthorizedImage;
```

**Responsibilities:**

- When `lazy`, set up an `IntersectionObserver` on `containerRef` and only fetch once intersecting;
  disconnect after first intersection. When not lazy, fetch immediately.
- Fetch with the `Authorization: Bearer <token>` header (when a token is present), read the blob,
  create an object URL, and return it via `src`.
- **Revoke the object URL on unmount and whenever `url`/`token` changes** — fixing the current leak
  where revocation happens only on `img.onload`.
- Guard against setting state after unmount / stale responses (the existing `cancelled` pattern).

Consumers render a **plain `<img src={src} …>`** and style it (square-cover for tiles, contain for
the detail image). The hook is presentation-agnostic. MUI `Card`/`CardMedia`/`CardActionArea`
wrappers are **dropped** in favor of plain `<img>` in a styled container — the app may migrate off
MUI, so the tile and detail image avoid deepening `CardMedia` coupling. Spacing/radius/border stay
on theme tokens.

### Keyboard navigation

Preserve arrow-key navigation. `←/→` move the selection by ±1 (as today). `↑/↓` move by one row —
best-effort using the grid's resolved column count; if column count is impractical to derive
reliably, `↑/↓` may be omitted without blocking. Selected tile stays scrolled into view
(`scrollIntoView({ block: 'nearest' })`).

---

## Components touched

| File | Change |
|---|---|
| `useAuthorizedImage.ts` | **New** hook (fetch + lazy observer + object-URL lifecycle). |
| `ImageThumbnail.tsx` | Square uniform tile; consume the hook (lazy). Remove local auth/observer code. |
| `FullImageCard.tsx` | `object-fit: contain`, natural size; consume the hook (non-lazy). Remove local auth code. |
| `ImageBrowser.tsx` | Replace strip with grid + persistent detail panel; keep responsive modal fallback, modes, empty state, keyboard nav. |
| `ImageManagerPage.tsx` | No structural change expected; verify props still line up. |
| `ImageCard.tsx` | Untouched (legacy, unused in app). |

---

## Testing

Every changed unit gets test coverage; MSW mocks the authorized image fetch.

- **`useAuthorizedImage`**: fetches with the Bearer header when a token is present; returns an
  object URL on success; **revokes the object URL on unmount**; when `lazy`, does not fetch until
  the observed element intersects. (IntersectionObserver is mocked in `src/test/setup.ts` — confirm
  or add a mock.)
- **`ImageThumbnail`**: renders a square tile; lazy-loads on intersection; calls `onClick` on
  click.
- **`FullImageCard`**: renders with `object-fit: contain` (not `cover`) and does not force
  `height: 100%` upscaling.
- **`ImageBrowser`**: renders one tile per image in a grid with no horizontal overflow; clicking a
  tile updates the selected index and the detail panel; `edit` vs `select` mode shows the right
  action (Save vs Insert image); empty state renders with zero images; existing keyboard-nav test
  updated for the grid.
- Update existing tests that assert the old strip/`CardMedia` structure.

**Verification:** run the affected flow in the app (not just unit tests) — load `/images`, confirm
the grid wraps and scrolls vertically, a small image shows at natural size in the panel, lazy tiles
load on scroll, and image requests carry the auth header. Then `npm run ci` (typecheck + lint +
test) before finishing.

---

## Risks / open questions

- **Article-picker modal width** — the side-panel layout assumes enough width. If the desktop
  picker modal is too tight, fall back to the stacked grid+modal layout there too (follow-up tweak).
- **Keyboard `↑/↓` in a fluid grid** — column count is dynamic; treated as best-effort, not
  required.
