# RefractionHero: data-driven soft light pulses

**Status:** Design approved (concept + scope). Ready for implementation planning.
**Date:** 2026-07-16
**Author:** Andrew Lai (with Claude)
**Builds on:** [Front page: the digital garden](./2026-07-16-front-page-garden-design.md) — the
`RefractionHero` this spec animates already exists (`src/components/home/RefractionHero.tsx`).

---

## 1. Purpose

Bring the front-page prism to life. Today the hero draws a static beam (source → prism) and three
static rays (prism → facets) with only a faint opacity pulse on the core beam. This work adds **soft,
travelling packets of light**:

1. A packet rides the beam from the **source disc ("me")** into the **prism**.
2. On arrival, the prism **emits one packet down each fan-out ray** to the three garden facets
   (Writing · Reading · Recipes).
3. The whole thing **loops** continuously, reading as *light passing through the prism and dispersing*.

The animation must be **data-driven**: one flat config object controls duration, size, intensity,
glow, stagger, and loop timing so the feel can be retuned without touching the SVG.

Chosen behaviours (from brainstorming):
- **Pulse style:** a soft "glow blob" — a blurred packet of light travelling along the beam.
- **Timing model:** *chained* — source→prism, then on arrival prism→facets (causal), looping.
- **Config depth:** global/flat (one config for all beams; no per-facet overrides).
- **Config location:** in the existing `gardenFacets.ts` (alongside the facet identity data).

---

## 2. Scope

**In scope:**
- A typed `PulseConfig` + `PULSE_CONFIG` default, and a pure `pulseTimeline()` helper, added to
  `src/components/home/gardenFacets.ts`.
- Rendering the travelling glow-blob packets in `RefractionHero`, riding the existing beam and
  fan-out ray coordinates.
- Reduced-motion / master-switch handling.
- Unit tests for the config + helper and for the render behaviour.

**Explicitly out of scope:**
- Any change to the facet identity data, routes, colours, hover/focus interaction, or the
  `SideRail`/`AppShell`/`/library` work from the parent spec.
- Per-facet animation overrides (deliberately deferred — YAGNI; the flat config covers the ask).
- New animation dependencies (no framer-motion etc.).
- Changing the static scene geometry (source disc, prism polygon, cards, existing rays).

---

## 3. The data model (`gardenFacets.ts`)

