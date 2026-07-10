import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * The shared section header for the public pages — a small mono "eyebrow", a
 * heading in the preset's heading voice, and an accent underline that echoes the
 * NavBar's link motif. It's the single element that makes HomePage / AboutPage /
 * ExperiencePage read as one system with the reskinned NavBar.
 *
 * Every value is token-driven with a bare-MUI fallback (the mono voice from
 * `theme.tokens`, the accent from the palette's `primary` — itself seed-derived),
 * so a heading re-skins with the active preset/seed/mode instead of hardcoding
 * the Prism look.
 */
export type SectionHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

// Sizes mirror the token type scale (see theme/tokens.ts TYPE_SCALE).
const LEVEL_SIZE: Record<SectionHeadingLevel, string> = {
  h1: '2.5rem',
  h2: '2rem',
  h3: '1.6rem',
  h4: '1.4rem',
};

export interface SectionHeadingProps {
  /** The heading text. */
  title: React.ReactNode;
  /** Small mono label above the title (e.g. "// PROFILE"). */
  eyebrow?: string;
  /** Semantic heading tag + size. Defaults to h3. */
  level?: SectionHeadingLevel;
  align?: 'left' | 'center';
  /** Optional trailing content on the same baseline (e.g. a "View all →" link). */
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  eyebrow,
  level = 'h3',
  align = 'left',
  action,
  sx,
}) => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const headingMono = tokens?.typography.headingFamily === 'mono';
  const titleFamily = headingMono ? mono : 'inherit';
  const centered = align === 'center';

  return (
    <Box sx={[{ mb: 3 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 2,
          justifyContent: centered ? 'center' : action ? 'space-between' : 'flex-start',
        }}
      >
        <Box sx={{ textAlign: centered ? 'center' : 'left' }}>
          {eyebrow && (
            <Typography
              component="div"
              sx={{
                fontFamily: mono,
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'primary.main',
                mb: 0.75,
              }}
            >
              {eyebrow}
            </Typography>
          )}
          <Typography
            component={level}
            sx={{
              m: 0,
              fontFamily: titleFamily,
              fontWeight: 700,
              fontSize: LEVEL_SIZE[level],
              lineHeight: 1.2,
              letterSpacing: headingMono ? '0.01em' : undefined,
            }}
          >
            {title}
          </Typography>
          {/* Accent underline — echoes the NavBar link's lit rule. */}
          <Box
            aria-hidden="true"
            sx={{
              mt: 1,
              height: 3,
              width: 48,
              borderRadius: '2px',
              bgcolor: 'primary.main',
              mx: centered ? 'auto' : 0,
            }}
          />
        </Box>
        {action && <Box sx={{ flexShrink: 0, pb: 0.5 }}>{action}</Box>}
      </Box>
    </Box>
  );
};
