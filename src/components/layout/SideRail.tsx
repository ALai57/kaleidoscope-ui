import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import type { NavBarUser } from './navTypes';
import { visibleStudioItems, type StudioNavItem } from './navConfig';
import { GARDEN_FACETS, facetColor, isFacetActive } from '@/components/home/gardenFacets';

export interface SideRailProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
  logout?: (() => void) | undefined;
}

// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, used only when theme.tokens is undefined
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C'];

/** True when `pathname` is `to` or a nested route beneath it. */
function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export const SideRail: React.FC<SideRailProps> = ({ user, isAuthenticated = false, login, logout }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;
  const durBase = tokens?.motion.duration.base ?? 250;
  const settle = tokens?.motion.easing.springSettle ?? 'ease';

  const studioItems = visibleStudioItems(user);
  const [studioOpen, setStudioOpen] = useState(true);
  const [menuEl, setMenuEl] = useState<HTMLElement | null>(null);

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
      content: '""', position: 'absolute', left: -6, top: 8, bottom: 8, width: 3, borderRadius: 2,
      bgcolor: color, boxShadow: `0 0 10px ${color}`, opacity: active ? 1 : 0, transition: `opacity ${durBase}ms`,
    },
    '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
  });

  const studioItemSx = (active: boolean): SxProps<Theme> => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
    px: 1.5,
    py: 0.9,
    borderRadius: `${rSm}px`,
    fontFamily: mono,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: active ? 'primary.main' : 'text.secondary',
    bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    transition: `color ${durBase}ms, background-color ${durBase}ms`,
    '&::before': {
      content: '""', position: 'absolute', left: -6, top: 6, bottom: 6, width: 3, borderRadius: 2,
      bgcolor: 'primary.main', opacity: active ? 1 : 0, transition: `opacity ${durBase}ms`,
    },
    '&:hover': { color: active ? 'primary.main' : 'text.primary', bgcolor: 'action.hover' },
    '& svg': { fontSize: '1rem' },
  });

  return (
    <Box
      component="nav"
      aria-label="Primary"
      sx={{
        position: 'sticky', top: 0, height: '100vh',
        width: 216, flex: 'none', alignSelf: 'stretch',
        borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper',
        display: 'flex', flexDirection: 'column', gap: 0.5, p: 1.5,
      }}
    >
      {/* home = the prism */}
      <Box
        component={Link}
        to="/"
        aria-label="Home — the prism"
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.25, p: 1, mb: 1,
          textDecoration: 'none', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider',
          '& .klogo': { transition: `transform ${tokens?.motion.duration.slow ?? 400}ms ${settle}` },
          '&:hover .klogo': { transform: 'rotate(120deg)' },
        }}
      >
        <KaleidoscopeMark size={26} className="klogo" />
        <Box component="span" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.16em' }}>
          andrewlai
        </Box>
      </Box>

      {/* reader facets */}
      {GARDEN_FACETS.map((f, i) => {
        const active = isFacetActive(f, pathname);
        const color = facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!);
        return (
          <Box key={f.key} component={Link} to={f.route} aria-label={f.label} aria-current={active ? 'page' : 'false'} sx={itemSx(active, color)}>
            <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flex: 'none' }} />
            <Box component="span">{f.label}</Box>
          </Box>
        );
      })}

      {/* About (essentials tier) */}
      <Box component={Link} to="/about" aria-label="About" aria-current={pathname === '/about' ? 'page' : 'false'} sx={itemSx(pathname === '/about', theme.palette.success.main)}>
        <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main', flex: 'none' }} />
        <Box component="span">About</Box>
      </Box>

      {/* Studio — collapsible, role-filtered from navConfig */}
      {studioItems.length > 0 && (
        <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, pt: 0.5, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Box
            component="button"
            type="button"
            onClick={() => setStudioOpen((v) => !v)}
            aria-expanded={studioOpen}
            aria-label="Studio"
            sx={{
              display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, border: 'none', bgcolor: 'transparent',
              cursor: 'pointer', color: 'text.secondary', fontFamily: mono, fontSize: '0.66rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <Box component="span">Studio</Box>
            <Box sx={{ flex: 1 }} />
            <KeyboardArrowDownIcon
              fontSize="small"
              sx={{ transform: studioOpen ? 'none' : 'rotate(-90deg)', transition: `transform ${durBase}ms ${settle}` }}
            />
          </Box>
          {studioOpen && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, overflowY: 'auto', minHeight: 0 }}>
              {studioItems.map((item: StudioNavItem, i) => {
                const active = isActive(pathname, item.to);
                const prev = studioItems[i - 1];
                const showDivider = i > 0 && prev?.group !== item.group;
                return (
                  <React.Fragment key={item.to}>
                    {showDivider && <Divider sx={{ my: 0.5, borderColor: 'divider' }} />}
                    <Box component={Link} to={item.to} aria-current={active ? 'page' : undefined} sx={studioItemSx(active)}>
                      {item.icon}
                      <Box component="span">{item.label}</Box>
                    </Box>
                  </React.Fragment>
                );
              })}
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ flex: 1, minHeight: 8 }} />

      {/* auth footer */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
        {isAuthenticated ? (
          <>
            <Box
              component="button"
              type="button"
              onClick={(e) => setMenuEl(e.currentTarget)}
              aria-label="Account"
              aria-haspopup="menu"
              sx={{
                display: 'flex', alignItems: 'center', gap: 1, width: '100%', px: 1, py: 0.75,
                border: 'none', bgcolor: 'transparent', cursor: 'pointer', borderRadius: `${rSm}px`,
                color: 'text.secondary', fontFamily: mono, fontSize: '0.75rem',
                '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
              }}
            >
              <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 30, height: 30 }} />
              <Box component="span">{user?.firstName ?? 'Account'}</Box>
            </Box>
            <Menu anchorEl={menuEl} open={Boolean(menuEl)} onClose={() => setMenuEl(null)}>
              <MenuItem component={Link} to="/admin" onClick={() => setMenuEl(null)} sx={{ fontFamily: mono, fontSize: '0.8rem' }}>Admin</MenuItem>
              <MenuItem onClick={() => { setMenuEl(null); logout?.(); }} sx={{ fontFamily: mono, fontSize: '0.8rem' }}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            component="button"
            type="button"
            onClick={login}
            aria-label="login"
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 1, cursor: 'pointer',
              border: '1px solid', borderColor: 'divider', borderRadius: `${rSm}px`, bgcolor: 'transparent',
              color: 'text.secondary', fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', px: 1.25, py: 1,
              '&:hover': { color: 'primary.main', borderColor: 'primary.main' },
            }}
          >
            <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
            <Box component="span">Login</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
