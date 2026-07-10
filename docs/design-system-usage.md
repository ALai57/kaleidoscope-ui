# Design System — Usage Guide

The one doc to read before adding a card, a status indicator, or a color.
It answers "which existing thing do I use, and when do I roll my own?" — the
question that, left unanswered, produces the next `WorkflowCard`-style
re-duplication.

See also: [styling conventions](./styling-conventions.md) (sx vs styled vs raw
style) and [the design-system plan](./design-system-plan.md) (roadmap + why).

## The pieces that exist today

| Concern | Use | Location |
| --- | --- | --- |
| Status / state indicator | `StatusChip` | `src/components/common/StatusChip.tsx` |
| Card surface (border/paper/hover) | `SurfaceCard` | `src/components/common/SurfaceCard.tsx` |
| Colors, spacing, radius, type | design **tokens** | `src/theme/tokens.ts` (`theme.tokens.*`) |
| Contrast-safe color / a11y | contrast engine | `src/theme/contrast.ts` |
| Theme from a seed | `makeTheme(params)` | `src/theme/index.ts` |

Everything derives from a framework-agnostic token layer; the MUI theme is an
adapter over it, because the app may move off MUI. Keep new code reading from
tokens / the MUI palette, never hardcoded values.

## StatusChip — status, not decoration

Use `StatusChip` whenever a chip communicates **state**: a run status, a review
outcome, a score band, a priority, "needs input", etc.

```tsx
<StatusChip status="in_progress" />           // default label + tone
<StatusChip status={workflow.status} label={workflow.status} />  // domain status
<StatusChip status="success" label="Approved" icon={<CheckIcon />} />
```

- Tones (the fixed vocabulary): `success | warning | error | info | pending | neutral`.
- Domain statuses (e.g. `completed`, `awaiting_input`, `live`, `blocked`) are
  mapped to a tone in `STATUS_TONE`. Adding a new domain status? Add it there —
  do **not** create a local `status → color` map in your component (that's the
  duplication we removed).
- Color resolves through the token-derived MUI palette, so it stays
  contrast-safe automatically.

**Don't** use `StatusChip` for non-status chips — labels/badges (version, mode,
count), categories (`TaskTypeChip`), filters, or removable autocomplete tags.
Those stay a plain `<Chip>`.

## SurfaceCard — the shared card surface

Use `SurfaceCard` for any card-like container you'd otherwise hand-roll with
`border` / `borderRadius` / `bgcolor: 'background.paper'` / hover elevation.

```tsx
<SurfaceCard interactive sx={{ p: 2 }}>…</SurfaceCard>
<SurfaceCard sx={{ borderColor: 'error.main' }}>…</SurfaceCard>  // status border override
```

- It owns only the **surface**, not a layout — compose your header/body/actions
  as children. (The cards deliberately don't share an internal structure.)
- `interactive` adds hover elevation; a pointer cursor is added only when
  `onClick` is set.
- Dynamic/status borders: override via `sx` (it merges after the base).

**Use MUI `Card` instead** when you need `CardActionArea` (ripple + keyboard
a11y for a fully-clickable card) or `CardMedia` (images) — e.g. `ProjectCard`,
`ImageCard`. Don't reach for `SurfaceCard` just to lose those.

## Colors & tokens — never hardcode

- Semantic status color → `StatusChip`, or `theme.palette.{success,warning,…}`.
- Surface/border/text → MUI palette (`background.paper`, `divider`,
  `text.secondary`) — these are mode-reactive.
- Spacing/radius/type → `theme.spacing`, `theme.shape`, typography variants
  (all derived from tokens).
- Need a raw token value → `theme.tokens.*` (note: `theme.tokens` is currently
  light-mode only; prefer the palette for anything that must be correct in dark
  mode until that's addressed).
- **Never** write a hex/`rgb()`/`rgba()` literal in a component.

## The decision, in one line

> Communicating state? `StatusChip`. Card surface? `SurfaceCard` (or MUI `Card`
> for clickable/media). A color/space/radius? A token. A brand-new pattern used
> once? A one-off `Box`/`sx` — but if it appears a **second** time, promote it
> to `src/components/common/` with a story before it forks.
