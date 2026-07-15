# Personal Recommender — Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Personal Recommender frontend in `kaleidoscope-ui` — a writer-gated `/library` feature (standing library of interests, curation pipeline, taste editor, onboarding, check-in) wired to the backend `/interests` API.

**Architecture:** A new `/library` route tree self-gated on writer auth, wrapped in `PrismThemeProvider` (dark-only). Server state flows through a typed `src/api/interests.ts` client and TanStack Query hooks; interest selection is URL-driven (`useParams`); the acquisitions animation and onboarding/check-in modals use local component state (no global store needed). Presentational components take explicit props so they test cleanly.

**Tech Stack:** React 18, TypeScript, Vite, TanStack Query, React Router 7, Prism design-system components (`src/components/prism`), MUI theme tokens, Vitest + Testing Library + MSW v2, Playwright.

## Global Constraints

- **API access only through `src/api/*` typed clients** — never `fetch` inline in a component (CLAUDE.md).
- **Server state → TanStack Query; client/UI state → local React state / URL.** Don't hand-roll caching (CLAUDE.md). No Zustand store is introduced here — there is no cross-cutting client state (URL holds interest selection; modals/animation are local).
- **The wire client auto-converts case** (`src/api/client.ts`): request bodies go out kebab-case, responses come back snake_case. **All TypeScript types and API bodies use `snake_case`** (matching `src/types/project.ts`). MSW handlers in tests return **kebab-case** keys (as the real API does) so the client's `kebabKeysToSnake` is exercised.
- **Theming through `theme.tokens`** (`useTheme().tokens`), never hardcoded colors, except the two categorical mechanic colors read from the palette: **trusted = `theme.tokens.color.categorical[1]` (`#9085E9` purple)**, **novel = `theme.tokens.color.categorical[2]` (`#C98500` amber)**. Cyan accent is `color.brand.primary`.
- **Auth only through `useAuth()`** — `{ token, isAuthenticated, userProfile, login, logout }`. Components receive `token: string | undefined` as a prop (pattern from `src/components/tasks/TasksTab.tsx`).
- **Every feature needs a test** (CLAUDE.md) — each task is TDD: failing test first.
- **Run `npm run ci` (typecheck + lint + test) before pushing.**

### Backend dependency (confirm before Task 7/8 integration)

The refinement (clarify) flow calls `POST /interests/:id/curation-runs/:run-id/steps/:step-run-id/respond`, which needs a **`step_run_id`**. The backend `run-curation!` contract (PLAN.md Task 8) documents the awaiting-input result as `{:status "awaiting_input" :run-id ... :questions [...]}` — **without `step-run-id`**. This plan assumes the `awaiting_input` payload also carries `step_run_id`. If the backend cannot supply it, the respond route signature or the awaiting-input payload must change. **Flag this to the backend owner; do not work around it by guessing the id.** The `CurationAwaitingInput` type below includes `step_run_id` to make the dependency explicit and type-checked.

### API contract (from backend PLAN.md Task 10), base path `/interests`

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/interests` | — | `Interest[]` |
| POST | `/interests` | `{ intent, taste_profile? }` | `Interest` |
| GET | `/interests/:id` | — | `Interest` (404 if not owner) |
| PUT | `/interests/:id` | `{ intent?, taste_profile? }` (merges) | `Interest` |
| DELETE | `/interests/:id` | — | `204` |
| GET | `/interests/:id/recommendations?status=&kind=` | — | `Recommendation[]` |
| PUT | `/interests/:id/recommendations/:recId` | `{ status }` | `Recommendation` |
| POST | `/interests/:id/curate` | `{ scrutiny?, shelf_size? }` | `CurationResult` |
| POST | `/interests/:id/curation-runs/:runId/steps/:stepRunId/respond` | `{ answers }` | `CurationResult` |

Rate limits (server-enforced): create 10/min, curate 5/min, respond 10/min. The UI surfaces `429` as a friendly "slow down" notice; it does not need client-side throttling.

**Check-in has no dedicated endpoint** — it is composed entirely from the routes above (sample the shelf, `PUT` recommendation statuses, `PUT` interest to promote a source / nudge the dial). Do not look for a check-in API.

---

## File Structure

```
src/
  types/interest.ts                          # Interest, TasteProfile, Recommendation, CurationResult, enums
  api/interests.ts                           # typed client (one fn per route)
  api/interests.test.ts                      # MSW-backed client tests
  components/library/
    hooks.ts                                 # TanStack Query hooks + query keys
    hooks.test.tsx                           # hook behavior (keys, invalidation)
    testHelpers.tsx                          # renderWithProviders + makeTestQueryClient (test-only)
    catalog.ts                               # pure helpers: kind→catalog code, origin label/color
    catalog.test.ts
    CatalogCard.tsx                          # one recommendation card + origin tag + status menu
    CatalogCard.test.tsx
    ShelfView.tsx                            # kind-filter chips + finite card grid + empty state
    ShelfView.test.tsx
    TasteProfileEditor.tsx                   # keywords/formats/lengths/sources + novelty dial (save-only)
    TasteProfileEditor.test.tsx
    RefinementQuestions.tsx                  # shared clarify Q&A form
    RefinementQuestions.test.tsx
    OnboardingDialog.tsx                     # intent → curate → clarify branch → shelf
    OnboardingDialog.test.tsx
    AcquisitionsPipeline.tsx                 # curate trigger + staged reveal + summary
    AcquisitionsPipeline.test.tsx
    CheckInDialog.tsx                        # composed check-in flow
    CheckInDialog.test.tsx
    InterestRail.tsx                         # left rail: interest list + "add interest"
    InterestRail.test.tsx
  pages/library/
    LibraryPage.tsx                          # shell: NavBar + Prism + rail + routed stage + modals + auth gate
    LibraryPage.test.tsx
  App.tsx                                    # add /library routes (modify)
e2e/library.spec.ts                          # Playwright full-loop happy path
```

---

## Task 1: Types + API client

**Files:**
- Create: `src/types/interest.ts`
- Create: `src/api/interests.ts`
- Test: `src/api/interests.test.ts`

**Interfaces:**
- Consumes: `request` and `ApiError` from `src/api/client.ts` — `request<T>(path, { method?, body?, token? })`.
- Produces (types): `MediaFormat`, `TasteProfile`, `Interest`, `RecommendationKind`, `Origin`, `RecommendationStatus`, `Recommendation`, `CurationCompleted`, `CurationAwaitingInput`, `CurationResult`, `ShelfFilters`.
- Produces (functions): `getInterests(token)`, `getInterest(id, token)`, `createInterest(body, token)`, `updateInterest(id, body, token)`, `deleteInterest(id, token)`, `getShelf(id, filters, token)`, `updateRecommendationStatus(interestId, recId, status, token)`, `curate(id, body, token)`, `respondToCurationStep(interestId, runId, stepRunId, answers, token)`.

- [ ] **Step 1: Write the types** — `src/types/interest.ts`:

```typescript
export type MediaFormat =
  | 'podcast' | 'article' | 'show' | 'video'
  | 'book' | 'paper' | 'newsletter' | 'course';

export interface TasteProfile {
  keywords?: string[];
  formats?: MediaFormat[];
  lengths?: string[];
  trusted_sources?: string[];
  /** Explore/exploit dial, 0.0–1.0. Share of each shelf drawn from outside trusted_sources. */
  novelty_ratio?: number;
  cadence?: string;
  refinements?: string[];
}

export interface Interest {
  id: string;
  user_id: string;
  intent: string;
  taste_profile: TasteProfile;
  /** Backing Project id (interests are backed by a Project on the server). */
  project_id?: string;
  created_at: string;
  updated_at: string;
}

export type RecommendationKind = MediaFormat;
export type Origin = 'trusted' | 'novel';
export type RecommendationStatus = 'shelved' | 'queued' | 'archived';

export interface Recommendation {
  id: string;
  interest_id: string;
  kind: string;
  title: string;
  source: string;
  url: string;
  est_time: string;
  why: string;
  origin: Origin;
  status: RecommendationStatus;
  added_at: string;
}

export interface CurationCompleted {
  status: 'completed';
  run_id: string;
  summary: { total: number; trusted: number; novel: number };
  shelved: Recommendation[];
}

export interface CurationAwaitingInput {
  status: 'awaiting_input';
  run_id: string;
  /** REQUIRED to call the respond route. See "Backend dependency" in the plan header. */
  step_run_id: string;
  questions: string[];
}

export type CurationResult = CurationCompleted | CurationAwaitingInput;

export interface ShelfFilters {
  status?: RecommendationStatus;
  kind?: string;
}
```

- [ ] **Step 2: Write the failing client test** — `src/api/interests.test.ts`:

```typescript
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import {
  getInterests, createInterest, updateInterest, deleteInterest,
  getShelf, updateRecommendationStatus, curate, respondToCurationStep,
} from './interests';

// Real API returns kebab-case; the client converts to snake_case.
const interestWire = {
  id: 'i1', 'user-id': 'reader@example.com', intent: 'Modern jazz history',
  'taste-profile': { 'novelty-ratio': 0.5, 'trusted-sources': ['PBS Frontline'] },
  'project-id': 'p1', 'created-at': '2026-07-14T00:00:00Z', 'updated-at': '2026-07-14T00:00:00Z',
};
const recWire = {
  id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'A Piece', source: 'PBS Frontline',
  url: 'https://x', 'est-time': '18 min', why: 'because', origin: 'trusted',
  status: 'shelved', 'added-at': '2026-07-14T00:00:00Z',
};

let lastBody: unknown = null;
let lastUrl = '';
const server = setupServer(
  http.get('/interests', () => HttpResponse.json([interestWire])),
  http.post('/interests', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json(interestWire);
  }),
  http.put('/interests/i1', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({ ...interestWire, 'taste-profile': { 'novelty-ratio': 0.8 } });
  }),
  http.delete('/interests/i1', () => new HttpResponse(null, { status: 204 })),
  http.get('/interests/i1/recommendations', ({ request }) => {
    lastUrl = request.url;
    return HttpResponse.json([recWire]);
  }),
  http.put('/interests/i1/recommendations/r1', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({ ...recWire, status: 'archived' });
  }),
  http.post('/interests/i1/curate', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({
      status: 'completed', 'run-id': 'run1',
      summary: { total: 6, trusted: 3, novel: 3 }, shelved: [recWire],
    });
  }),
  http.post('/interests/i1/curation-runs/run1/steps/step1/respond', async ({ request }) => {
    lastBody = await request.json();
    return HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 1, trusted: 1, novel: 0 }, shelved: [recWire] });
  }),
);

beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); lastBody = null; lastUrl = ''; });
afterAll(() => server.close());

describe('interests API client', () => {
  it('getInterests returns snake_case interests', async () => {
    const [i] = await getInterests();
    expect(i.user_id).toBe('reader@example.com');
    expect(i.taste_profile.novelty_ratio).toBe(0.5);
    expect(i.project_id).toBe('p1');
  });

  it('createInterest sends the intent + taste_profile (converted to kebab on the wire)', async () => {
    await createInterest({ intent: 'x', taste_profile: { novelty_ratio: 0.3 } });
    expect(lastBody).toEqual({ intent: 'x', 'taste-profile': { 'novelty-ratio': 0.3 } });
  });

  it('updateInterest merges a taste-profile edit', async () => {
    const updated = await updateInterest('i1', { taste_profile: { novelty_ratio: 0.8 } });
    expect(updated.taste_profile.novelty_ratio).toBe(0.8);
    expect(lastBody).toEqual({ 'taste-profile': { 'novelty-ratio': 0.8 } });
  });

  it('deleteInterest resolves on 204', async () => {
    await expect(deleteInterest('i1')).resolves.toBeUndefined();
  });

  it('getShelf builds status + kind query params', async () => {
    const shelf = await getShelf('i1', { status: 'shelved', kind: 'article' });
    expect(shelf[0].est_time).toBe('18 min');
    expect(lastUrl).toContain('status=shelved');
    expect(lastUrl).toContain('kind=article');
  });

  it('getShelf omits absent filters', async () => {
    await getShelf('i1', {});
    expect(lastUrl).not.toContain('status=');
    expect(lastUrl).not.toContain('kind=');
  });

  it('updateRecommendationStatus sends the new status', async () => {
    const rec = await updateRecommendationStatus('i1', 'r1', 'archived');
    expect(rec.status).toBe('archived');
    expect(lastBody).toEqual({ status: 'archived' });
  });

  it('curate returns a completed result with a numeric summary', async () => {
    const result = await curate('i1', { scrutiny: 'standard', shelf_size: 6 });
    expect(result.status).toBe('completed');
    if (result.status === 'completed') expect(result.summary).toEqual({ total: 6, trusted: 3, novel: 3 });
    expect(lastBody).toEqual({ scrutiny: 'standard', 'shelf-size': 6 });
  });

  it('respondToCurationStep posts answers and resumes the run', async () => {
    const result = await respondToCurationStep('i1', 'run1', 'step1', ['jazz after 1959']);
    expect(result.status).toBe('completed');
    expect(lastBody).toEqual({ answers: ['jazz after 1959'] });
  });
});
```

- [ ] **Step 3: Run it, verify it fails**

Run: `npx vitest run src/api/interests.test.ts`
Expected: FAIL — `Cannot find module './interests'`.

- [ ] **Step 4: Implement the client** — `src/api/interests.ts`:

```typescript
import { request } from './client';
import type {
  Interest, TasteProfile, Recommendation, CurationResult,
  RecommendationStatus, ShelfFilters,
} from '../types/interest';

export function getInterests(token?: string): Promise<Interest[]> {
  return request<Interest[]>('/interests', { token });
}

export function getInterest(id: string, token?: string): Promise<Interest> {
  return request<Interest>(`/interests/${id}`, { token });
}

export function createInterest(
  body: { intent: string; taste_profile?: TasteProfile },
  token?: string
): Promise<Interest> {
  return request<Interest>('/interests', { method: 'POST', body, token });
}

export function updateInterest(
  id: string,
  body: { intent?: string; taste_profile?: TasteProfile },
  token?: string
): Promise<Interest> {
  return request<Interest>(`/interests/${id}`, { method: 'PUT', body, token });
}

export function deleteInterest(id: string, token?: string): Promise<void> {
  return request<void>(`/interests/${id}`, { method: 'DELETE', token });
}

export function getShelf(
  id: string,
  filters: ShelfFilters = {},
  token?: string
): Promise<Recommendation[]> {
  const params = new URLSearchParams();
  if (filters.status) params.set('status', filters.status);
  if (filters.kind) params.set('kind', filters.kind);
  const qs = params.toString();
  return request<Recommendation[]>(
    `/interests/${id}/recommendations${qs ? `?${qs}` : ''}`,
    { token }
  );
}

export function updateRecommendationStatus(
  interestId: string,
  recId: string,
  status: RecommendationStatus,
  token?: string
): Promise<Recommendation> {
  return request<Recommendation>(
    `/interests/${interestId}/recommendations/${recId}`,
    { method: 'PUT', body: { status }, token }
  );
}

export function curate(
  id: string,
  body: { scrutiny?: 'quick' | 'standard' | 'rigorous'; shelf_size?: number } = {},
  token?: string
): Promise<CurationResult> {
  return request<CurationResult>(`/interests/${id}/curate`, {
    method: 'POST',
    body,
    token,
  });
}

export function respondToCurationStep(
  interestId: string,
  runId: string,
  stepRunId: string,
  answers: string[],
  token?: string
): Promise<CurationResult> {
  return request<CurationResult>(
    `/interests/${interestId}/curation-runs/${runId}/steps/${stepRunId}/respond`,
    { method: 'POST', body: { answers }, token }
  );
}
```

- [ ] **Step 5: Run tests, verify they pass**

Run: `npx vitest run src/api/interests.test.ts`
Expected: PASS (9 tests).

- [ ] **Step 6: Commit**

```bash
git add src/types/interest.ts src/api/interests.ts src/api/interests.test.ts
git commit -m "feat(library): typed /interests API client + domain types"
```

---

## Task 2: Query hooks + shared test helper

**Files:**
- Create: `src/components/library/hooks.ts`
- Create: `src/components/library/testHelpers.tsx`
- Test: `src/components/library/hooks.test.tsx`

**Interfaces:**
- Consumes: Task 1 client functions and types.
- Produces:
  - `libraryKeys` — `{ all, list(), detail(id), shelf(id, filters) }` query-key factory.
  - Query hooks: `useInterests(token)`, `useInterest(id, token)`, `useShelf(id, filters, token)`.
  - Mutation hooks: `useCreateInterest(token)`, `useUpdateInterest(token)`, `useDeleteInterest(token)`, `useCurate(token)`, `useRespondToStep(token)`, `useUpdateRecStatus(interestId, token)`.
  - Test helper: `makeTestQueryClient()`, `renderWithProviders(ui, { route?, client? })` returning RTL result plus `client`.

- [ ] **Step 1: Write the test helper** — `src/components/library/testHelpers.tsx`:

```tsx
import type { ReactElement } from 'react';
import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrismThemeProvider } from '../prism';

export function makeTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  opts: { route?: string; client?: QueryClient } = {}
): RenderResult & { client: QueryClient } {
  const client = opts.client ?? makeTestQueryClient();
  const result = render(
    <QueryClientProvider client={client}>
      <PrismThemeProvider>
        <MemoryRouter initialEntries={[opts.route ?? '/']}>{ui}</MemoryRouter>
      </PrismThemeProvider>
    </QueryClientProvider>
  );
  return { ...result, client };
}
```

- [ ] **Step 2: Write the failing hooks test** — `src/components/library/hooks.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { libraryKeys, useInterests, useShelf, useCreateInterest } from './hooks';
import { makeTestQueryClient } from './testHelpers';

