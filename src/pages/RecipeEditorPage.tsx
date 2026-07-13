import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { RecipeSections } from '../components/recipes/RecipeSections';
import {
  RecipeSectionsEditor,
  emptyEditSection,
  toEditSection,
  toSection,
  type EditSection,
} from '../components/recipes/RecipeSectionsEditor';
import { LabelPicker } from '../components/recipes/LabelPicker';
import { RecipeSourceChooser } from '../components/recipes/RecipeSourceChooser';
import { useAuth } from '../auth/useAuth';
import {
  getRecipe,
  createRecipe,
  updateRecipe,
  getLabels,
  createLabel,
  addRecipeAudience,
} from '../api/recipes';
import { getGroups } from '../api/groups';
import type { RecipeContent, AcquiredDraft } from '../types/recipe';

interface FormState {
  title: string;
  servings: string;
  prep: string;
  cook: string;
  sourceUrl: string;
  sections: EditSection[];
  labelIds: string[];
  publicVisibility: boolean;
}

const EMPTY_FORM: FormState = {
  title: '',
  servings: '',
  prep: '',
  cook: '',
  sourceUrl: '',
  sections: [emptyEditSection()],
  labelIds: [],
  publicVisibility: false,
};

function sectionsForEdit(content: RecipeContent): EditSection[] {
  // `content` can come from an external scrape whose `sections` is missing.
  const sections = content.sections ?? [];
  return sections.length ? sections.map(toEditSection) : [emptyEditSection()];
}

function toContent(form: FormState): RecipeContent {
  const num = (s: string): number | null => (s.trim() === '' ? null : Number(s));
  return {
    title: form.title,
    sections: form.sections.map(toSection),
    servings: form.servings.trim() === '' ? null : form.servings,
    prep_time_minutes: num(form.prep),
    cook_time_minutes: num(form.cook),
  };
}

