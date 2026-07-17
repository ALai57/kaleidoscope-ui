import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import type { NavBarUser } from './navTypes';
import { isSiteAdmin, isWriter } from '@/auth/authHelpers';
import { GARDEN_FACETS, facetColor } from '@/components/home/gardenFacets';

export const MOBILE_TOPBAR_H = 52;
export const MOBILE_BOTTOMBAR_H = 60;
const MIN_TAP = 44;

// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, mirrors SideRail (facetColor prefers tokens.color.categorical)
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C'];

export interface MobileNavProps {
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
}

interface Dest {
  key: string;
  label: string;
  route: string;
  color: string;
}

const isRouteActive = (pathname: string, route: string): boolean =>
  pathname === route || pathname.startsWith(`${route}/`);

const studioLinkSx = (mono: string, rSm: number): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  minHeight: MIN_TAP,
  px: 1,
  borderRadius: `${rSm}px`,
  textDecoration: 'none',
  color: 'text.secondary',
  fontFamily: mono,
  fontSize: '0.8rem',
  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
});

export const MobileNav: React.FC<MobileNavProps> = ({ user, isAuthenticated = false, login }) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;

  const userIsWriter = isWriter(user);
  const userIsAdmin = isSiteAdmin(user);

  const dests: Dest[] = [
    ...GARDEN_FACETS.map((f, i) => ({
      key: f.key,
      label: f.label,
      route: f.route,
      color: facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!),
    })),
    { key: 'about', label: 'About', route: '/about', color: theme.palette.success.main },
  ];
  const activeDest = dests.find((d) => isRouteActive(pathname, d.route));

  // Close on navigation; focus the drawer when it opens.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { if (open) drawerRef.current?.focus(); }, [open]);

  const tabSx = (active: boolean, color: string): SxProps<Theme> => ({
    flex: 1,
    minWidth: 0,
    minHeight: MIN_TAP,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0.4,
    py: 0.75,
    textDecoration: 'none',
    color: active ? 'text.primary' : 'text.secondary',
    fontFamily: mono,
    fontSize: '0.62rem',
    letterSpacing: '0.02em',
    '& .tab-dot': {
      width: 9,
      height: 9,
      borderRadius: '50%',
      bgcolor: color,
      opacity: active ? 1 : 0.5,
      boxShadow: active ? `0 0 8px ${color}` : 'none',
    },
  });

  return (
    <>
      {/* top bar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          height: MOBILE_TOPBAR_H,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box component={Link} to="/" aria-label="Home — the prism" sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.primary' }}>
          <KaleidoscopeMark size={24} />
        </Box>
        <Box component="span" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.04em' }}>
          {activeDest?.label ?? 'andrewlai'}
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box
          component="button"
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: MIN_TAP,
            height: MIN_TAP,
            border: 'none',
            bgcolor: 'transparent',
            color: 'text.primary',
            cursor: 'pointer',
            borderRadius: `${rSm}px`,
          }}
        >
          <MenuIcon />
        </Box>
      </Box>

      {/* bottom tab bar */}
      <Box
        component="nav"
        aria-label="Primary"
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1100,
          height: MOBILE_BOTTOMBAR_H,
          display: 'flex',
          bgcolor: alpha(theme.palette.background.paper, 0.92),
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {dests.map((d) => {
          const active = activeDest?.key === d.key;
          return (
            <Box
              key={d.key}
              component={Link}
              to={d.route}
              aria-label={d.label}
              aria-current={active ? 'page' : undefined}
              sx={tabSx(active, d.color)}
            >
              <Box component="span" className="tab-dot" />
              <Box component="span">{d.label}</Box>
            </Box>
          );
        })}
      </Box>

      {/* drawer */}
      {open && (
        <Box onClick={() => setOpen(false)} sx={{ position: 'fixed', inset: 0, zIndex: 1200, bgcolor: alpha(theme.palette.common.black, 0.45) }}>
          <Box
            ref={drawerRef}
            tabIndex={-1}
            role="dialog"
            aria-label="Menu"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '78%',
              maxWidth: 320,
              bgcolor: 'background.paper',
              borderLeft: '1px solid',
              borderColor: 'divider',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              outline: 'none',
              overflowY: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box component="span" sx={{ fontFamily: mono, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>Garden</Box>
              <Box sx={{ flex: 1 }} />
              <Box
                component="button"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                sx={{ display: 'inline-flex', width: MIN_TAP, height: MIN_TAP, alignItems: 'center', justifyContent: 'center', border: 'none', bgcolor: 'transparent', color: 'text.primary', cursor: 'pointer' }}
              >
                <CloseIcon fontSize="small" />
              </Box>
            </Box>

            {dests.map((d) => (
              <Box
                key={d.key}
                component={Link}
                to={d.route}
                aria-current={activeDest?.key === d.key ? 'page' : undefined}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minHeight: MIN_TAP, px: 1, borderRadius: `${rSm}px`, textDecoration: 'none', color: 'text.primary', fontFamily: mono, fontSize: '0.9rem', '&:hover': { bgcolor: 'action.hover' } }}
              >
                <Box component="span" sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: d.color, flex: 'none' }} />
                {d.label}
              </Box>
            ))}

            {(userIsWriter || userIsAdmin) && (
              <>
                <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1, pt: 1 }}>
                  <Box component="span" sx={{ fontFamily: mono, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'text.secondary' }}>Studio</Box>
                </Box>
                {userIsWriter && (
                  <Box component={Link} to="/experience" sx={studioLinkSx(mono, rSm)}>Experience</Box>
                )}
                {userIsAdmin && (
                  <>
                    <Box component={Link} to="/projects" sx={studioLinkSx(mono, rSm)}>Projects</Box>
                    <Box component={Link} to="/manager" sx={studioLinkSx(mono, rSm)}>Manager</Box>
                  </>
                )}
              </>
            )}

            <Box sx={{ flex: 1 }} />

            <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1 }}>
              {isAuthenticated ? (
                <Box component={Link} to="/admin" aria-label="admin" sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, textDecoration: 'none', color: 'text.primary', fontFamily: mono, fontSize: '0.85rem' }}>
                  <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 30, height: 30 }} />
                  {user?.firstName ?? 'Account'}
                </Box>
              ) : (
                <Box
                  component="button"
                  type="button"
                  onClick={login}
                  aria-label="login"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, width: '100%', border: '1px solid', borderColor: 'divider', borderRadius: `${rSm}px`, bgcolor: 'transparent', color: 'text.secondary', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', px: 1.5, cursor: 'pointer', '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}
                >
                  <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
                  Login
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
