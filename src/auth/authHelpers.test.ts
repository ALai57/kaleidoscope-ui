import { afterEach, describe, expect, it, vi } from 'vitest';
import { getAdminHost, getAdminRole, isSiteAdmin } from './authHelpers';

describe('getAdminHost', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the hostname for a normal host', () => {
    vi.stubGlobal('window', {
      location: { host: 'andrewslai.com', hostname: 'andrewslai.com' },
    });
    expect(getAdminHost()).toBe('andrewslai.com');
  });

  it('returns "ephemeral" for fly.dev preview hosts', () => {
    vi.stubGlobal('window', {
      location: { host: 'kaleidoscope-pr-12.fly.dev', hostname: 'kaleidoscope-pr-12.fly.dev' },
    });
    expect(getAdminHost()).toBe('ephemeral');
  });
});

describe('getAdminRole', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('appends the admin suffix to the current host', () => {
    vi.stubGlobal('window', {
      location: { host: 'andrewslai.com', hostname: 'andrewslai.com' },
    });
    expect(getAdminRole()).toBe('andrewslai.com:admin');
  });
});

describe('isSiteAdmin', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const stubHost = (host: string) =>
    vi.stubGlobal('window', { location: { host, hostname: host } });

  it('is true when the user holds the admin role for the current host', () => {
    stubHost('andrewslai.com');
    expect(isSiteAdmin({ realm_access: { roles: ['andrewslai.com:admin'] } })).toBe(true);
  });

  it('is false when the user holds only another host\'s admin role', () => {
    stubHost('andrewslai.com');
    expect(isSiteAdmin({ realm_access: { roles: ['caheriaguilar.com:admin'] } })).toBe(false);
  });

  it('is false for a user with no roles', () => {
    stubHost('andrewslai.com');
    expect(isSiteAdmin({ realm_access: { roles: [] } })).toBe(false);
  });

  it('is false for null/undefined user', () => {
    stubHost('andrewslai.com');
    expect(isSiteAdmin(null)).toBe(false);
    expect(isSiteAdmin(undefined)).toBe(false);
  });
});
