import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import type { Timeline, TimelinePhase } from '../../../types/recipe';
import { effectiveDuration } from '../../../utils/cookTimeline';
import { alpha } from '../../../theme/alpha';
import { PX_PER_MIN, RULER_H, ROW_H, ROW_GAP, GUTTER } from './constants';

const Scroller = styled('div')({ overflowX: 'auto', overflowY: 'hidden' });
const Canvas = styled('div')({ position: 'relative' });

const Ruler = styled('div')(({ theme }) => ({
  position: 'relative', height: RULER_H, borderBottom: `1px solid ${theme.tokens.color.border.subtle}`,
}));
const Tick = styled('div')<{ major?: boolean }>(({ theme, major }) => ({
  position: 'absolute', top: 0, bottom: 0,
  borderLeft: `1px solid ${major ? theme.tokens.color.border.strong : theme.tokens.color.border.subtle}`,
}));
const TickLabel = styled('span')(({ theme }) => ({
  position: 'absolute', top: 9, left: 7, fontFamily: theme.tokens.typography.mono, fontSize: 10.5,
  color: theme.tokens.color.text.disabled, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums',
}));

const Lane = styled('div')({ position: 'relative', height: ROW_H, marginTop: ROW_GAP });
const LaneLabel = styled('div')(({ theme }) => ({
  position: 'sticky', left: 0, zIndex: 5, width: GUTTER, height: '100%',
  display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, padding: '0 14px 0 22px',
  background: `linear-gradient(90deg, ${theme.tokens.color.surface.raised} 82%, transparent)`,
  fontFamily: theme.tokens.typography.mono,
}));
const Swatch = styled('span')<{ c: string }>(({ c }) => ({ width: 9, height: 9, borderRadius: 2, background: c, flex: 'none' }));
const Track = styled('div')({ position: 'absolute', left: GUTTER, top: 0, bottom: 0, right: 0 });

const Bar = styled('button')<{ kind: 'active' | 'passive'; selected: boolean; c: string }>(
  ({ theme, kind, selected, c }) => ({
    position: 'absolute', top: 7, height: ROW_H - 14, borderRadius: 5,
    display: 'flex', alignItems: 'center', gap: 7, padding: '0 10px', overflow: 'hidden',
    cursor: 'pointer', fontFamily: theme.tokens.typography.mono, fontSize: 11.5, fontWeight: 600,
    transition: `transform .25s ${theme.tokens.motion.easing.springSettle}, box-shadow .25s`,
    outline: selected ? `2px solid ${theme.tokens.color.brand.primary}` : '2px solid transparent',
    outlineOffset: 2,
    ...(kind === 'active'
      ? {
          background: c,
          border: 'none',
          // eslint-disable-next-line no-restricted-syntax -- fixed on-color for text over an accent fill (varies per lane, not a theme surface)
          color: '#08121a',
        }
      : {
          background: 'transparent', border: `1.5px dashed ${c}`, color: c,
          backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 6px, ${alpha(theme.tokens.color.text.primary, 0.05)} 6px, ${alpha(theme.tokens.color.text.primary, 0.05)} 7px)`,
        }),
    '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.tokens.elevation.md, zIndex: 6 },
    '&:focus-visible': { outline: `2px solid ${theme.tokens.color.brand.primary}` },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
  })
);

const Links = styled('svg')({
  position: 'absolute', left: GUTTER, top: 0, right: 0, bottom: 0, pointerEvents: 'none', overflow: 'visible',
});

interface Placed { phase: TimelinePhase; laneIndex: number; }

export interface TimelineGanttProps {
  timeline: Timeline;
  laneColors: string[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const TimelineGantt: React.FC<TimelineGanttProps> = ({
  timeline, laneColors, selectedId, onSelect,
}) => {
  const theme = useTheme();
  const total = timeline.total_minutes;
  const trackW = total * PX_PER_MIN;
  // Guard for noUncheckedIndexedAccess: laneColors is expected to have one
  // entry per lane (via pickLaneColors), but index access still types as
  // possibly-undefined — fall back to a theme color rather than a literal.
  const fallbackColor = laneColors[0] ?? theme.tokens.color.brand.primary;

  const placed: Placed[] = timeline.components.flatMap((c, laneIndex) =>
    c.phases.map((phase) => ({ phase, laneIndex }))
  );
  const byId = new Map(placed.map((p) => [p.phase.id, p]));
  const laneCenterY = (i: number) => RULER_H + ROW_GAP + i * (ROW_H + ROW_GAP) + ROW_H / 2;

  const ticks: number[] = [];
  for (let m = 0; m <= total; m += 5) ticks.push(m);

  const links = placed.flatMap((p) =>
    p.phase.deps
      .map((depId) => byId.get(depId))
      .filter((from): from is Placed => Boolean(from))
      .map((from) => {
        const x1 = ((from.phase.start ?? 0) + effectiveDuration(from.phase, timeline.overrides)) * PX_PER_MIN;
        const y1 = laneCenterY(from.laneIndex);
        const x2 = (p.phase.start ?? 0) * PX_PER_MIN;
        const y2 = laneCenterY(p.laneIndex);
        const mx = x1 + Math.max(14, (x2 - x1) / 2);
        return { d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, key: `${from.phase.id}->${p.phase.id}` };
      })
  );

  const svgH = laneCenterY(timeline.components.length);

  return (
    <Scroller>
      <Canvas style={{ width: GUTTER + trackW + 20 }}>
        <Ruler style={{ marginLeft: GUTTER }}>
          {ticks.map((m) => (
            <Tick key={m} major={m % 10 === 0} style={{ left: m * PX_PER_MIN }}>
              {m % 10 === 0 && m !== 0 && <TickLabel>{m}m</TickLabel>}
            </Tick>
          ))}
        </Ruler>

        {timeline.components.map((c, laneIndex) => (
          <Lane key={c.name}>
            <LaneLabel>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                <Swatch c={laneColors[laneIndex] ?? fallbackColor} />{c.name}
              </span>
            </LaneLabel>
            <Track>
              {c.phases.map((phase) => {
                const start = phase.start ?? 0;
                const dur = effectiveDuration(phase, timeline.overrides);
                return (
                  <Bar
                    key={phase.id}
                    kind={phase.kind}
                    data-kind={phase.kind}
                    selected={selectedId === phase.id}
                    c={laneColors[laneIndex] ?? fallbackColor}
                    style={{ left: start * PX_PER_MIN, width: dur * PX_PER_MIN - 2 }}
                    title={`${c.name} · ${phase.label} · +${start}–${start + dur} min`}
                    onClick={() => onSelect(phase.id)}
                  >
                    {`${c.name} · ${phase.label}`}
                  </Bar>
                );
              })}
            </Track>
          </Lane>
        ))}

        <Links style={{ height: svgH }}>
          {links.map((l) => (
            <path key={l.key} d={l.d} fill="none" stroke="currentColor"
              strokeWidth={1.4} strokeDasharray="2 4" opacity={0.7} />
          ))}
        </Links>
      </Canvas>
    </Scroller>
  );
};
