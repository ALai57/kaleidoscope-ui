import React from 'react';
import Box from '@mui/material/Box';
import { AdminNavRail } from './AdminNavRail';
import { AdminTopBar } from './AdminTopBar';
import type { AdminNavItem } from './AdminNavRail';
import type { NavBarUser } from './NavBar';

export interface AdminLayoutProps {
  /** Section title for the top bar. */
  title: string;
  /** Right-aligned top-bar actions (page-specific). */
  actions?: React.ReactNode;
  /** Override the rail's section links (defaults to ADMIN_NAV_ITEMS). */
  navItems?: AdminNavItem[];
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
  children: React.ReactNode;
}

/**
 * The admin/mission-control shell: a persistent nav rail on the left and a slim
 * top bar over the scrollable content. Replaces the public NavBar + the
 * hand-rolled per-page header/nav-button clusters on the admin pages.
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({
  title,
  actions,
  navItems,
  user,
  isAuthenticated,
  login,
  children,
}) => (
  <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
    <AdminNavRail
      {...(navItems ? { items: navItems } : {})}
      user={user}
      isAuthenticated={isAuthenticated}
      login={login}
    />
    <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
      <AdminTopBar title={title} actions={actions} />
      <Box component="main" sx={{ flex: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  </Box>
);
