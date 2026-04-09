import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Writing', to: '/archive' },
  { label: 'About this site', to: '/about-this-site' },
];

export const Footer: React.FC = () => (
  <Box
    component="footer"
    sx={{ bgcolor: 'grey.900', color: 'grey.400', py: 4, mt: 'auto' }}
  >
    <Container maxWidth="lg">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 0 }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <Stack direction="row" spacing={3} flexWrap="wrap">
          {NAV_LINKS.map(({ label, to }) => (
            <MuiLink
              key={to}
              component={RouterLink}
              to={to}
              color="inherit"
              underline="hover"
            >
              {label}
            </MuiLink>
          ))}
        </Stack>
        <Typography variant="body2">
          © {new Date().getFullYear()} Andrew Lai
        </Typography>
      </Stack>
    </Container>
  </Box>
);
