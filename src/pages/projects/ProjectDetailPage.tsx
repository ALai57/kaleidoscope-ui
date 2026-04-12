import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import SchoolIcon from '@mui/icons-material/School';
import { NavBar } from '../../components/layout/NavBar';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
import { ScoreRunCard } from '../../components/projects/ScoreRunCard';
import { ScoreHistory } from '../../components/projects/ScoreHistory';
import { VoiceCapture } from '../../components/projects/VoiceCapture';
import { useAuth } from '../../auth/useAuth';
import {
  getProject,
  updateProject,
  deleteProject,
  getNotes,
  addTextNote,
  addVoiceNote,
  triggerScore,
  getScoreHistory,
} from '../../api/projects';
import type { ProjectStatus } from '../../types/project';

const STATUS_OPTIONS: ProjectStatus[] = ['idea', 'developing', 'executing'];

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box hidden={value !== index} sx={{ pt: 2 }}>
    {value === index && children}
  </Box>
);

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();

  const [tab, setTab] = useState(0);
  const [noteText, setNoteText] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: project, isLoading } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProject(id!, token),
    enabled: !!id,
  });

  const { data: notes = [] } = useQuery({
    queryKey: ['projects', id, 'notes'],
    queryFn: () => getNotes(id!, token),
    enabled: !!id,
  });

  const { data: scoreHistory = [] } = useQuery({
    queryKey: ['projects', id, 'scores', 'history'],
    queryFn: () => getScoreHistory(id!, token),
    enabled: !!id && tab === 2,
  });

  const updateMutation = useMutation({
    mutationFn: (body: Parameters<typeof updateProject>[1]) => updateProject(id!, body, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['projects', id] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteProject(id!, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects');
    },
  });

  const scoreMutation = useMutation({
    mutationFn: () => triggerScore(id!, undefined, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['projects', id] }),
  });

  const addNoteMutation = useMutation({
    mutationFn: (content: string) => addTextNote(id!, content, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects', id, 'notes'] });
      setNoteText('');
    },
  });

  const addVoiceMutation = useMutation({
    mutationFn: (blob: Blob) => addVoiceNote(id!, blob, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['projects', id, 'notes'] }),
  });

  const handleStatusChange = (newStatus: ProjectStatus) => {
    updateMutation.mutate({ status: newStatus });
  };

  const handleTitleSave = () => {
    if (draftTitle.trim()) {
      updateMutation.mutate({ title: draftTitle.trim() });
    }
    setEditingTitle(false);
  };

  if (isLoading) return <LoadingScreen />;
  if (!project) return <Alert severity="error">Project not found.</Alert>;

  const scores = project.scores ?? [];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
            {editingTitle ? (
              <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                <TextField
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  size="small"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTitleSave();
                    if (e.key === 'Escape') setEditingTitle(false);
                  }}
                  sx={{ flex: 1 }}
                />
                <Button size="small" variant="contained" onClick={handleTitleSave}>Save</Button>
                <Button size="small" onClick={() => setEditingTitle(false)}>Cancel</Button>
              </Box>
            ) : (
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, flex: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                onClick={() => { setDraftTitle(project.title); setEditingTitle(true); }}
              >
                {project.title}
              </Typography>
            )}

            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={project.status}
                label="Status"
                onChange={(e) => handleStatusChange(e.target.value as ProjectStatus)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <MenuItem key={s} value={s} sx={{ textTransform: 'capitalize' }}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {project.description || <em>No description</em>}
          </Typography>

          {/* Action buttons */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button
              variant="outlined"
              startIcon={<ChatIcon />}
              onClick={() => navigate(`/projects/${id}/develop`)}
            >
              Develop
            </Button>
            <Button
              variant="outlined"
              startIcon={<SchoolIcon />}
              onClick={() => navigate(`/projects/${id}/skills`)}
            >
              Skills
            </Button>
            <Button
              variant="outlined"
              startIcon={scoreMutation.isPending ? <CircularProgress size={16} /> : <AssessmentIcon />}
              onClick={() => scoreMutation.mutate()}
              disabled={scoreMutation.isPending}
            >
              Re-score
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Stack>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Tabs */}
        <Tabs value={tab} onChange={(_, v) => setTab(v as number)} sx={{ mb: 1 }}>
          <Tab label="Scores" icon={<AssessmentIcon />} iconPosition="start" />
          <Tab label={`Notes (${notes.length})`} />
          <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
        </Tabs>

        {/* Scores tab */}
        <TabPanel value={tab} index={0}>
          {scores.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Not yet scored. Click "Re-score" to evaluate this project.
              </Typography>
            </Box>
          ) : (
            scores.map((run) => (
              <ScoreRunCard key={run.id} scoreRun={run} defaultExpanded={scores.length === 1} />
            ))
          )}
        </TabPanel>

        {/* Notes tab */}
        <TabPanel value={tab} index={1}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                multiline
                rows={3}
                fullWidth
                placeholder="Add a note about this project…"
                size="small"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => addNoteMutation.mutate(noteText)}
                  disabled={!noteText.trim() || addNoteMutation.isPending}
                >
                  Add
                </Button>
                <VoiceCapture
                  onAudioCaptured={async (blob) => { await addVoiceMutation.mutateAsync(blob); }}
                  disabled={addVoiceMutation.isPending}
                />
              </Box>
            </Box>
          </Box>

          {notes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No notes yet. Add a text note or record a voice note.
            </Typography>
          ) : (
            [...notes].reverse().map((note) => (
              <Box
                key={note.id}
                sx={{
                  p: 1.5,
                  mb: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Chip
                    label={note.source}
                    size="small"
                    variant="outlined"
                    color={note.source === 'voice' ? 'secondary' : 'default'}
                  />
                  <Typography variant="caption" color="text.disabled">
                    {new Date(note.created_at).toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body2">{note.content}</Typography>
              </Box>
            ))
          )}
        </TabPanel>

        {/* History tab */}
        <TabPanel value={tab} index={2}>
          <ScoreHistory history={scoreHistory} />
        </TabPanel>
      </Box>

      {/* Delete dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete "{project.title}"?</DialogTitle>
        <DialogContent>
          <Typography>
            This will permanently delete the project along with all its notes, scores, and
            conversations. This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetailPage;