const server = setupServer(
  http.get('/interests', () => HttpResponse.json([{ id: 'i1', intent: 'Jazz', 'taste-profile': {} }])),
  http.get('/interests/i1/recommendations', () => HttpResponse.json([{ id: 'r1', kind: 'article', status: 'shelved' }])),
  http.post('/interests', () => HttpResponse.json({ id: 'i2', intent: 'New', 'taste-profile': {} })),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function wrapper(client = makeTestQueryClient()) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe('libraryKeys', () => {
  it('scopes shelf keys by interest id and filters', () => {
    expect(libraryKeys.shelf('i1', { status: 'shelved' }))
      .toEqual(['interests', 'i1', 'shelf', { status: 'shelved' }]);
    expect(libraryKeys.detail('i1')).toEqual(['interests', 'i1']);
  });
});

describe('useInterests', () => {
  it('fetches the interest list', async () => {
    const { result } = renderHook(() => useInterests(undefined), { wrapper: wrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].intent).toBe('Jazz');
  });
});

describe('useShelf', () => {
  it('fetches the shelf for an interest', async () => {
    const { result } = renderHook(() => useShelf('i1', { status: 'shelved' }, undefined), { wrapper: wrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].id).toBe('r1');
  });

  it('is disabled when interest id is empty', () => {
    const { result } = renderHook(() => useShelf('', {}, undefined), { wrapper: wrapper() });
    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useCreateInterest', () => {
  it('invalidates the interest list on success', async () => {
    const client = makeTestQueryClient();
    // seed the list cache so we can observe invalidation
    await client.prefetchQuery({ queryKey: libraryKeys.list(), queryFn: () => Promise.resolve([]) });
    const { result } = renderHook(() => useCreateInterest(undefined), { wrapper: wrapper(client) });
    result.current.mutate({ intent: 'New' });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.getQueryState(libraryKeys.list())?.isInvalidated).toBe(true);
  });
});
```

- [ ] **Step 3: Run it, verify it fails**

Run: `npx vitest run src/components/library/hooks.test.tsx`
Expected: FAIL — `Cannot find module './hooks'`.

- [ ] **Step 4: Implement the hooks** — `src/components/library/hooks.ts`:

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getInterests, getInterest, createInterest, updateInterest, deleteInterest,
  getShelf, updateRecommendationStatus, curate, respondToCurationStep,
} from '../../api/interests';
import type {
  Interest, TasteProfile, RecommendationStatus, ShelfFilters, CurationResult,
} from '../../types/interest';

export const libraryKeys = {
  all: ['interests'] as const,
  list: () => ['interests'] as const,
  detail: (id: string) => ['interests', id] as const,
  shelf: (id: string, filters: ShelfFilters) => ['interests', id, 'shelf', filters] as const,
};

export function useInterests(token: string | undefined) {
  return useQuery({ queryKey: libraryKeys.list(), queryFn: () => getInterests(token) });
}

export function useInterest(id: string, token: string | undefined) {
  return useQuery({
    queryKey: libraryKeys.detail(id),
    queryFn: () => getInterest(id, token),
    enabled: Boolean(id),
  });
}

export function useShelf(id: string, filters: ShelfFilters, token: string | undefined) {
  return useQuery({
    queryKey: libraryKeys.shelf(id, filters),
    queryFn: () => getShelf(id, filters, token),
    enabled: Boolean(id),
  });
}

export function useCreateInterest(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { intent: string; taste_profile?: TasteProfile }) =>
      createInterest(body, token),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: libraryKeys.list() }); },
  });
}

export function useUpdateInterest(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; body: { intent?: string; taste_profile?: TasteProfile } }) =>
      updateInterest(vars.id, vars.body, token),
    onSuccess: (updated: Interest) => {
      void qc.invalidateQueries({ queryKey: libraryKeys.detail(updated.id) });
      void qc.invalidateQueries({ queryKey: libraryKeys.list() });
    },
  });
}

export function useDeleteInterest(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInterest(id, token),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: libraryKeys.list() }); },
  });
}

export function useCurate(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: string; body?: { scrutiny?: 'quick' | 'standard' | 'rigorous'; shelf_size?: number } }): Promise<CurationResult> =>
      curate(vars.id, vars.body ?? {}, token),
    onSuccess: (_result, vars) => {
      void qc.invalidateQueries({ queryKey: libraryKeys.detail(vars.id) });
      void qc.invalidateQueries({ queryKey: ['interests', vars.id, 'shelf'] });
    },
  });
}

export function useRespondToStep(token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { interestId: string; runId: string; stepRunId: string; answers: string[] }): Promise<CurationResult> =>
      respondToCurationStep(vars.interestId, vars.runId, vars.stepRunId, vars.answers, token),
    onSuccess: (_result, vars) => {
      void qc.invalidateQueries({ queryKey: libraryKeys.detail(vars.interestId) });
      void qc.invalidateQueries({ queryKey: ['interests', vars.interestId, 'shelf'] });
    },
  });
}

export function useUpdateRecStatus(interestId: string, token: string | undefined) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { recId: string; status: RecommendationStatus }) =>
      updateRecommendationStatus(interestId, vars.recId, vars.status, token),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ['interests', interestId, 'shelf'] }); },
  });
}
```

- [ ] **Step 5: Run tests, verify they pass**

Run: `npx vitest run src/components/library/hooks.test.tsx`
Expected: PASS (5 tests).

- [ ] **Step 6: Commit**

```bash
git add src/components/library/hooks.ts src/components/library/hooks.test.tsx src/components/library/testHelpers.tsx
git commit -m "feat(library): TanStack Query hooks + query-key factory + test helper"
```

---

## Task 3: Catalog helpers + CatalogCard

**Files:**
- Create: `src/components/library/catalog.ts`
- Test: `src/components/library/catalog.test.ts`
- Create: `src/components/library/CatalogCard.tsx`
- Test: `src/components/library/CatalogCard.test.tsx`

**Interfaces:**
- Consumes: Task 1 types; Prism `Card`, `Chip`, `Menu`, `MenuItem`, `IconButton`; `useUpdateRecStatus` (Task 2); `useTheme` from `@mui/material/styles`.
- Produces:
  - `catalogCode(kind: string): string` — media kind → 3-letter catalog code.
  - `originLabel(origin: Origin): string` and `originColorKey(origin): 1 | 2` (index into `theme.tokens.color.categorical`).
  - `CatalogCard` component — props `{ rec: Recommendation; interestId: string; token: string | undefined }`.

- [ ] **Step 1: Write the failing catalog-helpers test** — `src/components/library/catalog.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { catalogCode, originLabel, originColorKey } from './catalog';

describe('catalogCode', () => {
  it('maps known kinds to 3-letter codes', () => {
    expect(catalogCode('podcast')).toBe('POD');
    expect(catalogCode('article')).toBe('ART');
    expect(catalogCode('newsletter')).toBe('NWS');
    expect(catalogCode('paper')).toBe('PPR');
  });
  it('falls back to the uppercased first 3 letters for unknown kinds', () => {
    expect(catalogCode('zine')).toBe('ZIN');
  });
});

describe('origin metadata', () => {
  it('labels trusted vs novel and picks distinct categorical slots', () => {
    expect(originLabel('trusted')).toBe('TRUSTED');
    expect(originLabel('novel')).toBe('NEW SOURCE');
    expect(originColorKey('trusted')).toBe(1); // purple #9085E9
    expect(originColorKey('novel')).toBe(2);   // amber  #C98500
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/catalog.test.ts`
Expected: FAIL — `Cannot find module './catalog'`.

- [ ] **Step 3: Implement catalog helpers** — `src/components/library/catalog.ts`:

```typescript
import type { Origin } from '../../types/interest';

const CODES: Record<string, string> = {
  podcast: 'POD', article: 'ART', show: 'SHW', video: 'VID',
  book: 'BK', paper: 'PPR', newsletter: 'NWS', course: 'CRS',
};

export function catalogCode(kind: string): string {
  return CODES[kind] ?? kind.slice(0, 3).toUpperCase();
}

export function originLabel(origin: Origin): string {
  return origin === 'trusted' ? 'TRUSTED' : 'NEW SOURCE';
}

/** Index into theme.tokens.color.categorical: 1 = purple (trusted), 2 = amber (novel). */
export function originColorKey(origin: Origin): 1 | 2 {
  return origin === 'trusted' ? 1 : 2;
}
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npx vitest run src/components/library/catalog.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Write the failing CatalogCard test** — `src/components/library/CatalogCard.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CatalogCard } from './CatalogCard';
import { renderWithProviders, makeTestQueryClient } from './testHelpers';
import type { Recommendation } from '../../types/interest';

const rec: Recommendation = {
  id: 'r1', interest_id: 'i1', kind: 'article', title: 'Power & Silicon',
  source: 'PBS Frontline', url: 'https://x', est_time: '18 min',
  why: 'Matches your interest in tech and power', origin: 'novel',
  status: 'shelved', added_at: '2026-07-14T00:00:00Z',
};

const server = setupServer(
  http.put('/interests/i1/recommendations/r1', () =>
    HttpResponse.json({ ...rec, status: 'archived', origin: 'novel', kind: 'article', 'interest-id': 'i1', 'est-time': '18 min', 'added-at': '2026-07-14T00:00:00Z' })),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CatalogCard', () => {
  it('shows the catalog code, title, source, est time, why, and a NEW SOURCE tag for novel items', () => {
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} />);
    expect(screen.getByText('ART')).toBeInTheDocument();
    expect(screen.getByText('Power & Silicon')).toBeInTheDocument();
    expect(screen.getByText('PBS Frontline')).toBeInTheDocument();
    expect(screen.getByText('18 min')).toBeInTheDocument();
    expect(screen.getByText(/Matches your interest/)).toBeInTheDocument();
    expect(screen.getByText('NEW SOURCE')).toBeInTheDocument();
  });

  it('shows a TRUSTED tag for trusted items', () => {
    renderWithProviders(<CatalogCard rec={{ ...rec, origin: 'trusted' }} interestId="i1" token={undefined} />);
    expect(screen.getByText('TRUSTED')).toBeInTheDocument();
  });

  it('archives via the status menu', async () => {
    const client = makeTestQueryClient();
    const spy = vi.spyOn(client, 'invalidateQueries');
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} />, { client });
    await userEvent.click(screen.getByRole('button', { name: /card actions/i }));
    await userEvent.click(screen.getByRole('menuitem', { name: /archive/i }));
    await waitFor(() => expect(spy).toHaveBeenCalledWith({ queryKey: ['interests', 'i1', 'shelf'] }));
  });

  it('links the title to the source url', () => {
    renderWithProviders(<CatalogCard rec={rec} interestId="i1" token={undefined} />);
    expect(screen.getByRole('link', { name: /Power & Silicon/ })).toHaveAttribute('href', 'https://x');
  });
});
```

- [ ] **Step 6: Run it, verify it fails**

Run: `npx vitest run src/components/library/CatalogCard.test.tsx`
Expected: FAIL — `Cannot find module './CatalogCard'`.

- [ ] **Step 7: Implement CatalogCard** — `src/components/library/CatalogCard.tsx`:

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, Chip, IconButton, Menu, MenuItem } from '../prism';
import { catalogCode, originLabel, originColorKey } from './catalog';
import { useUpdateRecStatus } from './hooks';
import type { Recommendation, RecommendationStatus } from '../../types/interest';

interface Props {
  rec: Recommendation;
  interestId: string;
  token: string | undefined;
}

export const CatalogCard: React.FC<Props> = ({ rec, interestId, token }) => {
  const { tokens } = useTheme();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const updateStatus = useUpdateRecStatus(interestId, token);
  const originColor = tokens.color.categorical[originColorKey(rec.origin)];

  const setStatus = (status: RecommendationStatus): void => {
    setAnchor(null);
    updateStatus.mutate({ recId: rec.id, status });
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <Chip as="span" dotColor={originColor} pressed={false}>
          {catalogCode(rec.kind)}
        </Chip>
        <IconButton aria-label="card actions" onClick={(e) => setAnchor(e.currentTarget)}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </div>

      <a
        href={rec.url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'block', marginTop: 12, fontSize: 16, fontWeight: 600,
          color: tokens.color.text.primary, textDecoration: 'none',
        }}
      >
        {rec.title}
      </a>

      <div style={{
        marginTop: 8, fontFamily: tokens.typography.mono, fontSize: 11.5,
        color: tokens.color.text.secondary, display: 'flex', gap: 10, flexWrap: 'wrap',
      }}>
        <span>{rec.source}</span>
        <span aria-hidden>·</span>
        <span>{rec.est_time}</span>
      </div>

      <p style={{ marginTop: 12, color: tokens.color.text.secondary, fontSize: 13, lineHeight: 1.5 }}>
        {rec.why}
      </p>

      <div style={{
        marginTop: 14, fontFamily: tokens.typography.mono, fontSize: 10.5, letterSpacing: '0.08em',
        color: originColor, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: originColor }} aria-hidden />
        {originLabel(rec.origin)}
      </div>

      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => setStatus('shelved')}>Keep on shelf</MenuItem>
        <MenuItem onClick={() => setStatus('queued')}>Queue for later</MenuItem>
        <MenuItem onClick={() => setStatus('archived')}>Archive</MenuItem>
      </Menu>
    </Card>
  );
};
```

> **Before implementing:** open `src/components/prism/Menu.tsx` and `IconButton.tsx` to confirm their exact prop names (`anchorEl`/`open`/`onClose` for `Menu`; `aria-label`/`onClick` for `IconButton`). Adjust the JSX to the real signatures if they differ — the test asserts behavior (role `menuitem`, button name "card actions"), not internal props.

- [ ] **Step 8: Run tests, verify they pass**

