import { describe, it, expect } from 'vitest';
import { componentId, resolvePhaseSteps, effectiveDuration } from './cookTimeline';
import type { RecipeSection } from '../types/recipe';
import type { TimelineComponent, TimelinePhase } from '../types/recipe';

describe('componentId', () => {
  it('uses a non-blank name', () => {
    expect(componentId({ name: 'Salmon' }, 0)).toBe('Salmon');
  });
  it('falls back to a 1-based ordinal for blank/whitespace/missing names', () => {
    expect(componentId({ name: '' }, 0)).toBe('Section 1');
    expect(componentId({ name: '   ' }, 1)).toBe('Section 2');
    expect(componentId({ name: null }, 2)).toBe('Section 3');
    expect(componentId({}, 3)).toBe('Section 4');
  });
  it('preserves a non-blank name verbatim, including surrounding whitespace (matches backend)', () => {
    expect(componentId({ name: ' Salmon ' }, 0)).toBe(' Salmon ');
  });
});

describe('resolvePhaseSteps', () => {
  const sections: RecipeSection[] = [
    { name: 'Salmon', ingredients: [], steps: ['Whisk miso', 'Coat fillets', 'Rest'] },
    { name: 'Rice', ingredients: [], steps: ['Rinse', 'Boil'] },
  ];
  const comp: TimelineComponent = { name: 'Rice', steps_hash: 'x', phases: [] };
  const phase: TimelinePhase = {
    id: 'Rice/Cook', label: 'Cook', kind: 'active', steps: [0, 1], estimate: 5, deps: [],
  };
  it('joins a component back to its section by id and returns step text', () => {
    expect(resolvePhaseSteps(phase, comp, sections)).toEqual(['Rinse', 'Boil']);
  });
  it('tolerates out-of-range indices (stale timeline)', () => {
    expect(resolvePhaseSteps({ ...phase, steps: [0, 9] }, comp, sections)).toEqual(['Rinse']);
  });
  it('returns [] when no section matches the component id', () => {
    const orphan: TimelineComponent = { name: 'Ghost', steps_hash: 'x', phases: [] };
    expect(resolvePhaseSteps(phase, orphan, sections)).toEqual([]);
  });
});

describe('effectiveDuration', () => {
  const phase: TimelinePhase = {
    id: 'Salmon/Sear', label: 'Sear', kind: 'active', steps: [], estimate: 10, deps: [],
  };
  it('returns the estimate when no override targets the phase', () => {
    expect(effectiveDuration(phase, [])).toBe(10);
  });
  it('prefers a matching override', () => {
    expect(effectiveDuration(phase, [{ phase: 'Salmon/Sear', minutes: 12 }])).toBe(12);
  });
});
