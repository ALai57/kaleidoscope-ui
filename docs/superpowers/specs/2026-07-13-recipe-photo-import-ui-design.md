# Design: Recipe photo import (UI)

The frontend for the backend feature specified in
`../kaleidoscope/plans/2026-07-12-recipe-photo-import/DESIGN.md`. Users create a
recipe by uploading photo(s) of an offline source (a cookbook page, a
screenshot) instead of pasting a URL. The upload is transcribed and structured
server-side into a draft the user reviews and edits before saving — the same
review-and-edit flow the existing URL import already produces.

This spec covers only the client. The API, OCR, and interpretation are the
backend's concern; the client posts images and consumes the resulting draft.

## Guiding principle: honor the backend's decomplection

The backend design's central commitment is that **acquisition is decomplected
from processing**: one `run-pipeline` consumes a `RawSource` *value* and never
knows whether the source was a URL or a photo. The client mirrors this. The
editor page never learns how a draft was acquired — it just receives drafts.
URL and photo are two independent, self-contained sources that each emit the
same value; the only place they differ is a nullable url-only field, exactly as
`RawSource` carries nullable url columns.

Every decision below removes a fold rather than adding a layer.

## Scope

- **In scope:** a photo-import entry point on the **New Recipe** page, alongside
  the existing URL import; client-side input policy (type/count/size); visible,
  non-silent resize of oversized images; wiring the resulting draft through the
  existing `applyDraft` review flow.
- **Out of scope (YAGNI):** photo import while *editing* an existing recipe
  (mirrors today's URL import, which is create-only); HEIC decoding (clearly
  rejected, a documented later upgrade paralleling the backend's Google-Vision
  follow-up); rendering the `techniques` provenance anywhere in the UI.

## Architecture

Additive to the New Recipe flow in `RecipeEditorPage.tsx`. The page keeps owning
form state and the "fill the draft" logic (`applyDraft`). A single presentational
chooser swaps between two independent source components; the page wires
`applyDraft` as the one consumer and is blind to which source ran.

```
                       ┌────────────────────┐
  RecipeEditorPage ───►│ RecipeSourceChooser│  (toggle: URL | Photo)
   (owns form,         └─────────┬──────────┘   presentation only —
    applyDraft)                  │              decides which child renders
                    ┌────────────┴────────────┐
                    ▼                          ▼
            UrlRecipeSource            PhotoRecipeSource
          (owns url + mutation)     (owns files + mutation)
                    │                          │
                    └──────── onDraft ─────────┘
                              (AcquiredDraft)
                                   │
                                   ▼
                          applyDraft fills the form
```

### Units

| Unit | Responsibility | Knows about |
|---|---|---|
| `src/components/recipes/RecipeSourceChooser.tsx` **(new)** | `ToggleButtonGroup` (URL / Photo); renders one child. No behavioral branch. | which child is visible |
| `src/components/recipes/UrlRecipeSource.tsx` **(new)** | Owns URL text + its own scrape mutation; emits `onDraft`. | URLs only |
| `src/components/recipes/PhotoRecipeSource.tsx` **(new)** | Owns file selection + its own import mutation; drag/drop + picker; thumbnails; consults `imagePolicy`; runs `resizeImage` on oversize; emits `onDraft`. | photos only |
| `src/components/recipes/useObjectUrls.ts` **(new)** | Hook containing the object-URL lifecycle (create/revoke). | preview handles |
| `src/utils/imagePolicy.ts` **(new)** | Pure predicate: classify a selection into accepted / oversize / rejected, with reasons. No mutation. | image `File`s |
| `src/utils/resizeImage.ts` **(new)** | The transform: canvas re-encode an oversize image under the byte limit. | one `File` |
| `src/api/recipes.ts` | Add `importRecipeFromPhoto(files, token)` (multipart); rename `scrapeRecipe` → `importRecipeFromUrl`. | — |
| `src/types/recipe.ts` | `ScrapeResult` → `RecipeDraft`; replace `extraction_method` with `techniques`; add `AcquiredDraft`. | — |
| `src/pages/RecipeEditorPage.tsx` | Replace the inline URL row with `<RecipeSourceChooser onDraft={applyDraft} />`; `applyDraft` takes an `AcquiredDraft`. | neither source |

