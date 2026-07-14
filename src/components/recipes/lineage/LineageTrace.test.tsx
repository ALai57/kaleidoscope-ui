import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../../../test/testUtils';
import { LineageTrace } from './LineageTrace';
import type { RecipeLineage } from '../../../types/lineage';

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const lineage: RecipeLineage = {
  recipe_url: 'buns', recipe_id: 'r1',
  run: { id: 'a3f1c9e2-0000-0000-0000-000000000000', pipeline_version: '6133819',
    outcome: 'success', error_detail: null,
    techniques: { acquire: 'direct', parse: 'json-ld', normalize: 'llm-grouping' },
    facts: { title: 'Buns', ingredients: ['a', 'b'], steps: ['mix'], section_signals: [], labels: [] },
    content: { title: 'Buns', sections: [{ name: 'Dough', ingredients: ['a'], steps: ['mix'] }] },
    llm_calls: [{ purpose: 'normalize', model: 'claude-haiku-4-5',
      request: { model: 'claude-haiku-4-5', system: 's', messages: [] },
      response: { content: [], usage: { input_tokens: 1043, output_tokens: 218 } } }],
    warnings: ['Dropped 1 header line'], created_at: '2026-07-13T09:42:07Z' },
  raw: { source_kind: 'url', request_url: 'http://x/', final_url: 'http://x/',
    http_status: 200, fetch_tier: 'direct', content_bytes: 49408, raw_content: null,
    created_at: '2026-07-13T09:42:07Z' },
};
const wrap = (ui: React.ReactNode) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

describe('LineageTrace', () => {
  it('renders the run header, stats, three stages and warnings', () => {
    const { getByText } = wrap(<LineageTrace lineage={lineage} slug="buns" />);
    expect(getByText('6133819')).toBeInTheDocument();          // pipeline version
    // A bare /1,043/ also matches the per-call "in 1,043 · out 218" header that
    // LlmCallView (Task 7, unmodified) renders inside StageCard's "Model calls"
    // <details> for this same fixture — collapsed <details> content stays in the
    // DOM and is still matched by getByText, so the loose regex hits both and
    // throws on multiple matches. The Stat tile's own text run is "1,043 / 218"
    // (value + a nested <small> suffix), so getByText's default own-text-only
    // matching won't see the full string either; match on full textContent via a
    // function matcher to disambiguate without weakening the assertion — this
    // pins the Stat tile specifically and still verifies both token counts.
    expect(
      getByText((_content, el) => el?.textContent === '1,043 / 218'),
    ).toBeInTheDocument();                                     // token stat
    expect(getByText('Acquire')).toBeInTheDocument();
    expect(getByText('Parse')).toBeInTheDocument();
    expect(getByText('Normalize')).toBeInTheDocument();
    expect(getByText(/Dropped 1 header line/)).toBeInTheDocument();
  });

  // A real ephemeral-env payload arrived with a required array field omitted,
  // producing `undefined.map(...)`. The trace must tolerate a backend that drops
  // any array (warnings / content.sections / facts.*) rather than white-screen.
  it('does not crash when the backend omits run.warnings', () => {
    const bad = { ...lineage, run: { ...lineage.run, warnings: undefined } } as unknown as RecipeLineage;
    expect(() => wrap(<LineageTrace lineage={bad} slug="buns" />)).not.toThrow();
  });

  it('does not crash when the backend omits run.content.sections', () => {
    const bad = { ...lineage, run: { ...lineage.run, content: { title: 'Buns' } } } as unknown as RecipeLineage;
    expect(() => wrap(<LineageTrace lineage={bad} slug="buns" />)).not.toThrow();
  });

  it('does not crash when the backend omits facts arrays', () => {
    const bad = { ...lineage, run: { ...lineage.run, facts: { title: 'Buns' } } } as unknown as RecipeLineage;
    expect(() => wrap(<LineageTrace lineage={bad} slug="buns" />)).not.toThrow();
  });

  // The actual ephemeral-env crash: transcribe/parse calls persisted with empty
  // request/response objects, so LlmCallView hit `request.messages` === undefined.
  it('does not crash when an llm-call stores empty request/response objects', () => {
    const bad = {
      ...lineage,
      run: {
        ...lineage.run,
        llm_calls: [{ purpose: 'parse', model: 'claude-haiku-4-5', request: {}, response: {} }],
      },
    } as unknown as RecipeLineage;
    expect(() => wrap(<LineageTrace lineage={bad} slug="buns" />)).not.toThrow();
  });
});
