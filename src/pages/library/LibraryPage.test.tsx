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

vi.mock('../../auth/useAuth', () => ({
  useAuth: () => ({
    token: 't', isAuthenticated: true,
    userProfile: { firstName: 'A', realm_access: { roles: ['writer'] } },
    login: vi.fn(), logout: vi.fn(),
  }),
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
afterEach(() => server.resetHandlers());
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
});
