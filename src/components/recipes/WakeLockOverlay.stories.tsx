import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '@mui/material/Box';
import { WakeLockOverlayView } from './WakeLockOverlay';
import { PrismThemeProvider } from '../prism';

const meta: Meta<typeof WakeLockOverlayView> = {
  title: 'Recipes/WakeLockOverlay',
  component: WakeLockOverlayView,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof WakeLockOverlayView>;

/** Off (idle) — the compact chip with its cyan ring. */
export const Off: Story = {
  render: () => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', minHeight: 260 }}>
        <WakeLockOverlayView active={false} onToggle={() => {}} />
      </Box>
    </PrismThemeProvider>
  ),
};

/** On (active) — the expanded cyan pill with the animated Stirrer. */
export const On: Story = {
  render: () => (
    <PrismThemeProvider>
      <Box sx={{ bgcolor: 'background.default', minHeight: 260 }}>
        <WakeLockOverlayView active onToggle={() => {}} />
      </Box>
    </PrismThemeProvider>
  ),
};

/** Interactive — click to see the chip expand into the pill. */
export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    return (
      <PrismThemeProvider>
        <Box sx={{ bgcolor: 'background.default', minHeight: 260 }}>
          <WakeLockOverlayView active={active} onToggle={() => setActive((a) => !a)} />
        </Box>
      </PrismThemeProvider>
    );
  },
};
