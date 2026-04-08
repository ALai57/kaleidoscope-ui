import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import Keycloak from 'keycloak-js';
import type { KeycloakProfile } from 'keycloak-js';

export interface AuthConfig {
  url: string;
  realm: string;
  clientId: string;
}

export interface KeycloakContextValue {
  isAuthenticated: boolean;
  token: string | undefined;
  userProfile: KeycloakProfile | null;
  login: () => void;
  logout: () => void;
  /**
   * Returns the current Keycloak instance. Intended for advanced use only
   * (e.g. checking raw token claims). Do not call during render.
   */
  getKeycloakInstance: () => Keycloak | null;
}

export const KeycloakContext = createContext<KeycloakContextValue | null>(null);

interface KeycloakProviderProps {
  authConfig: AuthConfig;
  children: React.ReactNode;
}

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ authConfig, children }) => {
  // Stable ref — accessed only in callbacks, never during render
  const keycloakRef = useRef<Keycloak | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<KeycloakProfile | null>(null);

  useEffect(() => {
    const kc = new Keycloak({
      url: authConfig.url,
      realm: authConfig.realm,
      clientId: authConfig.clientId,
    });

    keycloakRef.current = kc;

    kc.onTokenExpired = () => {
      kc.updateToken(30).catch(() => {
        // Failed to refresh — silently ignore
      });
    };

    kc
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
        pkceMethod: 'S256',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        setIsAuthenticated(authenticated);
        setToken(kc.token);

        if (authenticated) {
          kc.loadUserProfile().then((profile) => {
            setUserProfile(profile);
          });
        }
      });
  }, [authConfig.url, authConfig.realm, authConfig.clientId]);

  const login = useCallback(() => {
    keycloakRef.current?.login({
      redirectUri: `${window.location.protocol}//${window.location.host}`,
    });
  }, []);

  const logout = useCallback(() => {
    keycloakRef.current?.logout();
  }, []);

  const getKeycloakInstance = useCallback(() => keycloakRef.current, []);

  return (
    <KeycloakContext.Provider
      value={{
        isAuthenticated,
        token,
        userProfile,
        login,
        logout,
        getKeycloakInstance,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
