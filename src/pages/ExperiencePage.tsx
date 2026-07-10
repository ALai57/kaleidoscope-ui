import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { SkillsSection } from '../components/layout/SkillsSection';
import { Timeline } from '../components/layout/Timeline';
import { Footer } from '../components/layout/Footer';
import { SectionHeading } from '../components/common/SectionHeading';
import { StatTile } from '../components/common/StatTile';
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
          {/* Hero — page title, intro, and quick-facts read as one unit: prose on
              the left, the metric rail on the right (stacked on mobile). */}
          <SectionHeading eyebrow="// CAREER" title="Experience" level="h2" sx={{ mb: 4 }} />
          <Grid container spacing={4} alignItems="flex-start" sx={{ mb: 10 }}>
            <Grid item xs={12} md={7}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                As a professional, I&#39;m driven by the love of solving technical problems, working
                with excellent teams, building and learning.
              </Typography>
              <Typography variant="body1">
                {'I\'m currently a Software Engineering Manager at '}
                <Link href="https://freshpaint.io">Freshpaint.io</Link>
                {", where I'm working on a platform that enables healthcare marketers to advertise in a privacy-first, HIPAA-compliant way."}
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={2}>
                <StatTile label="Current role" value="Eng. Manager" />
                <StatTile label="Company" value="Freshpaint" />
                <StatTile label="Focus" value="Privacy-first adtech" />
              </Stack>
            </Grid>
          </Grid>

          <SectionHeading eyebrow="// TOOLKIT" title="Skills" level="h4" sx={{ mb: 3 }} />
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 10 }}>
            <SkillsSection />
          </Grid>

          <SectionHeading eyebrow="// TIMELINE" title="Career History" level="h4" sx={{ mb: 4 }} />
          <Timeline />
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ExperiencePage;
