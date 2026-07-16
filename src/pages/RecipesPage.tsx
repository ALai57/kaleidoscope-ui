import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button as PButton, Chip as PChip, TextInput as PInput } from '../components/prism';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { RenameRecipeUrlDialog } from '../components/recipes/RenameRecipeUrlDialog';
import { DeleteRecipeDialog } from '../components/recipes/DeleteRecipeDialog';
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
import type { Recipe, RecipeLabel } from '../types/recipe';

// ── Manage-labels dialog ─────────────────────────────────────────────────────
const ManageLabelsDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  token?: string | undefined;
}> = ({ open, onClose, token }) => {
  const queryClient = useQueryClient();
  const [newGroup, setNewGroup] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newLabelGroup, setNewLabelGroup] = useState<string>('');

  const { data: labels = [] } = useQuery({
    queryKey: ['recipe-labels'],
    queryFn: () => getLabels(token),
  });
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
          <PButton onClick={() => addGroup.mutate()} disabled={!newGroup.trim()}>
            Add
          </PButton>
        </Stack>
        <Stack spacing={0.5} sx={{ mb: 2 }}>
          {groups.map((g) => (
            <Stack
              key={g.id}
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{g.name}</Typography>
              <IconButton
                size="small"
                aria-label={`delete group ${g.name}`}
                onClick={() => removeGroup.mutate(g.id)}
              >
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
            slotProps={{ select: { native: true } }}
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
          <PButton onClick={() => addLabel.mutate()} disabled={!newLabel.trim()}>
            Add
          </PButton>
        </Stack>
        <Stack spacing={0.5}>
          {labels.map((l: RecipeLabel) => (
            <Stack
              key={l.id}
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography>{qualifiedLabelName(l)}</Typography>
              <IconButton
                size="small"
                aria-label={`delete label ${l.name}`}
                onClick={() => removeLabel.mutate(l.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <PButton onClick={onClose}>Done</PButton>
      </DialogActions>
    </Dialog>
  );
};

// Page root: reads the app theme's tokens (mode-reactive surface/text), so the
// Recipes page follows the active preset + light/dark selector like the rest of
// the public garden. (It was previously pinned to Prism dark via
// PrismThemeProvider; that wrapper was removed so the page obeys the selector.)
const PrismPageRoot = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  background: theme.tokens.color.surface.base,
  color: theme.tokens.color.text.primary,
}));

// ── List page ────────────────────────────────────────────────────────────────
const RecipesPage: React.FC = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ingredient, setIngredient] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [labelId, setLabelId] = useState<string>('');
  const [manageOpen, setManageOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<Recipe | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Recipe | null>(null);

  const invalidateRecipes = (): void =>
    void queryClient.invalidateQueries({ queryKey: ['recipes'] });

  const debouncedSetIngredient = useDebouncedCallback((v: string) => setIngredient(v), 300);

  const filters = {
    ...(ingredient ? { ingredient } : {}),
    ...(labelId ? { labelId } : {}),
  };

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ['recipes', filters],
    queryFn: () => getRecipes(filters, token),
  });
  const { data: labels = [] } = useQuery({
    queryKey: ['recipe-labels'],
    queryFn: () => getLabels(token),
  });

  return (
    <PrismPageRoot>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <Typography variant="h3">Recipes</Typography>
          {isAuthenticated && (
            <div style={{ display: 'flex', gap: 10 }}>
              <PButton variant="ghost" onClick={() => setManageOpen(true)}>
                Manage labels
              </PButton>
              {/* Prism `Button` (MUI styled + custom shouldForwardProp) does not
                    honor emotion's `as`, so keep New recipe a real router <Link>
                    (role="link") wrapping the styled button for the Prism look. */}
              <RouterLink to="/recipes/new" style={{ textDecoration: 'none' }}>
                <PButton>New recipe</PButton>
              </RouterLink>
            </div>
          )}
        </div>

        <div style={{ marginBottom: 16, maxWidth: 320 }}>
          <PInput
            aria-label="Search ingredient"
            placeholder="Search ingredient"
            value={ingredientInput}
            onChange={(e) => {
              setIngredientInput(e.target.value);
              debouncedSetIngredient(e.target.value);
            }}
          />
        </div>

        {labels.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {labels.map((l) => (
              <PChip
                key={l.id}
                pressed={labelId === l.id}
                onClick={() => setLabelId(labelId === l.id ? '' : l.id)}
              >
                {qualifiedLabelName(l)}
              </PChip>
            ))}
          </div>
        )}

        {isLoading && <LoadingScreen />}
        {!isLoading && recipes.length === 0 && (
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            No recipes yet.
          </Typography>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(288px, 1fr))',
            gap: 16,
          }}
        >
          {recipes.map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              canManage={isAuthenticated}
              onOpen={() => navigate(`/recipes/${r.recipe_url}`)}
              onRename={() => setRenameTarget(r)}
              onDelete={() => setDeleteTarget(r)}
            />
          ))}
        </div>
      </div>

      <ManageLabelsDialog open={manageOpen} onClose={() => setManageOpen(false)} token={token} />
      <RenameRecipeUrlDialog
        recipe={renameTarget}
        open={renameTarget !== null}
        onClose={() => setRenameTarget(null)}
        onRenamed={(slug) => {
          setRenameTarget(null);
          invalidateRecipes();
          navigate(`/recipes/${slug}`);
        }}
        token={token}
      />
      <DeleteRecipeDialog
        recipe={deleteTarget}
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onDeleted={() => {
          setDeleteTarget(null);
          invalidateRecipes();
        }}
        token={token}
      />
    </PrismPageRoot>
  );
};

export default RecipesPage;
