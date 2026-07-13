import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UrlRecipeSource } from './UrlRecipeSource';

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => ({ token: 'test-token', isAuthenticated: true }),
}));

const server = setupServer(
  http.post('/recipes/scrape', () =>
    HttpResponse.json({
      recipe: { title: 'Imported Stew', sections: [{ name: null, ingredients: ['beef'], steps: [] }] },
      suggested_labels: [],
      techniques: { acquire: 'fetch', parse: 'json-ld', normalize: 'single-section' },
      warnings: [],
    })
  )
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderSource(onDraft = vi.fn()) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <UrlRecipeSource onDraft={onDraft} />
    </QueryClientProvider>
  );
  return onDraft;
}

describe('UrlRecipeSource', () => {
  it('emits an AcquiredDraft with the typed url on success', async () => {
    const onDraft = renderSource();
    fireEvent.change(screen.getByLabelText('Import from URL'), {
      target: { value: 'http://example.com/stew' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Import' }));

    await waitFor(() => expect(onDraft).toHaveBeenCalledTimes(1));
    expect(onDraft).toHaveBeenCalledWith({
      draft: expect.objectContaining({ recipe: expect.objectContaining({ title: 'Imported Stew' }) }),
      sourceUrl: 'http://example.com/stew',
    });
  });
});
