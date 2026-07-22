import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { ImportLineageStrip } from '../components/recipes/lineage/ImportLineageStrip';
import { CookTimeline } from '../components/recipes/timeline';
import { RecipeViewToggle, type RecipeView } from '../components/recipes/RecipeViewToggle';
import { ShoppingList } from '../components/recipes/ShoppingList';
import { RawRecipe } from '../components/recipes/RawRecipe';
import { WakeLockOverlay } from '../components/recipes/WakeLockOverlay';
import { useAuth } from '../auth/useAuth';
import { isSiteAdmin } from '../auth/authHelpers';
import { getRecipe, qualifiedLabelName } from '../api/recipes';
import type { Recipe, RecipeContent } from '../types/recipe';

interface RecipeStat {
  label: string;
  value: string;
  hero?: boolean;
}

// The numbers a cook actually wants, promoted onto the header line. `total` is
// prep + cook — a figure the old grey subtitle never computed — and shows only
// when both parts are known.
function recipeStats(content: RecipeContent): RecipeStat[] {
  const { servings, prep_time_minutes: prep, cook_time_minutes: cook } = content;
  const stats: RecipeStat[] = [];
  if (servings) stats.push({ label: 'serves', value: servings });
  if (prep) stats.push({ label: 'prep', value: `${prep}m` });
  if (cook) stats.push({ label: 'cook', value: `${cook}m` });
  if (prep && cook) stats.push({ label: 'total', value: `${prep + cook}m`, hero: true });
  return stats;
}

// Bare host for the source link's caption ("veganhuggs.com"), never the raw
// slug. Falls back to the whole string if the URL won't parse.
function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// Secondary metadata — source provenance, category labels, and the author's
// Edit action — collapsed behind one overflow (⋯) menu so the header stays a
// single line. Renders nothing when there is nothing to show.
const RecipeOverflowMenu: React.FC<{ recipe: Recipe; canEdit: boolean }> = ({
  recipe,
  canEdit,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);

  const labels = recipe.labels ?? [];
  const source = recipe.source_url;
  if (!canEdit && !source && labels.length === 0) return null;

  return (
    <>
      <IconButton
        aria-label="Recipe options"
        aria-haspopup="true"
        aria-expanded={open}
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ flexShrink: 0, mt: 0.5 }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {canEdit && (
          <MenuItem
            component={RouterLink}
            to={`/recipes/${recipe.recipe_url}/edit`}
            onClick={close}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit recipe</ListItemText>
          </MenuItem>
        )}
        {canEdit && source && <Divider />}
        {source && (
          <MenuItem
            component={Link}
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <ListItemIcon>
              <OpenInNewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="View source" secondary={sourceHost(source)} />
          </MenuItem>
        )}
        {labels.length > 0 && (canEdit || source) && <Divider />}
        {labels.length > 0 && (
          <Box sx={{ px: 2, py: 1, maxWidth: 280 }}>
            <Typography
              variant="caption"
              component="p"
              sx={(t) => ({
                fontFamily: t.tokens.typography.mono,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: t.tokens.color.text.disabled,
                mb: 0.75,
              })}
            >
              Labels
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {labels.map((l) => (
                <Chip key={l.id} label={qualifiedLabelName(l)} size="small" />
              ))}
            </Box>
          </Box>
        )}
      </Menu>
    </>
  );
};

const RecipePage: React.FC = () => {
  const { slug = '' } = useParams();
  const { token, userProfile, isAuthenticated } = useAuth();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', slug],
    queryFn: () => getRecipe(slug, token),
  });

  const stats = recipe ? recipeStats(recipe.content) : [];

  // View toggle: exactly one of Timeline / Shopping list / Raw recipe renders
  // at a time.
  const [view, setView] = React.useState<RecipeView>('timeline');

  // Checked-ingredient state, shared across the Timeline and Shopping views.
  const [checked, setChecked] = React.useState<ReadonlySet<string>>(() => new Set());
  const toggleIngredient = React.useCallback((key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);
  const clearChecked = React.useCallback(() => setChecked(new Set()), []);

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {isLoading && <LoadingScreen />}
        {!isLoading && !recipe && <Typography>Recipe not found.</Typography>}
        {recipe && (
          <>
            {/* Floating wake-lock control — stacked above the global dark-mode
                icon; renders nothing on browsers without the Wake Lock API. */}
            <WakeLockOverlay />
            {/* Header: title and the view tabs share the top line; the timings
                drop to a small mono subline beneath. Every secondary field
                (source, category, edit) stays tucked in the ⋯ menu. Keeping the
                chrome to ~two lines is what lets the recipe method sit near the
                top of the page rather than 75% down it. */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    columnGap: 2,
                    rowGap: 1,
                  }}
                >
                  <Typography variant="h3" sx={{ fontWeight: 700, m: 0 }}>
                    {recipe.content.title}
                  </Typography>
                  <RecipeViewToggle value={view} onChange={setView} />
                </Box>
                {stats.length > 0 && (
                  <Box
                    sx={(t) => ({
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1.5,
                      fontFamily: t.tokens.typography.mono,
                      fontSize: '0.8rem',
                      color: t.tokens.color.text.secondary,
                      fontVariantNumeric: 'tabular-nums',
                    })}
                  >
                    {stats.map((s) => (
                      <Box component="span" key={s.label}>
                        <Box
                          component="strong"
                          sx={(t) => ({
                            fontWeight: 650,
                            color: s.hero
                              ? t.tokens.color.brand.primary
                              : t.tokens.color.text.primary,
                          })}
                        >
                          {s.value}
                        </Box>{' '}
                        {s.label}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <RecipeOverflowMenu recipe={recipe} canEdit={isAuthenticated} />
            </Box>

            {isSiteAdmin(userProfile) && recipe.scrape_processing_run_id && (
              <ImportLineageStrip slug={slug} token={token} />
            )}

            {view === 'timeline' &&
              (recipe.timeline ? (
                <CookTimeline
                  timeline={recipe.timeline}
                  sections={recipe.content.sections}
                  checked={checked}
                  onToggleIngredient={toggleIngredient}
                />
              ) : (
                isAuthenticated && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      mt: 4,
                    }}
                  >
                    Save this recipe to generate a cook timeline.
                  </Typography>
                )
              ))}
            {view === 'shopping' && (
              <ShoppingList
                content={recipe.content}
                checked={checked}
                onToggleIngredient={toggleIngredient}
                onClearChecked={clearChecked}
              />
            )}
            {view === 'raw' && <RawRecipe content={recipe.content} />}
          </>
        )}
      </Container>
    </>
  );
};

export default RecipePage;
