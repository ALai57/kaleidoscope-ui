# Article Manager + Editor → Prism (P2 slice 2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the article manager list (`ArticleManagerPage` + `layout/Table`) and the article editor (`ArticleEditorPage` + `EditorToolbar`, full dark canvas) to Prism dark — token-driven — while keeping the public reader (`ArticlePage`, which shares `RichTextEditor`) light.

**Architecture:** Each admin page wraps its body (below the light `NavBar`) in the existing `PrismThemeProvider` (RecipesPage/Image-Manager precedent). Shared components (`layout/Table`, `EditorToolbar`, `RichTextEditor` content) read colors/voice/motion from `theme.palette`/`theme.tokens` with fallbacks, so they render Prism-dark under the wrap and light in the reader. `EditorToolbar` renders only when `editable` (never in the reader); `layout/Table` is manager-only. Full design: `docs/superpowers/specs/2026-07-14-article-manager-editor-prism-design.md`.

**Tech Stack:** React 18 + TS, MUI 6 + `@mui/x-data-grid`, TipTap, Emotion, Vitest + Testing Library (jsdom), Storybook 8.

## Global Constraints

- Node 22; `npm run ci` green before push; commit after each task.
- **No raw color literals** in components (lint-enforced; exempt under `src/theme/**`, tests, stories). Use `theme.palette.*`/`theme.tokens.*`/`alpha(...)`.
- **No `prism/*` imports inside `src/components/editor/*` or `src/components/layout/Table.tsx`.** Prism voice via `theme.tokens.*` with fallbacks (`tokens?.typography.mono ?? 'monospace'`). `prism/*` allowed only in the page chrome (`ArticleManagerPage`/`ArticleEditorPage` headers), never reader-shared.
- **Reuse invariant (hard requirement):** `RichTextEditor` renders in `ArticleEditorPage` (`editable`, Prism-wrapped → dark) and `ArticlePage` (public reader, `editable={false}`, NOT wrapped → light). `EditorToolbar` renders only when `editable`. Keep the reader path light + toolbar-free — enforced by Task 5's regression test.
- Data flow (branches/versions/audiences/groups queries + save/publish/audience mutations, `src/api/*`) unchanged — styling + shell only.
- Page fill-height: outer page `Box` = `display:flex; flexDirection:column; minHeight:100vh`; inner content `Box` = `flex:1` + `bgcolor:'background.default'` (the Image-Manager fill pattern), so the dark plane fills below `NavBar` without overflow.

## File Structure

| File | Change | Responsibility |
|---|---|---|
| `src/components/layout/Table.tsx` | Modify | Prism `DataGrid` treatment (mono hairline headers, hover rows, tabular-nums, accent focus). |
| `src/components/layout/Table.test.tsx` | Modify | Renders rows under Prism (regression). |
| `src/pages/ArticleManagerPage.tsx` | Modify | `PrismThemeProvider` wrap + Prism eyebrow + fill-height. |
| `src/pages/ArticleManagerPage.test.tsx` | Modify | Eyebrow renders. |
| `src/components/editor/EditorToolbar.tsx` | Modify | Prism `.tbBtn` active/hover treatment on `ToolbarButton`. |
| `src/components/editor/EditorToolbar.test.tsx` | Modify | Renders + active `aria-pressed` intact under Prism. |
| `src/pages/ArticleEditorPage.tsx` | Modify | `PrismThemeProvider` wrap (full dark canvas) + Prism header + fill-height. |
| `src/pages/ArticleEditorPage.test.tsx` | Modify | Eyebrow renders. |
| `src/components/editor/RichTextEditor.tsx` | Modify | Token base text color (`text.primary`) so content is legible on dark; reader stays light. |
| `src/components/editor/RichTextEditor.test.tsx` | Modify | Reader regression guard (read-only → no toolbar). |
| `src/components/editor/RichTextEditor.stories.tsx` + `layout/Table.stories.tsx` | Modify | Prism-dark story variants (visual reader-vs-editor / table proof). |

