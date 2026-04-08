import { describe, it, expect } from 'vitest';
import { titleToSlug } from './url';

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
