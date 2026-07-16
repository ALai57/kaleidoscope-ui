import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { SkillsSection } from '../components/layout/SkillsSection';
import { Timeline } from '../components/layout/Timeline';
import { Footer } from '../components/layout/Footer';
import { SectionHeading } from '../components/common/SectionHeading';
import { FactList } from '../components/common/FactList';

const ExperiencePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Hero — page title, intro, and quick-facts read as one unit: prose on
              the left, a compact fact rail on the right (stacked on mobile). */}
          <SectionHeading title="Experience" level="h1" sx={{ mb: 4 }} />
          <Grid
            container
            spacing={4}
            sx={{
              alignItems: "flex-start",
              mb: 10
            }}>
            <Grid
              size={{
                xs: 12,
                md: 7
              }}>
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
            <Grid
              size={{
                xs: 12,
                md: 5
              }}>
              <FactList
                facts={[
                  { label: 'Current role', value: 'Eng. Manager' },
                  { label: 'Company', value: 'Freshpaint' },
                  { label: 'Focus', value: 'Privacy-first adtech' },
                ]}
              />
            </Grid>
          </Grid>

          <SectionHeading title="Skills" level="h3" sx={{ mb: 3 }} />
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              mb: 10
            }}>
            <SkillsSection />
          </Grid>

          <SectionHeading title="Career History" level="h3" sx={{ mb: 4 }} />
          <Timeline />
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default ExperiencePage;
