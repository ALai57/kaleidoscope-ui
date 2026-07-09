/**
 * Local type declaration for @adobe/leonardo-contrast-colors.
 *
 * The published package ships types only for its legacy function API, and under
 * Vite/bundler module resolution its class-based runtime (wrapper.mjs) resolves
 * with no types at all. This declares the subset of the class API the app uses.
 */
declare module '@adobe/leonardo-contrast-colors' {
  export interface ColorOptions {
    name: string;
    colorKeys: string[];
    ratios: number[] | Record<string, number>;
    colorspace?: string;
    smooth?: boolean;
  }

  export class Color {
    constructor(options: ColorOptions);
  }

  export class BackgroundColor extends Color {}

  export interface ThemeOptions {
    colors: Color[];
    backgroundColor: BackgroundColor;
    lightness?: number;
    contrast?: number;
    saturation?: number;
    output?: string;
  }

  export interface LeoColorScale {
    name: string;
    values: Array<{ name: string; contrast: number; value: string }>;
  }

  export class Theme {
    constructor(options: ThemeOptions);
    readonly contrastColors: [{ background: string }, ...LeoColorScale[]];
    readonly contrastColorPairs: Record<string, string>;
  }

  export function contrast(color: number[], base: number[], baseV?: number): number;
  export function luminance(r: number, g: number, b: number): number;
}
