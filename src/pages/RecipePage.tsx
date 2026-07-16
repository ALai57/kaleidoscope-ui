import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { RecipeSections } from '../components/recipes/RecipeSections';
import { ImportLineageStrip } from '../components/recipes/lineage/ImportLineageStrip';
import { CookTimeline } from '../components/recipes/timeline';
import { useAuth } from '../auth/useAuth';
import { isSiteAdmin } from '../auth/authHelpers';
import { getRecipe, qualifiedLabelName } from '../api/recipes';

function metaLine(recipe: {
  content: {
    servings?: string | null;
    prep_time_minutes?: number | null;
    cook_time_minutes?: number | null;
  };
}): string {
  const { servings, prep_time_minutes, cook_time_minutes } = recipe.content;
  return [
    servings ? `Serves ${servings}` : null,
    prep_time_minutes ? `Prep ${prep_time_minutes} min` : null,
    cook_time_minutes ? `Cook ${cook_time_minutes} min` : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

const RecipePage: React.FC = () => {
  const { slug = '' } = useParams();
  const { token, userProfile, isAuthenticated } = useAuth();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', slug],
    queryFn: () => getRecipe(slug, token),
  });

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {isLoading && <LoadingScreen />}
        {!isLoading && !recipe && <Typography>Recipe not found.</Typography>}
        {recipe && (
          <>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h3" gutterBottom>
                {recipe.content.title}
              </Typography>
              {isAuthenticated && (
                <Button
                  component={RouterLink}
                  to={`/recipes/${recipe.recipe_url}/edit`}
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Edit
                </Button>
              )}
            </Stack>

            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.secondary',
              }}
            >
              {metaLine(recipe)}
            </Typography>
            {recipe.source_url && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                Source:{' '}
                <Link href={recipe.source_url} target="_blank" rel="noopener noreferrer">
                  {recipe.source_url}
                </Link>
              </Typography>
            )}

            {recipe.labels && recipe.labels.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ my: 2, flexWrap: 'wrap' }}>
                {recipe.labels.map((l) => (
                  <Chip key={l.id} label={qualifiedLabelName(l)} size="small" />
                ))}
              </Stack>
            )}

            {isSiteAdmin(userProfile) && recipe.scrape_processing_run_id && (
              <ImportLineageStrip slug={slug} token={token} />
            )}

            <RecipeSections content={recipe.content} />

            {recipe.timeline && (
              <CookTimeline timeline={recipe.timeline} sections={recipe.content.sections} />
            )}
            {!recipe.timeline && isAuthenticated && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mt: 4,
                }}
              >
                Save this recipe to generate a cook timeline.
              </Typography>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default RecipePage;
