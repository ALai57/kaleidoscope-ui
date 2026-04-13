import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupsIcon from '@mui/icons-material/Groups';
import HubIcon from '@mui/icons-material/Hub';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/layout/NavBar';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectGraph } from '../../components/projects/ProjectGraph';
import { ProjectInlineDetail } from './ProjectInlineDetail';
import { useAuth } from '../../auth/useAuth';
import { getProjects, createProject } from '../../api/projects';
type ViewMode = 'list' | 'graph';

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

// ── Spring transition used for the card layout animation ──────────────────

const CARD_SPRING = { type: 'spring' as const, stiffness: 280, damping: 28 };

// ── Page ───────────────────────────────────────────────────────────────────

const ProjectsPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [newDialogOpen, setNewDialogOpen] = useState(false);

  // selectedProjectId drives the split-view animation:
  // null  → show the card grid
  // string → slide selected card to sidebar, reveal inline editor
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProjectId = searchParams.get('project');

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

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleProjectSelect = (id: string) => {
    setSearchParams({ project: id });
  };

  const handleClose = () => {
    setSearchParams({});
  };

  const isSplitView = selectedProjectId !== null && selectedProject !== undefined;

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box
        sx={{
          p: 3,
          maxWidth: isSplitView ? 1400 : 1200,
          mx: 'auto',
          transition: 'max-width 0.4s ease',
        }}
      >
        {/* ── Header ── */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Projects
            </Typography>
          </Box>

          {!isSplitView && (
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
                variant="outlined"
                startIcon={<AccountTreeIcon />}
                onClick={() => navigate('/workflows')}
              >
                Workflows
              </Button>

              <Button
                variant="outlined"
                startIcon={<GroupsIcon />}
                onClick={() => navigate('/agents')}
              >
                Agent Team
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setNewDialogOpen(true)}
              >
                New Project
              </Button>
            </Box>
          )}
        </Box>

        {/* ── Loading / empty states ── */}
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

        {/* ── Animated content ── */}
        {!isLoading && projects.length > 0 && (
          // LayoutGroup scopes the layoutId animations so cards animate
          // directly from their grid position to the sidebar in one pass.
          // AnimatePresence is kept ONLY for the editor panel — wrapping the
          // card area in AnimatePresence caused exit-opacity to fight layoutId
          // and produced a double-reposition on cards that aren't in column 1.
          <LayoutGroup>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: isSplitView ? 3 : 0 }}>

              {/* ── Card area (no AnimatePresence — let layoutId own the motion) ── */}
              <Box sx={{ width: isSplitView ? 280 : '100%', flexShrink: 0 }}>
                {isSplitView ? (
                  /* Sidebar: the selected card drifts here via layoutId */
                  <motion.div
                    layoutId={`project-card-${selectedProjectId}`}
                    transition={CARD_SPRING}
                  >
                    <ProjectCard project={selectedProject!} />
                  </motion.div>
                ) : viewMode === 'list' ? (
                  /* Grid */
                  <Grid container spacing={2}>
                    {projects.map((project) => (
                      <Grid key={project.id} item xs={12} sm={6} md={4}>
                        <motion.div
                          layoutId={`project-card-${project.id}`}
                          transition={CARD_SPRING}
                        >
                          <ProjectCard
                            project={project}
                            onSelect={() => handleProjectSelect(project.id)}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  /* Graph */
                  <ProjectGraph projects={projects} width={1140} height={600} />
                )}
              </Box>

              {/* ── Editor panel (AnimatePresence only here) ── */}
              <AnimatePresence>
                {isSplitView && (
                  <motion.div
                    key={`editor-${selectedProjectId}`}
                    // Variants let enter and exit carry their own transitions,
                    // so the enter delay doesn't bleed into the exit and cause
                    // the editor to linger while the flex container collapses.
                    variants={{
                      enter: { opacity: 0, x: 40 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.25, duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
                      },
                      exit: {
                        opacity: 0,
                        x: 0,
                        transition: { duration: 0.12 },
                      },
                    }}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                    style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
                  >
                    <ProjectInlineDetail
                      projectId={selectedProjectId!}
                      onClose={handleClose}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </Box>
          </LayoutGroup>
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
