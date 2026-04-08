import React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// @adobe/leonardo-contrast-colors types are not published; use minimal inline types
interface LeonardoColor {
  contrastColorPairs: Record<string, string>;
}

interface LeonardoTheme {
  contrastColorPairs: Record<string, string>;
}

// Dynamically import leonardo to keep this optional
async function buildTheme(
  familyName: string,
  baseColor: string,
  backgroundColor: string,
  lightness: number,
  contrast: number,
  saturation: number,
): Promise<Record<string, string>> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lcc = await import('@adobe/leonardo-contrast-colors' as any);
    const STANDARD_RATIOS = [1.2, 2, 4, 6, 10];

    const color = new lcc.Color({
      name: familyName,
      colorKeys: [baseColor],
      ratios: STANDARD_RATIOS,
    });

    const bgColor = new lcc.BackgroundColor({
      name: 'background',
      colorKeys: [backgroundColor],
      ratios: STANDARD_RATIOS,
    });

    const theme = new lcc.Theme({
      colors: [color],
      backgroundColor: bgColor,
      lightness,
      contrast: contrast / 100,
      saturation,
    });

    return theme.contrastColorPairs as Record<string, string>;
  } catch {
    return {};
  }
}

const StyledPaper = styled(Paper)({
  transition: 'transform 0.3s',
  padding: 'right',
  textAlign: 'center',
  position: 'relative',
});

export interface ColorFamilyProps {
  familyName?: string | undefined;
  baseColor?: string | undefined;
  backgroundColors?: string[] | undefined;
  onChange?: ((color: string) => void) | undefined;
  themeProps?: {
    lightness?: number;
    saturation?: number;
    contrast?: number;
  } | undefined;
}

export const ColorFamily: React.FC<ColorFamilyProps> = ({
  familyName = 'primary',
  baseColor = '#1139c9',
  backgroundColors = [],
  onChange,
  themeProps = {},
}) => {
  const { lightness = 0.1, saturation = 0.1, contrast = 30 } = themeProps;
  const [colorPairs, setColorPairs] = React.useState<
    Array<{ background: string; pairs: Record<string, string> }>
  >([]);

  React.useEffect(() => {
    Promise.all(
      backgroundColors.map((bg) =>
        buildTheme(familyName, baseColor, bg, lightness, contrast, saturation).then(
          (pairs) => ({ background: bg, pairs }),
        ),
      ),
    )
      .then(setColorPairs)
      .catch(console.error);
  }, [familyName, baseColor, backgroundColors, lightness, saturation, contrast]);

  return (
    <StyledPaper>
      <Box sx={{ display: 'inline-flex', paddingRight: '25px' }}>
        {/* Color swatch for the base color */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            border: '3px solid #fff',
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            backgroundColor: baseColor,
          }}
          onClick={() => onChange?.(baseColor)}
          title={`Base: ${baseColor}`}
        />

        {colorPairs.map(({ background, pairs }) => (
          <Box
            key={`bg-${background}`}
            sx={{ backgroundColor: background, padding: '20px' }}
          >
            <Stack spacing={2}>
              {Object.entries(pairs)
                .filter(([k]) => k !== 'background')
                .map(([key, color]) => (
                  <Box
                    key={key}
                    sx={{
                      backgroundColor: color,
                      width: '50px',
                      height: '50px',
                    }}
                    title={`${key}: ${color}`}
                  />
                ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </StyledPaper>
  );
};
