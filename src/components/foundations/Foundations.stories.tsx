import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { makeTokens } from '../../theme/tokens';
import type { TypographyStep } from '../../theme/tokens';
import { BASE_THEME } from '../../theme';
import { contrastRatio, onColor } from '../../theme/contrast';

const tokens = makeTokens(BASE_THEME);

const meta: Meta = {
  title: 'Foundations/Overview',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

// Only solid hex/hsl values can be contrast-measured (rgba borders/text can't).
const canMeasure = (v: string) => /^#|^hsl/i.test(v.trim());

const Swatch = ({ name, value }: { name: string; value: string }) => {
  const measurable = canMeasure(value);
  const fg = measurable ? onColor(value) : undefined;
  return (
    <Box
      sx={{
        width: 132,
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ height: 56, bgcolor: value, color: fg, display: 'flex', alignItems: 'flex-end', p: 0.5 }}>
        {measurable && fg && (
          <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
            {contrastRatio(fg, value).toFixed(1)}:1
          </Typography>
        )}
      </Box>
      <Box sx={{ p: 0.75 }}>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.62rem' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const Group = ({ title, entries }: { title: string; entries: [string, string][] }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
      {entries.map(([name, value]) => (
        <Swatch key={name} name={name} value={value} />
      ))}
    </Stack>
  </Box>
);

export const Colors: Story = {
  render: () => {
    const c = tokens.color;
    return (
      <Box>
        <Group title="Brand" entries={Object.entries(c.brand)} />
        <Group title="Status" entries={Object.entries(c.status)} />
        <Group title="Surface" entries={Object.entries(c.surface)} />
        <Group title="Border" entries={Object.entries(c.border)} />
        <Group title="Text" entries={Object.entries(c.text)} />
      </Box>
    );
  },
};

export const Typography_: Story = {
  name: 'Typography',
  render: () => {
    const steps = Object.keys(tokens.typography.scale) as TypographyStep[];
    return (
      <Stack spacing={1.5}>
        {steps.map((step) => {
          const s = tokens.typography.scale[step];
          return (
            <Box key={step} sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ width: 64, flexShrink: 0 }}>
                {step}
              </Typography>
              <Box sx={{ fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight }}>
                The quick brown fox
              </Box>
              <Typography variant="caption" color="text.disabled">
                {s.fontSize} · {s.fontWeight}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    );
  },
};

export const SpacingAndRadius: Story = {
  render: () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Spacing
      </Typography>
      <Stack spacing={1} sx={{ mb: 3 }}>
        {Object.entries(tokens.space).map(([name, px]) => (
          <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="caption" sx={{ width: 40 }}>
              {name}
            </Typography>
            <Box sx={{ height: 12, width: px, bgcolor: 'primary.main', borderRadius: 0.5 }} />
            <Typography variant="caption" color="text.secondary">
              {px}px
            </Typography>
          </Box>
        ))}
      </Stack>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Radius
      </Typography>
      <Stack direction="row" spacing={2}>
        {Object.entries(tokens.radius).map(([name, px]) => (
          <Box key={name} sx={{ textAlign: 'center' }}>
            <Box
              sx={{ width: 64, height: 64, bgcolor: 'primary.main', borderRadius: `${Math.min(px, 32)}px` }}
            />
            <Typography variant="caption" sx={{ display: 'block' }}>
              {name} ({px})
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
};

export const Elevation: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ p: 3 }}>
      {Object.entries(tokens.elevation).map(([name, shadow]) => (
        <Box key={name} sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 88, height: 64, bgcolor: 'background.paper', borderRadius: 1, boxShadow: shadow }} />
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
            {name}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
};
