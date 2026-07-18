import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { PrismThemeProvider } from '../prism';
import { AdminNavRail } from './AdminNavRail';
import { AdminTopBar } from './AdminTopBar';
import { AdminMobileDrawer } from './AdminMobileDrawer';
import { useIsMobile } from '@/hooks/useIsMobile';
import type { AdminNavItem } from './AdminNavRail';
import type { NavBarUser } from './navTypes';

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
  /**
   * Skip the built-in Prism theming so the shell renders under the *live* app
   * theme instead of the static Prism one. Used by the theme workbench (UI
   * Manager) so edits to color/preset/mode preview in place; every other admin
   * page keeps the fixed Prism chrome (the default).
   */
  disablePrismTheme?: boolean;
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
  disablePrismTheme = false,
  children,
}) => {
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (isMobile) {
    const mobileShell = (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
        <Box inert={drawerOpen || undefined} sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <AdminTopBar title={title} actions={actions} onMenuClick={() => setDrawerOpen(true)} />
          <Box component="main" sx={{ flex: 1, p: 2 }}>
            {children}
          </Box>
        </Box>
        <AdminMobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          {...(navItems ? { items: navItems } : {})}
          user={user}
          isAuthenticated={isAuthenticated}
          login={login}
        />
      </Box>
    );
    return disablePrismTheme ? mobileShell : <PrismThemeProvider>{mobileShell}</PrismThemeProvider>;
  }

  const shell = (
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

  return disablePrismTheme ? shell : <PrismThemeProvider>{shell}</PrismThemeProvider>;
};
