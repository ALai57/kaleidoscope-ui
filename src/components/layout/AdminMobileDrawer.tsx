import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { KaleidoscopeMark } from './KaleidoscopeMark';
import { ADMIN_NAV_ITEMS } from './AdminNavRail';
import type { AdminNavItem } from './AdminNavRail';
import type { NavBarUser } from './navTypes';

const MIN_TAP = 44;

function isActive(pathname: string, to: string): boolean {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export interface AdminMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items?: AdminNavItem[];
  user?: NavBarUser | undefined;
  isAuthenticated?: boolean | undefined;
  login?: (() => void) | undefined;
}

/**
 * The mobile admin nav: a labeled slide-in drawer built from the same
 * ADMIN_NAV_ITEMS the desktop rail uses. Rendered by AdminLayout below md in
 * place of the icon-only rail (whose tooltips are useless on touch).
 */
export const AdminMobileDrawer: React.FC<AdminMobileDrawerProps> = ({
  open,
  onClose,
  items = ADMIN_NAV_ITEMS,
  user,
  isAuthenticated = false,
  login,
}) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const mono = tokens?.typography.mono ?? 'monospace';
  const rSm = tokens?.radius.sm ?? 6;

  useEffect(() => { if (open) panelRef.current?.focus(); }, [open]);

  if (!open) return null;

  const itemSx = (active: boolean): SxProps<Theme> => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    minHeight: MIN_TAP,
    px: 1,
    borderRadius: `${rSm}px`,
    textDecoration: 'none',
    color: active ? 'primary.main' : 'text.primary',
    bgcolor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    fontFamily: mono,
    fontSize: '0.78rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    '&:hover': { bgcolor: 'action.hover' },
  });

  return (
    <Box
      onClick={onClose}
      sx={{ position: 'fixed', inset: 0, zIndex: 1200, bgcolor: alpha(theme.palette.common.black, 0.45) }}
    >
      <Box
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-label="Admin menu"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '82%',
          maxWidth: 300,
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          outline: 'none',
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <KaleidoscopeMark size={26} />
          <Box component="span" sx={{ fontFamily: mono, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em' }}>
            KALEIDOSCOPE
          </Box>
          <Box sx={{ flex: 1 }} />
          <Box
            component="button"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            sx={{ display: 'inline-flex', width: MIN_TAP, height: MIN_TAP, alignItems: 'center', justifyContent: 'center', border: 'none', bgcolor: 'transparent', color: 'text.primary', cursor: 'pointer' }}
          >
            <CloseIcon fontSize="small" />
          </Box>
        </Box>

        {items.map((item, i) => {
          const active = isActive(pathname, item.to);
          const prev = items[i - 1];
          const showDivider = i > 0 && item.group !== undefined && prev?.group !== item.group;
          return (
            <React.Fragment key={item.to}>
              {showDivider && <Divider sx={{ my: 0.5 }} />}
              <Box component={Link} to={item.to} aria-current={active ? 'page' : undefined} onClick={onClose} sx={itemSx(active)}>
                {item.icon}
                {item.label}
              </Box>
            </React.Fragment>
          );
        })}

        <Box sx={{ flex: 1 }} />
        <Divider sx={{ my: 0.5 }} />
        {isAuthenticated ? (
          <Box component={Link} to="/admin" aria-label="admin" onClick={onClose} sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, textDecoration: 'none', color: 'text.primary', fontFamily: mono, fontSize: '0.78rem' }}>
            <Avatar alt={user?.firstName ?? 'User'} src="/static/images/nav-bar/user.svg" sx={{ width: 30, height: 30 }} />
            {user?.firstName ?? 'Account'}
          </Box>
        ) : (
          <Box
            component="button"
            type="button"
            onClick={login}
            aria-label="login"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: MIN_TAP, width: '100%', border: '1px solid', borderColor: 'divider', borderRadius: `${rSm}px`, bgcolor: 'transparent', color: 'text.secondary', fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', px: 1.25, cursor: 'pointer', '&:hover': { color: 'primary.main', borderColor: 'primary.main' } }}
          >
            <Avatar sx={{ width: 26, height: 26, fontFamily: mono, fontWeight: 700, color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.14), fontSize: '0.8rem' }}>?</Avatar>
            Login
          </Box>
        )}
      </Box>
    </Box>
  );
};