**Free re-skin — NO code change (verify only):** the manager's audience/group dialogs + chips + custom cells, and the editor's title `TextField`/`Select`s/publish `Dialog`/chips, re-skin dark under the page wrap automatically. The in-editor `ImageBrowser` picker renders dark for free (token-driven since slice 1).

---

## GROUP 1 — Article Manager list

### Task 1: Prism `DataGrid` treatment in `layout/Table`

**Files:** Modify `src/components/layout/Table.tsx`; Test `src/components/layout/Table.test.tsx`.

**Interfaces:** `Table` API unchanged (`rows`, `columns`, `maxWidth`, `rowHeight`, `Toolbar`). The `DataGrid` gains a token-driven `sx`.

- [ ] **Step 1: Write the regression test**

Add to `src/components/layout/Table.test.tsx` (add `PrismThemeProvider` import from `'../prism'`):

```tsx
import { PrismThemeProvider } from '../prism';

it('renders rows under the Prism theme (regression)', () => {
  render(
    <PrismThemeProvider>
      <Table rows={rows} columns={columns} />
    </PrismThemeProvider>,
  );
  expect(screen.getByText('Alice Smith')).toBeTruthy();
});
```

- [ ] **Step 2: Run the test (should pass once wired; RED only if the sx breaks rendering)**

