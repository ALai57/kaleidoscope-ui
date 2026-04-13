import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { getWorkflow } from '../../api/workflows';
import type { WorkflowRecommendation } from '../../types/workflow';

interface WorkflowRecommendationBannerProps {
  recommendations: WorkflowRecommendation[];
  onAccept: (workflowId: string) => void;
  onDismiss: () => void;
  accepting: boolean;
  token?: string | undefined;
}

const WorkflowRecommendationBanner: React.FC<WorkflowRecommendationBannerProps> = ({
  recommendations,
  onAccept,
  onDismiss,
  accepting,
  token,
}) => {
  const top = recommendations[0];

  const { data: workflow, isLoading: workflowLoading } = useQuery({
    queryKey: ['workflows', top?.workflow_id],
    queryFn: () => getWorkflow(top!.workflow_id, token),
    enabled: !!top?.workflow_id,
    staleTime: 5 * 60 * 1000,
  });

  if (!top) return null;

  const confidencePct = Math.round(top.confidence * 100);
  const confidenceColor =
    confidencePct >= 70 ? 'success' : confidencePct >= 40 ? 'warning' : 'default';

  const steps = workflow?.steps ?? [];

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'primary.200',
        borderRadius: 2,
        bgcolor: 'primary.50',
        mb: 2,
        overflow: 'hidden',
      }}
    >
      {/* Header row */}
      <Box
        sx={{
          px: 2,
          pt: 1.5,
          pb: 1,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <AccountTreeIcon sx={{ fontSize: 16, color: 'primary.main', mt: 0.3, flexShrink: 0 }} />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6 }}>
              Suggested workflow
            </Typography>
            <Chip
              label={`${confidencePct}% match`}
              size="small"
              color={confidenceColor}
              sx={{ height: 18, fontSize: '0.68rem', fontWeight: 700 }}
            />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.25 }}>
            {top.name}
          </Typography>
          {top.rationale && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25, lineHeight: 1.5 }}>
              {top.rationale}
            </Typography>
          )}
        </Box>

        <IconButton size="small" onClick={onDismiss} disabled={accepting} sx={{ mt: -0.5, mr: -0.5 }}>
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>

      {/* Steps */}
      <Divider sx={{ borderColor: 'primary.100' }} />
      <Box sx={{ px: 2, py: 1.25 }}>
        {workflowLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="text" width={`${60 + i * 10}%`} height={16} />
            ))}
          </Box>
        ) : steps.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {steps.map((step, i) => (
              <Box key={step.id ?? i} sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    minWidth: 16,
                    fontWeight: 700,
                    color: 'primary.main',
                    flexShrink: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {i + 1}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {step.name}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>

      {/* Action footer */}
      <Divider sx={{ borderColor: 'primary.100' }} />
      <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          size="small"
          variant="contained"
          disableElevation
          startIcon={accepting ? <CircularProgress size={12} color="inherit" /> : <PlayArrowIcon />}
          onClick={() => onAccept(top.workflow_id)}
          disabled={accepting}
          sx={{ borderRadius: 1.5 }}
        >
          Start workflow
        </Button>
      </Box>
    </Box>
  );
};

export default WorkflowRecommendationBanner;
