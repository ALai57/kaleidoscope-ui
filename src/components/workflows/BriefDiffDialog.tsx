import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { ProjectBrief } from '../../types/workflow';
import { getAgentPersona } from '../../types/agent';
import type { Agent } from '../../types/agent';

// ── Simple line diff ──────────────────────────────────────────────────────
//
// Produces a list of hunks: each line is tagged 'equal', 'added', or 'removed'.
// Uses a basic LCS-based diff without external dependencies.

type DiffKind = 'equal' | 'added' | 'removed';
interface DiffLine {
  kind: DiffKind;
  text: string;
}

function computeDiff(before: string, after: string): DiffLine[] {
  const a = before.split('\n');
  const b = after.split('\n');

  // Build LCS table using flat array for safe indexing
  const m = a.length;
  const n = b.length;
  const dp: number[] = new Array((m + 1) * (n + 1)).fill(0);
  const at = (i: number, j: number) => dp[i * (n + 1) + j] ?? 0;
  const set = (i: number, j: number, v: number) => { dp[i * (n + 1) + j] = v; };

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      set(i, j, a[i - 1] === b[j - 1] ? at(i - 1, j - 1) + 1 : Math.max(at(i - 1, j), at(i, j - 1)));
    }
  }

  // Backtrack
  const result: DiffLine[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    const ai = a[i - 1] ?? '';
    const bj = b[j - 1] ?? '';
    if (i > 0 && j > 0 && ai === bj) {
      result.push({ kind: 'equal', text: ai });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || at(i, j - 1) >= at(i - 1, j))) {
      result.push({ kind: 'added', text: bj });
      j--;
    } else {
      result.push({ kind: 'removed', text: ai });
      i--;
    }
  }

  return result.reverse();
}

// ── Diff line rendering ───────────────────────────────────────────────────

const BG: Record<DiffKind, string> = {
  equal: 'transparent',
  added: 'rgba(34, 197, 94, 0.12)',
  removed: 'rgba(239, 68, 68, 0.12)',
};

const DiffLineRow: React.FC<{ line: DiffLine }> = ({ line }) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      px: 1,
      py: 0.15,
      bgcolor: BG[line.kind],
      fontFamily: 'monospace',
      fontSize: '0.78rem',
      lineHeight: 1.6,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    }}
  >
    <Box sx={{ width: 14, flexShrink: 0, color: line.kind === 'added' ? 'success.main' : line.kind === 'removed' ? 'error.main' : 'transparent', display: 'flex', alignItems: 'flex-start', pt: 0.1 }}>
      {line.kind === 'added' && <AddIcon sx={{ fontSize: 12 }} />}
      {line.kind === 'removed' && <RemoveIcon sx={{ fontSize: 12 }} />}
    </Box>
    <Box sx={{ flex: 1, color: line.kind === 'equal' ? 'text.secondary' : 'text.primary' }}>
      {line.text || ' '}
    </Box>
  </Box>
);

// ── Main component ────────────────────────────────────────────────────────

interface BriefDiffDialogProps {
  open: boolean;
  onClose: () => void;
  /** The brief version before the edit */
  before: ProjectBrief;
  /** The brief version after the edit */
  after: ProjectBrief;
  agents?: Agent[];
}

export const BriefDiffDialog: React.FC<BriefDiffDialogProps> = ({
  open,
  onClose,
  before,
  after,
  agents = [],
}) => {
  const diff = useMemo(() => computeDiff(before.content, after.content), [before.content, after.content]);

  const addedCount = diff.filter((l) => l.kind === 'added').length;
  const removedCount = diff.filter((l) => l.kind === 'removed').length;

  const editorLabel = after.agent_type
    ? getAgentPersona(after.agent_type, agents).name
    : after.source === 'user_clarification'
      ? 'You'
      : 'Unknown';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="h6" component="span">
            Brief changes
          </Typography>
          <Chip label={`v${before.version} → v${after.version}`} size="small" variant="outlined" />
          <Chip
            label={`by ${editorLabel}`}
            size="small"
            variant="outlined"
            color="primary"
          />
          <Box sx={{ flex: 1 }} />
          <Chip label={`+${addedCount}`} size="small" sx={{ bgcolor: 'rgba(34,197,94,0.15)', color: 'success.main' }} />
          <Chip label={`-${removedCount}`} size="small" sx={{ bgcolor: 'rgba(239,68,68,0.12)', color: 'error.main' }} />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            mx: 2,
            mb: 2,
            overflow: 'hidden',
            maxHeight: 480,
            overflowY: 'auto',
          }}
        >
          {diff.map((line, idx) => (
            <DiffLineRow key={idx} line={line} />
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} size="small">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BriefDiffDialog;
