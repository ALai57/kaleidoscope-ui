import type { RecipeContent } from '../types/recipe';

// Move the item at index `i` one slot in `dir` (-1 up, +1 down). Returns a new
// array, or the SAME array reference unchanged when the move falls off an edge.
export function moveItem<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = arr.slice();
  [next[i], next[j]] = [next[j] as T, next[i] as T];
  return next;
}

// First `n` ingredient lines flattened across every section — for list cards.
export function previewIngredients(content: RecipeContent, n = 3): string {
  return content.sections
    .flatMap((s) => s.ingredients)
    .slice(0, n)
    .join(', ');
}
