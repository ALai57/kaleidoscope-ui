import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
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

function renderWithProviders(ui: React.ReactNode, client?: QueryClient) {
  const queryClient =
    client ?? new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider authConfig={authConfig}>{ui}</AuthProvider>
    </QueryClientProvider>
  );
}

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

    renderWithProviders(<TestConsumer />);

    expect(screen.getByTestId('auth').textContent).toBe('unauthenticated');
    expect(screen.getByTestId('token').textContent).toBe('no-token');
  });

  it('becomes authenticated and exposes token when Auth0 reports authenticated', async () => {
    mockIsAuthenticated = true;
    mockUser = { email: 'a@b.com', given_name: 'Alice', family_name: 'Smith' };

    renderWithProviders(<TestConsumer />);

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

    renderWithProviders(<TestConsumer />);

    await waitFor(() => {
      expect(screen.getByTestId('email').textContent).toBe('user@example.com');
      expect(screen.getByTestId('roles').textContent).toBe('andrewslai:admin');
    });
  });

  it('calls loginWithRedirect when login() is invoked', async () => {
    mockIsAuthenticated = false;

    renderWithProviders(<TestConsumer />);

    await act(async () => {
      await userEvent.click(screen.getByText('login'));
    });

    expect(mockLoginWithRedirect).toHaveBeenCalledOnce();
  });

  it('calls auth0Logout when logout() is invoked', async () => {
    mockIsAuthenticated = false;

    renderWithProviders(<TestConsumer />);

    await act(async () => {
      await userEvent.click(screen.getByText('logout'));
    });

    expect(mockLogout).toHaveBeenCalledOnce();
  });

  // Regression: on the redirect back from login, isAuthenticated flips true before
  // the token resolves. An auth-dependent query that fires during that gap fetches
  // anonymously (public data only) and — because its queryKey never changes — will
  // not refetch on its own. The provider must invalidate the cache once the token
  // arrives so the query refetches the content the user has access to.
  it('refetches auth-dependent queries once the token resolves after login', async () => {
    mockIsAuthenticated = true;
    mockUser = { email: 'a@b.com' };

    // Defer the token to reproduce the async gap between auth and token.
    let resolveToken: (t: string) => void = () => {};
    mockGetAccessTokenSilently.mockReturnValue(
      new Promise<string>((res) => {
        resolveToken = res;
      })
    );

    const ArticlesConsumer: React.FC = () => {
      const ctx = React.useContext(AuthContext) as AuthContextValue;
      const { data = [] } = useQuery({
        queryKey: ['articles'],
        // Mirrors real pages: the token lives in the queryFn closure, not the key.
        queryFn: () => Promise.resolve(ctx.token ? ['private', 'public'] : ['public']),
      });
      return <span data-testid="articles">{data.join(',')}</span>;
    };

    renderWithProviders(<ArticlesConsumer />);

    // Query fired during the auth gap → anonymous result, public only.
    await waitFor(() => {
      expect(screen.getByTestId('articles').textContent).toBe('public');
    });

    // Token arrives; the cache invalidation should refetch with it available.
    await act(async () => {
      resolveToken('test-token');
    });

    await waitFor(() => {
      expect(screen.getByTestId('articles').textContent).toBe('private,public');
    });
  });

  // Same race, but the first (tokenless) request is still *in flight* when the
  // token arrives — the real "type andrewslai.com" case. A bare cache
  // invalidation is deduped against the in-flight fetch and gets swallowed, so
  // the query resolves once with public-only data and never refetches.
  it('refetches when the token arrives while the initial fetch is in flight', async () => {
    mockIsAuthenticated = true;
    mockUser = { email: 'a@b.com' };

    let resolveToken: (t: string) => void = () => {};
    mockGetAccessTokenSilently.mockReturnValue(
      new Promise<string>((res) => {
        resolveToken = res;
      })
    );

    // Each article fetch captures the token it saw and blocks until we resolve it
    // by hand, so we can hold the first fetch open across the token's arrival.
    const pending: Array<{ token: string | undefined; resolve: (v: string[]) => void }> = [];
    const ArticlesConsumer: React.FC = () => {
      const ctx = React.useContext(AuthContext) as AuthContextValue;
      const { data = [] } = useQuery({
        queryKey: ['articles'],
        queryFn: () =>
          new Promise<string[]>((resolve) => {
            pending.push({ token: ctx.token, resolve });
          }),
      });
      return <span data-testid="articles">{data.join(',')}</span>;
    };

    renderWithProviders(<ArticlesConsumer />);

    // First fetch is in flight, tokenless.
    await waitFor(() => expect(pending).toHaveLength(1));
    expect(pending[0]!.token).toBeUndefined();

    // Token resolves *before* that fetch settles, then the tokenless fetch
    // completes with public-only data.
    await act(async () => {
      resolveToken('test-token');
    });
    await act(async () => {
      pending[0]!.resolve(['public']);
    });

    // The fix must drive a fresh fetch that now sees the token.
    await waitFor(() => expect(pending).toHaveLength(2));
    expect(pending[1]!.token).toBe('test-token');
    await act(async () => {
      pending[1]!.resolve(['private', 'public']);
    });

    await waitFor(() => {
      expect(screen.getByTestId('articles').textContent).toBe('private,public');
    });
  });
});
