import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Writing', to: '/archive' },
  { label: 'About this site', to: '/about-this-site' },
];

export const Footer: React.FC = () => {
  const theme = useTheme();
  // Token-driven so the footer re-skins with the active preset/mode instead of
  // being a fixed dark slab (it was hardcoded grey.900/grey.400). theme.tokens is
  // mode-reactive, so the sunken background flips in dark mode. Links echo the
  // NavBar's mono-uppercase voice.
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const footerBg = tokens?.color.surface.sunken ?? theme.palette.background.default;
  const durFast = tokens?.motion.duration.fast ?? 150;

  const linkSx = {
    fontFamily: mono,
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: 'text.secondary',
    transition: `color ${durFast}ms`,
    '&:hover': { color: 'primary.main' },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: footerBg,
        color: 'text.secondary',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: 4,
        mt: 'auto',
      }}
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
              <MuiLink key={to} component={RouterLink} to={to} underline="none" sx={linkSx}>
                {label}
              </MuiLink>
            ))}
          </Stack>
          <Typography variant="body2" sx={{ fontFamily: mono, letterSpacing: '0.05em' }}>
            © {new Date().getFullYear()} Andrew Lai
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
