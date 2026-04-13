import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import WorkflowStepList from '../components/workflows/WorkflowStepList';
import { useAuth } from '../auth/useAuth';
import {
  getWorkflow,
  createWorkflow,
  updateWorkflow,
  type WorkflowStepInput,
} from '../api/workflows';
import type { WorkflowStatus } from '../types/workflow';

const STATUS_OPTIONS: WorkflowStatus[] = ['draft', 'live', 'archived'];

const WorkflowEditorPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();

  const isNew = !id;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<WorkflowStatus>('draft');
  const [steps, setSteps] = useState<WorkflowStepInput[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  // Load existing workflow
  const { data: workflow, isLoading } = useQuery({
    queryKey: ['workflows', id],
    queryFn: () => getWorkflow(id!, token),
    enabled: !!id,
  });

  // Populate form when workflow loads
  useEffect(() => {
    if (workflow) {
      setName(workflow.name);
      setDescription(workflow.description ?? '');
      setStatus(workflow.status);
      setSteps(
        workflow.steps.map((s) => ({
          name: s.name,
          description: s.description,
          position: s.position,
        }))
      );
    }
  }, [workflow]);

  const createMutation = useMutation({
    mutationFn: () => {
      const body: Parameters<typeof createWorkflow>[0] = { name: name.trim(), steps };
      if (description.trim()) body.description = description.trim();
      return createWorkflow(body, token);
    },
    onSuccess: (created) => {
      void queryClient.invalidateQueries({ queryKey: ['workflows'] });
      navigate(`/workflows/${created.id}`);
    },
    onError: (e) => setSaveError(e instanceof Error ? e.message : 'Failed to create workflow.'),
  });

  const updateMutation = useMutation({
    mutationFn: () => {
      const body: Parameters<typeof updateWorkflow>[1] = { name: name.trim(), status, steps };
      if (description.trim()) body.description = description.trim();
      return updateWorkflow(id!, body, token);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['workflows'] });
      void queryClient.invalidateQueries({ queryKey: ['workflows', id] });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
    onError: (e) => setSaveError(e instanceof Error ? e.message : 'Failed to save workflow.'),
    onMutate: () => {
      setSaveError(null);
      setSaved(false);
    },
  });

  const handleSave = () => {
    if (!name.trim()) {
      setSaveError('Workflow name is required.');
      return;
    }
    if (isNew) {
      createMutation.mutate();
    } else {
      updateMutation.mutate();
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (!isNew && isLoading) return <LoadingScreen />;

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        {/* Back link + title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/workflows')}
            sx={{ mr: 1 }}
          >
            Workflows
          </Button>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isNew ? 'New workflow' : (workflow?.name ?? 'Edit workflow')}
          </Typography>
        </Box>

        {saveError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {saveError}
          </Alert>
        )}

        {saved && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Workflow saved.
          </Alert>
        )}

        {/* Name */}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          placeholder="e.g. Feature Development"
          disabled={isPending}
        />

        {/* Description */}
        <TextField
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
          placeholder="Briefly describe when to use this workflow…"
          disabled={isPending}
        />

        {/* Status — only for existing workflows */}
        {!isNew && (
          <FormControl size="small" sx={{ mb: 3, minWidth: 160 }} disabled={isPending}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as WorkflowStatus)}
            >
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* Steps */}
        <WorkflowStepList steps={steps} onChange={setSteps} />

        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isPending || !name.trim()}
            startIcon={isPending ? <CircularProgress size={14} /> : undefined}
          >
            {isNew ? 'Create workflow' : 'Save changes'}
          </Button>
          <Button onClick={() => navigate('/workflows')} disabled={isPending}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkflowEditorPage;
