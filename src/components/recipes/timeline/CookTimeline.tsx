import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import type { RecipeSection, Timeline } from '../../../types/recipe';
import { pickLaneColors, resolvePhaseSteps } from '../../../utils/cookTimeline';
import { TimelineStats } from './TimelineStats';
import { TimelineGantt } from './TimelineGantt';
import { TimelineLegend } from './TimelineLegend';
import { TimelineDetailPanel } from './TimelineDetailPanel';

const Board = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.base,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.lg,
  padding: '24px 22px',
  marginTop: 32,
  color: theme.tokens.color.text.primary,
}));
const Eyebrow = styled('p')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono, fontSize: 11, letterSpacing: '.28em',
  textTransform: 'uppercase', color: theme.tokens.color.brand.primary, margin: '0 0 12px',
}));
const GanttShell = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.raised,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.lg, boxShadow: theme.tokens.elevation.md,
  padding: '6px 0 14px', overflow: 'hidden',
}));

export interface CookTimelineProps {
  timeline: Timeline;
  sections: RecipeSection[];
}

const firstPhaseId = (t: Timeline): string | null => t.components[0]?.phases[0]?.id ?? null;

export const CookTimeline: React.FC<CookTimelineProps> = ({ timeline, sections }) => {
  const theme = useTheme();
  const laneColors = pickLaneColors(timeline.components.length, theme.tokens.color.categorical);
  const [selectedId, setSelectedId] = React.useState<string | null>(() => firstPhaseId(timeline));

  const selected = React.useMemo(() => {
    for (let i = 0; i < timeline.components.length; i += 1) {
      const comp = timeline.components[i];
      if (!comp) continue;
      const phase = comp.phases.find((p) => p.id === selectedId);
      if (phase) {
        return {
          phase, componentName: comp.name, laneColor: laneColors[i],
          steps: resolvePhaseSteps(phase, comp, sections),
        };
      }
    }
    return null;
  }, [selectedId, timeline, sections, laneColors]);

  return (
    <Board>
      <Eyebrow>Cook Timeline</Eyebrow>
      <TimelineStats timeline={timeline} />
      <GanttShell>
        <TimelineGantt
          timeline={timeline}
          laneColors={laneColors}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </GanttShell>
      <TimelineLegend />
      <TimelineDetailPanel
        phase={selected?.phase ?? null}
        componentName={selected?.componentName ?? ''}
        laneColor={selected?.laneColor ?? theme.tokens.color.brand.primary}
        steps={selected?.steps ?? []}
      />
    </Board>
  );
};
