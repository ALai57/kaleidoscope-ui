import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { libraryKeys, useInterests, useShelf, useCreateInterest } from './hooks';
import { makeTestQueryClient } from './testHelpers';

const server = setupServer(
  http.get('/interests', () => HttpResponse.json([{ id: 'i1', intent: 'Jazz', 'taste-profile': {} }])),
  http.get('/interests/i1/recommendations', () => HttpResponse.json([{ id: 'r1', kind: 'article', status: 'shelved' }])),
  http.post('/interests', () => HttpResponse.json({ id: 'i2', intent: 'New', 'taste-profile': {} })),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function wrapper(client = makeTestQueryClient()) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

describe('libraryKeys', () => {
  it('scopes shelf keys by interest id and filters', () => {
    expect(libraryKeys.shelf('i1', { status: 'shelved' }))
      .toEqual(['interests', 'i1', 'shelf', { status: 'shelved' }]);
    expect(libraryKeys.detail('i1')).toEqual(['interests', 'i1']);
  });
});

describe('useInterests', () => {
  it('fetches the interest list', async () => {
    const { result } = renderHook(() => useInterests(undefined), { wrapper: wrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].intent).toBe('Jazz');
  });
});

describe('useShelf', () => {
  it('fetches the shelf for an interest', async () => {
    const { result } = renderHook(() => useShelf('i1', { status: 'shelved' }, undefined), { wrapper: wrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0].id).toBe('r1');
  });

  it('is disabled when interest id is empty', () => {
    const { result } = renderHook(() => useShelf('', {}, undefined), { wrapper: wrapper() });
    expect(result.current.fetchStatus).toBe('idle');
  });
});

describe('useCreateInterest', () => {
  it('invalidates the interest list on success', async () => {
    const client = makeTestQueryClient();
    // seed the list cache so we can observe invalidation
    await client.prefetchQuery({ queryKey: libraryKeys.list(), queryFn: () => Promise.resolve([]) });
    const { result } = renderHook(() => useCreateInterest(undefined), { wrapper: wrapper(client) });
    result.current.mutate({ intent: 'New' });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(client.getQueryState(libraryKeys.list())?.isInvalidated).toBe(true);
  });
});
