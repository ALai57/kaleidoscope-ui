import { describe, it, expect } from 'vitest';
import {
  buildStages, stageHues, tokenTotals, droppedIngredientLines, stagesRunCount,
  modelCallSummary, formatBytes, shortModel, relativeTime,
} from './lineageView';
import type { RecipeLineage } from '../../../types/lineage';

const base: RecipeLineage = {
  recipe_url: 'cardamom-buns',
  recipe_id: 'r1',
  run: {
    id: 'run1', pipeline_version: '6133819', outcome: 'success', error_detail: null,
    techniques: { acquire: 'direct', parse: 'json-ld', normalize: 'llm-grouping' },
    facts: { title: 'Buns', ingredients: ['For dough:', 'flour', 'sugar', 'salt'],
             steps: ['mix', 'bake'], section_signals: ['Dough'], labels: [] },
    content: { title: 'Buns', sections: [{ name: 'Dough', ingredients: ['flour', 'sugar', 'salt'], steps: ['mix', 'bake'] }] },
    llm_calls: [{ purpose: 'normalize', model: 'claude-haiku-4-5',
                  request: { model: 'claude-haiku-4-5', messages: [] },
                  response: { content: [], usage: { input_tokens: 1043, output_tokens: 218 } } }],
    warnings: [], created_at: '2026-07-13T09:42:07Z',
  },
  raw: { source_kind: 'url', http_status: 200, fetch_tier: 'direct',
         content_bytes: 49408, raw_content: null, created_at: '2026-07-13T09:42:07Z' },
};

describe('lineageView', () => {
  it('maps stage hues to categorical indices 0,1,3 (skipping 2)', () => {
    const hues = stageHues(['#26A0BC', '#9085E9', '#C98500', '#2E9E5B', '#D55181']);
    expect(hues).toEqual({ acquire: '#26A0BC', parse: '#9085E9', normalize: '#2E9E5B' });
  });

  it('builds three ok stages on success, each with its technique and artifact', () => {
    const stages = buildStages(base);
    expect(stages.map((s) => [s.key, s.status, s.technique, s.artifact])).toEqual([
      ['acquire', 'ok', 'direct', 'RawScrape'],
      ['parse', 'ok', 'json-ld', 'ExtractedFacts'],
      ['normalize', 'ok', 'llm-grouping', 'RecipeContent'],
    ]);
    expect(stages[2]!.llmCalls).toHaveLength(1); // normalize call routed to NORMALIZE
  });

  it('marks the failing stage and later stages not-reached (facts present, content null)', () => {
    const failed: RecipeLineage = { ...base, run: { ...base.run, outcome: 'grouping-failed',
      content: null, error_detail: { reason: 'grouping', message: 'bad json' } } };
    const stages = buildStages(failed);
    expect(stages.map((s) => [s.key, s.status])).toEqual([
      ['acquire', 'ok'], ['parse', 'ok'], ['normalize', 'failed'],
    ]);
    expect(stages[2]!.errorDetail?.message).toBe('bad json');
  });

  it('marks parse failed and normalize not-reached when facts is null', () => {
    const failed: RecipeLineage = { ...base, run: { ...base.run, outcome: 'parse-failed', facts: null, content: null } };
    expect(buildStages(failed).map((s) => s.status)).toEqual(['ok', 'failed', 'not-reached']);
  });

  it('sums token usage across calls', () => {
    expect(tokenTotals(base.run.llm_calls)).toEqual({ input: 1043, output: 218 });
  });

  it('derives dropped ingredient lines from facts vs content', () => {
    expect(droppedIngredientLines(base)).toBe(1); // 4 facts ingredients − 3 placed
  });

  it('counts stages run and summarizes model calls', () => {
    expect(stagesRunCount(buildStages(base))).toBe(3);
    expect(modelCallSummary(base.run.llm_calls)).toEqual({ count: 1, label: 'haiku' });
  });

  it('formats bytes and shortens model names', () => {
    expect(formatBytes(49408)).toBe('48.3 KB');
    expect(shortModel('claude-haiku-4-5')).toBe('haiku');
  });

  it('renders coarse relative time', () => {
    const now = new Date('2026-07-13T11:42:07Z');
    expect(relativeTime('2026-07-13T09:42:07Z', now)).toBe('2h ago');
  });
});
