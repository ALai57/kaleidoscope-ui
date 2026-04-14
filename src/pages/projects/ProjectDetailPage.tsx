import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEditor, EditorContent } from '@tiptap/react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
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
import Popover from '@mui/material/Popover';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HistoryIcon from '@mui/icons-material/History';
import SchoolIcon from '@mui/icons-material/School';
import { NavBar } from '../../components/layout/NavBar';
import { LoadingScreen } from '../../components/layout/LoadingScreen';
import { EditorToolbar } from '../../components/editor/EditorToolbar';
import { extensions } from '../../components/editor/extensions';
import { ScoreHistory } from '../../components/projects/ScoreHistory';
import { VoiceCapture } from '../../components/projects/VoiceCapture';
import { WorkflowTab } from '../../components/workflows/WorkflowRunPanel';
import { TasksTab } from '../../components/tasks/TasksTab';
import { useAuth } from '../../auth/useAuth';
import {
  getProject,
  updateProject,
  deleteProject,
  getNotes,
  addTextNote,
  addVoiceNote,
  getScoreHistory,
  getSectionQuestions,
} from '../../api/projects';
import { getTasks } from '../../api/tasks';
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

// ── Scorer personas ────────────────────────────────────────────────────────

interface ScorerPersona {
  animal: string;
  shortName: string;
  label: string;
  /** CSS color string used for the avatar background */
  color: string;
}

const SCORER_PERSONAS: Record<string, ScorerPersona> = {
  pm:               { animal: '🦊', shortName: 'Product',   label: 'Product Manager',  color: '#7c3aed' },
  engineering_lead: { animal: '🦉', shortName: 'Architect', label: 'Engineering Lead', color: '#0369a1' },
  coach:            { animal: '🐬', shortName: 'Coach',     label: 'Project Coach',    color: '#0891b2' },
};

const DEFAULT_PERSONA: ScorerPersona = {
  animal: '🐱', shortName: 'Advisor', label: 'Expert Advisor', color: '#6b7280',
};

function getPersona(scorerType: string): ScorerPersona {
  return SCORER_PERSONAS[scorerType] ?? DEFAULT_PERSONA;
}

function overallChipColor(overall: number): 'success' | 'warning' | 'error' {
  if (overall >= 7) return 'success';
  if (overall >= 4) return 'warning';
  return 'error';
}

// ── Score popover content ──────────────────────────────────────────────────

interface ScorePopoverContentProps {
  run: ScoreRun;
  onInsertSection: (dimensionName: string, rationale: string, definitionName: string) => void;
  loadingDimensions: Set<string>;
}