const RecipeEditorPage: React.FC = () => {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token, userProfile, isAuthenticated, login } = useAuth();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [original, setOriginal] = useState<RecipeContent | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  const { data: labels = [] } = useQuery({
    queryKey: ['recipe-labels'],
    queryFn: () => getLabels(token),
  });
  const { data: groups = [] } = useQuery({ queryKey: ['groups'], queryFn: () => getGroups(token) });

  const { data: existing, isLoading } = useQuery({
    queryKey: ['recipe', slug],
    queryFn: () => getRecipe(slug as string, token),
    enabled: isEdit,
  });

  // Sync fetched recipe into editable form state when it (re)loads. Adjusting
  // state during render rather than in an effect avoids a cascading re-render.
  // Seed with `undefined` (not `existing`) so a synchronous cache hit — e.g.
  // navigating from the recipe view page, which shares the ['recipe', slug]
  // query key — still triggers the initial sync on first render.
  const [syncedExisting, setSyncedExisting] = useState<typeof existing>(undefined);
  if (existing && existing !== syncedExisting) {
    setSyncedExisting(existing);
    const c = existing.content;
    setForm({
      title: c.title,
      servings: c.servings ?? '',
      prep: c.prep_time_minutes != null ? String(c.prep_time_minutes) : '',
      cook: c.cook_time_minutes != null ? String(c.cook_time_minutes) : '',
      sourceUrl: existing.source_url ?? '',
      sections: sectionsForEdit(c),
      labelIds: (existing.labels ?? []).map((l) => l.id),
      publicVisibility: existing.public_visibility,
    });
    setOriginal(existing.original_content ?? null);
  }

  const applyDraft = ({ draft, sourceUrl }: AcquiredDraft): void => {
    // Drafts can arrive without a `sections` array; restore the RecipeContent
    // invariant at the boundary so downstream readers (`original`) stay safe.
    const r: RecipeContent = { ...draft.recipe, sections: draft.recipe.sections ?? [] };
    setForm((f) => ({
      ...f,
      title: r.title,
      servings: r.servings ?? '',
      prep: r.prep_time_minutes != null ? String(r.prep_time_minutes) : '',
      cook: r.cook_time_minutes != null ? String(r.cook_time_minutes) : '',
      sourceUrl: sourceUrl ?? '',
      sections: sectionsForEdit(r),
    }));
    setOriginal(r);
    setWarnings(draft.warnings);
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const content = toContent(form);
      if (isEdit) {
        return updateRecipe(
          slug as string,
          {
            content,
            source_url: form.sourceUrl || null,
            label_ids: form.labelIds,
            public_visibility: form.publicVisibility,
          },
          token
        );
      }
      return createRecipe(
        {
          content,
          ...(original ? { original_content: original } : {}),
          source_url: form.sourceUrl || null,
          label_ids: form.labelIds,
          public_visibility: form.publicVisibility,
        },
        token
      );
    },
    onSuccess: (saved) => {
      void queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigate(`/recipes/${saved.recipe_url}`);
    },
  });

  const shareMutation = useMutation({
    mutationFn: (groupId: string) => addRecipeAudience(existing?.id as string, groupId, token),
  });

  const setField = (patch: Partial<FormState>): void => setForm((f) => ({ ...f, ...patch }));

  if (isEdit && isLoading) return <LoadingScreen />;

  return (
    <>
      <NavBar user={userProfile ?? undefined} isAuthenticated={isAuthenticated} login={login} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          {isEdit ? 'Edit recipe' : 'New recipe'}
        </Typography>

        {!isEdit && <RecipeSourceChooser onDraft={applyDraft} />}
        {warnings.map((w, i) => (
          <Alert key={i} severity="warning" sx={{ mb: 1 }}>
            {w}
          </Alert>
        ))}

        <Stack spacing={2}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setField({ title: e.target.value })}
            fullWidth
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Servings"
              value={form.servings}
              onChange={(e) => setField({ servings: e.target.value })}
            />
            <TextField
              label="Prep (min)"
              type="number"
              value={form.prep}
              onChange={(e) => setField({ prep: e.target.value })}
            />
            <TextField
              label="Cook (min)"
              type="number"
              value={form.cook}
              onChange={(e) => setField({ cook: e.target.value })}
            />
          </Stack>
          <TextField
            label="Source URL"
            value={form.sourceUrl}
            onChange={(e) => setField({ sourceUrl: e.target.value })}
            fullWidth
          />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Ingredients &amp; steps
            </Typography>
            <RecipeSectionsEditor
              sections={form.sections}
              onChange={(sections) => setField({ sections })}
            />
          </Box>

          <LabelPicker
            labels={labels}
            value={form.labelIds}
            onChange={(ids) => setField({ labelIds: ids })}
            onCreateLabel={(name) => createLabel(name, null, token)}
          />

          {original && (
            <Box>
              <Button size="small" onClick={() => setShowOriginal((s) => !s)}>
                {showOriginal ? 'Hide original' : 'View original (as scraped)'}
              </Button>
              <Collapse in={showOriginal}>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {original.title}
                  </Typography>
                  <RecipeSections content={original} />
                </Box>
              </Collapse>
            </Box>
          )}

          <Divider />
          <FormControlLabel
            control={
              <Switch
                checked={form.publicVisibility}
                onChange={(e) => setField({ publicVisibility: e.target.checked })}
              />
            }
            label="Publicly visible"
          />

          {isEdit && existing && groups.length > 0 && (
            <Box>
              <Typography variant="subtitle2">Share with a group</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {groups.map((g) => (
                  <Chip
                    key={g.group_id}
                    label={g.display_name}
                    onClick={() => shareMutation.mutate(g.group_id)}
                  />
                ))}
              </Stack>
            </Box>
          )}

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={() => saveMutation.mutate()}
              disabled={!form.title.trim() || saveMutation.isPending}
            >
              {saveMutation.isPending ? 'Saving…' : 'Save'}
            </Button>
            <Button onClick={() => navigate('/recipes')}>Cancel</Button>
          </Stack>
          {saveMutation.isError && <Alert severity="error">Could not save the recipe.</Alert>}
        </Stack>
      </Container>
    </>
  );
};

export default RecipeEditorPage;
