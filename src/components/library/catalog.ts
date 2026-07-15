import type { Origin } from '../../types/interest';

const CODES: Record<string, string> = {
  podcast: 'POD', article: 'ART', show: 'SHW', video: 'VID',
  book: 'BK', paper: 'PPR', newsletter: 'NWS', course: 'CRS',
};

export function catalogCode(kind: string): string {
  return CODES[kind] ?? kind.slice(0, 3).toUpperCase();
}

export function originLabel(origin: Origin): string {
  return origin === 'trusted' ? 'TRUSTED' : 'NEW SOURCE';
}

/** Index into theme.tokens.color.categorical: 1 = purple (trusted), 2 = amber (novel). */
export function originColorKey(origin: Origin): 1 | 2 {
  return origin === 'trusted' ? 1 : 2;
}
