import React from 'react';
import { styled } from '@mui/material/styles';
import MuiSlider, { SliderProps } from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import { ThemeParams } from '@/types/theme';
import {
  SaturationLightnessGrid,
  calculateMarkerCoordinates,
} from './SaturationLightnessGrid';

// Styled components
const ColorWheelEl = styled('div')({
  borderRadius: '50%',
  background: 'conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red)',
});

const ColorBand = styled('div')({
  height: '50px',
  borderRadius: '10px',
  background: 'linear-gradient(to right, red,#ff0,#0f0,#0ff,#00f,#f0f,red)',
});

const Donut = styled('div')({
  borderRadius: '50%',
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  background: 'white',
  boxShadow: 'inset 0 1px 9px 10px rgb(15 10 2 / 60%)',
});

const HueMarkerEl = styled('div')({
  borderRadius: '50%',
  backgroundColor: 'black',
  opacity: '65%',
  position: 'absolute',
});

// Styled slider with no track/rail
const NoTrackSlider = styled(MuiSlider)({
  position: 'absolute',
  '& .MuiSlider-thumb': {
    width: '50px',
    height: '50px',
    top: '0px',
    border: '2px solid black',
  },
  '& .MuiSlider-track': { visibility: 'hidden' },
  '& .MuiSlider-rail': { visibility: 'hidden' },
});

// Math helpers
function hsl(hue: number, saturation: number, lightness: number): string {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Calculate the hue angle in degrees from a mouse event relative to the color wheel.
 * Red is 0 degrees, green is ~120, blue is ~240.
 */
export function calculateAngle(colorWheel: HTMLElement, event: MouseEvent | React.MouseEvent): number {
  const clickX = event.clientX;
  const clickY = event.clientY;

  const rect = colorWheel.getBoundingClientRect();
  const containerX = rect.x;
  const containerY = rect.y;
  const containerW = rect.width;
  const containerH = rect.height;

  const x = containerX - clickX;
  const y = containerY - clickY;

  // Center the container
  const offsetX = containerW / 2;
  const offsetY = containerH / 2;

  const finalX = -(offsetX + x);
  const finalY = offsetY + y;

  const radians = Math.atan2(finalX, finalY);
  const degrees = (radians * 180) / Math.PI;
  return ((degrees + 360) % 360);
}

// Palette state type
export interface PaletteState extends ThemeParams {
  spacing: number;
}

// Sub-components

interface HueMarkerProps {
  hue: number;
  radius: number;
  wheelRadius: number;
  wheelThickness: number;
  opacity?: string | undefined;
}

const HueMarker: React.FC<HueMarkerProps> = ({
  hue,
  radius,
  wheelRadius,
  wheelThickness,
  opacity = '50%',
}) => {
  const offset = wheelRadius - radius;
  const translation = wheelRadius - wheelThickness / 2;

  return (
    <HueMarkerEl
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        left: `${offset}px`,
        top: `${offset}px`,
        opacity,
        transform: `rotate(${hue}deg) translateX(${translation}px)`,
      }}
    />
  );
};

interface MiniSquareProps {
  size: number;
  spacing: number;
  theta: number;
  n: 1 | 2 | 3 | 4 | 5;
  hue: number;
  saturation: number;
  lightness: number;
}

