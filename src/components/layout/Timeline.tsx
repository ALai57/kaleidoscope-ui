import React from 'react';
import Grid from '@mui/material/Grid';
import MuiTimeline from '@mui/lab/Timeline';
import { TimelineEntry } from './TimelineEntry';
import { TIMELINE_ENTRIES } from '../../data/timeline';
import type { TimelineEntry as TimelineEntryData } from '../../data/timeline';

// ── Constants ──────────────────────────────────────────────────────────────

const DISTANCE_PER_YEAR = 300;

// ── Helpers ────────────────────────────────────────────────────────────────

function numericYear(year: number | string): number {
  const n = typeof year === 'number' ? year : parseInt(year, 10);
  return isNaN(n) ? new Date().getFullYear() : n;
}

interface EntryWithDelta extends TimelineEntryData {
  connectorHeight: number;
}

function addDeltas(entries: TimelineEntryData[]): EntryWithDelta[] {
  return entries.map((entry, i) => {
    const nextEntry = entries[i + 1];
    const dt = nextEntry
      ? numericYear(entry.year) - numericYear(nextEntry.year)
      : 0;
    return { ...entry, connectorHeight: dt * DISTANCE_PER_YEAR };
  });
}

// ── Props ──────────────────────────────────────────────────────────────────

export interface TimelineProps {
  entries?: TimelineEntryData[] | undefined;
}

// ── Component ──────────────────────────────────────────────────────────────

export const Timeline: React.FC<TimelineProps> = ({ entries = TIMELINE_ENTRIES }) => {
  const entriesWithDeltas = addDeltas(entries);

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={11}
        lg={10}
        xl={8}
        sx={{ padding: '0px' }}
      >
        <MuiTimeline
          position="alternate"
          sx={{ padding: '0px' }}
        >
          {entriesWithDeltas.map((entry) => (
            <TimelineEntry
              key={String(entry.year) + entry.heading}
              entry={entry}
              connectorHeight={entry.connectorHeight}
            />
          ))}
        </MuiTimeline>
      </Grid>
    </Grid>
  );
};
