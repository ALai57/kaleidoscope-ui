# Article Manager + Editor → Prism (P2 slice 2) — Design

**Status:** Approved design (2026-07-14). Next: implementation plan via writing-plans.

**Goal:** Re-skin two admin surfaces — the article manager list (`ArticleManagerPage` + `layout/Table`) and the article editor (`ArticleEditorPage` + `EditorToolbar`, full dark canvas) — to the Prism dark look, token-driven, while keeping the public reader (`ArticlePage`, which shares `RichTextEditor`) light.

**Context:** P2 slice 2 (continues the Image Manager slice, see `prism-p2-image-manager` memory + the Prism-adoption audit). Both surfaces currently render under the light public `NavBar`. `RichTextEditor` is shared with the public reader; `EditorToolbar` is gated to `editable` (never in the reader); `layout/Table` is used only by the manager.

---

## Global Constraints

- Node 22; `npm run ci` (typecheck + lint + test) green before push; commit after each task.
- **No raw color literals** in components (lint-enforced `no-restricted-syntax`; exempt under `src/theme/**`, tests, stories). Use `theme.palette.*` / `theme.tokens.*` / `alpha(...)`.
- **No `prism/*` imports inside `src/components/editor/*` or `src/components/layout/Table.tsx`.** The Prism voice comes from `theme.tokens.*` with non-token fallbacks (`tokens?.typography.mono ?? 'monospace'`, `tokens?.motion.*`) — the `NavBar`/`AdminNavRail`/Image-Manager pattern. `prism/*` primitives are allowed only in the page-level chrome (`ArticleManagerPage`/`ArticleEditorPage` headers), which never renders in the reader. This is what keeps `RichTextEditor` correct in the light reader.
- **Reuse invariant (hard requirement):** `RichTextEditor` renders in two places — `ArticleEditorPage` (`editable`, wrapped in `PrismThemeProvider` → dark) and `ArticlePage` (the public reader, `editable={false}`, NOT wrapped → light). `EditorToolbar` renders only when `editable` (never in the reader). Every change must keep the reader path light and toolbar-free. Enforced by a regression test.
- Server state → TanStack Query; the existing branches/versions/audiences/groups queries + save/publish/audience mutations and `src/api/*` clients are unchanged. This is styling + shell only.

---

## Architecture / Approach

Token-driven, in-place re-skin. No new `prism/*` primitive. Each admin page wraps its body (below the light `NavBar`) in the existing `PrismThemeProvider` (the RecipesPage/Image-Manager precedent); the shared components (`layout/Table`, `EditorToolbar`, `RichTextEditor` content) read colors/voice/motion from the theme with fallbacks, so they render Prism-dark under the wrap and light in the reader.

Two surfaces, largely independent (the plan will group tasks as Manager, then Editor).

---

## Surface A — Article Manager list

### `src/pages/ArticleManagerPage.tsx`
- Wrap the content region (below `NavBar`) in `PrismThemeProvider`; the dark plane fills below the NavBar (flex-column + inner `flex:1`, per the Image-Manager fill-height fix).
- Replace the plain page title with a Prism header (mono eyebrow "ARTICLES" + title), via `sx` theme-callbacks (`(t) => ({ fontFamily: t.tokens?.typography.mono ?? 'monospace', … })`). `prism/*` allowed here (page chrome).
- The audience/group management dialogs, `<Chip>`s, buttons, and custom cell renderers re-skin via the theme; status-conveying chips adopt the Prism voice where cheap. No hardcoded colors.

### `src/components/layout/Table.tsx` (used only by the manager)
- Give the wrapped `DataGrid` a token-driven Prism `sx` (base dark comes from the ambient theme; the `sx` adds the Prism character):
  - Column headers: mono, uppercase, letter-spaced, `text.secondary`/`ink-3`, a hairline bottom border (`divider`/`line-2`).
  - Rows: hairline `divider` bottom borders; hover → `action.hover`; `font-variant-numeric: tabular-nums` on cells.
  - Selection/focus: accent (`primary.main`) ring; remove the default cell focus outline in favor of a token one.
  - Remove the DataGrid's default outer border in favor of a hairline container.
- Keep it token-driven (no `prism/*`), so it stays correct regardless of ambient theme even though it's manager-only today.

---

## Surface B — Article Editor (full dark canvas)

### `src/pages/ArticleEditorPage.tsx`
- Wrap the content region (below `NavBar`) in `PrismThemeProvider` → the whole editor, including the content canvas, is Prism-dark (the chosen "full dark canvas"). Use the same fill-height pattern as the manager (flex-column page + inner `flex:1`) so the dark plane fills below the NavBar without overflow.
- Prism header (mono eyebrow "EDITOR" / article title context) via `sx` theme-callbacks.
- Title `TextField`, audience/group `Select`s + `FormControl`s, publish `Dialog`, `Chip`s, `Divider`s, buttons re-skin dark via the theme. No hardcoded colors.

