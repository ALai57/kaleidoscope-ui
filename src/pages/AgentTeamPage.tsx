import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavBar } from '../components/layout/NavBar';
import AgentCard from '../components/agents/AgentCard';
import AgentEditorDialog from '../components/agents/AgentEditorDialog';
import { useAuth } from '../auth/useAuth';
import { getAgents, createAgent, updateAgent } from '../api/agents';
import type { Agent, CreateAgentBody, UpdateAgentBody } from '../types/agent';

const DEFAULT_COLORS = ['#0891b2', '#7c3aed', '#0369a1', '#059669', '#d97706', '#9333ea'];

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
  const [color] = useState(DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)]!);

  const reset = () => {
    setAgentType(''); setName(''); setShortName(''); setAvatar(''); setSystemPrompt('');
  };

  const handleClose = () => { reset(); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>New Agent</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 1.5, mt: 1, mb: 2 }}>
          <TextField
            label="Avatar emoji"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            size="small"
            sx={{ width: 120 }}
            inputProps={{ maxLength: 4 }}
            disabled={!!submitting}
          />
          <TextField
            label="Identifier (agent_type)"
            value={agentType}
            onChange={(e) => setAgentType(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
            size="small"
            fullWidth
            placeholder="e.g. security_lead"
            helperText="Lowercase, underscores only"
            disabled={!!submitting}
          />
        </Box>
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
  const navigate = useNavigate();
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ maxWidth: 900, mx: 'auto', px: 3, pt: 3, pb: 8 }}>
        {/* Breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3 }}>
          <Button
            size="small"
            startIcon={<ArrowBackIcon sx={{ fontSize: '1rem !important' }} />}
            onClick={() => navigate('/projects')}
            sx={{ color: 'text.secondary', fontWeight: 400, px: 0.5, minWidth: 0 }}
          >
            Projects
          </Button>
          <Typography variant="body2" color="text.disabled">/</Typography>
          <Typography variant="body2" color="text.secondary">Agent Team</Typography>
        </Box>

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Agent Team
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Define the agents that evaluate and advise on your projects. Each agent has its
              own persona and system prompt.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewDialogOpen(true)}
            disableElevation
            sx={{ flexShrink: 0 }}
          >
            New agent
          </Button>
        </Box>

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
            <Typography variant="overline" color="text.disabled" sx={{ letterSpacing: 1.2, display: 'block', mb: 1.5 }}>
              Built-in agents
            </Typography>
            <Grid container spacing={2}>
              {defaultAgents.map((agent) => (
                <Grid key={agent.id} item xs={12} sm={6} md={4}>
                  <AgentCard agent={agent} onEdit={setEditingAgent} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Custom agents */}
        {!isLoading && customAgents.length > 0 && (
          <Box>
            <Typography variant="overline" color="text.disabled" sx={{ letterSpacing: 1.2, display: 'block', mb: 1.5 }}>
              Custom agents
            </Typography>
            <Grid container spacing={2}>
              {customAgents.map((agent) => (
                <Grid key={agent.id} item xs={12} sm={6} md={4}>
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
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
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
    </Box>
  );
};

export default AgentTeamPage;
