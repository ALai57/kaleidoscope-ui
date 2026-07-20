import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import CoffeeIcon from '@mui/icons-material/Coffee';
import { styled } from '@mui/material/styles';
import { alpha } from '../../theme/alpha';
import { useWakeLock } from '../../hooks/useWakeLock';
import { StirrerIcon } from './StirrerIcon';

/**
 * The recipe screen-wake-lock control, as a floating overlay. Mirrors the
 * global dark-mode icon's treatment (fixed, translucent, blurred, subtle idle →
 * full on hover) but is deliberately distinguishable from it: a pill rather than
 * a circle, a cyan accent rather than neutral, a cooking icon + label rather
 * than a bare glyph, and stacked *above* the dark-mode icon in the bottom-right.
 *
 * Off, it's a compact icon-only chip with a faint cyan ring. On, it expands into
 * a filled cyan pill showing the animated Stirrer and a label.
 */

const Control = styled('button', { shouldForwardProp: (p) => p !== 'active' })<{
  active?: boolean;
}>(({ theme, active }) => {
  const t = theme.tokens;
  const accent = t?.color.brand.primary ?? theme.palette.primary.main;
  const surface = t?.color.surface.base ?? theme.palette.background.default;
  const settle = t?.motion.easing.springSettle ?? 'cubic-bezier(0.22, 1.24, 0.36, 1)';
  const dur = t?.motion.duration.base ?? 300;
  const radius = t?.radius.pill ?? 9999;
  const mono = t?.typography.mono ?? 'monospace';
  return {
    boxSizing: 'border-box',
    appearance: 'none',
    height: 34,
    minWidth: 34,
    maxWidth: active ? 260 : 34,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: active ? 8 : 0,
    padding: active ? '0 14px' : 0,
    borderRadius: radius,
    border: '1px solid',
    cursor: 'pointer',
    overflow: 'hidden',
    fontFamily: mono,
    color: active ? surface : accent,
    backgroundColor: active ? accent : alpha(surface, 0.28),
    borderColor: active ? accent : alpha(accent, 0.5),
    opacity: active ? 1 : 0.82,
    boxShadow: active ? `0 4px 18px ${alpha(accent, 0.35)}` : 'none',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    transition: `max-width ${dur}ms ${settle}, padding ${dur}ms ${settle}, gap ${dur}ms ${settle}, background-color .2s, color .2s, border-color .2s, box-shadow .3s, opacity .2s`,
    '& .wl-icon': { flexShrink: 0, display: 'block' },
    '& .wl-label': {
      whiteSpace: 'nowrap',
      fontSize: 12.5,
      fontWeight: 600,
      letterSpacing: '0.04em',
    },
    '&:hover': active
      ? {}
      : { opacity: 1, borderColor: accent, backgroundColor: alpha(surface, 0.42) },
    '&:focus-visible': { outline: `2px solid ${accent}`, outlineOffset: 2 },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  };
});

export interface WakeLockOverlayViewProps {
  active: boolean;
  onToggle: () => void;
}

/** Presentational overlay — decoupled from the hook so it's trivial to render in
 *  tests and Storybook with either state. */
export const WakeLockOverlayView: React.FC<WakeLockOverlayViewProps> = ({ active, onToggle }) => (
  <Box
    sx={{
      position: 'fixed',
      // Stacked ~8px above the dark-mode icon (bottom 16 + its 32px height).
      right: 'calc(16px + env(safe-area-inset-right, 0px))',
      bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
      zIndex: 1500,
    }}
  >
    <Tooltip
      title={active ? 'Allow the screen to sleep' : 'Keep the screen on while you cook'}
      placement="left"
    >
      <Control
        type="button"
        active={active}
        onClick={onToggle}
        aria-pressed={active}
        aria-label={active ? 'Screen stays on' : 'Keep screen on'}
      >
        {active ? (
          <StirrerIcon active size={20} className="wl-icon" />
        ) : (
          <CoffeeIcon className="wl-icon" sx={{ fontSize: 18 }} />
        )}
        {active && (
          <Box component="span" className="wl-label">
            Screen stays on
          </Box>
        )}
      </Control>
    </Tooltip>
  </Box>
);

/**
 * Container: wires the wake-lock hook to the overlay. Renders nothing on
 * browsers without the Screen Wake Lock API.
 */
export const WakeLockOverlay: React.FC = () => {
  const { isSupported, isActive, toggle } = useWakeLock();
  if (!isSupported) return null;
  return <WakeLockOverlayView active={isActive} onToggle={toggle} />;
};

export default WakeLockOverlay;
