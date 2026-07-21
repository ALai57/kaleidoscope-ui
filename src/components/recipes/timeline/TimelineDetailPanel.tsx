import * as React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { alpha } from '../../../theme/alpha';
import { animateScrollTo } from '../../../utils/animateScroll';
import { ingredientKey, phaseLabelRepeatsComponent } from '../../../utils/cookTimeline';
import { ingredientLabelSlotProps } from '../ingredientLabelSlotProps';

export interface PhaseGroup {
  id: string;
  label: string;
  componentName: string;
  laneColor: string;
  kind: 'active' | 'passive';
  start: number;
  dur: number;
  steps: string[];
}

export interface TimelineDetailPanelProps {
  selectedId: string | null;
  /** ALL phases, reading order (built by CookTimeline). */
  groups: PhaseGroup[];
  /** The selected phase's section ingredients. */
  ingredients: string[];
  sectionIndex: number;
  checked: ReadonlySet<string>;
  onToggleIngredient: (key: string) => void;
}

const Panel = styled('div')(({ theme }) => {
  const { color, radius, typography } = theme.tokens;
  return {
    marginTop: 16,
    background: color.surface.sunken,
    border: `1px solid ${color.border.subtle}`,
    borderRadius: radius.lg,
    padding: '18px 20px',
    fontFamily: typography.mono,
    color: color.text.primary,
    display: 'grid',
    gridTemplateColumns: 'minmax(180px, 260px) 1fr',
    gap: 20,
    alignItems: 'start',
  };
});

const Col = styled('div')({ display: 'flex', flexDirection: 'column', minWidth: 0 });
const ColTitle = styled('h3')(({ theme }) => ({
  margin: '0 0 10px',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  color: theme.tokens.color.brand.primary,
}));

const Hint = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.tokens.color.text.secondary,
  fontSize: 13,
}));

const IngredientList = styled('div')({ display: 'flex', flexDirection: 'column' });

const Window = styled('div')({
  maxHeight: 320,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  paddingRight: 4,
});

// The custom "c" prop must not land on the DOM element.
const Dot = styled('span', { shouldForwardProp: (p) => p !== 'c' })<{ c: string }>(({ c }) => ({
  width: 10,
  height: 10,
  borderRadius: 3,
  flex: 'none',
  background: c,
}));

const InstrGroup = styled('div')(({ theme }) => ({
  padding: '10px 12px',
  borderRadius: theme.tokens.radius.md,
  border: `1px solid ${theme.tokens.color.border.subtle}`,
  background: theme.tokens.color.surface.base,
  '&.sel': {
    borderColor: theme.tokens.color.brand.primary,
    background: alpha(theme.tokens.color.brand.primary, 0.1),
  },
}));

const GroupHead = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  flexWrap: 'wrap',
});
const Name = styled('span')(({ theme }) => ({
  fontSize: 14,
  fontWeight: 600,
  color: theme.tokens.color.text.primary,
}));
const Meta = styled('small')(({ theme }) => ({
  fontSize: 11,
  color: theme.tokens.color.text.secondary,
  fontVariantNumeric: 'tabular-nums',
}));
const KindPill = styled('span')(({ theme }) => ({
  fontSize: 9.5,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  padding: '1px 7px',
  borderRadius: 999,
  border: `1px solid ${theme.tokens.color.border.strong}`,
  color: theme.tokens.color.text.secondary,
  marginLeft: 'auto',
}));

const StepList = styled('ol')({
  margin: '8px 0 0',
  padding: '0 0 0 18px',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});
const StepItem = styled('li')(({ theme }) => ({
  fontSize: 15,
  lineHeight: 1.6,
  color: theme.tokens.color.text.primary,
}));

export const TimelineDetailPanel: React.FC<TimelineDetailPanelProps> = ({
  selectedId,
  groups,
  ingredients,
  sectionIndex,
  checked,
  onToggleIngredient,
}) => {
  const winRef = React.useRef<HTMLDivElement>(null);
  const reduced = React.useMemo(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  React.useEffect(() => {
    const win = winRef.current;
    if (!win || !selectedId) return;
    const tgt = win.querySelector<HTMLElement>(`[data-group="${selectedId}"]`);
    if (!tgt) return;
    const top =
      win.scrollTop + (tgt.getBoundingClientRect().top - win.getBoundingClientRect().top) - 8;
    animateScrollTo(win, top, { reduced });
  }, [selectedId, reduced]);

  return (
    <Panel>
      <Col>
        <ColTitle>Ingredients</ColTitle>
        {ingredients.length === 0 ? (
          <Hint>Pick a block to see its ingredients.</Hint>
        ) : (
          <IngredientList>
            {ingredients.map((ing, j) => {
              const key = ingredientKey(sectionIndex, j);
              return (
                <FormControlLabel
                  key={j}
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
          </IngredientList>
        )}
      </Col>
      <Col>
        <ColTitle>Full method</ColTitle>
        <Window ref={winRef}>
          {groups.map((g) => (
            <InstrGroup
              key={g.id}
              data-group={g.id}
              className={g.id === selectedId ? 'instr-group sel' : 'instr-group'}
            >
              <GroupHead>
                <Dot c={g.laneColor} />
                <Name className="ig-name">{g.label}</Name>
                <Meta>
                  {/* Omit the component name when the heading (g.label) already
                      is it, so the meta line doesn't repeat "Prep broth". */}
                  {!phaseLabelRepeatsComponent(g.componentName, g.label) &&
                    `${g.componentName} · `}
                  +{g.start}–{g.start + g.dur} min
                </Meta>
                <KindPill>{g.kind}</KindPill>
              </GroupHead>
              <StepList>
                {g.steps.map((s, i) => (
                  <StepItem key={i}>{s}</StepItem>
                ))}
              </StepList>
            </InstrGroup>
          ))}
        </Window>
      </Col>
    </Panel>
  );
};
