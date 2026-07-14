import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../../../test/testUtils';
import { StageCard } from './StageCard';
import { buildStages } from './lineageView';
import type { RecipeLineage } from '../../../types/lineage';

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const lineage: RecipeLineage = {
  recipe_url: 'buns', recipe_id: 'r1',
  run: { id: 'run1', pipeline_version: 'v', outcome: 'success', error_detail: null,
    techniques: { acquire: 'direct', parse: 'json-ld', normalize: 'llm-grouping' },
    facts: { title: 'Buns', ingredients: ['flour'], steps: ['mix'], section_signals: [], labels: [] },
    content: { title: 'Buns', sections: [{ name: 'Dough', ingredients: ['flour'], steps: ['mix'] }] },
    llm_calls: [{ purpose: 'normalize', model: 'claude-haiku-4-5',
      request: { model: 'claude-haiku-4-5', system: 'sys', messages: [] },
      response: { content: [], usage: { input_tokens: 1, output_tokens: 2 } } }],
    warnings: [], created_at: 't' },
  raw: { source_kind: 'url', http_status: 200, fetch_tier: 'direct', content_bytes: 6,
    raw_content: null, created_at: 't' },
};
const wrap = (ui: React.ReactNode) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

describe('StageCard', () => {
  it('renders a completed stage with its technique and artifact name', () => {
    const stages = buildStages(lineage);
    const { getByText, getAllByText } = wrap(
      <StageCard stage={stages[1]!} lineage={lineage} slug="buns" isLast={false} />,
    );
    expect(getByText('Parse')).toBeInTheDocument();
    expect(getByText(/:json-ld/)).toBeInTheDocument();
    expect(getAllByText('ExtractedFacts').length).toBeGreaterThan(0);
  });

  it('renders the normalize LLM call', () => {
    const stages = buildStages(lineage);
    const { getByText } = wrap(
      <StageCard stage={stages[2]!} lineage={lineage} slug="buns" isLast />,
    );
    expect(getByText('claude-haiku-4-5')).toBeInTheDocument();
  });

  it('shows the error box on a failed stage and dims a not-reached stage', () => {
    const failed: RecipeLineage = { ...lineage, run: { ...lineage.run, outcome: 'parse-failed',
      facts: null, content: null, error_detail: { message: 'no recipe node', reason: 'parse' } } };
    const stages = buildStages(failed);
    const { getByText, queryByText } = wrap(
      <>
        <StageCard stage={stages[1]!} lineage={failed} slug="buns" isLast={false} />
        <StageCard stage={stages[2]!} lineage={failed} slug="buns" isLast />
      </>,
    );
    expect(getByText('no recipe node')).toBeInTheDocument();
    expect(getByText(/not reached/i)).toBeInTheDocument();
    expect(queryByText('ExtractedFacts')).not.toBeInTheDocument(); // no inspector on failed parse
    expect(queryByText(/:llm-grouping/)).not.toBeInTheDocument(); // not-reached stage shows no technique chip
  });
});
