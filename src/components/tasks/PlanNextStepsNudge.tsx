import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { getTaskStatus, planNextSteps } from '../../api/tasks';

interface PlanNextStepsNudgeProps {
  projectId: string;
  token: string | undefined;
}

export const PlanNextStepsNudge: React.FC<PlanNextStepsNudgeProps> = ({ projectId, token }) => {
  const [dismissed, setDismissed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: status } = useQuery({
    queryKey: ['projects', projectId, 'tasks', 'status'],
    queryFn: () => getTaskStatus(projectId, token),
    refetchInterval: 60_000,
    enabled: !!projectId && !dismissed,
  });

  const handlePlanNextSteps = async () => {
    setIsGenerating(true);
    setStreamingText('');
    setError(null);

    try {
      for await (const event of planNextSteps(projectId, token)) {
        if (event.event === 'token') {
          setStreamingText((prev) => prev + event.data);
        } else if (event.event === 'done') {
          break;
        }
      }
      void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks'] });
      void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'tasks', 'status'] });
      setDismissed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate tasks. Please try again.');
    } finally {
      setIsGenerating(false);
      setStreamingText('');
    }
  };

  // Not enough data yet or nudge condition not met
  if (dismissed || !status || status.pending_count > 3) return null;

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        border: 1,
        borderColor: 'primary.light',
        borderRadius: 1,
        bgcolor: 'primary.50',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <AutoAwesomeIcon sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
            You're making great progress
          </Typography>
          {isGenerating ? (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Planning your next steps…
              </Typography>
              {streamingText && (
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  {streamingText}
                </Typography>
              )}
              <CircularProgress size={16} sx={{ ml: 1, verticalAlign: 'middle' }} />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Ready to plan your next steps? ({status.pending_count} task
              {status.pending_count !== 1 ? 's' : ''} remaining)
            </Typography>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </Box>
        {!isGenerating && (
          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
            <Button
              variant="contained"
              size="small"
              onClick={handlePlanNextSteps}
              startIcon={<AutoAwesomeIcon />}
            >
              Plan next steps
            </Button>
            <Button
              size="small"
              onClick={() => setDismissed(true)}
              sx={{ color: 'text.secondary' }}
            >
              Dismiss
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
