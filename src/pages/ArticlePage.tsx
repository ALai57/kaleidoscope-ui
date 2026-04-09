import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { RichTextEditor } from '../components/editor/RichTextEditor';
import { useAuth } from '../auth/useAuth';
import { getArticle, getArticles } from '../api/articles';
import type { Article } from '../types/article';

// ── Single article view ────────────────────────────────────────────────────

const ArticleView: React.FC<{ slug: string }> = ({ slug }) => {
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug, token),
  });

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  return (
    <>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box sx={{ maxWidth: 900, mx: 'auto', px: 2, py: 4 }}>
        {isLoading && <LoadingScreen />}

        {isError && (
          <Typography variant="h5" color="error">
            Article not found.
          </Typography>
        )}

        {article && (
          <>
            <Typography variant="h3" gutterBottom>
              {article.article_title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {article.author && `By ${article.author}`}
              {article.author && article.created_at && ' · '}
              {article.created_at && new Date(article.created_at).toLocaleDateString()}
            </Typography>
            <RichTextEditor
              initialContent={article.content}
              editable={false}
            />
          </>
        )}
      </Box>
    </>
  );
};

// ── Tag color map ──────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  research: '#4a90e2',
  thoughts: '#e26b4a',
  about: '#7c4ae2',
  archive: '#4ae2a0',
};

function tagColor(tag: string): string {
  return TAG_COLORS[tag] ?? '#aaa';
}

// ── Archive article row ────────────────────────────────────────────────────

const ArchiveRow: React.FC<{ article: Article }> = ({ article }) => {
  const theme = useTheme();
  const color = tagColor(article.article_tags ?? '');
  const date = article.created_at
    ? new Date(article.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <Box
      component={Link}
      to={`/content/${article.article_url}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 1.5,
        px: 2,
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 1,
        transition: 'background 0.15s',
        '&:hover': {
          background: theme.palette.action.hover,
        },
      }}
    >
      {/* Tag color accent */}
      <Box
        sx={{
          width: 4,
          minWidth: 4,
          alignSelf: 'stretch',
          borderRadius: 2,
          background: color,
          flexShrink: 0,
        }}
      />

      {/* Title + meta */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {article.article_title}
        </Typography>
        {article.author && (
          <Typography variant="caption" color="text.secondary">
            {article.author}
          </Typography>
        )}
      </Box>

      {/* Tag chip */}
      {article.article_tags && (
        <Chip
          label={article.article_tags}
          size="small"
          sx={{
            background: color,
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.7rem',
            flexShrink: 0,
            display: { xs: 'none', sm: 'flex' },
          }}
        />
      )}

      {/* Date */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ whiteSpace: 'nowrap', flexShrink: 0, minWidth: 90, textAlign: 'right' }}
      >
        {date}
      </Typography>
    </Box>
  );
};

// ── Archive (all articles) view ────────────────────────────────────────────

const ArchiveView: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(token),
  });

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  const allTags = useMemo(() => {
    const tags = new Set(articles.map((a: Article) => a.article_tags).filter(Boolean));
    return Array.from(tags).sort() as string[];
  }, [articles]);

  const filtered = useMemo(() => {
    let result = articles as Article[];
    if (activeTag) result = result.filter((a) => a.article_tags === activeTag);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((a) => a.article_title.toLowerCase().includes(q));
    }
    return [...result].sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? bTime - aTime : aTime - bTime;
    });
  }, [articles, activeTag, search, sortOrder]);

  return (
    <>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box id="primary-content" sx={{ maxWidth: 800, mx: 'auto', px: 2, py: 4 }}>

        {/* Header */}
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          Archive
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {isLoading ? 'Loading…' : `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`}
        </Typography>

        {/* Filter bar */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
            {/* Tag filters */}
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ flexGrow: 1 }}>
              <Chip
                label="All"
                onClick={() => setActiveTag(null)}
                variant={activeTag === null ? 'filled' : 'outlined'}
                size="small"
              />
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  variant={activeTag === tag ? 'filled' : 'outlined'}
                  size="small"
                  sx={
                    activeTag === tag
                      ? { background: tagColor(tag), color: '#fff', fontWeight: 600, borderColor: tagColor(tag) }
                      : { borderColor: tagColor(tag), color: tagColor(tag) }
                  }
                />
              ))}
            </Stack>

            {/* Sort toggle */}
            <ToggleButtonGroup
              value={sortOrder}
              exclusive
              onChange={(_e, v) => { if (v) setSortOrder(v); }}
              size="small"
            >
              <ToggleButton value="newest">Newest</ToggleButton>
              <ToggleButton value="oldest">Oldest</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        {isLoading && <LoadingScreen />}

        {/* Article list */}
        {!isLoading && filtered.length === 0 && (
          <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
            No articles found.
          </Typography>
        )}

        {!isLoading && filtered.length > 0 && (
          <Box>
            {filtered.map((article, i) => (
              <React.Fragment key={article.article_id}>
                <ArchiveRow article={article} />
                {i < filtered.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

// ── Page component (handles both /content/:slug and /archive) ──────────────

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return slug ? <ArticleView slug={slug} /> : <ArchiveView />;
};

export default ArticlePage;
export { ArchiveView };
