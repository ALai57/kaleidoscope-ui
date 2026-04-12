import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { NavBar } from '../../components/layout/NavBar';
import { ScoreDefinitionForm } from '../../components/projects/ScoreDefinitionForm';
import { useAuth } from '../../auth/useAuth';
import {
  getScoreDefinitions,
  createScoreDefinition,
  updateScoreDefinition,
  deleteScoreDefinition,
} from '../../api/scoreDefinitions';
import type { ScoreDefinition, ScorerType } from '../../types/project';

const SCORER_TYPE_LABELS: Record<ScorerType, string> = {
  general: 'General',
  pm: 'Product Manager',
  engineering_lead: 'Engineering Lead',
};

interface DeleteDialogProps {
  definition: ScoreDefinition;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ definition, onClose, onConfirm, isDeleting }) => (
  <Dialog open onClose={onClose}>
    <DialogTitle>Delete "{definition.name}"?</DialogTitle>
    <DialogContent>
      <Typography>
        This will permanently delete the score definition and all historical scoring runs that
        used it. This cannot be undone.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} disabled={isDeleting}>Cancel</Button>
      <Button
        color="error"
        variant="contained"
        onClick={onConfirm}
        disabled={isDeleting}
        startIcon={isDeleting ? <CircularProgress size={16} /> : undefined}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

const ScoreDefinitionsPage: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const queryClient = useQueryClient();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ScoreDefinition | null>(null);
  const [deleting, setDeleting] = useState<ScoreDefinition | null>(null);

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const { data: definitions = [], isLoading } = useQuery({
    queryKey: ['score-definitions'],
    queryFn: () => getScoreDefinitions(token),
  });

  const createMutation = useMutation({
    mutationFn: (body: Parameters<typeof createScoreDefinition>[0]) =>
      createScoreDefinition(body, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['score-definitions'] });
      setFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof updateScoreDefinition>[1] }) =>
      updateScoreDefinition(id, body, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['score-definitions'] });
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteScoreDefinition(id, token),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['score-definitions'] });
      setDeleting(null);
    },
  });

  const handleFormSubmit = (data: {
    name: string;
    description: string;
    scorer_type: ScorerType;
    dimensions: { name: string; criteria: string }[];
  }) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, body: data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Score Definitions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Define how projects are evaluated. Defaults are seeded automatically.
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => { setEditing(null); setFormOpen(true); }}
          >
            New Definition
          </Button>
        </Box>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!isLoading && definitions.length === 0 && (
          <Alert severity="info">
            No score definitions yet. Create one or wait for the system to seed the defaults.
          </Alert>
        )}

        <Stack spacing={2}>
          {definitions.map((def) => (
            <Paper key={def.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {def.name}
                    </Typography>
                    <Chip
                      label={SCORER_TYPE_LABELS[def.scorer_type] ?? def.scorer_type}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                    {def.is_default && (
                      <Chip label="Default" size="small" color="secondary" variant="outlined" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {def.description}
                  </Typography>

                  {def.dimensions && def.dimensions.length > 0 && (
                    <>
                      <Divider sx={{ my: 1 }} />
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {def.dimensions.map((dim) => (
                          <Tooltip key={dim.id} title={dim.criteria}>
                            <Chip label={dim.name} size="small" variant="outlined" />
                          </Tooltip>
                        ))}
                      </Stack>
                    </>
                  )}
                </Box>

                <Stack direction="row" spacing={0.5} sx={{ ml: 2, flexShrink: 0 }}>
                  <IconButton
                    size="small"
                    onClick={() => { setEditing(def); setFormOpen(true); }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  {def.is_default ? (
                    <Tooltip title="Default definitions cannot be deleted">
                      <span>
                        <IconButton size="small" disabled>
                          <LockIcon fontSize="small" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  ) : (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setDeleting(def)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Create / Edit form */}
      {formOpen && (
        <ScoreDefinitionForm
          open={formOpen}
          initial={editing}
          onClose={() => { setFormOpen(false); setEditing(null); }}
          onSubmit={handleFormSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}

      {/* Delete confirmation */}
      {deleting && (
        <DeleteDialog
          definition={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={() => deleteMutation.mutate(deleting.id)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </Box>
  );
};

export default ScoreDefinitionsPage;
