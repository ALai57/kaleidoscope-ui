import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useIsMobile } from '@/hooks/useIsMobile';
import RefractionHeroMobile from './RefractionHeroMobile';
import { GARDEN_FACETS, facetColor, PULSE_CONFIG, pulseTimeline } from './gardenFacets';
import type { PulseSpan } from './gardenFacets';

/**
 * The front-page hero: one beam of light ("me") refracted through a prism into
 * the three garden facets. Stylized SVG, never photoreal. Colors come from
 * `theme.tokens` so the spectrum recolors with the active preset. Hovering or
 * focusing a facet dims the others and lights the chosen one.
 *
 * Soft light pulses ride the beams: one packet travels source→prism, then the
 * prism emits one down each fan-out ray to a facet, looping. Every knob (speed,
 * size, brightness, glow, rhythm) lives in `PULSE_CONFIG` (see gardenFacets.ts).
 * Under reduced motion — or with `PULSE_CONFIG.enabled` off — no pulses render.
 *
 * Visual reference (final polish): the approved prototype Artifact.
 */
// eslint-disable-next-line no-restricted-syntax -- bare-MUI fallback spectrum, used only when theme.tokens is undefined (facetColor prefers tokens.color.categorical)
const FALLBACKS = ['#45D6E8', '#9C90F0', '#E0A73C']; // writing / reading / recipes

/**
 * Turn a packet's timeline window into SMIL motion + opacity attributes over the
 * shared cycle. The packet waits at the path start, glides start→end during its
 * window fading up to `intensity` at the midpoint, then rests (dark, parked at the
 * end) for the remainder of the loop — which is what keeps the chain phase-locked.
 */
function pulseSmil(span: PulseSpan, intensity: number) {
  const s = span.startPct;
  const e = span.endPct;
  const mid = (s + e) / 2;
  const n = (x: number): number => Number(x.toFixed(5));
  const motionTimes = s > 0 ? [0, s, e, 1] : [0, e, 1];
  const motionPoints = s > 0 ? [0, 0, 1, 1] : [0, 1, 1];
  const opTimes = s > 0 ? [0, s, mid, e, 1] : [0, mid, e, 1];
  const opValues = s > 0 ? [0, 0, intensity, 0, 0] : [0, intensity, 0, 0];
  return {
    keyTimes: motionTimes.map(n).join(';'),
    keyPoints: motionPoints.map(n).join(';'),
    opKeyTimes: opTimes.map(n).join(';'),
    opValues: opValues.map(n).join(';'),
  };
}

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
  const isMobile = useIsMobile();
  if (isMobile) return <RefractionHeroMobile />;

  // Facet card y positions in the 1000x480 viewBox.
  const rowY = [80, 198, 316];

  // Soft light pulses: one incoming packet (source→prism) plus one per facet
  // (prism→facet), all on a single shared period so the chain stays phase-locked.
  // Each packet rides the exact coordinates of its beam/ray below.
  const timeline = pulseTimeline(PULSE_CONFIG, GARDEN_FACETS.length);
  const dur = `${timeline.period}s`;
  const showPulses = PULSE_CONFIG.enabled && !reduce;
  const packets = showPulses
    ? timeline.spans.map((span, idx) => {
        if (span.key === 'incoming') {
          return { span, d: 'M146 238 L446 238', color: accent };
        }
        const i = idx - 1;
        const f = GARDEN_FACETS[i]!;
        const cy = (rowY[i] ?? 80) + 40;
        return {
          span,
          d: `M500 250 L712 ${cy}`,
          color: facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!),
        };
      })
    : [];

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
          {/* eslint-disable no-restricted-syntax -- decorative source-glow gradient stops; static illustrative hues with no token equivalent, SVG paint can't read JS theme tokens */}
          <radialGradient id="rh-src" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dff6fb" />
            <stop offset="55%" stopColor={accent} />
            <stop offset="100%" stopColor="#0b3a44" />
          </radialGradient>
          {/* eslint-enable no-restricted-syntax */}
          {/* Soft bloom for the travelling light packets; stdDeviation is the `glow` knob. */}
          <filter id="rh-glow" x="-200%" y="-200%" width="500%" height="500%" filterUnits="objectBoundingBox">
            <feGaussianBlur stdDeviation={PULSE_CONFIG.glow} />
          </filter>
        </defs>

        {/* source = me */}
        <circle cx="120" cy="238" r="25" fill="url(#rh-src)" />
        {/* eslint-disable-next-line no-restricted-syntax -- fixed dark on-color for the monogram over the bright accent disc; surface tokens invert per preset, so a literal is correct here */}
        <text x="120" y="245" textAnchor="middle" fontFamily={mono} fontSize="20" fontWeight="600" fill="#0A0E15">A</text>
        <text x="120" y="314" textAnchor="middle" fontFamily={mono} fontSize="10.5" letterSpacing="0.14em" fill={ink3}>ANDREW S LAI</text>

        {/* beam + prism */}
        <line x1="146" y1="238" x2="446" y2="238" stroke={accent} strokeWidth="5" strokeLinecap="round">
          {!reduce && <animate attributeName="opacity" values="0.9;0.55;0.9" dur="4.5s" repeatCount="indefinite" />}
        </line>
        <polygon points="466,150 400,312 534,312" fill={`${accent}22`} stroke={accent} strokeWidth="1.8" strokeLinejoin="round" />
        <text x="466" y="340" textAnchor="middle" fontFamily={mono} fontSize="10.5" letterSpacing="0.14em" fill={ink3}>THE PRISM</text>

        {GARDEN_FACETS.map((f, i) => {
          const c = facetColor(tokens, f.colorIndex, FALLBACKS[i] ?? FALLBACKS[0]!);
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

        {/* Travelling light packets (decorative). Rendered last so they glow over
            the beams and prism. Colors/paths mirror the beams above; timing is
            entirely data-driven from PULSE_CONFIG via pulseTimeline. */}
        {packets.length > 0 && (
          <g className="pulses" aria-hidden="true">
            {packets.map(({ span, d, color }) => {
              const gid = `rh-pulse-${span.key}`;
              const smil = pulseSmil(span, PULSE_CONFIG.intensity);
              return (
                <g key={span.key}>
                  <radialGradient id={gid} cx="50%" cy="50%" r="50%">
                    {/* eslint-disable-next-line no-restricted-syntax -- white-hot packet core; a literal is correct here (SVG paint can't read JS tokens, and the packet body/edge use the token color) */}
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="35%" stopColor={color} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                  </radialGradient>
                  <circle
                    r={PULSE_CONFIG.size}
                    fill={`url(#${gid})`}
                    filter="url(#rh-glow)"
                    opacity={0}
                    data-pulse={span.key}
                    aria-hidden="true"
                  >
                    <animateMotion
                      dur={dur}
                      repeatCount="indefinite"
                      calcMode="linear"
                      path={d}
                      keyPoints={smil.keyPoints}
                      keyTimes={smil.keyTimes}
                    />
                    <animate
                      attributeName="opacity"
                      dur={dur}
                      repeatCount="indefinite"
                      calcMode="linear"
                      values={smil.opValues}
                      keyTimes={smil.opKeyTimes}
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        )}
      </Box>
    </Box>
  );
};

export default RefractionHero;
