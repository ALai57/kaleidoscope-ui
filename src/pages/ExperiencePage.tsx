import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { SkillsSection } from '../components/layout/SkillsSection';
import { Timeline } from '../components/layout/Timeline';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../auth/useAuth';

const ExperiencePage: React.FC = () => {
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

      <Box sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography variant="h3" gutterBottom>Experience</Typography>
          <Divider sx={{ mb: 4 }} />

          <Typography variant="h5" sx={{ mb: 2 }}>Software Engineering Leader</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            As a professional, I&#39;m driven by the love of solving technical problems, working
            with excellent teams, building and learning.
          </Typography>
          <Typography variant="body1" sx={{ mb: 8 }}>
            {'I\'m currently a Software Engineering Manager at '}
            <Link href="https://freshpaint.io">Freshpaint.io</Link>
            {", where I'm working on a platform that enables healthcare marketers to advertise in a privacy-first, HIPAA-compliant way."}
          </Typography>

          <Typography variant="h4" sx={{ mb: 3 }}>Skills</Typography>
          <Grid container spacing={2} justifyContent="center">
            <SkillsSection />
          </Grid>

          <Typography variant="h4" sx={{ mt: 8, mb: 1 }}>Career History</Typography>
          <Divider sx={{ mb: 2 }} />
        </Container>

        <Timeline />
      </Box>

      <Footer />
    </Box>
  );
};

export default ExperiencePage;
