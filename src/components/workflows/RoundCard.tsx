import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import type { ScoreSnapshotEntry, WorkflowRoundDetail } from '../../types/workflow';

// ── Constants ─────────────────────────────────────────────────────────────

const SCORER_LABELS: Record<string, string> = {
  pm: 'Product',
  engineering_lead: 'Engineering',
  coach: 'Coach',
  general: 'Advisor',
};

const SCORER_COLORS: Record<string, string> = {
  pm: '#7c3aed',
  engineering_lead: '#0369a1',
  coach: '#0891b2',
  general: '#6b7280',
};

const DECISION_CONFIG = {
  refine:  { label: 'Refining',    color: 'warning' as const, icon: <AutorenewIcon sx={{ fontSize: 14 }} /> },
  clarify: { label: 'Needs input', color: 'warning' as const, icon: <HelpOutlineIcon sx={{ fontSize: 14 }} /> },
  proceed: { label: 'Approved',    color: 'success' as const, icon: <CheckCircleIcon sx={{ fontSize: 14 }} /> },
};

// ── Score bar with threshold marker ───────────────────────────────────────

interface ScoreBarProps {
  score: number;
  threshold?: number;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, threshold }) => {
  const fillPct = Math.min(score * 10, 100);
  const threshPct = threshold !== undefined ? Math.min(threshold * 10, 100) : undefined;
  const passes = threshold !== undefined ? score >= threshold : undefined;

  return (
    <Box sx={{ position: 'relative', height: 6, borderRadius: 3, bgcolor: 'action.hover', flex: 1, minWidth: 60 }}>
      <Box
        sx={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${fillPct}%`, borderRadius: 3,
          bgcolor: passes === false ? 'warning.main' : passes === true ? 'success.main' : 'primary.main',
        }}
      />
      {threshPct !== undefined && (
        <Box
          sx={{
            position: 'absolute', left: `${threshPct}%`, top: -2, bottom: -2,
            width: 2, borderRadius: 1,
            bgcolor: 'text.secondary', opacity: 0.5,
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </Box>
  );
};

// ── Score row ─────────────────────────────────────────────────────────────

interface ScoreRowProps {
  scorerKey: string;
  score: number;
  threshold?: number;
}

const ScoreRow: React.FC<ScoreRowProps> = ({ scorerKey, score, threshold }) => {
  const label = SCORER_LABELS[scorerKey] ?? scorerKey;
  const color = SCORER_COLORS[scorerKey] ?? '#6b7280';
  const passes = threshold !== undefined ? score >= threshold : undefined;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
      <Typography variant="caption" sx={{ minWidth: 80, fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          minWidth: 26, fontWeight: 700,
          color: passes === false ? 'warning.main' : passes === true ? 'success.main' : 'text.primary',
        }}
      >
        {score.toFixed(1)}
      </Typography>
      <ScoreBar score={score} threshold={threshold} />
      {threshold !== undefined && (
        <Typography variant="caption" color="text.disabled" sx={{ minWidth: 44, textAlign: 'right', fontSize: '0.65rem' }}>
          need {threshold}
        </Typography>
      )}
    </Box>
  );
};

// ── Dimension list ─────────────────────────────────────────────────────────

const DimensionList: React.FC<{ entry: ScoreSnapshotEntry }> = ({ entry }) => (
  <Box>
    {entry.dimensions.map((dim) => (
      <Box key={dim.name} sx={{ py: 0.4 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="caption" sx={{ flex: 1, color: 'text.secondary' }}>
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
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: 'block', fontSize: '0.68rem', lineHeight: 1.45, mt: 0.2 }}
        >
          {dim.rationale}
        </Typography>
      </Box>
    ))}
  </Box>
);

// ── Main component ─────────────────────────────────────────────────────────

interface RoundCardProps {
  round: WorkflowRoundDetail;
  thresholds?: Record<string, number>;
}

export const RoundCard: React.FC<RoundCardProps> = ({ round, thresholds }) => {
  const [scoresExpanded, setScoresExpanded] = useState(false);
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

  return (
    <Box
      sx={{
        border: 1,
        borderColor: action === 'clarify' ? 'warning.main' : isInProgress && !hasJudge ? 'primary.main' : 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        mb: 1,
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 1.5, py: 1,
          bgcolor: action === 'clarify' ? 'warning.50' : isInProgress && !hasJudge ? 'primary.50' : 'action.hover',
          borderBottom: 1, borderColor: 'divider',
        }}
      >
        <Typography variant="overline" sx={{ lineHeight: 1, color: 'text.secondary', flexShrink: 0 }}>
          Round {round.round_number}{maxRounds !== undefined ? ` of ${maxRounds}` : ''}
        </Typography>

        {/* Spinner only when analyzing and no decision yet */}
        {isInProgress && !hasJudge && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CircularProgress size={12} />
            <Typography variant="caption" color="primary.main">Analyzing…</Typography>
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
      {hasJudge && (
        <Box sx={{ px: 1.5, py: 1 }}>

          {/* Clarify: alert + questions as numbered list */}
          {action === 'clarify' && decision.action === 'clarify' && (
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

              {decision.questions.length > 0 && (
                <>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', display: 'block', mb: 0.5 }}>
                    Questions to answer:
                  </Typography>
                  <Box
                    component="ol"
                    sx={{ m: 0, pl: '1.5em', display: 'flex', flexDirection: 'column', gap: 0.75 }}
                  >
                    {decision.questions.map((q, i) => (
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
          {action !== 'clarify' && judge.summary && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.5, mb: 1 }}>
              {judge.summary}
            </Typography>
          )}

          {/* Score bars */}
          {scorerKeys.length > 0 && (
            <>
              {action === 'clarify' && <Divider sx={{ mb: 1 }} />}
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
                    />
                  );
                })}
              </Box>
            </>
          )}

          {/* Expandable: per-dimension score breakdown */}
          {scoreSnapshot && Object.keys(scoreSnapshot).length > 0 && (
            <Accordion
              expanded={scoresExpanded}
              onChange={(_, open) => setScoresExpanded(open)}
              disableGutters elevation={0}
              sx={{ mt: 0.5, border: 0, '&:before': { display: 'none' }, bgcolor: 'transparent' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ fontSize: 14 }} />}
                sx={{ px: 0, py: 0, minHeight: 'unset', '& .MuiAccordionSummary-content': { my: 0.25 } }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Score details
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0.5, pb: 0 }}>
                {Object.entries(scoreSnapshot).map(([key, entry], idx) => (
                  <Box key={key}>
                    {idx > 0 && <Divider sx={{ my: 0.75 }} />}
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, display: 'block', mb: 0.25, color: SCORER_COLORS[key] ?? 'text.primary' }}
                    >
                      {SCORER_LABELS[key] ?? key}
                    </Typography>
                    <DimensionList entry={entry} />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          )}

          {/* Expandable: judge reasoning */}
          {judge.rationale && (
            <Accordion
              expanded={reasoningExpanded}
              onChange={(_, open) => setReasoningExpanded(open)}
              disableGutters elevation={0}
              sx={{ mt: 0.25, border: 0, '&:before': { display: 'none' }, bgcolor: 'transparent' }}
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
