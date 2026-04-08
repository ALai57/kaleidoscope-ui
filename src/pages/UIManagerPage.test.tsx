import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UIManagerPage from './UIManagerPage';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

// useColorScheme is from MUI — mock it since jsdom doesn't support CSS vars
vi.mock('@mui/material/styles', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material/styles')>();
  return {
    ...actual,
    useColorScheme: () => ({ mode: 'light', setMode: vi.fn() }),
  };
});

let saveThemeCalled = false;

const server = setupServer(
  http.get('/themes', () =>
    HttpResponse.json([
      { id: 'theme-1', display_name: 'Default', config: { hue: 217, saturation: 65, lightness: 40, angle: 103, theta: 45 } },
    ])
  ),
  http.put('/themes/:id', async () => {
    saveThemeCalled = true;
    return new HttpResponse(null, { status: 204 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  saveThemeCalled = false;
});
afterAll(() => server.close());

// ── Helpers ────────────────────────────────────────────────────────────────

const theme = createTheme();

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('UIManagerPage', () => {
  it('renders heading', () => {
    render(<UIManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('UI Manager')).toBeTruthy();
  });

  it('renders dark mode toggle', () => {
    render(<UIManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('Dark mode')).toBeTruthy();
  });

  it('renders save theme button', () => {
    render(<UIManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('Save theme')).toBeTruthy();
  });

  it('save theme button fires mutation', async () => {
    render(<UIManagerPage />, { wrapper: Wrapper });

    // Wait for themes to load
    await waitFor(() => screen.getByText('Save theme'));

    fireEvent.click(screen.getByText('Save theme'));

    await waitFor(() => {
      expect(saveThemeCalled).toBe(true);
    });
  });
});
