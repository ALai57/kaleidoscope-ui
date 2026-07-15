import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { AdminLayout } from '../components/layout/AdminLayout';
import AgentCard from '../components/agents/AgentCard';
import AgentEditorDialog from '../components/agents/AgentEditorDialog';
import { useAuth } from '../auth/useAuth';
import { getAgents, createAgent, updateAgent } from '../api/agents';
import type { Agent, CreateAgentBody, UpdateAgentBody } from '../types/agent';
import { CATEGORICAL_PALETTE } from '../theme/tokens';

const DEFAULT_COLORS = CATEGORICAL_PALETTE;

const AVATAR_EMOJIS = [
  '🐬', '🦊', '🦉', '🦁', '🐯', '🦅', '🦈', '🐺',
  '🐻', '🦋', '🐙', '🦜', '🐸', '🐝', '🦊', '🐲',
  '🧠', '💡', '🎯', '🔮', '🛡️', '🚀', '🔬', '🎓',
  '🏆', '⭐', '💎', '🌟', '⚡', '🌱', '🔑', '🧩',
  '🤖', '👾', '🧑‍💼', '👩‍💼', '🧑‍💻', '👩‍💻', '🧑‍🔬', '🧑‍🎨',
];

// ── New agent dialog ───────────────────────────────────────────────────────

interface NewAgentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (body: CreateAgentBody) => void;
  submitting: boolean;
}

const NewAgentDialog: React.FC<NewAgentDialogProps> = ({ open, onClose, onSubmit, submitting }) => {
  const [agentType, setAgentType] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [color] = useState(
    () => DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)]!
  );

  const reset = () => {
    setAgentType(''); setName(''); setShortName(''); setAvatar(''); setSystemPrompt('');
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Agent</DialogTitle>
      <DialogContent dividers>
        {/* Identifier */}
        <TextField
          label="Identifier (agent_type)"
          value={agentType}
          onChange={(e) => setAgentType(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
          size="small"
          fullWidth
          placeholder="e.g. security_lead"
          helperText="Lowercase, underscores only"
          disabled={!!submitting}
          sx={{ mb: 2 }}
        />

        {/* Emoji picker */}
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: 'block',
            mb: 0.75
          }}>
          Avatar
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: 0.5,
            mb: 2.5,
            p: 1,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1.5,
            bgcolor: 'grey.50',
          }}
        >
          {AVATAR_EMOJIS.map((emoji, i) => {
            const isSelected = avatar === emoji;
            return (
              <Tooltip key={`${emoji}-${i}`} title={emoji} placement="top">
                <Box
                  onClick={() => !submitting && setAvatar(emoji)}
                  sx={{
                    width: '100%',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.35rem',
                    lineHeight: 1,
                    borderRadius: 1,
                    cursor: submitting ? 'default' : 'pointer',
                    bgcolor: isSelected ? `${color}22` : 'transparent',
                    outline: isSelected ? `2px solid ${color}` : '2px solid transparent',
                    transition: 'background-color 0.1s, outline-color 0.1s',
                    '&:hover': submitting ? {} : { bgcolor: 'action.hover' },
                  }}
                >
                  {emoji}
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        {/* Name fields */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
            disabled={!!submitting}
          />
          <TextField
            label="Short name"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            size="small"
            sx={{ width: 140, flexShrink: 0 }}
            placeholder={name?.split(' ')[0] ?? ''}
            disabled={!!submitting}
          />
        </Box>
        <TextField
          label="System prompt"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          fullWidth
          multiline
          rows={6}
          size="small"
          disabled={!!submitting}
          placeholder="Describe this agent's persona and expertise…"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={!!submitting}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!!submitting || !agentType.trim() || !name.trim() || !avatar.trim()}
          onClick={() => {
            onSubmit({
              agent_type: agentType.trim(),
              name: name.trim(),
              short_name: shortName.trim() || (name.split(' ')[0] ?? name.trim()),
              avatar: avatar.trim(),
              color,
              system_prompt: systemPrompt,
            });
          }}
          startIcon={submitting ? <CircularProgress size={14} color="inherit" /> : undefined}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────

const AgentTeamPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login } = useAuth();
  const queryClient = useQueryClient();

  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [newDialogOpen, setNewDialogOpen] = useState(false);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: agents = [], isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: () => getAgents(token),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateAgentBody }) =>
      updateAgent(id, body, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (body: CreateAgentBody) => createAgent(body, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['agents'] });
      setNewDialogOpen(false);
    },
  });

  const defaultAgents = agents.filter((a) => a.is_default);
  const customAgents = agents.filter((a) => !a.is_default);

  const headerActions = (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={() => setNewDialogOpen(true)}
      disableElevation
      sx={{ flexShrink: 0 }}
    >
      New agent
    </Button>
  );

  return (
    <AdminLayout
      title="Agent Team"
      actions={headerActions}
      user={user}
      isAuthenticated={isAuthenticated}
      login={login}
    >
      <Box sx={{ maxWidth: 900, mx: 'auto', pb: 5 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          Define the agents that evaluate and advise on your projects. Each agent has its own
          persona and system prompt.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to load agents.
          </Alert>
        )}

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Default agents */}
        {!isLoading && defaultAgents.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="overline"
              sx={{
                color: "text.disabled",
                letterSpacing: 1.2,
                display: 'block',
                mb: 1.5
              }}>
              Built-in agents
            </Typography>
            <Grid container spacing={2}>
              {defaultAgents.map((agent) => (
                <Grid
                  key={agent.id}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4
                  }}>
                  <AgentCard agent={agent} onEdit={setEditingAgent} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Custom agents */}
        {!isLoading && customAgents.length > 0 && (
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "text.disabled",
                letterSpacing: 1.2,
                display: 'block',
                mb: 1.5
              }}>
              Custom agents
            </Typography>
            <Grid container spacing={2}>
              {customAgents.map((agent) => (
                <Grid
                  key={agent.id}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4
                  }}>
                  <AgentCard agent={agent} onEdit={setEditingAgent} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Empty state */}
        {!isLoading && agents.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              border: 2,
              borderColor: 'divider',
              borderRadius: 2,
              borderStyle: 'dashed',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 2
              }}>
              No agents yet.
            </Typography>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setNewDialogOpen(true)}>
              Create first agent
            </Button>
          </Box>
        )}
      </Box>
      {/* Edit dialog */}
      <AgentEditorDialog
        open={!!editingAgent}
        agent={editingAgent}
        onClose={() => setEditingAgent(null)}
        onSave={async (id, body) => {
          await updateMutation.mutateAsync({ id, body });
        }}
        saving={updateMutation.isPending}
      />
      {/* New agent dialog */}
      <NewAgentDialog
        open={newDialogOpen}
        onClose={() => setNewDialogOpen(false)}
        onSubmit={(body) => createMutation.mutate(body)}
        submitting={createMutation.isPending}
      />
    </AdminLayout>
  );
};

export default AgentTeamPage;
