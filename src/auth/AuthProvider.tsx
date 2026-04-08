import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

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
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isAuthenticated) {
      setToken(undefined);
      return;
    }
    getAccessTokenSilently().then(setToken).catch(() => setToken(undefined));
  }, [isAuthenticated, getAccessTokenSilently]);

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