Run: `npx vitest run src/components/library/CatalogCard.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 9: Commit**

```bash
git add src/components/library/catalog.ts src/components/library/catalog.test.ts src/components/library/CatalogCard.tsx src/components/library/CatalogCard.test.tsx
git commit -m "feat(library): CatalogCard with trusted/novel tag + status menu"
```

---

## Task 4: ShelfView (kind-filter chips + card grid + empty state)

**Files:**
- Create: `src/components/library/ShelfView.tsx`
- Test: `src/components/library/ShelfView.test.tsx`

**Interfaces:**
- Consumes: `useShelf` (Task 2), `CatalogCard` (Task 3), Prism `Chip`, `useTheme`.
- Produces: `ShelfView` — props `{ interestId: string; token: string | undefined }`. Renders a media-kind filter chip row (derived from the shelf's kinds), a finite grid of `CatalogCard`, and an empty state when the shelf is empty.

- [ ] **Step 1: Write the failing test** — `src/components/library/ShelfView.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { ShelfView } from './ShelfView';
import { renderWithProviders } from './testHelpers';

const shelf = [
  { id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Alpha', source: 'PBS', url: 'https://a', 'est-time': '10 min', why: 'w1', origin: 'trusted', status: 'shelved', 'added-at': '2026-07-14T00:00:00Z' },
  { id: 'r2', 'interest-id': 'i1', kind: 'podcast', title: 'Beta', source: 'NPR', url: 'https://b', 'est-time': '40 min', why: 'w2', origin: 'novel', status: 'shelved', 'added-at': '2026-07-14T00:00:00Z' },
];

const server = setupServer(
  http.get('/interests/i1/recommendations', ({ request }) => {
    const kind = new URL(request.url).searchParams.get('kind');
    return HttpResponse.json(kind ? shelf.filter((r) => r.kind === kind) : shelf);
  }),
  http.get('/interests/empty/recommendations', () => HttpResponse.json([])),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ShelfView', () => {
  it('renders a card per shelved item and a chip per present kind', async () => {
    renderWithProviders(<ShelfView interestId="i1" token={undefined} />);
    expect(await screen.findByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /podcast/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /article/i })).toBeInTheDocument();
  });

  it('filters the shelf when a kind chip is pressed', async () => {
    renderWithProviders(<ShelfView interestId="i1" token={undefined} />);
    await screen.findByText('Alpha');
    await userEvent.click(screen.getByRole('button', { name: /podcast/i }));
    await waitFor(() => expect(screen.queryByText('Alpha')).not.toBeInTheDocument());
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('shows an empty state when the shelf has no items', async () => {
    renderWithProviders(<ShelfView interestId="empty" token={undefined} />);
    expect(await screen.findByText(/shelf is empty/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/ShelfView.test.tsx`
Expected: FAIL — `Cannot find module './ShelfView'`.

- [ ] **Step 3: Implement ShelfView** — `src/components/library/ShelfView.tsx`:

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Chip } from '../prism';
import { CatalogCard } from './CatalogCard';
import { useShelf } from './hooks';

interface Props {
  interestId: string;
  token: string | undefined;
}

export const ShelfView: React.FC<Props> = ({ interestId, token }) => {
  const { tokens } = useTheme();
  const [kind, setKind] = React.useState<string | null>(null);
  // Unfiltered fetch drives the chip row so chips don't vanish when a filter is active.
  const all = useShelf(interestId, { status: 'shelved' }, token);
  const filtered = useShelf(
    interestId,
    kind ? { status: 'shelved', kind } : { status: 'shelved' },
    token
  );

  const kinds = React.useMemo(
    () => Array.from(new Set((all.data ?? []).map((r) => r.kind))).sort(),
    [all.data]
  );
  const items = filtered.data ?? [];

  return (
    <div>
      {kinds.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <Chip pressed={kind === null} onClick={() => setKind(null)}>ALL</Chip>
          {kinds.map((k) => (
            <Chip key={k} pressed={kind === k} onClick={() => setKind(kind === k ? null : k)}>
              {k}
            </Chip>
          ))}
        </div>
      )}

      {items.length === 0 ? (
        <p style={{ color: tokens.color.text.secondary, fontFamily: tokens.typography.mono, fontSize: 13 }}>
          This shelf is empty — run an acquisition to curate it.
        </p>
      ) : (
        <div style={{
          display: 'grid', gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        }}>
          {items.map((rec) => (
            <CatalogCard key={rec.id} rec={rec} interestId={interestId} token={token} />
          ))}
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 4: Run tests, verify they pass**

Run: `npx vitest run src/components/library/ShelfView.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/library/ShelfView.tsx src/components/library/ShelfView.test.tsx
git commit -m "feat(library): ShelfView with kind-filter chips + empty state"
```

---

## Task 5: TasteProfileEditor (+ novelty dial, save-only)

**Files:**
- Create: `src/components/library/TasteProfileEditor.tsx`
- Test: `src/components/library/TasteProfileEditor.test.tsx`

**Interfaces:**
- Consumes: `useUpdateInterest` (Task 2), Prism `TextInput`, `Chip`, `Button`, `useTheme`, Task 1 `Interest`/`TasteProfile`/`MediaFormat`.
- Produces: `TasteProfileEditor` — props `{ interest: Interest; token: string | undefined; onSaved?: () => void }`. Edits keywords, formats, lengths, trusted sources, and the novelty dial; a single **Save** persists the whole taste profile via `updateInterest` (dial is save-only — recomposition happens on the next curation, not on save).

- [ ] **Step 1: Write the failing test** — `src/components/library/TasteProfileEditor.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { TasteProfileEditor } from './TasteProfileEditor';
import { renderWithProviders } from './testHelpers';
import type { Interest } from '../../types/interest';

const interest: Interest = {
  id: 'i1', user_id: 'u', intent: 'Tech and power',
  taste_profile: {
    keywords: ['surveillance'], formats: ['article'], lengths: ['under 20 min'],
    trusted_sources: ['PBS Frontline'], novelty_ratio: 0.5, cadence: 'weekly',
  },
  created_at: '2026-07-14T00:00:00Z', updated_at: '2026-07-14T00:00:00Z',
};

let lastPutBody: unknown = null;
const server = setupServer(
  http.put('/interests/i1', async ({ request }) => {
    lastPutBody = await request.json();
    return HttpResponse.json({ ...interest, 'user-id': 'u', 'taste-profile': { 'novelty-ratio': 0.8 }, 'created-at': interest.created_at, 'updated-at': interest.updated_at });
  }),
);
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); lastPutBody = null; });
afterAll(() => server.close());

describe('TasteProfileEditor', () => {
  it('renders existing profile values', () => {
    renderWithProviders(<TasteProfileEditor interest={interest} token={undefined} />);
    expect(screen.getByText('surveillance')).toBeInTheDocument();
    expect(screen.getByText('PBS Frontline')).toBeInTheDocument();
    const dial = screen.getByRole('slider', { name: /novelty/i }) as HTMLInputElement;
    expect(dial.value).toBe('0.5');
  });

  it('adds a trusted source', async () => {
    renderWithProviders(<TasteProfileEditor interest={interest} token={undefined} />);
    await userEvent.type(screen.getByLabelText(/add trusted source/i), 'The Hill{enter}');
    expect(screen.getByText('The Hill')).toBeInTheDocument();
  });

  it('saves the whole taste profile (dial + sources) in one PUT', async () => {
    renderWithProviders(<TasteProfileEditor interest={interest} token={undefined} />);
    // jsdom doesn't emulate range drag; set the value directly and dispatch input.
    const dial = screen.getByRole('slider', { name: /novelty/i }) as HTMLInputElement;
    fireEvent.change(dial, { target: { value: '0.8' } });
    await userEvent.click(screen.getByRole('button', { name: /save profile/i }));
    await waitFor(() => expect(lastPutBody).not.toBeNull());
    expect(lastPutBody).toMatchObject({ 'taste-profile': { 'novelty-ratio': 0.8, 'trusted-sources': ['PBS Frontline'] } });
  });
});
```

> Note: the component's range `onChange` must read `Number(e.target.value)` so `fireEvent.change` drives it.

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/TasteProfileEditor.test.tsx`
Expected: FAIL — `Cannot find module './TasteProfileEditor'`.

- [ ] **Step 3: Implement TasteProfileEditor** — `src/components/library/TasteProfileEditor.tsx`:

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextInput, Chip, Button } from '../prism';
import { useUpdateInterest } from './hooks';
import type { Interest, MediaFormat, TasteProfile } from '../../types/interest';

const ALL_FORMATS: MediaFormat[] = [
  'podcast', 'article', 'show', 'video', 'book', 'paper', 'newsletter', 'course',
];

interface Props {
  interest: Interest;
  token: string | undefined;
  onSaved?: () => void;
}

export const TasteProfileEditor: React.FC<Props> = ({ interest, token, onSaved }) => {
  const { tokens } = useTheme();
  const tp = interest.taste_profile;
  const [formats, setFormats] = React.useState<MediaFormat[]>(tp.formats ?? []);
  const [sources, setSources] = React.useState<string[]>(tp.trusted_sources ?? []);
  const [novelty, setNovelty] = React.useState<number>(tp.novelty_ratio ?? 0.5);
  const [sourceDraft, setSourceDraft] = React.useState('');
  const update = useUpdateInterest(token);

  const purple = tokens.color.categorical[1];
  const amber = tokens.color.categorical[2];

  const addSource = (): void => {
    const s = sourceDraft.trim();
    if (s && !sources.includes(s)) setSources([...sources, s]);
    setSourceDraft('');
  };

  const toggleFormat = (f: MediaFormat): void =>
    setFormats(formats.includes(f) ? formats.filter((x) => x !== f) : [...formats, f]);

  const save = (): void => {
    const taste_profile: TasteProfile = {
      ...tp, formats, trusted_sources: sources, novelty_ratio: novelty,
    };
    update.mutate({ id: interest.id, body: { taste_profile } }, { onSuccess: () => onSaved?.() });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
      <section>
        <h3 style={eyebrow(tokens)}>KEYWORDS</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {(tp.keywords ?? []).map((k) => (
            <Chip as="span" key={k} pressed={false}>{k}</Chip>
          ))}
        </div>
      </section>

      <section>
        <h3 style={eyebrow(tokens)}>FORMATS</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ALL_FORMATS.map((f) => (
            <Chip key={f} pressed={formats.includes(f)} onClick={() => toggleFormat(f)}>{f}</Chip>
          ))}
        </div>
      </section>

      <section>
        <h3 style={eyebrow(tokens)}>SOURCES</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {sources.map((s) => (
            <Chip key={s} pressed onClick={() => setSources(sources.filter((x) => x !== s))}>
              {s} ✕
            </Chip>
          ))}
        </div>
        <TextInput
          aria-label="add trusted source"
          placeholder="Add a trusted source…"
          value={sourceDraft}
          onChange={(e) => setSourceDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSource(); } }}
        />
      </section>

      <section>
        <h3 style={eyebrow(tokens)}>NOVELTY DIAL</h3>
        <p style={{ color: tokens.color.text.secondary, fontSize: 12.5, marginBottom: 8 }}>
          {Math.round((1 - novelty) * 100)}% trusted · {Math.round(novelty * 100)}% new sources
          <br />
          <span style={{ color: tokens.color.text.disabled }}>
            Takes effect on your next acquisition.
          </span>
        </p>
        <input
          type="range"
          aria-label="novelty ratio"
          min={0}
          max={1}
          step={0.05}
          value={novelty}
          onChange={(e) => setNovelty(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: amber,
            background: `linear-gradient(90deg, ${purple}, ${amber})`,
          }}
        />
      </section>

      <div>
        <Button variant="primary" onClick={save} disabled={update.isPending}>
          {update.isPending ? 'Saving…' : 'Save profile'}
        </Button>
      </div>
    </div>
  );
};

