import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeycloakProvider, KeycloakContext } from './KeycloakProvider';
import type { KeycloakContextValue } from './KeycloakProvider';

const mockLogin = vi.fn();
const mockLogout = vi.fn();
const mockLoadUserProfile = vi.fn();
const mockUpdateToken = vi.fn();
const mockInit = vi.fn();

// Mock keycloak-js with a class-like constructor
vi.mock('keycloak-js', () => {
  function MockKeycloak(this: Record<string, unknown>) {
    this.login = mockLogin;
    this.logout = mockLogout;
    this.loadUserProfile = mockLoadUserProfile;
    this.updateToken = mockUpdateToken;
    this.init = mockInit;
    this.token = undefined;
    this.onTokenExpired = undefined;
  }
  return { default: MockKeycloak };
});

const authConfig = { url: 'http://localhost:8080', realm: 'test', clientId: 'test-login' };

const TestConsumer: React.FC = () => {
  const ctx = React.useContext(KeycloakContext) as KeycloakContextValue;
  return (
    <div>
      <span data-testid="auth">{ctx.isAuthenticated ? 'authenticated' : 'unauthenticated'}</span>
      <span data-testid="token">{ctx.token ?? 'no-token'}</span>
      <button onClick={ctx.login}>login</button>
      <button onClick={ctx.logout}>logout</button>
    </div>
  );
};

describe('KeycloakProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoadUserProfile.mockResolvedValue({ sub: 'u1', email: 'a@b.com' });
    mockUpdateToken.mockResolvedValue(true);
  });

  it('starts as unauthenticated before init completes', () => {
    // init never resolves
    mockInit.mockReturnValue(new Promise(() => {}));

    render(
      <KeycloakProvider authConfig={authConfig}>
        <TestConsumer />
      </KeycloakProvider>
    );

    expect(screen.getByTestId('auth').textContent).toBe('unauthenticated');
  });

  it('becomes authenticated after init resolves with true', async () => {
    mockInit.mockResolvedValue(true);

    render(
      <KeycloakProvider authConfig={authConfig}>
        <TestConsumer />
      </KeycloakProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth').textContent).toBe('authenticated');
    });
  });

  it('stays unauthenticated when init resolves with false', async () => {
    mockInit.mockResolvedValue(false);

    render(
      <KeycloakProvider authConfig={authConfig}>
        <TestConsumer />
      </KeycloakProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth').textContent).toBe('unauthenticated');
    });
  });

  it('calls keycloak.login() when login() is invoked', async () => {
    mockInit.mockResolvedValue(false);

    render(
      <KeycloakProvider authConfig={authConfig}>
        <TestConsumer />
      </KeycloakProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('login'));
    });

    expect(mockLogin).toHaveBeenCalledOnce();
  });

  it('calls keycloak.logout() when logout() is invoked', async () => {
    mockInit.mockResolvedValue(false);

    render(
      <KeycloakProvider authConfig={authConfig}>
        <TestConsumer />
      </KeycloakProvider>
    );

    await act(async () => {
      await userEvent.click(screen.getByText('logout'));
    });

    expect(mockLogout).toHaveBeenCalledOnce();
  });
});
