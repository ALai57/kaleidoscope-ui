import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { ScoreRun } from '../../types/project';

interface DimensionRowProps {
  name: string;
  value: number;
  rationale: string;
}

const DimensionRow: React.FC<DimensionRowProps> = ({ name, value, rationale }) => {
  const pct = (value / 10) * 100;
  const color = pct >= 70 ? 'success' : pct >= 40 ? 'warning' : 'error';

  return (
    <Box sx={{ mb: 1.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {name}
        </Typography>
        <Typography variant="body2" color={`${color}.main`} sx={{ fontWeight: 700, ml: 1 }}>
          {value.toFixed(1)}/10
        </Typography>
      </Box>
      <Tooltip title={rationale} placement="bottom-start">
        <LinearProgress
          variant="determinate"
          value={pct}
          color={color}
          sx={{ height: 6, borderRadius: 3 }}
        />
      </Tooltip>
      {rationale && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mt: 0.5,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {rationale}
        </Typography>
      )}
    </Box>
  );
};

interface ScoreRunCardProps {
  scoreRun: ScoreRun;
  defaultExpanded?: boolean;
}

export const ScoreRunCard: React.FC<ScoreRunCardProps> = ({ scoreRun, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const overallPct = (scoreRun.overall / 10) * 100;
  const scorerLabel = scoreRun.definition.scorer_type.replace('_', ' ');

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
      variant="outlined"
      sx={{ '&:before': { display: 'none' }, borderRadius: '8px !important', mb: 1 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {scoreRun.definition.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
              <Chip label={`v${scoreRun.version}`} size="small" variant="outlined" />
              <Chip label={scorerLabel} size="small" variant="outlined" color="primary" />
              <Typography variant="caption" color="text.disabled" sx={{ alignSelf: 'center' }}>
                {new Date(scoreRun.scored_at).toLocaleDateString()}
              </Typography>
            </Stack>
          </Box>

          <Box sx={{ textAlign: 'right', minWidth: 64 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color:
                  overallPct >= 70
                    ? 'success.main'
                    : overallPct >= 40
                      ? 'warning.main'
                      : 'error.main',
              }}
            >
              {scoreRun.overall.toFixed(1)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              / 10
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        {scoreRun.dimensions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No dimensions scored.
          </Typography>
        ) : (
          scoreRun.dimensions.map((dim) => (
            <DimensionRow
              key={dim.name}
              name={dim.name}
              value={dim.value}
              rationale={dim.rationale}
            />
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};
