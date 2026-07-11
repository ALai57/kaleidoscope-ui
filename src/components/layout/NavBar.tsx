import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { KaleidoscopeMark } from './KaleidoscopeMark';

export interface NavBarUser {
  firstName?: string | undefined;
  lastName?: string | undefined;
  realm_access?: { roles: string[] } | undefined;
}

export interface NavBarProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
  /** Accepted for API compatibility; logout is triggered from the admin area,
   *  not the nav bar. */
  logout?: (() => void) | undefined;
}

const ADMIN_ROLE_SUFFIX = ':admin';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Writing', to: '/archive' },
  { label: 'Recipes', to: '/recipes' },
];

export const NavBar: React.FC<NavBarProps> = ({ user, isAuthenticated = false, login }) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const adminRole = hostname + ADMIN_ROLE_SUFFIX;
  const roles = new Set(user?.realm_access?.roles ?? []);
  const isSiteAdmin = roles.has(adminRole);

  // Structural tokens (radius/motion/mono voice) drive the Prism look; each has
  // a non-color fallback so the bar still renders under a bare MUI theme.
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;
  const durFast = tokens?.motion.duration.fast ?? 150;
  const durBase = tokens?.motion.duration.base ?? 250;
  const durSlow = tokens?.motion.duration.slow ?? 400;
  const snap = tokens?.motion.easing.springSnap ?? 'ease';
  const settle = tokens?.motion.easing.springSettle ?? 'ease';

  // A nav link: monospace/uppercase with an accent underline that wipes in on
  // hover and stays lit on the active route.
  const linkSx = (active: boolean): SxProps<Theme> => ({
    position: 'relative',
    fontFamily: mono,
    fontSize: { xs: '0.7rem', sm: '0.72rem', md: '0.78rem' },
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: active ? 'primary.main' : 'text.secondary',
    textDecoration: 'none',
    px: 1.5,
    py: 1,
    borderRadius: `${rSm}px`,
    whiteSpace: 'nowrap',
    transition: `color ${durFast}ms`,
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 12,
      right: 12,
      bottom: 6,
      height: '2px',
      borderRadius: '1px',
      bgcolor: 'primary.main',
      transform: active ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: 'left',
      transition: `transform ${durBase}ms ${settle}`,
    },
    '&:hover': { color: 'text.primary' },
    '&:hover::after': { transform: 'scaleX(1)' },
  });

  const iconBtnSx: SxProps<Theme> = {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: `${rSm}px`,
    color: 'text.secondary',
    transition: `color ${durFast}ms, border-color ${durFast}ms`,
    '& svg': { transition: `transform ${durBase}ms ${snap}` },
    '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
    '&:hover svg': { transform: 'scale(1.12)' },
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      color="default"
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundImage: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
          {/* Wordmark → home */}
          <Box
            component={Link}
            to="/home"
            aria-label="Home"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.25,
              textDecoration: 'none',
              color: 'text.primary',
              '& .klogo': { transition: `transform ${durSlow}ms ${snap}` },
              '&:hover .klogo': { transform: 'rotate(120deg)' },
            }}
          >
            <KaleidoscopeMark className="klogo" size={30} />
            <Box
              component="span"
              sx={{
                display: { xs: 'none', sm: 'inline' },
                fontFamily: mono,
                fontWeight: 700,
                fontSize: { sm: '0.8rem', md: '0.85rem' },
                letterSpacing: '0.2em',
              }}
            >
              KALEIDOSCOPE
            </Box>
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Primary nav links — hidden on xs */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Box key={to} component={Link} to={to} sx={linkSx(pathname === to)}>
                {label}
              </Box>
            ))}
          </Box>

          {/* Right-side: admin + user */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            {isSiteAdmin && (
              <>
                <Box
                  component={Link}
                  to="/projects"
                  sx={{ ...linkSx(pathname === '/projects'), display: { xs: 'none', sm: 'block' } }}
                >
                  Projects
                </Box>
                <Tooltip title="Manager">
                  <IconButton component={Link} to="/manager" aria-label="manager" sx={iconBtnSx}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {isAuthenticated ? (
              <Tooltip title={`Logged in as ${user?.firstName ?? 'User'}`}>
                <IconButton
                  component={Link}
                  to="/admin"
                  aria-label="admin"
                  sx={{
                    p: 0.25,
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: `border-color ${durFast}ms, transform ${durBase}ms ${snap}`,
                    '&:hover': { borderColor: 'primary.main', transform: 'scale(1.08)' },
                  }}
                >
                  <Avatar
                    alt={user?.firstName ?? 'User'}
                    src="/static/images/nav-bar/user.svg"
                    sx={{ width: 34, height: 34 }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login">
                <IconButton onClick={login} aria-label="login" sx={iconBtnSx}>
                  <Avatar
                    alt="Login"
                    sx={{
                      width: 34,
                      height: 34,
                      fontFamily: mono,
                      fontWeight: 700,
                      color: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.14),
                    }}
                  >
                    ?
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
