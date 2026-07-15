import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { TimelinePhase } from '../../../types/recipe';
import { effectiveDuration } from '../../../utils/cookTimeline';

const Panel = styled('div')(({ theme }) => {
  const { color, radius, typography } = theme.tokens;
  return {
    marginTop: 16,
    background: color.surface.sunken,
    border: `1px solid ${color.border.subtle}`,
    borderRadius: radius.lg,
    padding: '18px 20px',
    minHeight: 96,
    fontFamily: typography.mono,
    color: color.text.primary,
  };
});

const Head = styled('div')({ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' });
const Badge = styled('span', { shouldForwardProp: (p) => p !== 'c' })<{ c: string }>(({ c }) => ({
  width: 11, height: 11, borderRadius: 3, flex: 'none', background: c,
}));
const Kind = styled('span')(({ theme }) => ({
  fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase',
  padding: '2px 8px', borderRadius: 999,
  border: `1px solid ${theme.tokens.color.border.strong}`, color: theme.tokens.color.text.secondary,
}));
const When = styled('span')(({ theme }) => ({
  fontSize: 11.5, color: theme.tokens.color.text.secondary, marginLeft: 'auto',
  fontVariantNumeric: 'tabular-nums',
}));
const Steps = styled('ol')({
  margin: '14px 0 0', padding: 0, listStyle: 'none',
  display: 'flex', flexDirection: 'column', gap: 9, counterReset: 'step',
});
const Step = styled('li')(({ theme }) => ({
  position: 'relative', paddingLeft: 30, fontSize: 14, color: theme.tokens.color.text.primary,
  '&::before': {
    counterIncrement: 'step', content: 'counter(step)',
    position: 'absolute', left: 0, top: -1, width: 20, height: 20, borderRadius: 6,
    background: theme.tokens.color.surface.raised,
    border: `1px solid ${theme.tokens.color.border.strong}`,
    fontSize: 11, color: theme.tokens.color.text.secondary,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
}));
const Hint = styled('p')(({ theme }) => ({
  marginTop: 12, color: theme.tokens.color.text.secondary, fontSize: 13,
}));

export interface TimelineDetailPanelProps {
  phase: TimelinePhase | null;
  componentName: string;
  laneColor: string;
  steps: string[];
}

export const TimelineDetailPanel: React.FC<TimelineDetailPanelProps> = ({
  phase, componentName, laneColor, steps,
}) => {
  if (!phase) {
    return (
      <Panel>
        <Head>
          <Badge c={laneColor} />
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Pick a block to see its steps</h3>
        </Head>
        <Hint>Each block expands into the exact steps for that part of the recipe.</Hint>
      </Panel>
    );
  }
  const start = phase.start ?? 0;
  const end = start + effectiveDuration(phase, []);
  return (
    <Panel style={{ borderColor: laneColor }}>
      <Head>
        <Badge c={laneColor} />
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{componentName} · {phase.label}</h3>
        <Kind>{phase.kind}</Kind>
        <When>+{start}–{end} min · {end - start} min</When>
      </Head>
      <Steps>{steps.map((s, i) => <Step key={i}>{s}</Step>)}</Steps>
    </Panel>
  );
};
