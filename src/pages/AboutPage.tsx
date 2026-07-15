import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { Footer } from '../components/layout/Footer';
import { SectionHeading } from '../components/common/SectionHeading';
import { useAuth } from '../auth/useAuth';

// Interests surfaced from the bio as tokenized chips — echoes the mission-
// control vibe without hardcoding a look.
const INTERESTS = ['Cooking', 'Spanish', 'Board games', 'Outdoors', 'Tango'];

const AboutPage: React.FC = () => {
  const { isAuthenticated, userProfile, login, logout } = useAuth();

  const user = userProfile
    ? {
        firstName: userProfile.firstName ?? undefined,
        lastName: userProfile.lastName ?? undefined,
        realm_access: userProfile.realm_access,
      }
    : undefined;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <Container maxWidth="md" sx={{ flex: 1, py: 6 }}>
        <SectionHeading title="About" level="h3" sx={{ mb: 4 }} />

        <Grid container spacing={4} sx={{
          alignItems: "flex-start"
        }}>
          <Grid
            size={{
              xs: 12,
              sm: 8
            }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {'Welcome to my website! On this site, I write about '}
              <Link href="/archive">
                things I&#39;m thinking about personally or professionally
              </Link>
              {', and I use this site to practice and refine how I build software.'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              When I&#39;m not working or thinking about software, you can find me learning new
              recipes, practicing Spanish, playing board games, or spending time outdoors. I&#39;ll
              also occasionally dance Tango socially, but it&#39;s been a while!
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{
              flexWrap: "wrap"
            }}>
              {INTERESTS.map((interest) => (
                <Chip key={interest} label={interest} size="small" variant="outlined" />
              ))}
            </Stack>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}>
            <Box
              component="img"
              alt="Andrew Lai"
              sx={(theme) => ({
                width: '100%',
                maxHeight: '60vh',
                objectFit: 'cover',
                display: 'block',
                borderRadius: `${theme.tokens?.radius.lg ?? 16}px`,
                boxShadow: theme.tokens?.elevation.lg ?? 6,
                content: {
                  xs: 'url(/static/images/andrew-lai-small.png)',
                  sm: 'url(/static/images/andrew-lai-small.png)',
                  md: 'url(/static/images/andrew-lai.jpeg)',
                  lg: 'url(/static/images/andrew-lai.jpeg)',
                  xl: 'url(/static/images/me-tree.png)',
                },
              })}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutPage;
