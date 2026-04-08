import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// ── Sub-sections ───────────────────────────────────────────────────────────

const MeImage: React.FC = () => (
  <Box display="block">
    <Box
      component="img"
      alt="Andrew Lai"
      sx={{
        maxWidth: { xs: '40%', sm: '40%', md: '50%' },
        float: 'left',
        padding: { xs: '5px', sm: '5px', md: '7px' },
        content: {
          xs: 'url(/static/images/andrew-lai-small.png)',
          sm: 'url(/static/images/andrew-lai-small.png)',
          md: 'url(/static/images/andrew-lai.jpeg)',
          lg: 'url(/static/images/andrew-lai.jpeg)',
          xl: 'url(/static/images/me-tree.png)',
        },
      }}
    />
  </Box>
);

const MePersonal: React.FC = () => (
  <>
    <Typography variant="body1">
      {'Welcome to my website! On this site, I write about '}
      <Link href="/archive" variant="body1">
        things I&#39;m thinking about personally or professionally
      </Link>
      {', and I use this site to practice and refine how I build software.'}
    </Typography>

    <br />
    <br />

    <Typography variant="body1">
      When I&#39;m not working or thinking about software, you can find me learning new recipes,
      practicing Spanish, playing board games, or spending time outdoors. I&#39;ll also occasionally
      dance Tango socially, but it&#39;s been a while!
    </Typography>
  </>
);

const MeProfessional: React.FC = () => (
  <Grid
    container
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Grid item xs={12} sm={12} md={11} lg={10} xl={8}>
      <Divider flexItem />
      <Typography variant="h4">Software Engineering Leader</Typography>

      <Typography variant="body1">
        As a professional, I&#39;m driven by the love of solving technical problems, working with
        excellent teams, building and learning.
      </Typography>

      <br />
      <br />

      <Typography variant="body1">
        {'I\'m currently a Software Engineering Manager at '}
        <Link href="https://freshpaint.io" variant="body1">
          Freshpaint.io
        </Link>
        {
          ", where I'm working on a platform that enables healthcare marketers to advertise in a privacy-first, HIPAA-compliant way."
        }
      </Typography>

      <br />
      <br />
    </Grid>
  </Grid>
);

// ── Props ──────────────────────────────────────────────────────────────────

export type BioView = 'personal' | 'professional' | 'cv';

export interface BioSectionProps {
  view: BioView;
}

// ── Component ──────────────────────────────────────────────────────────────

export const BioSection: React.FC<BioSectionProps> = ({ view }) => {
  switch (view) {
    case 'personal':
      return (
        <Grid
          item
          xs={12}
          sm={12}
          md={11}
          lg={10}
          xl={8}
          sx={{ textAlign: 'left' }}
        >
          <MeImage />
          <MePersonal />
        </Grid>
      );

    case 'professional':
      return <MeProfessional />;

    case 'cv':
    default:
      return null;
  }
};
