import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { SideRail } from './SideRail';
import { useAuth } from '@/auth/useAuth';

/**
 * Layout route for the garden's inner pages: the persistent Prism SideRail plus
 * the routed page content. Replaces the per-page top NavBar. Landing routes
 * (`/`, `/home`) are intentionally NOT wrapped by this shell — the hero is their
 * navigation.
 */
export const AppShell: React.FC = () => {
  const { isAuthenticated, userProfile, login } = useAuth();
  const user = userProfile
    ? { firstName: userProfile.firstName ?? undefined, lastName: userProfile.lastName ?? undefined, realm_access: userProfile.realm_access }
    : undefined;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <SideRail user={user} isAuthenticated={isAuthenticated} login={login} />
      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
