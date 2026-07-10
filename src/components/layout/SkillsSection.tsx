import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { SurfaceCard } from '../common/SurfaceCard';
import { SKILLS } from '../../data/skills';
import type { SkillSection } from '../../data/skills';

// ── Helpers ────────────────────────────────────────────────────────────────

interface SkillIconProps {
  tooltipText: string;
  src: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ tooltipText, src }) => (
  <Tooltip title={tooltipText}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: { xs: '52px', sm: '62px', md: '76px', lg: '92px' },
      }}
    >
      <IconButton
        sx={{
          padding: { xs: '2px', sm: '5px', md: '8px' },
          width: { xs: '40px', sm: '48px', md: '58px', lg: '70px' },
          height: { xs: '40px', sm: '48px', md: '58px', lg: '70px' },
        }}
      >
        <Box
          component="img"
          src={src}
          alt={tooltipText}
          sx={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </IconButton>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'center',
          lineHeight: 1.2,
          mt: 0.25,
          fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
          wordBreak: 'break-word',
          px: 0.25,
        }}
      >
        {tooltipText}
      </Typography>
    </Box>
  </Tooltip>
);

// ── Props ──────────────────────────────────────────────────────────────────

export interface SkillsSectionProps {
  sections?: SkillSection[] | undefined;
}

// ── Component ──────────────────────────────────────────────────────────────

export const SkillsSection: React.FC<SkillsSectionProps> = ({ sections = SKILLS }) => {
  const theme = useTheme();
  const mono = theme.tokens?.typography.mono ?? 'monospace';
  const headingFamily = theme.tokens?.typography.headingFamily === 'mono' ? mono : 'inherit';

  return (
    <>
    {sections.map((section) => (
      <Grid key={section.title} item xs={11} sm={11} md={5} lg={5} xl={4}>
        <SurfaceCard sx={{ margin: { xs: '5px', sm: '5px' } }}>
          <Stack direction="column" width="100%" sx={{ p: 2 }}>
            <Typography
              component="h3"
              sx={{ mb: 2, fontFamily: headingFamily, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.3 }}
            >
              {section.title}
            </Typography>
            {section.groups.map((group, groupIdx) => (
              <Stack
                key={groupIdx}
                direction="row"
                flexWrap="wrap"
                sx={{ gap: { xs: '2px', sm: '4px', md: '6px' }, mb: 1 }}
              >
                {group.icons.map((icon) => (
                  <SkillIcon key={icon.tooltipText} tooltipText={icon.tooltipText} src={icon.src} />
                ))}
              </Stack>
            ))}
          </Stack>
        </SurfaceCard>
      </Grid>
    ))}
    </>
  );
};
