import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { PrismThemeProvider } from '../../components/prism';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import LibraryPage from './LibraryPage';
import { makeTestQueryClient } from '../../components/library/testHelpers';

// The gate now uses isWriter(userProfile), which checks `<host>:writer` for the
// current host — so the mock's role is built from the jsdom host. authState is
// mutable so individual tests can exercise the writer / non-writer / signed-out
// branches; it resets to an authenticated writer after each test.
const { authState } = vi.hoisted(() => {
  const writerRole = `${globalThis.window?.location?.hostname ?? 'localhost'}:writer`;
  const writer = {
    token: 't' as string | undefined,
    isAuthenticated: true,
    isLoading: false,
    userProfile: { firstName: 'A', realm_access: { roles: [writerRole] } } as unknown,
    login: () => {},
    logout: () => {},
  };
  return { authState: { defaultWriter: writer, current: writer } };
});

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => authState.current,
}));

const server = setupServer(
  http.get('/interests', () => HttpResponse.json([
    { id: 'i1', 'user-id': 'u', intent: 'Modern jazz history', 'taste-profile': {}, 'created-at': 'x', 'updated-at': 'x' },
  ])),
  http.get('/interests/i1', () => HttpResponse.json(
    { id: 'i1', 'user-id': 'u', intent: 'Modern jazz history', 'taste-profile': { 'novelty-ratio': 0.5 }, 'created-at': 'x', 'updated-at': 'x' })),
  http.get('/interests/i1/recommendations', () => HttpResponse.json([])),
);
beforeAll(() => server.listen());
afterEach(() => { server.resetHandlers(); authState.current = authState.defaultWriter; });
afterAll(() => server.close());

function renderAt(path: string) {
  const client = makeTestQueryClient();
  return render(
    <QueryClientProvider client={client}>
      <PrismThemeProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/library" element={<LibraryPage view="shelf" />} />
            <Route path="/library/:interestId" element={<LibraryPage view="shelf" />} />
            <Route path="/library/:interestId/acquisitions" element={<LibraryPage view="acquisitions" />} />
            <Route path="/library/:interestId/taste" element={<LibraryPage view="taste" />} />
          </Routes>
        </MemoryRouter>
      </PrismThemeProvider>
    </QueryClientProvider>
  );
}

describe('LibraryPage', () => {
  it('renders the rail with interests', async () => {
    renderAt('/library/i1');
    expect(await screen.findByRole('link', { name: /Modern jazz history/ })).toBeInTheDocument();
  });

  it('shows the shelf empty state for the selected interest', async () => {
    renderAt('/library/i1');
    expect(await screen.findByText(/shelf is empty/i)).toBeInTheDocument();
  });

  it('shows the acquisitions pipeline on the acquisitions route', async () => {
    renderAt('/library/i1/acquisitions');
    expect(await screen.findByRole('button', { name: /run acquisition/i })).toBeInTheDocument();
  });

  it('gates an authenticated non-writer out of the shell', async () => {
    authState.current = {
      ...authState.defaultWriter,
      userProfile: { firstName: 'B', realm_access: { roles: [] } },
    };
    renderAt('/library/i1');
    expect(await screen.findByText(/does not have writer access/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Modern jazz history/ })).not.toBeInTheDocument();
  });

  it('prompts an unauthenticated visitor to sign in', async () => {
    authState.current = {
      ...authState.defaultWriter,
      isAuthenticated: false,
      userProfile: null,
    };
    renderAt('/library/i1');
    expect(await screen.findByText(/sign in as a writer/i)).toBeInTheDocument();
  });
});
