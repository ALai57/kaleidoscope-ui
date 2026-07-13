# Image Manager Grid Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the image manager's infinite horizontal thumbnail strip with a responsive wrapping grid plus a persistent detail panel, and render the detail image at its natural size instead of upscaling a thumbnail.

**Architecture:** `ImageBrowser` becomes a master–detail layout: a CSS-grid gallery (wraps, scrolls vertically) on the left and a detail panel (large image + `EditorPanel`) on the right; on narrow screens the panel becomes a modal. A new `useAuthorizedImage` hook centralizes the authorized-fetch + lazy-load + object-URL lifecycle that three components duplicated today, and fixes an object-URL leak. Tiles and the detail image render as plain `<img>` (MUI `Card`/`CardMedia` wrappers dropped).

**Tech Stack:** React 18 + TypeScript, MUI 6 (`Box`/`Modal` for layout only), Vitest + Testing Library + jsdom.

## Global Constraints

- Node 22; install with `npm ci` (`.npmrc`: `legacy-peer-deps=true`, `engine-strict=true`).
- Import from `@/…` (aliased to `src/`).
- **Plain `<img>`**, not MUI `CardMedia`/`Card`/`CardActionArea`, for the tile and detail image (the app may migrate off MUI).
- The critical `object-fit` value goes on the img's **inline `style`** (so it is unit-testable in jsdom); layout/spacing use MUI `sx` with theme tokens (`primary.main`, `divider`, `background.default`, `background.paper`) — no hardcoded colors.
- Tests are **co-located** as `*.test.tsx` next to source; mock the authorized image `fetch` globally (jsdom).
- Run `npm run ci` (typecheck + lint + test) before finishing.
- Commit messages: clear, concise summary of the change.
- Do not touch `ImageCard.tsx` (legacy, referenced only by its own tests/stories; not rendered in the app).

---

### Task 1: `useAuthorizedImage` hook

**Files:**
- Create: `src/components/images/useAuthorizedImage.ts`
- Test: `src/components/images/useAuthorizedImage.test.tsx`

**Interfaces:**
- Consumes: nothing (leaf).
- Produces:
  ```ts
  interface UseAuthorizedImageOptions { lazy?: boolean; rootMargin?: string; }
  interface UseAuthorizedImageResult {
    containerRef: React.RefObject<HTMLDivElement>;
    src: string | undefined;                       // object URL once loaded
    inView: boolean;
    status: 'idle' | 'loading' | 'loaded' | 'error';
  }
  function useAuthorizedImage(
    url: string | undefined,
    token: string | null,
    options?: UseAuthorizedImageOptions,
  ): UseAuthorizedImageResult
  ```
  Consumers attach `containerRef` to an always-rendered wrapper (needed for the lazy observer) and render `<img src={src} …>` once `src` is set.

- [ ] **Step 1: Write the failing test**

Create `src/components/images/useAuthorizedImage.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useAuthorizedImage } from './useAuthorizedImage';

// No-op observer: never auto-fires, so lazy hooks stay "not in view".
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_cb: IntersectionObserverCallback) {}
}

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  mockFetch.mockResolvedValue({ blob: () => Promise.resolve(new Blob()) } as Response);
  vi.stubGlobal('fetch', mockFetch);
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
});

describe('useAuthorizedImage', () => {
  it('fetches immediately when not lazy and returns an object URL', async () => {
    const { result } = renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok'));
    await waitFor(() => expect(result.current.src).toBe('blob:mock-url'));
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('sends the bearer token in the Authorization header', async () => {
    const { result } = renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok'));
    await waitFor(() => expect(result.current.src).toBe('blob:mock-url'));
    const init = mockFetch.mock.calls[0][1] as RequestInit;
    expect((init.headers as Headers).get('Authorization')).toBe('Bearer tok');
  });

  it('does not fetch until in view when lazy', async () => {
    renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok', { lazy: true }));
    await act(async () => { await Promise.resolve(); });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('revokes the object URL on unmount', async () => {
    const revokeSpy = vi.spyOn(URL, 'revokeObjectURL');
    const { result, unmount } = renderHook(() => useAuthorizedImage('https://x/img.jpg', 'tok'));
    await waitFor(() => expect(result.current.src).toBe('blob:mock-url'));
    unmount();
    expect(revokeSpy).toHaveBeenCalledWith('blob:mock-url');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/images/useAuthorizedImage.test.tsx`
