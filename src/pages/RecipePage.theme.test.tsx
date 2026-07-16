import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../theme';
import RecipePage from './RecipePage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: () => {},
    logout: () => {},
  }),
}));

// Probe the ambient color mode from inside the cook-timeline region — the area
// that used to be pinned dark by PrismThemeProvider.
vi.mock('../components/recipes/timeline', () => ({
  CookTimeline: () => {
    const { palette } = useTheme();
    return <div data-testid="timeline-probe" data-mode={palette.mode} />;
  },
}));

const server = setupServer(
  http.get('/recipes/timed-dish', () =>
    HttpResponse.json({
      id: 'r9',
      recipe_url: 'timed-dish',
      hostname: 'andrewslai.com',
      content: { title: 'Timed Dish', sections: [{ name: 'Salmon', ingredients: [], steps: ['Sear'] }] },
      labels: [],
      public_visibility: true,
      created_at: '2026-01-01T00:00:00Z',
      modified_at: '2026-01-01T00:00:00Z',
      timeline: {
        version: 1,
        generator_version: 1,
        generated_at: 'now',
        total_minutes: 10,
        overrides: [],
        components: [
          {
            name: 'Salmon',
            steps_hash: 'x',
            phases: [
              { id: 'Salmon/Prep', label: 'Prep', kind: 'active', steps: [0], estimate: 10, deps: [], start: 0 },
            ],
          },
        ],
      },
    })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RecipePage theme', () => {
  it('renders the cook timeline under the ambient app theme (obeys light/dark)', async () => {
    const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    rtlRender(
      // Light default theme — the timeline probe must read 'light' rather than a
      // pinned 'dark' from a PrismThemeProvider.
      <ThemeProvider theme={makeTheme(BASE_THEME)}>
        <QueryClientProvider client={qc}>
          <MemoryRouter initialEntries={['/recipes/timed-dish']}>
            <Routes>
              <Route path="/recipes/:slug" element={<RecipePage />} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      </ThemeProvider>
    );
    const probe = await screen.findByTestId('timeline-probe');
    expect(probe.getAttribute('data-mode')).toBe('light');
  });
});