const MiniSquare: React.FC<MiniSquareProps> = ({
  size,
  spacing,
  theta,
  n,
  hue,
  saturation,
  lightness,
}) => {
  const miniSize = size / 6;
  const padding = miniSize / 4;

  const positionMap: Record<number, React.CSSProperties> = {
    1: { left: `${padding}px`, top: `${3 * padding + 2 * miniSize}px` },
    2: { left: `${padding}px`, top: `${2 * padding + miniSize}px` },
    3: { left: `${padding}px`, top: `${padding}px` },
    4: { left: `${2 * padding + miniSize}px`, top: `${padding}px` },
    5: { left: `${3 * padding + 2 * miniSize}px`, top: `${padding}px` },
  };

  const multiplierMap: Record<number, number> = { 1: -2, 2: -1, 3: 0, 4: 1, 5: 2 };
  const multiplier = multiplierMap[n] ?? 0;
  const r = multiplier * spacing;

  const { saturation: newSat, lightness: newL } = calculateMarkerCoordinates({
    baseSaturation: saturation,
    baseLightness: lightness,
    r,
    theta,
  });

  const color = hsl(hue, newSat, newL);

  return (
    <div
      style={{
        width: `${miniSize}px`,
        height: `${miniSize}px`,
        position: 'absolute',
        backgroundColor: color,
        ...positionMap[n],
      }}
    />
  );
};

interface ColorSquaresProps {
  size: number;
  primary: number;
  complementary: number;
  secondary: number;
  tertiary: number;
  saturation: number;
  lightness: number;
  spacing: number;
  theta: number;
}

const ColorSquares: React.FC<ColorSquaresProps> = ({
  size,
  primary,
  complementary,
  secondary,
  tertiary,
  saturation,
  lightness,
  spacing,
  theta,
}) => {
  const squareStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    position: 'relative',
  };

  const squares = [
    { hue: primary, key: 'primary' },
    { hue: tertiary, key: 'tertiary' },
    { hue: secondary, key: 'secondary' },
    { hue: complementary, key: 'complementary' },
  ];

  return (
    <div
      style={{
        width: `${2 * size}px`,
        height: `${2 * size}px`,
        backgroundColor: 'grey',
      }}
    >
      <Stack direction="row">
        {([squares[0], squares[1]] as Array<{ hue: number; key: string }>).map(({ hue, key }) => (
          <div key={key} style={{ ...squareStyle, backgroundColor: hsl(hue, saturation, lightness) }}>
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <MiniSquare
                key={`${key}-${n}`}
                size={size}
                spacing={spacing}
                theta={theta}
                n={n}
                hue={hue}
                saturation={saturation}
                lightness={lightness}
              />
            ))}
          </div>
        ))}
      </Stack>
      <Stack direction="row">
        {([squares[2], squares[3]] as Array<{ hue: number; key: string }>).map(({ hue, key }) => (
          <div key={key} style={{ ...squareStyle, backgroundColor: hsl(hue, saturation, lightness) }}>
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <MiniSquare
                key={`${key}-${n}`}
                size={size}
                spacing={spacing}
                theta={theta}
                n={n}
                hue={hue}
                saturation={saturation}
                lightness={lightness}
              />
            ))}
          </div>
        ))}
      </Stack>
    </div>
  );
};

// Control bar sub-component

interface SaturationBandProps {
  hue: number;
  lightness: number;
  height: number;
  children?: React.ReactNode;
}

const SaturationBand: React.FC<SaturationBandProps> = ({ hue, lightness, height, children }) => (
  <div
    style={{
      height: `${height}px`,
      position: 'relative',
      borderRadius: `${height}px`,
      background: `linear-gradient(to right, ${hsl(hue, 0, lightness)}, ${hsl(hue, 100, lightness)})`,
    }}
  >
    {children}
  </div>
);

interface LightnessBandProps {
  hue: number;
  saturation: number;
  height: number;
  children?: React.ReactNode;
}

const LightnessBand: React.FC<LightnessBandProps> = ({ hue, saturation, height, children }) => (
  <div
    style={{
      height: `${height}px`,
      position: 'relative',
      borderRadius: `${height}px`,
      background: `linear-gradient(to right, ${hsl(hue, saturation, 0)}, ${hsl(hue, saturation, 50)}, ${hsl(hue, saturation, 100)})`,
    }}
  >
    {children}
  </div>
);

interface ColorControlProps {
  maxWidth: number;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  sliderEl: React.ReactNode;
}

