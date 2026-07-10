import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { alpha, useTheme } from '@mui/material/styles';
import { NavBar } from '../components/layout/NavBar';
import { EntityCard } from '../components/common/EntityCard';
import { PortfolioSection } from '../components/layout/PortfolioSection';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../auth/useAuth';
import { getArticles } from '../api/articles';

// ── Feature card ───────────────────────────────────────────────────────────

interface FeatureCardProps {
  title: string;
  description: string;
  to: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, to, icon }) => (
  // EntityCard/SurfaceCard are plain FCs (no RouterLink `to` in their props), so
  // the whole card is wrapped in a RouterLink rather than rendered `as` one.
  <RouterLink to={to} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
    <EntityCard
      interactive
      title={title}
      avatar={
        <Box
          sx={(t) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: `${t.tokens?.radius.md ?? 8}px`,
            color: 'primary.main',
            bgcolor: alpha(t.palette.primary.main, 0.12),
            '& svg': { fontSize: 28 },
          })}
        >
          {icon}
        </Box>
      }
      sx={{ height: '100%', color: 'text.primary' }}
    >
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </EntityCard>
  </RouterLink>
);

// ── Page ───────────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  const theme = useTheme();
  const { isAuthenticated, token, userProfile, login, logout } = useAuth();

  const { data: articles = [] } = useQuery({
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

  // Structural tokens (mono voice / spring motion), each with a bare-MUI
  // fallback so the hero re-skins from the active preset without hardcoding it.
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const headingFamily = tokens?.typography.headingFamily === 'mono' ? mono : 'inherit';
  const durBase = tokens?.motion.duration.base ?? 250;
  const snap = tokens?.motion.easing.springSnap ?? 'ease';
  const ctaSx = {
    fontFamily: mono,
    letterSpacing: '0.05em',
    transition: `transform ${durBase}ms ${snap}, box-shadow ${durBase}ms`,
    '&:hover': { transform: 'translateY(-2px)' },
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      {/* Hero — a seed-derived accent wash over the page surface (no hardcoded
          white/gradient), so it re-colors with the active preset + mode. */}
      <Box
        sx={(t) => ({
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.12)} 0%, ${alpha(
            t.palette.primary.main,
            0.02
          )} 45%, transparent 100%)`,
          py: { xs: 6, md: 9 },
        })}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'primary.main',
                  mb: 1.5,
                }}
              >
                Software Engineering Manager · Writer · Tinkerer
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontFamily: headingFamily, fontWeight: 700, mb: 2, color: 'text.primary' }}
              >
                Andrew Lai
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 520 }}>
                I build software, manage engineering teams, and write about the things I&#39;m
                learning and figuring out along the way.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" component={RouterLink} to="/about" sx={ctaSx}>
                  About Me
                </Button>
                <Button variant="outlined" component={RouterLink} to="/archive" sx={ctaSx}>
                  Read my writing
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                alt="Andrew Lai"
                sx={(t) => ({
                  width: '100%',
                  maxWidth: 340,
                  borderRadius: `${t.tokens?.radius.lg ?? 16}px`,
                  boxShadow: t.tokens?.elevation.lg ?? 6,
                  content: {
                    xs: 'url(/static/images/andrew-lai-small.png)',
                    md: 'url(/static/images/andrew-lai.jpeg)',
                    xl: 'url(/static/images/me-tree.png)',
                  },
                })}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Feature cards */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              title="About Me"
              description="Personal bio, interests, and what I'm up to outside of work."
              to="/about"
              icon={<PersonIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              title="Experience"
              description="Professional background, skills, and full career history."
              to="/experience"
              icon={<WorkIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureCard
              title="Writing"
              description="Articles on software, engineering leadership, and ideas."
              to="/archive"
              icon={<ArticleIcon />}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Recent writing */}
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <PortfolioSection recentArticles={articles} />
      </Container>

      <Footer />
    </Box>
  );
};

export default HomePage;
