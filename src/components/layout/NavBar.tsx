import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { useColorScheme } from '@mui/material/styles';
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

const ZOOM_STYLE: React.CSSProperties = {
  transition: 'transform 0.3s',
  maxWidth: '100%',
  float: 'right',
  position: 'relative',
};

const ADMIN_ROLE_SUFFIX = ':admin';

export const NavBar: React.FC<NavBarProps> = ({
  user,
  isAuthenticated = false,
  login,
  logout,
  logoSrc = '/static/images/nav-bar/favicon.svg',
}) => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

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

  const handleToggleDarkMode = (): void => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

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
            sx={{ transition: 'transform 0.3s', display: 'inline-block' }}
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

          {/* Icons */}
          <Box sx={{ maxHeight: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Dark mode toggle */}
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton onClick={handleToggleDarkMode} color="inherit" aria-label="toggle dark mode">
                {mode === 'dark' ? (
                  <Brightness7Icon sx={{ color: 'white' }} />
                ) : (
                  <Brightness4Icon sx={{ color: 'white' }} />
                )}
              </IconButton>
            </Tooltip>

            {/* About icon */}
            <Tooltip title="About this site">
              <IconButton component={Link} to="/about-this-site" color="inherit" aria-label="about">
                <InfoIcon sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>

            {/* User avatar / login */}
            {isAuthenticated ? (
              <>
                <Tooltip title={`Logged in as ${user?.firstName ?? 'User'}`}>
                  <IconButton
                    component={Link}
                    to="/admin"
                    color="inherit"
                    aria-label="admin"
                  >
                    <Avatar
                      alt={user?.firstName ?? 'User'}
                      src="/static/images/nav-bar/user.svg"
                      sx={{
                        width: IMAGE_SIZE,
                        height: IMAGE_SIZE,
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton
                    onClick={logout}
                    color="inherit"
                    aria-label="logout"
                  >
                    <Avatar alt="Logout" sx={{ width: 30, height: 30, bgcolor: 'secondary.main' }}>
                      L
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Login">
                <IconButton
                  onClick={login}
                  color="inherit"
                  aria-label="login"
                >
                  <Avatar
                    alt="Login"
                    sx={{ width: 30, height: 30, bgcolor: 'primary.main' }}
                  >
                    ?
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}

            {/* Edit icon for site admins */}
            {isSiteAdmin && (
              <Tooltip title="Manager">
                <IconButton component={Link} to="/manager" color="inherit" aria-label="manager">
                  <EditIcon sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            )}

            {/* Articles icon */}
            <Tooltip title="Articles">
              <IconButton component={Link} to="/archive" color="inherit" aria-label="archive">
                <Box
                  component="img"
                  src="/static/images/nav-bar/articles.svg"
                  alt="Articles"
                  sx={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
