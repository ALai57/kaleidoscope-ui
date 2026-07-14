import { toRgb } from './contrast';

/** Apply an alpha channel to any design-token color and return a
 *  browser-universal `rgba()`. Use this instead of hex-concatenating an alpha
 *  (`${color}24`): the brand tokens are `hsl(...)` strings in light mode, so the
 *  concat produced invalid CSS and the translucent layer silently vanished. */
export function alpha(color: string, a: number): string {
  const [r, g, b] = toRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
