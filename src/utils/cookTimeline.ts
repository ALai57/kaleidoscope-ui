import type {
  RecipeSection,
  TimelineComponent,
  TimelineOverride,
  TimelinePhase,
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
