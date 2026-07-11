import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LabelIcon from '@mui/icons-material/Label';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { useAuth } from '../auth/useAuth';
import { useDebouncedCallback } from '../hooks/useDebouncedCallback';
import {
  getRecipes,
  getLabels,
  getLabelGroups,
  createLabel,
  createLabelGroup,
  deleteLabel,
  deleteLabelGroup,
  qualifiedLabelName,
} from '../api/recipes';
import type { RecipeLabel } from '../types/recipe';

// ── Manage-labels dialog ─────────────────────────────────────────────────────
const ManageLabelsDialog: React.FC<{ open: boolean; onClose: () => void; token?: string | undefined }> = ({
  open,
  onClose,
  token,
}) => {
  const queryClient = useQueryClient();
  const [newGroup, setNewGroup] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newLabelGroup, setNewLabelGroup] = useState<string>('');

  const { data: labels = [] } = useQuery({ queryKey: ['recipe-labels'], queryFn: () => getLabels(token) });
  const { data: groups = [] } = useQuery({
    queryKey: ['recipe-label-groups'],
    queryFn: () => getLabelGroups(token),
  });

  const invalidate = (): void => {
    void queryClient.invalidateQueries({ queryKey: ['recipe-labels'] });
    void queryClient.invalidateQueries({ queryKey: ['recipe-label-groups'] });
  };

  const addGroup = useMutation({
    mutationFn: () => createLabelGroup(newGroup.trim(), token),
    onSuccess: () => {
      setNewGroup('');
      invalidate();
    },
  });
  const addLabel = useMutation({
    mutationFn: () => createLabel(newLabel.trim(), newLabelGroup || null, token),
    onSuccess: () => {
      setNewLabel('');
      invalidate();
    },
  });
  const removeLabel = useMutation({
    mutationFn: (id: string) => deleteLabel(id, token),
    onSuccess: invalidate,
  });
  const removeGroup = useMutation({
    mutationFn: (id: string) => deleteLabelGroup(id, token),
    onSuccess: invalidate,
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Manage labels</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle2">Groups</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <TextField
            size="small"
            label="New group"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
          <Button onClick={() => addGroup.mutate()} disabled={!newGroup.trim()}>
            Add
          </Button>
        </Stack>
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {groups.map((g) => (
            <Stack key={g.id} direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{g.name}</Typography>
              <IconButton size="small" aria-label={`delete group ${g.name}`} onClick={() => removeGroup.mutate(g.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>

        <Typography variant="subtitle2">Labels</Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <TextField
            size="small"
            label="New label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <TextField
            size="small"
            select
            label="Group"
            SelectProps={{ native: true }}
            value={newLabelGroup}
            onChange={(e) => setNewLabelGroup(e.target.value)}
            sx={{ minWidth: 140 }}
          >
            <option value="">(ungrouped)</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </TextField>
          <Button onClick={() => addLabel.mutate()} disabled={!newLabel.trim()}>
            Add
          </Button>
        </Stack>
        <Stack spacing={0.5}>
          {labels.map((l: RecipeLabel) => (
            <Stack key={l.id} direction="row" alignItems="center" justifyContent="space-between">
              <Typography>{qualifiedLabelName(l)}</Typography>
              <IconButton size="small" aria-label={`delete label ${l.name}`} onClick={() => removeLabel.mutate(l.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

// ── List page ────────────────────────────────────────────────────────────────
const RecipesPage: React.FC = () => {
  const { token, userProfile, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [labelId, setLabelId] = useState<string>('');
  const [manageOpen, setManageOpen] = useState(false);

  const debouncedSetIngredient = useDebouncedCallback((v: string) => setIngredient(v), 300);

  const filters = {
    ...(ingredient ? { ingredient } : {}),
    ...(labelId ? { labelId } : {}),
  };

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ['recipes', filters],
    queryFn: () => getRecipes(filters, token),
  });
  const { data: labels = [] } = useQuery({ queryKey: ['recipe-labels'], queryFn: () => getLabels(token) });

  return (
    <>
      <NavBar user={userProfile ?? undefined} isAuthenticated={isAuthenticated} login={login} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h3">Recipes</Typography>
          {isAuthenticated && (
            <Stack direction="row" spacing={1}>
              <Button startIcon={<LabelIcon />} onClick={() => setManageOpen(true)}>
                Manage labels
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                component={RouterLink}
                to="/recipes/new"
              >
                New recipe
              </Button>
            </Stack>
          )}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            label="Search ingredient"
            value={ingredientInput}
            onChange={(e) => {
              setIngredientInput(e.target.value);
              debouncedSetIngredient(e.target.value);
            }}
          />
        </Stack>
        {labels.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
            {labels.map((l) => (
              <Chip
                key={l.id}
                label={qualifiedLabelName(l)}
                color={labelId === l.id ? 'primary' : 'default'}
                onClick={() => setLabelId(labelId === l.id ? '' : l.id)}
              />
            ))}
          </Stack>
        )}

        {isLoading && <LoadingScreen />}
        {!isLoading && recipes.length === 0 && (
          <Typography color="text.secondary">No recipes yet.</Typography>
        )}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2 }}>
          {recipes.map((r) => (
            <Card key={r.id}>
              <CardActionArea onClick={() => navigate(`/recipes/${r.recipe_url}`)}>
                <CardContent>
                  <Typography variant="h6">{r.content.title}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {r.content.ingredients.slice(0, 3).join(', ')}
                  </Typography>
                  {r.labels && r.labels.length > 0 && (
                    <Stack direction="row" spacing={0.5} sx={{ mt: 1, flexWrap: 'wrap' }}>
                      {r.labels.map((l) => (
                        <Chip key={l.id} label={qualifiedLabelName(l)} size="small" />
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
      <ManageLabelsDialog open={manageOpen} onClose={() => setManageOpen(false)} token={token} />
    </>
  );
};

export default RecipesPage;
