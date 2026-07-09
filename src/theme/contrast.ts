import { Color, BackgroundColor, Theme, contrast } from '@adobe/leonardo-contrast-colors';

/**
 * Contrast engine — wraps @adobe/leonardo-contrast-colors as a normal
 * top-level dependency (previously it was a try/catch'd dynamic import treated
 * as experimental). This is the core of the adaptive theming goal: given a seed
 * color, a background, and a target WCAG ratio, produce a contrast-safe color;
 * and measure the actual ratio so a bad seed can't silently ship a low-contrast
 * theme (see contrast.test.ts).
 *
 * Colors may arrive as `#rrggbb` hex or `hsl(h, s%, l%)` strings (the token
 * layer's brand colors are HSL), so everything normalizes to RGB/hex first —
 * leonardo's `colorKeys` require hex.
 */

export const WCAG_AA = 4.5; // normal text
export const WCAG_AA_LARGE = 3; // large text / UI components

type Rgb = [number, number, number];

/** Parses a `#rrggbb` (or `#rgb`) hex string into an [r, g, b] triplet. */
export function hexToRgb(hex: string): Rgb {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Converts `hsl(h, s%, l%)` to an [r, g, b] triplet. */
function hslStringToRgb(hslStr: string): Rgb {
  const m = hslStr.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)/i);
  if (!m) return [0, 0, 0];
  const h = Number(m[1]) / 360;
  const s = Number(m[2]) / 100;
  const l = Number(m[3]) / 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return [
    Math.round(hue2rgb(h + 1 / 3) * 255),
    Math.round(hue2rgb(h) * 255),
    Math.round(hue2rgb(h - 1 / 3) * 255),
  ];
}

/** Normalizes a hex or `hsl(...)` color string to an [r, g, b] triplet. */
export function toRgb(color: string): Rgb {
  return color.trim().toLowerCase().startsWith('hsl') ? hslStringToRgb(color) : hexToRgb(color);
}

/** Normalizes a hex or `hsl(...)` color string to `#rrggbb`. */
export function toHex(color: string): string {
  const [r, g, b] = toRgb(color);
  return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
}

/** WCAG contrast ratio (1–21) between two colors (hex or hsl). */
export function contrastRatio(foreground: string, background: string): number {
  return Math.abs(contrast(toRgb(foreground), toRgb(background), 1));
}

export function meetsAA(foreground: string, background: string): boolean {
  return contrastRatio(foreground, background) >= WCAG_AA;
}

export function meetsAALarge(foreground: string, background: string): boolean {
  return contrastRatio(foreground, background) >= WCAG_AA_LARGE;
}

/** sRGB relative luminance (0–1) of a color (hex or hsl). */
function relativeLuminance(color: string): number {
  const [r, g, b] = toRgb(color).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as Rgb;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Approximate CIE L* (0–100) of a color — the scale leonardo's `lightness`
 *  option uses to position a background. Rounded to an integer and clamped to
 *  [8, 100]: leonardo throws when asked for a background below ~6, and a near-
 *  black surface clamped slightly lighter only makes the result over-contrast
 *  (safe). */
function cieLightness(color: string): number {
  const y = relativeLuminance(color);
  const l = y <= 0.008856 ? 903.3 * y : 116 * Math.cbrt(y) - 16;
  return Math.max(8, Math.min(100, Math.round(l)));
}

/**
 * Returns a variant of `seed` that meets `ratio` WCAG contrast against
 * `background`. This is what replaces the naive `100 - lightness` dark-mode
 * flip: dark-mode brand colors are recomputed against the dark surface instead
 * of merely inverted. Inputs may be hex or hsl; leonardo needs hex keys.
 * Falls back to the seed (as hex) if leonardo returns nothing.
 */
export function adaptiveColor(seed: string, background: string, ratio: number): string {
  const seedHex = toHex(seed);
  const bgHex = toHex(background);
  const color = new Color({ name: 'c', colorKeys: [seedHex], ratios: [ratio] });
  const bg = new BackgroundColor({ name: 'bg', colorKeys: [bgHex], ratios: [2] });
  const theme = new Theme({ colors: [color], backgroundColor: bg, lightness: cieLightness(bgHex) });
  return theme.contrastColors[1]?.values?.[0]?.value ?? seedHex;
}

/**
 * Picks the on-color (text/icon color) for a surface — the higher-contrast of
 * near-black and white. Replaces MUI's luminance-threshold `contrastText`,
 * which disagrees with ratio-targeted pairs.
 */
export function onColor(surface: string): string {
  const light = '#ffffff';
  const dark = '#111111';
  return contrastRatio(light, surface) >= contrastRatio(dark, surface) ? light : dark;
}
