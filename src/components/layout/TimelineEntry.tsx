import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MuiTimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import type { TimelineEntry as TimelineEntryData } from '../../data/timeline';

// ── Sub-components ─────────────────────────────────────────────────────────

const OrgIcon: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <Box
    component="img"
    src={src}
    alt={alt}
    sx={{ height: '40px', objectFit: 'contain' }}
  />
);

// ── Types ──────────────────────────────────────────────────────────────────

export interface TimelineEntryProps {
  entry: TimelineEntryData;
  /** Height of the connector below this entry in pixels (proportional to time span). */
  connectorHeight?: number | undefined;
}

// ── Component ──────────────────────────────────────────────────────────────

export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  connectorHeight = 80,
}) => {
  const { year, since, until, iconSrc, iconAlt, heading, orgUrl, body, bullets, link } = entry;

  return (
    <MuiTimelineItem sx={{ left: '-6%' }}>
      {/* Left column — dates */}
      <TimelineOppositeContent
        variant="h2"
        sx={{ flex: 0.3 }}
      >
        {until ?? year}
        {since && (
          <Typography variant="h4">{`Since: ${since}`}</Typography>
        )}
      </TimelineOppositeContent>

      {/* Middle — dot + connector */}
      <TimelineSeparator>
        <TimelineDot
          color="primary"
          variant="outlined"
          sx={{ backgroundColor: 'black' }}
        >
          {iconSrc ? (
            <OrgIcon src={iconSrc} alt={iconAlt ?? ''} />
          ) : null}
        </TimelineDot>
        <TimelineConnector sx={{ height: `${connectorHeight}px` }} />
      </TimelineSeparator>

      {/* Right column — content */}
      <TimelineContent sx={{ padding: '5px', flex: 1 }}>
        <Typography variant="h6" component="span" sx={{ padding: '5px', fontWeight: 'bold' }}>
          {orgUrl ? (
            <a href={orgUrl} target="_blank" rel="noreferrer">
              {heading}
            </a>
          ) : (
            heading
          )}
        </Typography>

        <Divider />

        {body.map((paragraph, i) => (
          <Typography
            key={i}
            sx={{ padding: '5px', color: '#888888' }}
          >
            {paragraph}
          </Typography>
        ))}

        {bullets && bullets.length > 0 && (
          <Box component="ul" sx={{ mt: 1 }}>
            {bullets.map((bullet, i) => (
              <Typography key={i} component="li" sx={{ padding: '5px', color: '#888888' }}>
                {bullet}
              </Typography>
            ))}
          </Box>
        )}

        {link && (
          <Typography sx={{ padding: '5px', color: '#888888' }}>
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </Typography>
        )}

        <br />
        <br />
      </TimelineContent>
    </MuiTimelineItem>
  );
};