function eyebrow(tokens: { typography: { mono: string }; color: { text: { secondary: string } } }): React.CSSProperties {
  return {
    fontFamily: tokens.typography.mono, fontSize: 11, letterSpacing: '0.1em',
    color: tokens.color.text.secondary, marginBottom: 10,
  };
}
```

> **Before implementing:** confirm `TextInput` forwards `aria-label`, `value`, `onChange`, `onKeyDown` (it's `styled('input')`, so native input props pass through). If the Prism `TextInput` wraps the input, adjust the label query in the test accordingly.

- [ ] **Step 4: Run tests, verify they pass**

Run: `npx vitest run src/components/library/TasteProfileEditor.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/library/TasteProfileEditor.tsx src/components/library/TasteProfileEditor.test.tsx
git commit -m "feat(library): taste-profile editor with save-only novelty dial"
```

---

## Task 6: RefinementQuestions (shared clarify Q&A form)

**Files:**
- Create: `src/components/library/RefinementQuestions.tsx`
- Test: `src/components/library/RefinementQuestions.test.tsx`

**Interfaces:**
- Consumes: Prism `TextInput`, `Button`, `useTheme`.
- Produces: `RefinementQuestions` — props `{ questions: string[]; onSubmit: (answers: string[]) => void; submitting?: boolean }`. Renders one input per question and calls `onSubmit` with answers positionally aligned to `questions`. Reused by OnboardingDialog (Task 7) and AcquisitionsPipeline (Task 8).

- [ ] **Step 1: Write the failing test** — `src/components/library/RefinementQuestions.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefinementQuestions } from './RefinementQuestions';
import { renderWithProviders } from './testHelpers';

