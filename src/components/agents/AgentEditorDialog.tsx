import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { Agent, UpdateAgentBody } from '../../types/agent';

const COLOR_PRESETS = [
  '#0891b2', // teal  — Coach
  '#7c3aed', // purple — Product Manager
  '#0369a1', // blue  — Engineering Lead
  '#059669', // green
  '#dc2626', // red
  '#d97706', // amber
  '#9333ea', // violet
  '#db2777', // pink
  '#0ea5e9', // sky
  '#6b7280', // grey
];

interface AgentEditorDialogProps {
  open: boolean;
  agent: Agent | null;
  onClose: () => void;
  onSave: (id: string, body: UpdateAgentBody) => Promise<void>;
  saving: boolean;
}

const AgentEditorDialog: React.FC<AgentEditorDialogProps> = ({
  open,
  agent,
  onClose,
  onSave,
  saving,
}) => {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [color, setColor] = useState(COLOR_PRESETS[0]!);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (agent) {
      setName(agent.name ?? '');
      setShortName(agent.short_name ?? '');
      setAvatar(agent.avatar ?? '');
      setColor(agent.color ?? COLOR_PRESETS[0]!);
      setSystemPrompt(agent.system_prompt ?? '');
      setError(null);
    }
  }, [agent]);

  const handleSave = async () => {
    if (!agent) return;
    if (!name.trim()) { setError('Name is required.'); return; }
    if (!avatar.trim()) { setError('Avatar emoji is required.'); return; }
    setError(null);
    try {
      await onSave(agent.id, {
        name: name.trim(),
        short_name: shortName.trim() || name.trim(),
        avatar: avatar.trim(),
        color,
        system_prompt: systemPrompt,
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save agent.');
    }
  };

  if (!agent) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Live avatar preview */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              flexShrink: 0,
            }}
          >
            {avatar || '?'}
          </Box>
          Edit {agent.name}
        </Box>
      </DialogTitle>

      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Avatar + color row */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2.5, alignItems: 'flex-start' }}>
          <TextField
            label="Avatar emoji"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            size="small"
            sx={{ width: 120 }}
            inputProps={{ maxLength: 4 }}
            disabled={!!saving}
          />

          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>
              Color
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
              {COLOR_PRESETS.map((c) => (
                <Tooltip key={c} title={c}>
                  <Box
                    onClick={() => setColor(c)}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: c,
                      cursor: 'pointer',
                      outline: color === c ? `3px solid ${c}` : '2px solid transparent',
                      outlineOffset: '2px',
                      transition: 'outline-color 0.1s',
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Name fields */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
            disabled={!!saving}
          />
          <TextField
            label="Short name"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            size="small"
            sx={{ width: 140, flexShrink: 0 }}
            disabled={!!saving}
            placeholder={name?.split(' ')[0] ?? ''}
          />
        </Box>

        {/* System prompt */}
        <TextField
          label="System prompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          fullWidth
          multiline
          rows={8}
          size="small"
          disabled={!!saving}
          placeholder="Describe this agent's persona, expertise, and how it should approach tasks…"
          helperText="Sent verbatim as the agent's system prompt before each step."
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={!!saving}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => void handleSave()}
          disabled={!!saving || !name?.trim() || !avatar?.trim()}
          startIcon={saving ? <CircularProgress size={14} color="inherit" /> : undefined}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentEditorDialog;
