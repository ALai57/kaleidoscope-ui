import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, AuthContext } from './AuthProvider';
import type { AuthContextValue } from './AuthProvider';

const mockLoginWithRedirect = vi.fn();
const mockLogout = vi.fn();
const mockGetAccessTokenSilently = vi.fn();

vi.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth0: () => ({
    isAuthenticated: mockIsAuthenticated,
    isLoading: false,
    user: mockUser,
    loginWithRedirect: mockLoginWithRedirect,
    logout: mockLogout,
    getAccessTokenSilently: mockGetAccessTokenSilently,
  }),
}));

let mockIsAuthenticated = false;
let mockUser: Record<string, unknown> | undefined = undefined;

const authConfig = {
  domain: 'test.auth0.com',
  clientId: 'test-client-id',
  audience: 'https://test-api',
};

const TestConsumer: React.FC = () => {
  const ctx = React.useContext(AuthContext) as AuthContextValue;
  return (
    <div>
      <span data-testid="auth">{ctx.isAuthenticated ? 'authenticated' : 'unauthenticated'}</span>
      <span data-testid="token">{ctx.token ?? 'no-token'}</span>
      <span data-testid="email">{ctx.userProfile?.email ?? 'no-email'}</span>
      <span data-testid="roles">{ctx.userProfile?.realm_access?.roles.join(',') ?? 'no-roles'}</span>
      <button onClick={ctx.login}>login</button>
      <button onClick={ctx.logout}>logout</button>
    </div>
  );
};

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsAuthenticated = false;
    mockUser = undefined;
    mockGetAccessTokenSilently.mockResolvedValue('test-token');
  });

  it('starts as unauthenticated when Auth0 reports not authenticated', () => {
    mockIsAuthenticated = false;

    render(
      <AuthProvider authConfig={authConfig}>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth').textContent).toBe('unauthenticated');
    expect(screen.getByTestId('token').textContent).toBe('no-token');
  });

  it('becomes authenticated and exposes token when Auth0 reports authenticated', async () => {
    mockIsAuthenticated = true;
    mockUser = { email: 'a@b.com', given_name: 'Alice', family_name: 'Smith' };

    render(
      <AuthProvider authConfig={authConfig}>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth').textContent).toBe('authenticated');
      expect(screen.getByTestId('token').textContent).toBe('test-token');
    });
  });

  it('exposes userProfile with email and realm_access roles', async () => {
    mockIsAuthenticated = true;
    mockUser = {
      email: 'user@example.com',
      given_name: 'Bob',
      family_name: 'Jones',
      realm_access: { roles: ['andrewslai:admin'] },
    };

    render(
      <AuthProvider authConfig={authConfig}>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('email').textContent).toBe('user@example.com');
      expect(screen.getByTestId('roles').textContent).toBe('andrewslai:admin');
    });
  });

  it('calls loginWithRedirect when login() is invoked', async () => {
    mockIsAuthenticated = false;

    render(
      <AuthProvider authConfig={authConfig}>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('login'));
    });

    expect(mockLoginWithRedirect).toHaveBeenCalledOnce();
  });

  it('calls auth0Logout when logout() is invoked', async () => {
    mockIsAuthenticated = false;

    render(
      <AuthProvider authConfig={authConfig}>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('logout'));
    });

    expect(mockLogout).toHaveBeenCalledOnce();
  });
});
