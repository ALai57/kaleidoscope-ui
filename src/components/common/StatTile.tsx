import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { SurfaceCard } from './SurfaceCard';
import { StatusChip } from './StatusChip';
import type { StatusTone } from './StatusChip';

/**
 * A mission-control metric tile: an uppercase label, a large value in the
 * preset's heading voice (mono under Prism), and an optional delta/status line.
 *
 * Built on `SurfaceCard` so it shares the app's card surface, and it reads
 * `theme.tokens` for the mono "data voice" + spacing — every non-color value is
 * token-driven with a bare-MUI fallback, so a StatTile re-skins with the active
 * preset instead of hardcoding the Prism look.
 */

export type StatTrend = 'up' | 'down' | 'flat';

/** Tones backed by an actual MUI palette slot (i.e. have a `.main`). */
const PALETTE_TONES: ReadonlySet<StatusTone> = new Set(['success', 'warning', 'error', 'info']);

// A trend's arrow glyph and the semantic tone its delta reads as. `flat` is
// neutral; up/down are intentionally *not* hardwired to good/bad — the caller
// decides via `trendTone` when higher isn't better.
const TREND_GLYPH: Record<StatTrend, string> = { up: '▲', down: '▼', flat: '—' };
const TREND_DEFAULT_TONE: Record<StatTrend, StatusTone> = {
  up: 'success',
  down: 'error',
  flat: 'neutral',
};

export interface StatTileProps {
  /** Short metric name, rendered uppercase in the mono voice. */
  label: string;
  /** The primary value. Pre-format numbers (locale, precision) before passing. */
  value: React.ReactNode;
  /** A small trailing unit next to the value (e.g. "ms", "%"). */
  unit?: string;
  /** Directional delta indicator shown under the value. */
  trend?: StatTrend;
  /** The delta text next to the trend arrow (e.g. "+12%", "3 today"). */
  delta?: string;
  /** Overrides the tone the trend/delta reads as when higher isn't better. */
  trendTone?: StatusTone;
  /** A status chip shown in the tile's top-right (e.g. live/degraded). */
  status?: string;
  /** Leading glyph/icon before the label. */
  icon?: React.ReactNode;
}

export const StatTile: React.FC<StatTileProps> = ({
  label,
  value,
  unit,
  trend,
  delta,
  trendTone,
  status,
  icon,
}) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const headingMono = tokens?.typography.headingFamily === 'mono';
  const valueFamily = headingMono ? mono : 'inherit';

  const resolvedTrendTone = trend ? (trendTone ?? TREND_DEFAULT_TONE[trend]) : undefined;

  return (
    <SurfaceCard sx={{ p: 2, minWidth: 160 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            fontFamily: mono,
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'text.secondary',
          }}
        >
          {icon}
          <Box component="span">{label}</Box>
        </Box>
        {status && <StatusChip status={status} size="small" dot />}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mt: 1 }}>
        <Typography
          component="span"
          sx={{ fontFamily: valueFamily, fontSize: '1.9rem', fontWeight: 700, lineHeight: 1.1 }}
        >
          {value}
        </Typography>
        {unit && (
          <Typography component="span" sx={{ fontFamily: mono, fontSize: '0.8rem', color: 'text.secondary' }}>
            {unit}
          </Typography>
        )}
      </Box>

      {trend && delta && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 0.75,
            fontFamily: mono,
            fontSize: '0.75rem',
            fontWeight: 600,
            color:
              resolvedTrendTone && PALETTE_TONES.has(resolvedTrendTone)
                ? `${resolvedTrendTone}.main`
                : 'text.secondary',
          }}
        >
          <Box component="span" aria-hidden="true">
            {TREND_GLYPH[trend]}
          </Box>
          <Box component="span">{delta}</Box>
        </Box>
      )}
    </SurfaceCard>
  );
};
