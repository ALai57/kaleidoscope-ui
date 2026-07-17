import React from 'react';
import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../theme';
import RecipePage from './RecipePage';
import * as wakeLockHook from '../hooks/useWakeLock';

const authState = vi.hoisted(() => ({
  current: {
    isAuthenticated: false,
    token: undefined as string | undefined,
    userProfile: null as unknown,
    login: () => {},
    logout: () => {},
  },
}));
vi.mock('../auth/useAuth', () => ({ useAuth: () => authState.current }));

// The admin role for the current host: jsdom's default window.location.hostname
// is 'localhost', and isSiteAdmin() derives the required role from it via
// getAdminHost() (see src/auth/authHelpers.ts).
const ADMIN_ROLE = 'localhost:admin';
const adminProfile = { realm_access: { roles: [ADMIN_ROLE] } };
const nonAdminProfile = { realm_access: { roles: ['localhost:writer'] } };

const server = setupServer(
  http.get('/recipes/layer-cake', () =>
    HttpResponse.json({
      id: 'r1',
      recipe_url: 'layer-cake',
      hostname: 'andrewslai.com',
      content: {
        title: 'Layer Cake',
        sections: [
          { name: 'Cake', ingredients: ['2 cups flour'], steps: ['Mix', 'Bake'] },
          { name: 'Frosting', ingredients: ['1 cup butter'], steps: ['Whip'] },
        ],
      },
      labels: [],
      public_visibility: true,
      created_at: '2026-01-01T00:00:00Z',
      modified_at: '2026-01-01T00:00:00Z',
    })
  ),
  http.get('/recipes/scraped-buns', () =>
    HttpResponse.json({
      id: 'r2',
      recipe_url: 'scraped-buns',
      hostname: 'andrewslai.com',
      content: {
        title: 'Scraped Buns',
        sections: [{ name: 'Dough', ingredients: ['flour'], steps: ['mix'] }],
      },
      labels: [],
      public_visibility: true,
      created_at: '2026-01-01T00:00:00Z',
      modified_at: '2026-01-01T00:00:00Z',
      scrape_processing_run_id: 'run1',
    })
  ),
  http.get('/recipes/timed-dish', () =>
    HttpResponse.json({
      id: 'r9',
      recipe_url: 'timed-dish',
      hostname: 'andrewslai.com',
      content: {
        title: 'Timed Dish',
        sections: [{ name: 'Salmon', ingredients: [], steps: ['Whisk miso, mirin', 'Sear it'] }],
      },
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
              { id: 'Salmon/Prep', label: 'Prep', kind: 'active', steps: [0, 1], estimate: 10, deps: [], start: 0 },
            ],
          },
        ],
      },
    })
  ),
  http.get('*/recipes/:slug/lineage', () =>
    HttpResponse.json({
      'recipe-url': 'scraped-buns',
      'recipe-id': 'r2',
      run: {
        id: 'run1',
        'pipeline-version': '6133819',
        outcome: 'success',
        'error-detail': null,
        techniques: { acquire: 'direct', parse: 'json-ld', normalize: 'llm-grouping' },
        facts: { title: 'Scraped Buns', ingredients: ['flour'], steps: ['mix'], 'section-signals': [], labels: [] },
        content: { title: 'Scraped Buns', sections: [{ name: 'Dough', ingredients: ['flour'], steps: ['mix'] }] },
        'llm-calls': [
          {
            purpose: 'normalize',
            model: 'claude-haiku-4-5',
            request: { model: 'claude-haiku-4-5', system: 's', messages: [] },
            response: { content: [], usage: { input_tokens: 1043, output_tokens: 218 } },
          },
        ],
        warnings: [],
        'created-at': new Date().toISOString(),
      },
      raw: {
        'source-kind': 'url',
        'http-status': 200,
        'fetch-tier': 'direct',
        'content-bytes': 49408,
        'raw-content': null,
        'created-at': new Date().toISOString(),
      },
    })
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  authState.current = {
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: () => {},
    logout: () => {},
  };
});
afterEach(() => {
  authState.current = {
    isAuthenticated: false,
    token: undefined,
    userProfile: null,
    login: () => {},
    logout: () => {},
  };
});

