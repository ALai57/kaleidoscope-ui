import { describe, it, expect } from 'vitest';
import { moveItem, previewIngredients } from './recipe';
import type { RecipeContent } from '../types/recipe';

describe('moveItem', () => {
  it('moves an element down one slot', () => {
    expect(moveItem(['a', 'b', 'c'], 0, 1)).toEqual(['b', 'a', 'c']);
  });
  it('moves an element up one slot', () => {
    expect(moveItem(['a', 'b', 'c'], 2, -1)).toEqual(['a', 'c', 'b']);
  });
  it('returns the same array reference past the top edge', () => {
    const arr = ['a', 'b'];
    expect(moveItem(arr, 0, -1)).toBe(arr);
  });
  it('returns the same array reference past the bottom edge', () => {
    const arr = ['a', 'b'];
    expect(moveItem(arr, 1, 1)).toBe(arr);
  });
});

describe('previewIngredients', () => {
  const content: RecipeContent = {
    title: 'Layer Cake',
    sections: [
      { name: 'Cake', ingredients: ['flour', 'sugar'], steps: [] },
      { name: 'Frosting', ingredients: ['butter', 'powdered sugar'], steps: [] },
    ],
  };
  it('flattens the first three ingredient lines across sections', () => {
    expect(previewIngredients(content)).toBe('flour, sugar, butter');
  });
  it('handles a single unnamed section', () => {
    expect(
      previewIngredients({ title: 'X', sections: [{ name: null, ingredients: ['a'], steps: [] }] })
    ).toBe('a');
  });
});
