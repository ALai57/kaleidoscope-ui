import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import type { ScoreRun } from '../../types/project';

interface ScoreHistoryProps {
  history: ScoreRun[];
}

export const ScoreHistory: React.FC<ScoreHistoryProps> = ({ history }) => {
  // Group by definition
  const byDefinition = history.reduce<Record<string, ScoreRun[]>>((acc, run) => {
    const key = run.definition.id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(run);
    return acc;
  }, {});

  const definitionIds = Object.keys(byDefinition);
  const [selectedDef, setSelectedDef] = React.useState<string>(definitionIds[0] ?? '');

  if (history.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No scoring history yet.
      </Typography>
    );
  }

  const runs = (selectedDef ? byDefinition[selectedDef] : undefined) ?? [];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="subtitle2">Score definition</Typography>
        <Select
          size="small"
          value={selectedDef}
          onChange={(e) => setSelectedDef(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {definitionIds.map((defId) => {
            const first = byDefinition[defId]?.[0];
            if (!first) return null;
            return (
              <MenuItem key={defId} value={defId}>
                {first.definition.name}
              </MenuItem>
            );
          })}
        </Select>
      </Box>

      <Box sx={{ position: 'relative', pl: 3 }}>
        {/* Timeline vertical line */}
        <Box
          sx={{
            position: 'absolute',
            left: 8,
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: 'divider',
          }}
        />

        {[...runs].reverse().map((run, idx) => (
          <Box key={run.id} sx={{ position: 'relative', mb: 3 }}>
            {/* Dot */}
            <Box
              sx={{
                position: 'absolute',
                left: -19,
                top: 4,
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: idx === 0 ? 'primary.main' : 'grey.400',
                border: '2px solid white',
                boxShadow: 1,
              }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Chip label={`v${run.version}`} size="small" color={idx === 0 ? 'primary' : 'default'} />
              <Typography variant="caption" color="text.secondary">
                {new Date(run.scored_at).toLocaleString()}
              </Typography>
              <Chip
                label={`${run.overall.toFixed(1)} / 10`}
                size="small"
                color={
                  run.overall >= 7 ? 'success' : run.overall >= 4 ? 'warning' : 'error'
                }
                variant="outlined"
              />
            </Box>

            {run.dimensions.map((dim) => (
              <Box key={dim.dimension_name} sx={{ display: 'flex', gap: 1, ml: 1, mb: 0.25 }}>
                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 120 }}>
                  {dim.dimension_name}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {dim.value.toFixed(1)}
                </Typography>
              </Box>
            ))}

            {idx < runs.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
