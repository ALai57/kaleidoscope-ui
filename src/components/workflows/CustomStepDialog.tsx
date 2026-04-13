import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import type { WorkflowRecommendation } from '../../types/workflow';
import WorkflowRecommendationBanner from './WorkflowRecommendationBanner';

interface CustomStepDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string, agentType: string) => Promise<void>;
  newRecommendations?: WorkflowRecommendation[];
  onAcceptRecommendation?: (workflowId: string) => void;
  submitting: boolean;
}

const AGENT_OPTIONS = [
  { value: 'coach', label: 'Project Coach' },
  { value: 'pm', label: 'Product Manager' },
  { value: 'engineering_lead', label: 'Engineering Lead' },
];

const CustomStepDialog: React.FC<CustomStepDialogProps> = ({
  open,
  onClose,
  onSubmit,
  newRecommendations,
  onAcceptRecommendation,
  submitting,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [agentType, setAgentType] = useState('coach');
  const [error, setError] = useState<string | null>(null);
  const [recommendationDismissed, setRecommendationDismissed] = useState(false);

  const handleClose = () => {
    setName('');
    setDescription('');
    setAgentType('coach');
    setError(null);
    setRecommendationDismissed(false);
    onClose();
  };

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) {
      setError('Name and instructions are required.');
      return;
    }
    setError(null);
    try {
      await onSubmit(name.trim(), description.trim(), agentType);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    }
  };

  const showRec =
    !recommendationDismissed && newRecommendations && newRecommendations.length > 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Custom Action</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {showRec && (
          <WorkflowRecommendationBanner
            recommendations={newRecommendations!}
            onAccept={(wfId) => {
              onAcceptRecommendation?.(wfId);
              handleClose();
            }}
            onDismiss={() => setRecommendationDismissed(true)}
            accepting={false}
          />
        )}

        <TextField
          label="Step name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2, mt: 1 }}
          placeholder="e.g. Check competitor landscape"
          disabled={!!submitting}
        />
        <TextField
          label="Instructions"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
          placeholder="Describe what the agent should do…"
          disabled={!!submitting}
        />
        <FormControl fullWidth size="small" disabled={!!submitting}>
          <InputLabel>Agent</InputLabel>
          <Select value={agentType} label="Agent" onChange={(e) => setAgentType(e.target.value)}>
            {AGENT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={!!submitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => void handleSubmit()}
          disabled={!!submitting || !name.trim() || !description.trim()}
          startIcon={submitting ? <CircularProgress size={14} /> : undefined}
        >
          Run
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomStepDialog;
