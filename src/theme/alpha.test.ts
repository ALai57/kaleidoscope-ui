import { it, expect } from 'vitest';
import { alpha } from './alpha';

it('applies alpha to a hex token color', () => {
  expect(alpha('#45D6E8', 0.14)).toBe('rgba(69, 214, 232, 0.14)');
});

it('applies alpha to an hsl() token color (the light-mode brand case)', () => {
  // hsl(0,100%,50%) is pure red — proves the hsl path yields valid rgba, which
  // the old `${color}NN` concat could not do.
  expect(alpha('hsl(0, 100%, 50%)', 0.35)).toBe('rgba(255, 0, 0, 0.35)');
});
