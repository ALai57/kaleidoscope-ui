import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { NavBar } from '../components/layout/NavBar';
import { BioSection } from '../components/layout/BioSection';
import type { BioView } from '../components/layout/BioSection';
import { Timeline } from '../components/layout/Timeline';
import { SkillsSection } from '../components/layout/SkillsSection';
import { PortfolioSection } from '../components/layout/PortfolioSection';
import { useAuth } from '../auth/useAuth';
import { getArticles } from '../api/articles';

const GRID_CENTER = {
  container: true,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const BREAKPOINTS = { xs: 12, sm: 12, md: 11, lg: 10, xl: 8 };

const HomePage: React.FC = () => {
  const [view, setView] = useState<BioView>('cv');
  const { isAuthenticated, token, userProfile, login, logout } = useAuth();

  const { data: articles = [] } = useQuery({
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
    <Box sx={{ minHeight: '100vh' }}>
      <NavBar user={user} isAuthenticated={isAuthenticated} login={login} logout={logout} />
      <br />

      {/* Header + toggle */}
      <Grid {...GRID_CENTER}>
        <Grid item {...BREAKPOINTS}>
          <Typography variant="h2">Andrew Lai</Typography>
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={(_ev, v: BioView | null) => {
              if (v !== null) setView(v);
            }}
          >
            <ToggleButton value="personal">Personal</ToggleButton>
            <ToggleButton value="professional">Professional</ToggleButton>
            <ToggleButton value="cv">CV</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* Bio / professional section */}
        {view === 'personal' && <BioSection view="personal" />}
        {view === 'professional' && (
          <>
            <BioSection view="professional" />
            <Grid {...GRID_CENTER}>
              <SkillsSection />
            </Grid>
          </>
        )}
      </Grid>

      {/* Timeline (CV view) */}
      {view === 'cv' && (
        <Grid {...GRID_CENTER}>
          <Timeline />
        </Grid>
      )}

      {/* Recent articles */}
      <Grid {...GRID_CENTER} sx={{ mt: 4, px: 2 }}>
        <Grid item {...BREAKPOINTS}>
          <PortfolioSection recentArticles={articles} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
