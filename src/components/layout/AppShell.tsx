import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { SideRail } from './SideRail';
import { MobileNav, MOBILE_BOTTOMBAR_H } from './MobileNav';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useAuth } from '@/auth/useAuth';

/**
 * Layout route for the garden's inner pages. At/above `md` it renders the
 * persistent Prism SideRail beside the routed content; below `md` it swaps the
 * rail for the MobileNav (top bar + bottom tab bar + drawer). Landing routes
 * (`/`, `/home`) are intentionally NOT wrapped by this shell — the hero is their
 * navigation.
 */
export const AppShell: React.FC = () => {
  const isMobile = useIsMobile();
  const { isAuthenticated, userProfile, login, logout } = useAuth();
  const user = userProfile
    ? { firstName: userProfile.firstName ?? undefined, lastName: userProfile.lastName ?? undefined, realm_access: userProfile.realm_access }
    : undefined;

  if (isMobile) {
    return (
      <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
        <MobileNav user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
        <Box component="main" sx={{ minWidth: 0, pb: `${MOBILE_BOTTOMBAR_H}px` }}>
          <Outlet />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <SideRail user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box component="main" sx={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
