import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface RoundActionBarProps {
  /** True while a round is currently in progress — disables all actions */
  roundInProgress: boolean;
  /** True while the advance mutation is pending */
  advancing: boolean;
  /** True while the force-proceed mutation is pending */
  proceeding: boolean;
  /** True while the respond mutation is pending */
  responding: boolean;
  /** Called to trigger another refinement round */
  onAdvance: () => void;
  /** Called with user-provided context text; resolves when submitted */
  onAddContext: (text: string) => void;
  /** Called to skip to task generation */
  onForceProceed: () => void;
  /** True when there is no awaiting-input step to respond to */
  noRespondTarget?: boolean;
}

export const RoundActionBar: React.FC<RoundActionBarProps> = ({
  roundInProgress,
  advancing,
  proceeding,
  responding,
  onAdvance,
  onAddContext,
  onForceProceed,
  noRespondTarget = false,
}) => {
  const [contextOpen, setContextOpen] = useState(false);
  const [contextText, setContextText] = useState('');

  const busy = roundInProgress || advancing || proceeding || responding;

  const handleSubmitContext = () => {
    if (!contextText.trim()) return;
    onAddContext(contextText.trim());
    setContextText('');
    setContextOpen(false);
  };

  return (
    <Box
      sx={{
        mt: 1,
        pt: 1,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        {/* Keep strengthening */}
        <Tooltip title="Run another refinement round">
          <span>
            <Button
              size="small"
              variant="outlined"
              startIcon={advancing ? <CircularProgress size={13} /> : <AutorenewIcon />}
              onClick={onAdvance}
              disabled={busy}
            >
              Keep strengthening
            </Button>
          </span>
        </Tooltip>

        {/* Add context */}
        {!noRespondTarget && (
          <Tooltip title="Add context or clarification for the next round">
            <span>
              <Button
                size="small"
                variant="outlined"
                startIcon={<EditNoteIcon />}
                onClick={() => setContextOpen((prev) => !prev)}
                disabled={busy}
                color={contextOpen ? 'primary' : 'inherit'}
              >
                Add context
              </Button>
            </span>
          </Tooltip>
        )}

        {/* I'm satisfied */}
        <Tooltip title="Skip refinement and generate tasks now">
          <span>
            <Button
              size="small"
              variant="contained"
              color="success"
              startIcon={proceeding ? <CircularProgress size={13} color="inherit" /> : <CheckCircleOutlineIcon />}
              onClick={onForceProceed}
              disabled={busy}
            >
              Generate tasks
            </Button>
          </span>
        </Tooltip>

        {roundInProgress && (
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Wait for the round to finish to take action
          </Typography>
        )}
      </Box>

      {/* Context input (collapsed by default) */}
      <Collapse in={contextOpen}>
        <Box sx={{ mt: 1.25 }}>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>
            Add context or clarification — this will be fed into the next refinement round.
          </Typography>
          <TextField
            multiline
            minRows={3}
            fullWidth
            size="small"
            placeholder="E.g. The target audience is enterprise SaaS teams, not individual consumers…"
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            disabled={responding}
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button
              size="small"
              variant="contained"
              onClick={handleSubmitContext}
              disabled={responding || !contextText.trim()}
              startIcon={responding ? <CircularProgress size={13} color="inherit" /> : undefined}
            >
              Submit
            </Button>
            <Button
              size="small"
              variant="text"
              color="inherit"
              onClick={() => { setContextOpen(false); setContextText(''); }}
              disabled={responding}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default RoundActionBar;
