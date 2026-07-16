import type { Tokens } from '@/theme';

export type GardenFacetKey = 'writing' | 'reading' | 'recipes';

export interface GardenFacet {
  key: GardenFacetKey;
  label: string;
  route: string;
  /** One-line description shown under the label. */
  description: string;
  /** Index into `tokens.color.categorical` for this facet's spectrum hue. */
  colorIndex: number;
}

/**
 * The three curated sections of the garden. Shared by the hero (RefractionHero)
 * and the primary nav (SideRail) so both stay in sync. Colors are indices into
 * the active preset's categorical palette — no hardcoded hex, so the spectrum
 * recolors with the preset.
 */
export const GARDEN_FACETS: readonly GardenFacet[] = [
  { key: 'writing', label: 'Writing', route: '/archive', description: 'essays, talks & notes', colorIndex: 0 },
  { key: 'reading', label: 'Reading', route: '/library', description: "the shelf & what's next", colorIndex: 1 },
  { key: 'recipes', label: 'Recipes', route: '/recipes', description: "what's on the table", colorIndex: 3 },
];

/** Categorical color for a facet, with a fallback for bare-MUI themes/tests. */
export function facetColor(tokens: Tokens | undefined, colorIndex: number, fallback: string): string {
  return tokens?.color.categorical[colorIndex] ?? fallback;
}

/** True when the current path belongs to this facet's section. */
export function isFacetActive(facet: GardenFacet, pathname: string): boolean {
  return pathname === facet.route || pathname.startsWith(`${facet.route}/`);
}

/**
 * Tunable knobs for the hero's soft light pulses. One flat, global config drives
 * every packet, so the whole feel — speed, size, brightness, glow, rhythm — can be
 * retuned here without touching the SVG. Durations are seconds; spatial values are
 * viewBox units (the hero's viewBox is 1000×480).
 */
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

/** One packet's active window, expressed as fractions of the shared cycle period. */
export interface PulseSpan {
  key: 'incoming' | GardenFacetKey;
  /** Start of this packet's active window as a fraction of the period (0–1). */
  startPct: number;
  /** End of this packet's active window as a fraction of the period (0–1). */
  endPct: number;
}

export interface PulseTimeline {
  /** Shared cycle period in seconds — every packet animates on this one period. */
  period: number;
  /** One span per packet: incoming first, then the facets in order. */
  spans: PulseSpan[];
}

/**
 * Resolve the chained pulse rhythm into per-packet visibility windows. A single
 * incoming packet travels source→prism during [0, incomingDur]; on arrival the
 * prism emits one packet per facet, each offset by `stagger` and lasting
 * `fanoutDur`; then `loopGap` seconds of rest before the whole period repeats.
 * Sharing one period is what keeps the causal chain phase-locked forever.
 */
export function pulseTimeline(config: PulseConfig, facetCount: number): PulseTimeline {
  const { incomingDur, fanoutDur, stagger, loopGap } = config;
  const period = incomingDur + stagger * Math.max(0, facetCount - 1) + fanoutDur + loopGap;
  const spans: PulseSpan[] = [{ key: 'incoming', startPct: 0, endPct: incomingDur / period }];
  for (let i = 0; i < facetCount; i++) {
    const start = incomingDur + stagger * i;
    spans.push({
      key: GARDEN_FACETS[i]?.key ?? 'incoming',
      startPct: start / period,
      endPct: (start + fanoutDur) / period,
    });
  }
  return { period, spans };
}
