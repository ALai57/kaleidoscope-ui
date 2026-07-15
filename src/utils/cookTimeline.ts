import type {
  RecipeSection,
  TimelineComponent,
  TimelineOverride,
  TimelinePhase,
  Timeline,
} from '../types/recipe';

/** A component's stable id (lane label): its name (verbatim, preserving
 *  whitespace), else a 1-based ordinal. Mirrors the backend `component-id`
 *  so phase.steps can be joined back to `content.sections`. */
export function componentId(section: { name?: string | null }, index: number): string {
  const name = section.name;
  return name && name.trim() ? name : `Section ${index + 1}`;
}

/** The step strings a phase covers: find the section whose id matches the
 *  component, then map the phase's step indices to that section's steps
 *  (skipping any out-of-range index from a stale timeline). */
export function resolvePhaseSteps(
  phase: TimelinePhase,
  component: TimelineComponent,
  sections: RecipeSection[]
): string[] {
  const section = sections.find((s, i) => componentId(s, i) === component.name);
  if (!section) return [];
  return phase.steps
    .map((i) => section.steps[i])
    .filter((s): s is string => s !== undefined);
}

/** The duration used for layout/stats: an authored override wins over the
 *  LLM estimate. */
export function effectiveDuration(phase: TimelinePhase, overrides: TimelineOverride[]): number {
  const hit = overrides.find((o) => o.phase === phase.id);
  return hit ? hit.minutes : phase.estimate;
}

/** Format minutes-since-midnight as "h:mm AM/PM". */
function fmtClock(mins: number): string {
  const norm = ((mins % 1440) + 1440) % 1440;
  let h = Math.floor(norm / 60);
  const m = norm % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}

/** Back-plan the start clock: serve time (HH:MM) minus the total run. */
export function backPlanStart(serveTimeHHMM: string, totalMinutes: number): string {
  const parts = serveTimeHHMM.split(':');
  if (parts.length !== 2) return '';
  const [h, m] = parts.map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return '';
  return fmtClock(h * 60 + m - totalMinutes);
}

export interface TimelineStats {
  totalMinutes: number;
  handsOnMinutes: number;
  freeMinutes: number;
  activeCount: number;
  passiveWindows: number;
}

/** Stat tiles. Active phases never overlap (packer invariant), so hands-on =
 *  sum of active durations and free windows are the gaps in active coverage. */
export function timelineStats(timeline: Timeline): TimelineStats {
  const active = timeline.components
    .flatMap((c) => c.phases)
    .filter((p) => p.kind === 'active')
    .map((p) => {
      const start = p.start ?? 0;
      return { start, end: start + effectiveDuration(p, timeline.overrides) };
    })
    .sort((a, b) => a.start - b.start);

  const handsOnMinutes = active.reduce((sum, i) => sum + (i.end - i.start), 0);
  const total = timeline.total_minutes;

  let cursor = 0;
  let passiveWindows = 0;
  for (const i of active) {
    if (i.start > cursor) passiveWindows += 1; // a gap before this active block
    cursor = Math.max(cursor, i.end);
  }
  if (cursor < total) passiveWindows += 1; // trailing free window

  return {
    totalMinutes: total,
    handsOnMinutes,
    freeMinutes: total - handsOnMinutes,
    activeCount: active.length,
    passiveWindows,
  };
}

/** One color per lane, cycling the categorical palette if a recipe has more
 *  components than palette entries. */
export function pickLaneColors(count: number, palette: readonly string[]): string[] {
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}
