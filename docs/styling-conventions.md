# Styling Conventions

The rule set below is what the codebase already mostly follows. Writing it down
now (start of the design-system work) keeps new code from drifting before the
token layer (Phase 1) and shared primitives (Phase 3) land.

## The rules

1. **`sx` for one-off layout and spacing.** Positioning, margins, gaps, and
   other per-instance tweaks belong in the `sx` prop. This is the default and
   already used across ~80 files.
2. **`styled()` (from `@mui/material/styles`) for reusable styled primitives.**
   If a styled element is used in more than one place, promote it to a
   `styled()` component rather than copy-pasting `sx`. Today only
   `components/colors` does this; that's the pattern to extend.
3. **No raw `style={{ ... }}`.** Inline `style` bypasses the theme and can't read
   tokens. Use `sx` instead. (12 files still do this — see "Migration" below.)
4. **No hardcoded colors.** No hex, `rgb()`, or `rgba()` literals in components.
   Pull from `theme.palette` / theme tokens. `DarkModeToggle.tsx`'s
   `rgba(0, 0, 0, 0.18)` is the canonical example of what not to do.
5. **Icons come from `@mui/icons-material`.** Not `@styled-icons/*` — those were
   removed in Phase 0 (they dragged in `styled-components`).

## Why not styled-components / @emotion/styled directly?

- `styled-components` was removed. Its only real usage was via `@styled-icons/*`
  icons, which are now MUI icons.
- `@emotion/react` and `@emotion/styled` stay, but **only because MUI v6 requires
  them as peer dependencies** (`@mui/styled-engine`). Don't import them directly —
  go through MUI's `styled()` / `sx`, which use emotion under the hood.

## Migration (do this as Phase 1 tokens land, not before)

12 files still use raw `style={{}}`. Don't migrate them in a separate pass now —
migrate each onto `sx`/tokens when Phase 1 introduces the tokens they should
consume, so nothing gets migrated twice. Current offenders:

- `components/article/ArticleCard.tsx`
- `components/colors/ColorFamily.tsx`
- `components/colors/ColorPicker.tsx`
- `components/colors/ColorWheel.tsx`
- `components/colors/SaturationLightnessGrid.tsx`
- `components/images/EditorPanel.tsx`
- `components/images/ImageBrowser.tsx`
- `components/layout/Modal.tsx`
- `components/layout/NotificationCard.tsx`
- `components/layout/PortfolioSection.tsx`
- `pages/ArticleManagerPage.tsx`
- `pages/projects/ProjectsPage.tsx`

Note: `components/colors/*` intentionally uses `style={{}}` in places for
dynamic, per-pixel color-swatch rendering (values computed at runtime that
don't map to theme tokens). Review those case-by-case rather than assuming all
12 are pure cleanups.
