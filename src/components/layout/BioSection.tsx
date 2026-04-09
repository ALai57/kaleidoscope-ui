import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export type BioView = 'personal' | 'professional' | 'cv';

export interface BioSectionProps {
  view: BioView;
}

const BREAKPOINTS = { xs: 12, sm: 12, md: 11, lg: 10, xl: 8 };

export const BioSection: React.FC<BioSectionProps> = ({ view }) => {
  switch (view) {
    case 'personal':
      return (
        <Grid item {...BREAKPOINTS}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12} sm={7}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {'Welcome to my website! On this site, I write about '}
                <Link href="/archive" variant="body1">
                  things I&#39;m thinking about personally or professionally
                </Link>
                {', and I use this site to practice and refine how I build software.'}
              </Typography>
              <Typography variant="body1">
                When I&#39;m not working or thinking about software, you can find me learning new
                recipes, practicing Spanish, playing board games, or spending time outdoors. I&#39;ll
                also occasionally dance Tango socially, but it&#39;s been a while!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box
                component="img"
                alt="Andrew Lai"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  content: {
                    xs: 'url(/static/images/andrew-lai-small.png)',
                    sm: 'url(/static/images/andrew-lai-small.png)',
                    md: 'url(/static/images/andrew-lai.jpeg)',
                    lg: 'url(/static/images/andrew-lai.jpeg)',
                    xl: 'url(/static/images/me-tree.png)',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      );

    case 'professional':
      return (
        <Grid item {...BREAKPOINTS}>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>Software Engineering Leader</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            As a professional, I&#39;m driven by the love of solving technical problems, working
            with excellent teams, building and learning.
          </Typography>
          <Typography variant="body1">
            {'I\'m currently a Software Engineering Manager at '}
            <Link href="https://freshpaint.io" variant="body1">
              Freshpaint.io
            </Link>
            {", where I'm working on a platform that enables healthcare marketers to advertise in a privacy-first, HIPAA-compliant way."}
          </Typography>
        </Grid>
      );

    case 'cv':
    default:
      return null;
  }
};
