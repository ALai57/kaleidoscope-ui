import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export interface NavBarUser {
  firstName?: string | undefined;
  lastName?: string | undefined;
  realm_access?: { roles: string[] } | undefined;
}

export interface NavBarProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
  logout?: (() => void) | undefined;
  logoSrc?: string | undefined;
}

const IMAGE_SIZE = { xs: '25px', sm: '60px', md: '80px', lg: '80px', xl: '100px' };
const ICON_SIZE = { xs: 24, sm: 32, md: 40, lg: 40, xl: 48 };

const ADMIN_ROLE_SUFFIX = ':admin';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Writing', to: '/archive' },
];

export const NavBar: React.FC<NavBarProps> = ({
  user,
  isAuthenticated = false,
  login,
  logout,
  logoSrc = '/static/images/nav-bar/favicon.svg',
}) => {
  const theme = useTheme();

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const adminRole = hostname + ADMIN_ROLE_SUFFIX;
  const roles = new Set(user?.realm_access?.roles ?? []);
  const isSiteAdmin = roles.has(adminRole);

  const primaryLight = (theme.palette as unknown as Record<string, Record<string, string>>)
    ?.primary?.light;
  const accentMain = (theme.palette as unknown as Record<string, Record<string, string>>)
    ?.accent?.main;

  const gradientBg =
    primaryLight && accentMain
      ? `linear-gradient(4deg, ${primaryLight} 40%, ${accentMain} 100%)`
      : undefined;

  return (
    <AppBar
      position="static"
      sx={{
        height: { xs: '50px', sm: '80px', md: '100px', lg: '100px', xl: '120px' },
        background: gradientBg,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box
            component={Link}
            to="/home"
            sx={{
              transition: 'transform 0.3s',
              display: 'inline-block',
              '&:hover': { transform: 'scale(1.08)' },
            }}
          >
            <Box
              component="img"
              src={logoSrc}
              alt="Home"
              sx={{
                maxWidth: '90px',
                float: 'right',
                marginTop: { xs: '2px', sm: '10px' },
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
              }}
            />
          </Box>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Primary nav links — hidden on xs */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: { sm: 0.5, md: 1 } }}>
            {NAV_LINKS.map(({ label, to }) => (
              <Button
                key={to}
                component={Link}
                to={to}
                sx={{
                  color: 'white',
                  fontSize: { sm: '0.85rem', md: '0.95rem', lg: '1rem' },
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* Right-side: admin + user */}
          <Box sx={{ maxHeight: '100%', display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            {isSiteAdmin && (
              <>
                <Button
                  component={Link}
                  to="/projects"
                  sx={{
                    color: 'white',
                    fontSize: { sm: '0.85rem', md: '0.95rem', lg: '1rem' },
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Projects
                </Button>
                <Tooltip title="Manager">
                  <IconButton component={Link} to="/manager" color="inherit" aria-label="manager">
                    <EditIcon sx={{ color: 'white', fontSize: ICON_SIZE }} />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {isAuthenticated ? (
              <Tooltip title={`Logged in as ${user?.firstName ?? 'User'}`}>
                <IconButton component={Link} to="/admin" color="inherit" aria-label="admin">
                  <Avatar
                    alt={user?.firstName ?? 'User'}
                    src="/static/images/nav-bar/user.svg"
                    sx={{ width: ICON_SIZE, height: ICON_SIZE }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Login">
                <IconButton onClick={login} color="inherit" aria-label="login">
                  <Avatar alt="Login" sx={{ width: ICON_SIZE, height: ICON_SIZE, bgcolor: 'primary.main' }}>
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
