import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import { SurfaceCard } from './SurfaceCard';

/**
 * A compact label→value fact box for résumé-style "quick facts".
 *
 * It's the quiet cousin of `StatTile`: `StatTile` is a mission-control *metric*
 * primitive (a 1.9rem number in the heading voice), which overpowers a page
 * when the "values" are short phrases rather than figures. `FactList` keeps the
 * mono label voice but renders the value at body scale so the facts support the
 * hero heading instead of competing with it.
 *
 * The label voice comes from `theme.tokens` (mono, with a bare-MUI fallback) so
 * it re-skins with the active preset, and it sits on the shared `SurfaceCard`.
 */
export interface Fact {
  label: string;
  value: React.ReactNode;
}

export interface FactListProps {
  facts: Fact[];
  sx?: SxProps<Theme>;
}

export const FactList: React.FC<FactListProps> = ({ facts, sx }) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';

  return (
    <SurfaceCard sx={[{ p: 2.5 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Stack divider={<Divider flexItem />} spacing={1.5}>
        {facts.map((fact, i) => (
          <Box key={i}>
            <Typography
              component="div"
              sx={{
                fontFamily: mono,
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'text.secondary',
                mb: 0.25,
              }}
            >
              {fact.label}
            </Typography>
            <Typography component="div" sx={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.35 }}>
              {fact.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </SurfaceCard>
  );
};
