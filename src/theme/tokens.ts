import type { ThemeParams, PresetId, ColorModePreference } from '../types/theme';
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

/** Corner-radius scale, in px. Sourced from the active preset. */
export interface RadiusScale {
  sm: number;
  md: number;
  lg: number;
  pill: number;
}

/**
 * Motion tokens — durations (ms) and easing curves. This is where a preset's
 * *personality* lives: Prism is spring physics (overshoot-and-settle), the
 * default preset is standard material easing. Components read these instead of
 * hardcoding transition curves.
 */
export interface Motion {
  duration: { fast: number; base: number; slow: number };
  easing: {
    /** overshoots ~12% then snaps back — icons, presses */
    springSnap: string;
    /** gentle overshoot — cards, lifts */
    springSettle: string;
    /** decelerate-out */
    easeOut: string;
    /** symmetric standard */
    standard: string;
  };
}

/** Typography families + which family headings/labels speak in. Prism uses a
 *  monospace "data voice"; the default preset is all-sans. */
export interface TypographyFamilies {
  sans: string;
  mono: string;
  headingFamily: 'sans' | 'mono';
}

export interface Tokens {
  mode: ThemeMode;
  /** Which design-language preset produced this token set. */
  preset: PresetId;
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
  /** Corner radius, in px. Preset-driven. */
  radius: RadiusScale;
  /** Motion tokens. Preset-driven. */
  motion: Motion;
  /** Elevation as CSS box-shadow strings, low-to-high. */
  elevation: { none: string; sm: string; md: string; lg: string };
  typography: {
    /** Base (body) family — the preset's sans stack. */
    fontFamily: string;
    /** Monospace stack — the data voice. */
    mono: string;
    /** Which family headings/labels use in this preset. */
    headingFamily: 'sans' | 'mono';
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

const SANS = '"Roboto", "Helvetica", "Arial", sans-serif';
const MONO = 'ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';

/**
 * A design-language preset: a named bundle of the *non-color, structural* tokens
 * (radius, motion, typography voice) plus a default brand seed. The live seed
 * and color mode still come from the store, so a preset stays fully re-colorable
 * — Prism is a *look you can select*, not a fixed skin. Adding a preset touches
 * this file (its tokens) and the picker; components read the tokens.
 */
export interface ThemePreset {
  id: PresetId;
  label: string;
  /** The brand seed this preset ships with (a starting point; user-recolorable). */
  seed: ThemeParams;
  /** The color mode to apply when a user selects this preset. Prism reads best
   *  on a dark plane, so it defaults to dark; the user can still toggle after. */
  defaultMode: ColorModePreference;
  radius: RadiusScale;
  motion: Motion;
  typography: TypographyFamilies;
  /** Optional per-mode neutral/elevation override (Prism's committed dark plane). */
  darkNeutrals?: typeof PRISM_DARK_NEUTRALS;
  /** Optional categorical/series override (Prism's spectrum). */
  categorical?: readonly string[];
}

/** The app's original brand seed (blue). */
export const DEFAULT_SEED: ThemeParams = {
  hue: 217,
  saturation: 65,
  lightness: 40,
  angle: 103,
  theta: 45,
};

/** Prism's cyan interactive accent (~#45D6E8), expressed as a re-colorable seed. */
const PRISM_SEED: ThemeParams = { hue: 186, saturation: 72, lightness: 47, angle: 103, theta: 45 };

const STANDARD_MOTION: Motion = {
  duration: { fast: 150, base: 250, slow: 400 },
  easing: {
    springSnap: 'cubic-bezier(0.4, 0, 0.2, 1)',
    springSettle: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

const PRISM_MOTION: Motion = {
  duration: { fast: 120, base: 300, slow: 450 },
  easing: {
    springSnap: 'cubic-bezier(0.34, 1.72, 0.44, 1)',
    springSettle: 'cubic-bezier(0.22, 1.24, 0.36, 1)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/** Prism's dark instrument-panel planes (from the approved artifact). */
const PRISM_DARK_NEUTRALS = {
  surface: { base: '#0A0E15', raised: '#10151E', sunken: '#1D2634' },
  border: { subtle: 'rgba(148, 170, 200, 0.13)', strong: 'rgba(148, 170, 200, 0.24)' },
  text: { primary: '#E9EEF6', secondary: '#93A1B5', disabled: '#5C6A7E' },
  elevation: {
    none: 'none',
    sm: '0 8px 18px rgba(0,0,0,0.35)',
    md: '0 14px 34px rgba(0,0,0,0.45)',
    lg: '0 30px 70px rgba(0,0,0,0.6)',
  },
} as const;

/** Prism's spectrum — distinct series hues validated on #10151E. */
const PRISM_SPECTRUM = ['#26A0BC', '#9085E9', '#C98500', '#2E9E5B', '#D55181'] as const;

export const PRESETS: Record<PresetId, ThemePreset> = {
  default: {
    id: 'default',
    label: 'Classic',
    seed: DEFAULT_SEED,
    defaultMode: 'system',
    radius: { sm: 4, md: 8, lg: 16, pill: 9999 },
    motion: STANDARD_MOTION,
    typography: { sans: SANS, mono: MONO, headingFamily: 'sans' },
  },
  prism: {
    id: 'prism',
    label: 'Prism',
    seed: PRISM_SEED,
    defaultMode: 'dark',
    radius: { sm: 6, md: 10, lg: 14, pill: 9999 },
    motion: PRISM_MOTION,
    typography: { sans: SANS, mono: MONO, headingFamily: 'mono' },
    darkNeutrals: PRISM_DARK_NEUTRALS,
    categorical: PRISM_SPECTRUM,
  },
};

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
export function makeTokens(
  params: ThemeParams,
  mode: ThemeMode = 'light',
  presetId: PresetId = 'default'
): Tokens {
  const preset = PRESETS[presetId];
  const neutrals = mode === 'dark' ? DARK_NEUTRALS : LIGHT_NEUTRALS;
  const effectiveNeutrals =
    mode === 'dark' && preset.darkNeutrals ? preset.darkNeutrals : neutrals;
  const status = mode === 'dark' ? DARK_STATUS : LIGHT_STATUS;

  const seedBrand = makeBrand(params);
  const brand =
    mode === 'dark'
      ? {
          primary: adaptiveColor(seedBrand.primary, effectiveNeutrals.surface.base, WCAG_AA),
          secondary: adaptiveColor(seedBrand.secondary, effectiveNeutrals.surface.base, WCAG_AA),
          tertiary: adaptiveColor(seedBrand.tertiary, effectiveNeutrals.surface.base, WCAG_AA),
        }
      : seedBrand;

  return {
    mode,
    preset: presetId,
    color: {
      brand,
      status: { ...status },
      surface: { ...effectiveNeutrals.surface },
      border: { ...effectiveNeutrals.border },
      text: { ...effectiveNeutrals.text },
      categorical: preset.categorical ?? CATEGORICAL_PALETTE,
    },
    space: { ...SPACE },
    radius: { ...preset.radius },
    motion: preset.motion,
    elevation: { ...effectiveNeutrals.elevation },
    typography: {
      fontFamily: preset.typography.sans,
      mono: preset.typography.mono,
      headingFamily: preset.typography.headingFamily,
      scale: TYPE_SCALE,
    },
  };
}
