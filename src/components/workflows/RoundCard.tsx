import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { getAgentPersona } from '../../types/agent';
import type { Agent } from '../../types/agent';
import type { ScoreSnapshotEntry, WorkflowRoundDetail } from '../../types/workflow';

// ── Constants ─────────────────────────────────────────────────────────────

const DECISION_CONFIG = {
  refine:  { label: 'Refining',    color: 'warning' as const, icon: <AutorenewIcon sx={{ fontSize: 14 }} /> },
  clarify: { label: 'Needs input', color: 'warning' as const, icon: <HelpOutlineIcon sx={{ fontSize: 14 }} /> },
  proceed: { label: 'Approved',    color: 'success' as const, icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> },
};

// ── Score bar with threshold marker ───────────────────────────────────────

interface ScoreBarProps {
  score: number;
  threshold?: number | undefined;
  color: string;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, threshold, color }) => {
  const fillPct = Math.min(score * 10, 100);
  const threshPct = threshold !== undefined ? Math.min(threshold * 10, 100) : undefined;
  const passes = threshold !== undefined ? score >= threshold : undefined;

  return (
    <Box sx={{ position: 'relative', height: 5, borderRadius: 3, bgcolor: 'action.hover', flex: 1, minWidth: 60 }}>
      <Box
        sx={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${fillPct}%`, borderRadius: 3,
          bgcolor: passes === false ? 'warning.main' : passes === true ? 'success.main' : color,
          opacity: 0.8,
        }}
      />
      {threshPct !== undefined && (
        <Box
          sx={{
            position: 'absolute', left: `${threshPct}%`, top: -2, bottom: -2,
            width: 2, borderRadius: 1,
            bgcolor: 'text.secondary', opacity: 0.4,
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </Box>
  );
};

// ── Dimension list ─────────────────────────────────────────────────────────

const DimensionList: React.FC<{ entry: ScoreSnapshotEntry }> = ({ entry }) => (
  <Box>
    {entry.dimensions.map((dim) => (
      <Box key={dim.name} sx={{ py: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="caption" sx={{ flex: 1, color: 'text.primary', fontWeight: 500 }}>
            {dim.name}
          </Typography>
          {dim.value !== undefined && (
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700, fontSize: '0.7rem', flexShrink: 0,
                color: dim.value >= 7 ? 'success.main' : dim.value >= 4 ? 'warning.main' : 'error.main',
              }}
            >
              {dim.value}/10
            </Typography>
          )}
        </Box>
        {dim.rationale && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', fontSize: '0.68rem', lineHeight: 1.45, mt: 0.15 }}
          >
            {dim.rationale}
          </Typography>
        )}
      </Box>
    ))}
  </Box>
);

// ── Score row — avatar click expands dimension details ─────────────────────

interface ScoreRowProps {
  scorerKey: string;
  score: number;
  threshold?: number | undefined;
  snapshot?: ScoreSnapshotEntry | undefined;
  agents: Agent[];
  active: boolean;
  onToggle: () => void;
}

const ScoreRow: React.FC<ScoreRowProps> = ({
  scorerKey, score, threshold, snapshot, agents, active, onToggle,
}) => {
  const passes = threshold !== undefined ? score >= threshold : undefined;
  const persona = getAgentPersona(scorerKey, agents);
  const hasDetails = !!snapshot && snapshot.dimensions.length > 0;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 1, py: 0.5,
          borderRadius: 0.5,
          cursor: hasDetails ? 'pointer' : 'default',
          '&:hover': hasDetails ? { bgcolor: 'action.hover' } : {},
          px: 0.5,
          mx: -0.5,
        }}
        onClick={hasDetails ? onToggle : undefined}
        role={hasDetails ? 'button' : undefined}
        aria-expanded={hasDetails ? active : undefined}
      >
        {/* Avatar */}
        <Tooltip
          title={hasDetails ? `${persona.name} — click to ${active ? 'hide' : 'view'} breakdown` : persona.name}
          placement="left"
        >
          <Box
            sx={{
              width: 24, height: 24, borderRadius: '50%',
              bgcolor: persona.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', flexShrink: 0,
              boxShadow: active ? `0 0 0 2px ${persona.color}` : 'none',
              transition: 'box-shadow 0.15s',
            }}
          >
            {persona.avatar}
          </Box>
        </Tooltip>

        {/* Name */}
        <Typography variant="caption" sx={{ minWidth: 76, fontWeight: 500 }}>
          {persona.short_name}
        </Typography>

        {/* Score */}
        <Typography
          variant="caption"
          sx={{
            minWidth: 26, fontWeight: 700,
            color: passes === false ? 'warning.main' : passes === true ? 'success.main' : 'text.primary',
          }}
        >
          {score.toFixed(1)}
        </Typography>

        {/* Bar */}
        <ScoreBar score={score} threshold={threshold} color={persona.color} />

        {/* Threshold label */}
        {threshold !== undefined && (
          <Typography variant="caption" color="text.disabled" sx={{ minWidth: 44, textAlign: 'right', fontSize: '0.65rem' }}>
            need {threshold}
          </Typography>
        )}
      </Box>

      {/* Per-scorer dimension panel */}
      {hasDetails && (
        <Collapse in={active} timeout={180}>
          <Box
            sx={{
              mt: 0.25, mb: 0.5,
              ml: 4,
              pl: 1.25, py: 0.75,
              borderLeft: 2,
              borderColor: persona.color,
              bgcolor: `${persona.color}0d`,
              borderRadius: '0 4px 4px 0',
            }}
          >
            <DimensionList entry={snapshot!} />
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

// ── Main component ─────────────────────────────────────────────────────────

interface RoundCardProps {
  round: WorkflowRoundDetail;
  thresholds?: Record<string, number> | undefined;
  agents?: Agent[];
  /** True when the run is paused in this round waiting for user input */
  awaitingInput?: boolean;
}

export const RoundCard: React.FC<RoundCardProps> = ({
  round, thresholds, agents = [], awaitingInput = false,
}) => {
  const [activeScorerKey, setActiveScorerKey] = useState<string | null>(null);
  const [reasoningExpanded, setReasoningExpanded] = useState(false);

  const judge = round.judge;
  const decision = judge?.decision;
  const action = decision?.action;
  const decisionConfig = action ? DECISION_CONFIG[action] : undefined;

  const maxRounds = judge?.policy?.max_rounds;
  const isInProgress = round.status === 'in_progress';
  const hasJudge = !!judge;

  // Use score_snapshot (preferred, has dimension details) or fall back to simple scores
  const scoreSnapshot = judge?.score_snapshot;
  const simpleScores = round.scores?.after ?? round.scores?.before ?? {};
  const scorerKeys = scoreSnapshot
    ? Object.keys(scoreSnapshot)
    : Object.keys(simpleScores);

  const getScore = (key: string): number | undefined => {
    if (scoreSnapshot?.[key] !== undefined) return scoreSnapshot[key].overall;
    return simpleScores[key];
  };

  // Border and header background
  const borderColor =
    awaitingInput ? 'warning.main'
    : action === 'clarify' ? 'warning.main'
    : isInProgress && !hasJudge ? 'primary.main'
    : 'divider';

  const headerBg =
    awaitingInput ? 'warning.50'
    : action === 'clarify' ? 'warning.50'
    : isInProgress && !hasJudge ? 'primary.50'
    : 'action.hover';

  return (
    <Box sx={{ border: 1, borderColor, borderRadius: 1, overflow: 'hidden', mb: 1 }}>

      {/* ── Header ── */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 1.5, py: 1,
          bgcolor: headerBg,
          borderBottom: 1, borderColor: 'divider',
        }}
      >
        <Typography variant="overline" sx={{ lineHeight: 1, color: 'text.secondary', flexShrink: 0 }}>
          Round {round.round_number}{maxRounds !== undefined ? ` of ${maxRounds}` : ''}
        </Typography>

        {/* Analyzing spinner — only when no judge yet and not paused for input */}
        {isInProgress && !hasJudge && !awaitingInput && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CircularProgress size={12} />
            <Typography variant="caption" color="primary.main">Analyzing…</Typography>
          </Box>
        )}

        {/* Paused-for-input indicator */}
        {awaitingInput && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PauseCircleOutlineIcon sx={{ fontSize: 14, color: 'warning.main' }} />
            <Typography variant="caption" color="warning.main" sx={{ fontWeight: 600 }}>
              Waiting for your input
            </Typography>
          </Box>
        )}

        {decisionConfig && (
          <Chip
            icon={decisionConfig.icon}
            label={decisionConfig.label}
            size="small"
            color={decisionConfig.color}
            sx={{ ml: 'auto', height: 20, fontSize: '0.68rem', fontWeight: 700 }}
          />
        )}
      </Box>

      {/* ── Body — shown whenever there's a judge decision ── */}
      {judge && (
        <Box sx={{ px: 1.5, py: 1 }}>

          {/* Clarify: alert + questions */}
          {judge.decision.action === 'clarify' && (
            <Box sx={{ mb: 1.25 }}>
              <Alert
                severity="warning"
                icon={false}
                sx={{ py: 0.5, px: 1.25, mb: 1.25, '& .MuiAlert-message': { py: 0.25 } }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.25 }}>
                  Needs your input
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                  {judge.summary}
                </Typography>
              </Alert>

              {judge.decision.questions.length > 0 && (
                <>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Questions to answer:
                  </Typography>
                  <Box
                    component="ol"
                    sx={{ m: 0, pl: '1.5em', display: 'flex', flexDirection: 'column', gap: 0.75 }}
                  >
                    {judge.decision.questions.map((q, i) => (
                      <Box component="li" key={i}>
                        <Typography variant="caption" sx={{ lineHeight: 1.55 }}>{q}</Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}

          {/* Non-clarify: plain summary text */}
          {judge.decision.action !== 'clarify' && judge.summary && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.5, mb: 1 }}>
              {judge.summary}
            </Typography>
          )}

          {/* Score rows — avatar click expands per-scorer dimension panel */}
          {scorerKeys.length > 0 && (
            <>
              {judge.decision.action === 'clarify' && <Divider sx={{ mb: 0.75 }} />}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {scorerKeys.map((key) => {
                  const score = getScore(key);
                  if (score === undefined) return null;
                  return (
                    <ScoreRow
                      key={key}
                      scorerKey={key}
                      score={score}
                      threshold={thresholds?.[key]}
                      snapshot={scoreSnapshot?.[key]}
                      agents={agents}
                      active={activeScorerKey === key}
                      onToggle={() =>
                        setActiveScorerKey((prev) => (prev === key ? null : key))
                      }
                    />
                  );
                })}
              </Box>
            </>
          )}

          {/* Expandable: judge reasoning */}
          {judge.rationale && (
            <Accordion
              expanded={reasoningExpanded}
              onChange={(_, open) => setReasoningExpanded(open)}
              disableGutters elevation={0}
              sx={{ mt: 0.5, border: 0, '&:before': { display: 'none' }, bgcolor: 'transparent' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: 14 }} />}
                sx={{ px: 0, py: 0, minHeight: 'unset', '& .MuiAccordionSummary-content': { my: 0.25 } }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Reasoning
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0 }}>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.55, display: 'block' }}>
                  {judge.rationale}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Brief version badge */}
          {(round.brief?.version !== undefined || judge.brief_version !== undefined) && (
            <Box sx={{ mt: 0.75 }}>
              <Chip
                label={`Brief v${round.brief?.version ?? judge.brief_version}`}
                size="small"
                variant="outlined"
                sx={{ height: 16, fontSize: '0.62rem' }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RoundCard;
