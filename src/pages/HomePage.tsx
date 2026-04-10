import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import { useTheme } from '@mui/material/styles';
import { NavBar } from '../components/layout/NavBar';
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
  <Card
    component={RouterLink}
    to={to}
    elevation={2}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 },
    }}
  >
    <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
      <Box sx={{ mb: 2, color: 'primary.main', '& svg': { fontSize: 48 } }}>
        {icon}
      </Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
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

  const heroBg = `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />

      {/* Hero */}
      <Box sx={{ background: heroBg, color: 'white', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                Andrew Lai
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
                Software Engineering Manager · Writer · Tinkerer
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.85, mb: 4, maxWidth: 520 }}>
                I build software, manage engineering teams, and write about
                the things I&#39;m learning and figuring out along the way.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/about"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.dark',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  About Me
                </Button>
                <Button
                  variant="outlined"
                  component={RouterLink}
                  to="/archive"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.7)',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Read my writing
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                alt="Andrew Lai"
                sx={{
                  width: '100%',
                  maxWidth: 340,
                  borderRadius: 3,
                  boxShadow: 6,
                  content: {
                    xs: 'url(/static/images/andrew-lai-small.png)',
                    md: 'url(/static/images/andrew-lai.jpeg)',
                    xl: 'url(/static/images/me-tree.png)',
                  },
                }}
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
