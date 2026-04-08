import React from 'react';
import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { Group } from '../types/group';
import GroupsPage from './GroupsPage';

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock('../auth/useKeycloak', () => ({
  useKeycloak: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const mockGroups: Group[] = [
  { group_id: 'g1', display_name: 'Family' },
  { group_id: 'g2', display_name: 'Friends' },
];

let addGroupCalled = false;

const server = setupServer(
  http.get('/groups', () => HttpResponse.json(mockGroups)),
  http.post('/groups', async () => {
    addGroupCalled = true;
    return HttpResponse.json({ group_id: 'g3', display_name: 'New Group' }, { status: 201 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  addGroupCalled = false;
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

describe('GroupsPage', () => {
  it('renders heading', () => {
    render(<GroupsPage />, { wrapper: Wrapper });
    expect(screen.getByText('Groups')).toBeTruthy();
  });

  it('renders groups list', async () => {
    render(<GroupsPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('Family')).toBeTruthy();
      expect(screen.getByText('Friends')).toBeTruthy();
    });
  });

  it('add group button fires mutation', async () => {
    render(<GroupsPage />, { wrapper: Wrapper });

    // Wait for initial load
    await waitFor(() => screen.getByText('Family'));

    const input = screen.getByLabelText(/new group name/i);
    fireEvent.change(input, { target: { value: 'New Group' } });

    const addButton = screen.getByTestId('add-group-button');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(addGroupCalled).toBe(true);
    });
  });
});
