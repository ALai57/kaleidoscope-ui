import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GARDEN_FACETS, facetColor } from './gardenFacets';

/**
 * The front-page hero: one beam of light ("me") refracted through a prism into
 * the three garden facets. Stylized SVG, never photoreal. Colors come from
 * `theme.tokens` so the spectrum recolors with the active preset. Hovering or
 * focusing a facet dims the others and lights the chosen one. Under reduced
 * motion the entrance/pulse animations are disabled.
 *
 * Visual reference (final polish): the approved prototype Artifact.
 */
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C']; // writing / reading / recipes

const RefractionHero: React.FC = () => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const ink1 = tokens?.color.text.primary ?? theme.palette.text.primary;
  const ink3 = tokens?.color.text.disabled ?? theme.palette.text.disabled;
  const surface = tokens?.color.surface.raised ?? theme.palette.background.paper;
  const border = tokens?.color.border.strong ?? theme.palette.divider;
  const accent = tokens?.color.brand.primary ?? theme.palette.primary.main;
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Facet card y positions in the 1000x480 viewBox.
  const rowY = [80, 198, 316];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        // Dim siblings when one facet is engaged.
        '& .facet': { transition: 'opacity .35s ease' },
        '& .hero-scene:has(.facet:hover) .facet:not(:hover)': { opacity: 0.24 },
        '& .hero-scene:has(.facet:focus-visible) .facet:not(:focus-visible)': { opacity: 0.24 },
        '& .facet:focus-visible': { outline: 'none' },
        '& .facet:focus-visible .ring': { opacity: 0.9 },
      }}
    >
      <Box
        component="svg"
        className="hero-scene"
        viewBox="0 0 1000 480"
        role="group"
        aria-label="A prism refracting one light into three garden sections"
        sx={{ width: '100%', maxWidth: 1000, height: 'auto' }}
      >
        <defs>
          <radialGradient id="rh-src" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dff6fb" />
            <stop offset="55%" stopColor={accent} />
            <stop offset="100%" stopColor="#0b3a44" />
          </radialGradient>
        </defs>

        {/* source = me */}
        <circle cx="120" cy="238" r="25" fill="url(#rh-src)" />
        <text x="120" y="245" textAnchor="middle" fontFamily={mono} fontSize="20" fontWeight="600" fill="#0A0E15">A</text>
        <text x="120" y="314" textAnchor="middle" fontFamily={mono} fontSize="10.5" letterSpacing="0.14em" fill={ink3}>A SINGLE LIGHT · ME</text>

        {/* beam + prism */}
        <line x1="146" y1="238" x2="446" y2="238" stroke={accent} strokeWidth="5" strokeLinecap="round">
          {!reduce && <animate attributeName="opacity" values="0.9;0.55;0.9" dur="4.5s" repeatCount="indefinite" />}
        </line>
        <polygon points="466,150 400,312 534,312" fill={`${accent}22`} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
        <text x="466" y="340" textAnchor="middle" fontFamily={mono} fontSize="10.5" letterSpacing="0.14em" fill={ink3}>THE PRISM</text>

        {GARDEN_FACETS.map((f, i) => {
          const c = facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0] ?? '#45D6E8');
          const y = rowY[i] ?? 80;
          const cy = y + 40;
          return (
            <Box
              key={f.key}
              component={Link}
              to={f.route}
              className="facet"
              aria-label={`${f.label} — ${f.description}`}
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <line x1="500" y1="250" x2="712" y2={cy} stroke={c} strokeWidth="3" strokeLinecap="round" />
              <rect className="ring" x="704" y={y - 6} width="254" height="92" rx="16" fill="none" stroke={c} strokeDasharray="4 4" opacity="0" />
              <rect x="710" y={y} width="242" height="80" rx="13" fill={surface} stroke={border} />
              <rect x="710" y={y} width="6" height="80" rx="3" fill={c} />
              <text x="782" y={y + 30} fontFamily={mono} fontSize="18" fontWeight="600" fill={ink1}>{f.label}</text>
              <text x="782" y={y + 49} fontFamily={theme.typography.fontFamily} fontSize="12" fill={ink3}>{f.description}</text>
              <text x="782" y={y + 68} fontFamily={mono} fontSize="11" fill={c}>{f.route}</text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RefractionHero;
