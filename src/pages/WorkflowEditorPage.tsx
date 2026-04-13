import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';
import Snackbar from '@mui/material/Snackbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
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

const STATUS_OPTIONS: { value: WorkflowStatus; label: string; color: string }[] = [
  { value: 'draft', label: 'Draft', color: 'default' },
  { value: 'live', label: 'Live', color: 'success' },
  { value: 'archived', label: 'Archived', color: 'default' },
];

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
  const [savedSnack, setSavedSnack] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: workflow, isLoading } = useQuery({
    queryKey: ['workflows', id],
    queryFn: () => getWorkflow(id!, token),
    enabled: !!id,
  });

  useEffect(() => {
    if (workflow) {
      setName(workflow.name);
      setDescription(workflow.description ?? '');
      setStatus(workflow.status);
      setSteps(
        (workflow.steps ?? []).map((s) => ({
          name: s.name,
          description: s.description,
          position: s.position,
        }))
      );
    }
  }, [workflow]);

  // Focus name field on new workflow
  useEffect(() => {
    if (isNew) nameRef.current?.focus();
  }, [isNew]);

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
      setSavedSnack(true);
    },
    onError: (e) => setSaveError(e instanceof Error ? e.message : 'Failed to save workflow.'),
    onMutate: () => setSaveError(null),
  });

  const handleSave = () => {
    if (!name.trim()) {
      setSaveError('Give this workflow a name before saving.');
      nameRef.current?.focus();
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

  const currentStatus = STATUS_OPTIONS.find((o) => o.value === status)!;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ maxWidth: 720, mx: 'auto', px: 3, pt: 3, pb: 8 }}>

        {/* ── Breadcrumb ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon sx={{ fontSize: '1rem !important' }} />}
            onClick={() => navigate('/workflows')}
            sx={{ color: 'text.secondary', fontWeight: 400, px: 0.5, minWidth: 0 }}
          >
            Workflows
          </Button>
          <Typography variant="body2" color="text.disabled">/</Typography>
          <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 260 }}>
            {isNew ? 'New workflow' : (name || workflow?.name || '…')}
          </Typography>
        </Box>

        {/* ── Main card ── */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 3,
            border: 1,
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          {/* Header area */}
          <Box sx={{ px: 3, pt: 3, pb: 2 }}>
            {/* Status chips — only for existing workflows */}
            {!isNew && (
              <Box sx={{ display: 'flex', gap: 0.75, mb: 2 }}>
                {STATUS_OPTIONS.filter((o) => o.value !== 'archived').map((opt) => (
                  <Chip
                    key={opt.value}
                    label={opt.label}
                    size="small"
                    variant={status === opt.value ? 'filled' : 'outlined'}
                    color={status === opt.value && opt.value === 'live' ? 'success' : 'default'}
                    onClick={() => setStatus(opt.value)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: status === opt.value ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
                {status === 'archived' && (
                  <Chip
                    label="Archived"
                    size="small"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Box>
            )}

            {/* Workflow name */}
            <InputBase
              inputRef={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isNew ? 'Workflow name…' : 'Untitled workflow'}
              fullWidth
              sx={{
                fontSize: '1.5rem',
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 1,
                '& input': { p: 0 },
                color: 'text.primary',
              }}
            />

            {/* Description */}
            <InputBase
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description — when should this workflow be used?"
              fullWidth
              multiline
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                '& textarea': { p: 0, lineHeight: 1.6 },
              }}
            />
          </Box>

          <Divider />

          {/* Steps section */}
          <Box sx={{ px: 3, pt: 2.5, pb: 3 }}>
            <Typography variant="overline" color="text.disabled" sx={{ letterSpacing: 1.2, display: 'block', mb: 2 }}>
              Steps
            </Typography>

            <WorkflowStepList steps={steps} onChange={setSteps} />
          </Box>

          <Divider />

          {/* Footer: error + actions */}
          <Box sx={{ px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isPending || !name.trim()}
              startIcon={isPending ? <CircularProgress size={14} color="inherit" /> : undefined}
              disableElevation
              sx={{ borderRadius: 2 }}
            >
              {isNew ? 'Create workflow' : 'Save changes'}
            </Button>
            <Button
              onClick={() => navigate('/workflows')}
              disabled={isPending}
              sx={{ color: 'text.secondary', borderRadius: 2 }}
            >
              Cancel
            </Button>

            {saveError && (
              <Alert severity="error" sx={{ py: 0, flex: 1, borderRadius: 2 }} onClose={() => setSaveError(null)}>
                {saveError}
              </Alert>
            )}
          </Box>
        </Box>
      </Box>

      {/* Saved confirmation */}
      <Snackbar
        open={savedSnack}
        autoHideDuration={3000}
        onClose={() => setSavedSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckIcon fontSize="small" color="success" />
            Workflow saved
          </Box>
        }
      />
    </Box>
  );
};

export default WorkflowEditorPage;
