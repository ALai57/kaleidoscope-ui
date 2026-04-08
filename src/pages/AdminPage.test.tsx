import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AdminPage from './AdminPage';

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockKeycloak = {
  isAuthenticated: false as boolean,
  token: undefined as string | undefined,
  userProfile: null as { firstName?: string; lastName?: string } | null,
  login: vi.fn(),
  logout: vi.fn(),
};

vi.mock('../auth/useKeycloak', () => ({
  useKeycloak: () => mockKeycloak,
}));

const theme = createTheme();

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </MemoryRouter>
);

// ── Tests ──────────────────────────────────────────────────────────────────

describe('AdminPage — unauthenticated', () => {
  beforeEach(() => {
    mockKeycloak.isAuthenticated = false;
    mockKeycloak.userProfile = null;
  });

  it('renders login panel when unauthenticated', () => {
    render(<AdminPage />, { wrapper: Wrapper });
    expect(screen.getByTestId('login-panel')).toBeTruthy();
  });

  it('shows login button', () => {
    render(<AdminPage />, { wrapper: Wrapper });
    expect(screen.getByText(/login/i)).toBeTruthy();
  });
});

describe('AdminPage — authenticated', () => {
  beforeEach(() => {
    mockKeycloak.isAuthenticated = true;
    mockKeycloak.userProfile = { firstName: 'Alice', lastName: 'Smith' };
  });

  it('renders admin panel when authenticated', () => {
    render(<AdminPage />, { wrapper: Wrapper });
    expect(screen.getByTestId('admin-panel')).toBeTruthy();
  });

  it('shows welcome message with user name', () => {
    render(<AdminPage />, { wrapper: Wrapper });
    expect(screen.getByText(/welcome alice smith/i)).toBeTruthy();
  });
});
