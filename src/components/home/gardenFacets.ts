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
