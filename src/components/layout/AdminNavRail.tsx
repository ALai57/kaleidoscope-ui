import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GroupsIcon from '@mui/icons-material/Groups';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import type { NavBarUser } from './navTypes';

export interface AdminNavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

/** The admin/mission-control sections. Single source for the rail nav. */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: 'Projects', to: '/projects', icon: <WorkspacesIcon fontSize="small" /> },
  { label: 'Workflows', to: '/workflows', icon: <AccountTreeIcon fontSize="small" /> },
  { label: 'Agents', to: '/agents', icon: <GroupsIcon fontSize="small" /> },
  { label: 'Workspace Roots', to: '/workspace-roots', icon: <FolderOpenIcon fontSize="small" /> },
];

export interface AdminNavRailProps {
  items?: AdminNavItem[];
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
}

/** True when `pathname` is `to` or a nested route beneath it. */
function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

/**
 * The persistent admin nav rail — the kaleidoscope mark, the section links, and
 * a user/auth footer. Every non-content value is token-driven (mono voice, accent
 * active state, spring motion) with a bare-MUI fallback, so it re-skins with the
 * active preset like the NavBar. Collapses to icons-only on small screens.
 */
export const AdminNavRail: React.FC<AdminNavRailProps> = ({
  items = ADMIN_NAV_ITEMS,
  user,
  isAuthenticated = false,
  login,
}) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;
  const durFast = tokens?.motion.duration.fast ?? 150;
  const durBase = tokens?.motion.duration.base ?? 250;
  const settle = tokens?.motion.easing.springSettle ?? 'ease';

  const itemSx = (active: boolean): SxProps<Theme> => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    px: { xs: 0, md: 1.5 },
    justifyContent: { xs: 'center', md: 'flex-start' },
    py: 1,
    minHeight: 40,
    borderRadius: `${rSm}px`,
    textDecoration: 'none',
    color: active ? 'primary.main' : 'text.secondary',
    bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    transition: `color ${durFast}ms, background-color ${durFast}ms`,
    // Accent rail on the active item — the vertical cousin of the NavBar underline.
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: '0 2px 2px 0',
      bgcolor: 'primary.main',
      transform: active ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: 'center',
      transition: `transform ${durBase}ms ${settle}`,
    },
    '&:hover': { color: active ? 'primary.main' : 'text.primary', bgcolor: 'action.hover' },
  });

  const labelSx: SxProps<Theme> = {
    display: { xs: 'none', md: 'block' },
    fontFamily: mono,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  };

  return (
    <Box
      component="nav"
      aria-label="Admin sections"
      sx={{
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
        height: '100vh',
        width: { xs: 64, md: 216 },
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 1,
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {/* Brand → home */}
      <Box
        component={Link}
        to="/home"
        aria-label="Home"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          textDecoration: 'none',
          color: 'text.primary',
          px: { xs: 0, md: 1 },
          py: 1.5,
          justifyContent: { xs: 'center', md: 'flex-start' },
          '& .klogo': { transition: `transform ${tokens?.motion.duration.slow ?? 400}ms ${settle}` },
          '&:hover .klogo': { transform: 'rotate(120deg)' },
        }}
      >
        <KaleidoscopeMark size={28} className="klogo" />
        <Box
          component="span"
          sx={{
            display: { xs: 'none', md: 'inline' },
            fontFamily: mono,
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
          }}
        >
          KALEIDOSCOPE
        </Box>
      </Box>

      {/* Section links */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
        {items.map((item) => {
          const active = isActive(pathname, item.to);
          const link = (
            <Box
              key={item.to}
              component={Link}
              to={item.to}
              aria-current={active ? 'page' : undefined}
              sx={itemSx(active)}
            >
              {item.icon}
              <Box component="span" sx={labelSx}>
                {item.label}
              </Box>
            </Box>
          );
          // On the collapsed (icon-only) rail, a tooltip carries the label.
          return (
            <Tooltip key={item.to} title={item.label} placement="right" disableHoverListener={false}>
              {link}
            </Tooltip>
          );
        })}
      </Box>

      {/* User / auth footer */}
      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center', pb: 1 }}>
        {isAuthenticated ? (
          <Tooltip title={`Logged in as ${user?.firstName ?? 'User'}`} placement="right">
            <Box
              component={Link}
              to="/admin"
              aria-label="admin"
              sx={{
                display: 'inline-flex',
                p: 0.25,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: 'divider',
                transition: `border-color ${durFast}ms`,
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <Avatar
                alt={user?.firstName ?? 'User'}
                src="/static/images/nav-bar/user.svg"
                sx={{ width: 32, height: 32 }}
              />
            </Box>
          </Tooltip>
        ) : (
          <Tooltip title="Login" placement="right">
            <Box
              component="button"
              onClick={login}
              aria-label="login"
              sx={{
                cursor: 'pointer',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '50%',
                p: 0.25,
                bgcolor: 'transparent',
                transition: `border-color ${durFast}ms`,
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontFamily: mono,
                  fontWeight: 700,
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.14),
                }}
              >
                ?
              </Avatar>
            </Box>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