## The value crossing the boundary

Each source hands the page one value. The wire result is `RecipeDraft`; the
client-known source URL is a nullable field on the wrapper — the client's
analog of `RawSource`'s nullable url columns.

```ts
// The wire result (renamed from ScrapeResult). Same JSON body from both
// /recipes/scrape and /recipes/scrape-photo.
interface RecipeDraft {
  recipe: RecipeContent;
  suggested_labels: string[]; // snake_case: client's kebabKeysToSnake maps the wire keys
  techniques: { acquire: string; parse: string; normalize: string };
  warnings: string[];
}

// What a source hands RecipeEditorPage. sourceUrl is url-only knowledge.
interface AcquiredDraft {
  draft: RecipeDraft;
  sourceUrl: string | null; // UrlRecipeSource fills it; PhotoRecipeSource → null
}
```

`applyDraft(acquired: AcquiredDraft)` fills title / servings / prep / cook /
sections uniformly, sets `original` (the acquired content) and `warnings`, and
sets the Source URL field from `sourceUrl` (blank when `null`). The page never
inspects a source-kind.

### Naming: `scrape` is retired as the general verb

You do not *scrape* a photo; scraping is a URL technique. The general act is
importing a recipe draft from a source. So:

- `api/recipes.ts`: `importRecipeFromUrl(url)` and `importRecipeFromPhoto(files)`,
  both `→ RecipeDraft`.
- `types/recipe.ts`: `ScrapeResult` → `RecipeDraft`.

This renames the existing URL path too — intentional, the same way the backend
rewrote the shared contract (`raw_html`→`raw_content`, `:extraction-method`→
`techniques`) rather than bolting photo onto a URL-shaped one. The backend
endpoint paths (`/recipes/scrape`, `/recipes/scrape-photo`) are unchanged; those
are the backend's wire, not the client's vocabulary.

### `techniques` is data — carried, typed, rendered nowhere

`ScrapeResult.extraction_method: string` (a flattened token conflating source ×
technique) → `techniques: { acquire, parse, normalize }`, matching the backend's
decision to expose the map instead of a label. The UI reads none of it; it flows
through `RecipeDraft` as faithful data, available when something wants it. It is
never flattened back into a label on the client. (A grep confirms the UI does
not render `extraction_method` today, so this is a type change with no rendering
impact — re-verify at implementation time.)

## `PhotoRecipeSource` UI

Local state: the selected `File[]` (with preview handles from `useObjectUrls`)
and the derived policy classification.

- **Drop zone:** drag-and-drop plus click-to-browse via a hidden
  `<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif">`.
- **Thumbnail grid:** one tile per selected image with a remove (✕) button and a
  size badge. Oversize tiles show a chip: *"9.4 MB → will be resized to fit."*
- **Helper line:** *"JPEG, PNG, WebP or GIF · up to 5 images."*
- **Resize summary** (when any oversize): *"2 photos will be resized before
  upload."* — visible before the user commits.
- **Import button:** *"Import (N)"*, enabled only when ≥1 accepted/oversize image
  and not pending. On click: run `resizeImage` over the oversize set, build
  `FormData`, run the mutation.
- **Pending state:** a spinner + **"Reading your photos…"** overlay on the drop
  zone (OCR + interpretation is a multi-second synchronous call).

## Input policy and resize — separated

Two distinct concerns, two units. The predicate never mutates; the transform is
only invoked on what the predicate flags as oversize, and only with the user's
visibility.

```ts
// utils/imagePolicy.ts — pure, no mutation.
const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGES = 5;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

interface Classified {
  accepted: File[];   // supported type, ≤ limit
  oversize: File[];   // supported type, > limit → will be resized
  rejected: { file: File; reason: string }[]; // bad type, or over the count cap
}
function checkImages(files: File[]): Classified;
```

```ts
// utils/resizeImage.ts — the transform, isolated. Canvas re-encode to JPEG,
// shrinking max dimension / quality until under MAX_IMAGE_BYTES.
function resizeImage(file: File): Promise<File>;
```

