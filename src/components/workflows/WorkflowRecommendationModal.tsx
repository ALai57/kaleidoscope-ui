import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { WorkflowRecommendation } from '../../types/workflow';

interface WorkflowRecommendationModalProps {
  open: boolean;
  onClose: () => void;
  recommendations: WorkflowRecommendation[];
  onStart: (workflowId: string) => void;
  starting: boolean;
}

export const WorkflowRecommendationModal: React.FC<WorkflowRecommendationModalProps> = ({
  open,
  onClose,
  recommendations,
  onStart,
  starting,
}) => {
  const navigate = useNavigate();
  const top = recommendations[0];

  if (!top) return null;

  const confidencePct = Math.round(top.confidence * 100);
  const confidenceColor =
    confidencePct >= 70 ? ('success' as const) :
    confidencePct >= 40 ? ('warning' as const) :
    ('default' as const);

  return (
    <Dialog open={open} onClose={starting ? undefined : onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountTreeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            Strengthen this idea
          </Typography>
          <Chip
            label={`${confidencePct}% match`}
            size="small"
            color={confidenceColor}
            sx={{ fontWeight: 700 }}
          />
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 2 }}>
        {/* Workflow name */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
          {top.name}
        </Typography>

        {/* Rationale */}
        {top.rationale && (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {top.rationale}
          </Typography>
        )}

        {/* What to expect */}
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: 'primary.50',
            borderRadius: 1,
            border: 1,
            borderColor: 'primary.100',
          }}
        >
          <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
            What happens next
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Advisors will score your idea, a judge will review the scores and suggest improvements,
            and the cycle repeats — round by round — until the idea is sharp enough to execute.
            You can stop at any time.
          </Typography>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 2, py: 1.5, gap: 1 }}>
        <Button
          size="small"
          variant="text"
          color="inherit"
          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
          onClick={() => { onClose(); navigate('/workflows'); }}
          disabled={starting}
          sx={{ color: 'text.secondary' }}
        >
          Browse workflows
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button
          size="small"
          variant="outlined"
          onClick={onClose}
          disabled={starting}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={starting ? <CircularProgress size={14} color="inherit" /> : <PlayArrowIcon />}
          onClick={() => onStart(top.workflow_id)}
          disabled={starting}
        >
          Start strengthening
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkflowRecommendationModal;
