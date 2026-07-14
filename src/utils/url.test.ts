import { describe, it, expect } from 'vitest';
import { titleToSlug, slugify } from './url';

describe('titleToSlug', () => {
  it('lowercases the string', () => {
    expect(titleToSlug('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(titleToSlug('my article title')).toBe('my-article-title');
  });

  it('removes punctuation', () => {
    expect(titleToSlug('Hello! World.')).toBe('hello-world');
  });

  it('handles empty string', () => {
    expect(titleToSlug('')).toBe('');
  });

  it('handles multiple consecutive spaces', () => {
    expect(titleToSlug('hello  world')).toBe('hello--world');
  });
});

describe('slugify', () => {
  it('lowercases, collapses non-alphanumerics to single hyphens, trims', () => {
    expect(slugify('Chana  Masala!!')).toBe('chana-masala');
    expect(slugify('  Béchamel & Co. ')).toBe('b-chamel-co'); // ascii-only; accents drop
    expect(slugify('already-a-slug')).toBe('already-a-slug');
    expect(slugify('')).toBe('');
  });
});
