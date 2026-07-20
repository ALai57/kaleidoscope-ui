# Recipe Wake-Lock Overlay + Stirrer Animation — Design

**Date:** 2026-07-20
**Status:** Approved design, ready for implementation plan
**Supersedes placement of:** `2026-07-16-recipe-wake-lock-design.md` (the wake-lock feature itself
already ships; this changes where the control lives and what its active state looks like).

---

## Problem

The recipe page's "Keep screen on" control (`WakeLockButton`) currently sits **inline** in the page
header `Stack`, next to the title and Edit button (`RecipePage.tsx:86`). We want it to be a
**floating overlay** on both mobile and desktop — the same pattern as the global dark-mode icon —
and, when active, to show the animated cooking figure ("The Stirrer") we designed. The active state
must be **clearly distinguishable** from the dark-mode icon so the two floating controls aren't
confused.

## Decisions (from design conversation)

- **Placement:** bottom-right, **stacked above** the dark-mode icon as a two-control corner cluster.
- **Form:** **icon-only chip when off**, **expands into a labeled cyan pill when active**.
- **Animation:** "The Stirrer" — a toqued line-cook with a **two-joint arm** (shoulder + elbow) whose
  wrist sweeps a spoon **laterally inside the pot**, **steam above**, **heat flickering below**.
  Monochrome `currentColor`, so it is cyan on the dark idle chip and dark-on-cyan in the active pill.
- **Scope:** the floating control mounts **only on RecipePage** (unlike the global dark-mode toggle).
  This feature is the floating control **only** — no separate hero-image badge.

---

## Reference: existing pattern to mirror

`src/components/layout/DarkModeToggle.tsx` — `position: fixed; bottom: 16; right: 16; zIndex: 1500`,
a 32px translucent (`alpha(black, 0.18)`) blurred (`backdrop-filter: blur(4px)`) `IconButton` at
`opacity: 0.65`, going full on hover. Mounted globally in `ThemedApp` (`main.tsx:77`). We reuse this
treatment (translucent, blurred, subtle idle → full on hover) but diverge on shape, color, content,
and position so the wake-lock control reads as a distinct thing.

---

## Component architecture

Three units, each independently testable:

### 1. `useWakeLock` hook — unchanged
`src/hooks/useWakeLock.ts` stays exactly as-is: `{ isSupported, isActive, toggle }`, visibility
re-acquire, unsupported → inert. No changes.

### 2. `StirrerIcon` — the animated asset (new)
`src/components/recipes/StirrerIcon.tsx`. A token-driven SVG, `viewBox="0 0 24 24"`, all strokes
`currentColor` so it inherits the button's text color in both idle (cyan) and active (dark-on-cyan)
contexts — the same technique `LiveDot` uses. Props: `{ active?: boolean; size?: number }`. When
`active`, the stir/steam/heat animations run; when not, it renders a static composed frame (also the
`prefers-reduced-motion` fallback). Off-state icon is a separate simple coffee glyph (below), so
`StirrerIcon` is only shown in the active pill.

**Exact markup (from the final artifact — the two-joint / toque / lateral-stir / heat build):**

```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <g stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- pot -->
    <path d="M7 15 H18"/>
    <path d="M8.5 15 V18 a2 2 0 0 0 2 2 H15 a2 2 0 0 0 2 -2 V15"/>
    <!-- head + pleated toque (scalloped dome over a distinct band) -->
    <circle cx="6.7" cy="6.6" r="2"/>
    <path d="M4.5 3.6 C 3.5 2.9, 3.9 1.3, 5.1 1.5 C 5.2 0.5, 8.0 0.5, 8.1 1.5 C 9.3 1.3, 9.7 2.9, 8.7 3.6 Z" fill="currentColor" fill-opacity="0.16"/>
    <path d="M4.7 3.6 h4 v1.1 a0.5 0.5 0 0 1 -0.5 0.5 h-3 a0.5 0.5 0 0 1 -0.5 -0.5 Z" fill="currentColor" fill-opacity="0.16"/>
    <!-- neck + body -->
    <path d="M6.7 8.6 V12.2"/>
    <!-- two-joint arm: shoulder -> elbow -> wrist; spoon sweeps laterally in the pot -->
    <g class="upper">          <!-- transform-origin: 6.9px 9.2px; animation: stirUpper -->
      <path d="M6.9 9.2 L9.3 10.3"/>
      <g class="fore">         <!-- transform-origin: 9.3px 10.3px; animation: stirFore -->
        <path d="M9.3 10.3 L12 11"/>
        <g class="spoon">      <!-- transform-origin: 12px 11px; animation: stirLateral -->
          <path d="M12 11 L12 16"/>
        </g>
      </g>
    </g>
  </g>
  <!-- steam -->
  <g stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round">
    <path class="steam" d="M9.5 14 q -1.2 -1.8 0 -3.4 q 1.2 -1.6 0 -3.2"/>   <!-- origin 9.5 14, delay 0 -->
    <path class="steam" d="M15 14 q 1.2 -1.8 0 -3.4 q -1.2 -1.6 0 -3.2"/>    <!-- origin 15 14, delay .9s -->
  </g>
  <!-- heat below the pot -->
  <g stroke="currentColor" fill="none" stroke-width="1.6" stroke-linecap="round">
    <path class="heat" d="M10 21.8 v1.9"/>     <!-- delay 0 -->
    <path class="heat" d="M12.5 22.2 v1.9"/>   <!-- delay .3s -->
    <path class="heat" d="M15 21.8 v1.9"/>     <!-- delay .6s -->
  </g>
</svg>
```

All animated groups use `transform-box: view-box` with the `transform-origin` noted in the comments.
Keyframes (drive durations/easings from `theme.tokens.motion` with literal fallbacks, per `LiveDot`):