function renderPage(slug: string): void {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  rtlRender(
    <ThemeProvider theme={makeTheme(BASE_THEME)}>
      <QueryClientProvider client={qc}>
        <MemoryRouter initialEntries={[`/recipes/${slug}`]}>
          <Routes>
            <Route path="/recipes/:slug" element={<RecipePage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

describe('RecipePage', () => {
  it('renders each section with its ingredients and steps in the raw view', async () => {
    renderPage('layer-cake');
    await screen.findByRole('heading', { name: 'Layer Cake' });
    await userEvent.click(screen.getByRole('button', { name: /raw recipe/i }));
    expect(screen.getByRole('heading', { name: 'Cake' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Frosting' })).toBeInTheDocument();
    expect(screen.getByText('2 cups flour')).toBeInTheDocument();
    expect(screen.getByText('Whip')).toBeInTheDocument();
  });

  it('defaults to the timeline view and switches to shopping and raw', async () => {
    renderPage('layer-cake');
    await screen.findByRole('heading', { name: 'Layer Cake' });
    expect(screen.getByRole('button', { name: /timeline/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    await userEvent.click(screen.getByRole('button', { name: /shopping/i }));
    expect(screen.getByText(/ingredients checked/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /raw recipe/i }));
    expect(screen.getByRole('heading', { name: 'Cake' })).toBeInTheDocument();
  });

  describe('import-lineage strip gating', () => {
    it('shows the strip for a site admin viewing a recipe with a scrape run', async () => {
      authState.current.userProfile = adminProfile;
      renderPage('scraped-buns');
      expect(await screen.findByText(/import lineage/i)).toBeInTheDocument();
    });

    it('hides the strip for a non-admin even when the recipe has a scrape run', async () => {
      authState.current.userProfile = nonAdminProfile;
      renderPage('scraped-buns');
      await screen.findByRole('heading', { name: 'Scraped Buns' });
      expect(screen.queryByText(/import lineage/i)).not.toBeInTheDocument();
    });

    it('hides the strip for an admin viewing a manually-created recipe (no run id)', async () => {
      authState.current.userProfile = adminProfile;
      renderPage('layer-cake');
      await screen.findByRole('heading', { name: 'Layer Cake' });
      expect(screen.queryByText(/import lineage/i)).not.toBeInTheDocument();
    });
  });

  describe('cook timeline', () => {
    it('renders the cook timeline when the recipe has one', async () => {
      renderPage('timed-dish');
      expect(await screen.findByText('Cook Timeline')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Salmon · Prep/ })).toBeInTheDocument();
    });

    it('does not render the timeline for a recipe without one', async () => {
      renderPage('layer-cake');
      await screen.findByRole('heading', { name: 'Layer Cake' });
      expect(screen.queryByText('Cook Timeline')).not.toBeInTheDocument();
    });

    it('does not show the writer hint for an anonymous reader', async () => {
      renderPage('layer-cake');
      await screen.findByRole('heading', { name: 'Layer Cake' });
      expect(
        screen.queryByText('Save this recipe to generate a cook timeline.')
      ).not.toBeInTheDocument();
    });

    it('shows a writer hint for an authenticated user viewing a recipe without a timeline', async () => {
      authState.current.isAuthenticated = true;
      renderPage('layer-cake');
      expect(
        await screen.findByText('Save this recipe to generate a cook timeline.')
      ).toBeInTheDocument();
    });
  });

  describe('wake lock button', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('shows the keep-screen-on button in the header', async () => {
      vi.spyOn(wakeLockHook, 'useWakeLock').mockReturnValue({
        isSupported: true,
        isActive: false,
        toggle: vi.fn(),
      });
      renderPage('layer-cake');
      expect(await screen.findByRole('button', { name: /keep screen on/i })).toBeInTheDocument();
    });
  });
});
