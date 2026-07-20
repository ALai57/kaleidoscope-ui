import React from 'react';
import Box from '@mui/material/Box';
import { PrismThemeProvider } from '../prism';
import { AdminTopBar } from './AdminTopBar';
import type { NavBarUser } from './navTypes';

export interface AdminLayoutProps {
  /** Section title for the top bar. */
  title: string;
  /** Right-aligned top-bar actions (page-specific). */
  actions?: React.ReactNode;
  /**
   * Skip the built-in Prism theming so the content renders under the *live* app
   * theme (used by the UI Manager theme workbench so edits preview in place).
   */
  disablePrismTheme?: boolean;
  children: React.ReactNode;
  /**
   * @deprecated Navigation now lives in the shared shell (AppShell → SideRail /
   * MobileNav). These props are unused here and kept only so existing call
   * sites still typecheck; they are removed in a follow-up task.
   */
  user?: NavBarUser | undefined;
  /** @deprecated see `user` */
  isAuthenticated?: boolean | undefined;
  /** @deprecated see `user` */
  login?: (() => void) | undefined;
}

/**
 * The admin content column: a slim top bar over the scrollable page body, on a
 * Prism (dark) canvas. Navigation now lives in the shared shell (AppShell →
 * SideRail / MobileNav); this component owns only the section chrome.
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, actions, disablePrismTheme = false, children }) => {
  const content = (
    <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <AdminTopBar title={title} actions={actions} />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        {children}
      </Box>
    </Box>
  );
  return disablePrismTheme ? content : <PrismThemeProvider>{content}</PrismThemeProvider>;
};
