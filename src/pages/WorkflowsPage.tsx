import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { NavBar } from '../components/layout/NavBar';
import WorkflowCard from '../components/workflows/WorkflowCard';
import { useAuth } from '../auth/useAuth';
import { getWorkflows, getWorkflow, updateWorkflow } from '../api/workflows';

const WorkflowsPage: React.FC = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();
  const [archivingId, setArchivingId] = useState<string | null>(null);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: workflows = [], isLoading, error } = useQuery({
    queryKey: ['workflows'],
    queryFn: () => getWorkflows(token),
  });

  // Fetch full details (including steps) for each workflow in parallel.
  // Results land in the same ['workflows', id] cache slots the editor uses.
  const detailQueries = useQueries({
    queries: workflows.map((w) => ({
      queryKey: ['workflows', w.id] as const,
      queryFn: () => getWorkflow(w.id, token),
      staleTime: 5 * 60 * 1000,
    })),
  });

  // Merge list metadata with detail steps so cards show accurate counts.
  const workflowsWithSteps = workflows.map((w, i) => ({
    ...w,
    steps: detailQueries[i]?.data?.steps ?? w.steps ?? [],
  }));

  const archiveMutation = useMutation({
    mutationFn: (id: string) => updateWorkflow(id, { status: 'archived' }, token),
    onMutate: (id) => setArchivingId(id),
    onSettled: () => setArchivingId(null),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh' }}>
        <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  const live = workflowsWithSteps.filter((w) => w.status === 'live');
  const draft = workflowsWithSteps.filter((w) => w.status === 'draft');
  const archived = workflowsWithSteps.filter((w) => w.status === 'archived');

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Workflows
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reusable step sequences applied to projects.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/workflows/new')}
          >
            New workflow
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load workflows.
          </Alert>
        )}

        {/* Live */}
        {live.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              Live
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {live.map((w) => (
                <WorkflowCard
                  key={w.id}
                  workflow={w}
                  onEdit={(id) => navigate(`/workflows/${id}`)}
                  onArchive={(id) => archiveMutation.mutate(id)}
                  archiving={archivingId === w.id}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Draft */}
        {draft.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              Drafts
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {draft.map((w) => (
                <WorkflowCard
                  key={w.id}
                  workflow={w}
                  onEdit={(id) => navigate(`/workflows/${id}`)}
                  onArchive={(id) => archiveMutation.mutate(id)}
                  archiving={archivingId === w.id}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Empty state */}
        {live.length === 0 && draft.length === 0 && archived.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              borderStyle: 'dashed',
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              No workflows yet. Create one to get started.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => navigate('/workflows/new')}
            >
              Create workflow
            </Button>
          </Box>
        )}

        {/* Archived */}
        {archived.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
              Archived
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {archived.map((w) => (
                <WorkflowCard
                  key={w.id}
                  workflow={w}
                  onEdit={(id) => navigate(`/workflows/${id}`)}
                  onArchive={() => {}}
                  archiving={false}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WorkflowsPage;
