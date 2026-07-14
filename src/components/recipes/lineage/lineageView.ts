import type { LlmCall, RecipeLineage } from '../../../types/lineage';

export const STAGE_ORDER = ['acquire', 'parse', 'normalize'] as const;
export type StageKey = (typeof STAGE_ORDER)[number];
export type StageStatus = 'ok' | 'failed' | 'not-reached';

const STAGE_LABEL: Record<StageKey, string> = {
  acquire: 'Acquire', parse: 'Parse', normalize: 'Normalize',
};
const STAGE_ARTIFACT: Record<StageKey, string> = {
  acquire: 'RawScrape', parse: 'ExtractedFacts', normalize: 'RecipeContent',
};
/** Which stage a stored llm-call belongs to (purpose → stage). */
const PURPOSE_STAGE: Record<string, StageKey> = {
  transcribe: 'acquire', acquire: 'acquire', parse: 'parse', normalize: 'normalize',
};

export interface StageView {
  key: StageKey;
  label: string;
  artifact: string;
  technique: string | null;
  status: StageStatus;
  llmCalls: LlmCall[];
  errorDetail: RecipeLineage['run']['error_detail'];
}

/** Stage hues from the categorical palette. ACQUIRE=[0], PARSE=[1], NORMALIZE=[3]
 *  — index 2 (#C98500) is intentionally skipped so normalize stays green. */
export function stageHues(categorical: readonly string[]): Record<StageKey, string> {
  return { acquire: categorical[0]!, parse: categorical[1]!, normalize: categorical[3]! };
}

/** The failing stage on a non-success run, inferred from which artifact is
 *  missing: facts null ⇒ PARSE failed; content null (facts present) ⇒ NORMALIZE
 *  failed. Stages before it are ok; stages after are not-reached.
 *
 *  NOTE: An ACQUIRE-stage failure is unrepresentable by this heuristic — facts == null
 *  is always attributed to PARSE. In practice, a recipe page only exists for a run that
 *  produced content, so such a run is effectively always outcome: "success". A future
 *  refinement could prefer the backend's error_detail.reason when it maps to a stage. */
function failedStage(lineage: RecipeLineage): StageKey {
  const { facts, content } = lineage.run;
  if (facts == null) return 'parse';
  if (content == null) return 'normalize';
  return 'normalize';
}

export function buildStages(lineage: RecipeLineage): StageView[] {
  const success = lineage.run.outcome === 'success';
  const failIdx = success ? -1 : STAGE_ORDER.indexOf(failedStage(lineage));
  return STAGE_ORDER.map((key, i) => {
    const status: StageStatus =
      success || failIdx === -1 ? 'ok'
        : i < failIdx ? 'ok'
        : i === failIdx ? 'failed'
        : 'not-reached';
    return {
      key,
      label: STAGE_LABEL[key],
      artifact: STAGE_ARTIFACT[key],
      technique: lineage.run.techniques[key] ?? null,
      status,
      llmCalls: lineage.run.llm_calls.filter((c) => PURPOSE_STAGE[c.purpose] === key),
      errorDetail: status === 'failed' ? lineage.run.error_detail : null,
    };
  });
}

export function tokenTotals(calls: LlmCall[]): { input: number; output: number } {
  return calls.reduce(
    (acc, c) => ({
      input: acc.input + (c.response.usage?.input_tokens ?? 0),
      output: acc.output + (c.response.usage?.output_tokens ?? 0),
    }),
    { input: 0, output: 0 },
  );
}

/** Header/section-label ingredient lines the NORMALIZE merge omitted: the count
 *  of facts ingredients that did not land in any final content section. */
export function droppedIngredientLines(lineage: RecipeLineage): number {
  const factsCount = lineage.run.facts?.ingredients.length ?? 0;
  const placed = (lineage.run.content?.sections ?? []).reduce(
    (n, s) => n + s.ingredients.length, 0,
  );
  return Math.max(0, factsCount - placed);
}

export function stagesRunCount(stages: StageView[]): number {
  return stages.filter((s) => s.status === 'ok' || s.status === 'failed').length;
}

export function shortModel(model: string): string {
  const m = model.match(/(haiku|sonnet|opus)/i);
  return m ? m[1]!.toLowerCase() : model.replace(/^claude-/, '');
}

export function modelCallSummary(calls: LlmCall[]): { count: number; label: string } {
  const label = calls.length ? shortModel(calls[0]!.model) : '';
  return { count: calls.length, label };
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  const kb = n / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function relativeTime(iso: string, now: Date = new Date()): string {
  const secs = Math.max(0, (now.getTime() - new Date(iso).getTime()) / 1000);
  const units: [number, string][] = [
    [86400, 'd'], [3600, 'h'], [60, 'm'],
  ];
  for (const [size, suffix] of units) {
    if (secs >= size) return `${Math.floor(secs / size)}${suffix} ago`;
  }
  return 'just now';
}
