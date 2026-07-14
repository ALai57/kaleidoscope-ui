/* eslint-disable no-restricted-syntax -- decorative, aria-hidden prism SVG; the
   gradient stopColor/fill/stroke hues are static and copied verbatim from the
   approved mockup. SVG paint attributes can't read JS theme tokens, and this
   graphic is purely illustrative (the same facts are available accessibly
   elsewhere), so hardcoding the hex values here is intentional. */
import * as React from 'react';
import { formatBytes } from './lineageView';
import type { RunTechniques } from '../../../types/lineage';

/** Decorative "refraction overview": raw beam → prism → three labelled stage rays.
 *  aria-hidden — the same facts are available accessibly in the run header, stats,
 *  and stage spine. Geometry and stage hues are static; the per-ray technique
 *  labels and the raw-size label reflect the actual run. */
export const RefractionBanner: React.FC<{ techniques: RunTechniques; bytes: number }> = ({
  techniques,
  bytes,
}) => (
  <div aria-hidden style={{ padding: '12px 20px 6px' }}>
    <svg
      viewBox="0 0 720 210"
      role="img"
      style={{ width: '100%', height: 'auto', display: 'block', maxWidth: 720, margin: '0 auto' }}
    >
      <defs>
        <linearGradient id="r-acq" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9EEF6" /><stop offset="1" stopColor="#26A0BC" />
        </linearGradient>
        <linearGradient id="r-par" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9EEF6" /><stop offset="1" stopColor="#9085E9" />
        </linearGradient>
        <linearGradient id="r-nor" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9EEF6" /><stop offset="1" stopColor="#2E9E5B" />
        </linearGradient>
        <linearGradient id="prism-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#26A0BC" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#9085E9" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2E9E5B" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <line x1="18" y1="105" x2="243" y2="105" stroke="#5C6A7E" strokeWidth="6" strokeOpacity="0.35" />
      <line x1="18" y1="105" x2="243" y2="105" stroke="#E9EEF6" strokeWidth="2" />
      <text x="20" y="92" fill="#93A1B5" fontFamily="ui-monospace,monospace" fontSize="11" letterSpacing="1">
        RAW · {formatBytes(bytes)}
      </text>
      <polygon points="248,52 248,158 320,105" fill="url(#prism-fill)" stroke="rgba(148,170,200,0.24)" strokeWidth="1" />
      <line x1="320" y1="105" x2="470" y2="56" stroke="url(#r-acq)" strokeWidth="2.5" />
      <line x1="320" y1="105" x2="470" y2="105" stroke="url(#r-par)" strokeWidth="2.5" />
      <line x1="320" y1="105" x2="470" y2="154" stroke="url(#r-nor)" strokeWidth="2.5" />
      <circle cx="470" cy="56" r="4" fill="#26A0BC" />
      <circle cx="470" cy="105" r="4" fill="#9085E9" />
      <circle cx="470" cy="154" r="4" fill="#2E9E5B" />
      <text x="486" y="52" fill="#26A0BC" fontFamily="ui-monospace,monospace" fontSize="13" fontWeight="700" letterSpacing="1.5">ACQUIRE</text>
      <text x="486" y="68" fill="#5C6A7E" fontFamily="ui-monospace,monospace" fontSize="10.5">
        {techniques.acquire ? `:${techniques.acquire} → RawScrape` : '→ RawScrape'}
      </text>
      <text x="486" y="101" fill="#9085E9" fontFamily="ui-monospace,monospace" fontSize="13" fontWeight="700" letterSpacing="1.5">PARSE</text>
      <text x="486" y="117" fill="#5C6A7E" fontFamily="ui-monospace,monospace" fontSize="10.5">
        {techniques.parse ? `:${techniques.parse} → ExtractedFacts` : '→ ExtractedFacts'}
      </text>
      <text x="486" y="150" fill="#2E9E5B" fontFamily="ui-monospace,monospace" fontSize="13" fontWeight="700" letterSpacing="1.5">NORMALIZE</text>
      <text x="486" y="166" fill="#5C6A7E" fontFamily="ui-monospace,monospace" fontSize="10.5">
        {techniques.normalize ? `:${techniques.normalize} → RecipeContent` : '→ RecipeContent'}
      </text>
    </svg>
  </div>
);