Expected: FAIL — cannot resolve `./useAuthorizedImage`.

- [ ] **Step 3: Write the hook**

Create `src/components/images/useAuthorizedImage.ts`:

```ts
import React from 'react';

export interface UseAuthorizedImageOptions {
  /** Defer the fetch until the container scrolls into view. Default false. */
  lazy?: boolean;
  /** IntersectionObserver rootMargin when lazy. Default '50px'. */
  rootMargin?: string;
}

export interface UseAuthorizedImageResult {
  containerRef: React.RefObject<HTMLDivElement>;
  src: string | undefined;
  inView: boolean;
  status: 'idle' | 'loading' | 'loaded' | 'error';
}

async function fetchWithAuthentication(url: string, token: string | null): Promise<Response> {
  const headers = new Headers();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(url, { headers });
}

/**
 * Fetches a protected image with a Bearer token, exposes the resulting object
 * URL, and owns its lifecycle — revoking on unmount and on url/token change
 * (the old per-component code revoked only on img.onload, leaking on unmount).
 * When `lazy`, defers the fetch until the container intersects the viewport.
 */
export function useAuthorizedImage(
  url: string | undefined,
  token: string | null,
  options: UseAuthorizedImageOptions = {},
): UseAuthorizedImageResult {
  const { lazy = false, rootMargin = '50px' } = options;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(!lazy);
  const [src, setSrc] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<UseAuthorizedImageResult['status']>('idle');

  // Lazy: observe the container and flip inView on first intersection.
  React.useEffect(() => {
    if (!lazy) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, rootMargin]);

  // Fetch once in view; own the object URL.
  React.useEffect(() => {
    if (!inView || !url) return;
    let cancelled = false;
    let objectUrl: string | undefined;
    setStatus('loading');
    fetchWithAuthentication(url, token)
      .then((res) => res.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
        setStatus('loaded');
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setStatus('error');
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [inView, url, token]);

  return { containerRef, src, inView, status };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/images/useAuthorizedImage.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/images/useAuthorizedImage.ts src/components/images/useAuthorizedImage.test.tsx
git commit -m "feat(images): add useAuthorizedImage hook for lazy authorized image loading"
```

---

### Task 2: `ImageThumbnail` → square tile on the hook

**Files:**
- Modify: `src/components/images/ImageThumbnail.tsx` (full rewrite)
- Modify: `src/components/images/ImageThumbnail.extra.test.tsx` (add assertions)

**Interfaces:**
- Consumes: `useAuthorizedImage(url, token, { lazy: true })` from Task 1.
- Produces: `ImageThumbnail` with props `{ image: ImageVersion; authToken?: string | null; onClick?: () => void; selected?: boolean }`. Renders a wrapper with class `placeholder` (kept for existing tests) and, once loaded, a plain `<img>` with inline `objectFit: 'cover'`.

- [ ] **Step 1: Write the failing assertion**

In `src/components/images/ImageThumbnail.extra.test.tsx`, add this test inside the existing `describe` block (keep the existing `TriggerableIntersectionObserver` + fetch mocks at the top of the file):

```tsx
  it('renders a square img with object-fit cover once loaded', async () => {
    await act(async () => {
      render(<ImageThumbnail image={mockImage} />);
    });
    const img = document.querySelector('img') as HTMLImageElement | null;
    expect(img).toBeTruthy();
    expect(img?.style.objectFit).toBe('cover');
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/images/ImageThumbnail.extra.test.tsx`
Expected: FAIL — current `CardMedia` img has no inline `object-fit: cover`.

- [ ] **Step 3: Rewrite the component**

Replace the entire contents of `src/components/images/ImageThumbnail.tsx`:

```tsx
import React from 'react';
import { Box } from '@mui/material';
import { ImageVersion } from '@/types/image';
import { useAuthorizedImage } from './useAuthorizedImage';

export interface ImageThumbnailProps {
  image: ImageVersion;
  authToken?: string | null;
  onClick?: () => void;
  selected?: boolean;
}

export const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  image,
  authToken = null,
  onClick,
  selected = false,
}) => {
  const { containerRef, src } = useAuthorizedImage(image.src, authToken, {
    lazy: true,
    rootMargin: '50px',
  });

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
        aspectRatio: '1 / 1',
        width: '100%',
        borderRadius: 1,
        overflow: 'hidden',
        cursor: 'pointer',
        bgcolor: 'action.hover',
        outline: selected ? '3px solid' : '1px solid',
        outlineColor: selected ? 'primary.main' : 'divider',
        outlineOffset: '-1px',
        '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main' },
      }}
    >
      {src && (
        <img
          src={src}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </Box>
  );
};
```

- [ ] **Step 4: Run the thumbnail tests to verify they pass**

Run: `npx vitest run src/components/images/ImageThumbnail.test.tsx src/components/images/ImageThumbnail.extra.test.tsx`
Expected: PASS. (The basic test uses a no-op observer so no img renders — it only asserts `.placeholder`, still present; the extra test's triggerable observer loads the img.)

- [ ] **Step 5: Commit**

```bash
git add src/components/images/ImageThumbnail.tsx src/components/images/ImageThumbnail.extra.test.tsx
git commit -m "feat(images): render ImageThumbnail as a square tile via useAuthorizedImage"
```

---

### Task 3: `FullImageCard` → natural size, `object-fit: contain`

**Files:**
- Modify: `src/components/images/FullImageCard.tsx` (full rewrite)
- Modify: `src/components/images/FullImageCard.test.tsx` (full rewrite)

**Interfaces:**
- Consumes: `useAuthorizedImage(url, token, { lazy: false })` from Task 1.
- Produces: `FullImageCard` with props `{ image: ImageVersion; authToken?: string | null; onClick?: () => void }`. Renders, once loaded, `<img id="full-<src>">` with inline `objectFit: 'contain'`, `maxWidth/maxHeight: '100%'`, `width/height: 'auto'`.

- [ ] **Step 1: Rewrite the failing test**

Replace the entire contents of `src/components/images/FullImageCard.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { FullImageCard } from './FullImageCard';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({ blob: () => Promise.resolve(new Blob()) } as Response),
  );
  vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
  vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
});

const mockImage = { src: 'https://example.com/full.jpg', width: 800, height: 600 };

describe('FullImageCard', () => {
  it('renders the image at natural size with object-fit contain', async () => {
    await act(async () => {
      render(<FullImageCard image={mockImage} authToken="tok" />);
    });
    const img = document.getElementById('full-' + mockImage.src) as HTMLImageElement | null;
    expect(img).toBeTruthy();
    expect(img?.style.objectFit).toBe('contain');
    expect(img?.getAttribute('src')).toBe('blob:mock-url');
  });

  it('fetches the image with the auth token', async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    await act(async () => {
      render(<FullImageCard image={mockImage} authToken="tok" />);
    });
    expect(fetchMock).toHaveBeenCalled();
  });

  it('renders without a src without crashing', () => {
    const { container } = render(<FullImageCard image={{ src: '' }} />);
    expect(container).toBeDefined();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/images/FullImageCard.test.tsx`
Expected: FAIL — current img has no inline `object-fit: contain`, and the img is present synchronously rather than after load.

- [ ] **Step 3: Rewrite the component**

Replace the entire contents of `src/components/images/FullImageCard.tsx`:

```tsx
import React from 'react';
import { Box } from '@mui/material';
import { ImageVersion } from '@/types/image';
import { useAuthorizedImage } from './useAuthorizedImage';

export interface FullImageCardProps {
  image: ImageVersion;
  authToken?: string | null;
  onClick?: () => void;
}

export const FullImageCard: React.FC<FullImageCardProps> = ({
  image,
  authToken = null,
  onClick,
}) => {
  const { src } = useAuthorizedImage(image.src, authToken, { lazy: false });

  return (
    <Box
      onClick={onClick}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {src && (
        <img
          id={`full-${image.src}`}
          src={src}
          alt=""
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      )}
    </Box>
  );
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/images/FullImageCard.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/images/FullImageCard.tsx src/components/images/FullImageCard.test.tsx
git commit -m "fix(images): render FullImageCard at natural size with object-fit contain"
```

---

### Task 4: `ImageBrowser` → grid gallery + detail panel

**Files:**
- Modify: `src/components/images/ImageBrowser.tsx` (rewrite layout; keep toolbar, modes, empty state, keyboard nav)
- Modify: `src/components/images/ImageBrowser.test.tsx` (add grid + selection tests)

**Interfaces:**
- Consumes: `ImageThumbnail` (with `selected`) from Task 2, `FullImageCard` from Task 3, existing `EditorPanel`.
- Produces: unchanged public props (`ImageBrowserProps`, `PhotoManager`). Gallery `<Box data-testid="image-gallery">` contains one `ImageThumbnail` (`.placeholder`) per image.

- [ ] **Step 1: Write the failing tests**

In `src/components/images/ImageBrowser.test.tsx`, add these two tests inside the existing `describe('ImageBrowser', …)` block (keep existing mocks and the seven existing tests):

```tsx
  it('renders one tile per image in the gallery', () => {
    const { container, getByTestId } = render(<ImageBrowser images={mockImages} />);
    expect(getByTestId('image-gallery')).toBeTruthy();
    expect(container.querySelectorAll('.placeholder').length).toBe(mockImages.length);
  });

  it('selects an image when its tile is clicked', () => {
    const { container } = render(<ImageBrowser images={mockImages} startingImage={0} />);
    const tiles = container.querySelectorAll('.placeholder');
    fireEvent.click(tiles[2]);
    expect(screen.queryByDisplayValue('Photo 3')).toBeTruthy();
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/images/ImageBrowser.test.tsx`
Expected: FAIL — no element with `data-testid="image-gallery"` yet.

- [ ] **Step 3: Rewrite the component**

Replace the entire contents of `src/components/images/ImageBrowser.tsx`:

```tsx
import React from 'react';
import { Box, Button, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { alpha } from '@mui/material/styles';
import { Image, ImageVersion } from '@/types/image';
import { FullImageCard } from './FullImageCard';
import { ImageThumbnail } from './ImageThumbnail';
import { EditorPanel, EditPhotoPayload } from './EditorPanel';

export interface PhotoManager {
  addPhoto?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editPhoto?: (payload: EditPhotoPayload) => void;
  selectPhoto?: (src: string) => void;
  isUploading?: boolean;
  isSaving?: boolean;
}

export interface ImageBrowserProps {
  images: Image[];
  authToken?: string | null;
  startingImage?: number;
  photoManager?: PhotoManager;
  mode?: 'edit' | 'select';
}

const defaultImage: ImageVersion = { src: '' };

const defaultLogger = (e: React.ChangeEvent<HTMLInputElement>) =>
  console.log('Clicked!', e.target.files);

const NewPhotoButton: React.FC<{
  addPhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading?: boolean;
}> = ({ addPhoto, isUploading = false }) => (
  <Button
    variant="contained"
    startIcon={<AddPhotoAlternateIcon sx={{ fontSize: 20 }} />}
    component="label"
    disabled={isUploading}
  >
    {isUploading ? 'Uploading…' : 'Add new photo'}
    <input accept="image/*" type="file" hidden onChange={addPhoto} multiple disabled={isUploading} />
  </Button>
);

const SelectButton: React.FC<{ selectPhoto: (src: string) => void; src: string }> = ({
  selectPhoto,
  src,
}) => (
  <Button variant="contained" onClick={() => selectPhoto(src)}>
    Insert image
  </Button>
);

export const ImageBrowser: React.FC<ImageBrowserProps> = ({
  images,
  authToken = null,
  startingImage = 0,
  photoManager = {},
  mode = 'edit',
}) => {
  const {
    addPhoto = defaultLogger,
    editPhoto = () => {},
    selectPhoto = () => {},
    isUploading = false,
    isSaving = false,
  } = photoManager;

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(startingImage);
  const selectedImage = images[selectedImageIndex];

  const [selectedVersion, setSelectedVersion] = React.useState<ImageVersion | undefined>(
    selectedImage?.versions?.raw ?? defaultImage,
  );

  const jumpTo = React.useCallback(
    (newIndex: number): void => {
      setSelectedImageIndex(newIndex);
      const newImage = images[newIndex];
      if (newImage) {
        setSelectedVersion(newImage.versions?.raw ?? defaultImage);
      }
    },
    [images],
  );

  const [modalOpen, setModalOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onVersionChange = (ev: SelectChangeEvent<ImageVersion>): void => {
    setSelectedVersion(ev.target.value as ImageVersion);
  };

  const focusNext = React.useCallback(
    (): void => jumpTo(Math.min(selectedImageIndex + 1, images.length - 1)),
    [jumpTo, selectedImageIndex, images.length],
  );
  const focusBack = React.useCallback(
    (): void => jumpTo(Math.max(selectedImageIndex - 1, 0)),
    [jumpTo, selectedImageIndex],
  );

  const keypressHandler = React.useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft') focusBack();
      else if (e.key === 'ArrowRight') focusNext();
    },
    [focusBack, focusNext],
  );

  React.useEffect(() => {
    window.addEventListener('keydown', keypressHandler);
    return () => window.removeEventListener('keydown', keypressHandler);
  }, [keypressHandler]);

  const selectTile = (index: number): void => {
    jumpTo(index);
    if (isMobile) setModalOpen(true);
  };

  // ── Toolbar ───────────────────────────────────────────────────────────────
  const toolbar = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      {mode === 'edit' ? (
        <NewPhotoButton addPhoto={addPhoto} isUploading={isUploading} />
      ) : (
        <SelectButton selectPhoto={selectPhoto} src={selectedVersion?.src ?? ''} />
      )}
    </Box>
  );

  // ── Empty state ─────────────────────────────────────────────────────────
  if (images.length === 0) {
    return (
      <Box>
        {toolbar}
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
          <Typography variant="body2">Upload your first one above.</Typography>
        </Box>
      </Box>
    );
  }

  // ── Gallery grid ────────────────────────────────────────────────────────
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
      {images.map((image, index) => (
        <ImageThumbnail
          key={image.name ?? index}
          image={image.versions?.thumbnail ?? defaultImage}
          authToken={authToken}
          selected={index === selectedImageIndex}
          onClick={() => selectTile(index)}
        />
      ))}
    </Box>
  );

  // ── Detail (large image + editor) ───────────────────────────────────────────
  const detailImage = (
    <Box
      sx={{
        height: 200,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        borderRadius: 1,
        overflow: 'hidden',
      }}
    >
      <FullImageCard image={selectedVersion ?? defaultImage} authToken={authToken} />
    </Box>
  );

  const editor = (showVersionSelector: boolean) => (
    <EditorPanel
      key={selectedImage?.name ?? 'none-yet'}
      mode={mode}
      selectedImage={selectedImage}
      onVersionChange={onVersionChange}
      onEditPhoto={editPhoto}
      selectedVersion={selectedVersion}
      showVersionSelector={showVersionSelector}
      isSaving={isSaving}
    />
  );

  // ── Mobile layout: grid + detail modal ──────────────────────────────────────
  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {toolbar}
        {gallery}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          slotProps={{
            backdrop: {
              sx: (t) => ({ backgroundColor: alpha(t.palette.common.black, 0.6) }),
            },
          }}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 1,
              p: 2,
              maxHeight: '90vh',
              overflowY: 'auto',
              width: 'min(400px, 92vw)',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {detailImage}
            {editor(false)}
          </Box>
        </Modal>
      </Box>
    );
  }

  // ── Desktop layout: grid + side detail panel ─────────────────────────────────
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {toolbar}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, gap: 1 }}>
        {gallery}
        <Box
          sx={{
            width: 320,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowY: 'auto',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
          }}
        >
          {detailImage}
          {editor(true)}
        </Box>
      </Box>
    </Box>
  );
};
```

- [ ] **Step 4: Run the ImageBrowser tests to verify they pass**

Run: `npx vitest run src/components/images/ImageBrowser.test.tsx`
Expected: PASS (9 tests — 7 existing + 2 new).

- [ ] **Step 5: Commit**

```bash
git add src/components/images/ImageBrowser.tsx src/components/images/ImageBrowser.test.tsx
git commit -m "feat(images): replace thumbnail strip with responsive grid + detail panel"
```

---

### Task 5: Integration verification

**Files:** none (verification only).

- [ ] **Step 1: Run the full image-component suite**

Run: `npx vitest run src/components/images src/pages/ImageManagerPage.test.tsx`
Expected: PASS. (No change to `ImageManagerPage`; its props to `ImageBrowser` are unchanged.)

- [ ] **Step 2: Typecheck, lint, full test suite**

Run: `npm run ci`
Expected: `tsc --noEmit` clean, ESLint clean, all Vitest tests pass. Fix any type/lint fallout (e.g. unused imports from the rewrites) and re-run.

- [ ] **Step 3: Manual smoke test in the app**

Start the app (`npm run dev`, backend running per CLAUDE.md) and open `/images`, authenticated. Confirm:
- The gallery is a **wrapping grid** that scrolls **vertically**; the page never scrolls sideways.
- Tiles are uniform squares; scrolling loads more (lazy) — network shows image requests with the `Authorization: Bearer …` header.
- Clicking a tile highlights it and updates the right-hand panel; a **small image shows at its natural size** (centered, not stretched/grainy).
- Editing title/description and clicking **Save** persists (toast: "Changes saved").
- **Add new photo** uploads and the grid refreshes.
- In the article editor (`RichTextEditor` insert-image), the picker still opens and **Insert image** works.
- Narrow the window below the `sm` breakpoint: the grid goes full width and tapping a tile opens the detail **modal**.

- [ ] **Step 4: Final commit (only if Step 2 required fixes)**

```bash
git add -A
git commit -m "chore(images): typecheck/lint fixes for grid redesign"
```

---

## Self-Review

**Spec coverage:**
- Responsive wrapping grid, vertical scroll → Task 4 (`gallery`). ✓
- Natural-size detail image (`object-fit: contain`) → Task 3. ✓
- Square uniform tiles → Task 2. ✓
- Lazy loading preserved → Task 1 (`lazy`) consumed by Task 2. ✓
- Authorized requests preserved → Task 1 (`fetchWithAuthentication`). ✓
- Object-URL leak fixed → Task 1 (revoke on unmount) with test. ✓
- Both `edit`/`select` modes, empty state, version selector, keyboard nav preserved → Task 4 (toolbar, empty-state, `keypressHandler`, `editor(showVersionSelector)`). ✓
- Responsive modal fallback for mobile/picker → Task 4 (`isMobile` branch). ✓
- Shared `useAuthorizedImage` hook, plain `<img>` (no `CardMedia`) → Tasks 1–3. ✓
- `ImageCard` untouched; out-of-scope items (delete/search/multi-select) not added. ✓

**Placeholder scan:** No TBD/TODO; every code step shows complete file or test content. ✓

**Type consistency:** `useAuthorizedImage(url, token, options)` signature and `UseAuthorizedImageResult` fields (`containerRef`, `src`, `inView`, `status`) are used identically in Tasks 2–3. `ImageThumbnail`'s new `selected?: boolean` prop is passed in Task 4. `FullImageCard`/`ImageThumbnail`/`ImageBrowser` public prop shapes unchanged where consumed by `ImageManagerPage` and `RichTextEditor`. ✓

**Deferred (per spec, non-blocking):** `↑/↓` grid keyboard navigation (dynamic column count; `←/→` retained); migrating the unused `ImageCard` to the hook.