Run: `npm test -- src/components/layout/Table.test.tsx`
Expected: existing tests pass; the new one passes after Step 3. (It's a regression guard — if it fails after Step 3, the sx broke rendering.)

- [ ] **Step 3: Add the Prism `sx` to the `DataGrid`**

In `src/components/layout/Table.tsx`, add the import and a token-driven `sx`, then pass it to `DataGrid`:

```tsx
import type { SxProps, Theme } from '@mui/material/styles';
```

```tsx
const gridSx: SxProps<Theme> = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: (t) => `${t.shape.borderRadius}px`,
  '& .MuiDataGrid-columnHeaders': { borderColor: 'divider' },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontFamily: (t) => t.tokens?.typography.mono ?? 'monospace',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'text.secondary',
  },
  '& .MuiDataGrid-columnSeparator': { display: 'none' },
  '& .MuiDataGrid-cell': { borderColor: 'divider', fontVariantNumeric: 'tabular-nums' },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
  '& .MuiDataGrid-row:hover': { backgroundColor: 'action.hover' },
  '& .MuiDataGrid-footerContainer': { borderColor: 'divider' },
};
```

Add `sx={gridSx}` to the `<DataGrid ... />`. Keep everything else unchanged.

- [ ] **Step 4: Run tests**

Run: `npm test -- src/components/layout/Table.test.tsx`
Expected: all pass (existing header/row tests + the Prism regression). `npm run typecheck` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Table.tsx src/components/layout/Table.test.tsx
git commit -m "feat(table): Prism DataGrid treatment (mono hairline headers, hover rows)"
```

---

### Task 2: `ArticleManagerPage` — Prism wrap + eyebrow

**Files:** Modify `src/pages/ArticleManagerPage.tsx`; Test `src/pages/ArticleManagerPage.test.tsx`.

**Interfaces:** Consumes `PrismThemeProvider` from `src/components/prism`.

- [ ] **Step 1: Write the failing test**

In `src/pages/ArticleManagerPage.test.tsx`, **reuse the file's existing render harness** (its provider Wrapper + `useAuth`/query mocks — do not build a new one) and add:

```tsx
it('renders the Prism eyebrow', async () => {
  // render via the file's existing helper/wrapper, same as the sibling tests
  expect(await screen.findByText('ARTICLES')).toBeTruthy();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/ArticleManagerPage.test.tsx`
Expected: FAIL — no "ARTICLES" eyebrow yet.

- [ ] **Step 3: Wrap + header + fill-height**

In `src/pages/ArticleManagerPage.tsx` add `import { PrismThemeProvider } from '../components/prism';` and change the return to:

```tsx
return (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
    <PrismThemeProvider>
      <Box id="primary-content" sx={{ flex: 1, bgcolor: 'background.default', p: 3 }}>
        <Box
          component="p"
          sx={(t) => ({
            m: 0,
            mb: 2,
            fontFamily: t.tokens?.typography.mono ?? 'monospace',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'primary.main',
          })}
        >
          ARTICLES
        </Box>
        {isLoading && <LoadingScreen />}
        {!isLoading && (
          <Table
            rows={branches.map(toBranchRow)}
            columns={columns}
            maxWidth={1200}
            rowHeight={44}
            Toolbar={ArticleToolbar}
          />
        )}
      </Box>
      {visibilityRow && (
        <VisibilityModal row={visibilityRow} token={token} onClose={() => setVisibilityRow(null)} />
      )}
    </PrismThemeProvider>
  </Box>
);
```

(`VisibilityModal` moves inside the provider so the modal renders dark; it portals to body but inherits the theme via the React tree.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/ArticleManagerPage.test.tsx`
Expected: PASS — existing tests + the eyebrow test.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ArticleManagerPage.tsx src/pages/ArticleManagerPage.test.tsx
git commit -m "feat(articles): mount Prism on ArticleManagerPage + Prism header"
```

---

## GROUP 2 — Article Editor (full dark canvas)

### Task 3: Prism `.tbBtn` treatment in `EditorToolbar`

**Files:** Modify `src/components/editor/EditorToolbar.tsx`; Test `src/components/editor/EditorToolbar.test.tsx`.

**Interfaces:** `ToolbarButton`/`EditorToolbar` APIs, testids, and `aria-pressed` unchanged — styling only.

- [ ] **Step 1: Write the regression test**

Add to `src/components/editor/EditorToolbar.test.tsx`:

```tsx
import { PrismThemeProvider } from '@/components/prism';

it('renders the toolbar and keeps aria-pressed under the Prism theme', () => {
  const editor = createMockEditor();
  render(
    <PrismThemeProvider>
      <EditorToolbar editor={editor} />
    </PrismThemeProvider>,
  );
  expect(screen.getByRole('toolbar')).toBeDefined();
  expect(screen.getByTestId('toolbar-bold')).toHaveAttribute('aria-pressed');
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- src/components/editor/EditorToolbar.test.tsx`
Expected: passes once Step 3 is in (regression guard; the toolbar renders + `aria-pressed` present). Existing tests must stay green.

- [ ] **Step 3: Enhance the `ToolbarButton` sx**

In `src/components/editor/EditorToolbar.tsx`, add `import { alpha, useTheme } from '@mui/material/styles';`. In `ToolbarButton`, add `const theme = useTheme();` and replace the `sx` with:

```tsx
const sx: SxProps<Theme> = {
  color: active ? activeColor : inactiveColor,
  borderRadius: 1,
  p: 0.5,
  border: '1px solid',
  borderColor: active ? 'primary.main' : 'transparent',
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.14) : 'transparent',
  '&:hover': {
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.2) : 'action.hover',
    color: active ? activeColor : 'text.primary',
  },
};
```

Keep `activeColor`/`inactiveColor`, `aria-pressed`, testids, and the `Tooltip`/`span`/`IconButton` structure unchanged.

- [ ] **Step 4: Run tests**

Run: `npm test -- src/components/editor/EditorToolbar.test.tsx src/components/editor/EditorToolbar.extra.test.tsx`
Expected: all pass. `npm run typecheck` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/editor/EditorToolbar.tsx src/components/editor/EditorToolbar.test.tsx
git commit -m "feat(editor): Prism .tbBtn treatment for EditorToolbar (accent active state)"
```

---

### Task 4: `ArticleEditorPage` — Prism wrap (full dark) + header

**Files:** Modify `src/pages/ArticleEditorPage.tsx`; Test `src/pages/ArticleEditorPage.test.tsx`.

**Interfaces:** Consumes `PrismThemeProvider`.

- [ ] **Step 1: Write the failing test**

In `src/pages/ArticleEditorPage.test.tsx`, **reuse the file's existing render harness/mocks** and add:

```tsx
it('renders the Prism editor eyebrow', async () => {
  // render via the file's existing helper/wrapper, same as the sibling tests
  expect(await screen.findByText('EDITOR')).toBeTruthy();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/pages/ArticleEditorPage.test.tsx`
Expected: FAIL — no "EDITOR" eyebrow yet.

- [ ] **Step 3: Wrap + header + fill-height**

In `src/pages/ArticleEditorPage.tsx` add `import { PrismThemeProvider } from '../components/prism';`. Change the outer return `Box` to a flex column and wrap the content region (currently the `<Box sx={{ p: 2 }}>` at line ~246) in `PrismThemeProvider`, and replace the `<Typography variant="h4">Article Editor</Typography>` (line ~247) with a Prism eyebrow + title:

```tsx
return (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
    <PrismThemeProvider>
      <Box sx={{ flex: 1, bgcolor: 'background.default', p: 2 }}>
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
          EDITOR
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={(t) => ({
            mt: 0.5,
            fontFamily: t.tokens?.typography.mono ?? 'monospace',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          })}
        >
          Article Editor
        </Typography>
        {/* …the rest of the existing editor body, unchanged… */}
      </Box>
    </PrismThemeProvider>
  </Box>
);
```

Keep the entire existing editor body (title field, `RichTextEditor`(s), audience/group selects, publish dialog, loading states) inside the wrapped `Box` exactly as-is — only the outer frame + header change.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/pages/ArticleEditorPage.test.tsx src/pages/ArticleEditorPage.extra.test.tsx`
Expected: PASS — existing tests + the eyebrow test.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ArticleEditorPage.tsx src/pages/ArticleEditorPage.test.tsx
git commit -m "feat(articles): full dark Prism canvas + header on ArticleEditorPage"
```

---

### Task 5: `RichTextEditor` — legible on dark + reader regression guard

**Files:** Modify `src/components/editor/RichTextEditor.tsx`; Test `src/components/editor/RichTextEditor.test.tsx`.

**Interfaces:** `RichTextEditor` API unchanged. Content Box gains a token base text color so text is ink on dark (editor) and dark on light (reader).

- [ ] **Step 1: Write the reader regression guard**

Add to `src/components/editor/RichTextEditor.test.tsx`:

```tsx
it('renders read-only with no toolbar (reader path — protects ArticlePage)', async () => {
  await act(async () => {
    render(<RichTextEditor editable={false} initialContent="<p>Hello reader</p>" />);
  });
  expect(screen.queryByRole('toolbar')).toBeNull();
});
```

- [ ] **Step 2: Run the test**

Run: `npm test -- src/components/editor/RichTextEditor.test.tsx`
Expected: this guard passes immediately (the toolbar is already gated on `editable`) — it's a regression lock, not red-first. If it FAILS, the toolbar leaked into read-only; stop and investigate. Confirm the existing editor tests still pass after Step 3.

- [ ] **Step 3: Add a token base text color to the content Box**

In `src/components/editor/RichTextEditor.tsx`, on the content `Box` (the one wrapping `EditorContent`, sx starting at line ~76), add `color: 'text.primary'` so the editor text is theme-reactive (Prism ink on the dark canvas; unchanged near-black in the light reader):

```tsx
<Box
  sx={{
    color: 'text.primary',
    minHeight: editable ? '200px' : undefined,
    p: editable ? 1.5 : 0,
    '& .ProseMirror': {
      // …unchanged…
    },
  }}
>
```

Leave the `.ProseMirror` code-block/blockquote styles as-is (the `grey.900` code block reads as a lighter inset on the Prism plane; Task 6's visual QA confirms). Do NOT import `prism/*` here.

- [ ] **Step 4: Run tests**

Run: `npm test -- src/components/editor/RichTextEditor.test.tsx`
Expected: all pass (reader guard + existing). `npm run typecheck` clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/editor/RichTextEditor.tsx src/components/editor/RichTextEditor.test.tsx
git commit -m "fix(editor): token base text color for dark canvas; lock reader-stays-light guard"
```

---

## GROUP 3 — Verification

### Task 6: Storybook Prism variants + full gate

**Files:** Modify `src/components/editor/RichTextEditor.stories.tsx`, `src/components/layout/Table.stories.tsx`.

- [ ] **Step 1: Add Prism-dark story variants**

In each stories file, mirror the existing story conventions and add a `PrismThemeProvider`-wrapped variant beside the light one:
- `RichTextEditor.stories.tsx`: an `EditorDark` story wrapping an `editable` `RichTextEditor` in `PrismThemeProvider` (dark canvas + Prism toolbar), leaving the existing light/read-only story as the reader proof. Import `PrismThemeProvider` from `'../prism'`.
- `Table.stories.tsx`: a `Prism` story wrapping `Table` in `PrismThemeProvider` (mono hairline headers, hover rows), reusing the file's existing rows/columns binding.

- [ ] **Step 2: Visual QA**

Run: `npm run storybook`. Confirm: the editor **EditorDark** story shows a dark canvas with legible ink text, dark toolbar with accent active buttons, and a code block reading as a distinct inset; the read-only/light story stays light with no toolbar; the **Table Prism** story shows mono hairline headers + row hover. Stop storybook when confirmed.

- [ ] **Step 3: Full gate**

Run: `npm run ci`
Expected: typecheck clean, lint clean (no raw-color / unused-import violations), full Vitest suite green.

- [ ] **Step 4: Drive (best-effort — needs backend/auth)**

If available, load the article manager (`/…` list — dark Prism table), open an article editor (dark canvas + Prism toolbar; open the image picker → dark), and open a published article (`ArticlePage` — confirm it is still **light** with no toolbar). If no backend, note deferred (the reader path is covered by Task 5's guard + the light story).

- [ ] **Step 5: Commit**

```bash
git add src/components/editor/RichTextEditor.stories.tsx src/components/layout/Table.stories.tsx
git commit -m "test(articles): Storybook Prism variants for editor + table"
```

---

## Self-Review

**Spec coverage:**
- *Manager list: Prism wrap + Prism table* → Tasks 1–2. ✓
- *Editor: full dark canvas + Prism toolbar* → Tasks 3–4. ✓
- *RichTextEditor legible on dark; reader stays light* → Task 5 (token base color + reader guard). ✓
- *Reuse invariant (reader light, toolbar gated, Table manager-only)* → Task 5 guard + constraint (no `prism/*` in editor/Table). ✓
- *Free re-skins (dialogs/selects/chips/picker)* → stated no-change; Task 6 verifies. ✓
- *Testing + stories* → Tasks 1–6. ✓

**Placeholder scan:** component tasks (1, 3, 5) and the page wraps (2, 4) have complete code. The two page **tests** (Tasks 2, 4) intentionally defer the render harness to the file's existing Wrapper/mocks (they mock `useAuth` + queries), with the exact assertion given — noted explicitly, not a TBD. Task 6's story bindings reuse each file's existing sample data (adapt to the real binding name).

**Type consistency:** `PrismThemeProvider` (children-only) imported consistently (`'../components/prism'` from pages, `'../prism'`/`'@/components/prism'` from components); `SxProps<Theme>` used where sx is extracted; `text.primary`/`primary.main`/`action.hover`/`divider` are standard palette paths.

**Scope:** two surfaces, one plan, grouped Manager/Editor. `ArticlePage`, public `NavBar`, APIs, TipTap extensions untouched.
