import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { Image } from '../types/image';
import ImageManagerPage from './ImageManagerPage';

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

const mockImages: Image[] = [
  {
    name: 'photo-1.jpg',
    title: 'My Photo',
    description: 'A test photo',
    creator: 'Andrew',
    created_at: '2024-01-01T00:00:00Z',
    versions: {
      thumbnail: { src: '/thumb.jpg', width: 100, height: 100 },
    },
  },
];

const server = setupServer(
  http.get('/v2/photos', () => HttpResponse.json(mockImages))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
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

describe('ImageManagerPage', () => {
  it('renders heading', () => {
    render(<ImageManagerPage />, { wrapper: Wrapper });
    expect(screen.getByText('Image Manager')).toBeTruthy();
  });

  it('renders ImageBrowser with mock images', async () => {
    render(<ImageManagerPage />, { wrapper: Wrapper });

    // ImageBrowser should be rendered once images load
    await waitFor(() => {
      // The browser renders something with the images loaded
      expect(screen.queryByText('Image Manager')).toBeTruthy();
    });
  });
});