```css
@keyframes stirLateral { 0%,100%{transform:rotate(-23deg)} 50%{transform:rotate(23deg)} }  /* ~1.5s */
@keyframes stirUpper   { 0%,100%{transform:rotate(-4deg)}  50%{transform:rotate(5deg)}  }  /* same period */
@keyframes stirFore    { 0%,100%{transform:rotate(6deg)}   50%{transform:rotate(-7deg)} }  /* same period */
@keyframes steam-rise  { 0%{opacity:0;transform:translateY(2px) scaleY(.7)} 18%{opacity:.65} 100%{opacity:0;transform:translateY(-17px) scaleY(1.1)} }
@keyframes heat        { 0%{opacity:0;transform:translateY(1px)} 35%{opacity:.85} 100%{opacity:0;transform:translateY(-3px)} }
@media (prefers-reduced-motion: reduce) { .upper,.fore,.spoon,.steam,.heat { animation: none } }
```

> The larger "full scene" build (100-grid, toque + second steam wisp) from the conversation is **not
> needed** for this feature — the floating control only ever shows the 24-grid icon. Defer it.

### 3. `WakeLockOverlay` — the floating control (replaces `WakeLockButton`)
`src/components/recipes/WakeLockOverlay.tsx`. Consumes `useWakeLock`; returns `null` when
`!isSupported`. Renders a `position: fixed` control. Rename/replace `WakeLockButton.tsx`; update the
import and remove the element from the header `Stack` in `RecipePage.tsx`, then render
`<WakeLockOverlay />` once (fixed positioning makes tree location irrelevant; place it near the top
of the `recipe && ( … )` block so it shows whenever a recipe is displayed).

**States:**

| | Off (idle) | On (active) |
|---|---|---|
| Shape | icon-only chip, ~34px, `radius.pill` | pill, auto width, anchored right so it grows leftward |
| Fill | translucent `surface` + `blur`, subtle `border` | Prism cyan (`tokens.color.brand.primary`), dark text |
| Content | coffee glyph, `currentColor` = accent | `StirrerIcon active` + label "Screen stays on" |
| Emphasis | `opacity: .8`, faint **cyan ring** (this is what separates it from the neutral dark-mode circle) | full opacity + soft cyan glow (`0 4px 18px alpha(accent,.35)`) |
| Motion | none | animation runs |

**Expand interaction:** off → on morphs width/padding and reveals the label using
`tokens.motion.easing.springSettle`; reduced-motion → instant swap, no morph. Label is
`visibility`/width-driven so it doesn't reflow layout underneath (fixed element).

**Distinguishability (explicit):** differs from the dark-mode icon on four axes — pill vs circle,
cyan-accent vs neutral, cooking icon+label vs bare glyph, and stacked-above position.

---

## Positioning & responsive

- **Anchor:** `position: fixed; right: calc(16px + env(safe-area-inset-right)); bottom: calc(56px + env(safe-area-inset-bottom))`.
  `56 = darkmode bottom(16) + darkmode height(32) + 8px gap`, so it sits just above the toggle.
- **Grows leftward:** right-anchored, so the active pill expands toward page center and never
  overflows the right edge on a 320px screen.
- **Identical on mobile and desktop** — one implementation, no breakpoint branching. Verify at 320px
  that the idle chip + expanded pill clear the `RecipeViewToggle` and don't overlap the dark-mode
  icon.
- **z-index:** `1500` to share the dark-mode layer. Known quirk (inherited from the toggle): both
  floating controls sit above dialogs (`zIndex.modal = 1300`). Flag it; do not silently change the
  toggle. Optional follow-up: lower both beneath modals.

## Accessibility

- `aria-pressed={isActive}`, `aria-label` ("Keep screen on" / "Screen stays on"), desktop `Tooltip`.
- Visible keyboard focus ring (`2px solid accent`, offset 2 — matches Prism `Button`).
- Animation already respects `prefers-reduced-motion`; the expand morph does too.
- Icons are `aria-hidden`; the accessible name comes from `aria-label`.

## Theming

Drive color/radius/motion from `theme.tokens` with fallbacks (`LiveDot` pattern). Accent =
`tokens.color.brand.primary` (cyan under Prism, the brand hue under any other preset — the four-axis
distinguishability holds regardless). Monochrome `currentColor` art means no per-theme asset work.

## Testing

- **Unit** (`WakeLockOverlay.test.tsx`, adapted from the existing `WakeLockButton.test.tsx`):
  renders `null` when unsupported; off state shows the "keep screen on" affordance and toggles on
  click; active state exposes `aria-pressed="true"` and the "Screen stays on" name.
- **`StirrerIcon.test.tsx`:** renders active vs static; `prefers-reduced-motion` frame has no running
  animation.
- **Storybook:** a `WakeLockOverlay` story with off/on and a `StirrerIcon` story (both states) for the
  component workbench, consistent with other Prism components.
- **e2e:** none — the Wake Lock API isn't available in the jsdom/Playwright harness (matches the
  existing wake-lock test posture).

## Out of scope / deferred

- The 100-grid "full scene" Stirrer build.
- A hero-image "cooking mode" badge (a different placement we explicitly did not choose).
- Lowering the floating-control z-index beneath modals (flagged, not done here).

## Files

- **New:** `StirrerIcon.tsx` (+ test, + story), `WakeLockOverlay.tsx` (+ test, + story).
- **Changed:** `RecipePage.tsx` (drop inline button from header `Stack`, mount `<WakeLockOverlay />`).
- **Removed:** `WakeLockButton.tsx` / `WakeLockButton.test.tsx` (replaced by the overlay).
- **Unchanged:** `useWakeLock.ts`.
```
