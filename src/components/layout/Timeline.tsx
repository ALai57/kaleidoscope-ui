import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MuiTimeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';
import { TimelineEntry } from './TimelineEntry';
import { useIsMobile } from '@/hooks/useIsMobile';
import { TIMELINE_ENTRIES } from '../../data/timeline';
import type {
  TimelineCategory,
  TimelineEntry as TimelineEntryData,
} from '../../data/timeline';

// ── Constants ──────────────────────────────────────────────────────────────

// Connector spacing is *bounded*, not linear-in-calendar-years: a multi-year
// gap no longer opens a 600px void between two cards. The gap still nudges the
// spacing (recent, dense roles sit closer than sparse early ones) but stays
// within a readable band.
const DISTANCE_PER_YEAR = 40;
const MIN_CONNECTOR = 28;
const MAX_CONNECTOR = 120;

// Fixed render order + labels for the category bands.
const GROUP_ORDER: TimelineCategory[] = ['work', 'education', 'earlier'];
const GROUP_LABELS: Record<TimelineCategory, string> = {
  work: 'Work',
  education: 'Education',
  earlier: 'Earlier & for fun',
};
// Bands a visitor is unlikely to care about start collapsed behind a toggle so
// they stop competing with the professional history for attention.
const COLLAPSED_BY_DEFAULT: ReadonlySet<TimelineCategory> = new Set(['earlier']);
const DEFAULT_CATEGORY: TimelineCategory = 'work';

// ── Helpers ────────────────────────────────────────────────────────────────

function numericYear(year: number | string): number {
  const n = typeof year === 'number' ? year : parseInt(year, 10);
  return isNaN(n) ? new Date().getFullYear() : n;
}

function clampConnector(gapYears: number): number {
  return Math.min(Math.max(gapYears * DISTANCE_PER_YEAR, MIN_CONNECTOR), MAX_CONNECTOR);
}

interface EntryWithDelta extends TimelineEntryData {
  connectorHeight: number;
}

/** Bounded connector below each entry; the last entry in a band has none. */
function addDeltas(entries: TimelineEntryData[]): EntryWithDelta[] {
  return entries.map((entry, i) => {
    const nextEntry = entries[i + 1];
    const gap = nextEntry ? numericYear(entry.year) - numericYear(nextEntry.year) : null;
    return { ...entry, connectorHeight: gap === null ? 0 : clampConnector(gap) };
  });
}

interface CategoryGroup {
  category: TimelineCategory;
  entries: TimelineEntryData[];
}

/** Bucket entries by category, preserving order, in the fixed band order. */
function groupByCategory(entries: TimelineEntryData[]): CategoryGroup[] {
  const buckets = new Map<TimelineCategory, TimelineEntryData[]>();
  for (const entry of entries) {
    const category = entry.category ?? DEFAULT_CATEGORY;
    const list = buckets.get(category) ?? [];
    list.push(entry);
    buckets.set(category, list);
  }
  const ordered = GROUP_ORDER.filter((c) => buckets.has(c));
  // Append any categories outside GROUP_ORDER so nothing silently disappears.
  for (const c of buckets.keys()) if (!ordered.includes(c)) ordered.push(c);
  return ordered.map((category) => ({ category, entries: buckets.get(category)! }));
}

// ── Props ──────────────────────────────────────────────────────────────────

export interface TimelineProps {
  entries?: TimelineEntryData[] | undefined;
}

// ── Sub-components ─────────────────────────────────────────────────────────

interface GroupHeaderProps {
  label: string;
  headingFamily: string;
  count: number;
  collapsible: boolean;
  open: boolean;
  onToggle: () => void;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({
  label,
  headingFamily,
  count,
  collapsible,
  open,
  onToggle,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
    <Typography
      component="h3"
      sx={{ m: 0, fontFamily: headingFamily, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.2 }}
    >
      {label}
    </Typography>
    <Box aria-hidden="true" sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
    {collapsible && (
      <Button size="small" variant="text" onClick={onToggle} sx={{ flexShrink: 0 }}>
        {open ? 'Hide' : `Show ${count}`}
      </Button>
    )}
  </Box>
);

// ── Component ──────────────────────────────────────────────────────────────

export const Timeline: React.FC<TimelineProps> = ({ entries = TIMELINE_ENTRIES }) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const headingFamily = theme.tokens?.typography.headingFamily === 'mono' ? mono : 'inherit';
  const isMobile = useIsMobile();

  const groups = groupByCategory(entries);
  const [openGroups, setOpenGroups] = useState<Partial<Record<TimelineCategory, boolean>>>({});
  const isOpen = (cat: TimelineCategory) => openGroups[cat] ?? !COLLAPSED_BY_DEFAULT.has(cat);
  const toggle = (cat: TimelineCategory) =>
    setOpenGroups((s) => ({ ...s, [cat]: !isOpen(cat) }));

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center"
      }}>
      <Grid
        sx={{ padding: '0px' }}
        size={{
          xs: 12,
          sm: 12,
          md: 11,
          lg: 10,
          xl: 8
        }}>
        {groups.map((group, groupIdx) => {
          const collapsible = COLLAPSED_BY_DEFAULT.has(group.category);
          const open = isOpen(group.category);
          const entriesWithDeltas = addDeltas(group.entries);

          return (
            <Box key={group.category} sx={{ mt: groupIdx === 0 ? 0 : 6 }}>
              <GroupHeader
                label={GROUP_LABELS[group.category] ?? group.category}
                headingFamily={headingFamily}
                count={group.entries.length}
                collapsible={collapsible}
                open={open}
                onToggle={() => toggle(group.category)}
              />
              {open && (
                <MuiTimeline
                  position="right"
                  sx={{
                    padding: '0px',
                    m: 0,
                    ...(isMobile && {
                      [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 },
                    }),
                  }}
                >
                  {entriesWithDeltas.map((entry, i) => (
                    <TimelineEntry
                      key={String(entry.year) + entry.heading}
                      entry={entry}
                      connectorHeight={entry.connectorHeight}
                      featured={group.category === 'work' && groupIdx === 0 && i === 0}
                      mobile={isMobile}
                    />
                  ))}
                </MuiTimeline>
              )}
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
};
