import { describe, it, expect } from 'vitest';
import { componentId, resolvePhaseSteps, effectiveDuration, pickLaneColors, ingredientKey, sectionForComponent } from './cookTimeline';
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
  it('resolves a duplicate-named component to the FIRST matching section (backend id-collision semantics)', () => {
    const dupSections: RecipeSection[] = [
      { name: 'Sauce', ingredients: [], steps: ['First sauce step'] },
      { name: 'Sauce', ingredients: [], steps: ['Second sauce step'] },
    ];
    const comp: TimelineComponent = { name: 'Sauce', steps_hash: 'x', phases: [] };
    const dupPhase: TimelinePhase = {
      id: 'Sauce/Make', label: 'Make', kind: 'active', steps: [0], estimate: 5, deps: [],
    };
    expect(resolvePhaseSteps(dupPhase, comp, dupSections)).toEqual(['First sauce step']);
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

describe('pickLaneColors', () => {
  it('assigns palette colors by index', () => {
    expect(pickLaneColors(3, ['#a', '#b', '#c', '#d'])).toEqual(['#a', '#b', '#c']);
  });
  it('cycles when there are more lanes than palette entries', () => {
    expect(pickLaneColors(4, ['#a', '#b'])).toEqual(['#a', '#b', '#a', '#b']);
  });
  it('returns [] for a zero count', () => {
    expect(pickLaneColors(0, ['#a'])).toEqual([]);
  });
});

describe('ingredientKey', () => {
  it('joins section and ingredient indices', () => {
    expect(ingredientKey(0, 3)).toBe('0:3');
    expect(ingredientKey(2, 0)).toBe('2:0');
  });
});

describe('sectionForComponent', () => {
  const sections = [
    { name: 'Salmon', ingredients: ['2 salmon fillets'], steps: ['s1'] },
    { name: 'Rice', ingredients: ['1 cup rice'], steps: ['s2'] },
  ];
  it('matches a component to its section by componentId (verbatim name)', () => {
    const comp = { name: 'Rice', steps_hash: 'x', phases: [] };
    const res = sectionForComponent(comp, sections);
    expect(res).toEqual({ section: sections[1], index: 1 });
  });
  it('returns null when no section matches', () => {
    const comp = { name: 'Nope', steps_hash: 'x', phases: [] };
    expect(sectionForComponent(comp, sections)).toBeNull();
  });
});
