# Recipe Photo Import (UI) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a user create a recipe on the New Recipe page by uploading photo(s) of an offline source, which the backend transcribes and structures into the same reviewable draft the existing URL import produces.

**Architecture:** Two independent, self-contained recipe sources (URL, photo) sit behind a presentational chooser. Each source owns its own mutation and emits one `AcquiredDraft` value; the editor page consumes drafts through a single `applyDraft` and never learns how a draft was acquired — mirroring the backend's decomplected acquisition. Client-side input policy (pure predicate) is kept separate from a visible resize transform.

**Tech Stack:** React 18 + TypeScript, MUI 6, TanStack Query, Vitest + Testing Library + MSW, Vite. Import from `@/…` is available but the recipe code uses relative imports — match the surrounding files.

## Global Constraints

- Node 22; install with `npm ci` (`legacy-peer-deps=true`).
- Supported image types (backend's Anthropic set), copied verbatim: `image/jpeg`, `image/png`, `image/webp`, `image/gif`.
- Limits: **≤ 5 images per import**, **≤ 5 MB each** (`5 * 1024 * 1024` bytes).
- No server-side resize: the client resizes oversize images before upload, and the resize must be **visible** (never silent).
- API access only through `src/api/*`; auth only through `useAuth()`; server state through TanStack Query; UI state through local state/Zustand. No inline `fetch`.
- Wire-derived types use **snake_case** keys (the client's `kebabKeysToSnake` maps the API's kebab keys). Client-internal types (e.g. `AcquiredDraft.sourceUrl`) use camelCase, matching the page's existing `FormState`.
- The backend endpoint paths stay `/recipes/scrape` and `/recipes/scrape-photo`; only the client's function/type vocabulary changes.
- Run `npm run ci` (typecheck + lint + test) before considering the work done; each task ends green on `npm test` for the touched files.

---

## File Structure

**New files**
- `src/utils/imagePolicy.ts` — pure predicate: classify a file selection into accepted / oversize / rejected, with reasons. No mutation.
- `src/utils/imagePolicy.test.ts`
- `src/utils/resizeImage.ts` — the transform: canvas re-encode an oversize image under the byte limit, output JPEG.
- `src/utils/resizeImage.test.ts`
- `src/components/recipes/useObjectUrls.ts` — hook owning the object-URL preview lifecycle (create / revoke).
- `src/components/recipes/useObjectUrls.test.ts`
- `src/components/recipes/UrlRecipeSource.tsx` — URL text + own mutation → `onDraft`.
- `src/components/recipes/UrlRecipeSource.test.tsx`
- `src/components/recipes/PhotoRecipeSource.tsx` — drop zone, thumbnails, policy + resize, own mutation → `onDraft`.
- `src/components/recipes/PhotoRecipeSource.test.tsx`
- `src/components/recipes/RecipeSourceChooser.tsx` — presentational toggle over the two sources.
- `src/components/recipes/RecipeSourceChooser.test.tsx`

**Modified files**
- `src/types/recipe.ts` — `ScrapeResult` → `RecipeDraft` (+ `techniques`); add `AcquiredDraft`.
- `src/types/index.ts` — update the re-export list.
- `src/api/recipes.ts` — rename `scrapeRecipe` → `importRecipeFromUrl`; add `importRecipeFromPhoto`.
- `src/api/recipes.test.ts` — update mock + test names; add multipart test.
- `src/pages/RecipeEditorPage.tsx` — Task 4 adapts to the renamed names; Task 8 replaces the inline importer with `RecipeSourceChooser`.
- `src/pages/RecipeEditorPage.test.tsx` — update mocks (Task 4); add photo-import test (Task 8).

**Task order is bottom-up** so every task ends green: leaf utils/hook first (Tasks 1–3), then the type/API reshape that keeps the existing URL path working (Task 4), then the three source components (Tasks 5–7), then integration (Task 8).

---

### Task 1: `imagePolicy` — pure input predicate

**Files:**
- Create: `src/utils/imagePolicy.ts`
- Test: `src/utils/imagePolicy.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `SUPPORTED_IMAGE_TYPES: readonly string[]`
  - `MAX_IMAGES = 5`, `MAX_IMAGE_BYTES = 5 * 1024 * 1024`
  - `interface ImageRejection { file: File; reason: string }`
  - `interface ClassifiedImages { accepted: File[]; oversize: File[]; rejected: ImageRejection[] }`
  - `function checkImages(files: File[]): ClassifiedImages`
  - `function isSupportedImageType(type: string): boolean`

- [ ] **Step 1: Write the failing test**

```ts
// src/utils/imagePolicy.test.ts
import { describe, it, expect } from 'vitest';
import { checkImages, MAX_IMAGE_BYTES } from './imagePolicy';

function fakeFile(name: string, type: string, size: number): File {
  const f = new File(['x'], name, { type });
  Object.defineProperty(f, 'size', { value: size });
  return f;
}

describe('checkImages', () => {
  it('accepts supported images within the byte limit', () => {
    const ok = fakeFile('a.jpg', 'image/jpeg', 1000);
    const { accepted, oversize, rejected } = checkImages([ok]);
    expect(accepted).toEqual([ok]);
    expect(oversize).toEqual([]);
    expect(rejected).toEqual([]);
  });

  it('flags a supported image over the byte limit as oversize, not rejected', () => {
    const big = fakeFile('big.png', 'image/png', MAX_IMAGE_BYTES + 1);
    const { accepted, oversize, rejected } = checkImages([big]);
    expect(accepted).toEqual([]);
    expect(oversize).toEqual([big]);
    expect(rejected).toEqual([]);
  });

  it('rejects unsupported types with a reason', () => {
    const heic = fakeFile('photo.heic', 'image/heic', 1000);
    const { rejected } = checkImages([heic]);
    expect(rejected).toHaveLength(1);
    expect(rejected[0]?.file).toBe(heic);
    expect(rejected[0]?.reason).toMatch(/JPEG, PNG, WebP or GIF/);
  });

  it('rejects images beyond the 5-per-import cap', () => {
    const files = Array.from({ length: 6 }, (_, i) => fakeFile(`f${i}.jpg`, 'image/jpeg', 1000));
    const { accepted, oversize, rejected } = checkImages(files);
    expect(accepted.length + oversize.length).toBe(5);
    expect(rejected).toHaveLength(1);
    expect(rejected[0]?.reason).toMatch(/5 images/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/utils/imagePolicy.test.ts`
Expected: FAIL — `Failed to resolve import "./imagePolicy"`.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/utils/imagePolicy.ts

// Anthropic's supported image set — must match the backend handler's allow-list.
export const SUPPORTED_IMAGE_TYPES: readonly string[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const MAX_IMAGES = 5;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export interface ImageRejection {
  file: File;
  reason: string;
}

export interface ClassifiedImages {
  accepted: File[]; // supported type, within the byte limit
  oversize: File[]; // supported type, over the byte limit — will be resized before upload
  rejected: ImageRejection[]; // unsupported type, or beyond the per-import cap
}

export function isSupportedImageType(type: string): boolean {
  return SUPPORTED_IMAGE_TYPES.includes(type);
}

// Pure: classifies a selection. Never mutates or resizes — that is resizeImage's job.
export function checkImages(files: File[]): ClassifiedImages {
  const accepted: File[] = [];
  const oversize: File[] = [];
  const rejected: ImageRejection[] = [];
  let kept = 0;

  for (const file of files) {
    if (!isSupportedImageType(file.type)) {
      rejected.push({ file, reason: 'Unsupported type — use JPEG, PNG, WebP or GIF.' });
      continue;
    }
    if (kept >= MAX_IMAGES) {
      rejected.push({ file, reason: `Only ${MAX_IMAGES} images per import.` });
      continue;
    }
    kept += 1;
    if (file.size > MAX_IMAGE_BYTES) {
      oversize.push(file);
    } else {
      accepted.push(file);
    }
  }

  return { accepted, oversize, rejected };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/utils/imagePolicy.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/utils/imagePolicy.ts src/utils/imagePolicy.test.ts
git commit -m "feat(recipes): add pure image-selection policy for photo import"
```

---

### Task 2: `resizeImage` — the visible resize transform

**Files:**
- Create: `src/utils/resizeImage.ts`
- Test: `src/utils/resizeImage.test.ts`

**Interfaces:**
- Consumes: `MAX_IMAGE_BYTES` from `./imagePolicy`.
- Produces: `function resizeImage(file: File): Promise<File>` — returns an `image/jpeg` `File` no larger than `MAX_IMAGE_BYTES`.

**Note on testing:** jsdom does not implement `createImageBitmap` or `canvas.toBlob`, so the test stubs them. The stub returns shrinking blob sizes so the loop terminates; this verifies the loop logic, not the browser's real encoder.

- [ ] **Step 1: Write the failing test**

```ts
// src/utils/resizeImage.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resizeImage } from './resizeImage';
import { MAX_IMAGE_BYTES } from './imagePolicy';

function blobOfSize(bytes: number): Blob {
  const b = new Blob([], { type: 'image/jpeg' });
  Object.defineProperty(b, 'size', { value: bytes });
  return b;
}

let toBlobSizes: number[];

beforeEach(() => {
  // First encode is too big; second is under the limit — exercises the shrink loop.
  toBlobSizes = [MAX_IMAGE_BYTES * 2, MAX_IMAGE_BYTES - 10];
  vi.stubGlobal(
    'createImageBitmap',
    vi.fn(async () => ({ width: 4000, height: 3000, close: vi.fn() }))
  );
  HTMLCanvasElement.prototype.getContext = vi.fn(() => ({ drawImage: vi.fn() })) as never;
  HTMLCanvasElement.prototype.toBlob = function (cb: BlobCallback): void {
    const size = toBlobSizes.shift() ?? MAX_IMAGE_BYTES - 10;
    cb(blobOfSize(size));
  } as never;
});

describe('resizeImage', () => {
  it('returns a JPEG File under the byte limit', async () => {
    const big = new File(['x'], 'huge.png', { type: 'image/png' });
    Object.defineProperty(big, 'size', { value: MAX_IMAGE_BYTES * 3 });

    const out = await resizeImage(big);

    expect(out.type).toBe('image/jpeg');
    expect(out.size).toBeLessThanOrEqual(MAX_IMAGE_BYTES);
    expect(out.name).toMatch(/\.jpe?g$/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/utils/resizeImage.test.ts`
Expected: FAIL — `Failed to resolve import "./resizeImage"`.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/utils/resizeImage.ts
import { MAX_IMAGE_BYTES } from './imagePolicy';

const MAX_DIMENSION = 2048; // long-edge cap before quality reduction
const MAX_ATTEMPTS = 6;

function toJpegName(name: string): string {
  return name.replace(/\.[^./\\]+$/, '') + '.jpg';
}

function encode(bitmap: ImageBitmap, scale: number, quality: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('canvas.toBlob returned null'))),
      'image/jpeg',
      quality
    );
  });
}

// The transform kept separate from imagePolicy: only called on files the policy
// flagged oversize, and only with the user's visibility (chip + summary in the UI).
export async function resizeImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  let scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  let quality = 0.9;
  let blob = await encode(bitmap, scale, quality);

  for (let attempt = 1; attempt < MAX_ATTEMPTS && blob.size > MAX_IMAGE_BYTES; attempt++) {
    if (quality > 0.5) {
      quality -= 0.15;
    } else {
      scale *= 0.8;
    }
    blob = await encode(bitmap, scale, quality);
  }

  bitmap.close?.();
  return new File([blob], toJpegName(file.name), { type: 'image/jpeg' });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/utils/resizeImage.test.ts`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/utils/resizeImage.ts src/utils/resizeImage.test.ts
git commit -m "feat(recipes): add canvas resize transform for oversize photos"
```

---

### Task 3: `useObjectUrls` — contained preview-URL lifecycle

**Files:**
- Create: `src/components/recipes/useObjectUrls.ts`
- Test: `src/components/recipes/useObjectUrls.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `function useObjectUrls(files: File[]): string[]` — one object URL per file; revokes prior URLs when `files` changes and all URLs on unmount.

**Note on testing:** jsdom does not implement `URL.createObjectURL` / `revokeObjectURL`; the test stubs both.

- [ ] **Step 1: Write the failing test**

```ts
// src/components/recipes/useObjectUrls.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useObjectUrls } from './useObjectUrls';

beforeEach(() => {
  vi.stubGlobal(
    'URL',
    Object.assign(URL, {
      createObjectURL: vi.fn((f: File) => `blob:${f.name}`),
      revokeObjectURL: vi.fn(),
    })
  );
});

function fakeFile(name: string): File {
  return new File(['x'], name, { type: 'image/jpeg' });
}

describe('useObjectUrls', () => {
  it('creates one URL per file', () => {
    const files = [fakeFile('a.jpg'), fakeFile('b.jpg')];
    const { result } = renderHook(() => useObjectUrls(files));
    expect(result.current).toEqual(['blob:a.jpg', 'blob:b.jpg']);
  });

  it('revokes the URLs on unmount', () => {
    const files = [fakeFile('a.jpg')];
    const { unmount } = renderHook(() => useObjectUrls(files));
    unmount();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:a.jpg');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/recipes/useObjectUrls.test.ts`
Expected: FAIL — `Failed to resolve import "./useObjectUrls"`.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/components/recipes/useObjectUrls.ts
import { useEffect, useState } from 'react';

// Object URLs are a mutable place with a lifecycle, not a value. This hook owns
// that place: create one URL per file, revoke the previous set when `files`
// changes (effect cleanup), and revoke everything on unmount.
export function useObjectUrls(files: File[]): string[] {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const next = files.map((file) => URL.createObjectURL(file));
    setUrls(next);
    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return urls;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/recipes/useObjectUrls.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/useObjectUrls.ts src/components/recipes/useObjectUrls.test.ts
git commit -m "feat(recipes): add useObjectUrls hook for photo previews"
```

---

### Task 4: Types + API — retire `scrape` vocabulary, add photo import, keep URL path green

This task reshapes the shared contract and adapts the existing URL path so the whole suite stays green. It adds no new UI. The renamed type breaks `api/recipes.ts`, `RecipeEditorPage.tsx`, and both their tests until all are updated together — so they are all in this one task.

**Files:**
- Modify: `src/types/recipe.ts:45-50`
- Modify: `src/types/index.ts:6-15`
- Modify: `src/api/recipes.ts:1-11` (imports) and `:56-62` (`scrapeRecipe`)
- Modify: `src/api/recipes.test.ts` (import, mock, test)
- Modify: `src/pages/RecipeEditorPage.tsx` (imports + `applyDraft` type name)
- Modify: `src/pages/RecipeEditorPage.test.tsx` (MSW mocks)

**Interfaces:**
- Consumes: `uploadFile` from `./client` (existing).
- Produces:
  - `interface RecipeDraft { recipe: RecipeContent; suggested_labels: string[]; techniques: { acquire: string; parse: string; normalize: string }; warnings: string[] }`
  - `interface AcquiredDraft { draft: RecipeDraft; sourceUrl: string | null }`
  - `function importRecipeFromUrl(url: string, token?: string): Promise<RecipeDraft>`
  - `function importRecipeFromPhoto(files: File[], token?: string): Promise<RecipeDraft>`

- [ ] **Step 1: Update the failing tests first (api)**

In `src/api/recipes.test.ts`:

Change the import on line 10 from `scrapeRecipe` to `importRecipeFromUrl`.

Replace the `/recipes/scrape` handler (lines 52-59) with a `techniques` map and add a `/recipes/scrape-photo` handler:

```ts
  http.post('/recipes/scrape', () =>
    HttpResponse.json({
      recipe: { title: 'Scraped', sections: [{ name: null, ingredients: ['x'], steps: [] }] },
      suggested_labels: ['indian'],
      techniques: { acquire: 'fetch', parse: 'json-ld', normalize: 'single-section' },
      warnings: [],
    })
  ),
  http.post('/recipes/scrape-photo', async ({ request: req }) => {
    const form = await req.formData();
    const names = [...form.keys()];
    return HttpResponse.json({
      recipe: { title: 'From Photo', sections: [{ name: null, ingredients: ['y'], steps: [] }] },
      suggested_labels: [],
      techniques: { acquire: 'claude-vision', parse: 'llm', normalize: 'single-section' },
      warnings: [],
      _uploaded: names, // echo the multipart field names so the test can assert them
    });
  }),
```

Replace the `scrapeRecipe` test (lines 123-127) and add a photo test:

```ts
  it('importRecipeFromUrl returns a draft with a techniques map', async () => {
    const result = await importRecipeFromUrl('http://example.com/r');
    expect(result.techniques.parse).toBe('json-ld');
    expect(result.suggested_labels).toContain('indian');
  });

  it('importRecipeFromPhoto posts each file as multipart form data', async () => {
    const file = new File(['x'], 'page.jpg', { type: 'image/jpeg' });
    const result = (await importRecipeFromPhoto([file])) as { recipe: { title: string }; _uploaded: string[] };
    expect(result.recipe.title).toBe('From Photo');
    expect(result._uploaded).toContain('page.jpg');
  });
```

Add `importRecipeFromPhoto` to the import on line 10 as well.

- [ ] **Step 2: Run to verify the api test fails**

Run: `npm test -- src/api/recipes.test.ts`
Expected: FAIL — `importRecipeFromUrl` / `importRecipeFromPhoto` are not exported.

- [ ] **Step 3: Update the types**

In `src/types/recipe.ts`, replace the `ScrapeResult` interface (lines 45-50) with:

```ts
export interface RecipeDraft {
  recipe: RecipeContent;
  suggested_labels: string[];
  // Provenance from the backend, carried as data — the UI renders none of it,
  // and never flattens it back into a single label.
  techniques: { acquire: string; parse: string; normalize: string };
  warnings: string[];
}

// What a recipe source hands the editor page. `sourceUrl` is url-only knowledge
// (the client's analog of RawSource's nullable url columns): the URL source
// fills it; the photo source passes null.
export interface AcquiredDraft {
  draft: RecipeDraft;
  sourceUrl: string | null;
}
```

In `src/types/index.ts`, in the `./recipe` re-export block (lines 6-15), replace `ScrapeResult,` with:

```ts
  RecipeDraft,
  AcquiredDraft,
```

- [ ] **Step 4: Update the API client**

In `src/api/recipes.ts`:

Line 1 — import `uploadFile` too:

```ts
import { request, uploadFile } from './client';
```

Line 8 — in the `../types/recipe` type import, replace `ScrapeResult,` with `RecipeDraft,`.

Replace `scrapeRecipe` (lines 56-62) with:

```ts
export function importRecipeFromUrl(url: string, token?: string): Promise<RecipeDraft> {
  return request<RecipeDraft>('/recipes/scrape', {
    method: 'POST',
    body: { url },
    token,
  });
}

// Multipart upload; one part per image (keyed by filename, matching addPhoto).
// The backend transcribes then reuses the shared interpretation pipeline.
export function importRecipeFromPhoto(files: File[], token?: string): Promise<RecipeDraft> {
  const formData = new FormData();
  for (const file of files) {
    formData.append(file.name, file);
  }
  return uploadFile<RecipeDraft>('/recipes/scrape-photo', formData, token);
}
```

- [ ] **Step 5: Adapt the page to the renamed names (no behavior change yet)**

In `src/pages/RecipeEditorPage.tsx`:

Line 32 — change `scrapeRecipe,` to `importRecipeFromUrl,`.
Line 38 — change the type import `ScrapeResult` to `RecipeDraft`.
Line 126 — change the `applyDraft` signature type: `const applyDraft = (draft: RecipeDraft): void => {`.
Line 144 — change the mutation fn: `mutationFn: () => importRecipeFromUrl(scrapeUrl, token),`.

Leave the rest of the inline importer as-is — the URL path keeps working exactly as before; only names changed.

- [ ] **Step 6: Update the page test mocks**

In `src/pages/RecipeEditorPage.test.tsx`, in both `/recipes/scrape` handlers, replace the `extraction_method: '…'` line with a techniques map:

- Line 64 (default handler) → `techniques: { acquire: 'fetch', parse: 'json-ld', normalize: 'single-section' },`
- Line 159 (sectionless override) → `techniques: { acquire: 'fetch', parse: 'llm', normalize: 'single-section' },`

- [ ] **Step 7: Run the full affected suite + typecheck**

Run: `npm test -- src/api/recipes.test.ts src/pages/RecipeEditorPage.test.tsx && npm run typecheck`
Expected: PASS (all tests) and typecheck clean — no remaining references to `ScrapeResult` / `scrapeRecipe`.

- [ ] **Step 8: Commit**

```bash
git add src/types/recipe.ts src/types/index.ts src/api/recipes.ts src/api/recipes.test.ts src/pages/RecipeEditorPage.tsx src/pages/RecipeEditorPage.test.tsx
git commit -m "refactor(recipes): rename scrape->import, expose techniques, add photo import client"
```

---

### Task 5: `UrlRecipeSource` — the URL source component

Extracts the inline URL importer into a self-contained component that owns its mutation and emits an `AcquiredDraft`. The page still uses its own inline importer until Task 8; this component is not wired yet.

**Files:**
- Create: `src/components/recipes/UrlRecipeSource.tsx`
- Test: `src/components/recipes/UrlRecipeSource.test.tsx`

**Interfaces:**
- Consumes: `importRecipeFromUrl` (Task 4); `AcquiredDraft` (Task 4); `useAuth`.
- Produces: `const UrlRecipeSource: React.FC<{ onDraft: (acquired: AcquiredDraft) => void }>`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/recipes/UrlRecipeSource.test.tsx
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UrlRecipeSource } from './UrlRecipeSource';

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => ({ token: 'test-token', isAuthenticated: true }),
}));

const server = setupServer(
  http.post('/recipes/scrape', () =>
    HttpResponse.json({
      recipe: { title: 'Imported Stew', sections: [{ name: null, ingredients: ['beef'], steps: [] }] },
      suggested_labels: [],
      techniques: { acquire: 'fetch', parse: 'json-ld', normalize: 'single-section' },
      warnings: [],
    })
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderSource(onDraft = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <UrlRecipeSource onDraft={onDraft} />
    </QueryClientProvider>
  );
  return onDraft;
}

describe('UrlRecipeSource', () => {
  it('emits an AcquiredDraft with the typed url on success', async () => {
    const onDraft = renderSource();
    fireEvent.change(screen.getByLabelText('Import from URL'), {
      target: { value: 'http://example.com/stew' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Import' }));

    await waitFor(() => expect(onDraft).toHaveBeenCalledTimes(1));
    expect(onDraft).toHaveBeenCalledWith({
      draft: expect.objectContaining({ recipe: expect.objectContaining({ title: 'Imported Stew' }) }),
      sourceUrl: 'http://example.com/stew',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/recipes/UrlRecipeSource.test.tsx`
Expected: FAIL — `Failed to resolve import "./UrlRecipeSource"`.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/recipes/UrlRecipeSource.tsx
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../auth/useAuth';
import { importRecipeFromUrl } from '../../api/recipes';
import type { AcquiredDraft } from '../../types/recipe';

interface Props {
  onDraft: (acquired: AcquiredDraft) => void;
}

export const UrlRecipeSource: React.FC<Props> = ({ onDraft }) => {
  const { token } = useAuth();
  const [url, setUrl] = useState('');

  const mutation = useMutation({
    mutationFn: () => importRecipeFromUrl(url, token),
    onSuccess: (draft) => onDraft({ draft, sourceUrl: url }),
  });

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <TextField
          fullWidth
          size="small"
          label="Import from URL"
          placeholder="https://…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={() => mutation.mutate()}
          disabled={!url.trim() || mutation.isPending}
        >
          {mutation.isPending ? 'Importing…' : 'Import'}
        </Button>
      </Stack>
      {mutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Could not import this URL. Paste the recipe below instead.
        </Alert>
      )}
    </>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/recipes/UrlRecipeSource.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/UrlRecipeSource.tsx src/components/recipes/UrlRecipeSource.test.tsx
git commit -m "feat(recipes): add UrlRecipeSource component"
```

---

### Task 6: `PhotoRecipeSource` — the photo source component

**Files:**
- Create: `src/components/recipes/PhotoRecipeSource.tsx`
- Test: `src/components/recipes/PhotoRecipeSource.test.tsx`

**Interfaces:**
- Consumes: `checkImages`, `MAX_IMAGE_BYTES`, `ImageRejection` (Task 1); `resizeImage` (Task 2); `useObjectUrls` (Task 3); `importRecipeFromPhoto`, `AcquiredDraft` (Task 4); `ApiError` from `../../api/client`; `useAuth`.
- Produces: `const PhotoRecipeSource: React.FC<{ onDraft: (acquired: AcquiredDraft) => void }>`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/recipes/PhotoRecipeSource.test.tsx
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PhotoRecipeSource } from './PhotoRecipeSource';
import { MAX_IMAGE_BYTES } from '../../utils/imagePolicy';

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => ({ token: 'test-token', isAuthenticated: true }),
}));

beforeEach(() => {
  vi.stubGlobal(
    'URL',
    Object.assign(URL, {
      createObjectURL: vi.fn((f: File) => `blob:${f.name}`),
      revokeObjectURL: vi.fn(),
    })
  );
});

const server = setupServer(
  http.post('/recipes/scrape-photo', () =>
    HttpResponse.json({
      recipe: { title: 'From Photo', sections: [{ name: null, ingredients: ['y'], steps: [] }] },
      suggested_labels: [],
      techniques: { acquire: 'claude-vision', parse: 'llm', normalize: 'single-section' },
      warnings: [],
    })
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function imageFile(name: string, type: string, size: number): File {
  const f = new File(['x'], name, { type });
  Object.defineProperty(f, 'size', { value: size });
  return f;
}

function renderSource(onDraft = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const { container } = render(
    <QueryClientProvider client={qc}>
      <PhotoRecipeSource onDraft={onDraft} />
    </QueryClientProvider>
  );
  const input = container.querySelector('input[type="file"]') as HTMLInputElement;
  return { onDraft, input };
}

describe('PhotoRecipeSource', () => {
  it('shows a thumbnail and enables Import after a valid file is selected', async () => {
    const { input } = renderSource();
    fireEvent.change(input, { target: { files: [imageFile('page.jpg', 'image/jpeg', 1000)] } });

    expect(await screen.findByRole('img')).toHaveAttribute('src', 'blob:page.jpg');
    expect(screen.getByRole('button', { name: /Import \(1\)/ })).toBeEnabled();
  });

  it('rejects an unsupported type with a message and no thumbnail', () => {
    const { input } = renderSource();
    fireEvent.change(input, { target: { files: [imageFile('p.heic', 'image/heic', 1000)] } });

    expect(screen.getByText(/Unsupported type/)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('flags an oversize image with a resize note', () => {
    const { input } = renderSource();
    fireEvent.change(input, {
      target: { files: [imageFile('big.jpg', 'image/jpeg', MAX_IMAGE_BYTES + 1)] },
    });

    expect(screen.getByText(/will be resized/i)).toBeInTheDocument();
  });

  it('emits an AcquiredDraft with sourceUrl null on success', async () => {
    const { input, onDraft } = renderSource();
    fireEvent.change(input, { target: { files: [imageFile('page.jpg', 'image/jpeg', 1000)] } });
    fireEvent.click(screen.getByRole('button', { name: /Import \(1\)/ }));

    await waitFor(() => expect(onDraft).toHaveBeenCalledTimes(1));
    expect(onDraft).toHaveBeenCalledWith({
      draft: expect.objectContaining({ recipe: expect.objectContaining({ title: 'From Photo' }) }),
      sourceUrl: null,
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/recipes/PhotoRecipeSource.test.tsx`
Expected: FAIL — `Failed to resolve import "./PhotoRecipeSource"`.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/recipes/PhotoRecipeSource.tsx
import React, { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../auth/useAuth';
import { importRecipeFromPhoto } from '../../api/recipes';
import { ApiError } from '../../api/client';
import type { AcquiredDraft } from '../../types/recipe';
import { checkImages, MAX_IMAGE_BYTES, type ImageRejection } from '../../utils/imagePolicy';
import { resizeImage } from '../../utils/resizeImage';
import { useObjectUrls } from './useObjectUrls';

interface Props {
  onDraft: (acquired: AcquiredDraft) => void;
}

const SUPPORTED_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';

export const PhotoRecipeSource: React.FC<Props> = ({ onDraft }) => {
  const { token } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [rejections, setRejections] = useState<ImageRejection[]>([]);
  const previews = useObjectUrls(files);

  const addFiles = (incoming: File[]): void => {
    const combined = [...files, ...incoming];
    const { accepted, oversize, rejected } = checkImages(combined);
    const kept = new Set<File>([...accepted, ...oversize]);
    setFiles(combined.filter((f) => kept.has(f))); // preserve selection order
    setRejections(rejected);
  };

  const removeAt = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const prepared = await Promise.all(
        files.map((f) => (f.size > MAX_IMAGE_BYTES ? resizeImage(f) : Promise.resolve(f)))
      );
      return importRecipeFromPhoto(prepared, token);
    },
    onSuccess: (draft) => onDraft({ draft, sourceUrl: null }),
  });

  const oversizeCount = files.filter((f) => f.size > MAX_IMAGE_BYTES).length;
  const errorMessage =
    (mutation.error as ApiError | null)?.status === 422
      ? "We couldn't find a recipe in these photos. Try clearer images, or add the details below manually."
      : 'Could not import these photos. Add the details below instead.';

  return (
    <>
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(Array.from(e.dataTransfer.files));
        }}
        sx={{
          position: 'relative',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: 'action.hover',
        }}
      >
        <Typography variant="body2">Drag photos here, or click to browse</Typography>
        <Typography variant="caption" color="text.secondary">
          JPEG, PNG, WebP or GIF · up to 5 images
        </Typography>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept={SUPPORTED_ACCEPT}
          onChange={(e) => {
            addFiles(Array.from(e.target.files ?? []));
            e.target.value = ''; // allow re-selecting the same file
          }}
        />
        {mutation.isPending && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              bgcolor: 'background.paper',
              opacity: 0.9,
            }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2">Reading your photos…</Typography>
          </Box>
        )}
      </Box>

      {previews.length > 0 && (
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
          {files.map((file, i) => (
            <Box key={`${file.name}-${i}`} sx={{ position: 'relative' }}>
              <Box
                component="img"
                src={previews[i]}
                alt={file.name}
                sx={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 1 }}
              />
              <IconButton
                size="small"
                aria-label={`Remove ${file.name}`}
                onClick={() => removeAt(i)}
                sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'background.paper' }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              {file.size > MAX_IMAGE_BYTES && (
                <Chip size="small" label="will be resized" sx={{ position: 'absolute', bottom: 2, left: 2 }} />
              )}
            </Box>
          ))}
        </Stack>
      )}

      {oversizeCount > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          {oversizeCount} photo{oversizeCount > 1 ? 's' : ''} will be resized before upload.
        </Typography>
      )}

      {rejections.map((r, i) => (
        <Alert key={i} severity="warning" sx={{ mt: 1 }}>
          {r.file.name}: {r.reason}
        </Alert>
      ))}

      <Button
        variant="outlined"
        sx={{ mt: 1 }}
        onClick={() => mutation.mutate()}
        disabled={files.length === 0 || mutation.isPending}
      >
        {mutation.isPending ? 'Reading…' : `Import (${files.length})`}
      </Button>

      {mutation.isError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/recipes/PhotoRecipeSource.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/PhotoRecipeSource.tsx src/components/recipes/PhotoRecipeSource.test.tsx
git commit -m "feat(recipes): add PhotoRecipeSource with visible resize and policy"
```

---

### Task 7: `RecipeSourceChooser` — presentational toggle

**Files:**
- Create: `src/components/recipes/RecipeSourceChooser.tsx`
- Test: `src/components/recipes/RecipeSourceChooser.test.tsx`

**Interfaces:**
- Consumes: `UrlRecipeSource` (Task 5), `PhotoRecipeSource` (Task 6), `AcquiredDraft` (Task 4).
- Produces: `const RecipeSourceChooser: React.FC<{ onDraft: (acquired: AcquiredDraft) => void }>`

**Note:** The test mocks both source components so this test covers only the chooser's one job — which child is visible and that `onDraft` passes through. The `mode` state here is presentation only (no behavioral branch on source-kind).

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/recipes/RecipeSourceChooser.test.tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecipeSourceChooser } from './RecipeSourceChooser';

vi.mock('./UrlRecipeSource', () => ({
  UrlRecipeSource: () => <div>url-source</div>,
}));
vi.mock('./PhotoRecipeSource', () => ({
  PhotoRecipeSource: () => <div>photo-source</div>,
}));

describe('RecipeSourceChooser', () => {
  it('shows the URL source by default and swaps to the photo source on toggle', () => {
    render(<RecipeSourceChooser onDraft={vi.fn()} />);

    expect(screen.getByText('url-source')).toBeInTheDocument();
    expect(screen.queryByText('photo-source')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Photo' }));

    expect(screen.getByText('photo-source')).toBeInTheDocument();
    expect(screen.queryByText('url-source')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/recipes/RecipeSourceChooser.test.tsx`
Expected: FAIL — `Failed to resolve import "./RecipeSourceChooser"`.

- [ ] **Step 3: Write minimal implementation**

```tsx
// src/components/recipes/RecipeSourceChooser.tsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { UrlRecipeSource } from './UrlRecipeSource';
import { PhotoRecipeSource } from './PhotoRecipeSource';
import type { AcquiredDraft } from '../../types/recipe';

interface Props {
  onDraft: (acquired: AcquiredDraft) => void;
}

type Mode = 'url' | 'photo';

// Presentation only: decides which self-contained source is on screen. It does
// not branch behavior on source-kind — each source produces the same value.
export const RecipeSourceChooser: React.FC<Props> = ({ onDraft }) => {
  const [mode, setMode] = useState<Mode>('url');

  return (
    <Box sx={{ mb: 2 }}>
      <ToggleButtonGroup
        exclusive
        size="small"
        value={mode}
        onChange={(_, next: Mode | null) => next && setMode(next)}
        sx={{ mb: 1 }}
      >
        <ToggleButton value="url">URL</ToggleButton>
        <ToggleButton value="photo">Photo</ToggleButton>
      </ToggleButtonGroup>
      {mode === 'url' ? (
        <UrlRecipeSource onDraft={onDraft} />
      ) : (
        <PhotoRecipeSource onDraft={onDraft} />
      )}
    </Box>
  );
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/recipes/RecipeSourceChooser.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/RecipeSourceChooser.tsx src/components/recipes/RecipeSourceChooser.test.tsx
git commit -m "feat(recipes): add RecipeSourceChooser toggle"
```

---

### Task 8: Integrate the chooser into `RecipeEditorPage`

Replace the inline URL importer (and its `scrapeUrl` state + `scrapeMutation`) with `<RecipeSourceChooser>`, and refactor `applyDraft` to consume an `AcquiredDraft`. This is where the page becomes blind to source-kind.

**Files:**
- Modify: `src/pages/RecipeEditorPage.tsx`
- Modify: `src/pages/RecipeEditorPage.test.tsx`

**Interfaces:**
- Consumes: `RecipeSourceChooser` (Task 7); `AcquiredDraft` (Task 4).
- Produces: nothing new (page-level integration).

- [ ] **Step 1: Add the failing photo-import test**

In `src/pages/RecipeEditorPage.test.tsx`, add a `/recipes/scrape-photo` handler inside the `setupServer(...)` list (alongside the existing `/recipes/scrape` handler):

```ts
  http.post('/recipes/scrape-photo', () =>
    HttpResponse.json({
      recipe: {
        title: 'Photo Pancakes',
        sections: [{ name: null, ingredients: ['flour', 'egg'], steps: ['Mix'] }],
        servings: '3',
      },
      suggested_labels: [],
      techniques: { acquire: 'claude-vision', parse: 'llm', normalize: 'single-section' },
      warnings: [],
    })
  ),
```

Stub object URLs once near the top of the file (after the `useAuth` mock):

```ts
beforeAll(() => {
  Object.assign(URL, {
    createObjectURL: () => 'blob:preview',
    revokeObjectURL: () => {},
  });
});
```

Add the test inside `describe('RecipeEditorPage', …)`:

```tsx
  it('imports from a photo and populates the form', async () => {
    renderNew();

    fireEvent.click(screen.getByRole('button', { name: 'Photo' }));

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['x'], 'pancakes.jpg', { type: 'image/jpeg' });
    Object.defineProperty(file, 'size', { value: 1000 });
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('button', { name: /Import \(1\)/ }));

    await waitFor(() => expect(screen.getByLabelText('Title')).toHaveValue('Photo Pancakes'));
    expect(screen.getByLabelText('Servings')).toHaveValue('3');
    // photo import leaves the Source URL blank
    expect(screen.getByLabelText('Source URL')).toHaveValue('');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/RecipeEditorPage.test.tsx`
Expected: FAIL — there is no `Photo` toggle button yet (the inline importer is still URL-only).

- [ ] **Step 3: Refactor the page to use the chooser**

In `src/pages/RecipeEditorPage.tsx`:

Add the import near the other component imports (after the `LabelPicker` import on line 26):

```tsx
import { RecipeSourceChooser } from '../components/recipes/RecipeSourceChooser';
```

Change the type import on line 38 to include `AcquiredDraft`:

```tsx
import type { RecipeContent, AcquiredDraft } from '../types/recipe';
```

Remove the now-unused `importRecipeFromUrl` from the `../api/recipes` import (line 32) — it lives in `UrlRecipeSource` now. The remaining recipe-api imports stay.

Delete the `scrapeUrl` state (line 87) and the entire `scrapeMutation` block (lines 143-146).

Replace the `applyDraft` function (lines 126-141) with an `AcquiredDraft`-consuming version:

```tsx
  const applyDraft = ({ draft, sourceUrl }: AcquiredDraft): void => {
    // Drafts can arrive without a `sections` array; restore the RecipeContent
    // invariant at the boundary so downstream readers (`original`) stay safe.
    const r: RecipeContent = { ...draft.recipe, sections: draft.recipe.sections ?? [] };
    setForm((f) => ({
      ...f,
      title: r.title,
      servings: r.servings ?? '',
      prep: r.prep_time_minutes != null ? String(r.prep_time_minutes) : '',
      cook: r.cook_time_minutes != null ? String(r.cook_time_minutes) : '',
      sourceUrl: sourceUrl ?? '',
      sections: sectionsForEdit(r),
    }));
    setOriginal(r);
    setWarnings(draft.warnings);
  };
```

Replace the inline importer block (lines 196-219 — the `{!isEdit && (<Stack>…URL…</Stack>)}` block plus the `scrapeMutation.isError` Alert) with:

```tsx
        {!isEdit && <RecipeSourceChooser onDraft={applyDraft} />}
```

Leave the `warnings.map(...)` Alerts block immediately below it unchanged.

- [ ] **Step 4: Run the page test + typecheck + lint**

Run: `npm test -- src/pages/RecipeEditorPage.test.tsx && npm run typecheck && npm run lint`
Expected: PASS — the existing URL-import tests still pass (URL is the default toggle), the new photo test passes, typecheck is clean (no unused `scrapeUrl` / `importRecipeFromUrl`), lint clean.

- [ ] **Step 5: Run the full CI gate**

Run: `npm run ci`
Expected: typecheck + lint + full Vitest suite all PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/RecipeEditorPage.tsx src/pages/RecipeEditorPage.test.tsx
git commit -m "feat(recipes): wire photo import into the New Recipe page via source chooser"
```

---

## Self-Review

**Spec coverage:**
- Segmented toggle entry point → Task 7 (`RecipeSourceChooser`), wired in Task 8.
- Two independent sources + dumb chooser, page blind to source-kind → Tasks 5, 6, 7, 8.
- `AcquiredDraft` with nullable `sourceUrl` → Task 4 (type), Tasks 5/6 (emit), Task 8 (consume).
- `scrape` retired; `importRecipeFromUrl` / `importRecipeFromPhoto` / `RecipeDraft` → Task 4.
- `techniques` carried as data, rendered nowhere → Task 4 (type + mocks); no task renders it (intentional).
- Policy separated from resize; resize visible → Task 1 (`imagePolicy`), Task 2 (`resizeImage`), Task 6 (chips + summary, no silent mutation).
- HEIC rejected with a message → Task 1 (unsupported type) + Task 6 test.
- Contained object-URL place → Task 3 (`useObjectUrls`).
- Multipart upload via `uploadFile` → Task 4.
- Error handling parity (client rejections inline; 422 vs generic) → Task 6.
- New-recipe-only (no edit-mode import) → Task 8 keeps the importer under `!isEdit`.
- Per-unit tests → every task.

**Placeholder scan:** No TBD/TODO/"handle edge cases"/"similar to Task N"; every code step shows full code.

**Type consistency:** `RecipeDraft` (snake_case `suggested_labels`, `techniques`), `AcquiredDraft { draft, sourceUrl }`, `importRecipeFromUrl` / `importRecipeFromPhoto`, `checkImages` / `ClassifiedImages` / `ImageRejection`, `resizeImage`, `useObjectUrls`, `RecipeSourceChooser` / `UrlRecipeSource` / `PhotoRecipeSource` are used identically across defining and consuming tasks. The `onDraft: (acquired: AcquiredDraft) => void` prop signature matches in Tasks 5, 6, 7, 8.
</content>
