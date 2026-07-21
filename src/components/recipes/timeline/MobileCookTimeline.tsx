import * as React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { alpha } from '../../../theme/alpha';
import { ingredientLabelSlotProps } from '../ingredientLabelSlotProps';
import type { RecipeSection, TimelineComponent, TimelinePhase } from '../../../types/recipe';
import {
  pickLaneColors,
  resolvePhaseSteps,
  sectionForComponent,
  effectiveDuration,
  ingredientKey,
  phaseLabelRepeatsComponent,
} from '../../../utils/cookTimeline';
import type { CookTimelineProps } from './CookTimeline';

// ---------- schematic mini-gantt overview ----------
const Mini = styled('div')(({ theme }) => ({
  background: theme.tokens.color.surface.sunken,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.md,
  padding: '12px 14px 10px',
  marginBottom: 14,
}));
const MiniCap = styled('div')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 9.5,
  letterSpacing: '.18em',
  textTransform: 'uppercase',
  color: theme.tokens.color.text.disabled,
  margin: '0 0 10px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  '& b': { color: theme.tokens.color.brand.primary, fontWeight: 400 },
}));
const MiniLane = styled('button', { shouldForwardProp: (p) => p !== 'dim' })<{ dim: boolean }>(
  ({ theme, dim }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    height: 20,
    width: '100%',
    padding: 0,
    background: 'transparent',
    border: 0,
    borderRadius: 5,
    cursor: 'pointer',
    opacity: dim ? 0.32 : 1,
    transition: `opacity .15s ${theme.tokens.motion.easing.standard}`,
    '&:focus-visible': { outline: `2px solid ${theme.tokens.color.brand.primary}`, outlineOffset: 2 },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  })
);
const MiniSwatch = styled('span', { shouldForwardProp: (p) => p !== 'c' })<{ c: string }>(
  ({ c }) => ({ width: 8, height: 8, borderRadius: 2, background: c, flex: 'none' })
);
const MiniTrack = styled('span')({ position: 'relative', flex: 1, height: '100%' });
const MiniBar = styled('span', { shouldForwardProp: (p) => p !== 'c' && p !== 'passive' })<{
  c: string;
  passive: boolean;
}>(({ theme, c, passive }) => ({
  position: 'absolute',
  top: 6,
  height: 8,
  borderRadius: 2,
  background: c,
  ...(passive && {
    opacity: 0.45,
    backgroundImage: `repeating-linear-gradient(45deg, ${alpha(
      theme.tokens.color.surface.base,
      0.35
    )} 0 1px, transparent 1px 4px)`,
  }),
}));
const MiniAxis = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 0 0 17px',
  fontFamily: theme.tokens.typography.mono,
  fontSize: 9,
  color: theme.tokens.color.text.disabled,
}));

// ---------- section selector ----------
const SecSel = styled('div')({ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 });
const SecChip = styled('button', { shouldForwardProp: (p) => p !== 'selected' })<{
  selected: boolean;
}>(({ theme, selected }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 11,
  letterSpacing: '.03em',
  color: selected ? theme.tokens.color.text.primary : theme.tokens.color.text.secondary,
  background: selected ? theme.tokens.color.surface.sunken : 'transparent',
  border: `1px solid ${
    selected ? alpha(theme.tokens.color.brand.primary, 0.45) : theme.tokens.color.border.strong
  }`,
  borderRadius: theme.tokens.radius.pill,
  padding: '6px 12px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  '&:focus-visible': { outline: `2px solid ${theme.tokens.color.brand.primary}`, outlineOffset: 2 },
}));
const ChipSwatch = styled('span', { shouldForwardProp: (p) => p !== 'c' })<{ c: string }>(
  ({ c }) => ({ width: 8, height: 8, borderRadius: 2, background: c, flex: 'none' })
);

