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

/** True when a phase's label merely repeats its component name. The timeline
 *  generator names single-phase components after the component itself, so
 *  rendering the component name and the phase label together would read as a
 *  duplicate ("Prep broth · Prep broth"). Callers collapse the repetition when
 *  this is true. Comparison ignores case and surrounding whitespace. */
export function phaseLabelRepeatsComponent(componentName: string, phaseLabel: string): boolean {
  return phaseLabel.trim().toLowerCase() === componentName.trim().toLowerCase();
}

/** One color per lane, cycling the categorical palette if a recipe has more
 *  components than palette entries. */
export function pickLaneColors(count: number, palette: readonly string[]): string[] {
  if (palette.length === 0) return [];
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]!);
}

/** Stable key for an ingredient checkbox: its section and ingredient
 *  indices, joined. */
export const ingredientKey = (sectionIndex: number, ingredientIndex: number): string =>
  `${sectionIndex}:${ingredientIndex}`;

/** The recipe section a timeline component belongs to, found by matching
 *  componentId(section, index) against the component's name. */
export function sectionForComponent(
  component: TimelineComponent,
  sections: RecipeSection[]
): { section: RecipeSection; index: number } | null {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section && componentId(section, i) === component.name) {
      return { section, index: i };
    }
  }
  return null;
}
