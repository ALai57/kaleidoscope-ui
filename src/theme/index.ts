import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { ThemeParams } from '../types/theme';

export const BASE_THEME: ThemeParams = {
  hue: 217,
  saturation: 65,
  lightness: 40,
  angle: 103,
  theta: 45,
};

/**
 * Returns an HSL color string.
 * Ports `hsl` from color-wheel.cljs.
 */
export function hsl(h: number, s: number, l: number): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Computes primary, secondary, and tertiary colors from theme params.
 * Ports `make-theme` from theme.cljs.
 */
export function makePalette(params: ThemeParams): {
  primary: string;
  secondary: string;
  tertiary: string;
} {
  const { hue, saturation, lightness, angle } = params;
  return {
    primary: hsl(hue, saturation, lightness),
    secondary: hsl(hue + 180 + angle, saturation, lightness),
    tertiary: hsl(hue + 180 - angle, saturation, lightness),
  };
}

/**
 * Creates an MUI v6 theme with light and dark color schemes.
 */
export function makeTheme(params: ThemeParams): Theme {
  const { lightness } = params;
  const lightPalette = makePalette(params);
  const darkPalette = makePalette({ ...params, lightness: 100 - lightness });

  return createTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: { main: lightPalette.primary },
          secondary: { main: lightPalette.secondary },
        },
      },
      dark: {
        palette: {
          primary: { main: darkPalette.primary },
          secondary: { main: darkPalette.secondary },
        },
      },
    },
    typography: {
      body1: { fontSize: '1.3rem' },
    },
  });
}
