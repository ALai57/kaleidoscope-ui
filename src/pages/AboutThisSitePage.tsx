import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { NavBar } from '../components/layout/NavBar';
import { useAuth } from '../auth/useAuth';

// ── Icon component ─────────────────────────────────────────────────────────

interface TechIconProps {
  tooltipText: string;
  src: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tooltipText, src }) => (
  <Tooltip title={tooltipText}>
    <IconButton
      sx={{
        padding: { xs: '2px', sm: '5px', md: '8px', lg: '8px', xl: '10px' },
        width: { xs: '50px', sm: '60px', md: '70px', lg: '90px', xl: '90px' },
        height: { xs: '50px', sm: '60px', md: '70px', lg: '90px', xl: '90px' },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={tooltipText}
        sx={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </IconButton>
  </Tooltip>
);

// ── Layout helpers ─────────────────────────────────────────────────────────

const ROW_SX = {
  padding: { xs: '2px', sm: '5px', md: '10px', lg: '10px', xl: '10px' },
};

const GRID_CENTER = {
  container: true,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

// ── Page ───────────────────────────────────────────────────────────────────

const AboutThisSitePage: React.FC = () => {
  const { isAuthenticated, userProfile, login, logout } = useAuth();

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

      {/* Intro text */}
      <Grid {...GRID_CENTER}>
        <Grid item xs={12} sm={11} md={10} lg={8} xl={6}>
          <Stack direction="column" sx={{ p: 2 }}>
            <Typography variant="body1">
              {'This website is hosted on the '}
              <Link variant="body1" href="https://github.com/ALai57/kaleidoscope">
                kaleidoscope.pub
              </Link>
              {
                " project. Kaleidoscope.pub is an open source CMS that's under active development."
              }
            </Typography>

            <br />

            <Typography variant="body1">
              Kaleidoscope.pub is a content publishing platform that allows users to selectively
              share their content only with users they select, like family or friends.
            </Typography>
            <br />
          </Stack>
        </Grid>
      </Grid>

      {/* Tech cards row */}
      <Grid {...GRID_CENTER} spacing={1} sx={{ px: 2 }}>
        {/* Built With */}
        <Grid item xs={11} sm={11} md={5} lg={5} xl={4}>
          <Paper elevation={8} sx={{ margin: { xs: '5px', sm: '5px' } }}>
            <Stack direction="column" width="100%" sx={{ p: 2 }}>
              <Typography variant="h4">Built With</Typography>
              <br />

              <Stack direction="row" sx={ROW_SX}>
                <TechIcon tooltipText="Clojure" src="/static/images/clojure-logo-2.svg" />
                <TechIcon tooltipText="Clojurescript" src="/static/images/cljs.svg" />
                <TechIcon tooltipText="Javascript" src="/static/images/javascript.svg" />
                <TechIcon tooltipText="Terraform" src="/static/images/terraform.png" />
              </Stack>

              <Stack direction="row" sx={ROW_SX}>
                <TechIcon tooltipText="Storybook" src="/static/images/storybook-icon.svg" />
                <TechIcon tooltipText="Swagger/Open API" src="/static/images/swagger.png" />
                <TechIcon tooltipText="Open Telemetry" src="/static/images/otel.svg" />
              </Stack>

              <Stack direction="row" sx={ROW_SX}>
                <TechIcon tooltipText="React" src="/static/images/react.svg" />
                <TechIcon tooltipText="Material UI" src="/static/images/material-ui-logo.svg" />
                <TechIcon tooltipText="Shadow CLJS" src="/static/images/shadow-cljs.png" />
                <TechIcon tooltipText="Reframe" src="/static/images/re-frame.png" />
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Deployed With */}
        <Grid item xs={11} sm={11} md={5} lg={5} xl={4}>
          <Paper elevation={8} sx={{ margin: { xs: '5px', sm: '5px' } }}>
            <Stack direction="column" width="100%" sx={{ p: 2 }}>
              <Typography variant="h4">Deployed with</Typography>
              <br />

              <Stack direction="row" sx={ROW_SX}>
                <TechIcon tooltipText="AWS" src="/static/images/aws.svg" />
              </Stack>

              <Stack direction="row" sx={ROW_SX}>
                <TechIcon tooltipText="Sumologic" src="/static/images/sumo.svg" />
                <TechIcon tooltipText="Grafana Loki" src="/static/images/grafana.svg" />
                <TechIcon tooltipText="Bugsnag" src="/static/images/bugsnag.svg" />
              </Stack>

              <Stack direction="row" sx={ROW_SX}>
                <TechIcon tooltipText="Keycloak" src="/static/images/keycloak-logo.png" />
              </Stack>

              <Stack direction="row" sx={ROW_SX}>
                <TechIcon tooltipText="Docker" src="/static/images/docker.png" />
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutThisSitePage;
