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
  http.get('/recipes/paella', () =>
    HttpResponse.json({
      id: 'r3',
      recipe_url: 'paella',
      hostname: 'andrewslai.com',
      content: {
        title: 'Spanish Vegan Paella',
        sections: [{ name: 'Base', ingredients: ['rice'], steps: ['cook'] }],
        servings: '5',
        prep_time_minutes: 15,
        cook_time_minutes: 30,
      },
      labels: [{ id: 'l1', name: 'main-meal', group_id: 'g1', group_name: 'meal' }],
      source_url: 'https://veganhuggs.com/vegetable-paella-recipe/#recipe',
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
              {
                id: 'Salmon/Prep',
                label: 'Prep',
                kind: 'active',
                steps: [0, 1],
                estimate: 10,
                deps: [],
                start: 0,
              },
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
        facts: {
          title: 'Scraped Buns',
          ingredients: ['flour'],
          steps: ['mix'],
          'section-signals': [],
          labels: [],
        },
        content: {
          title: 'Scraped Buns',
          sections: [{ name: 'Dough', ingredients: ['flour'], steps: ['mix'] }],
        },
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
      // The eyebrow heading is gone (the "Timeline" tab already names the view);
      // the timeline's presence is the bar + the Full method column.
      expect(await screen.findByRole('button', { name: /Salmon · Prep/ })).toBeInTheDocument();
      expect(screen.getByText('Full method')).toBeInTheDocument();
    });

    it('does not render the timeline for a recipe without one', async () => {
      renderPage('layer-cake');
      await screen.findByRole('heading', { name: 'Layer Cake' });
      expect(screen.queryByText('Full method')).not.toBeInTheDocument();
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

  describe('checked ingredients shared across views', () => {
    it('keeps an ingredient checked when switching away from Shopping and back', async () => {
      renderPage('layer-cake');
      await screen.findByRole('heading', { name: 'Layer Cake' });
      await userEvent.click(screen.getByRole('button', { name: /shopping/i }));

      expect(screen.getByText(/0\s*\/\s*2/)).toBeInTheDocument();
      await userEvent.click(screen.getByLabelText('2 cups flour'));
      expect(screen.getByText(/1\s*\/\s*2/)).toBeInTheDocument();

      // Switching views unmounts ShoppingList — the checked Set must live in
      // RecipePage, not the view, for it to survive the round trip.
      await userEvent.click(screen.getByRole('button', { name: /raw recipe/i }));
      await screen.findByRole('heading', { name: 'Cake' });
      await userEvent.click(screen.getByRole('button', { name: /shopping/i }));

      expect(screen.getByLabelText('2 cups flour')).toBeChecked();
      expect(screen.getByText(/1\s*\/\s*2/)).toBeInTheDocument();
    });
  });

  describe('wake lock overlay', () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('mounts the floating keep-screen-on control when supported', async () => {
      vi.spyOn(wakeLockHook, 'useWakeLock').mockReturnValue({
        isSupported: true,
        isActive: false,
        toggle: vi.fn(),
      });
      renderPage('layer-cake');
      expect(await screen.findByRole('button', { name: /keep screen on/i })).toBeInTheDocument();
    });
  });

  describe('header (proposal B)', () => {
    it('shows serves, prep, cook and a computed total on the header line', async () => {
      renderPage('paella');
      await screen.findByRole('heading', { name: 'Spanish Vegan Paella' });
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('15m')).toBeInTheDocument();
      expect(screen.getByText('30m')).toBeInTheDocument();
      // Total = prep + cook, which the old header never computed.
      expect(screen.getByText('45m')).toBeInTheDocument();
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });

    it('keeps the raw source URL and category chip out of the header', async () => {
      renderPage('paella');
      await screen.findByRole('heading', { name: 'Spanish Vegan Paella' });
      // Source is behind the overflow menu now, not printed in full on the page.
      expect(
        screen.queryByText('https://veganhuggs.com/vegetable-paella-recipe/#recipe')
      ).not.toBeInTheDocument();
      // Category only appears once the menu is opened.
      expect(screen.queryByText('meal/main-meal')).not.toBeInTheDocument();
    });

    it('collapses edit, source and category into the overflow menu for an author', async () => {
      authState.current.isAuthenticated = true;
      renderPage('paella');
      await screen.findByRole('heading', { name: 'Spanish Vegan Paella' });
      // No standalone Edit control on the page — it lives in the menu.
      expect(screen.queryByRole('link', { name: /^edit$/i })).not.toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /recipe options/i }));
      expect(screen.getByRole('menuitem', { name: /edit recipe/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /view source/i })).toBeInTheDocument();
      expect(screen.getByText('meal/main-meal')).toBeInTheDocument();
    });

    it('omits the edit action from the menu for an anonymous reader', async () => {
      renderPage('paella');
      await screen.findByRole('heading', { name: 'Spanish Vegan Paella' });
      await userEvent.click(screen.getByRole('button', { name: /recipe options/i }));
      expect(screen.queryByRole('menuitem', { name: /edit recipe/i })).not.toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /view source/i })).toBeInTheDocument();
    });
  });
});
