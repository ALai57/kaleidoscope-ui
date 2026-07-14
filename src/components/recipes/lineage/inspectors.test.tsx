import * as React from 'react';
import { describe, it, expect, afterEach, afterAll, beforeAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '../../../test/testUtils';
import { RawScrapeInspector, ExtractedFactsInspector, RecipeContentInspector } from './inspectors';
import type { LineageExtractedFacts } from '../../../types/lineage';
import type { RecipeContent } from '../../../types/recipe';

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const withQuery = (ui: React.ReactNode) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

const facts: LineageExtractedFacts = {
  title: 'Buns', ingredients: ['For dough:', '500 g flour'], steps: ['mix'],
  section_signals: ['Dough'], labels: ['Pastry'],
};
const content: RecipeContent = {
  title: 'Buns', sections: [{ name: 'Dough', ingredients: ['500 g flour'], steps: ['mix'] }],
};

describe('inspectors', () => {
  it('ExtractedFactsInspector lists ingredients, steps, signals, labels', () => {
    const { getByText } = render(<ExtractedFactsInspector facts={facts} />);
    expect(getByText('For dough:')).toBeInTheDocument();
    expect(getByText('500 g flour')).toBeInTheDocument();
    expect(getByText('mix')).toBeInTheDocument();
    expect(getByText('Dough')).toBeInTheDocument();
    expect(getByText('Pastry')).toBeInTheDocument();
  });

  it('RecipeContentInspector renders each section with its ingredients and steps', () => {
    const { getByText } = render(<RecipeContentInspector content={content} />);
    expect(getByText('Dough')).toBeInTheDocument();
    expect(getByText('500 g flour')).toBeInTheDocument();
    expect(getByText('mix')).toBeInTheDocument();
  });

  it('RawScrapeInspector fetches the raw body only when open', async () => {
    server.use(
      http.get('*/recipes/:slug/lineage', () =>
        HttpResponse.json({
          'recipe-url': 'buns', 'recipe-id': 'r1',
          run: { id: 'x', 'pipeline-version': 'v', outcome: 'success', techniques: {},
                 'llm-calls': [], warnings: [], 'created-at': 't' },
          raw: { 'source-kind': 'url', 'content-bytes': 6, 'raw-content': '<html>', 'created-at': 't' },
        }),
      ),
    );
    const { findByText } = withQuery(<RawScrapeInspector slug="buns" open bytes={6} />);
    expect(await findByText('<html>')).toBeInTheDocument();
  });

  it('RawScrapeInspector does NOT fetch until opened (lazy gate)', async () => {
    let calls = 0;
    server.use(
      http.get('*/recipes/:slug/lineage', () => {
        calls++;
        return HttpResponse.json({
          'recipe-url': 'buns', 'recipe-id': 'r1',
          run: { id: 'x', 'pipeline-version': 'v', outcome: 'success', techniques: {},
                 'llm-calls': [], warnings: [], 'created-at': 't' },
          raw: { 'source-kind': 'url', 'content-bytes': 6, 'raw-content': '<html>', 'created-at': 't' },
        });
      }),
    );
    const { findByText } = withQuery(<RawScrapeInspector slug="buns" open={false} bytes={6} />);
    // With enabled:false the query stays idle — the placeholder renders and no fetch fires.
    expect(await findByText('No raw content stored.')).toBeInTheDocument();
    expect(calls).toBe(0);
  });
});
