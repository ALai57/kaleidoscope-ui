import { describe, it, expect } from 'vitest';
import { STUDIO_NAV_ITEMS, visibleStudioItems } from './navConfig';
import type { NavBarUser } from './navTypes';

const withRoles = (...roles: string[]): NavBarUser => ({ realm_access: { roles } });

describe('navConfig', () => {
  it('hides Studio from anon and role-less users', () => {
    expect(visibleStudioItems(undefined)).toEqual([]);
    expect(visibleStudioItems(withRoles())).toEqual([]);
  });

  it('shows only writer-tier (content) items to a writer', () => {
    // authHelpers derives roles from the host; use the localhost admin/writer role names.
    const items = visibleStudioItems(withRoles('localhost:writer'));
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((i) => i.minRole === 'writer')).toBe(true);
    expect(items.map((i) => i.label)).toContain('Articles');
    expect(items.map((i) => i.label)).not.toContain('Agents'); // admin-tier
  });

  it('shows every item to an admin', () => {
    const items = visibleStudioItems(withRoles('localhost:admin'));
    expect(items).toHaveLength(STUDIO_NAV_ITEMS.length);
    expect(items.map((i) => i.label)).toContain('Agents');
  });

  it('has unique routes and labels', () => {
    const routes = STUDIO_NAV_ITEMS.map((i) => i.to);
    const labels = STUDIO_NAV_ITEMS.map((i) => i.label);
    expect(new Set(routes).size).toBe(routes.length);
    expect(new Set(labels).size).toBe(labels.length);
  });
});
