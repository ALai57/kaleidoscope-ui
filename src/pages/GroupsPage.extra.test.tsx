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

vi.mock('../auth/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: true,
    token: 'test-token',
    userProfile: { firstName: 'Admin' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

const mockGroups: Group[] = [
  { group_id: 'g1', display_name: 'Family' },
];

let deleteGroupCalled = false;
let addMemberCalled = false;

const server = setupServer(
  http.get('/groups', () => HttpResponse.json(mockGroups)),
  http.post('/groups', () =>
    HttpResponse.json({ group_id: 'g2', display_name: 'New' }, { status: 201 })
  ),
  http.delete('/groups/:id', async () => {
    deleteGroupCalled = true;
    return new HttpResponse(null, { status: 204 });
  }),
  http.post('/groups/:id/members', async () => {
    addMemberCalled = true;
    return new HttpResponse(null, { status: 201 });
  }),
  http.delete('/groups/:id/members/:memberId', async () => {
    return new HttpResponse(null, { status: 204 });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  deleteGroupCalled = false;
  addMemberCalled = false;
});
afterAll(() => server.close());

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

describe('GroupsPage — additional branch coverage', () => {
  it('shows group count chip', async () => {
    render(<GroupsPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText('1 group')).toBeTruthy();
    });
  });

  it('delete group button fires delete mutation after confirmation', async () => {
    render(<GroupsPage />, { wrapper: Wrapper });

    // Wait for groups to load
    await waitFor(() => screen.getByText('Family'));

    // Expand the accordion to reveal the Delete Group button
    fireEvent.click(screen.getByText('Family'));

    // Click Delete Group button (now inside AccordionDetails)
    const deleteButton = await screen.findByRole('button', { name: /delete group/i });
    fireEvent.click(deleteButton);

    // Confirm in the dialog
    const confirmButton = await screen.findByRole('button', { name: /^delete$/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteGroupCalled).toBe(true);
    });
  });

  it('add member fires mutation when email provided', async () => {
    render(<GroupsPage />, { wrapper: Wrapper });
    await waitFor(() => screen.getByText('Family'));

    // Click accordion to expand
    const accordionSummary = screen.getByText('Family');
    fireEvent.click(accordionSummary);

    await waitFor(() => {
      const emailInput = screen.getByLabelText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    });

    const addMemberButton = screen.getByRole('button', { name: /add member/i });
    fireEvent.click(addMemberButton);

    await waitFor(() => {
      expect(addMemberCalled).toBe(true);
    });
  });

  it('add group button is disabled when name is empty', () => {
    render(<GroupsPage />, { wrapper: Wrapper });
    const addButton = screen.getByTestId('add-group-button');
    expect(addButton).toBeDisabled();
  });
});
