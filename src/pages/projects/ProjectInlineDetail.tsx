import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckIcon from '@mui/icons-material/Check';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { EditorToolbar } from '../../components/editor/EditorToolbar';
import { extensions } from '../../components/editor/extensions';
import WorkflowRecommendationBanner from '../../components/workflows/WorkflowRecommendationBanner';
import { useAuth } from '../../auth/useAuth';
import {
  getProject,
  updateProject,
  triggerScore,
  getSectionQuestions,
} from '../../api/projects';
import { getWorkflowRecommendation, startWorkflowRun } from '../../api/workflows';
import type { ScoreRun } from '../../types/project';

// ── Helpers ────────────────────────────────────────────────────────────────

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
        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1, mb: 0.25 }}>
          {persona.shortName}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
          {persona.label}
        </Typography>
        <Chip
          label={`${run.overall.toFixed(1)} / 10`}
          color={overallChipColor(run.overall)}
          size="small"
          sx={{ fontWeight: 700, fontSize: '0.75rem' }}
        />
      </Box>

      <Box sx={{ px: 2, py: 1.75 }}>
        {run.dimensions.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No dimensions scored.
          </Typography>
        ) : (
          run.dimensions.map((dim) => {
            const pct = (dim.value / 10) * 100;
            const color =
              dim.value >= 7 ? ('success' as const)
              : dim.value >= 4 ? ('warning' as const)
              : ('error' as const);
            return (
              <Box key={dim.dimension_name} sx={{ mb: 1.75 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.4 }}>
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
                          onClick={() => onInsertSection(dim.dimension_name, dim.rationale, run.definition.name)}
                          disabled={loadingDimensions.has(dim.dimension_name)}
                          sx={{ p: 0.25, color: 'primary.main' }}
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
                <LinearProgress variant="determinate" value={pct} color={color} sx={{ height: 4, borderRadius: 2 }} />
                {dim.rationale && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, lineHeight: 1.45 }}>
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

// ── Editor styles ──────────────────────────────────────────────────────────

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

// ── Component ──────────────────────────────────────────────────────────────

interface ProjectInlineDetailProps {
  projectId: string;
  onClose: () => void;
}

export const ProjectInlineDetail: React.FC<ProjectInlineDetailProps> = ({ projectId, onClose }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [activeScoreId, setActiveScoreId] = useState<string | null>(null);
  const [scoreAnchorEl, setScoreAnchorEl] = useState<HTMLElement | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'pending' | 'saving' | 'saved'>('idle');
  const [loadingDimensions, setLoadingDimensions] = useState<Set<string>>(new Set());
  const [recDismissed, setRecDismissed] = useState(false);

  const contentInitialized = useRef(false);
  const skipNextUpdate = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: project } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProject(projectId, token),
    enabled: !!projectId,
  });

  const { data: recommendations = [] } = useQuery({
    queryKey: ['projects', projectId, 'workflow-recommendation'],
    queryFn: () => getWorkflowRecommendation(projectId, token),
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000,
  });

  const startRunMutation = useMutation({
    mutationFn: (workflowId: string) =>
      startWorkflowRun(projectId, { workflow_id: workflowId, mode: 'manual' }, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'workflow-runs'] });
      navigate(`/projects/${projectId}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (body: Parameters<typeof updateProject>[1]) => updateProject(projectId, body, token),
    onMutate: () => setSaveState('saving'),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
      setSaveState('saved');
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      savedTimerRef.current = setTimeout(() => setSaveState('idle'), 3000);
    },
    onError: () => setSaveState('idle'),
  });

  const scoreMutation = useMutation({
    mutationFn: () => triggerScore(projectId, undefined, token),
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ['projects', projectId] }),
  });

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

  // Reset editor + dismissal state when projectId changes
  useEffect(() => {
    contentInitialized.current = false;
    setRecDismissed(false);
  }, [projectId]);

  // Populate editor when project data arrives
  useEffect(() => {
    if (editor && project?.description !== undefined && !contentInitialized.current) {
      contentInitialized.current = true;
      skipNextUpdate.current = true;
      editor.commands.setContent(toEditorHtml(project.description));
    }
  }, [editor, project?.description]);

  const insertSection = useCallback(
    (dimensionName: string, rationale: string, definitionName: string) => {
      if (!editor || !projectId) return;
      setLoadingDimensions((prev) => new Set(prev).add(dimensionName));
      getSectionQuestions(
        projectId,
        { dimension_name: dimensionName, rationale, score_definition_name: definitionName },
        token
      )
        .then(({ questions }) => {
          const listItems = questions.map((q) => `<li>${q}</li>`).join('');
          editor.chain().focus('end').insertContent(`<h2>${dimensionName}</h2><ul>${listItems}</ul><p></p>`).run();
        })
        .catch(() => {
          editor.chain().focus('end').insertContent(`<h2>${dimensionName}</h2><p></p>`).run();
        })
        .finally(() => {
          setLoadingDimensions((prev) => {
            const next = new Set(prev);
            next.delete(dimensionName);
            return next;
          });
        });
    },
    [editor, projectId, token]
  );

  const scores = project?.scores ?? [];

  return (
    <Box>
      {/* ── Top bar ── */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          All Projects
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Save state indicator */}
          {saveState === 'pending' && (
            <Typography variant="caption" color="text.disabled">Unsaved changes</Typography>
          )}
          {saveState === 'saving' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CircularProgress size={12} />
              <Typography variant="caption" color="text.secondary">Saving…</Typography>
            </Box>
          )}
          {saveState === 'saved' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CheckIcon sx={{ fontSize: 14, color: 'success.main' }} />
              <Typography variant="caption" color="success.main">Saved</Typography>
            </Box>
          )}

          <Button
            size="small"
            startIcon={scoreMutation.isPending ? <CircularProgress size={14} /> : <AssessmentIcon />}
            onClick={() => scoreMutation.mutate()}
            disabled={scoreMutation.isPending}
          >
            Re-score
          </Button>

          <Tooltip title="Open full project view">
            <IconButton size="small" onClick={() => navigate(`/projects/${projectId}`)}>
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* ── Title ── */}
      {project && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {project.title}
          </Typography>
        </motion.div>
      )}

      {/* ── Workflow recommendation ── */}
      {!recDismissed && recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.3 }}
        >
          <WorkflowRecommendationBanner
            recommendations={recommendations}
            onAccept={(wfId) => startRunMutation.mutate(wfId)}
            onDismiss={() => setRecDismissed(true)}
            accepting={!!startRunMutation.isPending}
            token={token}
          />
        </motion.div>
      )}

      {/* ── Editor (text flows in from left, suggesting it came from the card) ── */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {/* Toolbar */}
          <EditorToolbar editor={editor} />

          {/* Score avatars */}
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
                  <Tooltip key={run.id} title={`${persona.shortName} · ${run.overall.toFixed(1)}/10`}>
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
      </motion.div>

      {/* Score popover */}
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
    </Box>
  );
};
