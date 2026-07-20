import { it, expect } from 'vitest';
import { GUTTER } from './constants';

it('keeps the lane-label gutter compact so it does not out-shout the bars', () => {
  // The sidebar holds short component names in 12px mono; a wide gutter wasted
  // horizontal space and made the labels the largest text in the chart.
  expect(GUTTER).toBeLessThanOrEqual(104);
});