const ScorePopoverContent: React.FC<ScorePopoverContentProps> = ({
  run,
  onInsertSection,
  loadingDimensions,
}) => {
  const persona = getPersona(run.definition.scorer_type);

  return (
    <Box sx={{ width: 300 }}>
      {/* ── Persona header ── */}
      <Box
        sx={{
          px: 2.5,
          pt: 3,
          pb: 2.5,
          textAlign: 'center',
          background: `linear-gradient(160deg, ${persona.color}22 0%, ${persona.color}08 100%)`,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {/* Animal illustration */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 72,
            height: 72,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            boxShadow: `0 0 0 3px ${persona.color}40`,
            fontSize: '2.5rem',
            lineHeight: 1,
            mb: 1.5,
          }}
        >
          {persona.animal}
        </Box>

        {/* Short name */}
        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 0.25 }}>
          {persona.shortName}
        </Typography>

        {/* Role label */}
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          {persona.label}
        </Typography>

        {/* Overall score chip */}
        <Chip
          label={`${run.overall.toFixed(1)} / 10`}
          color={overallChipColor(run.overall)}
          size="small"
          sx={{ fontWeight: 700, fontSize: '0.75rem' }}
        />
      </Box>

      {/* ── Dimensions ── */}
      <Box sx={{ px: 2, py: 1.75 }}>
        {run.dimensions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No dimensions scored.
          </Typography>
        ) : (
          run.dimensions.map((dim) => {
            const pct = (dim.value / 10) * 100;
            const color =
              dim.value >= 7
                ? ('success' as const)
                : dim.value >= 4
                  ? ('warning' as const)
                  : ('error' as const);
            return (
              <Box key={dim.dimension_name} sx={{ mb: 1.75 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 0.4,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
                    {dim.dimension_name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ml: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: `${color}.main` }}>
                      {dim.value.toFixed(1)}
                    </Typography>
                    <Tooltip title={`Add "${dim.dimension_name}" section with guiding questions`}>
                      <span>
                        <IconButton
                          size="small"
                          onClick={() =>
                            onInsertSection(dim.dimension_name, dim.rationale, run.definition.name)
                          }
                          disabled={loadingDimensions.has(dim.dimension_name)}
                          sx={{ p: 0.25, color: 'primary.main' }}
                          aria-label={`Insert ${dim.dimension_name} section`}
                        >
                          {loadingDimensions.has(dim.dimension_name) ? (
                            <CircularProgress size={12} />
                          ) : (
                            <AddCircleOutlineIcon sx={{ fontSize: 14 }} />
                          )}
                        </IconButton>
                      </span>
                    </Tooltip>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  color={color}
                  sx={{ height: 4, borderRadius: 2 }}
                />
                {dim.rationale && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5, lineHeight: 1.45 }}
                  >
                    {dim.rationale}
                  </Typography>
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

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
  const [activeScoreId, setActiveScoreId] = useState<string | null>(null);
  const [scoreAnchorEl, setScoreAnchorEl] = useState<HTMLElement | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'pending' | 'saving' | 'saved'>('idle');
  const [loadingDimensions, setLoadingDimensions] = useState<Set<string>>(new Set());

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

  const { data: tasks = [] } = useQuery({
    queryKey: ['projects', id, 'tasks'],
    queryFn: () => getTasks(id!, token),
    enabled: !!id,
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
    (dimensionName: string, rationale: string, definitionName: string) => {
      if (!editor || !id) return;

      setLoadingDimensions((prev) => new Set(prev).add(dimensionName));

      getSectionQuestions(
        id,
        { dimension_name: dimensionName, rationale, score_definition_name: definitionName },
        token
      )
        .then(({ questions }) => {
          const listItems = questions.map((q) => `<li>${q}</li>`).join('');
          editor
            .chain()
            .focus('end')
            .insertContent(`<h2>${dimensionName}</h2><ul>${listItems}</ul><p></p>`)
            .run();
        })
        .catch(() => {
          // Fallback: insert heading only so the user isn't left with nothing
          editor
            .chain()
            .focus('end')
            .insertContent(`<h2>${dimensionName}</h2><p></p>`)
            .run();
        })
        .finally(() => {
          setLoadingDimensions((prev) => {
            const next = new Set(prev);
            next.delete(dimensionName);
            return next;
          });
        });
    },
    [editor, id, token]
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
              startIcon={<SchoolIcon />}
              onClick={() => navigate(`/projects/${id}/skills`)}
            >
              Skills
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

        {/* ── Editor + score avatars ── */}
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

          {/* Sub-toolbar: per-scorer avatars */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              px: 1.5,
              py: 0.75,
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: 'grey.50',
              gap: 1,
            }}
          >
            {scores.length === 0 ? (
              <Typography variant="caption" color="text.disabled" sx={{ mr: 0.5 }}>
                No scores yet
              </Typography>
            ) : (
              scores.map((run) => {
                const persona = getPersona(run.definition.scorer_type);
                const isOpen = activeScoreId === run.id;
                return (
                  <Tooltip
                    key={run.id}
                    title={`${persona.shortName} · ${run.overall.toFixed(1)}/10`}
                  >
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        fontSize: '1.1rem',
                        bgcolor: persona.color,
                        cursor: 'pointer',
                        outline: isOpen ? '2px solid' : '2px solid transparent',
                        outlineColor: isOpen ? persona.color : 'transparent',
                        outlineOffset: '2px',
                        boxShadow: isOpen ? 3 : 1,
                        transition: 'box-shadow 0.15s, outline-color 0.15s',
                        '&:hover': { boxShadow: 4 },
                      }}
                      onClick={(e) => {
                        if (isOpen) {
                          setActiveScoreId(null);
                          setScoreAnchorEl(null);
                        } else {
                          setActiveScoreId(run.id);
                          setScoreAnchorEl(e.currentTarget);
                        }
                      }}
                    >
                      {persona.animal}
                    </Avatar>
                  </Tooltip>
                );
              })
            )}
          </Box>

          {/* Editor content */}
          <Box sx={EDITOR_CONTENT_SX}>
            <EditorContent editor={editor} />
          </Box>
        </Box>

        {/* Score popover — one per scorer, rendered outside editor box */}
        {(() => {
          const activeRun = scores.find((r) => r.id === activeScoreId) ?? null;
          return (
            <Popover
              open={!!activeRun}
              anchorEl={scoreAnchorEl}
              onClose={() => {
                setActiveScoreId(null);
                setScoreAnchorEl(null);
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              slotProps={{ paper: { sx: { mt: 0.5, maxHeight: '60vh', overflowY: 'auto' } } }}
            >
              {activeRun && (
                <ScorePopoverContent
                  run={activeRun}
                  onInsertSection={insertSection}
                  loadingDimensions={loadingDimensions}
                />
              )}
            </Popover>
          );
        })()}

        <Divider sx={{ mb: 2 }} />

        {/* ── Tabs ── */}
        <Tabs value={tab} onChange={(_, v) => setTab(v as number)} sx={{ mb: 1 }}>
          <Tab label={`Notes (${notes.length})`} />
          <Tab label="Score history" icon={<HistoryIcon />} iconPosition="start" />
          <Tab label="Workflow" icon={<AccountTreeIcon />} iconPosition="start" />
          <Tab
            label={tasks.length > 0 ? `Tasks (${tasks.length})` : 'Tasks'}
            icon={<ChecklistIcon />}
            iconPosition="start"
          />
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

        {/* Workflow tab */}
        <TabPanel value={tab} index={2}>
          <WorkflowTab projectId={id!} token={token} />
        </TabPanel>

        {/* Tasks tab */}
        <TabPanel value={tab} index={3}>
          <TasksTab projectId={id!} token={token} />
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
