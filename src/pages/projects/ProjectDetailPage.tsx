import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEditor, EditorContent } from '@tiptap/react';
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
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import SchoolIcon from '@mui/icons-material/School';
import { NavBar } from '../../components/layout/NavBar';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
import { EditorToolbar } from '../../components/editor/EditorToolbar';
import { extensions } from '../../components/editor/extensions';
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
import type { ProjectStatus, ScoreRun } from '../../types/project';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Ensure plain-text descriptions render correctly in the Tiptap editor. */
function toEditorHtml(text: string): string {
  if (!text) return '';
  if (/<[a-z][\s\S]*>/i.test(text)) return text;
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

// ── Score overlay panel ────────────────────────────────────────────────────

interface ScoreOverlayPanelProps {
  scores: ScoreRun[];
  onInsertSection: (dimensionName: string) => void;
  onClose: () => void;
}

const ScoreOverlayPanel: React.FC<ScoreOverlayPanelProps> = ({
  scores,
  onInsertSection,
  onClose,
}) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: 288,
      maxHeight: '52vh',
      overflowY: 'auto',
      bgcolor: 'background.paper',
      border: 1,
      borderColor: 'divider',
      borderRadius: '0 0 0 8px',
      boxShadow: 6,
      zIndex: 10,
    }}
  >
    {/* Panel header */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 1.5,
        py: 1,
        borderBottom: 1,
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        zIndex: 1,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Scores
      </Typography>
      <IconButton size="small" onClick={onClose} aria-label="Close scores panel">
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>

    {scores.length === 0 ? (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Not yet scored. Use "Re-score" to evaluate this project.
        </Typography>
      </Box>
    ) : (
      scores.map((run, runIdx) => (
        <Box
          key={run.id}
          sx={{
            p: 1.5,
            borderBottom: runIdx < scores.length - 1 ? 1 : 0,
            borderColor: 'divider',
          }}
        >
          {/* Definition name + overall */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: 'text.secondary',
              }}
            >
              {run.definition.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color:
                  run.overall >= 7
                    ? 'success.main'
                    : run.overall >= 4
                      ? 'warning.main'
                      : 'error.main',
              }}
            >
              {run.overall.toFixed(1)}&thinsp;/&thinsp;10
            </Typography>
          </Box>

          {/* Dimensions */}
          {run.dimensions.map((dim) => {
            const pct = (dim.value / 10) * 100;
            const color =
              dim.value >= 7 ? ('success' as const) : dim.value >= 4 ? ('warning' as const) : ('error' as const);
            return (
              <Box key={dim.dimension_name} sx={{ mb: 1.25 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 0.25,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
                    {dim.dimension_name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ml: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      {dim.value.toFixed(1)}
                    </Typography>
                    <Tooltip title={`Add "${dim.dimension_name}" section to description`}>
                      <IconButton
                        size="small"
                        onClick={() => onInsertSection(dim.dimension_name)}
                        sx={{ p: 0.25, color: 'primary.main' }}
                        aria-label={`Insert ${dim.dimension_name} section`}
                      >
                        <AddCircleOutlineIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  color={color}
                  sx={{ height: 3, borderRadius: 2 }}
                />
                {dim.rationale && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5, fontSize: '0.65rem', lineHeight: 1.4 }}
                  >
                    {dim.rationale}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      ))
    )}
  </Box>
);

// ── Tab panel ──────────────────────────────────────────────────────────────

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

// ── Page ───────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: ProjectStatus[] = ['idea', 'developing', 'executing'];

const EDITOR_CONTENT_SX = {
  p: 1.5,
  minHeight: 280,
  '& .ProseMirror': {
    outline: 'none',
    minHeight: '240px',
    '& p': { margin: '0.5em 0' },
    '& h1, & h2, & h3': { margin: '0.75em 0 0.25em' },
    '& pre': {
      backgroundColor: 'grey.900',
      color: 'grey.100',
      padding: '1em',
      borderRadius: '4px',
      overflowX: 'auto',
    },
    '& code': {
      backgroundColor: 'grey.100',
      borderRadius: '2px',
      padding: '0.1em 0.3em',
      fontFamily: 'monospace',
    },
    '& pre code': { backgroundColor: 'transparent', padding: 0 },
    '& blockquote': {
      borderLeft: '3px solid',
      borderColor: 'divider',
      paddingLeft: '1em',
      marginLeft: 0,
      color: 'text.secondary',
    },
    '& img': { maxWidth: '100%', height: 'auto' },
    '& ul, & ol': { paddingLeft: '1.5em' },
  },
} as const;

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
  const [scoresOpen, setScoresOpen] = useState(true);
  const [saveState, setSaveState] = useState<'idle' | 'pending' | 'saving' | 'saved'>('idle');

  const contentInitialized = useRef(false);
  const skipNextUpdate = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  // ── Queries ──────────────────────────────────────────────────────────────

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
    enabled: !!id && tab === 1,
  });

  // ── Mutations ─────────────────────────────────────────────────────────────

  const updateMutation = useMutation({
    mutationFn: (body: Parameters<typeof updateProject>[1]) => updateProject(id!, body, token),
    onMutate: () => setSaveState('saving'),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects', id] });
      setSaveState('saved');
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSaveState('idle'), 3000);
    },
    onError: () => setSaveState('idle'),
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

  // ── Editor ────────────────────────────────────────────────────────────────

  const editor = useEditor({
    extensions,
    content: '',
    editable: true,
    onUpdate: ({ editor: e }) => {
      if (skipNextUpdate.current) {
        skipNextUpdate.current = false;
        return;
      }
      setSaveState('pending');
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        updateMutation.mutate({ description: e.getHTML() });
      }, 1500);
    },
  });

  // Populate editor once when project data first arrives
  useEffect(() => {
    if (editor && project?.description !== undefined && !contentInitialized.current) {
      contentInitialized.current = true;
      skipNextUpdate.current = true;
      editor.commands.setContent(toEditorHtml(project.description));
    }
  }, [editor, project?.description]);

  // ── Callbacks ─────────────────────────────────────────────────────────────

  const insertSection = useCallback(
    (dimensionName: string) => {
      if (!editor) return;
      editor
        .chain()
        .focus('end')
        .insertContent(
          `<h2>${dimensionName}</h2><p></p>`
        )
        .run();
    },
    [editor]
  );

  const handleTitleSave = () => {
    if (draftTitle.trim()) updateMutation.mutate({ title: draftTitle.trim() });
    setEditingTitle(false);
  };

  const handleStatusChange = (newStatus: ProjectStatus) => {
    updateMutation.mutate({ status: newStatus });
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (isLoading) return <LoadingScreen />;
  if (!project) return <Alert severity="error">Project not found.</Alert>;

  const scores = project.scores ?? [];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
        {/* ── Title + status ── */}
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
              <Button size="small" variant="contained" onClick={handleTitleSave}>
                Save
              </Button>
              <Button size="small" onClick={() => setEditingTitle(false)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                flex: 1,
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
              }}
              onClick={() => {
                setDraftTitle(project.title);
                setEditingTitle(true);
              }}
            >
              {project.title}
            </Typography>
          )}

          <FormControl size="small" sx={{ minWidth: 140, flexShrink: 0 }}>
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

        {/* ── Action buttons + save indicator ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ChatIcon />}
              onClick={() => navigate(`/projects/${id}/develop`)}
            >
              Develop
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<SchoolIcon />}
              onClick={() => navigate(`/projects/${id}/skills`)}
            >
              Skills
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={
                scoreMutation.isPending ? <CircularProgress size={14} /> : <AssessmentIcon />
              }
              onClick={() => scoreMutation.mutate()}
              disabled={scoreMutation.isPending}
            >
              Re-score
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Stack>

          {/* Save state indicator */}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {saveState === 'pending' && (
              <Typography variant="caption" color="text.disabled">
                Unsaved changes
              </Typography>
            )}
            {saveState === 'saving' && (
              <>
                <CircularProgress size={12} />
                <Typography variant="caption" color="text.secondary">
                  Saving…
                </Typography>
              </>
            )}
            {saveState === 'saved' && (
              <>
                <CheckIcon sx={{ fontSize: 14, color: 'success.main' }} />
                <Typography variant="caption" color="success.main">
                  Saved
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* ── Editor + score overlay ── */}
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {/* Toolbar */}
          <EditorToolbar editor={editor} />

          {/* Sub-toolbar: scores toggle */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              px: 1.5,
              py: 0.5,
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'grey.50',
            }}
          >
            <Chip
              icon={<AssessmentIcon sx={{ fontSize: '14px !important' }} />}
              label={
                scoresOpen
                  ? 'Hide scores'
                  : scores.length > 0
                    ? `${scores.length} score${scores.length !== 1 ? 's' : ''}`
                    : 'Show scores'
              }
              size="small"
              clickable
              color={scoresOpen ? 'primary' : 'default'}
              variant={scoresOpen ? 'filled' : 'outlined'}
              onClick={() => setScoresOpen((v) => !v)}
            />
          </Box>

          {/* Content area — relative container for the overlay */}
          <Box sx={{ position: 'relative' }}>
            <Box sx={EDITOR_CONTENT_SX}>
              <EditorContent editor={editor} />
            </Box>

            {scoresOpen && (
              <ScoreOverlayPanel
                scores={scores}
                onInsertSection={insertSection}
                onClose={() => setScoresOpen(false)}
              />
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* ── Tabs ── */}
        <Tabs value={tab} onChange={(_, v) => setTab(v as number)} sx={{ mb: 1 }}>
          <Tab label={`Notes (${notes.length})`} />
          <Tab label="Score history" icon={<HistoryIcon />} iconPosition="start" />
        </Tabs>

        {/* Notes tab */}
        <TabPanel value={tab} index={0}>
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
                  onAudioCaptured={async (blob) => {
                    await addVoiceMutation.mutateAsync(blob);
                  }}
                  disabled={addVoiceMutation.isPending}
                />
              </Box>
            </Box>
          </Box>

          {notes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No notes yet.
            </Typography>
          ) : (
            [...notes].reverse().map((note) => (
              <Box
                key={note.id}
                sx={{ p: 1.5, mb: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}
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
        <TabPanel value={tab} index={1}>
          <ScoreHistory history={scoreHistory} />
        </TabPanel>
      </Box>

      {/* Delete confirmation dialog */}
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
