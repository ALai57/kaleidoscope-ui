import type { Meta, StoryObj } from '@storybook/react';
import { SaturationLightnessGrid } from './SaturationLightnessGrid';

const meta: Meta<typeof SaturationLightnessGrid> = {
  title: 'Colors/SaturationLightnessGrid',
  component: SaturationLightnessGrid,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SaturationLightnessGrid>;

export const Default: Story = {
  args: {
    gridSize: 200,
    origin: {
      hue: 200,
      saturation: 60,
      lightness: 50,
      angle: 45,
      theta: 45,
      spacing: 15,
    },
    onChange: (params) => console.log('Grid changed:', params),
  },
};
