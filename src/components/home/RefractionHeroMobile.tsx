import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { GARDEN_FACETS, facetColor } from './gardenFacets';

// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, mirrors RefractionHero
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C']; // writing / reading / recipes

// Per-facet card top (y) and the curved ray from the prism base (50,131) to the
// card's left-edge anchor at (94, top+48). Tuned in the approved prototype.
const CARDS = [
  { top: 168, ray: 'M50,131 C58,176 78,214 94,216' },
  { top: 300, ray: 'M50,131 C52,244 78,346 94,348' },
  { top: 432, ray: 'M50,131 C54,300 80,478 94,480' },
];

const RefractionHeroMobile: React.FC = () => {
  const theme = useTheme();
  const tokens = theme.tokens;
  const mono = tokens?.typography.mono ?? 'monospace';
  const ink1 = tokens?.color.text.primary ?? theme.palette.text.primary;
  const ink3 = tokens?.color.text.disabled ?? theme.palette.text.disabled;
  const surface = tokens?.color.surface.raised ?? theme.palette.background.paper;
  const border = tokens?.color.border.strong ?? theme.palette.divider;
  const accent = tokens?.color.brand.primary ?? theme.palette.primary.main;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 3, px: 2 }}>
      <Box
        component="svg"
        data-testid="refraction-hero-mobile"
        viewBox="0 0 298 624"
        role="group"
        aria-label="A prism refracting one light into three garden sections"
        sx={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block' }}
      >
        {/* source = me, centered top */}
        <circle cx="149" cy="44" r="15" fill={accent} />
        {/* eslint-disable-next-line no-restricted-syntax -- fixed dark on-color monogram over the bright accent disc */}
        <text x="149" y="49" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="#0A0E15">A</text>
        <text x="149" y="78" textAnchor="middle" fontFamily={mono} fontSize="9.5" letterSpacing="0.14em" fill={ink3}>ANDREW S LAI</text>

        {/* bench: beam down -> mirror -> left -> prism (decorative) */}
        <g aria-hidden="true">
          <path d="M149,90 L149,116 L52,116" fill="none" stroke={ink3} strokeWidth="1.6" strokeLinejoin="miter" opacity="0.6" />
          <line x1="140" y1="125" x2="158" y2="107" stroke={ink3} strokeWidth="3.4" strokeLinecap="round" />
          <polygon points="44,100 60,132 28,132" fill={`${accent}14`} stroke={accent} strokeWidth="1.3" />
        </g>

        {/* dispersed facet rays + cards */}
        {GARDEN_FACETS.map((f, i) => {
          const c = facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!);
          const card = CARDS[i] ?? CARDS[0]!;
          const top = card.top;
          const anchorY = top + 48;
          return (
            <Box
              key={f.key}
              component={Link}
              to={f.route}
              className="facet"
              aria-label={`${f.label} — ${f.description}`}
              sx={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <path d={card.ray} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" />
              <circle cx="94" cy={anchorY} r="5" fill={c} />
              <rect x="94" y={top} width="192" height="96" rx="12" fill={surface} stroke={border} />
              <rect x="94" y={top} width="4" height="96" rx="2" fill={c} />
              <text x="112" y={top + 34} fontFamily={mono} fontSize="17" fontWeight="600" fill={ink1}>{f.label}</text>
              <text x="112" y={top + 56} fontFamily={theme.typography.fontFamily} fontSize="12" fill={ink3}>{f.description}</text>
              <text x="112" y={top + 76} fontFamily={mono} fontSize="12" fill={c}>{f.route}</text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default RefractionHeroMobile;
