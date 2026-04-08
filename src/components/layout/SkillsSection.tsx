import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SKILLS } from '../../data/skills';
import type { SkillSection } from '../../data/skills';

// ── Helpers ────────────────────────────────────────────────────────────────

const ROW_SX = {
  padding: { xs: '2px', sm: '5px', md: '10px', lg: '10px', xl: '10px' },
};

interface SkillIconProps {
  tooltipText: string;
  src: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ tooltipText, src }) => (
  <Tooltip title={tooltipText}>
    <IconButton
      sx={{
        padding: { xs: '2px', sm: '5px', md: '8px', lg: '8px', xl: '10px' },
        width: { xs: '50px', sm: '60px', md: '70px', lg: '90px', xl: '90px' },
        height: { xs: '50px', sm: '60px', md: '70px', lg: '90px', xl: '90px' },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={tooltipText}
        sx={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </IconButton>
  </Tooltip>
);

// ── Props ──────────────────────────────────────────────────────────────────

export interface SkillsSectionProps {
  sections?: SkillSection[] | undefined;
}

// ── Component ──────────────────────────────────────────────────────────────

export const SkillsSection: React.FC<SkillsSectionProps> = ({ sections = SKILLS }) => (
  <>
    {sections.map((section) => (
      <Grid key={section.title} item xs={11} sm={11} md={5} lg={5} xl={4}>
        <Paper elevation={8} sx={{ margin: { xs: '5px', sm: '5px' } }}>
          <Stack direction="column" width="100%" sx={{ p: 2 }}>
            <Typography variant="h4">{section.title}</Typography>
            <br />
            {section.groups.map((group, groupIdx) => (
              <Stack key={groupIdx} direction="row" sx={ROW_SX}>
                {group.icons.map((icon) => (
                  <SkillIcon key={icon.tooltipText} tooltipText={icon.tooltipText} src={icon.src} />
                ))}
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>
    ))}
  </>
);
