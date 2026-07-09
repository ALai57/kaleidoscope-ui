import { createTheme } from '@mui/material/styles';
import type {
  Theme,
  PaletteOptions,
  TypographyVariantsOptions,
} from '@mui/material/styles';
import type { ThemeParams } from '../types/theme';
import { makeTokens, makeBrand, hsl } from './tokens';
import type { Tokens } from './tokens';
import { onColor } from './contrast';

export { hsl, makeTokens, makeBrand } from './tokens';
export type { Tokens, ThemeMode } from './tokens';

// Expose the framework-agnostic token set on the MUI theme so components can
// read `theme.tokens.*` today, and so the token layer survives a future MUI
// migration (the MUI theme is derived from tokens, not vice versa).
declare module '@mui/material/styles' {
  interface Theme {
    tokens: Tokens;
  }
  interface ThemeOptions {
    tokens?: Tokens;
  }
}

export const BASE_THEME: ThemeParams = {
  hue: 217,
  saturation: 65,
  lightness: 40,
  angle: 103,
  theta: 45,
};

/**
 * Back-compat alias for the brand-color derivation. Prefer `makeBrand` /
 * `makeTokens` in new code.
 */
export function makePalette(params: ThemeParams): {
  primary: string;
  secondary: string;
  tertiary: string;
} {
  return makeBrand(params);
}

/** Adapter: maps design tokens onto an MUI palette for one color scheme.
 *  `contrastText` is set from the token's on-color (leonardo-derived) rather
 *  than MUI's luminance-threshold auto-contrast, which disagrees with
 *  ratio-targeted pairs. */
function paletteFromTokens(tokens: Tokens): PaletteOptions {
  const { brand, status, surface, text, border } = tokens.color;
  const slot = (main: string) => ({ main, contrastText: onColor(main) });
  return {
    mode: tokens.mode,
    primary: slot(brand.primary),
    secondary: slot(brand.secondary),
    success: slot(status.success),
    warning: slot(status.warning),
    error: slot(status.error),
    info: slot(status.info),
    background: { default: surface.base, paper: surface.raised },
    text: { primary: text.primary, secondary: text.secondary, disabled: text.disabled },
    divider: border.subtle,
  };
}

/** Adapter: maps the token type scale onto MUI's typography options. The token
 *  `TypeStyle` is a structural subset of MUI's CSSProperties-based variant type,
 *  so the cast at this boundary is where framework-agnostic meets MUI. */
function typographyFromTokens(tokens: Tokens): TypographyVariantsOptions {
  const { fontFamily, scale } = tokens.typography;
  return {
    fontFamily,
    h1: scale.h1,
    h2: scale.h2,
    h3: scale.h3,
    h4: scale.h4,
    body1: scale.body1,
    body2: scale.body2,
    caption: scale.caption,
  } as TypographyVariantsOptions;
}

/**
 * Creates an MUI v6 theme derived from design tokens, with light and dark
 * color schemes. `theme.tokens` currently carries the light-mode tokens;
 * Phase 2 makes it mode-reactive alongside the adaptive dark-mode recompute.
 */
export function makeTheme(params: ThemeParams): Theme {
  const lightTokens = makeTokens(params, 'light');
  const darkTokens = makeTokens(params, 'dark');

  return createTheme({
    colorSchemes: {
      light: { palette: paletteFromTokens(lightTokens) },
      dark: { palette: paletteFromTokens(darkTokens) },
    },
    shape: { borderRadius: lightTokens.radius.md },
    spacing: lightTokens.space.sm, // 8px base unit
    typography: typographyFromTokens(lightTokens),
    tokens: lightTokens,
  });
}