describe('RefinementQuestions', () => {
  it('renders one field per question and submits aligned answers', async () => {
    const onSubmit = vi.fn();
    renderWithProviders(
      <RefinementQuestions
        questions={['Which era of jazz?', 'Prefer theory or history?']}
        onSubmit={onSubmit}
      />
    );
    const fields = screen.getAllByRole('textbox');
    expect(fields).toHaveLength(2);
    await userEvent.type(fields[0], 'post-1959');
    await userEvent.type(fields[1], 'history');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onSubmit).toHaveBeenCalledWith(['post-1959', 'history']);
  });

  it('disables the submit button while submitting', () => {
    renderWithProviders(
      <RefinementQuestions questions={['Q?']} onSubmit={vi.fn()} submitting />
    );
    expect(screen.getByRole('button', { name: /refining/i })).toBeDisabled();
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/RefinementQuestions.test.tsx`
Expected: FAIL — `Cannot find module './RefinementQuestions'`.

- [ ] **Step 3: Implement RefinementQuestions** — `src/components/library/RefinementQuestions.tsx`:

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { TextInput, Button } from '../prism';

interface Props {
  questions: string[];
  onSubmit: (answers: string[]) => void;
  submitting?: boolean;
}

export const RefinementQuestions: React.FC<Props> = ({ questions, onSubmit, submitting }) => {
  const { tokens } = useTheme();
  const [answers, setAnswers] = React.useState<string[]>(() => questions.map(() => ''));

  const setAnswer = (i: number, v: string): void =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? v : a)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {questions.map((q, i) => (
        <label key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ color: tokens.color.text.secondary, fontSize: 13 }}>{q}</span>
          <TextInput
            value={answers[i]}
            onChange={(e) => setAnswer(i, e.target.value)}
            placeholder="Your answer…"
          />
        </label>
      ))}
      <div>
        <Button variant="primary" disabled={submitting} onClick={() => onSubmit(answers)}>
          {submitting ? 'Refining…' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
```

- [ ] **Step 4: Run tests, verify they pass**

Run: `npx vitest run src/components/library/RefinementQuestions.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/library/RefinementQuestions.tsx src/components/library/RefinementQuestions.test.tsx
git commit -m "feat(library): shared refinement (clarify) Q&A form"
```

---

## Task 7: OnboardingDialog (intent → curate → clarify branch → shelf)

**Files:**
- Create: `src/components/library/OnboardingDialog.tsx`
- Test: `src/components/library/OnboardingDialog.test.tsx`

**Interfaces:**
- Consumes: Prism `Dialog`, `TextInput`, `Button`; `useCreateInterest`, `useCurate`, `useRespondToStep` (Task 2); `RefinementQuestions` (Task 6); Task 1 `CurationResult`.
- Produces: `OnboardingDialog` — props `{ open: boolean; onClose: () => void; token: string | undefined; onCreated: (interestId: string) => void }`. Flow: enter free-text intent → `createInterest` → `curate`. If curate returns `awaiting_input`, render `RefinementQuestions`; on submit call `respondToCurationStep`. On `completed`, call `onCreated(interestId)` and close.

- [ ] **Step 1: Write the failing test** — `src/components/library/OnboardingDialog.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { OnboardingDialog } from './OnboardingDialog';
import { renderWithProviders } from './testHelpers';

let curateCalls = 0;
const server = setupServer(
  http.post('/interests', () => HttpResponse.json({ id: 'i9', intent: 'Jazz', 'taste-profile': {}, 'user-id': 'u', 'created-at': 'x', 'updated-at': 'x' })),
  http.post('/interests/i9/curate', () => {
    curateCalls += 1;
    // First curate asks for refinement; used by the clarify test.
    return HttpResponse.json({ status: 'awaiting_input', 'run-id': 'run1', 'step-run-id': 'step1', questions: ['Which era?'] });
  }),
  http.post('/interests/i9/curation-runs/run1/steps/step1/respond', () =>
    HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: [] })),
);
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); curateCalls = 0; });
afterAll(() => server.close());

describe('OnboardingDialog', () => {
  it('creates an interest, runs the clarify branch, then reports created on completion', async () => {
    const onCreated = vi.fn();
    renderWithProviders(<OnboardingDialog open onClose={vi.fn()} token={undefined} onCreated={onCreated} />);
    await userEvent.type(screen.getByLabelText(/what do you want to follow/i), 'Modern jazz history');
    await userEvent.click(screen.getByRole('button', { name: /create shelf/i }));

    // clarify step appears
    expect(await screen.findByText('Which era?')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'post-1959');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => expect(onCreated).toHaveBeenCalledWith('i9'));
  });

  it('skips refinement when curate completes immediately', async () => {
    server.use(
      http.post('/interests/i9/curate', () =>
        HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: [] })),
    );
    const onCreated = vi.fn();
    renderWithProviders(<OnboardingDialog open onClose={vi.fn()} token={undefined} onCreated={onCreated} />);
    await userEvent.type(screen.getByLabelText(/what do you want to follow/i), 'Jazz');
    await userEvent.click(screen.getByRole('button', { name: /create shelf/i }));
    await waitFor(() => expect(onCreated).toHaveBeenCalledWith('i9'));
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/OnboardingDialog.test.tsx`
Expected: FAIL — `Cannot find module './OnboardingDialog'`.

- [ ] **Step 3: Implement OnboardingDialog** — `src/components/library/OnboardingDialog.tsx`:

```tsx
import * as React from 'react';
import { Dialog, TextInput, Button } from '../prism';
import { RefinementQuestions } from './RefinementQuestions';
import { useCreateInterest, useCurate, useRespondToStep } from './hooks';
import type { CurationResult } from '../../types/interest';

interface Props {
  open: boolean;
  onClose: () => void;
  token: string | undefined;
  onCreated: (interestId: string) => void;
}

type Phase =
  | { name: 'intent' }
  | { name: 'refine'; interestId: string; runId: string; stepRunId: string; questions: string[] };

export const OnboardingDialog: React.FC<Props> = ({ open, onClose, token, onCreated }) => {
  const [intent, setIntent] = React.useState('');
  const [phase, setPhase] = React.useState<Phase>({ name: 'intent' });
  const create = useCreateInterest(token);
  const curateM = useCurate(token);
  const respond = useRespondToStep(token);

  const reset = (): void => { setIntent(''); setPhase({ name: 'intent' }); };
  const close = (): void => { reset(); onClose(); };

  const handleResult = (interestId: string, result: CurationResult): void => {
    if (result.status === 'awaiting_input') {
      setPhase({
        name: 'refine', interestId, runId: result.run_id,
        stepRunId: result.step_run_id, questions: result.questions,
      });
    } else {
      reset();
      onCreated(interestId);
    }
  };

  const start = (): void => {
    create.mutate({ intent }, {
      onSuccess: (interest) => {
        curateM.mutate({ id: interest.id }, {
          onSuccess: (result) => handleResult(interest.id, result),
        });
      },
    });
  };

  const submitAnswers = (answers: string[]): void => {
    if (phase.name !== 'refine') return;
    respond.mutate(
      { interestId: phase.interestId, runId: phase.runId, stepRunId: phase.stepRunId, answers },
      { onSuccess: (result) => handleResult(phase.interestId, result) }
    );
  };

  const busy = create.isPending || curateM.isPending;

  return (
    <Dialog
      open={open}
      onClose={close}
      title="Add an interest"
      actions={phase.name === 'intent'
        ? <>
            <Button variant="ghost" onClick={close}>Cancel</Button>
            <Button variant="primary" onClick={start} disabled={!intent.trim() || busy}>
              {busy ? 'Curating…' : 'Create shelf'}
            </Button>
          </>
        : <Button variant="ghost" onClick={close}>Cancel</Button>}
    >
      {phase.name === 'intent' ? (
        <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span>What do you want to follow?</span>
          <TextInput
            aria-label="what do you want to follow"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            placeholder="e.g. investigative journalism about tech and power"
          />
        </label>
      ) : (
        <RefinementQuestions
          questions={phase.questions}
          submitting={respond.isPending}
          onSubmit={submitAnswers}
        />
      )}
    </Dialog>
  );
};
```

> **Before implementing:** confirm the Prism `Dialog` renders `actions` in the footer and `title` in the header (it does, per `Dialog.tsx`). The test asserts on button/label text, not Dialog internals.

- [ ] **Step 4: Run tests, verify they pass**

Run: `npx vitest run src/components/library/OnboardingDialog.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/library/OnboardingDialog.tsx src/components/library/OnboardingDialog.test.tsx
git commit -m "feat(library): onboarding dialog with clarify (refinement) branch"
```

---

## Task 8: AcquisitionsPipeline (curate trigger + staged reveal + summary)

**Files:**
- Create: `src/components/library/AcquisitionsPipeline.tsx`
- Test: `src/components/library/AcquisitionsPipeline.test.tsx`

**Interfaces:**
- Consumes: `useCurate`, `useRespondToStep` (Task 2); `RefinementQuestions` (Task 6); Prism `Button`, `useTheme`; Task 1 `CurationResult`.
- Produces: `AcquisitionsPipeline` — props `{ interestId: string; token: string | undefined }`. A **Run acquisition** button triggers `curate`. While pending, shows the three stages (Discover → Relevance Score → Shelve) as an animated reveal. On `completed`, shows the summary line "N shelved · T trusted · V novel". On `awaiting_input`, shows `RefinementQuestions`; submitting resumes via `respondToCurationStep`.

- [ ] **Step 1: Write the failing test** — `src/components/library/AcquisitionsPipeline.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { AcquisitionsPipeline } from './AcquisitionsPipeline';
import { renderWithProviders } from './testHelpers';

const server = setupServer(
  http.post('/interests/i1/curate', () =>
    HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: [] })),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('AcquisitionsPipeline', () => {
  it('shows the three stages and settles on the curation summary', async () => {
    renderWithProviders(<AcquisitionsPipeline interestId="i1" token={undefined} />);
    expect(screen.getByText(/discover/i)).toBeInTheDocument();
    expect(screen.getByText(/relevance score/i)).toBeInTheDocument();
    expect(screen.getByText(/shelve/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /run acquisition/i }));
    expect(await screen.findByText(/6 shelved/i)).toBeInTheDocument();
    expect(screen.getByText(/3 trusted/i)).toBeInTheDocument();
    expect(screen.getByText(/3 novel/i)).toBeInTheDocument();
  });

  it('surfaces refinement questions when curation awaits input', async () => {
    server.use(
      http.post('/interests/i1/curate', () =>
        HttpResponse.json({ status: 'awaiting_input', 'run-id': 'run1', 'step-run-id': 'step1', questions: ['Narrower topic?'] })),
      http.post('/interests/i1/curation-runs/run1/steps/step1/respond', () =>
        HttpResponse.json({ status: 'completed', 'run-id': 'run1', summary: { total: 4, trusted: 2, novel: 2 }, shelved: [] })),
    );
    renderWithProviders(<AcquisitionsPipeline interestId="i1" token={undefined} />);
    await userEvent.click(screen.getByRole('button', { name: /run acquisition/i }));
    expect(await screen.findByText('Narrower topic?')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox'), 'jazz theory');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText(/4 shelved/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/AcquisitionsPipeline.test.tsx`
Expected: FAIL — `Cannot find module './AcquisitionsPipeline'`.

- [ ] **Step 3: Implement AcquisitionsPipeline** — `src/components/library/AcquisitionsPipeline.tsx`:

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button } from '../prism';
import { RefinementQuestions } from './RefinementQuestions';
import { useCurate, useRespondToStep } from './hooks';
import type { CurationResult } from '../../types/interest';

interface Props {
  interestId: string;
  token: string | undefined;
}

const STAGES = ['Discover', 'Relevance Score', 'Shelve'] as const;

type View =
  | { name: 'idle' }
  | { name: 'running' }
  | { name: 'refine'; runId: string; stepRunId: string; questions: string[] }
  | { name: 'done'; total: number; trusted: number; novel: number };

export const AcquisitionsPipeline: React.FC<Props> = ({ interestId, token }) => {
  const { tokens } = useTheme();
  const [view, setView] = React.useState<View>({ name: 'idle' });
  const curateM = useCurate(token);
  const respond = useRespondToStep(token);
  const purple = tokens.color.categorical[1];
  const amber = tokens.color.categorical[2];

  const apply = (result: CurationResult): void => {
    if (result.status === 'awaiting_input') {
      setView({ name: 'refine', runId: result.run_id, stepRunId: result.step_run_id, questions: result.questions });
    } else {
      setView({ name: 'done', ...result.summary });
    }
  };

  const run = (): void => {
    setView({ name: 'running' });
    curateM.mutate({ id: interestId }, { onSuccess: apply });
  };

  const submitAnswers = (answers: string[]): void => {
    if (view.name !== 'refine') return;
    setView({ name: 'running' });
    respond.mutate(
      { interestId, runId: view.runId, stepRunId: view.stepRunId, answers },
      { onSuccess: apply }
    );
  };

  const active = view.name === 'running';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        {STAGES.map((stage, i) => (
          <React.Fragment key={stage}>
            <div style={{
              flex: 1, padding: '16px 18px', borderRadius: tokens.radius.lg,
              background: tokens.color.surface.raised,
              border: `1px solid ${active ? tokens.color.brand.primary : tokens.color.border.subtle}`,
              transition: `border-color ${tokens.motion.duration.base}ms ${tokens.motion.easing.springSettle}`,
              opacity: active ? 1 : 0.85,
            }}>
              <div style={{ fontFamily: tokens.typography.mono, fontSize: 11, letterSpacing: '0.08em', color: tokens.color.text.secondary }}>
                STEP {i + 1}
              </div>
              <div style={{ marginTop: 6, color: tokens.color.text.primary, fontWeight: 600 }}>{stage}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: tokens.color.text.secondary }}>
                {active ? 'Librarian at work…' : 'Idle'}
              </div>
            </div>
            {i < STAGES.length - 1 && (
              <div aria-hidden style={{ alignSelf: 'center', color: tokens.color.text.disabled }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {view.name === 'done' && (
        <div style={{ fontFamily: tokens.typography.mono, fontSize: 14, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ color: tokens.color.text.primary }}>{view.total} shelved</span>
          <span aria-hidden>·</span>
          <span style={{ color: purple }}>{view.trusted} trusted</span>
          <span aria-hidden>·</span>
          <span style={{ color: amber }}>{view.novel} novel</span>
        </div>
      )}

      {view.name === 'refine' && (
        <RefinementQuestions
          questions={view.questions}
          submitting={respond.isPending}
          onSubmit={submitAnswers}
        />
      )}

      {view.name !== 'refine' && (
        <div>
          <Button variant="primary" onClick={run} disabled={active}>
            {active ? 'Running…' : 'Run acquisition'}
          </Button>
        </div>
      )}
    </div>
  );
};
```

- [ ] **Step 4: Run tests, verify they pass**

Run: `npx vitest run src/components/library/AcquisitionsPipeline.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/library/AcquisitionsPipeline.tsx src/components/library/AcquisitionsPipeline.test.tsx
git commit -m "feat(library): acquisitions pipeline with staged reveal + refinement resume"
```

---

## Task 9: CheckInDialog (composed calibration flow)

**Files:**
- Create: `src/components/library/CheckInDialog.tsx`
- Test: `src/components/library/CheckInDialog.test.tsx`

**Interfaces:**
- Consumes: Prism `Dialog`, `Button`, `Chip`, `useTheme`; `useShelf`, `useUpdateRecStatus`, `useUpdateInterest` (Task 2); Task 1 `Interest`.
- Produces: `CheckInDialog` — props `{ open: boolean; onClose: () => void; interest: Interest; token: string | undefined }`. Samples up to 5 shelved items; for each, "Landed" (keep shelved) or "Not for me" (archive) via `useUpdateRecStatus`. If a kept item is `novel`, offers to promote its source into `trusted_sources` via `useUpdateInterest`. **No dedicated endpoint** — pure composition over existing routes.

- [ ] **Step 1: Write the failing test** — `src/components/library/CheckInDialog.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CheckInDialog } from './CheckInDialog';
import { renderWithProviders } from './testHelpers';
import type { Interest } from '../../types/interest';

const interest: Interest = {
  id: 'i1', user_id: 'u', intent: 'Tech and power',
  taste_profile: { trusted_sources: ['PBS Frontline'], novelty_ratio: 0.5 },
  created_at: 'x', updated_at: 'x',
};

let lastRecPut: { id: string; body: unknown } | null = null;
let lastInterestPut: unknown = null;
const server = setupServer(
  http.get('/interests/i1/recommendations', () => HttpResponse.json([
    { id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Novel One', source: 'The Verge', url: 'https://a', 'est-time': '9 min', why: 'w', origin: 'novel', status: 'shelved', 'added-at': 'x' },
  ])),
  http.put('/interests/i1/recommendations/r1', async ({ request }) => {
    lastRecPut = { id: 'r1', body: await request.json() };
    return HttpResponse.json({ id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Novel One', source: 'The Verge', url: 'https://a', 'est-time': '9 min', why: 'w', origin: 'novel', status: 'shelved', 'added-at': 'x' });
  }),
  http.put('/interests/i1', async ({ request }) => {
    lastInterestPut = await request.json();
    return HttpResponse.json({ ...interest, 'user-id': 'u', 'taste-profile': { 'trusted-sources': ['PBS Frontline', 'The Verge'] }, 'created-at': 'x', 'updated-at': 'x' });
  }),
);
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); lastRecPut = null; lastInterestPut = null; });
afterAll(() => server.close());

describe('CheckInDialog', () => {
  it('marks an item as landed (keeps it shelved) and offers to promote its novel source', async () => {
    renderWithProviders(<CheckInDialog open onClose={vi.fn()} interest={interest} token={undefined} />);
    expect(await screen.findByText('Novel One')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /landed/i }));
    // promotion offer for the novel source
    const promote = await screen.findByRole('button', { name: /promote The Verge/i });
    await userEvent.click(promote);
    await waitFor(() => expect(lastInterestPut).toMatchObject({ 'taste-profile': { 'trusted-sources': ['PBS Frontline', 'The Verge'] } }));
  });

  it('archives an item marked not for me', async () => {
    renderWithProviders(<CheckInDialog open onClose={vi.fn()} interest={interest} token={undefined} />);
    await screen.findByText('Novel One');
    await userEvent.click(screen.getByRole('button', { name: /not for me/i }));
    await waitFor(() => expect(lastRecPut).toEqual({ id: 'r1', body: { status: 'archived' } }));
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/CheckInDialog.test.tsx`
Expected: FAIL — `Cannot find module './CheckInDialog'`.

- [ ] **Step 3: Implement CheckInDialog** — `src/components/library/CheckInDialog.tsx`:

```tsx
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Dialog, Button } from '../prism';
import { useShelf, useUpdateRecStatus, useUpdateInterest } from './hooks';
import type { Interest, Recommendation } from '../../types/interest';

interface Props {
  open: boolean;
  onClose: () => void;
  interest: Interest;
  token: string | undefined;
}

export const CheckInDialog: React.FC<Props> = ({ open, onClose, interest, token }) => {
  const { tokens } = useTheme();
  const shelf = useShelf(interest.id, { status: 'shelved' }, token);
  const updateStatus = useUpdateRecStatus(interest.id, token);
  const updateInterest = useUpdateInterest(token);
  const [promotable, setPromotable] = React.useState<string | null>(null);

  const sample: Recommendation[] = (shelf.data ?? []).slice(0, 5);

  const landed = (rec: Recommendation): void => {
    updateStatus.mutate({ recId: rec.id, status: 'shelved' });
    const trusted = interest.taste_profile.trusted_sources ?? [];
    if (rec.origin === 'novel' && !trusted.includes(rec.source)) {
      setPromotable(rec.source);
    }
  };

  const notForMe = (rec: Recommendation): void =>
    updateStatus.mutate({ recId: rec.id, status: 'archived' });

  const promote = (source: string): void => {
    const trusted = interest.taste_profile.trusted_sources ?? [];
    updateInterest.mutate({
      id: interest.id,
      body: { taste_profile: { ...interest.taste_profile, trusted_sources: [...trusted, source] } },
    });
    setPromotable(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Check-in — which of these landed?"
      actions={<Button variant="ghost" onClick={onClose}>Done</Button>}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sample.map((rec) => (
          <div key={rec.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            padding: '10px 12px', borderRadius: tokens.radius.sm, background: tokens.color.surface.raised,
          }}>
            <span style={{ color: tokens.color.text.primary }}>{rec.title}</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="subtle" onClick={() => landed(rec)}>Landed</Button>
              <Button variant="ghost" onClick={() => notForMe(rec)}>Not for me</Button>
            </div>
          </div>
        ))}
        {promotable && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: tokens.color.text.secondary }}>
            <span>Trust {promotable} from now on?</span>
            <Button variant="primary" onClick={() => promote(promotable)}>
              Promote {promotable}
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
};
```

- [ ] **Step 4: Run tests, verify they pass**

Run: `npx vitest run src/components/library/CheckInDialog.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/library/CheckInDialog.tsx src/components/library/CheckInDialog.test.tsx
git commit -m "feat(library): check-in dialog composed over existing routes"
```

---

## Task 10: LibraryPage shell + InterestRail + routing + auth gate

**Files:**
- Create: `src/components/library/InterestRail.tsx`
- Test: `src/components/library/InterestRail.test.tsx`
- Create: `src/pages/library/LibraryPage.tsx`
- Test: `src/pages/library/LibraryPage.test.tsx`
- Modify: `src/App.tsx` — add lazy import + `/library` routes.

**Interfaces:**
- Consumes: `useAuth`; `useInterests`, `useInterest` (Task 2); `ShelfView`, `TasteProfileEditor`, `AcquisitionsPipeline`, `OnboardingDialog`, `CheckInDialog` (Tasks 4–9); `InterestRail`; Prism `PrismThemeProvider`, `Button`; `NavBar`, `LoadingScreen` from `components/layout`; `useParams`, `useNavigate`, `Link` from `react-router-dom`.
- Produces:
  - `InterestRail` — props `{ interests: Interest[]; activeId: string | undefined; onAdd: () => void }`. Renders links to `/library/:id` and an "add interest" button.
  - `LibraryPage` — the routed shell. Reads `:interestId` from the URL, renders the rail + the active stage (shelf/acquisitions/taste based on a `view` prop), mounts onboarding + check-in dialogs, and gates on `isAuthenticated` (writer). Default export.
  - `App.tsx` routes: `/library`, `/library/:interestId`, `/library/:interestId/acquisitions`, `/library/:interestId/taste`.

- [ ] **Step 1: Write the failing InterestRail test** — `src/components/library/InterestRail.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InterestRail } from './InterestRail';
import { renderWithProviders } from './testHelpers';
import type { Interest } from '../../types/interest';

const interests: Interest[] = [
  { id: 'i1', user_id: 'u', intent: 'Modern jazz history', taste_profile: {}, created_at: 'x', updated_at: 'x' },
  { id: 'i2', user_id: 'u', intent: 'Investigative tech journalism', taste_profile: {}, created_at: 'x', updated_at: 'x' },
];

describe('InterestRail', () => {
  it('renders a link per interest pointing at its shelf', () => {
    renderWithProviders(<InterestRail interests={interests} activeId="i1" onAdd={vi.fn()} />);
    expect(screen.getByRole('link', { name: /Modern jazz history/ })).toHaveAttribute('href', '/library/i1');
    expect(screen.getByRole('link', { name: /Investigative tech journalism/ })).toHaveAttribute('href', '/library/i2');
  });

  it('fires onAdd when the add button is clicked', async () => {
    const onAdd = vi.fn();
    renderWithProviders(<InterestRail interests={interests} activeId="i1" onAdd={onAdd} />);
    await userEvent.click(screen.getByRole('button', { name: /add interest/i }));
    expect(onAdd).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run it, verify it fails**

Run: `npx vitest run src/components/library/InterestRail.test.tsx`
Expected: FAIL — `Cannot find module './InterestRail'`.

- [ ] **Step 3: Implement InterestRail** — `src/components/library/InterestRail.tsx`:

```tsx
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Button } from '../prism';
import type { Interest } from '../../types/interest';

interface Props {
  interests: Interest[];
  activeId: string | undefined;
  onAdd: () => void;
}

export const InterestRail: React.FC<Props> = ({ interests, activeId, onAdd }) => {
  const { tokens } = useTheme();
  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 220 }}>
      <div style={{
        fontFamily: tokens.typography.mono, fontSize: 11, letterSpacing: '0.1em',
        color: tokens.color.text.secondary, marginBottom: 8,
      }}>
        INTERESTS
      </div>
      {interests.map((i) => (
        <Link
          key={i.id}
          to={`/library/${i.id}`}
          style={{
            padding: '8px 10px', borderRadius: tokens.radius.sm, textDecoration: 'none',
            color: i.id === activeId ? tokens.color.brand.primary : tokens.color.text.primary,
            background: i.id === activeId ? tokens.color.surface.sunken : 'transparent',
            fontSize: 14,
          }}
        >
          {i.intent}
        </Link>
      ))}
      <div style={{ marginTop: 12 }}>
        <Button variant="subtle" onClick={onAdd} aria-label="add interest">+ Add interest</Button>
      </div>
    </nav>
  );
};
```

- [ ] **Step 4: Run it, verify it passes**

Run: `npx vitest run src/components/library/InterestRail.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 5: Write the failing LibraryPage test** — `src/pages/library/LibraryPage.test.tsx`:

```tsx
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { PrismThemeProvider } from '../../components/prism';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import LibraryPage from './LibraryPage';
import { makeTestQueryClient } from '../../components/library/testHelpers';

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => ({
    token: 't', isAuthenticated: true,
    userProfile: { firstName: 'A', realm_access: { roles: ['writer'] } },
    login: vi.fn(), logout: vi.fn(),
  }),
}));

const server = setupServer(
  http.get('/interests', () => HttpResponse.json([
    { id: 'i1', 'user-id': 'u', intent: 'Modern jazz history', 'taste-profile': {}, 'created-at': 'x', 'updated-at': 'x' },
  ])),
  http.get('/interests/i1', () => HttpResponse.json(
    { id: 'i1', 'user-id': 'u', intent: 'Modern jazz history', 'taste-profile': { 'novelty-ratio': 0.5 }, 'created-at': 'x', 'updated-at': 'x' })),
  http.get('/interests/i1/recommendations', () => HttpResponse.json([])),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderAt(path: string) {
  const client = makeTestQueryClient();
  return render(
    <QueryClientProvider client={client}>
      <PrismThemeProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/library" element={<LibraryPage view="shelf" />} />
            <Route path="/library/:interestId" element={<LibraryPage view="shelf" />} />
            <Route path="/library/:interestId/acquisitions" element={<LibraryPage view="acquisitions" />} />
            <Route path="/library/:interestId/taste" element={<LibraryPage view="taste" />} />
          </Routes>
        </MemoryRouter>
      </PrismThemeProvider>
    </QueryClientProvider>
  );
}

describe('LibraryPage', () => {
  it('renders the rail with interests', async () => {
    renderAt('/library/i1');
    expect(await screen.findByRole('link', { name: /Modern jazz history/ })).toBeInTheDocument();
  });

  it('shows the shelf empty state for the selected interest', async () => {
    renderAt('/library/i1');
    expect(await screen.findByText(/shelf is empty/i)).toBeInTheDocument();
  });

  it('shows the acquisitions pipeline on the acquisitions route', async () => {
    renderAt('/library/i1/acquisitions');
    expect(await screen.findByRole('button', { name: /run acquisition/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it, verify it fails**

Run: `npx vitest run src/pages/library/LibraryPage.test.tsx`
Expected: FAIL — `Cannot find module './LibraryPage'`.

- [ ] **Step 7: Implement LibraryPage** — `src/pages/library/LibraryPage.tsx`:

```tsx
import * as React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { NavBar } from '../../components/layout/NavBar';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
import { PrismThemeProvider, Button } from '../../components/prism';
import { useAuth } from '../../auth/useAuth';
import { useInterests, useInterest } from '../../components/library/hooks';
import { InterestRail } from '../../components/library/InterestRail';
import { ShelfView } from '../../components/library/ShelfView';
import { TasteProfileEditor } from '../../components/library/TasteProfileEditor';
import { AcquisitionsPipeline } from '../../components/library/AcquisitionsPipeline';
import { OnboardingDialog } from '../../components/library/OnboardingDialog';
import { CheckInDialog } from '../../components/library/CheckInDialog';

export type LibraryView = 'shelf' | 'acquisitions' | 'taste';

const LibraryPageInner: React.FC<{ view: LibraryView }> = ({ view }) => {
  const { tokens } = useTheme();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { interestId } = useParams<{ interestId: string }>();
  const interests = useInterests(token);
  const interest = useInterest(interestId ?? '', token);
  const [modal, setModal] = React.useState<'none' | 'new' | 'checkin'>('none');

  const id = interestId ?? '';

  return (
    <Box sx={{ display: 'flex', gap: 3, p: 3, minHeight: '70vh' }}>
      <InterestRail
        interests={interests.data ?? []}
        activeId={interestId}
        onAdd={() => setModal('new')}
      />

      <Box sx={{ flex: 1 }}>
        {id && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <Link to={`/library/${id}`} style={tabStyle(tokens, view === 'shelf')}>Shelves</Link>
            <Link to={`/library/${id}/acquisitions`} style={tabStyle(tokens, view === 'acquisitions')}>Acquisitions</Link>
            <Link to={`/library/${id}/taste`} style={tabStyle(tokens, view === 'taste')}>Taste profile</Link>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="subtle" onClick={() => setModal('checkin')}>Check-in</Button>
            </div>
          </div>
        )}

        {!id && (
          <p style={{ color: tokens.color.text.secondary }}>
            Select an interest, or add one to start a shelf.
          </p>
        )}

        {id && view === 'shelf' && <ShelfView interestId={id} token={token} />}
        {id && view === 'acquisitions' && <AcquisitionsPipeline interestId={id} token={token} />}
        {id && view === 'taste' && interest.data && (
          <TasteProfileEditor interest={interest.data} token={token} />
        )}
      </Box>

      <OnboardingDialog
        open={modal === 'new'}
        onClose={() => setModal('none')}
        token={token}
        onCreated={(newId) => { setModal('none'); navigate(`/library/${newId}/acquisitions`); }}
      />
      {interest.data && (
        <CheckInDialog
          open={modal === 'checkin'}
          onClose={() => setModal('none')}
          interest={interest.data}
          token={token}
        />
      )}
    </Box>
  );
};

const LibraryPage: React.FC<{ view: LibraryView }> = ({ view }) => {
  const { isAuthenticated, userProfile, isLoading, login, logout } = useAuth();

  const user = userProfile
    ? { firstName: userProfile.firstName ?? undefined, lastName: userProfile.lastName ?? undefined, realm_access: userProfile.realm_access }
    : undefined;

  if (isLoading) return <LoadingScreen />;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <PrismThemeProvider>
        <Box sx={{ flex: 1, bgcolor: 'background.default' }}>
          {isAuthenticated ? (
            <LibraryPageInner view={view} />
          ) : (
            <Box sx={{ p: 4 }}>Sign in as a writer to use your library.</Box>
          )}
        </Box>
      </PrismThemeProvider>
    </Box>
  );
};

function tabStyle(
  tokens: { color: { brand: { primary: string }; text: { secondary: string } }; typography: { mono: string } },
  active: boolean
): React.CSSProperties {
  return {
    fontFamily: tokens.typography.mono, fontSize: 12.5, letterSpacing: '0.05em',
    textDecoration: 'none', paddingBottom: 4,
    color: active ? tokens.color.brand.primary : tokens.color.text.secondary,
    borderBottom: active ? `2px solid ${tokens.color.brand.primary}` : '2px solid transparent',
  };
}

export default LibraryPage;
```

> **Before implementing:** confirm `useAuth()` exposes `isLoading` (check `AuthContextValue` in `src/auth/AuthProvider.tsx`); if it's named differently (e.g. `loading`), use that. Confirm `NavBar`'s `user` prop shape against `ImageManagerPage.tsx` (it uses exactly this shape). The test mocks `useAuth`, so it won't exercise the loading/gate branch — that's covered by manual verification.

- [ ] **Step 8: Run the LibraryPage test, verify it passes**

Run: `npx vitest run src/pages/library/LibraryPage.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 9: Wire routes into `src/App.tsx`**

Add the lazy import alongside the other page imports (near line 7–30):

```tsx
const LibraryPage = React.lazy(() => import('./pages/library/LibraryPage'));
```

Add these route entries inside the `children` array (after the `/workspace-roots` entry, ~line 69). The `view` prop selects which stage the shell renders:

```tsx
      { path: '/library', element: <LibraryPage view="shelf" /> },
      { path: '/library/:interestId', element: <LibraryPage view="shelf" /> },
      { path: '/library/:interestId/acquisitions', element: <LibraryPage view="acquisitions" /> },
      { path: '/library/:interestId/taste', element: <LibraryPage view="taste" /> },
```

- [ ] **Step 10: Typecheck + full unit suite**

Run: `npm run typecheck && npx vitest run src/components/library src/pages/library src/api/interests.test.ts`
Expected: typecheck clean; all library/api tests PASS.

- [ ] **Step 11: Commit**

```bash
git add src/components/library/InterestRail.tsx src/components/library/InterestRail.test.tsx src/pages/library/LibraryPage.tsx src/pages/library/LibraryPage.test.tsx src/App.tsx
git commit -m "feat(library): /library shell — rail, routed stages, onboarding + check-in modals"
```

---

## Task 11: End-to-end full-loop test (Playwright)

**Files:**
- Create: `e2e/library.spec.ts`

**Interfaces:**
- Consumes: the running app + a mocked (or dev) backend. Uses Playwright route interception to stub `/interests*` so the e2e is backend-independent (mirrors the MSW discipline).

- [ ] **Step 1: Inspect an existing e2e spec for the harness conventions**

Run: `ls e2e && sed -n '1,40p' e2e/*.spec.ts | head -60`
Expected: see how `test`, `page.goto`, base URL, and any auth bypass are set up. Match that style (base URL, auth handling) in the new spec.

- [ ] **Step 2: Write the e2e spec** — `e2e/library.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

// Stub the interests API so the loop is deterministic and backend-independent.
test.beforeEach(async ({ page }) => {
  const interest = {
    id: 'i1', 'user-id': 'u', intent: 'Modern jazz history',
    'taste-profile': { 'novelty-ratio': 0.5, 'trusted-sources': ['Blue Note'] },
    'created-at': 'x', 'updated-at': 'x',
  };
  const shelf = [
    { id: 'r1', 'interest-id': 'i1', kind: 'article', title: 'Kind of Blue at 60', source: 'Blue Note', url: 'https://x', 'est-time': '12 min', why: 'Matches jazz-history intent', origin: 'trusted', status: 'shelved', 'added-at': 'x' },
  ];
  await page.route('**/interests', (r) => r.fulfill({ json: [interest] }));
  await page.route('**/interests/i1', (r) => r.fulfill({ json: interest }));
  await page.route('**/interests/i1/recommendations**', (r) => r.fulfill({ json: shelf }));
  await page.route('**/interests/i1/curate', (r) =>
    r.fulfill({ json: { status: 'completed', 'run-id': 'run1', summary: { total: 6, trusted: 3, novel: 3 }, shelved: shelf } }));
});

test('a reader sees their shelf and runs an acquisition', async ({ page }) => {
  await page.goto('/library/i1');
  await expect(page.getByRole('link', { name: /Modern jazz history/ })).toBeVisible();
  await expect(page.getByText('Kind of Blue at 60')).toBeVisible();

  await page.getByRole('link', { name: /Acquisitions/i }).click();
  await page.getByRole('button', { name: /run acquisition/i }).click();
  await expect(page.getByText(/6 shelved/i)).toBeVisible();
  await expect(page.getByText(/3 trusted/i)).toBeVisible();
  await expect(page.getByText(/3 novel/i)).toBeVisible();
});
```

> If the app requires an authenticated session to reach `/library`, follow the auth bypass the existing e2e specs use (storage state, a test-only login, or a mocked Auth0 token). Do not disable the auth gate in production code for the test.

- [ ] **Step 3: Run the e2e spec**

Run: `npm run test:e2e -- library.spec.ts`
Expected: PASS. If auth blocks the route, wire the existing e2e auth setup and re-run.

- [ ] **Step 4: Commit**

```bash
git add e2e/library.spec.ts
git commit -m "test(library): e2e full-loop happy path (shelf + acquisition)"
```

---

## Final verification

- [ ] Run the full CI gate: `npm run ci` (typecheck + lint + test). Expected: clean.
- [ ] Run e2e: `npm run test:e2e`. Expected: green (or the documented auth-setup caveat).
- [ ] Manually verify against a running backend (per the `verify` skill): `npm run dev` with `../kaleidoscope` running (`task run`), sign in as a writer, add an interest, run an acquisition, edit the taste profile, do a check-in. Confirm the trusted/novel split renders in purple/amber and the pipeline settles on the real summary.

---

## Design-requirement → task traceability (self-review)

| DESIGN.md / decision | Task |
|---|---|
| Shelves (home) — finite catalog cards, kind filter, why, trust/novel tag | Tasks 3, 4 |
| Acquisitions pipeline — Discover→Score→Shelve, novelty split, staged reveal | Task 8 |
| Taste profile editor — keywords/formats/lengths/sources + novelty dial (save-only) | Task 5 |
| Onboarding — free-text intent → refinement Q&A → new shelf | Tasks 6, 7 |
| Check-in — "which land?", promote novel source, composed over existing routes | Task 9 |
| Prism dark instrument-panel, purple=trusted / amber=novel from categorical palette | Tasks 3, 5, 8, 10 (Global Constraints) |
| Wire to real `/interests` API (TanStack Query, `src/api/interests.ts`) | Tasks 1, 2 |
| New top-level `/library` route, writer-gated | Task 10 |
| Onboarding/check-in as Prism Dialog modals | Tasks 7, 9, 10 |
| Every feature tested (unit + one e2e) | every task; Task 11 |

## Assumptions and resolved ambiguities

1. **`step_run_id` in the `awaiting_input` payload** — assumed present (flagged as a backend dependency in the header). Types encode it; if backend omits it, the respond flow (Tasks 7, 8) needs the payload changed, not the frontend.
2. **No Zustand store** — interest selection is URL-driven; modal/animation state is local. This satisfies "client state → Zustand, don't reinvent" because there is no *shared* client state to hoist; adding a store would be over-engineering (YAGNI).
3. **Novelty dial is save-only** (user decision) — the editor persists the whole taste profile in one PUT; recomposition happens on the next explicit curation, not on save.
4. **Pipeline animation is a client-side staged reveal** (user decision) over the synchronous `/curate` response — substance (the summary) is asserted in tests; the stage animation is cosmetic and reduced-motion-safe via Prism token transitions.
5. **Prism component prop names** — each component task includes a "confirm props before implementing" note because the exact `Menu`/`IconButton`/`TextInput`/`Dialog` signatures should be read from source; tests assert on behavior/roles, not internals, so they survive minor prop differences.
6. **Auth `isLoading` field name** — Task 10 notes to confirm the exact field on `AuthContextValue`.