The silent auto-downscale from the first draft is dropped. Resize is **visible**
(chips + summary) and the decline path is simply removing the image and adding a
smaller one — no hidden, lossy mutation ahead of an OCR step whose job is reading
fine text. Re-encoded output is `image/jpeg`, a supported type.

**HEIC** (common on iPhone) can't be reliably canvas-decoded in-browser, so it
falls into `rejected` with a clear message. HEIC→JPEG conversion is a documented
later upgrade.

## The mutable place is contained

Thumbnail previews use `URL.createObjectURL` — a handle with a lifecycle, not a
value. `useObjectUrls(files)` owns that place: it creates a URL per file, revokes
on removal, and revokes all on unmount. Revocation lives in exactly one unit
instead of leaking across the component.

## Data flow (photo path)

```
select / drop files
  → checkImages         (reject bad type / over count; flag oversize — no mutation)
  → user sees classification (chips, resize summary), adjusts selection
  → on Import: resizeImage per oversize file      (visible transform)
  → FormData (one part per file)
  → importRecipeFromPhoto → POST /recipes/scrape-photo   (multipart, uploadFile)
  → RecipeDraft
  → onDraft({ draft, sourceUrl: null })
  → applyDraft fills the form (Source URL left blank)
```

The URL path is unchanged in substance: `importRecipeFromUrl` →
`onDraft({ draft, sourceUrl: <typed url> })` → same `applyDraft`.

## Error handling (parity with URL import)

- **Client policy rejections** (unsupported type, over the 5-count cap) → inline
  messages from `checkImages`; no request sent.
- **422 no-recipe-found** (empty/garbage transcript, unparseable) → friendly
  Alert: *"We couldn't find a recipe in these photos. Try clearer images, or add
  the details below manually."*
- **Other / transport errors** → generic Alert: *"Could not import these photos.
  Add the details below instead."* (mirrors the existing URL error copy).

The 422-vs-other distinction reads `ApiError.status` (already surfaced by
`api/client.ts`).

## Testing (every unit)

- `utils/imagePolicy.test.ts` — pure: accepts supported ≤ limit; flags oversize;
  rejects bad types and the 6th image with reasons.
- `utils/resizeImage.test.ts` — oversize file comes back under `MAX_IMAGE_BYTES`
  as `image/jpeg`; canvas stubbed in jsdom.
- `components/recipes/RecipeSourceChooser.test.tsx` — toggling swaps which source
  renders; `onDraft` passes through unchanged.
- `components/recipes/PhotoRecipeSource.test.tsx` — dropping files renders
  thumbnails; oversize shows the resize chip/summary; remove works; Import
  disabled until valid; emits `onDraft` with `sourceUrl: null`; shows the pending
  overlay.
- `api/recipes.test.ts` — `importRecipeFromPhoto` POSTs multipart to
  `/recipes/scrape-photo`; `importRecipeFromUrl` unchanged (MSW).
- `pages/RecipeEditorPage.test.tsx` — a successful acquired draft (from either
  source) fills the form fields; photo draft leaves Source URL blank.

## Files touched

| File | Change |
|---|---|
| `src/components/recipes/RecipeSourceChooser.tsx` | **new** — presentational toggle over two sources |
| `src/components/recipes/UrlRecipeSource.tsx` | **new** — URL text + mutation → `onDraft` |
| `src/components/recipes/PhotoRecipeSource.tsx` | **new** — drop zone, thumbnails, policy + resize, mutation → `onDraft` |
| `src/components/recipes/useObjectUrls.ts` | **new** — object-URL lifecycle hook |
| `src/utils/imagePolicy.ts` | **new** — pure input predicate |
| `src/utils/resizeImage.ts` | **new** — canvas resize transform |
| `src/api/recipes.ts` | add `importRecipeFromPhoto`; rename `scrapeRecipe` → `importRecipeFromUrl` |
| `src/types/recipe.ts` | `ScrapeResult` → `RecipeDraft`; `extraction_method` → `techniques`; add `AcquiredDraft` |
| `src/pages/RecipeEditorPage.tsx` | use `RecipeSourceChooser`; `applyDraft` takes `AcquiredDraft` |
| `*.test.ts(x)` | per-unit tests listed above |
</content>
</invoke>
