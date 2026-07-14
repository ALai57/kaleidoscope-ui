import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/testUtils';
import { ImportLineageStrip } from './ImportLineageStrip';

const server = setupServer(
  http.get('*/recipes/:slug/lineage', () =>
    HttpResponse.json({
      'recipe-url': 'buns', 'recipe-id': 'r1',
      run: { id: 'run1', 'pipeline-version': '6133819', outcome: 'success', 'error-detail': null,
        techniques: { acquire: 'direct', parse: 'json-ld', normalize: 'llm-grouping' },
        facts: { title: 'Buns', ingredients: ['a'], steps: ['mix'], 'section-signals': [], labels: [] },
        content: { title: 'Buns', sections: [{ name: 'Dough', ingredients: ['a'], steps: ['mix'] }] },
        'llm-calls': [{ purpose: 'normalize', model: 'claude-haiku-4-5',
          request: { model: 'claude-haiku-4-5', system: 's', messages: [] },
          response: { content: [], usage: { input_tokens: 1043, output_tokens: 218 } } }],
        warnings: [], 'created-at': new Date().toISOString() },
      raw: { 'source-kind': 'url', 'http-status': 200, 'fetch-tier': 'direct',
        'content-bytes': 49408, 'raw-content': null, 'created-at': new Date().toISOString() },
    }),
  ),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrap = (ui: React.ReactNode) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>);
};

describe('ImportLineageStrip', () => {
  it('shows the collapsed summary from the fetched lineage', async () => {
    const { findByText } = wrap(<ImportLineageStrip slug="buns" />);
    expect(await findByText(/json-ld/)).toBeInTheDocument();
    expect(await findByText(/1 model call/i)).toBeInTheDocument();
  });

  it('reveals the trace when expanded', async () => {
    const { findByText, getByText } = wrap(<ImportLineageStrip slug="buns" />);
    await findByText(/json-ld/);
    fireEvent.click(getByText(/import lineage/i));
    expect(await findByText('6133819')).toBeInTheDocument();
  });
});
