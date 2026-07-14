# Recipes as First Prism Adopter — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `RecipesPage` in the Prism style using the Plan 2 primitives, and add per-recipe **Rename URL** and **Delete** actions behind a kebab overflow menu.

**Architecture:** The page composes Prism primitives (`Card`, `Chip`, `Button`, `IconButton`, `Menu`, `Dialog`, `TextInput`). Two new TanStack mutations call the API client: `updateRecipe` (rename) and `deleteRecipe` (already exists). The rename dialog slugifies input, previews the URL, and surfaces the backend's 409 collision inline. Delete uses a type-to-confirm guard. Extract the two dialogs into their own components so `RecipesPage` stays focused.

**Tech Stack:** React 18, TanStack Query, Prism primitives (`@/components/prism`), `src/api/recipes.ts`, `src/utils/url.ts` (`titleToSlug`), Vitest + Testing Library + MSW.

## Global Constraints

- Repo root: `kaleidoscope-ui`. Depends on Plan 1 (backend `recipe-url` on PUT) and Plan 2 (primitives) merged.
- Server state → TanStack Query; UI state → local `useState`. API only through `src/api/recipes.ts` (CLAUDE.md).
- Auth only through `useAuth()`. Writer actions (New/Manage/kebab) render only when `isAuthenticated`.
- **Local Prism scope (decision 2026-07-14):** Recipes renders Prism dark via a *local* MUI `ThemeProvider` wrapping only the Recipes subtree — NOT by switching the app-global preset. Do not call `useSelectPreset('prism')` (that mutates the persisted store and reskins every other page). Do not hardcode colors — read `theme.tokens.*` under the local provider.
- `recipe_url` is the address; `id` is identity. After a rename the query cache key changes — invalidate `['recipes']`.
- **A11y deferred (decision 2026-07-14):** Dialog focus-trap/restore and Menu keyboard-nav (flagged by Plan 2's final review) are a follow-up, NOT part of this plan. Build the mouse-first flow as specified.
- `npm run ci` green before the final commit.

---

### Task 1: API client — `updateRecipe` carries `recipe_url`; slugify helper

**Files:**
- Modify: `src/types/recipe.ts:83-88` (`UpdateRecipePayload`)
- Modify: `src/api/recipes.ts:44-50` (already has `updateRecipe`; no signature change needed — confirm it passes the whole patch)
- Test: `src/api/recipes.test.ts`

**Interfaces:**
- Produces: `UpdateRecipePayload` gains optional `recipe_url?: string`; `updateRecipe(slug, { recipe_url }, token)` PUTs it. The client's `snakeKeysToKebab` (`src/api/client.ts`) converts `recipe_url` → `recipe-url` on the wire — matching Plan 1's schema.

- [ ] **Step 1: Write the failing test**

Add to `src/api/recipes.test.ts` (mirror its existing MSW setup):

```ts
it('updateRecipe sends a renamed recipe_url as kebab-case recipe-url', async () => {
  let received: unknown;
  server.use(
    http.put('/recipes/chana-masala', async ({ request }) => {
      received = await request.json();
      return HttpResponse.json({ id: 'r1', recipe_url: 'chana-masala-v2', hostname: 'h',
        content: { title: 'Chana Masala', sections: [] }, public_visibility: true,
        created_at: '', modified_at: '' });
    })
  );
  const out = await updateRecipe('chana-masala', { recipe_url: 'chana-masala-v2' }, 'tok');
  expect(received).toEqual({ 'recipe-url': 'chana-masala-v2' });
  expect(out.recipe_url).toBe('chana-masala-v2');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/api/recipes.test.ts`
Expected: FAIL — `UpdateRecipePayload` has no `recipe_url`, so `{ recipe_url: ... }` is a type error and the field is dropped.

- [ ] **Step 3: Add the field**

`src/types/recipe.ts`:

```ts
export interface UpdateRecipePayload {
  content?: RecipeContent;
  recipe_url?: string; // rename the address (slug); identity (id) is unchanged
  source_url?: string | null;
  label_ids?: string[];
  public_visibility?: boolean;
}
```

`updateRecipe` in `src/api/recipes.ts` already spreads the whole `patch` into the body, so no change is needed there — confirm it reads:

```ts
export function updateRecipe(slug: string, patch: UpdateRecipePayload, token?: string): Promise<Recipe> {
  return request<Recipe>(`/recipes/${slug}`, { method: 'PUT', body: patch, token });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/api/recipes.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/types/recipe.ts src/api/recipes.ts src/api/recipes.test.ts
git commit -m "feat(recipes): UpdateRecipePayload carries recipe_url for renames"
```

---

### Task 2: `slugify` util (shared with the rename dialog)

**Files:**
- Modify: `src/utils/url.ts` (add `slugify` next to `titleToSlug`) — or reuse `titleToSlug` if it already normalizes arbitrary input
- Test: `src/utils/url.test.ts`

**Interfaces:**
- Produces: `slugify(input: string): string` — lowercase, spaces/punctuation → single hyphens, trimmed. Used live as the user types a new URL.

- [ ] **Step 1: Check what exists**

Run: `grep -n "titleToSlug\|export" src/utils/url.ts`
If `titleToSlug` already lowercases + hyphenates arbitrary strings (not just titles), skip to Task 3 and import it as the slugifier. Otherwise continue.

- [ ] **Step 2: Write the failing test**

Add to `src/utils/url.test.ts`:

```ts
import { slugify } from './url';

describe('slugify', () => {
  it('lowercases, collapses non-alphanumerics to single hyphens, trims', () => {
    expect(slugify('Chana  Masala!!')).toBe('chana-masala');
    expect(slugify('  Béchamel & Co. ')).toBe('b-chamel-co'); // ascii-only; accents drop
    expect(slugify('already-a-slug')).toBe('already-a-slug');
    expect(slugify('')).toBe('');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- src/utils/url.test.ts`
Expected: FAIL — `slugify` not exported.

- [ ] **Step 4: Implement**

Add to `src/utils/url.ts`:

```ts
/** Normalize arbitrary text into a URL slug: lowercase, non-alphanumerics to
 *  single hyphens, no leading/trailing hyphens. Mirrors the backend `->slug`. */
export function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/utils/url.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/utils/url.ts src/utils/url.test.ts
git commit -m "feat(utils): slugify helper for live URL editing"
```

---

### Task 3: `RenameRecipeUrlDialog` component

**Files:**
- Create: `src/components/recipes/RenameRecipeUrlDialog.tsx`, `src/components/recipes/RenameRecipeUrlDialog.test.tsx`

**Interfaces:**
- Consumes: `Dialog`, `Button`, `TextInput` (Prism); `updateRecipe` (api); `slugify` (utils); `ApiError` (`src/api/client.ts`).
- Produces: `RenameRecipeUrlDialog` — props `{ recipe: Recipe | null; open: boolean; onClose: () => void; onRenamed: (newSlug: string) => void; token?: string }`. Shows the current slug, previews `/recipes/<slug>` live, disables Save on empty/unchanged, and renders the backend 409 message inline.

- [ ] **Step 1: Write the failing test**

`src/components/recipes/RenameRecipeUrlDialog.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../../test/testUtils';
import { RenameRecipeUrlDialog } from './RenameRecipeUrlDialog';
import type { Recipe } from '../../types/recipe';

const recipe = { id: 'r1', recipe_url: 'chana-masala', hostname: 'h',
  content: { title: 'Chana Masala', sections: [] }, public_visibility: true,
  created_at: '', modified_at: '' } as Recipe;

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderDialog(onRenamed = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <RenameRecipeUrlDialog recipe={recipe} open onClose={vi.fn()} onRenamed={onRenamed} token="tok" />
    </QueryClientProvider>
  );
  return onRenamed;
}

describe('RenameRecipeUrlDialog', () => {
  it('renames and calls onRenamed with the new slug', async () => {
    server.use(http.put('/recipes/chana-masala', () =>
      HttpResponse.json({ ...recipe, recipe_url: 'chana-masala-v2' })));
    const onRenamed = renderDialog();
    const input = screen.getByLabelText(/Recipe URL/i);
    fireEvent.change(input, { target: { value: 'Chana Masala V2' } });
    fireEvent.click(screen.getByRole('button', { name: /Save URL/i }));
    await waitFor(() => expect(onRenamed).toHaveBeenCalledWith('chana-masala-v2'));
  });

  it('shows the backend 409 collision message inline', async () => {
    server.use(http.put('/recipes/chana-masala', () =>
      HttpResponse.json({ error: "URL 'pad-thai' is already in use" }, { status: 409 })));
    renderDialog();
    fireEvent.change(screen.getByLabelText(/Recipe URL/i), { target: { value: 'pad-thai' } });
    fireEvent.click(screen.getByRole('button', { name: /Save URL/i }));
    expect(await screen.findByText(/already in use/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/recipes/RenameRecipeUrlDialog.test.tsx`
Expected: FAIL — component does not exist.

- [ ] **Step 3: Implement**

```tsx
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Dialog, Button, TextInput } from '../prism';
import { updateRecipe } from '../../api/recipes';
import { ApiError } from '../../api/client';
import { slugify } from '../../utils/url';
import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onRenamed: (newSlug: string) => void;
  token?: string | undefined;
}

export const RenameRecipeUrlDialog: React.FC<Props> = ({ recipe, open, onClose, onRenamed, token }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && recipe) { setValue(recipe.recipe_url); setError(null); }
  }, [open, recipe]);

  const slug = slugify(value);
  const unchanged = !recipe || slug === recipe.recipe_url;
  const invalid = slug.length === 0 || unchanged;

  const rename = useMutation({
    mutationFn: () => updateRecipe(recipe!.recipe_url, { recipe_url: slug }, token),
    onSuccess: () => onRenamed(slug),
    onError: (e) => setError(e instanceof ApiError && e.status === 409
      ? extractError(e.message)
      : 'Could not rename the URL. Please try again.'),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Rename URL"
      tone="accent"
      icon={<LinkGlyph />}
      actions={
        <>
          <Button variant="subtle" onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={invalid || rename.isPending} onClick={() => { setError(null); rename.mutate(); }}>
            Save URL
          </Button>
        </>
      }
    >
      <p style={{ fontSize: 13.5, lineHeight: 1.5 }}>
        The URL is this recipe&apos;s public address, not its identity — changing it keeps the
        recipe and its history. Old links will stop resolving.
      </p>
      <label htmlFor="recipe-slug" style={{ display: 'block', marginTop: 14, marginBottom: 7, fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        Recipe URL
      </label>
      <TextInput id="recipe-slug" aria-label="Recipe URL" value={value} spellCheck={false}
        autoComplete="off" onChange={(e) => { setValue(e.target.value); setError(null); }} />
      <p style={{ marginTop: 9, fontSize: 11 }}>
        {error ?? `Public address → /recipes/${slug || '…'}`}
      </p>
    </Dialog>
  );
};

// Backend returns { error: "..." }; ApiError.message is the raw JSON body text.
function extractError(body: string): string {
  try { return (JSON.parse(body).error as string) ?? body; } catch { return body; }
}

const LinkGlyph: React.FC = () => (
  <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8.5 11.5 a3.5 3.5 0 0 0 5 0 l2.5-2.5 a3.5 3.5 0 0 0-5-5 l-1 1" />
    <path d="M11.5 8.5 a3.5 3.5 0 0 0-5 0 l-2.5 2.5 a3.5 3.5 0 0 0 5 5 l1-1" />
  </svg>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/recipes/RenameRecipeUrlDialog.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/RenameRecipeUrlDialog.tsx src/components/recipes/RenameRecipeUrlDialog.test.tsx
git commit -m "feat(recipes): rename-URL dialog with live slug + 409 handling"
```

---

### Task 4: `DeleteRecipeDialog` component

**Files:**
- Create: `src/components/recipes/DeleteRecipeDialog.tsx`, `src/components/recipes/DeleteRecipeDialog.test.tsx`

**Interfaces:**
- Consumes: `Dialog`, `Button`, `TextInput` (Prism); `deleteRecipe` (api).
- Produces: `DeleteRecipeDialog` — props `{ recipe: Recipe | null; open: boolean; onClose: () => void; onDeleted: () => void; token?: string }`. Confirm-by-typing-the-title guard; Delete stays disabled until the typed name matches (case-insensitive).

- [ ] **Step 1: Write the failing test**

`src/components/recipes/DeleteRecipeDialog.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../../test/testUtils';
import { DeleteRecipeDialog } from './DeleteRecipeDialog';
import type { Recipe } from '../../types/recipe';

const recipe = { id: 'r1', recipe_url: 'chana-masala', hostname: 'h',
  content: { title: 'Chana Masala', sections: [] }, public_visibility: true,
  created_at: '', modified_at: '' } as Recipe;

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderDialog(onDeleted = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <DeleteRecipeDialog recipe={recipe} open onClose={vi.fn()} onDeleted={onDeleted} token="tok" />
    </QueryClientProvider>
  );
  return onDeleted;
}

describe('DeleteRecipeDialog', () => {
  it('keeps Delete disabled until the name matches, then deletes', async () => {
    server.use(http.delete('/recipes/chana-masala', () => new HttpResponse(null, { status: 204 })));
    const onDeleted = renderDialog();
    const del = screen.getByRole('button', { name: /Delete recipe/i });
    expect(del).toBeDisabled();
    fireEvent.change(screen.getByLabelText(/type the recipe name/i), { target: { value: 'chana masala' } });
    expect(del).toBeEnabled();
    fireEvent.click(del);
    await waitFor(() => expect(onDeleted).toHaveBeenCalledOnce());
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/recipes/DeleteRecipeDialog.test.tsx`
Expected: FAIL — component does not exist.

- [ ] **Step 3: Implement**

```tsx
import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Dialog, Button, TextInput } from '../prism';
import { deleteRecipe } from '../../api/recipes';
import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
  token?: string | undefined;
}

export const DeleteRecipeDialog: React.FC<Props> = ({ recipe, open, onClose, onDeleted, token }) => {
  const [confirm, setConfirm] = useState('');
  useEffect(() => { if (open) setConfirm(''); }, [open]);

  const matches = !!recipe && confirm.trim().toLowerCase() === recipe.content.title.toLowerCase();

  const del = useMutation({
    mutationFn: () => deleteRecipe(recipe!.recipe_url, token),
    onSuccess: onDeleted,
  });

  const title = recipe?.content.title ?? '';
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Delete recipe"
      tone="crit"
      icon={<TrashGlyph />}
      actions={
        <>
          <Button variant="subtle" onClick={onClose}>Cancel</Button>
          <Button variant="danger" disabled={!matches || del.isPending} onClick={() => del.mutate()}>
            Delete recipe
          </Button>
        </>
      }
    >
      <p style={{ fontSize: 13.5, lineHeight: 1.5 }}>
        Delete <b>{title}</b>? This removes the recipe, its sections, and label
        associations. This can&apos;t be undone.
      </p>
      <div style={{ marginTop: 14 }}>
        <TextInput aria-label={`Type the recipe name to confirm`} value={confirm} spellCheck={false}
          autoComplete="off" placeholder={`Type “${title}” to confirm`}
          onChange={(e) => setConfirm(e.target.value)} />
      </div>
    </Dialog>
  );
};

const TrashGlyph: React.FC = () => (
  <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6 h12 M8 6 V4.5 a1 1 0 0 1 1-1 h2 a1 1 0 0 1 1 1 V6 M6.5 6 l.6 9 a1.5 1.5 0 0 0 1.5 1.4 h2.8 a1.5 1.5 0 0 0 1.5-1.4 l.6-9" />
  </svg>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/recipes/DeleteRecipeDialog.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/DeleteRecipeDialog.tsx src/components/recipes/DeleteRecipeDialog.test.tsx
git commit -m "feat(recipes): delete-recipe dialog with type-to-confirm guard"
```

---

### Task 5: `RecipeCard` component (Prism entity card + kebab menu)

**Files:**
- Create: `src/components/recipes/RecipeCard.tsx`, `src/components/recipes/RecipeCard.test.tsx`

**Interfaces:**
- Consumes: `Card`, `IconButton`, `Menu`, `MenuItem`, `Chip` (Prism); `qualifiedLabelName` (`src/api/recipes.ts`); `previewIngredients` (`src/utils/recipe.ts`); `CATEGORICAL`/spectrum via `theme.tokens.color.categorical`.
- Produces: `RecipeCard` — props `{ recipe: Recipe; canManage: boolean; onOpen: () => void; onRename: () => void; onDelete: () => void }`. Renders title, `/recipes/<slug>`, ingredient preview, label chips (dot color by index into `categorical`), ingredient-count + time footer, and (when `canManage`) a kebab that opens a `Menu` with **Rename URL…** / **Open recipe** / **Delete…**.

- [ ] **Step 1: Write the failing test**

`src/components/recipes/RecipeCard.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../test/testUtils';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../../types/recipe';

const recipe = { id: 'r1', recipe_url: 'chana-masala', hostname: 'h',
  content: { title: 'Chana Masala', sections: [{ name: null, ingredients: ['chickpeas'], steps: [] }] },
  labels: [{ id: 'l1', name: 'indian', group_id: 'g1', group_name: 'ethnicity' }],
  public_visibility: true, created_at: '', modified_at: '' } as Recipe;

it('opens the kebab menu and routes actions', () => {
  const onRename = vi.fn(), onDelete = vi.fn();
  render(<RecipeCard recipe={recipe} canManage onOpen={vi.fn()} onRename={onRename} onDelete={onDelete} />);
  expect(screen.getByText('Chana Masala')).toBeInTheDocument();
  expect(screen.getByText('/recipes/chana-masala')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /recipe actions/i }));
  fireEvent.click(screen.getByRole('menuitem', { name: /rename url/i }));
  expect(onRename).toHaveBeenCalledOnce();
});

it('hides the kebab when the viewer cannot manage', () => {
  render(<RecipeCard recipe={recipe} canManage={false} onOpen={vi.fn()} onRename={vi.fn()} onDelete={vi.fn()} />);
  expect(screen.queryByRole('button', { name: /recipe actions/i })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/recipes/RecipeCard.test.tsx`
Expected: FAIL — component does not exist.

- [ ] **Step 3: Implement**

```tsx
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, IconButton, Menu, MenuItem, Chip } from '../prism';
import { qualifiedLabelName } from '../../api/recipes';
import { previewIngredients } from '../../utils/recipe';
import type { Recipe } from '../../types/recipe';

interface Props {
  recipe: Recipe;
  canManage: boolean;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export const RecipeCard: React.FC<Props> = ({ recipe, canManage, onOpen, onRename, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const spectrum = theme.tokens.color.categorical;
  const ingredientCount = recipe.content.sections.reduce((n, s) => n + s.ingredients.length, 0);

  return (
    <Card interactive onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 176 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{recipe.content.title}</div>
          <div style={{ fontFamily: theme.tokens.typography.mono, fontSize: 11, color: theme.tokens.color.text.disabled, marginTop: 4 }}>
            /recipes/{recipe.recipe_url}
          </div>
        </div>
        {canManage && (
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <IconButton aria-label="Recipe actions" aria-haspopup="menu" aria-expanded={menuOpen}
              onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}>
              <DotsGlyph />
            </IconButton>
            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} aria-label={`Actions for ${recipe.content.title}`}>
              <MenuItem onSelect={() => { setMenuOpen(false); onRename(); }}>Rename URL…</MenuItem>
              <MenuItem onSelect={() => { setMenuOpen(false); onOpen(); }}>Open recipe</MenuItem>
              <MenuItem danger onSelect={() => { setMenuOpen(false); onDelete(); }}>Delete…</MenuItem>
            </Menu>
          </div>
        )}
      </div>

      <div style={{ fontSize: 13, color: theme.tokens.color.text.secondary, lineHeight: 1.5,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {previewIngredients(recipe.content)}
      </div>

      {recipe.labels && recipe.labels.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
          {recipe.labels.map((l, i) => (
            <Chip key={l.id} as="span" dotColor={spectrum[i % spectrum.length]}>{qualifiedLabelName(l)}</Chip>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 14, paddingTop: 12, borderTop: `1px solid ${theme.tokens.color.border.subtle}`,
        fontFamily: theme.tokens.typography.mono, fontSize: 11, color: theme.tokens.color.text.disabled }}>
        <span><b style={{ color: theme.tokens.color.text.secondary }}>{ingredientCount}</b> ingredients</span>
      </div>
    </Card>
  );
};

const DotsGlyph: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <circle cx="10" cy="4.5" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="10" cy="15.5" r="1.5" />
  </svg>
);
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/recipes/RecipeCard.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/RecipeCard.tsx src/components/recipes/RecipeCard.test.tsx
git commit -m "feat(recipes): Prism RecipeCard with kebab overflow menu"
```

---

### Task 6: Local Prism theme provider + rebuild `RecipesPage`

**Files:**
- Modify: `src/theme/index.ts` (add `makePrismTheme()`)
- Create: `src/components/prism/PrismThemeProvider.tsx`, `src/components/prism/PrismThemeProvider.test.tsx`
- Modify: `src/components/prism/index.ts` (export `PrismThemeProvider`)
- Modify: `src/pages/RecipesPage.tsx` (wrap in `PrismThemeProvider`; replace the MUI card grid with `RecipeCard`s; mount the two dialogs; keep `ManageLabelsDialog` for now)
- Modify: `src/pages/RecipesPage.test.tsx` (extend with rename + delete flows)

**Interfaces:**
- Consumes: `RecipeCard`, `RenameRecipeUrlDialog`, `DeleteRecipeDialog`, Prism `Button`/`Chip`/`TextInput`, `PrismThemeProvider`; `makeTokens`/`PRESETS`/`paletteFromTokens`/`typographyFromTokens` (theme internals).
- Produces: `makePrismTheme(): Theme` — a self-contained MUI theme pinned to the Prism preset in DARK (both color schemes carry the Prism dark tokens, so the subtree renders Prism regardless of the app's active mode); `PrismThemeProvider` wraps children in it; the list page renders Prism cards inside it; kebab → rename/delete dialogs mutate and invalidate `['recipes']`.

- [ ] **Step 1a: Add `makePrismTheme()` — write the failing test**

`paletteFromTokens` and `typographyFromTokens` are module-private in `src/theme/index.ts`; `makePrismTheme` lives in the same file so it can reuse them. Add `PRESETS` to the existing `import { ... } from './tokens'`.

Add to `src/theme/index.test.ts`:

```ts
import { makePrismTheme } from './index';

describe('makePrismTheme', () => {
  it('is pinned to the Prism dark instrument-panel surfaces', () => {
    const t = makePrismTheme();
    expect(t.tokens.color.surface.base).toBe('#0A0E15');
    expect(t.tokens.color.categorical.slice(0, 5)).toEqual(
      ['#26A0BC', '#9085E9', '#C98500', '#2E9E5B', '#D55181']
    );
  });
});
```

- [ ] **Step 1b: Run it (RED)** — `npm test -- src/theme/index.test.ts` → FAIL (`makePrismTheme` not exported).

- [ ] **Step 1c: Implement `makePrismTheme()` in `src/theme/index.ts`**

```ts
/** A self-contained MUI theme pinned to the Prism preset in DARK, for scoping
 *  the Prism look to one subtree (e.g. the Recipes route) WITHOUT switching the
 *  app-global preset/mode. Both color schemes carry the Prism dark token set, so
 *  the subtree renders Prism dark regardless of the app's active color mode. */
export function makePrismTheme(): Theme {
  const darkTokens = makeTokens(PRESETS.prism.seed, 'dark', 'prism');
  return createTheme({
    colorSchemes: {
      light: { palette: paletteFromTokens(darkTokens), tokens: darkTokens },
      dark: { palette: paletteFromTokens(darkTokens), tokens: darkTokens },
    },
    shape: { borderRadius: PRESETS.prism.radius.md },
    spacing: darkTokens.space.sm,
    typography: typographyFromTokens(darkTokens),
    tokens: darkTokens,
  });
}
```

- [ ] **Step 1d: Run it (GREEN)** — `npm test -- src/theme/index.test.ts` → PASS.

- [ ] **Step 1e: Create `PrismThemeProvider` + test**

`src/components/prism/PrismThemeProvider.tsx`:

```tsx
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { makePrismTheme } from '../../theme';

// Static — the Prism theme never changes, build it once.
const prismTheme = makePrismTheme();

/** Scopes the Prism (dark) look to its subtree via a local MUI ThemeProvider,
 *  leaving the app-global theme/preset untouched. */
export const PrismThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={prismTheme}>{children}</ThemeProvider>
);
```

`src/components/prism/PrismThemeProvider.test.tsx` — assert a child reads Prism dark tokens through it:

```tsx
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useTheme } from '@mui/material/styles';
import { PrismThemeProvider } from './PrismThemeProvider';

const Probe: React.FC = () => <span>{useTheme().tokens.color.surface.base}</span>;

it('provides the Prism dark surface tokens to its subtree', () => {
  render(<PrismThemeProvider><Probe /></PrismThemeProvider>);
  expect(screen.getByText('#0A0E15')).toBeInTheDocument();
});
```

(Note: this test renders `PrismThemeProvider` itself, so use plain RTL `render`, not the `testUtils` render — the latter would wrap in the default-preset ThemeProvider, but the nested `PrismThemeProvider` still wins for its subtree; either works, plain RTL is simplest.)

Add `export { PrismThemeProvider } from './PrismThemeProvider';` to `src/components/prism/index.ts`. Run `npm test -- src/components/prism/PrismThemeProvider.test.tsx` → PASS.

- [ ] **Step 2: Write the failing RecipesPage tests**

Extend `src/pages/RecipesPage.test.tsx`. Add MSW handlers for PUT/DELETE and a test:

```tsx
it('renames a recipe URL from the card kebab menu', async () => {
  let putBody: unknown;
  server.use(
    http.put('/recipes/chana-masala', async ({ request }) => {
      putBody = await request.json();
      return HttpResponse.json({ /* recipe */ id: 'r1', recipe_url: 'chana-v2', hostname: 'andrewslai.com',
        content: { title: 'Chana Masala', sections: [] }, public_visibility: true, created_at: '', modified_at: '' });
    })
  );
  renderPage();
  await screen.findByText('Chana Masala');
  fireEvent.click(screen.getByRole('button', { name: /recipe actions/i }));
  fireEvent.click(screen.getByRole('menuitem', { name: /rename url/i }));
  fireEvent.change(screen.getByLabelText(/Recipe URL/i), { target: { value: 'chana-v2' } });
  fireEvent.click(screen.getByRole('button', { name: /Save URL/i }));
  await waitFor(() => expect(putBody).toEqual({ 'recipe-url': 'chana-v2' }));
});

it('deletes a recipe from the card kebab menu', async () => {
  let deleted = false;
  server.use(http.delete('/recipes/chana-masala', () => { deleted = true; return new HttpResponse(null, { status: 204 }); }));
  renderPage();
  await screen.findByText('Chana Masala');
  fireEvent.click(screen.getByRole('button', { name: /recipe actions/i }));
  fireEvent.click(screen.getByRole('menuitem', { name: /delete/i }));
  fireEvent.change(screen.getByLabelText(/type the recipe name/i), { target: { value: 'Chana Masala' } });
  fireEvent.click(screen.getByRole('button', { name: /Delete recipe/i }));
  await waitFor(() => expect(deleted).toBe(true));
});
```

Update the existing "shows writer actions" assertions if the New-recipe control changes from an MUI `link` role — keep it a router `<Link>` styled as a Prism button so `getByRole('link', { name: /New recipe/i })` still passes.

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- src/pages/RecipesPage.test.tsx`
Expected: FAIL — no kebab/menu/dialogs yet.

- [ ] **Step 4: Rebuild the page body**

In `src/pages/RecipesPage.tsx`: keep the data hooks (`getRecipes`, `getLabels`, filters, debounce) and `ManageLabelsDialog`. Wrap the whole page output in `PrismThemeProvider` (local Prism scope — do NOT switch the app-global preset), replace the header/search/filter/grid with Prism primitives, and add dialog state. Key additions:

```tsx
import { useTheme } from '@mui/material/styles';
import { Button as PButton, Chip as PChip, TextInput as PInput, PrismThemeProvider } from '../components/prism';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { RenameRecipeUrlDialog } from '../components/recipes/RenameRecipeUrlDialog';
import { DeleteRecipeDialog } from '../components/recipes/DeleteRecipeDialog';
import type { Recipe } from '../types/recipe';
```

Inside the component (no `useSelectPreset` — the Prism look comes from the local provider wrap below):

```tsx
  const queryClient = useQueryClient();
  const [renameTarget, setRenameTarget] = useState<Recipe | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Recipe | null>(null);
  const invalidateRecipes = () => void queryClient.invalidateQueries({ queryKey: ['recipes'] });
```

Wrap the returned JSX so Prism scopes to this page only. The outer element is `PrismThemeProvider`; inside it, a root element paints the Prism plane full-height. Because the page background must read a Prism token, put the background on an inner component that is *under* the provider (a child of `PrismThemeProvider`), e.g. a small `PrismPageRoot` styled `div` in this file, or an inline `useTheme()` read in a child — NOT the `RecipesPage` component body itself (that runs above the provider and would read the app theme). Structure:

```tsx
  return (
    <PrismThemeProvider>
      <PrismPageRoot>
        <NavBar user={userProfile ?? undefined} isAuthenticated={isAuthenticated} login={login} />
        {/* header, toolbar, grid, dialogs … */}
      </PrismPageRoot>
    </PrismThemeProvider>
  );
```

where, at the bottom of the file:

```tsx
import { styled } from '@mui/material/styles';
const PrismPageRoot = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  background: theme.tokens.color.surface.base,
  color: theme.tokens.color.text.primary,
}));
```

Render the grid with `RecipeCard`:

```tsx
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(288px, 1fr))', gap: 16 }}>
    {recipes.map((r) => (
      <RecipeCard
        key={r.id}
        recipe={r}
        canManage={isAuthenticated}
        onOpen={() => navigate(`/recipes/${r.recipe_url}`)}
        onRename={() => setRenameTarget(r)}
        onDelete={() => setDeleteTarget(r)}
      />
    ))}
  </div>
