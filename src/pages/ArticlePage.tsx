import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import { NavBar } from '../components/layout/NavBar';
import { LoadingScreen } from '../components/layout/LoadingScreen';
import { RichTextEditor } from '../components/editor/RichTextEditor';
import { useKeycloak } from '../auth/useKeycloak';
import { getArticle, getArticles } from '../api/articles';
import type { Article } from '../types/article';

// ── Single article view ────────────────────────────────────────────────────

const ArticleView: React.FC<{ slug: string }> = ({ slug }) => {
  const { token, isAuthenticated, userProfile, login, logout } = useKeycloak();

  const { data: article, isLoading, isError } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticle(slug, token),
  });

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
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
            <RichTextEditor
              initialContent={article.article_url}
              editable={false}
            />
          </>
        )}
      </Box>
    </>
  );
};

// ── Archive (all articles) view ────────────────────────────────────────────

const ArchiveView: React.FC = () => {
  const { token, isAuthenticated, userProfile, login, logout } = useKeycloak();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(token),
  });

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
      }
    : undefined;

  return (
    <>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Box id="primary-content" sx={{ maxWidth: 900, mx: 'auto', px: 2, py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Archive
        </Typography>

        {isLoading && <LoadingScreen />}

        <Grid container spacing={2}>
          {articles.map((article: Article) => (
            <Grid key={article.article_id} item xs={12} sm={6} md={4}>
              <Card elevation={3}>
                <CardActionArea component={Link} to={`/content/${article.article_url}`}>
                  <CardContent>
                    <Typography variant="h6">{article.article_title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {article.created_at
                        ? new Date(article.created_at).toLocaleDateString()
                        : ''}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
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