### `src/components/editor/EditorToolbar.tsx` (admin-only — gated by `editable`)
- Adopt the Prism `.tbBtn` treatment on the `ToolbarButton`, token-driven (it already uses `active ? 'primary.main' : 'text.secondary'` + `aria-pressed`):
  - Active: accent color (`primary.main`) + accent-dim background (`alpha(theme.palette.primary.main, ~0.14)`) + subtle accent border; keep `aria-pressed`.
  - Hover (inactive): raised background (`action.hover`), `text.primary`.
  - Mono voice where labels/text appear; radius from `theme.shape`/`tokens.radius`.
- `ToolbarDivider` uses `divider`. Safe to style richly — never renders in the reader.

### `src/components/editor/RichTextEditor.tsx` (content shared with the reader)
- The content Box + `.ProseMirror` styling is already theme-reactive (`divider`, `text.secondary`, `background.paper`), so it renders dark under the editor's Prism wrap and light in the reader with no change to the reader.
- **Verify (adjust only if contrast is inadequate, and if so keep the reader appearance unchanged):**
  - Code blocks use `grey.900` bg / `grey.100` text (an intentionally dark code block in BOTH contexts). On the Prism dark canvas, confirm `grey.900` reads as a distinct lighter inset (it is lighter than the Prism plane); nudge to a token inset only if needed.
  - Blockquote (`divider` border, `text.secondary`) re-skins fine.
  - Links/base text: confirm the base text color resolves to Prism ink on the dark canvas and links are legible; add a token-driven base color only if the default is unreadable on dark.
- Keep changes minimal and token-driven; do NOT import `prism/*` here (reader-shared).

### In-editor image picker (emergent, no work)
The `ImageBrowser` picker modal opened from the editor now renders **dark for free** — it became token-driven in the Image Manager slice and the editor wrap provides the dark theme. This is consistent with the dark editor; just confirm it in QA.

---

## Reuse Safety & Testing

Co-located Vitest + Testing Library (jsdom); Storybook variants for visual QA.

- **Reader regression guard (the critical invariant):** render `RichTextEditor editable={false}` under the **light** app theme (`testUtils.render`) → assert `palette.mode === 'light'`, that **no toolbar** renders (no toolbar buttons / `aria-pressed` controls), and content is present. This protects `ArticlePage`.
- **Manager:** renders under `PrismThemeProvider` (`palette.mode === 'dark'`) with the Prism eyebrow present and the table rendering rows; audience/group chips + dialogs render. Existing `ArticleManagerPage` tests updated for the header/wrap.
- **`layout/Table`:** a Prism-wrapped story/test shows the mono hairline headers + hover rows; the DataGrid still renders the given rows/columns (behavior unchanged).
- **Editor:** `ArticleEditorPage` renders under Prism (`palette.mode === 'dark'`) with the Prism header; `EditorToolbar` active button carries the accent treatment (`aria-pressed` true + accent styling) — assert `aria-pressed` toggling behavior is intact.
- **Existing tests/stories:** update `ArticleManagerPage`, `ArticleEditorPage`, `EditorToolbar`, `RichTextEditor` tests for the new wrap/structure; add `PrismThemeProvider`-wrapped story variants beside the light ones (the visual reader-vs-editor proof).

---

## Out of Scope
- The public `NavBar` and `ArticlePage` reader styling (stay tenant-light).
- The article's published/public rendering; the TipTap extension set; editor/article/groups API contracts.
- Any new generic `prism/*` primitive.
- Changing tiles/tables to new layouts — this is a re-skin, not a restructure.

---

## Decisions Resolved (during brainstorming)
1. **Scope:** the manager list AND the editor, in one slice. *(user)*
2. **Shell:** `PrismThemeProvider` wrap on each page (light `NavBar` stays above) — no `AdminLayout`, no nav changes. *(precedent + design)*
3. **Editor canvas:** **full dark** — wrap `ArticleEditorPage` in Prism so the content canvas is dark too (matches the Prism library's editor mock; reader stays light because it isn't wrapped). *(user)*
4. **No new primitive:** re-skin in place, token-driven; `prism/*` only in page chrome. *(design)*
5. **Reuse safety:** `RichTextEditor` content stays theme-reactive (light in the reader), `EditorToolbar` gated to `editable`, `layout/Table` manager-only — enforced by a reader regression test. *(design)*
