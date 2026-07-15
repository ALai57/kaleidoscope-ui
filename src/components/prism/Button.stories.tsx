import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { Button } from './Button';
import { makeTheme, PRESETS } from '../../theme';

const meta: Meta<typeof Button> = {
  title: 'Prism/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['primary', 'ghost', 'danger', 'subtle'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Save URL' } };

// All four variants under the Prism preset (mono voice, cyan accent, spring
// motion, dark instrument panel) — Prism reads best on its own dark plane.
export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={makeTheme(PRESETS.prism.seed, 'prism')} defaultMode="dark">
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  render: () => (
    <Stack direction="row" spacing={2}>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="subtle">Subtle</Button>
    </Stack>
  ),
};