// ---------- shared ingredients panel ----------
const IngPanel = styled('div')(({ theme }) => ({
  marginBottom: 16,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  borderRadius: theme.tokens.radius.md,
  overflow: 'hidden',
  background: theme.tokens.color.surface.base,
}));
const IngToggle = styled('button', { shouldForwardProp: (p) => p !== 'open' })<{ open: boolean }>(
  ({ theme, open }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: theme.tokens.color.surface.sunken,
    border: 0,
    padding: '9px 12px',
    cursor: 'pointer',
    color: open ? theme.tokens.color.text.primary : theme.tokens.color.text.secondary,
    fontFamily: theme.tokens.typography.mono,
    fontSize: 10,
    letterSpacing: '.16em',
    textTransform: 'uppercase',
    '&:focus-visible': { outline: `2px solid ${theme.tokens.color.brand.primary}`, outlineOffset: -2 },
  })
);
const Caret = styled('span', { shouldForwardProp: (p) => p !== 'open' })<{ open: boolean }>(
  ({ theme, open }) => ({
    marginLeft: 'auto',
    fontSize: 9,
    color: theme.tokens.color.text.disabled,
    transform: open ? 'rotate(90deg)' : 'none',
    transition: `transform .2s ${theme.tokens.motion.easing.standard}`,
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  })
);
const IngGroup = styled('div')(({ theme }) => ({
  padding: '4px 14px 10px',
  '&:first-of-type': { paddingTop: 10 },
  '& + &': { borderTop: `1px solid ${theme.tokens.color.border.subtle}` },
}));
const IngGroupHead = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 0 4px',
  fontFamily: theme.tokens.typography.mono,
  fontSize: 11,
  letterSpacing: '.02em',
  color: theme.tokens.color.text.primary,
}));
const IngList = styled('div')({ display: 'flex', flexDirection: 'column' });

