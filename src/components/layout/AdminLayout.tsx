import React from 'react';
import Box from '@mui/material/Box';
import { AdminTopBar } from './AdminTopBar';

export interface AdminLayoutProps {
  /** Section title for the top bar. */
  title: string;
  /** Right-aligned top-bar actions (page-specific). */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * The admin content column: a slim top bar over the scrollable page body.
 * Renders under the *ambient* app theme, so Studio pages obey the global
 * color mode (the dark-mode toggle) and preset exactly like the reader pages.
 * Navigation lives in the shared shell (AppShell → SideRail / MobileNav); this
 * component owns only the section chrome.
 */
export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, actions, children }) => (
  <Box sx={{ minHeight: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
    <AdminTopBar title={title} actions={actions} />
    <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
      {children}
    </Box>
  </Box>
);
