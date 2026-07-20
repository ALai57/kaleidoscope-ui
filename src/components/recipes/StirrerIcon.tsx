import React from 'react';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

/**
 * "The Stirrer" — a toqued line-cook with a two-joint arm (shoulder + elbow)
 * whose wrist sweeps a spoon laterally inside the pot, steam rising above and
 * heat flickering below. Drawn on the 24-unit icon grid, entirely in
 * `currentColor` so it inherits the host's text color in both contexts (cyan on
 * the idle chip, dark-on-cyan in the active pill) — the same token-driven trick
 * `LiveDot` uses.
 *
 * When `active`, the stir/steam/heat animations run; otherwise (and under
 * `prefers-reduced-motion`) it renders a static composed frame.
 */

// Small shoulder + elbow flex; the spoon's wrist pivot stays the dominant motion
// so the tip sweeps side-to-side in the pot rather than lifting out.
const stirLateral = keyframes`0%,100%{transform:rotate(-23deg)}50%{transform:rotate(23deg)}`;
const stirUpper = keyframes`0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}`;
const stirFore = keyframes`0%,100%{transform:rotate(6deg)}50%{transform:rotate(-7deg)}`;
const steamRise = keyframes`0%{opacity:0;transform:translateY(2px) scaleY(.7)}18%{opacity:.65}100%{opacity:0;transform:translateY(-17px) scaleY(1.1)}`;
const heatRise = keyframes`0%{opacity:0;transform:translateY(1px)}35%{opacity:.85}100%{opacity:0;transform:translateY(-3px)}`;

export interface StirrerIconProps {
  /** Run the animation. Off renders a static frame. */
  active?: boolean;
  /** Rendered width/height in px (square). */
  size?: number;
  className?: string;
}

const Svg = styled('svg', { shouldForwardProp: (p) => p !== 'active' })<{ active?: boolean }>(({
  theme,
  active,
}) => {
  const easeOut = theme.tokens?.motion.easing.easeOut ?? 'cubic-bezier(0.16, 1, 0.3, 1)';
  const STIR = 1500; // ms — one back-and-forth stir
  const anim = (kf: string, dur: number, delay = 0, ease = 'ease-in-out'): string | undefined =>
    active ? `${kf} ${dur}ms ${ease} ${delay}ms infinite` : undefined;
  return {
    display: 'block',
    // Articulated arm — origins in view-box coordinates, animation only when active.
    '& .st-upper': {
      transformBox: 'view-box',
      transformOrigin: '6.9px 9.2px',
      animation: anim(stirUpper, STIR),
    },
    '& .st-fore': {
      transformBox: 'view-box',
      transformOrigin: '9.3px 10.3px',
      animation: anim(stirFore, STIR),
    },
    '& .st-spoon': {
      transformBox: 'view-box',
      transformOrigin: '12px 11px',
      animation: anim(stirLateral, STIR),
    },
    '& .st-steam': { transformBox: 'view-box' },
    '& .st-steam1': { transformOrigin: '9.5px 14px', animation: anim(steamRise, 2600, 0, easeOut) },
    '& .st-steam2': {
      transformOrigin: '15px 14px',
      animation: anim(steamRise, 2600, 900, easeOut),
    },
    '& .st-heat1': { animation: anim(heatRise, 900) },
    '& .st-heat2': { animation: anim(heatRise, 900, 300) },
    '& .st-heat3': { animation: anim(heatRise, 900, 600) },
    '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none' } },
  };
});

export const StirrerIcon: React.FC<StirrerIconProps> = ({
  active = false,
  size = 20,
  className,
}) => (
  <Svg
    active={active}
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    data-testid="stirrer-icon"
    data-active={active ? 'true' : 'false'}
  >
    <g
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* pot */}
      <path d="M7 15 H18" />
      <path d="M8.5 15 V18 a2 2 0 0 0 2 2 H15 a2 2 0 0 0 2 -2 V15" />
      {/* head + pleated toque (scalloped dome over a distinct band) */}
      <circle cx="6.7" cy="6.6" r="2" />
      <path
        d="M4.5 3.6 C 3.5 2.9, 3.9 1.3, 5.1 1.5 C 5.2 0.5, 8.0 0.5, 8.1 1.5 C 9.3 1.3, 9.7 2.9, 8.7 3.6 Z"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <path
        d="M4.7 3.6 h4 v1.1 a0.5 0.5 0 0 1 -0.5 0.5 h-3 a0.5 0.5 0 0 1 -0.5 -0.5 Z"
        fill="currentColor"
        fillOpacity="0.16"
      />
      {/* neck + body */}
      <path d="M6.7 8.6 V12.2" />
      {/* two-joint arm: shoulder -> elbow -> wrist; spoon sweeps laterally in the pot */}
      <g className="st-upper">
        <path d="M6.9 9.2 L9.3 10.3" />
        <g className="st-fore">
          <path d="M9.3 10.3 L12 11" />
          <g className="st-spoon">
            <path d="M12 11 L12 16" />
          </g>
        </g>
      </g>
    </g>
    {/* steam */}
    <g stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round">
      <path className="st-steam st-steam1" d="M9.5 14 q -1.2 -1.8 0 -3.4 q 1.2 -1.6 0 -3.2" />
      <path className="st-steam st-steam2" d="M15 14 q 1.2 -1.8 0 -3.4 q -1.2 -1.6 0 -3.2" />
    </g>
    {/* heat below the pot */}
    <g stroke="currentColor" fill="none" strokeWidth="1.6" strokeLinecap="round">
      <path className="st-heat1" d="M10 21.8 v1.9" />
      <path className="st-heat2" d="M12.5 22.2 v1.9" />
      <path className="st-heat3" d="M15 21.8 v1.9" />
    </g>
  </Svg>
);

export default StirrerIcon;