A single flat, global config controls everything. All durations are in **seconds**; all spatial
values are in **viewBox units** (the hero's `viewBox` is `0 0 1000 480`).

```ts
export interface PulseConfig {
  /** Master switch. Even when true, pulses are suppressed under prefers-reduced-motion. */
  enabled: boolean;
  /** Seconds for a packet to travel source → prism. */
  incomingDur: number;
  /** Seconds for a packet to travel prism → a facet. */
  fanoutDur: number;
  /** Packet radius, viewBox units. */
  size: number;
  /** Peak opacity of a packet at the middle of its travel (0–1). */
  intensity: number;
  /** Softness/bloom — gaussian-blur stdDeviation in viewBox units. */
  glow: number;
  /** Seconds between consecutive facet emissions (packet i starts stagger·i after prism arrival). */
  stagger: number;
  /** Seconds of rest after the last packet finishes before the cycle restarts. */
  loopGap: number;
}

export const PULSE_CONFIG: PulseConfig = {
  enabled: true,
  incomingDur: 1.1,
  fanoutDur: 0.9,
  size: 9,
  intensity: 0.85,
  glow: 3,
  stagger: 0.14,
  loopGap: 0.9,
};
```

### 3.1 Shared cycle period → phase lock

Every packet animates on **one shared period** so the causal chain never drifts:

```
T = incomingDur + stagger·(n − 1) + fanoutDur + loopGap        // n = number of facets (3)
```

- Incoming packet is active during `[0, incomingDur]`.
- Facet packet `i` (0-based) is active during `[incomingDur + stagger·i,  incomingDur + stagger·i + fanoutDur]`.
- After the last facet finishes, `loopGap` seconds of rest, then the whole period repeats.

### 3.2 Pure helper `pulseTimeline()`

```ts
export interface PulseSpan {
  /** Key: 'incoming' or a facet key. */
  key: 'incoming' | GardenFacetKey;
  /** Start of this packet's active window as a fraction of the shared period T (0–1). */
  startPct: number;
  /** End of this packet's active window as a fraction of the shared period T (0–1). */
  endPct: number;
}

export interface PulseTimeline {
  /** Shared cycle period in seconds. */
  period: number;
  /** One span per packet: incoming first, then facets in order. */
  spans: PulseSpan[];
}

export function pulseTimeline(config: PulseConfig, facetCount: number): PulseTimeline;
```

This is the single source of truth for *when* each packet is visible, expressed as percentages of the
shared period — exactly what the CSS keyframes need. Keeping it pure makes the causal chain
deterministic and unit-testable without rendering.

---

## 4. Rendering technique (`RefractionHero`)

### 4.1 The packet

Each packet is a small SVG `<circle r={size}>` positioned at the path origin and moved along the beam:

- **Soft look:** filled with a **radial gradient** (bright, near-white core → packet colour →
  transparent edge) so it reads as a glow, not a hard dot.
- **Bloom:** an SVG `<filter><feGaussianBlur stdDeviation={glow}></filter>` applied to the packet.
- **Colour:** incoming packet uses `accent` (brand primary); each fan-out packet uses that facet's
  token colour (`facetColor(tokens, f.colorIndex, fallback)`) — same colours already used for the
  rays, so packets match their beams and recolour with the preset.
- **Decorative:** packets are `aria-hidden` (the scene already has `role="group"` + `aria-label`, and
  each facet remains a real focusable link).

### 4.2 Motion — CSS `offset-path` + generated keyframes

Packets ride the **exact existing coordinates** so they track the drawn beams:

- Incoming beam: `M146 238 L446 238` (matches the source-glow line).
- Fan-out ray to facet `i`: `M500 250 L712 {cy}` where `cy = rowY[i] + 40` (matches each ray).

Each packet element gets `offset-path: path('…')` and an animated `offset-distance: 0% → 100%`.
Emotion `keyframes` are generated per packet from `pulseTimeline()`: the packet is invisible outside
its `[startPct, endPct]` window, and inside it travels `0% → 100%` while opacity ramps
`0 → intensity → 0` (soft in/out). All packets share one `animation-duration = period` with
`animation-iteration-count: infinite`, which is what enforces the phase lock (§3.1).

Config values flow to CSS via the generated keyframes and inline style, so retuning `PULSE_CONFIG`
changes the animation with no other edits.

**Chosen technique (implementation update):** SMIL was selected over CSS `offset-path`. Each packet is
a `<circle>` with an `<animateMotion path=… keyPoints/keyTimes>` (motion) plus an
`<animate attributeName="opacity">` (fade), both `dur={period}` `repeatCount="indefinite"`, with
`keyTimes`/`values` computed from `pulseTimeline()`. This is pure SVG — no Emotion/MUI coupling
(aligns with a possible MUI exit), no `offset-path`-on-SVG browser uncertainty, and directly
observable/testable. CSS `offset-path` remains a valid alternative; the config knobs are identical
either way. Verified in Chromium: all four packets travel their beams and reach peak `intensity`,
and reduced motion renders none.

### 4.3 Reduced motion & master switch

Packets render **only** when `PULSE_CONFIG.enabled === true` **and**
`useMediaQuery('(prefers-reduced-motion: reduce)')` is false. Otherwise no packet elements are
rendered and the existing static scene is unchanged. (The existing faint beam-opacity pulse keeps its
current reduced-motion guard; the new packets are additive.)

### 4.4 Isolation

- `gardenFacets.ts` gains config + a pure helper; its existing exports are untouched.
- `RefractionHero.tsx` gains a packet layer built from that config; the static scene, facet links,
  hover/focus dimming, and accessibility are unchanged.

---

## 5. Testing

Per repo discipline (co-located `*.test.ts(x)`, Vitest + Testing Library + jsdom; run `npm run ci`
before pushing):

**`gardenFacets.test.ts` (extend):**
- `PULSE_CONFIG` has the expected keys and sane defaults (durations > 0, `0 < intensity ≤ 1`).
- `pulseTimeline(PULSE_CONFIG, 3)`:
  - returns `period` equal to `incomingDur + stagger·2 + fanoutDur + loopGap`;
  - `spans[0].key === 'incoming'`, `startPct === 0`, and its `endPct` corresponds to
    `incomingDur / period`;
  - facet spans start in order (`stagger` apart) and each is `fanoutDur` long;
  - all spans lie within `[0, 1]` and the last facet's `endPct ≤ 1 − loopGap/period` (loopGap rest
    preserved).

**`RefractionHero.test.tsx` (extend):**
- With motion allowed: renders `1 incoming + 3 fan-out = 4` packet elements (query by a stable
  `data-pulse` / class marker); packets are `aria-hidden`.
- With `useMediaQuery` mocked to reduced motion: **no** packet elements render; the three facet links
  and their `href`s still render (regression on the existing behaviour).
- With `PULSE_CONFIG.enabled` false (via a targeted override in the test): no packet elements render.

---

## 6. Open decisions for the plan

1. Exact stable selector for packets in tests (`data-pulse="incoming|<facetKey>"` recommended so
   tests can assert identity, not just count).
2. Whether to expose `enabled` toggling in tests by mocking the module or by a small render prop —
   default: mock the config import (keeps the component prop-free per the parent spec).
3. Confirm `offset-path` renders acceptably in the local browsers during implementation; fall back to
   SMIL per §4.2 only if needed.
