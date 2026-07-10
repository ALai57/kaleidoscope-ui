import type { ThemeParams } from '../types/theme';
import { adaptiveColor, WCAG_AA } from './contrast';

/**
 * Design tokens — the framework-agnostic source of truth for the design
 * system. The MUI theme is *derived* from these (see ./index.ts), rather than
 * the other way around, so the app can migrate off MUI by swapping the adapter
 * instead of rewriting every component.
 *
 * Brand colors are derived from `ThemeParams`; the rest are neutral/semantic
 * scales that don't depend on the seed color. Phase 2 will make the status and
 * neutral scales contrast-checked via leonardo-contrast-colors instead of the
 * fixed defaults below.
 */

export type ThemeMode = 'light' | 'dark';

export interface Tokens {
  mode: ThemeMode;
  color: {
    /** Seed-derived brand colors. `tertiary` finally has a home (it was
     *  computed but dropped before the token layer existed). */
    brand: { primary: string; secondary: string; tertiary: string };
    /** Semantic status colors. Fixed for now; leonardo-generated in Phase 2. */
    status: { success: string; warning: string; error: string; info: string };
    /** Neutral surfaces, back-to-front. */
    surface: { base: string; raised: string; sunken: string };
    border: { subtle: string; strong: string };
    text: { primary: string; secondary: string; disabled: string };
    /** Categorical/identity palette — an ordered set of distinct, mode-
     *  independent hues for distinguishing entities with no inherent semantic
     *  color (agent avatars, personas, content tags). */
    categorical: readonly string[];
  };
  /** Spacing scale, in px, on MUI's 8px base unit. */
  space: { xs: number; sm: number; md: number; lg: number; xl: number; xxl: number };
  /** Corner radius, in px. */
  radius: { sm: number; md: number; lg: number; pill: number };
  /** Elevation as CSS box-shadow strings, low-to-high. */
  elevation: { none: string; sm: string; md: string; lg: string };
  typography: {
    fontFamily: string;
    /** Type scale — each step is a CSS-ready set of properties. */
    scale: Record<TypographyStep, TypeStyle>;
  };
}

export type TypographyStep =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body1'
  | 'body2'
  | 'caption';

export interface TypeStyle {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
}

/** Returns an HSL color string. Ports `hsl` from color-wheel.cljs. */
export function hsl(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Computes primary, secondary, and tertiary brand colors from theme params.
 * Ports `make-theme` from theme.cljs.
 */
export function makeBrand(params: ThemeParams): Tokens['color']['brand'] {
  const { hue, saturation, lightness, angle } = params;
  return {
    primary: hsl(hue, saturation, lightness),
    secondary: hsl(hue + 180 + angle, saturation, lightness),
    tertiary: hsl(hue + 180 - angle, saturation, lightness),
  };
}

const SPACE = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
const RADIUS = { sm: 4, md: 8, lg: 16, pill: 9999 } as const;

/**
 * Categorical/identity palette — the single source of the distinct hues used to
 * distinguish entities (agent avatars, personas, content tags). Ordered so
 * consumers can round-robin through it; named indices below keep semantic
 * assignments readable. Exported as a plain constant so non-React code (e.g.
 * agent persona lookups) can consume it too.
 */
export const CATEGORICAL_PALETTE = [
  '#0891b2', // 0 teal
  '#7c3aed', // 1 purple
  '#0369a1', // 2 blue
  '#059669', // 3 green
  '#dc2626', // 4 red
  '#d97706', // 5 amber
  '#9333ea', // 6 violet
  '#db2777', // 7 pink
  '#0ea5e9', // 8 sky
  '#6b7280', // 9 grey
] as const;

/** Semantic picks from CATEGORICAL_PALETTE, for readable assignments. */
export const CATEGORICAL = {
  teal: CATEGORICAL_PALETTE[0],
  purple: CATEGORICAL_PALETTE[1],
  blue: CATEGORICAL_PALETTE[2],
  green: CATEGORICAL_PALETTE[3],
  red: CATEGORICAL_PALETTE[4],
  amber: CATEGORICAL_PALETTE[5],
  violet: CATEGORICAL_PALETTE[6],
  pink: CATEGORICAL_PALETTE[7],
  sky: CATEGORICAL_PALETTE[8],
  grey: CATEGORICAL_PALETTE[9],
} as const;

const TYPE_SCALE: Record<TypographyStep, TypeStyle> = {
  h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.25 },
  h3: { fontSize: '1.6rem', fontWeight: 600, lineHeight: 1.3 },
  h4: { fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.35 },
  body1: { fontSize: '1.3rem', fontWeight: 400, lineHeight: 1.5 },
  body2: { fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: '0.9rem', fontWeight: 400, lineHeight: 1.4 },
};

const LIGHT_NEUTRALS = {
  surface: { base: '#ffffff', raised: '#ffffff', sunken: '#f5f5f5' },
  border: { subtle: 'rgba(0, 0, 0, 0.12)', strong: 'rgba(0, 0, 0, 0.26)' },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.12)',
    md: '0 2px 6px rgba(0, 0, 0, 0.16)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
};

const DARK_NEUTRALS = {
  surface: { base: '#121212', raised: '#1e1e1e', sunken: '#0a0a0a' },
  border: { subtle: 'rgba(255, 255, 255, 0.12)', strong: 'rgba(255, 255, 255, 0.3)' },
  text: {
    primary: 'rgba(255, 255, 255, 0.92)',
    secondary: 'rgba(255, 255, 255, 0.66)',
    disabled: 'rgba(255, 255, 255, 0.4)',
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
    md: '0 2px 6px rgba(0, 0, 0, 0.6)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.7)',
  },
};

// Semantic status colors. Mode-tuned lightness for adequate contrast; Phase 2
// replaces these with leonardo-contrast-colors ratio-targeted pairs.
const LIGHT_STATUS = { success: '#2e7d32', warning: '#ed6c02', error: '#d32f2f', info: '#0288d1' };
const DARK_STATUS = { success: '#66bb6a', warning: '#ffa726', error: '#f44336', info: '#29b6f6' };

/**
 * Derives the full token set from theme params for a given color mode.
 *
 * Light mode uses the raw seed-derived brand colors. Dark mode recomputes each
 * brand color to be contrast-safe against the dark surface via
 * leonardo-contrast-colors — replacing the old naive `100 - lightness` flip, so
 * dark mode is contrast-checked rather than merely inverted.
 */
export function makeTokens(params: ThemeParams, mode: ThemeMode = 'light'): Tokens {
  const neutrals = mode === 'dark' ? DARK_NEUTRALS : LIGHT_NEUTRALS;
  const status = mode === 'dark' ? DARK_STATUS : LIGHT_STATUS;

  const seedBrand = makeBrand(params);
  const brand =
    mode === 'dark'
      ? {
          primary: adaptiveColor(seedBrand.primary, neutrals.surface.base, WCAG_AA),
          secondary: adaptiveColor(seedBrand.secondary, neutrals.surface.base, WCAG_AA),
          tertiary: adaptiveColor(seedBrand.tertiary, neutrals.surface.base, WCAG_AA),
        }
      : seedBrand;

  return {
    mode,
    color: {
      brand,
      status: { ...status },
      surface: { ...neutrals.surface },
      border: { ...neutrals.border },
      text: { ...neutrals.text },
      categorical: CATEGORICAL_PALETTE,
    },
    space: { ...SPACE },
    radius: { ...RADIUS },
    elevation: { ...neutrals.elevation },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      scale: TYPE_SCALE,
    },
  };
}
