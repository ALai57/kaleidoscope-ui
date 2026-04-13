import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { WorkflowRecommendation } from '../../types/workflow';

interface WorkflowRecommendationBannerProps {
  recommendations: WorkflowRecommendation[];
  onAccept: (workflowId: string) => void;
  onDismiss: () => void;
  accepting: boolean;
}

const WorkflowRecommendationBanner: React.FC<WorkflowRecommendationBannerProps> = ({
  recommendations,
  onAccept,
  onDismiss,
  accepting,
}) => {
  const top = recommendations[0];
  if (!top) return null;

  const confidencePct = Math.round(top.confidence * 100);

  return (
    <Alert
      severity="info"
      sx={{ mb: 2 }}
      action={
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => onAccept(top.workflow_id)}
            disabled={accepting}
            startIcon={accepting ? <CircularProgress size={12} /> : undefined}
          >
            Start
          </Button>
          <Button size="small" onClick={onDismiss} disabled={accepting}>
            Dismiss
          </Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" component="span">
          Suggested workflow:
        </Typography>
        <Typography variant="body2" component="span" sx={{ fontWeight: 700 }}>
          {top.name}
        </Typography>
        <Chip
          label={`${confidencePct}% match`}
          size="small"
          color={confidencePct >= 70 ? 'success' : confidencePct >= 40 ? 'warning' : 'default'}
        />
        {top.rationale && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            {top.rationale}
          </Typography>
        )}
      </Box>
    </Alert>
  );
};

export default WorkflowRecommendationBanner;
