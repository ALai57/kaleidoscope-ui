# Recipe Sections (Frontend) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the `kaleidoscope-ui` recipe surface off the flat `{ingredients, instructions_html}` shape onto the backend's sectioned shape — `{title, sections: [{name?, ingredients[], steps[]}], …}` — with a per-section-block renderer, a progressive per-step editor, and no TipTap in recipes.

**Architecture:** The API types mirror the backend (`plans/2026-07-11-recipe-sections/DESIGN.md` in the `kaleidoscope` repo) one-for-one. Two new focused components carry the section logic so the two ~350-line pages stay thin: `RecipeSections` (display: per-section blocks, reused by the detail page and the editor's "View original" panel) and `RecipeSectionsEditor` (a controlled editor owning the `sections[]` value — name field, ingredient/step rows with add/remove/up-down, progressive "Add section"). Pure helpers live in `utils/recipe.ts`.

**Tech Stack:** React + TypeScript (strict), MUI, `@tanstack/react-query`, Vitest + `@testing-library/react` + `msw`. No new dependencies (up/down reordering uses MUI icon buttons, not a drag library).

## Global Constraints

- **The sectioned shape is the only shape.** No flat-shape fallback, no `instructions_html`, no top-level `ingredients` anywhere. The backend is already sectioned-only and unmerged.
- **Steps are plain text.** Recipes no longer use `RichTextEditor`. `RichTextEditor` STAYS in the repo — articles still use it (`ArticlePage`, `ArticleEditorPage`). Only recipe code stops importing it.
- **Wire key-casing is automatic.** `api/client.ts` converts request bodies snake→kebab and responses kebab→snake. Never hand-convert keys; author everything in `snake_case` on the TS side, including nested section keys (`name`/`ingredients`/`steps` are single words and pass through unchanged).
- **`RecipeContent.sections` always has ≥1 element.** A simple recipe is one unnamed section (`name: null`). Empty `ingredients`/`steps` arrays are valid; empty sections are not filtered out.
- **`original_content` is immutable** and already the same shape — no round-trip transform needed; seed it into `RecipeSections` as-is.
- **Reordering = up/down icon buttons.** No drag-and-drop, no new dependency.
- **`RecipeSectionsEditor` is fully controlled** (`sections` + `onChange`); it holds no internal section state.
- **Commit only the files each task names.** The working tree has a pre-existing uncommitted change to `.env.ephemeral` — never stage it; never `git add -A`.
- **Test commands:** focused `npx vitest run <file>`; `npm run typecheck`; `npm run lint`; full gate `npm run ci` (typecheck + lint + test).

---

### Task 1: Sectioned types + pure helpers + API-client fixtures

**Files:**
- Modify: `src/types/recipe.ts:13-43`
- Create: `src/utils/recipe.ts`
- Test: `src/utils/recipe.test.ts`
- Test: `src/api/recipes.test.ts` (fixtures only)

**Interfaces:**
- Produces: `RecipeSection = { name?: string | null; ingredients: string[]; steps: string[] }`; `RecipeContent = { title: string; sections: RecipeSection[]; servings?; prep_time_minutes?; cook_time_minutes? }`; `ScrapeResult.extraction_method: 'json-ld' | 'json-ld+llm-sections' | 'llm'`; `moveItem<T>(arr: T[], i: number, dir: -1 | 1): T[]`; `previewIngredients(content: RecipeContent, n?: number): string`. Tasks 2–5 consume all of these.
- Consumes: nothing new.

- [ ] **Step 1: Rewrite the content types**

In `src/types/recipe.ts`, replace the `RecipeContent` block (lines 13-22) with:

```ts
// One section = one paired component (e.g. Cake, Frosting): its own
// ingredients AND its own steps. A simple recipe is a single unnamed section.
export interface RecipeSection {
  name?: string | null; // absent/null ⇒ unnamed section
  ingredients: string[]; // one freeform line per ingredient ("2 cups flour")
  steps: string[]; // plain text, one per instruction step (no HTML)
}

// The one shared recipe-content shape: the current recipe and the scraped
// original are both this. Always has at least one section.
export interface RecipeContent {
  title: string;
  sections: RecipeSection[];
  servings?: string | null;
  prep_time_minutes?: number | null;
  cook_time_minutes?: number | null;
}
```

In the same file, replace the `extraction_method` line (line 41) with:

```ts
  extraction_method: 'json-ld' | 'json-ld+llm-sections' | 'llm';
```

- [ ] **Step 2: Write the failing helper tests**

Create `src/utils/recipe.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { moveItem, previewIngredients } from './recipe';
import type { RecipeContent } from '../types/recipe';

describe('moveItem', () => {
  it('moves an element down one slot', () => {
    expect(moveItem(['a', 'b', 'c'], 0, 1)).toEqual(['b', 'a', 'c']);
  });
  it('moves an element up one slot', () => {
    expect(moveItem(['a', 'b', 'c'], 2, -1)).toEqual(['a', 'c', 'b']);
  });
  it('returns the same array reference past the top edge', () => {
    const arr = ['a', 'b'];
    expect(moveItem(arr, 0, -1)).toBe(arr);
  });
  it('returns the same array reference past the bottom edge', () => {
    const arr = ['a', 'b'];
    expect(moveItem(arr, 1, 1)).toBe(arr);
  });
});

describe('previewIngredients', () => {
  const content: RecipeContent = {
    title: 'Layer Cake',
    sections: [
      { name: 'Cake', ingredients: ['flour', 'sugar'], steps: [] },
      { name: 'Frosting', ingredients: ['butter', 'powdered sugar'], steps: [] },
    ],
  };
  it('flattens the first three ingredient lines across sections', () => {
    expect(previewIngredients(content)).toBe('flour, sugar, butter');
  });
  it('handles a single unnamed section', () => {
    expect(
      previewIngredients({ title: 'X', sections: [{ name: null, ingredients: ['a'], steps: [] }] })
    ).toBe('a');
  });
});
```

- [ ] **Step 3: Run the helper tests to verify they fail**

Run: `npx vitest run src/utils/recipe.test.ts`
Expected: FAIL — `src/utils/recipe.ts` does not exist yet.

- [ ] **Step 4: Write the helpers**

Create `src/utils/recipe.ts`:

```ts
import type { RecipeContent } from '../types/recipe';

// Move the item at index `i` one slot in `dir` (-1 up, +1 down). Returns a new
// array, or the SAME array reference unchanged when the move falls off an edge.
export function moveItem<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = arr.slice();
  [next[i], next[j]] = [next[j] as T, next[i] as T];
  return next;
}

// First `n` ingredient lines flattened across every section — for list cards.
export function previewIngredients(content: RecipeContent, n = 3): string {
  return content.sections
    .flatMap((s) => s.ingredients)
    .slice(0, n)
    .join(', ');
}
```

- [ ] **Step 5: Run the helper tests to verify they pass**

Run: `npx vitest run src/utils/recipe.test.ts`
Expected: PASS.

- [ ] **Step 6: Update the API-client test fixtures to the sectioned shape**

In `src/api/recipes.test.ts`, replace the `mockRecipe.content` object (lines 24-28) with:

```ts
  content: {
    title: 'Chana Masala',
    sections: [{ name: null, ingredients: ['2 cups chickpeas', '1 tbsp flour'], steps: ['Cook'] }],
  },
```

Replace the scrape handler's `recipe` (line 55) with:

```ts
      recipe: { title: 'Scraped', sections: [{ name: null, ingredients: ['x'], steps: [] }] },
```

Replace the two `createRecipe` content literals (lines 100 and 107) with, respectively:

```ts
      content: { title: 'My New Dish!', sections: [{ name: null, ingredients: ['a'], steps: [] }] },
```

```ts
      content: { title: 'X', sections: [{ name: null, ingredients: [], steps: [] }] },
```

Replace the assertion on line 91 with:

```ts
    expect(recipe.content.sections[0]?.ingredients).toHaveLength(2);
```

- [ ] **Step 7: Run the API-client tests and typecheck**

Run: `npx vitest run src/api/recipes.test.ts && npm run typecheck`
Expected: `recipes.test.ts` PASS; typecheck has NO errors in `src/types`, `src/utils`, or `src/api` (the three page components still reference the old fields and will error — that is expected and fixed in Tasks 4-5; do not "fix" them here).

Note: typecheck is repo-wide, so it WILL report errors in `RecipePage.tsx`, `RecipeEditorPage.tsx`, and `RecipesPage.tsx` at this point. Confirm every reported error is in one of those three files; if an error appears in `types`, `utils`, or `api`, fix it before moving on.

- [ ] **Step 8: Commit**

```bash
git add src/types/recipe.ts src/utils/recipe.ts src/utils/recipe.test.ts src/api/recipes.test.ts
git commit -m "feat(recipes): sectioned RecipeContent types + section helpers

- RecipeSection {name?, ingredients[], steps[]}; RecipeContent.sections replaces flat ingredients/instructions_html
- extraction_method gains json-ld+llm-sections
- moveItem + previewIngredients helpers with tests

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: `RecipeSections` display component

**Files:**
- Create: `src/components/recipes/RecipeSections.tsx`
- Test: `src/components/recipes/RecipeSections.test.tsx`

**Interfaces:**
- Consumes: `RecipeContent`, `RecipeSection` from Task 1.
- Produces: `RecipeSections: React.FC<{ content: RecipeContent }>`. Renders one block per section: an optional name heading (`<h4>`, shown when the section is named OR there is >1 section), an ingredient checklist, and a numbered `<ol>` of steps. Tasks 4 (detail page) and 5 (editor "View original") consume it.

- [ ] **Step 1: Write the failing test**

Create `src/components/recipes/RecipeSections.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { RecipeSections } from './RecipeSections';

describe('RecipeSections', () => {
  it('renders a single unnamed section with no section-name heading', () => {
    render(
      <RecipeSections
        content={{
          title: 'Stew',
          sections: [{ name: null, ingredients: ['carrots'], steps: ['Simmer'] }],
        }}
      />
    );
    expect(screen.getByText('carrots')).toBeInTheDocument();
    expect(screen.getByText('Simmer')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Section 1' })).not.toBeInTheDocument();
  });

  it('renders per-section name headings and numbered steps for a multi-section recipe', () => {
    render(
      <RecipeSections
        content={{
          title: 'Layer Cake',
          sections: [
            { name: 'Cake', ingredients: ['flour'], steps: ['Mix', 'Bake'] },
            { name: 'Frosting', ingredients: ['butter'], steps: ['Whip'] },
          ],
        }}
      />
    );
    expect(screen.getByRole('heading', { name: 'Cake' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frosting' })).toBeInTheDocument();
    const lists = screen.getAllByRole('list');
    expect(within(lists[0] as HTMLElement).getAllByRole('listitem')).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/recipes/RecipeSections.test.tsx`
Expected: FAIL — `RecipeSections` does not exist yet.

- [ ] **Step 3: Write the component**

Create `src/components/recipes/RecipeSections.tsx`:

```tsx
import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import type { RecipeContent } from '../../types/recipe';

interface RecipeSectionsProps {
  content: RecipeContent;
}

// Per-section blocks: each component (Cake, Frosting, …) shows its own
// ingredient checklist and numbered steps. A single unnamed section renders as
// a plain Ingredients + Instructions pair with no section heading.
export const RecipeSections: React.FC<RecipeSectionsProps> = ({ content }) => {
  const multi = content.sections.length > 1;
  return (
    <Box>
      {content.sections.map((section, si) => {
        const name = section.name?.trim();
        const heading = name || (multi ? `Section ${si + 1}` : null);
        return (
          <Box key={si} sx={{ mt: si === 0 ? 0 : 4 }}>
            {heading && (
              <>
                <Divider sx={{ mb: 1 }} />
                <Typography variant="h4">{heading}</Typography>
              </>
            )}
            <Typography variant="h5" sx={{ mt: 2 }}>
              Ingredients
            </Typography>
            <Box>
              {section.ingredients.map((ing, i) => (
                <FormControlLabel
                  key={`${ing}-${i}`}
                  control={<Checkbox />}
                  label={ing}
                  sx={{ display: 'flex' }}
                />
              ))}
            </Box>
            <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
              Instructions
            </Typography>
            <Box component="ol" sx={{ pl: 3, m: 0 }}>
              {section.steps.map((step, i) => (
                <Typography component="li" key={i} sx={{ mb: 1 }}>
                  {step}
                </Typography>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/recipes/RecipeSections.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/RecipeSections.tsx src/components/recipes/RecipeSections.test.tsx
git commit -m "feat(recipes): RecipeSections per-section display component

- One block per section: optional name heading, ingredient checklist, numbered steps
- Single unnamed section renders as plain Ingredients/Instructions

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: `RecipeSectionsEditor` controlled editor component

**Files:**
- Create: `src/components/recipes/RecipeSectionsEditor.tsx`
- Test: `src/components/recipes/RecipeSectionsEditor.test.tsx`

**Interfaces:**
- Consumes: `RecipeSection` from Task 1; `moveItem` from Task 1.
- Produces:
  - `EditSection = { name: string; ingredients: string[]; steps: string[] }` — editor-facing (name is always a string; each list keeps ≥1 possibly-blank row).
  - `emptyEditSection(): EditSection`
  - `toEditSection(s: RecipeSection): EditSection`
  - `toSection(s: EditSection): RecipeSection` (trims, drops blank rows, blank name ⇒ `null`)
  - `RecipeSectionsEditor: React.FC<{ sections: EditSection[]; onChange: (sections: EditSection[]) => void }>`

  Task 5 (the editor page) consumes all five.

- [ ] **Step 1: Write the failing test**

Create `src/components/recipes/RecipeSectionsEditor.test.tsx`:

```tsx
import React, { useState } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../../theme';
import {
  RecipeSectionsEditor,
  emptyEditSection,
  toSection,
  type EditSection,
} from './RecipeSectionsEditor';

function Harness({ initial }: { initial: EditSection[] }): React.ReactElement {
  const [sections, setSections] = useState<EditSection[]>(initial);
  return (
    <ThemeProvider theme={makeTheme(BASE_THEME)}>
      <RecipeSectionsEditor sections={sections} onChange={setSections} />
      <output data-testid="dump">{JSON.stringify(sections.map(toSection))}</output>
    </ThemeProvider>
  );
}

describe('RecipeSectionsEditor', () => {
  it('hides section chrome for a single section and reveals it on Add section', () => {
    render(<Harness initial={[emptyEditSection()]} />);
    expect(screen.queryByLabelText('Section name')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Add section' }));
    expect(screen.getAllByLabelText('Section name')).toHaveLength(2);
  });

  it('reorders steps with the down button', () => {
    render(<Harness initial={[{ name: '', ingredients: [''], steps: ['A', 'B'] }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'move Steps 1 down' }));
    expect(screen.getByTestId('dump')).toHaveTextContent('"steps":["B","A"]');
  });

  it('adds and removes ingredient rows', () => {
    render(<Harness initial={[{ name: '', ingredients: ['flour'], steps: [''] }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add ingredients' }));
    fireEvent.click(screen.getByRole('button', { name: 'remove Ingredients 2' }));
    expect(screen.getByTestId('dump')).toHaveTextContent('"ingredients":["flour"]');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/recipes/RecipeSectionsEditor.test.tsx`
Expected: FAIL — `RecipeSectionsEditor` does not exist yet.

- [ ] **Step 3: Write the component**

Create `src/components/recipes/RecipeSectionsEditor.tsx`:

```tsx
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { moveItem } from '../../utils/recipe';
import type { RecipeSection } from '../../types/recipe';

// Editor-facing section: `name` is always a string (never null) for a
// controlled input, and each list keeps at least one (possibly blank) row so
// there is always somewhere to type. Converted to/from the API `RecipeSection`
// at the page boundary via toEditSection / toSection.
export interface EditSection {
  name: string;
  ingredients: string[];
  steps: string[];
}

export function emptyEditSection(): EditSection {
  return { name: '', ingredients: [''], steps: [''] };
}

export function toEditSection(s: RecipeSection): EditSection {
  return {
    name: s.name ?? '',
    ingredients: s.ingredients.length ? s.ingredients : [''],
    steps: s.steps.length ? s.steps : [''],
  };
}

export function toSection(s: EditSection): RecipeSection {
  return {
    name: s.name.trim() === '' ? null : s.name.trim(),
    ingredients: s.ingredients.map((i) => i.trim()).filter((i) => i !== ''),
    steps: s.steps.map((st) => st.trim()).filter((st) => st !== ''),
  };
}

interface RecipeSectionsEditorProps {
  sections: EditSection[];
  onChange: (sections: EditSection[]) => void;
}

// Progressive: with one section, only Ingredients + Steps show. "Add section"
// appends a section and reveals name fields + card chrome on all of them.
export const RecipeSectionsEditor: React.FC<RecipeSectionsEditorProps> = ({
  sections,
  onChange,
}) => {
  const multi = sections.length > 1;

  const patchSection = (si: number, patch: Partial<EditSection>): void =>
    onChange(sections.map((s, i) => (i === si ? { ...s, ...patch } : s)));
  const addSection = (): void => onChange([...sections, emptyEditSection()]);
  const removeSection = (si: number): void => onChange(sections.filter((_, i) => i !== si));
  const moveSection = (si: number, dir: -1 | 1): void => onChange(moveItem(sections, si, dir));

  const renderRows = (
    si: number,
    key: 'ingredients' | 'steps',
    label: string,
    placeholder: string
  ): React.ReactNode => {
    const list = sections[si][key];
    const setList = (next: string[]): void =>
      patchSection(si, key === 'ingredients' ? { ingredients: next } : { steps: next });
    return (
      <Box>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          {label}
        </Typography>
        {list.map((value, ri) => (
          <Stack key={ri} direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <TextField
              fullWidth
              size="small"
              value={value}
              placeholder={placeholder}
              onChange={(e) => setList(list.map((x, idx) => (idx === ri ? e.target.value : x)))}
            />
            <IconButton
              aria-label={`move ${label} ${ri + 1} up`}
              disabled={ri === 0}
              onClick={() => setList(moveItem(list, ri, -1))}
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={`move ${label} ${ri + 1} down`}
              disabled={ri === list.length - 1}
              onClick={() => setList(moveItem(list, ri, 1))}
            >
              <ArrowDownwardIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label={`remove ${label} ${ri + 1}`}
              onClick={() => setList(list.filter((_, idx) => idx !== ri))}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
        <Button startIcon={<AddIcon />} size="small" onClick={() => setList([...list, ''])}>
          Add {label.toLowerCase()}
        </Button>
      </Box>
    );
  };

  return (
    <Stack spacing={3}>
      {sections.map((section, si) => (
        <Box
          key={si}
          sx={multi ? { p: 2, border: 1, borderColor: 'divider', borderRadius: 1 } : undefined}
        >
          {multi && (
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                label="Section name"
                placeholder="e.g. Cake"
                value={section.name}
                onChange={(e) => patchSection(si, { name: e.target.value })}
              />
              <IconButton
                aria-label={`move section ${si + 1} up`}
                disabled={si === 0}
                onClick={() => moveSection(si, -1)}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label={`move section ${si + 1} down`}
                disabled={si === sections.length - 1}
                onClick={() => moveSection(si, 1)}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label={`remove section ${si + 1}`}
                onClick={() => removeSection(si)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}
          {renderRows(si, 'ingredients', 'Ingredients', '2 cups flour')}
          {renderRows(si, 'steps', 'Steps', 'Preheat the oven to 350°F')}
        </Box>
      ))}
      <Box>
        <Button startIcon={<AddIcon />} size="small" onClick={addSection}>
          Add section
        </Button>
      </Box>
    </Stack>
  );
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/recipes/RecipeSectionsEditor.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/recipes/RecipeSectionsEditor.tsx src/components/recipes/RecipeSectionsEditor.test.tsx
git commit -m "feat(recipes): RecipeSectionsEditor controlled per-step editor

- Progressive section chrome: single section shows only ingredient/step rows; Add section reveals names
- Up/down reorder for rows and sections; EditSection <-> RecipeSection converters

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Wire the read surface — `RecipePage` renderer + `RecipesPage` card preview

**Files:**
- Modify: `src/pages/RecipePage.tsx` (full rewrite below)
- Create: `src/pages/RecipePage.test.tsx`
- Modify: `src/pages/RecipesPage.tsx:236` + import
- Modify: `src/pages/RecipesPage.test.tsx:30` (fixture)

**Interfaces:**
- Consumes: `RecipeSections` (Task 2); `previewIngredients` (Task 1).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Write the failing RecipePage test**

Create `src/pages/RecipePage.test.tsx`:

```tsx
import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../theme';
import RecipePage from './RecipePage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const server = setupServer(
  http.get('/recipes/layer-cake', () =>
    HttpResponse.json({
      id: 'r1',
      recipe_url: 'layer-cake',
      hostname: 'andrewslai.com',
      content: {
        title: 'Layer Cake',
        sections: [
          { name: 'Cake', ingredients: ['2 cups flour'], steps: ['Mix', 'Bake'] },
          { name: 'Frosting', ingredients: ['1 cup butter'], steps: ['Whip'] },
        ],
      },
      labels: [],
      public_visibility: true,
      created_at: '2026-01-01T00:00:00Z',
      modified_at: '2026-01-01T00:00:00Z',
    })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderPage(): void {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  rtlRender(
    <ThemeProvider theme={makeTheme(BASE_THEME)}>
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={['/recipes/layer-cake']}>
          <Routes>
            <Route path="/recipes/:slug" element={<RecipePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

describe('RecipePage', () => {
  it('renders each section with its ingredients and steps', async () => {
    renderPage();
    expect(await screen.findByRole('heading', { name: 'Cake' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frosting' })).toBeInTheDocument();
    expect(screen.getByText('2 cups flour')).toBeInTheDocument();
    expect(screen.getByText('Whip')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/pages/RecipePage.test.tsx`
Expected: FAIL — `RecipePage` still renders the flat `content.ingredients` / `instructions_html` and throws (or renders no `Cake` heading).

- [ ] **Step 3: Rewrite `RecipePage`**

Replace the entire contents of `src/pages/RecipePage.tsx` with:

```tsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { RecipeSections } from '../components/recipes/RecipeSections';
import { useAuth } from '../auth/useAuth';
import { getRecipe, qualifiedLabelName } from '../api/recipes';

function metaLine(recipe: {
  content: {
    servings?: string | null;
    prep_time_minutes?: number | null;
    cook_time_minutes?: number | null;
  };
}): string {
  const { servings, prep_time_minutes, cook_time_minutes } = recipe.content;
  return [
    servings ? `Serves ${servings}` : null,
    prep_time_minutes ? `Prep ${prep_time_minutes} min` : null,
    cook_time_minutes ? `Cook ${cook_time_minutes} min` : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

const RecipePage: React.FC = () => {
  const { slug = '' } = useParams();
  const { token, userProfile, isAuthenticated, login } = useAuth();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', slug],
    queryFn: () => getRecipe(slug, token),
  });

  return (
    <>
      <NavBar user={userProfile ?? undefined} isAuthenticated={isAuthenticated} login={login} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {isLoading && <LoadingScreen />}
        {!isLoading && !recipe && <Typography>Recipe not found.</Typography>}
        {recipe && (
          <>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h3" gutterBottom>
                {recipe.content.title}
              </Typography>
              {isAuthenticated && (
                <Button
                  component={RouterLink}
                  to={`/recipes/${recipe.recipe_url}/edit`}
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Edit
                </Button>
              )}
            </Stack>

            <Typography variant="subtitle1" color="text.secondary">
              {metaLine(recipe)}
            </Typography>
            {recipe.source_url && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                Source:{' '}
                <Link href={recipe.source_url} target="_blank" rel="noopener noreferrer">
                  {recipe.source_url}
                </Link>
              </Typography>
            )}

            {recipe.labels && recipe.labels.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ my: 2, flexWrap: 'wrap' }}>
                {recipe.labels.map((l) => (
                  <Chip key={l.id} label={qualifiedLabelName(l)} size="small" />
                ))}
              </Stack>
            )}

            <RecipeSections content={recipe.content} />
          </>
        )}
      </Container>
    </>
  );
};

export default RecipePage;
```

- [ ] **Step 4: Run the RecipePage test to verify it passes**

Run: `npx vitest run src/pages/RecipePage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Update the `RecipesPage` card preview and its fixture**

In `src/pages/RecipesPage.tsx`, add this import next to the other recipe imports (it already imports `qualifiedLabelName` from `../api/recipes`; add a separate line):

```tsx
import { previewIngredients } from '../utils/recipe';
```

Replace line 236 (`{r.content.ingredients.slice(0, 3).join(', ')}`) with:

```tsx
                    {previewIngredients(r.content)}
```

In `src/pages/RecipesPage.test.tsx`, replace the fixture `content` on line 30 with:

```tsx
        content: {
          title: 'Chana Masala',
          sections: [{ name: null, ingredients: ['chickpeas', 'flour'], steps: [] }],
        },
```

- [ ] **Step 6: Run the RecipesPage test to verify it passes**

Run: `npx vitest run src/pages/RecipesPage.test.tsx`
Expected: PASS (card still shows "Chana Masala"; preview now reads "chickpeas, flour").

- [ ] **Step 7: Commit**

```bash
git add src/pages/RecipePage.tsx src/pages/RecipePage.test.tsx src/pages/RecipesPage.tsx src/pages/RecipesPage.test.tsx
git commit -m "feat(recipes): render sections on detail + list pages

- RecipePage uses RecipeSections (drops RichTextEditor); adds a render test
- RecipesPage card preview flattens ingredients via previewIngredients

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Wire the editor — `RecipeEditorPage` sections form + full CI gate

**Files:**
- Modify: `src/pages/RecipeEditorPage.tsx` (full rewrite below)
- Modify: `src/pages/RecipeEditorPage.test.tsx` (drop RichTextEditor mock; sectioned scrape fixture)

**Interfaces:**
- Consumes: `RecipeSectionsEditor`, `emptyEditSection`, `toEditSection`, `toSection`, `EditSection` (Task 3); `RecipeSections` (Task 2).
- Produces: nothing later depends on — this is the last task.

- [ ] **Step 1: Update the editor test to the sectioned shape**

In `src/pages/RecipeEditorPage.test.tsx`, delete the `RichTextEditor` mock block entirely (lines 22-35, the `vi.mock('../components/editor/RichTextEditor', …)` call). Recipes no longer render it.

Replace the scrape handler's `recipe` object (lines 44-51) with:

```ts
      recipe: {
        title: 'Imported Stew',
        sections: [{ name: null, ingredients: ['carrots', 'beef'], steps: ['Simmer'] }],
        servings: '4',
        prep_time_minutes: 10,
        cook_time_minutes: 120,
      },
```

Leave the rest of the test unchanged: it still imports from a URL, asserts the Title/Servings fields populate, asserts `getByDisplayValue('carrots')` (now an ingredient row inside the sole section), saves, and checks `createdBody` carries `content.title` + `original-content.title`.

- [ ] **Step 2: Run the editor test to verify it fails**

Run: `npx vitest run src/pages/RecipeEditorPage.test.tsx`
Expected: FAIL — the page still builds a flat `FormState` (`ingredients`, `instructions_html`), so the sectioned draft never lands in the form and `getByDisplayValue('carrots')` is not found (and TypeScript/`toContent` reference removed fields).

- [ ] **Step 3: Rewrite `RecipeEditorPage`**

Replace the entire contents of `src/pages/RecipeEditorPage.tsx` with:

```tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { RecipeSections } from '../components/recipes/RecipeSections';
import {
  RecipeSectionsEditor,
  emptyEditSection,
  toEditSection,
  toSection,
  type EditSection,
} from '../components/recipes/RecipeSectionsEditor';
import { LabelPicker } from '../components/recipes/LabelPicker';
import { useAuth } from '../auth/useAuth';
import {
  getRecipe,
  createRecipe,
  updateRecipe,
  scrapeRecipe,
  getLabels,
  createLabel,
  addRecipeAudience,
} from '../api/recipes';
import { getGroups } from '../api/groups';
import type { RecipeContent, ScrapeResult } from '../types/recipe';

interface FormState {
  title: string;
  servings: string;
  prep: string;
  cook: string;
  sourceUrl: string;
  sections: EditSection[];
  labelIds: string[];
  publicVisibility: boolean;
}

const EMPTY_FORM: FormState = {
  title: '',
  servings: '',
  prep: '',
  cook: '',
  sourceUrl: '',
  sections: [emptyEditSection()],
  labelIds: [],
  publicVisibility: false,
};

function sectionsForEdit(content: RecipeContent): EditSection[] {
  return content.sections.length ? content.sections.map(toEditSection) : [emptyEditSection()];
}

function toContent(form: FormState): RecipeContent {
  const num = (s: string): number | null => (s.trim() === '' ? null : Number(s));
  return {
    title: form.title,
    sections: form.sections.map(toSection),
    servings: form.servings.trim() === '' ? null : form.servings,
    prep_time_minutes: num(form.prep),
    cook_time_minutes: num(form.cook),
  };
}

const RecipeEditorPage: React.FC = () => {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, userProfile, isAuthenticated, login } = useAuth();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [original, setOriginal] = useState<RecipeContent | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  const { data: labels = [] } = useQuery({
    queryKey: ['recipe-labels'],
    queryFn: () => getLabels(token),
  });
  const { data: groups = [] } = useQuery({ queryKey: ['groups'], queryFn: () => getGroups(token) });

  const { data: existing, isLoading } = useQuery({
    queryKey: ['recipe', slug],
    queryFn: () => getRecipe(slug as string, token),
    enabled: isEdit,
  });

  useEffect(() => {
    if (existing) {
      const c = existing.content;
      setForm({
        title: c.title,
        servings: c.servings ?? '',
        prep: c.prep_time_minutes != null ? String(c.prep_time_minutes) : '',
        cook: c.cook_time_minutes != null ? String(c.cook_time_minutes) : '',
        sourceUrl: existing.source_url ?? '',
        sections: sectionsForEdit(c),
        labelIds: (existing.labels ?? []).map((l) => l.id),
        publicVisibility: existing.public_visibility,
      });
      setOriginal(existing.original_content ?? null);
    }
  }, [existing]);

  const applyDraft = (draft: ScrapeResult): void => {
    const r = draft.recipe;
    setForm((f) => ({
      ...f,
      title: r.title,
      servings: r.servings ?? '',
      prep: r.prep_time_minutes != null ? String(r.prep_time_minutes) : '',
      cook: r.cook_time_minutes != null ? String(r.cook_time_minutes) : '',
      sourceUrl: scrapeUrl,
      sections: sectionsForEdit(r),
    }));
    setOriginal(r);
    setWarnings(draft.warnings);
  };

  const scrapeMutation = useMutation({
    mutationFn: () => scrapeRecipe(scrapeUrl, token),
    onSuccess: applyDraft,
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const content = toContent(form);
      if (isEdit) {
        return updateRecipe(
          slug as string,
          {
            content,
            source_url: form.sourceUrl || null,
            label_ids: form.labelIds,
            public_visibility: form.publicVisibility,
          },
          token
        );
      }
      return createRecipe(
        {
          content,
          ...(original ? { original_content: original } : {}),
          source_url: form.sourceUrl || null,
          label_ids: form.labelIds,
          public_visibility: form.publicVisibility,
        },
        token
      );
    },
    onSuccess: (saved) => {
      void queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate(`/recipes/${saved.recipe_url}`);
    },
  });

  const shareMutation = useMutation({
    mutationFn: (groupId: string) => addRecipeAudience(existing?.id as string, groupId, token),
  });

  const setField = (patch: Partial<FormState>): void => setForm((f) => ({ ...f, ...patch }));

  if (isEdit && isLoading) return <LoadingScreen />;

  return (
    <>
      <NavBar user={userProfile ?? undefined} isAuthenticated={isAuthenticated} login={login} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {isEdit ? 'Edit recipe' : 'New recipe'}
        </Typography>

        {!isEdit && (
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Import from URL"
              placeholder="https://…"
              value={scrapeUrl}
              onChange={(e) => setScrapeUrl(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => scrapeMutation.mutate()}
              disabled={!scrapeUrl.trim() || scrapeMutation.isPending}
            >
              {scrapeMutation.isPending ? 'Importing…' : 'Import'}
            </Button>
          </Stack>
        )}
        {scrapeMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Could not import this URL. Paste the recipe below instead.
          </Alert>
        )}
        {warnings.map((w, i) => (
          <Alert key={i} severity="warning" sx={{ mb: 1 }}>
            {w}
          </Alert>
        ))}

        <Stack spacing={2}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setField({ title: e.target.value })}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Servings"
              value={form.servings}
              onChange={(e) => setField({ servings: e.target.value })}
            />
            <TextField
              label="Prep (min)"
              type="number"
              value={form.prep}
              onChange={(e) => setField({ prep: e.target.value })}
            />
            <TextField
              label="Cook (min)"
              type="number"
              value={form.cook}
              onChange={(e) => setField({ cook: e.target.value })}
            />
          </Stack>
          <TextField
            label="Source URL"
            value={form.sourceUrl}
            onChange={(e) => setField({ sourceUrl: e.target.value })}
            fullWidth
          />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Ingredients &amp; steps
            </Typography>
            <RecipeSectionsEditor
              sections={form.sections}
              onChange={(sections) => setField({ sections })}
            />
          </Box>

          <LabelPicker
            labels={labels}
            value={form.labelIds}
            onChange={(ids) => setField({ labelIds: ids })}
            onCreateLabel={(name) => createLabel(name, null, token)}
          />

          {original && (
            <Box>
              <Button size="small" onClick={() => setShowOriginal((s) => !s)}>
                {showOriginal ? 'Hide original' : 'View original (as scraped)'}
              </Button>
              <Collapse in={showOriginal}>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {original.title}
                  </Typography>
                  <RecipeSections content={original} />
                </Box>
              </Collapse>
            </Box>
          )}

          <Divider />
          <FormControlLabel
            control={
              <Switch
                checked={form.publicVisibility}
                onChange={(e) => setField({ publicVisibility: e.target.checked })}
              />
            }
            label="Publicly visible"
          />

          {isEdit && existing && groups.length > 0 && (
            <Box>
              <Typography variant="subtitle2">Share with a group</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {groups.map((g) => (
                  <Chip
                    key={g.group_id}
                    label={g.display_name}
                    onClick={() => shareMutation.mutate(g.group_id)}
                  />
                ))}
              </Stack>
            </Box>
          )}

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={() => saveMutation.mutate()}
              disabled={!form.title.trim() || saveMutation.isPending}
            >
              {saveMutation.isPending ? 'Saving…' : 'Save'}
            </Button>
            <Button onClick={() => navigate('/recipes')}>Cancel</Button>
          </Stack>
          {saveMutation.isError && <Alert severity="error">Could not save the recipe.</Alert>}
        </Stack>
      </Container>
    </>
  );
};

export default RecipeEditorPage;
```

(This drops the now-unused `useRef`, `IconButton`, `AddIcon`, `DeleteIcon`, and `RichTextEditor` imports and the per-ingredient row helpers; section editing now lives in `RecipeSectionsEditor`.)

- [ ] **Step 4: Run the editor test to verify it passes**

Run: `npx vitest run src/pages/RecipeEditorPage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Run the full CI gate**

Run: `npm run ci`
Expected: typecheck clean, lint clean, all tests PASS. If lint flags an unused import in a recipe file, remove it (the rewrites above should already be clean). Do NOT touch `RichTextEditor`, `ArticlePage`, or `ArticleEditorPage` — they legitimately still use TipTap.

- [ ] **Step 6: Commit**

```bash
git add src/pages/RecipeEditorPage.tsx src/pages/RecipeEditorPage.test.tsx
git commit -m "feat(recipes): sectioned editor with per-step rows, no TipTap

- FormState carries EditSection[]; RecipeSectionsEditor replaces the ingredient list + RichTextEditor
- Scrape draft and existing recipe seed sections; View original renders RecipeSections
- Drops RichTextEditor from recipes (articles keep it)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-review notes (coverage vs. DESIGN §6)

- **Renderer → headed ingredient lists + `<ol>`s** → Task 2 (`RecipeSections`), wired in Task 4.
- **Editor → per-step list (add/remove/reorder) inside each section** → Task 3 (`RecipeSectionsEditor`), wired in Task 5.
- **Steps as data, no HTML; drop `instructions_html`** → Task 1 (types), Tasks 4-5 (TipTap removed from recipes; kept for articles).
- **`extraction_method` gains `json-ld+llm-sections`** → Task 1.
- **`original_content` same shape** → Task 5 renders it via `RecipeSections` unchanged.

## Out of scope (matches backend DESIGN)

- Structured quantity parsing / scaling.
- Rich text inside steps.
- Drag-and-drop reordering (up/down buttons chosen).
- Per-section prep/cook times.
