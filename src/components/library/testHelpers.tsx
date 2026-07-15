import type { ReactElement } from 'react';
import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrismThemeProvider } from '../prism';

export function makeTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  opts: { route?: string; client?: QueryClient } = {}
): RenderResult & { client: QueryClient } {
  const client = opts.client ?? makeTestQueryClient();
  const result = render(
    <QueryClientProvider client={client}>
      <PrismThemeProvider>
        <MemoryRouter initialEntries={[opts.route ?? '/']}>{ui}</MemoryRouter>
      </PrismThemeProvider>
    </QueryClientProvider>
  );
  return { ...result, client };
}
