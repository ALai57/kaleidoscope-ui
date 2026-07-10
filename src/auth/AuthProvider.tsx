import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from '@tanstack/react-query';

export interface AuthConfig {
  domain: string;
  clientId: string;
  audience: string;
}

export interface AuthUserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  realm_access?: { roles: string[] };
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | undefined;
  userProfile: AuthUserProfile | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function buildUserProfile(user: Record<string, unknown>): AuthUserProfile {
  const profile: AuthUserProfile = {};
  if (typeof user['given_name'] === 'string') profile.firstName = user['given_name'];
  if (typeof user['family_name'] === 'string') profile.lastName = user['family_name'];
  if (typeof user['email'] === 'string') profile.email = user['email'];
  const ra = user['realm_access'];
  if (ra !== null && typeof ra === 'object' && 'roles' in ra) {
    profile.realm_access = ra as { roles: string[] };
  }
  return profile;
}

interface AuthContextBridgeProps {
  children: React.ReactNode;
}

const AuthContextBridge: React.FC<AuthContextBridgeProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout: auth0Logout, getAccessTokenSilently } =
    useAuth0();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isAuthenticated) {
      setToken(undefined);
      return;
    }
    let cancelled = false;
    getAccessTokenSilently()
      .then((newToken) => {
        if (!cancelled) setToken(newToken);
      })
      .catch(() => {
        if (!cancelled) setToken(undefined);
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, getAccessTokenSilently]);

  // The token resolves asynchronously *after* isAuthenticated flips true (e.g. on
  // the redirect back from Auth0). Any auth-dependent query that fired during that
  // gap fetched anonymously — public data only — and won't refetch on its own,
  // because its queryKey never changed. When the token actually changes, refetch
  // so those queries pick up the content the user has access to. This runs in its
  // own effect — after the token-state commit — so consumers have already
  // re-rendered with the new token in their queryFn closures before we refetch;
  // invalidating inside the token-fetch callback instead would race that re-render
  // and refetch with the stale (tokenless) closure.
  const prevToken = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (token === prevToken.current) return;
    prevToken.current = token;
    void queryClient.invalidateQueries();
  }, [token, queryClient]);

  const userProfile: AuthUserProfile | null = user
    ? buildUserProfile(user as Record<string, unknown>)
    : null;

  const login = useCallback(() => {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname },
    });
  }, [loginWithRedirect]);

  const logout = useCallback(() => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  }, [auth0Logout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, userProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

interface AuthProviderProps {
  authConfig: AuthConfig;
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ authConfig, children }) => {
  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: authConfig.audience,
      }}
    >
      <AuthContextBridge>{children}</AuthContextBridge>
    </Auth0Provider>
  );
};
