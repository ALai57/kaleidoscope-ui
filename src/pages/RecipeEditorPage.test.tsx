import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render as rtlRender, screen, waitFor, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { makeTheme, BASE_THEME } from '../theme';
import RecipeEditorPage from './RecipeEditorPage';

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

let createdBody: Record<string, unknown> | null = null;

const EXISTING_RECIPE = {
  id: 'e019690d',
  'recipe-url': 'wip-chilaquiles',
  hostname: 'andrewslai.com',
  content: {
    title: 'WIP Chilaquiles',
    sections: [
      {
        name: 'Salsa',
        steps: ['peel and clean tomatillos', 'boil the tomatillos'],
        ingredients: ['12 medium tomatillos', '1 jalapenos'],
      },
    ],
    servings: null,
    'cook-time-minutes': null,
    'prep-time-minutes': null,
  },
  'original-content': null,
  labels: [],
  'source-url': null,
  author: 'andrew.s.lai5@gmail.com',
  'public-visibility': false,
  'created-at': '2026-07-12T23:50:29Z',
  'modified-at': '2026-07-13T01:15:42Z',
};

const server = setupServer(
  http.get('/recipe-labels', () => HttpResponse.json([])),
  http.get('/groups', () => HttpResponse.json([])),
  http.get('/recipes/wip-chilaquiles', () => HttpResponse.json(EXISTING_RECIPE)),
  http.post('/recipes/scrape', () =>
    HttpResponse.json({
      recipe: {
        title: 'Imported Stew',
        sections: [{ name: null, ingredients: ['carrots', 'beef'], steps: ['Simmer'] }],
        servings: '4',
        prep_time_minutes: 10,
        cook_time_minutes: 120,
      },
      suggested_labels: ['comfort'],
      extraction_method: 'json-ld',
      warnings: [],
    })
  ),
  http.post('/recipes', async ({ request }) => {
    createdBody = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ id: 'r9', recipe_url: 'imported-stew', ...createdBody });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  createdBody = null;
});
afterAll(() => server.close());

function renderNew(): void {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={['/recipes/new']}>
        <Routes>
          <Route path="/recipes/new" element={<RecipeEditorPage />} />
          <Route path="/recipes/:slug" element={<div>Recipe detail</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

// Renders the editor at /recipes/:slug/edit with the recipe already in the
// query cache, mirroring a click on "Edit" from the recipe view page (both use
// the ['recipe', slug] key, so the data is a synchronous cache hit).
function renderEditWithCache(): void {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  qc.setQueryData(['recipe', 'wip-chilaquiles'], {
    id: 'e019690d',
    recipe_url: 'wip-chilaquiles',
    hostname: 'andrewslai.com',
    content: {
      title: 'WIP Chilaquiles',
      sections: [
        {
          name: 'Salsa',
          steps: ['peel and clean tomatillos', 'boil the tomatillos'],
          ingredients: ['12 medium tomatillos', '1 jalapenos'],
        },
      ],
      servings: null,
      cook_time_minutes: null,
      prep_time_minutes: null,
    },
    original_content: null,
    labels: [],
    source_url: null,
    author: 'andrew.s.lai5@gmail.com',
    public_visibility: false,
    created_at: '2026-07-12T23:50:29Z',
    modified_at: '2026-07-13T01:15:42Z',
  });
  render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={['/recipes/wip-chilaquiles/edit']}>
        <Routes>
          <Route path="/recipes/:slug/edit" element={<RecipeEditorPage />} />
          <Route path="/recipes/:slug" element={<div>Recipe detail</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

// local render (we supply our own router + routes, so no testUtils MemoryRouter)
function render(ui: React.ReactElement): void {
  const theme = makeTheme(BASE_THEME);
  rtlRender(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('RecipeEditorPage', () => {
  it('loads an existing recipe into the form when its data is already cached', async () => {
    renderEditWithCache();

    await waitFor(() => expect(screen.getByLabelText('Title')).toHaveValue('WIP Chilaquiles'));
    expect(screen.getByDisplayValue('peel and clean tomatillos')).toBeInTheDocument();
    expect(screen.getByDisplayValue('12 medium tomatillos')).toBeInTheDocument();
  });

  it('imports a URL whose scraped recipe has no sections without crashing', async () => {
    server.use(
      http.post('/recipes/scrape', () =>
        HttpResponse.json({
          // backend can omit `sections` when extraction yields none
          recipe: { title: 'Sectionless Soup', servings: '2' },
          suggested_labels: [],
          extraction_method: 'llm',
          warnings: [],
        })
      )
    );
    renderNew();

    fireEvent.change(screen.getByLabelText('Import from URL'), {
      target: { value: 'http://example.com/soup' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Import' }));

    await waitFor(() => expect(screen.getByLabelText('Title')).toHaveValue('Sectionless Soup'));
    expect(screen.getByLabelText('Servings')).toHaveValue('2');
  });

  it('imports a URL, populates the form, and saves the draft as content + original_content', async () => {
    renderNew();

    fireEvent.change(screen.getByLabelText('Import from URL'), {
      target: { value: 'http://example.com/stew' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Import' }));

    // form populates from the scraped draft
    await waitFor(() => expect(screen.getByLabelText('Title')).toHaveValue('Imported Stew'));
    expect(screen.getByLabelText('Servings')).toHaveValue('4');
    expect(screen.getByDisplayValue('carrots')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => expect(screen.getByText('Recipe detail')).toBeInTheDocument());
    expect(createdBody).toMatchObject({
      content: { title: 'Imported Stew' },
      // the scraped draft is preserved as the immutable original
      'original-content': { title: 'Imported Stew' },
    });
  });
});
