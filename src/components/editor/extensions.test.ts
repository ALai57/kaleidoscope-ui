import { describe, it, expect } from 'vitest';
import { extensions } from './extensions';

describe('extensions', () => {
  it('exports a non-empty extensions array', () => {
    expect(extensions.length).toBeGreaterThan(0);
  });

  it('contains the expected number of extensions', () => {
    // StarterKit (1) + CodeBlockLowlight + Link + Image + Underline + TextAlign + TextStyle + Color + Highlight = 9
    expect(extensions.length).toBe(9);
  });
});