```

Mount the dialogs before the closing fragment:

```tsx
  <RenameRecipeUrlDialog
    recipe={renameTarget}
    open={renameTarget !== null}
    onClose={() => setRenameTarget(null)}
    onRenamed={(slug) => { setRenameTarget(null); invalidateRecipes(); navigate(`/recipes/${slug}`); }}
    token={token}
  />
  <DeleteRecipeDialog
    recipe={deleteTarget}
    open={deleteTarget !== null}
    onClose={() => setDeleteTarget(null)}
    onDeleted={() => { setDeleteTarget(null); invalidateRecipes(); }}
    token={token}
  />
```

Replace the MUI `TextField` ingredient search with Prism `PInput` (keep `aria-label="Search ingredient"` so the existing filter test passes), the MUI label `Chip`s with Prism `PChip` (keep `qualifiedLabelName` text so the label-filter test passes), and the MUI `Button`s with Prism `PButton` (New recipe stays a router `<Link>` — render `<PButton as={RouterLink} to="/recipes/new">` or wrap the link so its accessible role stays `link`). Remove now-unused MUI imports (`Card`, `CardActionArea`, `CardContent`, `Chip`, `TextField`, `Button`, `Box`, `Stack` as appropriate) to keep lint clean.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- src/pages/RecipesPage.test.tsx`
Expected: PASS (all tests: list, ingredient filter, label filter, rename, delete). Note the existing `RecipesPage.test.tsx` renders via the `testUtils` provider (default preset); the page's own `PrismThemeProvider` wrap takes over for its subtree, so token-driven primitives still render and the tests (which assert text/roles, not colors) pass unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/theme/index.ts src/theme/index.test.ts \
        src/components/prism/PrismThemeProvider.tsx src/components/prism/PrismThemeProvider.test.tsx \
        src/components/prism/index.ts src/pages/RecipesPage.tsx src/pages/RecipesPage.test.tsx
