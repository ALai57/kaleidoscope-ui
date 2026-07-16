/* eslint-disable no-restricted-syntax -- decorative, aria-hidden prism SVG. The
   ink colors (beam/labels) are tokenized so the banner is legible in light mode;
   the remaining hardcoded hues are the mode-independent Prism spectrum (the three
   stage rays) and their gradient/fill, copied verbatim from the approved mockup —
   identity colors that read on both light and dark planes. */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { formatBytes } from './lineageView';
import type { RunTechniques } from '../../../types/lineage';

/** Decorative "refraction overview": raw beam → prism → three labelled stage rays.
 *  aria-hidden — the same facts are available accessibly in the run header, stats,
 *  and stage spine. Geometry and stage hues are static; the per-ray technique
 *  labels and the raw-size label reflect the actual run. Ink follows the app
 *  theme so the banner stays legible in light mode. */
export const RefractionBanner: React.FC<{ techniques: RunTechniques; bytes: number }> = ({
  techniques,
  bytes,
}) => {
  const { tokens } = useTheme();
  const ink = tokens.color.text;
  return (
    <div aria-hidden style={{ padding: '12px 20px 6px' }}>
      <svg
        viewBox="0 0 720 210"
        role="img"
        style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 720, margin: '0 auto' }}
      >
        <defs>
          <linearGradient id="r-acq" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={ink.primary} />
            <stop offset="1" stopColor="#26A0BC" />
          </linearGradient>
          <linearGradient id="r-par" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={ink.primary} />
            <stop offset="1" stopColor="#9085E9" />
          </linearGradient>
          <linearGradient id="r-nor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={ink.primary} />
            <stop offset="1" stopColor="#2E9E5B" />
          </linearGradient>
          <linearGradient id="prism-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#26A0BC" stopOpacity="0.5" />
            <stop offset="0.5" stopColor="#9085E9" stopOpacity="0.4" />
            <stop offset="1" stopColor="#2E9E5B" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <line
          x1="18"
          y1="105"
          x2="243"
          y2="105"
          stroke={ink.disabled}
          strokeWidth="6"
          strokeOpacity="0.35"
        />
        <line x1="18" y1="105" x2="243" y2="105" stroke={ink.primary} strokeWidth="2" />
        <text
          x="20"
          y="92"
          fill={ink.secondary}
          fontFamily="ui-monospace,monospace"
          fontSize="11"
          letterSpacing="1"
        >
          RAW · {formatBytes(bytes)}
        </text>
        <polygon
          points="248,52 248,158 320,105"
          fill="url(#prism-fill)"
          stroke={tokens.color.border.strong}
          strokeWidth="1"
        />
        <line x1="320" y1="105" x2="470" y2="56" stroke="url(#r-acq)" strokeWidth="2.5" />
        <line x1="320" y1="105" x2="470" y2="105" stroke="url(#r-par)" strokeWidth="2.5" />
        <line x1="320" y1="105" x2="470" y2="154" stroke="url(#r-nor)" strokeWidth="2.5" />
        <circle cx="470" cy="56" r="4" fill="#26A0BC" />
        <circle cx="470" cy="105" r="4" fill="#9085E9" />
        <circle cx="470" cy="154" r="4" fill="#2E9E5B" />
        <text
          x="486"
          y="52"
          fill="#26A0BC"
          fontFamily="ui-monospace,monospace"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.5"
        >
          ACQUIRE
        </text>
        <text
          x="486"
          y="68"
          fill={ink.disabled}
          fontFamily="ui-monospace,monospace"
          fontSize="10.5"
        >
          {techniques.acquire ? `:${techniques.acquire} → RawScrape` : '→ RawScrape'}
        </text>
        <text
          x="486"
          y="101"
          fill="#9085E9"
          fontFamily="ui-monospace,monospace"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.5"
        >
          PARSE
        </text>
        <text
          x="486"
          y="117"
          fill={ink.disabled}
          fontFamily="ui-monospace,monospace"
          fontSize="10.5"
        >
          {techniques.parse ? `:${techniques.parse} → ExtractedFacts` : '→ ExtractedFacts'}
        </text>
        <text
          x="486"
          y="150"
          fill="#2E9E5B"
          fontFamily="ui-monospace,monospace"
          fontSize="13"
          fontWeight="700"
          letterSpacing="1.5"
        >
          NORMALIZE
        </text>
        <text
          x="486"
          y="166"
          fill={ink.disabled}
          fontFamily="ui-monospace,monospace"
          fontSize="10.5"
        >
          {techniques.normalize ? `:${techniques.normalize} → RecipeContent` : '→ RecipeContent'}
        </text>
      </svg>
    </div>
  );
};
