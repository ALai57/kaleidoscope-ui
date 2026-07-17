import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { RecipeSection, Timeline } from '../../../types/recipe';
import {
  pickLaneColors,
  resolvePhaseSteps,
  sectionForComponent,
  effectiveDuration,
} from '../../../utils/cookTimeline';
import { TimelineGantt } from './TimelineGantt';
import { TimelineLegend } from './TimelineLegend';
import { TimelineDetailPanel, type PhaseGroup } from './TimelineDetailPanel';
import { MobileCookTimeline } from './MobileCookTimeline';

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
  checked: ReadonlySet<string>;
  onToggleIngredient: (key: string) => void;
}

const firstPhaseId = (t: Timeline): string | null => t.components[0]?.phases[0]?.id ?? null;

export const CookTimeline: React.FC<CookTimelineProps> = ({
  timeline,
  sections,
  checked,
  onToggleIngredient,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const sectionColors = pickLaneColors(sections.length, theme.tokens.color.categorical);
  const laneColors = timeline.components.map((comp, ci) => {
    const secIndex = sectionForComponent(comp, sections)?.index ?? ci;
    return sectionColors[secIndex] ?? theme.tokens.color.brand.primary;
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(() => firstPhaseId(timeline));

  const groups = React.useMemo<PhaseGroup[]>(
    () =>
      timeline.components.flatMap((comp, ci) => {
        const sec = sectionForComponent(comp, sections);
        return comp.phases.map((phase) => ({
          id: phase.id,
          label: phase.label,
          componentName: sec?.section.name ?? comp.name,
          laneColor: laneColors[ci] ?? theme.tokens.color.brand.primary,
          kind: phase.kind,
          start: phase.start ?? 0,
          dur: effectiveDuration(phase, timeline.overrides),
          steps: resolvePhaseSteps(phase, comp, sections),
        }));
      }),
    [timeline, sections, laneColors, theme]
  );

  const selectedSection = React.useMemo(() => {
    const comp = timeline.components.find((c) => c.phases.some((p) => p.id === selectedId));
    return comp ? sectionForComponent(comp, sections) : null;
  }, [timeline, sections, selectedId]);

  if (isMobile) {
    return (
      <MobileCookTimeline
        timeline={timeline}
        sections={sections}
        checked={checked}
        onToggleIngredient={onToggleIngredient}
      />
    );
  }

  return (
    <Board>
      <Eyebrow>Cook Timeline</Eyebrow>
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
        selectedId={selectedId}
        groups={groups}
        ingredients={selectedSection?.section.ingredients ?? []}
        sectionIndex={selectedSection?.index ?? 0}
        checked={checked}
        onToggleIngredient={onToggleIngredient}
      />
    </Board>
  );
};