git commit -m "feat(recipes): rebuild RecipesPage in local Prism with rename + delete"
```

---

### Task 7: Manual verification + full CI

- [ ] **Step 1: Full check**

Run: `npm run ci`
Expected: typecheck + lint + test all PASS.

- [ ] **Step 2: Drive it in the browser**

Use the `/run` skill (or `npm run dev` with the backend from `../kaleidoscope` running). Verify: page renders dark/Prism; kebab opens; rename changes the visible `/recipes/<slug>` and navigates; a colliding rename shows the 409 message inline; delete removes the card after typing the name.

- [ ] **Step 3: Commit any fixes, then finish the branch**

Use the `superpowers:finishing-a-development-branch` skill to open the PR.

## Self-Review Notes

- **Spec coverage:** kebab menu (Task 5), rename dialog + live slug + 409 (Task 3), delete dialog + confirm (Task 4), Prism restyle (Tasks 5–6). Backend rename is Plan 1; delete API already exists.
- **Type consistency:** `updateRecipe`/`deleteRecipe` signatures match `src/api/recipes.ts`; dialog props (`recipe/open/onClose/onRenamed|onDeleted/token`) are consistent across Tasks 3–6; `RecipeCard` action props (`onOpen/onRename/onDelete`) match how Task 6 wires them.
- **Cache correctness:** rename changes the slug (the route + query identity), so `onRenamed` invalidates `['recipes']` and navigates to the new address; delete invalidates `['recipes']`.
- **A11y preserved:** existing tests rely on `getByLabelText('Search ingredient')`, `getByRole('link', {name:/New recipe/})`, and label chip text — Task 6 keeps all three.
- **Local Prism scope:** Recipes renders Prism dark via `PrismThemeProvider` (a local MUI `ThemeProvider` around the page, theme = `makePrismTheme()` with both schemes pinned to Prism dark tokens). The app-global preset/mode is untouched, so other routes keep each tenant's theme. `makePrismTheme` reuses the existing `paletteFromTokens`/`typographyFromTokens` adapters.
- **Deferred (not in scope):** (a) Dialog focus-trap/restore + Menu keyboard-nav — a11y follow-up flagged by Plan 2's review; (b) the full nav-rail + topbar chrome from the artifact; (c) migrating `ManageLabelsDialog` to Prism primitives. Flag to the user if they want any of these now.
