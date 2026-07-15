import { describe, it, expect } from 'vitest';
import { componentId, resolvePhaseSteps, effectiveDuration, backPlanStart, timelineStats, pickLaneColors } from './cookTimeline';
import type { RecipeSection } from '../types/recipe';
import type { TimelineComponent, TimelinePhase, Timeline } from '../types/recipe';

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

describe('backPlanStart', () => {
  it('subtracts total minutes from a serve time and formats 12-hour', () => {
    expect(backPlanStart('18:30', 50)).toBe('5:40 PM');
  });
  it('formats midnight and noon boundaries', () => {
    expect(backPlanStart('00:20', 30)).toBe('11:50 PM'); // wraps back a day
    expect(backPlanStart('12:00', 0)).toBe('12:00 PM');
  });
  it('returns empty string for an unparseable serve time', () => {
    expect(backPlanStart('', 50)).toBe('');
  });
});

describe('timelineStats', () => {
  const tl: Timeline = {
    version: 1, generator_version: 1, generated_at: 'now', total_minutes: 50, overrides: [],
    components: [
      { name: 'A', steps_hash: 'x', phases: [
        { id: 'A/p1', label: 'p1', kind: 'passive', steps: [], estimate: 24, deps: [], start: 0 },
        { id: 'A/a1', label: 'a1', kind: 'active', steps: [], estimate: 10, deps: [], start: 30 },
      ] },
      { name: 'B', steps_hash: 'x', phases: [
        { id: 'B/a1', label: 'a1', kind: 'active', steps: [], estimate: 6, deps: [], start: 0 },
        { id: 'B/a2', label: 'a2', kind: 'active', steps: [], estimate: 4, deps: [], start: 46 },
      ] },
    ],
  };
  it('derives hands-on = sum of active durations and free = total - hands-on', () => {
    const s = timelineStats(tl);
    expect(s.totalMinutes).toBe(50);
    expect(s.handsOnMinutes).toBe(20); // 10 + 6 + 4
    expect(s.freeMinutes).toBe(30);
    expect(s.activeCount).toBe(3);
  });
  it('counts hands-off windows as gaps in active coverage', () => {
    // active intervals: [0,6], [30,40], [46,50] -> free gaps [6,30] and [40,46] = 2
    expect(timelineStats(tl).passiveWindows).toBe(2);
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
