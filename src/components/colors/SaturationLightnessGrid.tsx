import React from 'react';
import { ThemeParams } from '@/types/theme';

export interface SaturationLightnessGridProps {
  gridSize: number;
  origin: ThemeParams & { saturation: number; lightness: number; spacing?: number; theta?: number };
  onChange: (params: SaturationLightnessGridProps['origin']) => void;
}


function hsl(hue: number, saturation: number, lightness: number): string {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function radToDeg(rad: number): number {
  return (180 * rad) / Math.PI;
}

function clamp(val: number, min = 0, max = 100): number {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

function euclideanDistance(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
): number {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export function calculateSLCoordinates(
  gridEl: HTMLElement,
  event: MouseEvent | React.MouseEvent,
): { saturation: number; lightness: number } {
  const rect = gridEl.getBoundingClientRect();
  const eventX = event.clientX;
  const eventY = event.clientY;

  const x = rect.x - eventX;
  const y = rect.y - eventY;
  const saturation = -(x / rect.width) * 100;
  const lightness = (y / rect.height) * 100 + 100;

  return { saturation, lightness };
}

export function calculateMarkerCoordinates({
  baseSaturation,
  baseLightness,
  r = 20,
  theta = -45,
}: {
  baseSaturation: number;
  baseLightness: number;
  r?: number;
  theta?: number;
}): { saturation: number; lightness: number } {
  const dx = Math.cos(degToRad(theta)) * r;
  const dy = Math.sin(degToRad(theta)) * r;
  return {
    saturation: baseSaturation + dx,
    lightness: baseLightness + dy,
  };
}

interface MarkerProps {
  borderSize: number;
  radius: number;
  opacity?: number | undefined;
  unitsFromOrigin: number;
  baseSaturation: number;
  baseLightness: number;
  r: number;
  theta: number;
  activate: (event: React.MouseEvent) => void;
  deactivate: (event: React.MouseEvent) => void;
}

const CenteredDot: React.FC<{ radius: number; opacity?: number; unitsFromOrigin: number }> = ({
  radius,
  opacity = 50,
  unitsFromOrigin,
}) => (
  <div
    className="centered"
    style={{
      position: 'relative',
      transform: `translateX(-${radius}px) translateY(-${radius}px)`,
    }}
  >
    <div
      className="dot"
      data-units={unitsFromOrigin}
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        opacity: `${opacity}%`,
        borderRadius: '50%',
        position: 'relative',
        background: 'white',
      }}
    />
  </div>
);

const Marker: React.FC<MarkerProps> = ({
  borderSize,
  radius,
  opacity = 30,
  unitsFromOrigin,
  baseSaturation,
  baseLightness,
  r,
  theta,
  activate,
  deactivate,
}) => {
  const { saturation, lightness } = calculateMarkerCoordinates({
    baseSaturation,
    baseLightness,
    r,
    theta,
  });
  const normalizedSaturation = borderSize * (saturation / 100);
  const normalizedLightness = -(borderSize * (lightness / 100));

  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation();
        activate(e);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        deactivate(e);
      }}
      style={{
        position: 'relative',
        transform: `translateX(${normalizedSaturation}px) translateY(${normalizedLightness}px)`,
      }}
    >
      <div
        className="origin-bottom-left"
        style={{
          position: 'absolute',
          transform: `translateY(${borderSize}px)`,
        }}
      >
        <CenteredDot
          radius={radius}
          unitsFromOrigin={unitsFromOrigin}
          opacity={opacity}
        />
      </div>
    </div>
  );
};

export const SaturationLightnessGrid: React.FC<SaturationLightnessGridProps> = ({
  gridSize,
  origin,
  onChange,
}) => {
  const gridRef = React.useRef<HTMLDivElement>(null);
  const activeElementRef = React.useRef<HTMLElement | null>(null);

  const gridStyle: React.CSSProperties = {
    width: `${gridSize}px`,
    height: `${gridSize}px`,
    position: 'absolute',
  };

  const isOriginMarker = (el: HTMLElement): boolean =>
    el.getAttribute('data-units') === '0';

  const handleMouseMove = (event: React.MouseEvent): void => {
    event.stopPropagation();
    const active = activeElementRef.current;
    if (!active || !gridRef.current) return;

    const coords = calculateSLCoordinates(gridRef.current, event);

    if (isOriginMarker(active)) {
      const saturation = clamp(coords.saturation);
      const lightness = clamp(coords.lightness);
      const updated = { ...origin, saturation, lightness };
      onChange(updated);
    } else {
      const saturation = clamp(coords.saturation);
      const lightness = clamp(coords.lightness);
      const unitsFromOrigin = parseInt(active.getAttribute('data-units') ?? '1', 10);

      const newSpacing =
        euclideanDistance([saturation, lightness], [origin.saturation, origin.lightness]) /
        unitsFromOrigin;

      const dx = origin.saturation - saturation;
      const dy = origin.lightness - lightness;
      const newTheta = 90 - radToDeg(Math.atan2(dx, dy));

      onChange({ ...origin, spacing: newSpacing, theta: newTheta });
    }
  };

  const backgrounds = [
    hsl(origin.hue, 100, 50),
    'linear-gradient(to right, #fff, rgba(255,255,255,0))',
    'linear-gradient(to top, #000, rgba(0,0,0,0))',
  ];

  const spacing = origin.spacing ?? 15;
  const theta = origin.theta ?? 45;

  return (
    <div
      ref={gridRef}
      onMouseMove={handleMouseMove}
      onMouseUp={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      style={{ position: 'absolute', ...gridStyle, zIndex: 100 }}
    >
      {backgrounds.map((bg) => (
        <div
          key={`bg-${bg}`}
          style={{ ...gridStyle, background: bg }}
        />
      ))}

      {[-2, -1, 0, 1, 2].map((n) => (
        <Marker
          key={`marker-${n}`}
          unitsFromOrigin={n}
          activate={(e) => {
            const dot = (e.target as HTMLElement).closest('.dot') as HTMLElement | null;
            activeElementRef.current = dot;
          }}
          deactivate={() => {
            activeElementRef.current = null;
          }}
          radius={10}
          borderSize={gridSize}
          baseSaturation={origin.saturation}
          baseLightness={origin.lightness}
          opacity={n === 0 ? 70 : 30}
          r={n * spacing}
          theta={theta}
        />
      ))}
    </div>
  );
};
