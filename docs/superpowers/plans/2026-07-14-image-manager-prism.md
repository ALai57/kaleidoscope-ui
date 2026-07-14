# Image Manager → Prism (P2 slice 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the Image Manager (`/images`) to the Prism dark look — Prism image tiles (hairline border, spring hover-lift, filename/`w×h` overlay), a Prism drop-tile upload affordance, and a Prism-wrapped page — while keeping the same `ImageBrowser` (reused as the article-editor picker) correct in its light context.

**Architecture:** Token-driven, in-place re-skin (no new `prism/*` primitive). `ImageManagerPage` wraps its body in the existing `PrismThemeProvider`; the `images/*` components read colors/voice/motion from `theme.palette`/`theme.tokens` with fallbacks, so they render Prism-dark under the provider and stay light in `RichTextEditor`'s `mode="select"` picker. Full design: `docs/superpowers/specs/2026-07-14-image-manager-prism-design.md`.

**Tech Stack:** React 18 + TypeScript, MUI 6 (`useTheme`/`alpha`/`sx`), Emotion, Vitest + Testing Library (jsdom), Storybook 8.

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(theme.palette.*, n)`.
- **No `prism/*` imports inside `src/components/images/*`.** The Prism voice comes from `theme.tokens.*` **with non-token fallbacks** (`tokens?.typography.mono ?? 'monospace'`, `tokens?.motion.easing.springSettle ?? 'ease'`, `tokens?.motion.duration.base ?? 250`) — the `NavBar`/`AdminNavRail` pattern. `prism/*` is allowed only in `ImageManagerPage` page chrome (not shared with the picker); this plan uses it only via `PrismThemeProvider`.
- **Reuse invariant (hard requirement):** `ImageBrowser` also renders in `RichTextEditor` as `mode="select"` (light, in a Modal). Every change must keep that path light and free of edit-only affordances (no drop-tile). Enforced by tests in Task 3.
- **Overlay text is fixed-light in both themes** (it sits on an always-dark scrim): use `theme.palette.common.white` / `alpha(theme.palette.common.white, 0.7)`, never `text.primary`/`text.secondary`.
- Respect `@media (prefers-reduced-motion: reduce)` for hover-lift transforms.
- Data flow (TanStack Query `['images']`, `addPhoto`/`editPhoto` mutations) and `src/api/images` are unchanged — styling + prop-threading only.

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `src/components/images/ImageThumbnail.tsx` | Modify | The Prism tile: surface, hover-lift, selected accent, filename/`w×h` overlay; new `name` prop. |
| `src/components/images/ImageThumbnail.test.tsx` | Modify | Overlay filename + dims assertions (existing 4 tests unchanged). |
| `src/components/images/DropTile.tsx` | Create | The Prism drop-tile upload affordance (dashed tile wrapping a hidden file input). |
| `src/components/images/DropTile.test.tsx` | Create | Fires `onAdd`; uploading state disables input. |
| `src/components/images/ImageBrowser.tsx` | Modify | Thread `name` to tiles; render `DropTile` first in the grid + empty state (edit only); drop the edit-mode toolbar button; keep select-mode `SelectButton`. |
| `src/components/images/ImageBrowser.test.tsx` | Modify | Edit-mode drop-tile; select-mode reuse guard (no drop-tile, Insert present). |
| `src/pages/ImageManagerPage.tsx` | Modify | Wrap body in `PrismThemeProvider`; Prism page header. |
| `src/pages/ImageManagerPage.test.tsx` | Modify | Eyebrow renders (existing heading test unchanged). |
| `src/components/images/ImageBrowser.stories.tsx` | Modify | Add a `PrismThemeProvider`-wrapped (dark) variant beside the existing light one — the visual reuse proof. |

**Free re-skin — NO code change (do not touch):** `EditorPanel.tsx`, `FullImageCard.tsx`, `VersionSelector.tsx`, and `ImageBrowser`'s detail panel / resize handle / mobile modal already read `background.paper`/`divider`/`primary.main`, so they render dark under the Prism theme automatically. The optional mono-label polish on `EditorPanel` is deferred (cosmetic, weakly testable — YAGNI). Task 5 verifies these re-skin correctly.

---

### Task 1: `ImageThumbnail` → Prism tile

**Files:**
- Modify: `src/components/images/ImageThumbnail.tsx`
- Test: `src/components/images/ImageThumbnail.test.tsx`

**Interfaces:**
- Produces: `ImageThumbnailProps` gains `name?: string` (filename for the overlay). The component reads `image.width`/`image.height` (on the passed `ImageVersion`) for the `w×h` meta. Existing props (`image`, `authToken`, `onClick`, `selected`) unchanged. Renders `.placeholder` container and an `<img>` with `objectFit: cover` as today.

- [ ] **Step 1: Write the failing tests**

Add to `src/components/images/ImageThumbnail.test.tsx` — and change its import line 3 to include `screen`:

```tsx
import { render, screen } from '@testing-library/react';
```

Append inside the `describe`:

```tsx
it('shows the filename and dimensions in the overlay', () => {
  render(<ImageThumbnail image={mockImage} name="sunset.jpg" />);
  expect(screen.getByText('sunset.jpg')).toBeTruthy();
  expect(screen.getByText('100×100')).toBeTruthy(); // mockImage is 100×100
});

it('omits the dimensions when the version lacks width/height', () => {
  render(<ImageThumbnail image={{ src: 'x' }} name="doc.png" />);
  expect(screen.getByText('doc.png')).toBeTruthy();
  expect(screen.queryByText(/×/)).toBeNull();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/images/ImageThumbnail.test.tsx`
Expected: FAIL — no overlay text (`name` not rendered yet).

- [ ] **Step 3: Rewrite `ImageThumbnail.tsx`**

Replace the file with:

```tsx
import React from 'react';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ImageVersion } from '@/types/image';
import { useAuthorizedImage } from './useAuthorizedImage';

export interface ImageThumbnailProps {
  image: ImageVersion;
  authToken?: string | null;
  onClick?: () => void;
  selected?: boolean;
  /** Filename shown in the hover/focus overlay. */
  name?: string;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  image,
  authToken = null,
  onClick,
  selected = false,
  name,
}) => {
  const { containerRef, src } = useAuthorizedImage(image.src, authToken, {
    lazy: true,
    rootMargin: '50px',
  });
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const settle = tokens?.motion.easing.springSettle ?? 'ease';
  const durBase = tokens?.motion.duration.base ?? 250;
  const radius = theme.shape.borderRadius;

  const dims = image.width && image.height ? `${image.width}×${image.height}` : undefined;

  return (
    <Box
      ref={containerRef}
      className="placeholder"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      sx={{
        position: 'relative',
        aspectRatio: '1 / 1',
        width: '100%',
        borderRadius: `${radius}px`,
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        boxShadow: selected
          ? `0 0 0 1px ${theme.palette.primary.main}, 0 0 14px ${alpha(theme.palette.primary.main, 0.35)}`
          : 'none',
        transition: `transform ${durBase}ms ${settle}, border-color ${durBase}ms, box-shadow ${durBase}ms`,
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          borderColor: selected ? 'primary.main' : 'text.disabled',
          boxShadow: theme.shadows[6],
        },
        '&:hover .thumbOverlay, &:focus-visible .thumbOverlay': {
          opacity: 1,
          transform: 'none',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '-1px',
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' },
        },
      }}
    >
      {src && (
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {name && (
        <Box
          className="thumbOverlay"
          sx={{
            position: 'absolute',
            insetInline: 0,
            bottom: 0,
            px: 1,
            pt: 2.5,
            pb: 0.75,
            background: `linear-gradient(transparent, ${alpha(theme.palette.common.black, 0.85)})`,
            opacity: 0,
            transform: 'translateY(6px)',
            transition: `opacity ${durBase}ms, transform ${durBase}ms ${settle}`,
            pointerEvents: 'none',
          }}
        >
          <Box
            sx={{
              fontFamily: mono,
              fontSize: '10.5px',
              fontWeight: 600,
              color: 'common.white',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Box>
          {dims && (
            <Box sx={{ fontFamily: mono, fontSize: '10px', color: alpha(theme.palette.common.white, 0.7) }}>
              {dims}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/images/ImageThumbnail.test.tsx`
Expected: PASS — all 6 tests (4 existing + 2 new). The existing `ImageThumbnail.extra.test.tsx` (img/`.placeholder`/fetch/`objectFit`) also still passes; run it too:
Run: `npm test -- src/components/images/ImageThumbnail.extra.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/images/ImageThumbnail.tsx src/components/images/ImageThumbnail.test.tsx
git commit -m "feat(images): Prism tile treatment for ImageThumbnail (hover-lift + filename overlay)"
```

---

### Task 2: `DropTile` component

**Files:**
- Create: `src/components/images/DropTile.tsx`
- Test: `src/components/images/DropTile.test.tsx`

**Interfaces:**
- Produces: `DropTile` with `DropTileProps { onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void; isUploading?: boolean }`. Renders a `<label>` (square, dashed) wrapping a hidden `<input type="file" accept="image/*" multiple>`; `data-testid="drop-tile"`; label text "Add photo" / "Uploading…". Consumed by Task 3.

- [ ] **Step 1: Write the failing tests**

Create `src/components/images/DropTile.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropTile } from './DropTile';

describe('DropTile', () => {
  it('renders the add-photo affordance', () => {
    render(<DropTile onAdd={() => {}} />);
    expect(screen.getByText('Add photo')).toBeTruthy();
  });

  it('fires onAdd when files are chosen', () => {
    const onAdd = vi.fn();
    const { container } = render(<DropTile onAdd={onAdd} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'a.png', { type: 'image/png' })] },
    });
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('shows the uploading state and disables the input', () => {
    const { container } = render(<DropTile onAdd={() => {}} isUploading />);
    expect(screen.getByText('Uploading…')).toBeTruthy();
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/components/images/DropTile.test.tsx`
Expected: FAIL — `DropTile` does not exist (module not found).

- [ ] **Step 3: Create `DropTile.tsx`**

```tsx
import React from 'react';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export interface DropTileProps {
  onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
}

/** The Prism upload affordance: a dashed square tile wrapping a hidden file
 *  input. Token-driven so it renders correctly under both the Prism dark theme
 *  and a light theme. */
export const DropTile: React.FC<DropTileProps> = ({ onAdd, isUploading = false }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const settle = tokens?.motion.easing.springSettle ?? 'ease';
  const durBase = tokens?.motion.duration.base ?? 250;
  const radius = theme.shape.borderRadius;

  return (
    <Box
      component="label"
      data-testid="drop-tile"
      sx={{
        aspectRatio: '1 / 1',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75,
        borderRadius: `${radius}px`,
        border: '1.5px dashed',
        borderColor: 'divider',
        color: 'text.secondary',
        cursor: isUploading ? 'default' : 'pointer',
        textAlign: 'center',
        px: 1,
        opacity: isUploading ? 0.6 : 1,
        transition: `border-color ${durBase}ms, color ${durBase}ms, background-color ${durBase}ms`,
        '&:hover': isUploading
          ? {}
          : {
              borderColor: 'primary.main',
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.12),
            },
        '& svg': { transition: `transform ${durBase}ms ${settle}` },
        '&:hover svg': isUploading ? {} : { transform: 'translateY(-2px)' },
        '@media (prefers-reduced-motion: reduce)': { '&:hover svg': { transform: 'none' } },
      }}
    >
      <AddPhotoAlternateIcon sx={{ fontSize: 22 }} />
      <Box
        component="span"
        sx={{
          fontFamily: mono,
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {isUploading ? 'Uploading…' : 'Add photo'}
      </Box>
      <input type="file" accept="image/*" hidden multiple disabled={isUploading} onChange={onAdd} />
    </Box>
  );
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/images/DropTile.test.tsx`
Expected: PASS (3/3).

- [ ] **Step 5: Commit**

```bash
git add src/components/images/DropTile.tsx src/components/images/DropTile.test.tsx
git commit -m "feat(images): add Prism DropTile upload affordance"
```

---

### Task 3: Wire tiles + drop-tile into `ImageBrowser` (and keep the picker light)

**Files:**
- Modify: `src/components/images/ImageBrowser.tsx`
- Test: `src/components/images/ImageBrowser.test.tsx`

**Interfaces:**
- Consumes: `ImageThumbnail` `name` prop (Task 1), `DropTile` (Task 2).
- Behavior: in `mode="edit"` the grid renders a leading `DropTile` (and the empty state renders it); the edit-mode toolbar "Add new photo" button is removed. `mode="select"` renders no `DropTile` and keeps the "Insert image" `SelectButton`. Each `ImageThumbnail` receives `name={image.name}`.

- [ ] **Step 1: Update the tests (edit-mode drop-tile + select-mode reuse guard)**

In `src/components/images/ImageBrowser.test.tsx`, replace the existing test at lines 112–115 (`renders in edit mode with add photo button`) with:

```tsx
it('renders the drop-tile in edit mode', () => {
  render(<ImageBrowser images={mockImages} mode="edit" />);
  expect(screen.getByTestId('drop-tile')).toBeTruthy();
  expect(screen.getByText('Add photo')).toBeTruthy();
});

it('does not render the drop-tile in select mode (picker stays edit-affordance-free)', () => {
  render(
    <ImageBrowser images={mockImages} mode="select" photoManager={{ selectPhoto: vi.fn() }} />,
  );
  expect(screen.queryByTestId('drop-tile')).toBeNull();
  expect(screen.getByText('Insert image')).toBeTruthy();
});
```

- [ ] **Step 2: Run tests to verify the drop-tile test fails**

Run: `npm test -- src/components/images/ImageBrowser.test.tsx`
Expected: FAIL — `getByTestId('drop-tile')` not found (drop-tile not wired yet). The select-mode guard already passes (no drop-tile exists), and the `.placeholder`-count test still passes (3 image tiles).

- [ ] **Step 3: Wire `ImageBrowser.tsx`**

Make these edits:

(a) Add imports near the existing image-component imports:
```tsx
import { DropTile } from './DropTile';
```
Remove the now-unused `AddPhotoAlternateIcon` import if `NewPhotoButton` is deleted (see (c)).

(b) Replace the `toolbar` definition (currently branching edit/select) with a select-only toolbar — the edit affordance now lives in the grid:
```tsx
// ── Toolbar (select mode only — edit uses the in-grid DropTile) ──────────────
const toolbar =
  mode === 'select' ? (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <SelectButton selectPhoto={selectPhoto} src={selectedVersion?.src ?? ''} />
    </Box>
  ) : null;
```

(c) Delete the `NewPhotoButton` component definition (lines ~36–49) — it is no longer used. Keep `SelectButton`.

(d) In the empty state (`if (images.length === 0)`), render the drop-tile for edit mode:
```tsx
if (images.length === 0) {
  return (
    <Box>
      {toolbar}
      {mode === 'edit' ? (
        <Box sx={{ maxWidth: 240, display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
          <DropTile addPhoto={addPhoto} isUploading={isUploading} />
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            No photos yet — add your first.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            color: 'text.secondary',
          }}
        >
          <Typography variant="body1">No photos yet.</Typography>
        </Box>
      )}
    </Box>
  );
}
```
Note: `DropTile`'s prop is `onAdd`; call it `addPhoto={addPhoto}` only if you rename the prop. To match Task 2's interface exactly, pass `onAdd={addPhoto}`. Use `onAdd={addPhoto}` in both the empty state and the grid.

(e) In the `gallery` grid, prepend the drop-tile for edit mode and thread `name`:
```tsx
const gallery = (
  <Box
    data-testid="image-gallery"
    sx={{
      flex: 1,
      minWidth: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))',
      gap: 1,
      p: 1,
      alignContent: 'start',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}
  >
    {mode === 'edit' && <DropTile onAdd={addPhoto} isUploading={isUploading} />}
    {images.map((image, index) => (
      <ImageThumbnail
        key={image.name ?? index}
        image={image.versions?.thumbnail ?? defaultImage}
        name={image.name}
        authToken={authToken}
        selected={index === selectedImageIndex}
        onClick={() => selectTile(index)}
      />
    ))}
  </Box>
);
```

(Correct the empty-state call from step (d) to `onAdd={addPhoto}`.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/components/images/ImageBrowser.test.tsx`
Expected: PASS — drop-tile present in edit, absent in select, "Insert image" present in select; the `.placeholder`-count test still sees exactly `mockImages.length` image tiles (the drop-tile has no `.placeholder` class); arrow-key/resize tests unaffected.

- [ ] **Step 5: Commit**

```bash
git add src/components/images/ImageBrowser.tsx src/components/images/ImageBrowser.test.tsx
git commit -m "feat(images): grid drop-tile in edit mode, filename overlays; keep select picker light"
```

---

### Task 4: Wrap `ImageManagerPage` in Prism + Prism header

**Files:**
- Modify: `src/pages/ImageManagerPage.tsx`
- Test: `src/pages/ImageManagerPage.test.tsx`

**Interfaces:**
- Consumes: `PrismThemeProvider` from `src/components/prism` (children-only; pins the subtree to Prism dark).
- Behavior: page body renders under Prism-dark; a mono eyebrow "IMAGES" sits above the "Image Manager" title.

- [ ] **Step 1: Write the failing test**

Add to `src/pages/ImageManagerPage.test.tsx` inside the `describe`:

```tsx
it('renders the Prism eyebrow above the title', () => {
  render(<ImageManagerPage />, { wrapper: Wrapper });
  expect(screen.getByText('IMAGES')).toBeTruthy();
  expect(screen.getByText('Image Manager')).toBeTruthy();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/ImageManagerPage.test.tsx`
Expected: FAIL — no "IMAGES" eyebrow yet. (Existing `renders heading` test still passes.)

- [ ] **Step 3: Edit `ImageManagerPage.tsx`**

Add the import:
```tsx
import { PrismThemeProvider } from '../components/prism';
```

Replace the returned tree's content region — wrap everything below `NavBar` in `PrismThemeProvider` and swap the bare `Typography` for the Prism header:

```tsx
return (
  <Box sx={{ minHeight: '100vh' }}>
    <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
    <PrismThemeProvider>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', p: '10px' }}>
        <Box sx={{ mb: 2 }}>
          <Box
            component="p"
            sx={(t) => ({
              m: 0,
              fontFamily: t.tokens?.typography.mono ?? 'monospace',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'primary.main',
            })}
          >
            IMAGES
          </Box>
          <Typography
            component="h1"
            sx={(t) => ({
              m: 0,
              mt: 0.5,
              fontFamily: t.tokens?.typography.mono ?? 'monospace',
              fontWeight: 700,
              fontSize: '1.6rem',
              letterSpacing: '-0.01em',
            })}
          >
            Image Manager
          </Typography>
        </Box>

        {isLoading && <LoadingScreen />}

        {!isLoading && (
          <ImageBrowser
            images={images}
            authToken={token ?? null}
            mode="edit"
            photoManager={{
              addPhoto: (e) => addPhotoMutation.mutate(e),
              editPhoto: (payload) => editPhotoMutation.mutate(payload),
              isUploading: addPhotoMutation.isPending,
              isSaving: editPhotoMutation.isPending,
            }}
          />
        )}
      </Box>
    </PrismThemeProvider>

    {notification && (
      <Snackbar key={notification.key} message={notification.message} level={notification.level} />
    )}
  </Box>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/ImageManagerPage.test.tsx`
Expected: PASS — both existing tests and the new eyebrow test.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ImageManagerPage.tsx src/pages/ImageManagerPage.test.tsx
git commit -m "feat(images): mount Prism theme + Prism header on ImageManagerPage"
```

---

### Task 5: Verification + Storybook reuse proof

**Files:**
- Modify: `src/components/images/ImageBrowser.stories.tsx`

**Interfaces:** none (visual + gate verification).

- [ ] **Step 1: Add a Prism-dark story beside the light one**

In `src/components/images/ImageBrowser.stories.tsx`, add a `PrismThemeProvider`-wrapped story (mirroring the file's existing story shape and mock images), so the workbench shows the Prism-dark grid next to the light default (the visual reuse proof). Example export to add:

```tsx
import { PrismThemeProvider } from '../prism';

export const Prism = {
  render: () => (
    <PrismThemeProvider>
      <div style={{ padding: 16 }}>
        {/* reuse the same args/images the default story uses */}
        <ImageBrowser images={sampleImages} mode="edit" />
      </div>
    </PrismThemeProvider>
  ),
};
```
(Use the story file's existing sample-images binding for `sampleImages`; if the default story defines images inline, lift them to a shared `const` first.)

- [ ] **Step 2: Visual QA in Storybook**

Run: `npm run storybook`
Confirm **Image Manager / ImageBrowser**: the **Prism** story shows dark `#10151E`-family tiles on the dark plane, hairline borders, hover-lift + filename/`w×h` overlay, the accent drop-tile, and a dark detail panel; the **default (light)** story stays light with **no** dark styling and no drop-tile in select mode. Stop `storybook` when confirmed.

- [ ] **Step 3: Full CI gate**

Run: `npm run ci`
Expected: typecheck clean, lint clean (no `no-restricted-syntax` violations — all colors via palette/tokens/`alpha`), full Vitest suite green.

- [ ] **Step 4: Drive the surfaces (best-effort — needs backend/auth for live data)**

If the backend/preview is available, load `/images` (Prism-dark grid, upload via drop-tile, select a tile → dark detail panel/editor) and open the article editor's image picker (`RichTextEditor`) to confirm it is **still light**. If no backend this session, note it deferred (the select-mode light path is covered by Task 3's reuse guard + the Storybook light story).

- [ ] **Step 5: Commit**

```bash
git add src/components/images/ImageBrowser.stories.tsx
git commit -m "test(images): Storybook Prism-dark vs light reuse proof for ImageBrowser"
```

---

## Self-Review

**Spec coverage:**
- *PrismThemeProvider wrap + Prism header* → Task 4. ✓
- *ImageThumbnail → Prism tile (square, hover-lift, filename/`w×h` overlay, accent selected)* → Task 1; overlay text pinned fixed-light per the scrim-contrast fix. ✓
- *Drop-tile replaces the Add-photo button (edit + empty state); select keeps Insert* → Tasks 2–3. ✓
- *Token-driven, reuse-safe (picker stays light)* → constraint honored (no `prism/*` in `images/*`, all colors via palette/tokens); enforced by Task 3's select-mode guard + Task 5's light story. ✓
- *Detail panel / EditorPanel / FullImageCard / VersionSelector re-skin free* → stated as no-change; Task 5 verifies. ✓ (mono-label polish deferred — documented.)
- *Testing: overlay, drop-tile, reuse guard, page-under-Prism, existing tests pass, stories* → Tasks 1–5. ✓

**Placeholder scan:** every code step is complete; commands have expected pass/fail. The only softness is Task 5 Step 1's `sampleImages` binding, which is explicitly instructed to reuse the story file's existing images (adapt to the real binding name). No TBD/TODO.

**Type consistency:** `DropTile` prop is `onAdd` everywhere it's used (Task 3 grid + empty state); `ImageThumbnail` gains `name?: string` used consistently; `PrismThemeProvider` is children-only.

**Scope:** single surface (`/images` + its image components), focused for one plan. `EditorPanel`/`FullImageCard`/`VersionSelector`/`RichTextEditor` explicitly untouched.
