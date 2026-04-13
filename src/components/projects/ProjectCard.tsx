import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import type { Project, ScoreRun } from '../../types/project';

const STATUS_COLORS: Record<string, 'default' | 'primary' | 'success'> = {
  idea: 'default',
  developing: 'primary',
  executing: 'success',
};

interface ScoreSparklineProps {
  scores: ScoreRun[];
}

const ScoreSparkline: React.FC<ScoreSparklineProps> = ({ scores }) => {
  if (scores.length === 0) return null;

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
      {scores.map((run) => {
        const pct = Math.round((run.overall / 10) * 100);
        return (
          <Tooltip
            key={run.id}
            title={`${run.definition.name}: ${run.overall.toFixed(1)}/10 (v${run.version})`}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 48 }}>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '0.65rem' }}>
                {run.definition.name.split(' ')[0]}
              </Typography>
              <Box
                sx={{
                  width: 48,
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'grey.200',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${pct}%`,
                    height: '100%',
                    bgcolor: pct >= 70 ? 'success.main' : pct >= 40 ? 'warning.main' : 'error.main',
                    borderRadius: 3,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                {run.overall.toFixed(1)}
              </Typography>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
};

interface ProjectCardProps {
  project: Project;
  /** When provided, called on click instead of navigating to the project page. */
  onSelect?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const navigate = useNavigate();
  const scores = project.scores ?? [];

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardActionArea
        onClick={() => (onSelect ? onSelect() : navigate(`/projects/${project.id}`))}
        sx={{ height: '100%', alignItems: 'flex-start' }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3, flex: 1, mr: 1 }}>
              {project.title}
            </Typography>
            <Chip
              label={project.status}
              size="small"
              color={STATUS_COLORS[project.status] ?? 'default'}
              sx={{ textTransform: 'capitalize', flexShrink: 0 }}
            />
          </Box>

          {project.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                mb: 1,
              }}
            >
              {project.description}
            </Typography>
          )}

          <ScoreSparkline scores={scores} />

          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 1 }}>
            {new Date(project.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
