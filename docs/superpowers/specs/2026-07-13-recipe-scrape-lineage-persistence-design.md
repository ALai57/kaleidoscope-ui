# Persist scrape→recipe lineage (URL flow) — design

**Date:** 2026-07-13
**Status:** Approved, ready for implementation plan
**Repo:** kaleidoscope-ui (frontend only)

## Problem

The backend persists a raw-scrape provenance chain: `recipe → processing_run → raw_scrape`
(migration `20260712000001-add-scrape-pipeline`). The link column
`recipes.scrape_processing_run_id` is populated from a `scrape-processing-run-id` the
`POST /recipes/scrape` response returns and the `POST /recipes` request accepts.

The UI never carries it. Concretely:

- `src/types/recipe.ts` `ScrapeResult` has **no** `scrape_processing_run_id`, so the value the
  backend returns from `/recipes/scrape` is discarded at the type boundary.
- `CreateRecipePayload` has no lineage field, and `RecipeEditorPage` never sends one.

Net effect: **every recipe created through the URL-import flow saves with
`scrape_processing_run_id = NULL`**, breaking the lineage the backend went to the trouble of
recording. This spec closes that gap for the URL flow.

Separately, the UI's `ScrapeResult.extraction_method` field is stale: the backend replaced it with
`techniques {acquire, parse, normalize}` and no longer returns `extraction_method`. It is referenced
only in the type and test mocks, never rendered. We correct it here since it is the same type and
tests this change already touches.

## Goal and non-goals

**Goal:** make the data tie together — the run id captured at scrape time reaches
`POST /recipes` so the DB link populates. Observability *surfaces* (viewing runs, techniques,
LLM calls) are being designed by a separate effort; this change is purely the plumbing that lets
that effort trace `recipe → run → raw_scrape`.

**Non-goals:**

- No UI display of the run id, and no read-back on the `Recipe` type. (Persist-only.)
- No new API endpoints; `processing_runs` is not exposed over HTTP and we do not expose it.
- Photo import (`POST /recipes/scrape-photo`) is not yet wired into this UI, so it is out of scope.
  It returns the same `ScrapeResult` shape and will reuse this exact pattern when it lands
  (tracked separately in `2026-07-13-recipe-photo-import-ui-design.md`).
- `UpdateRecipePayload` is untouched — lineage is immutable, set once at create. The backend's
  `UpdateRecipeRequest` has no `scrape-processing-run-id` field, matching this.

## Backend contract (already shipped — reference, not to change)

From `kaleidoscope/src/kaleidoscope/models/recipes.cljc`:

```clojure
ScrapeResult          ; scrape-processing-run-id  :uuid            (REQUIRED)
                      ; techniques {acquire parse normalize}       (keywords → JSON strings)
CreateRecipeRequest   ; scrape-processing-run-id  {optional} [maybe :uuid]
GetRecipeResponse     ; scrape-processing-run-id  {optional} [maybe :uuid]  (we do not read this yet)
```

The UI `request`/`uploadFile` client (`src/api/client.ts`) already converts kebab↔snake on every
request body and response, so backend `scrape-processing-run-id` ↔ UI `scrape_processing_run_id`
requires no API-layer change.

## Changes

### 1. `src/types/recipe.ts`

Correct `ScrapeResult` to the live contract and add the write field:

```ts
export interface ScrapeResult {
  recipe: RecipeContent;
  suggested_labels: string[];
  techniques: { acquire: string; parse: string; normalize: string }; // replaces extraction_method
  warnings: string[];
  scrape_processing_run_id: string; // UUID — required, matches backend ScrapeResult
}

export interface CreateRecipePayload {
  // …existing fields unchanged…
  scrape_processing_run_id?: string | null;
}
```

`UpdateRecipePayload` unchanged.

### 2. `src/pages/RecipeEditorPage.tsx`

Thread the run id through editor state, mirroring how `original` is already handled:

- Add state: `const [scrapeRunId, setScrapeRunId] = useState<string | null>(null);`
- In `applyDraft(draft)`, alongside `setOriginal(r)`:
  `setScrapeRunId(draft.scrape_processing_run_id);`
  Re-scraping calls `applyDraft` again and overwrites it — latest scrape wins.
- In the **create** branch of `saveMutation`, spread it conditionally next to `original`:
  ```ts
  ...(scrapeRunId ? { scrape_processing_run_id: scrapeRunId } : {}),
  ```

No change to the update branch.

## Semantics and accepted limitations

- **Manual create (no scrape):** `scrapeRunId` stays `null` → field omitted → lineage `NULL`. Correct.
- **Edit mode:** no scrape occurs and update never carries lineage, so existing links are immutable.
  Correct.
- **Scrape then heavy manual editing before save:** lineage still attaches. This is intended — the
  run *seeded* the recipe, which is exactly what the provenance link records. We deliberately do
  **not** build "clear the lineage if the user rewrote everything" logic (YAGNI). The degenerate
  "scrape, then replace the draft with something unrelated" case is an accepted mislabel.

## Testing

- `src/api/recipes.test.ts`: update the `/recipes/scrape` mock to the corrected shape (`techniques`
  + `scrape_processing_run_id`); assert `scrapeRecipe` surfaces `scrape_processing_run_id`.
- `src/pages/RecipeEditorPage.test.tsx`:
  - **Key behavioral test:** scrape → save issues `POST /recipes` whose body includes the
    `scrape_processing_run_id` from the scrape response.
  - A plain manual create (no scrape) omits `scrape_processing_run_id`.
  - Update the two existing scrape mocks off `extraction_method` to the corrected shape.

## Verification

- `npm run typecheck` passes (proves the corrected `ScrapeResult` has no stray `extraction_method`
  consumers).
- `npm run ci` (typecheck + lint + test) green.
