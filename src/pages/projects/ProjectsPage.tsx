import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import GridViewIcon from '@mui/icons-material/GridView';
import HubIcon from '@mui/icons-material/Hub';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavBar } from '../../components/layout/NavBar';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectGraph } from '../../components/projects/ProjectGraph';
import { useAuth } from '../../auth/useAuth';
import { getProjects, createProject } from '../../api/projects';
import type { ProjectStatus } from '../../types/project';

type ViewMode = 'list' | 'graph';

const STATUS_COUNTS_LABEL: Record<ProjectStatus, string> = {
  idea: 'Ideas',
  developing: 'Developing',
  executing: 'Executing',
};

interface NewProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  isSubmitting: boolean;
}

const NewProjectDialog: React.FC<NewProjectDialogProps> = ({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) onSubmit(title.trim(), description.trim());
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Project</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            autoFocus
            placeholder="What's the project?"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            placeholder="Describe the idea, the problem it solves, and your initial thoughts…"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim() || isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
        >
          Create & Score
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProjectsPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [newDialogOpen, setNewDialogOpen] = useState(false);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(token),
  });

  const createMutation = useMutation({
    mutationFn: (vars: { title: string; description: string }) =>
      createProject(vars, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] });
      setNewDialogOpen(false);
    },
  });

  // Maturity summary
  const statusCounts = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  }, {});

  const avgScore = (() => {
    const allScores = projects.flatMap((p) => p.scores ?? []);
    if (allScores.length === 0) return null;
    return allScores.reduce((sum, s) => sum + s.overall, 0) / allScores.length;
  })();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Projects
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {(Object.keys(STATUS_COUNTS_LABEL) as ProjectStatus[]).map((status) => (
                <Chip
                  key={status}
                  label={`${statusCounts[status] ?? 0} ${STATUS_COUNTS_LABEL[status]}`}
                  size="small"
                  variant="outlined"
                />
              ))}
              {avgScore !== null && (
                <Tooltip title="Average maturity score across all projects">
                  <Chip
                    label={`Avg score: ${avgScore.toFixed(1)}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Tooltip>
              )}
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              size="small"
              onChange={(_, v) => { if (v) setViewMode(v as ViewMode); }}
            >
              <ToggleButton value="list" aria-label="list view">
                <Tooltip title="List view">
                  <GridViewIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="graph" aria-label="graph view">
                <Tooltip title="Graph view">
                  <HubIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setNewDialogOpen(true)}
            >
              New Project
            </Button>
          </Box>
        </Box>

        {/* Content */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && projects.length === 0 && (
          <Box sx={{ textAlign: 'center', p: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No projects yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first project to get started. It will be automatically scored for
              intent and architectural clarity.
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewDialogOpen(true)}>
              Create First Project
            </Button>
          </Box>
        )}

        {!isLoading && projects.length > 0 && viewMode === 'list' && (
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid key={project.id} item xs={12} sm={6} md={4}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}

        {!isLoading && projects.length > 0 && viewMode === 'graph' && (
          <ProjectGraph projects={projects} width={1140} height={600} />
        )}
      </Box>

      <NewProjectDialog
        open={newDialogOpen}
        onClose={() => setNewDialogOpen(false)}
        onSubmit={(title, description) => createMutation.mutate({ title, description })}
        isSubmitting={createMutation.isPending}
      />
    </Box>
  );
};

export default ProjectsPage;
