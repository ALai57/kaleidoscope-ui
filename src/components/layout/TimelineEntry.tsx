import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MuiTimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { SurfaceCard } from '../common/SurfaceCard';
import type { TimelineEntry as TimelineEntryData } from '../../data/timeline';

// ── Sub-components ─────────────────────────────────────────────────────────

const OrgIcon: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <Box
    component="img"
    src={src}
    alt={alt}
    sx={{ height: '32px', objectFit: 'contain' }}
  />
);

// ── Types ──────────────────────────────────────────────────────────────────

export interface TimelineEntryProps {
  entry: TimelineEntryData;
  /** Height of the connector below this entry in pixels (proportional to time span). */
  connectorHeight?: number | undefined;
  /** The current role — gets an accent border, a "Current" badge, and a heavier dot. */
  featured?: boolean | undefined;
}

// ── Component ──────────────────────────────────────────────────────────────

export const TimelineEntry: React.FC<TimelineEntryProps> = ({
  entry,
  connectorHeight = 80,
  featured = false,
}) => {
  const { year, since, until, iconSrc, iconAlt, heading, orgUrl, body, bullets, link } = entry;
  const theme = useTheme();
  // Heading voice (mono under Prism) with a bare-MUI fallback, so dates + org
  // names re-skin with the active preset instead of hardcoding the look.
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const headingFamily = tokens?.typography.headingFamily === 'mono' ? mono : 'inherit';

  return (
    <MuiTimelineItem>
      {/* Left column — dates in the heading voice */}
      <TimelineOppositeContent sx={{ flex: 0.3 }}>
        <Typography
          component="div"
          sx={{ fontFamily: headingFamily, fontWeight: 700, fontSize: '2rem', lineHeight: 1.15 }}
        >
          {until ?? year}
        </Typography>
        {since && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: mono, letterSpacing: '0.04em' }}
          >
            {`Since: ${since}`}
          </Typography>
        )}
      </TimelineOppositeContent>

      {/* Middle — dot + connector (token palette, no hardcoded black) */}
      <TimelineSeparator>
        <TimelineDot
          variant="outlined"
          sx={{
            bgcolor: 'background.paper',
            borderColor: 'primary.main',
            borderWidth: featured ? 3 : 2,
            ...(featured ? { boxShadow: (t) => `0 0 0 4px ${t.palette.primary.main}22` } : {}),
          }}
        >
          {iconSrc ? <OrgIcon src={iconSrc} alt={iconAlt ?? ''} /> : null}
        </TimelineDot>
        <TimelineConnector sx={{ height: `${connectorHeight}px`, bgcolor: 'divider' }} />
      </TimelineSeparator>

      {/* Right column — content on the shared card surface */}
      <TimelineContent sx={{ py: 0, pr: 0 }}>
        <SurfaceCard
          sx={{
            p: 2,
            mb: 1,
            ...(featured
              ? { borderColor: 'primary.main', borderWidth: 2, boxShadow: 2 }
              : {}),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 1 }}>
            <Typography
              component="h3"
              sx={{
                m: 0,
                fontFamily: headingFamily,
                fontWeight: 700,
                fontSize: featured ? '1.2rem' : '1.05rem',
                lineHeight: 1.3,
              }}
            >
              {orgUrl ? (
                <Link href={orgUrl} target="_blank" rel="noreferrer" color="inherit" underline="hover">
                  {heading}
                </Link>
              ) : (
                heading
              )}
            </Typography>
            {featured && (
              <Box
                component="span"
                sx={{
                  px: 0.75,
                  py: 0.25,
                  borderRadius: '999px',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontFamily: mono,
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Current
              </Box>
            )}
          </Box>

          <Divider sx={{ my: 1 }} />

          {body.map((paragraph, i) => (
            <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {paragraph}
            </Typography>
          ))}

          {bullets && bullets.length > 0 && (
            <Box component="ul" sx={{ mt: 0.5, mb: 0, pl: 2.5 }}>
              {bullets.map((bullet, i) => (
                <Typography key={i} component="li" variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {bullet}
                </Typography>
              ))}
            </Box>
          )}

          {link && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Link href={link.href} target="_blank" rel="noreferrer" underline="hover">
                {link.label}
              </Link>
            </Typography>
          )}
        </SurfaceCard>
      </TimelineContent>
    </MuiTimelineItem>
  );
};
