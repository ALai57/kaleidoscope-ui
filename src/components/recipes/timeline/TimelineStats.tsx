import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { Timeline } from '../../../types/recipe';
import { timelineStats, backPlanStart } from '../../../utils/cookTimeline';

const Strip = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr) 1.5fr',
  gap: 12,
  margin: '26px 0 22px',
  '@media (max-width: 760px)': { gridTemplateColumns: '1fr 1fr' },
});
const Tile = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.raised,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.lg,
  padding: '15px 17px',
  fontFamily: theme.tokens.typography.mono,
}));
const K = styled('div')(({ theme }) => ({
  fontSize: 10.5,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: theme.tokens.color.text.disabled,
}));
const V = styled('div')(({ theme }) => ({
  fontSize: 26,
  fontWeight: 600,
  marginTop: 8,
  fontVariantNumeric: 'tabular-nums',
  color: theme.tokens.color.text.primary,
}));
const N = styled('div')(({ theme }) => ({
  fontSize: 12,
  color: theme.tokens.color.text.secondary,
  marginTop: 4,
}));
const Small = styled('small')(({ theme }) => ({
  fontSize: 13,
  color: theme.tokens.color.text.secondary,
  fontWeight: 500,
}));

const StartCard = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.raised,
  border: `1px solid ${theme.tokens.color.brand.primary}`,
  borderRadius: theme.tokens.radius.lg,
  padding: '15px 17px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 9,
  fontFamily: theme.tokens.typography.mono,
}));
const StartRow = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  gap: 10,
  flexWrap: 'wrap',
});
const Big = styled('span')(({ theme }) => ({
  fontSize: 26,
  fontWeight: 600,
  color: theme.tokens.color.text.primary,
  fontVariantNumeric: 'tabular-nums',
}));
const Label = styled('label')(({ theme }) => ({
  fontSize: 11,
  color: theme.tokens.color.text.secondary,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));
const TimeInput = styled('input')(({ theme }) => ({
  background: theme.tokens.color.surface.sunken,
  color: theme.tokens.color.text.primary,
  border: `1px solid ${theme.tokens.color.border.strong}`,
  borderRadius: theme.tokens.radius.sm,
  padding: '5px 8px',
  fontFamily: theme.tokens.typography.mono,
  fontSize: 13,
  // Native picker chrome follows the app mode (was pinned dark under PrismThemeProvider).
  colorScheme: theme.palette.mode,
}));

export const TimelineStats: React.FC<{ timeline: Timeline }> = ({ timeline }) => {
  const [serve, setServe] = React.useState('18:30');
  const s = timelineStats(timeline);
  const startClock = backPlanStart(serve, s.totalMinutes);
  return (
    <Strip>
      <Tile>
        <K>Total elapsed</K>
        <V>
          {s.totalMinutes}
          <Small> min</Small>
        </V>
        <N>start → serve</N>
      </Tile>
      <Tile>
        <K>Hands-on</K>
        <V>
          {s.handsOnMinutes}
          <Small> min</Small>
        </V>
        <N>across {s.activeCount} active steps</N>
      </Tile>
      <Tile>
        <K>You&apos;re free</K>
        <V>
          {s.freeMinutes}
          <Small> min</Small>
        </V>
        <N>{s.passiveWindows} hands-off windows</N>
      </Tile>
      <StartCard>
        <K>Back-planned start</K>
        <StartRow>
          <Big data-testid="start-clock">{startClock}</Big>
          <span>→ serve</span>
          <Label>
            Serving at
            <TimeInput
              type="time"
              step={300}
              value={serve}
              onChange={(e) => setServe(e.target.value)}
            />
          </Label>
        </StartRow>
      </StartCard>
    </Strip>
  );
};