const ColorControl: React.FC<ColorControlProps> = ({
  maxWidth,
  value,
  onChange,
  min = 0,
  max = 100,
  sliderEl,
}) => (
  <Box
    className="color-control"
    sx={{ maxWidth: `${maxWidth}px`, position: 'relative', paddingRight: '10px' }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9} className="slider-container">
        {sliderEl}
      </Grid>
      <Grid item xs={3}>
        <Input
          className="slider-input"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          inputProps={{ step: 1, min, max, type: 'number' }}
        />
      </Grid>
    </Grid>
  </Box>
);

// Main ColorWheel component

export interface ColorWheelProps {
  initialPalette?: Partial<PaletteState> | undefined;
  ringThickness?: number | undefined;
  wheelRadius?: number | undefined;
  onChange?: ((params: PaletteState) => void) | undefined;
}

export const ColorWheel: React.FC<ColorWheelProps> = ({
  initialPalette = {},
  ringThickness,
  wheelRadius,
  onChange,
}) => {
  const resolvedWheelRadius = wheelRadius ?? 200;
  const resolvedRingThickness = ringThickness ?? 50;

  const wheelDiameter = resolvedWheelRadius * 2;
  const donutDiameter = 2 * (resolvedWheelRadius - resolvedRingThickness);
  const controlBarThickness = resolvedRingThickness / 2;
  const satLightnessGridWidth = donutDiameter / Math.sqrt(2);

  const [palette, setPalette] = React.useState<PaletteState>({
    hue: initialPalette.hue ?? 0,
    saturation: initialPalette.saturation ?? 50,
    lightness: initialPalette.lightness ?? 50,
    spacing: initialPalette.spacing ?? 15,
    theta: initialPalette.theta ?? 45,
    angle: initialPalette.angle ?? 45,
  });

  const [hueActive, setHueActive] = React.useState(false);
  const colorWheelRef = React.useRef<HTMLDivElement>(null);

  const updatePalette = React.useCallback(
    (updates: Partial<PaletteState>): void => {
      setPalette((prev) => {
        const next = { ...prev, ...updates };
        onChange?.(next);
        return next;
      });
    },
    [onChange],
  );

  const hueMarkerProps = {
    radius: 10,
    wheelRadius: resolvedWheelRadius,
    wheelThickness: resolvedRingThickness,
  };

  return (
    <div style={{ position: 'relative' }}>
      <Stack direction="row">
        {/* Color wheel */}
        <ColorWheelEl
          className="color-wheel"
          ref={colorWheelRef}
          style={{ width: `${wheelDiameter}px`, height: `${wheelDiameter}px` }}
          onMouseDown={() => setHueActive(true)}
          onMouseUp={() => setHueActive(false)}
          onMouseLeave={() => setHueActive(false)}
          onMouseMove={(e) => {
            if (hueActive && colorWheelRef.current) {
              updatePalette({ hue: calculateAngle(colorWheelRef.current, e) });
            }
          }}
          onClick={(e) => {
            if (colorWheelRef.current) {
              updatePalette({ hue: calculateAngle(colorWheelRef.current, e) });
            }
          }}
        >
          {/* Donut cutout */}
          <Donut
            className="thedonut"
            style={{ width: `${donutDiameter}px`, height: `${donutDiameter}px` }}
          >
            {/* Saturation/lightness grid inside donut */}
            {(() => {
              const offset = donutDiameter / 2 - satLightnessGridWidth / 2;
              return (
                <div
                  style={{
                    position: 'relative',
                    transform: `translate(${offset}px,${offset}px)`,
                  }}
                >
                  <SaturationLightnessGrid
                    key={palette.hue}
                    gridSize={satLightnessGridWidth}
                    origin={palette}
                    onChange={updatePalette}
                  />
                </div>
              );
            })()}
          </Donut>

          {/* Hue markers */}
          <HueMarker {...hueMarkerProps} hue={palette.hue + 270} radius={15} />
          <HueMarker {...hueMarkerProps} hue={palette.hue + 90} opacity="10%" />
          <HueMarker {...hueMarkerProps} hue={palette.hue + 90 + palette.angle} opacity="30%" />
          <HueMarker {...hueMarkerProps} hue={palette.hue + 90 - palette.angle} opacity="30%" />
        </ColorWheelEl>

        {/* Color squares */}
        <ColorSquares
          size={resolvedWheelRadius}
          primary={palette.hue}
          complementary={palette.hue + 180}
          secondary={palette.hue + 180 + palette.angle}
          tertiary={palette.hue + 180 - palette.angle}
          saturation={palette.saturation}
          lightness={palette.lightness}
          spacing={palette.spacing}
          theta={palette.theta}
        />
      </Stack>

      <br />

      <Stack direction="column" spacing={3}>
        {/* Hue control */}
        <ColorControl
          maxWidth={wheelDiameter}
          value={palette.hue}
          onChange={(v) => updatePalette({ hue: v })}
          min={0}
          max={360}
          sliderEl={
            <ColorBand style={{ height: `${controlBarThickness}px`, position: 'relative' }}>
              <NoTrackSlider
                sx={{
                  '& .MuiSlider-thumb': { color: hsl(palette.hue, 100, 50) },
                  transform: `translate(0px,${controlBarThickness / 2}px)`,
                }}
                value={(palette.hue / 360) * 100}
                onChange={(_e: Event, v: number | number[]) => {
                  const val = Array.isArray(v) ? (v[0] ?? 0) : v;
                  updatePalette({ hue: (val * 360) / 100 });
                }}
              />
            </ColorBand>
          }
        />

        {/* Saturation control */}
        <ColorControl
          maxWidth={wheelDiameter}
          value={palette.saturation}
          onChange={(v) => updatePalette({ saturation: v })}
          sliderEl={
            <SaturationBand
              hue={palette.hue}
              lightness={palette.lightness}
              height={controlBarThickness}
            >
              <NoTrackSlider
                sx={{
                  '& .MuiSlider-thumb': {
                    color: hsl(palette.hue, palette.saturation, palette.lightness),
                  },
                  transform: `translate(0px,${controlBarThickness / 2}px)`,
                }}
                value={palette.saturation}
                onChange={(_e: Event, v: number | number[]) => {
                  const val = Array.isArray(v) ? (v[0] ?? 0) : v;
                  updatePalette({ saturation: val });
                }}
              />
            </SaturationBand>
          }
        />

        {/* Lightness control */}
        <ColorControl
          maxWidth={wheelDiameter}
          value={palette.lightness}
          onChange={(v) => updatePalette({ lightness: v })}
          sliderEl={
            <LightnessBand
              hue={palette.hue}
              saturation={palette.saturation}
              height={controlBarThickness}
            >
              <NoTrackSlider
                sx={{
                  '& .MuiSlider-thumb': {
                    color: hsl(palette.hue, palette.saturation, palette.lightness),
                  },
                  transform: `translate(0px,${controlBarThickness / 2}px)`,
                }}
                value={palette.lightness}
                onChange={(_e: Event, v: number | number[]) => {
                  const val = Array.isArray(v) ? (v[0] ?? 0) : v;
                  updatePalette({ lightness: val });
                }}
              />
            </LightnessBand>
          }
        />

        {/* Angle control */}
        <Box sx={{ maxWidth: `${wheelDiameter}px` }}>
          <Typography>Secondary angle</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <MuiSlider
                value={palette.angle}
                min={0}
                max={180}
                onChange={(_e, v) => {
                  const val = Array.isArray(v) ? (v[0] ?? 0) : v;
                  updatePalette({ angle: val });
                }}
              />
            </Grid>
            <Grid item>
              <Input
                value={palette.angle}
                onChange={(e) => updatePalette({ angle: Number(e.target.value) })}
                inputProps={{ step: 1, min: 0, max: 180, type: 'number' }}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
};
