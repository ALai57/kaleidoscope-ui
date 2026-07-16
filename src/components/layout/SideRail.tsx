import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import type { NavBarUser } from './NavBar';
import { isSiteAdmin, isWriter } from '@/auth/authHelpers';
import { GARDEN_FACETS, facetColor, isFacetActive } from '@/components/home/gardenFacets';

export interface SideRailProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
}

// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, used only when theme.tokens is undefined (facetColor prefers tokens.color.categorical)
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C'];

export const SideRail: React.FC<SideRailProps> = ({ user, isAuthenticated = false, login }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;
  const durBase = tokens?.motion.duration.base ?? 250;

  const userIsWriter = isWriter(user);
  const userIsAdmin = isSiteAdmin(user);

  const itemSx = (active: boolean, color: string): SxProps<Theme> => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    px: 1.5,
    py: 1.25,
    borderRadius: `${rSm}px`,
    fontFamily: mono,
    fontSize: '0.82rem',
    letterSpacing: '0.02em',
    textDecoration: 'none',
    color: active ? 'text.primary' : 'text.secondary',
    bgcolor: active ? 'action.hover' : 'transparent',
    transition: `color ${durBase}ms, background-color ${durBase}ms`,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -6,
      top: 8,
      bottom: 8,
      width: 3,
      borderRadius: 2,
      bgcolor: color,
      boxShadow: `0 0 10px ${color}`,
      opacity: active ? 1 : 0,
      transition: `opacity ${durBase}ms`,
    },
    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
  });

  const toolSx = (active: boolean): SxProps<Theme> => ({
    display: 'block',
    px: 1.5,
    py: 1,
    borderRadius: `${rSm}px`,
    fontFamily: mono,
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: active ? 'primary.main' : 'text.secondary',
    '&:hover': { color: 'text.primary' },
  });

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        width: { xs: 64, sm: 214 },
        flex: 'none',
        alignSelf: 'stretch',
        borderRight: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 1.5,
      }}
    >
      {/* home = the prism */}
      <Box
        component={Link}
        to="/"
        aria-label="Home — the prism"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          p: 1,
          mb: 1,
          textDecoration: 'none',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <KaleidoscopeMark size={26} />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' }, fontFamily: mono, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em' }}>
          andrewlai
        </Box>
      </Box>

      {/* garden sections */}
      {GARDEN_FACETS.map((f, i) => {
        const active = isFacetActive(f, pathname);
        const color = facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!);
        return (
          <Box key={f.key} component={Link} to={f.route} aria-label={f.label} aria-current={active ? 'page' : 'false'} sx={itemSx(active, color)}>
            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flex: 'none' }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>{f.label}</Box>
          </Box>
        );
      })}

      {/* About (essentials tier) */}
      <Box component={Link} to="/about" aria-label="About" aria-current={pathname === '/about' ? 'page' : 'false'} sx={itemSx(pathname === '/about', theme.palette.success.main)}>
        <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main', flex: 'none' }} />
        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>About</Box>
      </Box>

      <Box sx={{ flex: 1 }} />

      {/* writer/admin tools — secondary group */}
      {(userIsWriter || userIsAdmin) && (
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1, display: { xs: 'none', sm: 'block' } }}>
          {userIsWriter && (
            <Box component={Link} to="/experience" sx={toolSx(pathname === '/experience')}>Experience</Box>
          )}
          {userIsAdmin && (
            <>
              <Box component={Link} to="/projects" sx={toolSx(pathname === '/projects')}>Projects</Box>
              <Box component={Link} to="/manager" sx={toolSx(pathname === '/manager')}>Manager</Box>
            </>
          )}
        </Box>
      )}

      {/* auth */}
      <Box sx={{ pt: 1, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
        {isAuthenticated ? (
          <Tooltip title={`Logged in as ${user?.firstName ?? 'User'}`}>
            <Box component={Link} to="/admin" aria-label="admin" sx={{ display: 'inline-flex', border: '1px solid', borderColor: 'divider', borderRadius: '50%', p: 0.25 }}>
              <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 32, height: 32 }} />
            </Box>
          </Tooltip>
        ) : (
          <Box
            component="button"
            type="button"
            onClick={login}
            aria-label="login"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: `${rSm}px`,
              bgcolor: 'transparent',
              color: 'text.secondary',
              fontFamily: mono,
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              px: 1.25,
              py: 1,
              '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
            }}
          >
            <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Login</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