// ---------- vertical schedule ----------
const Sched = styled('div')({ display: 'flex', flexDirection: 'column' });
const SRow = styled('div')({ position: 'relative', padding: '0 0 0 62px' });
const Clock = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 14,
  width: 46,
  textAlign: 'right',
  fontFamily: theme.tokens.typography.mono,
  fontSize: 11,
  color: theme.tokens.color.text.secondary,
  fontVariantNumeric: 'tabular-nums',
  '& small': { display: 'block', color: theme.tokens.color.text.disabled, fontSize: 9.5 },
}));
const Rail = styled('span', { shouldForwardProp: (p) => p !== 'c' })<{ c: string }>(({ c }) => ({
  position: 'absolute',
  left: 54,
  top: 0,
  bottom: 0,
  width: 2,
  background: alpha(c, 0.2),
}));
const Node = styled('span', { shouldForwardProp: (p) => p !== 'c' && p !== 'active' })<{
  c: string;
  active: boolean;
}>(({ theme, c, active }) => ({
  position: 'absolute',
  left: 49,
  top: 16,
  width: 12,
  height: 12,
  borderRadius: '50%',
  border: `2px solid ${theme.tokens.color.surface.base}`,
  background: active ? c : theme.tokens.color.surface.base,
  boxShadow: `0 0 0 2px ${c}`,
  zIndex: 2,
}));
const SCard = styled('div', { shouldForwardProp: (p) => p !== 'passive' })<{ passive: boolean }>(
  ({ theme, passive }) => ({
    margin: '6px 0',
    border: `1px solid ${theme.tokens.color.border.subtle}`,
    borderRadius: theme.tokens.radius.md,
    overflow: 'hidden',
    background: passive
      ? `repeating-linear-gradient(45deg, ${alpha(
          theme.tokens.color.text.secondary,
          0.03
        )} 0 6px, transparent 6px 12px), ${theme.tokens.color.surface.base}`
      : theme.tokens.color.surface.base,
  })
);
const SButton = styled('button')(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  background: 'transparent',
  border: 0,
  cursor: 'pointer',
  padding: '12px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: theme.tokens.color.text.primary,
  '&:focus-visible': { outline: `2px solid ${theme.tokens.color.brand.primary}`, outlineOffset: -2 },
}));
const STitle = styled('div')({ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 });
const SLabel = styled('span')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 13.5,
  fontWeight: 600,
}));
const SComp = styled('span')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 10.5,
  color: theme.tokens.color.text.secondary,
  letterSpacing: '.04em',
}));
const SMeta = styled('div')({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flex: 'none',
});
const KindPill = styled('span')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 9.5,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  padding: '1px 7px',
  borderRadius: theme.tokens.radius.pill,
  border: `1px solid ${theme.tokens.color.border.strong}`,
  color: theme.tokens.color.text.secondary,
}));
const Expand = styled('div')({ padding: '0 14px 14px' });
const ExpandHead = styled('h4')(({ theme }) => ({
  fontFamily: theme.tokens.typography.mono,
  fontSize: 10,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: theme.tokens.color.text.disabled,
  margin: '4px 0 8px',
}));
const StepList = styled('ol')({
  margin: 0,
  padding: '0 0 0 18px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});
const StepItem = styled('li')(({ theme }) => ({
  fontFamily: theme.tokens.typography.fontFamily,
  fontSize: 13,
  color: theme.tokens.color.text.primary,
}));

interface CompMeta {
  comp: TimelineComponent;
  compIndex: number;
  color: string;
  displayName: string;
  section: RecipeSection | null;
  sectionIndex: number;
}
interface FlatPhase extends CompMeta {
  phase: TimelinePhase;
}

export const MobileCookTimeline: React.FC<CookTimelineProps> = ({
  timeline,
  sections,
  checked,
  onToggleIngredient,
}) => {
  const theme = useTheme();
  // Color each lane by its resolved SECTION index (not component order) so a
  // section reads the same color here as in the Raw and Shopping views.
  const sectionColors = pickLaneColors(sections.length, theme.tokens.color.categorical);
  const laneColors = timeline.components.map((comp, ci) => {
    const secIndex = sectionForComponent(comp, sections)?.index ?? ci;
    return sectionColors[secIndex] ?? theme.tokens.color.brand.primary;
  });
  const total = timeline.total_minutes || 1;

  const [section, setSection] = React.useState<'all' | string>('all');
  const [openPhaseId, setOpenPhaseId] = React.useState<string | null>(null);
  const [ingPanelOpen, setIngPanelOpen] = React.useState(false);

  const compMeta: CompMeta[] = timeline.components.map((comp, compIndex) => {
    const sec = sectionForComponent(comp, sections);
    return {
      comp,
      compIndex,
      color: laneColors[compIndex] ?? theme.tokens.color.brand.primary,
      displayName: sec?.section.name ?? comp.name,
      section: sec?.section ?? null,
      sectionIndex: sec?.index ?? 0,
    };
  });

  const flatPhases: FlatPhase[] = compMeta
    .flatMap((m) => m.comp.phases.map((phase) => ({ ...m, phase })))
    .sort((a, b) => (a.phase.start ?? 0) - (b.phase.start ?? 0));

  const scheduled =
    section === 'all' ? flatPhases : flatPhases.filter((p) => p.comp.name === section);

  const ingredientMeta = section === 'all' ? compMeta : compMeta.filter((m) => m.comp.name === section);
  const ingredientTotal = ingredientMeta.reduce(
    (n, m) => n + (m.section?.ingredients.length ?? 0),
    0
  );
  const single = ingredientMeta.length === 1 && ingredientMeta[0];
  const ingTitle = single
    ? `${single.displayName} · Ingredients · ${ingredientTotal}`
    : `Ingredients · ${ingredientTotal}`;

  return (
    <div>
      {/* 1 — schematic overview */}
      <Mini>
        <MiniCap>
          <span>How it fits together</span>
          <span>
            tap a row to focus · <b>{total} min</b>
          </span>
        </MiniCap>
        {compMeta.map((m) => (
          <MiniLane
            key={m.comp.name}
            type="button"
            dim={section !== 'all' && section !== m.comp.name}
            aria-label={`Focus ${m.displayName}`}
            onClick={() => setSection(m.comp.name)}
          >
            <MiniSwatch c={m.color} />
            <MiniTrack>
              {m.comp.phases.map((phase) => {
                const start = phase.start ?? 0;
                const dur = effectiveDuration(phase, timeline.overrides);
                return (
                  <MiniBar
                    key={phase.id}
                    c={m.color}
                    passive={phase.kind === 'passive'}
                    style={{ left: `${(start / total) * 100}%`, width: `${(dur / total) * 100}%` }}
                  />
                );
              })}
            </MiniTrack>
          </MiniLane>
        ))}
        <MiniAxis>
          <span>start</span>
          <span>+{total} min</span>
        </MiniAxis>
      </Mini>

      {/* 2 — section selector */}
      <SecSel>
        <SecChip type="button" selected={section === 'all'} onClick={() => setSection('all')}>
          Whole timeline
        </SecChip>
        {compMeta.map((m) => (
          <SecChip
            key={m.comp.name}
            type="button"
            selected={section === m.comp.name}
            onClick={() => setSection(m.comp.name)}
          >
            <ChipSwatch c={m.color} />
            {m.displayName}
          </SecChip>
        ))}
      </SecSel>

      {/* 3 — shared ingredients panel */}
      <IngPanel>
        <IngToggle
          type="button"
          open={ingPanelOpen}
          aria-expanded={ingPanelOpen}
          onClick={() => setIngPanelOpen((v) => !v)}
        >
          <span>{ingTitle}</span>
          <Caret open={ingPanelOpen}>▶</Caret>
        </IngToggle>
        {ingPanelOpen &&
          ingredientMeta.map((m) => {
            const ingredients = m.section?.ingredients ?? [];
            if (ingredients.length === 0) return null;
            return (
              <IngGroup key={m.comp.name}>
                {ingredientMeta.length > 1 && (
                  <IngGroupHead>
                    <ChipSwatch c={m.color} />
                    {m.displayName}
                  </IngGroupHead>
                )}
                <IngList>
                  {ingredients.map((ing, j) => {
                    const key = ingredientKey(m.sectionIndex, j);
                    return (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            checked={checked.has(key)}
                            onChange={() => onToggleIngredient(key)}
                            slotProps={{ input: { 'aria-label': ing } }}
                          />
                        }
                        label={ing}
                        slotProps={ingredientLabelSlotProps}
                      />
                    );
                  })}
                </IngList>
              </IngGroup>
            );
          })}
      </IngPanel>

      {/* 4 — vertical schedule */}
      <Sched>
        {scheduled.map((p) => {
          const start = p.phase.start ?? 0;
          const dur = effectiveDuration(p.phase, timeline.overrides);
          const active = p.phase.kind === 'active';
          const open = openPhaseId === p.phase.id;
          return (
            <SRow key={p.phase.id}>
              <Clock>
                +{start}m<small>{dur} min</small>
              </Clock>
              <Rail c={p.color} />
              <Node c={p.color} active={active} />
              <SCard passive={!active}>
                <SButton
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenPhaseId((cur) => (cur === p.phase.id ? null : p.phase.id))}
                >
                  <STitle>
                    <SLabel>{p.phase.label}</SLabel>
                    {/* Skip the component subtitle when it just repeats the
                        phase label, so the card doesn't show "Prep broth" twice. */}
                    {!phaseLabelRepeatsComponent(p.displayName, p.phase.label) && (
                      <SComp>{p.displayName}</SComp>
                    )}
                  </STitle>
                  <SMeta>
                    <KindPill>{p.phase.kind}</KindPill>
                    <Caret open={open}>▶</Caret>
                  </SMeta>
                </SButton>
                {open && (
                  <Expand>
                    <ExpandHead>Instructions</ExpandHead>
                    <StepList>
                      {resolvePhaseSteps(p.phase, p.comp, sections).map((s, i) => (
                        <StepItem key={i}>{s}</StepItem>
                      ))}
                    </StepList>
                  </Expand>
                )}
              </SCard>
            </SRow>
          );
        })}
      </Sched>
    </div>
  );
};
