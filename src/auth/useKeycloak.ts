import { useContext } from 'react';
import { KeycloakContext } from './KeycloakProvider';
import type { KeycloakContextValue } from './KeycloakProvider';

export function useKeycloak(): KeycloakContextValue {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }
  return context;
}
