import type { Meta, StoryObj } from '@storybook/react';
import { ColorWheel } from './ColorWheel';

const meta: Meta<typeof ColorWheel> = {
  title: 'Colors/ColorWheel',
  component: ColorWheel,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ColorWheel>;

export const Default: Story = {
  args: {
    initialPalette: {
      hue: 200,
      saturation: 60,
      lightness: 50,
      angle: 45,
      theta: 45,
      spacing: 15,
    },
    onChange: (params) => console.log('Palette changed:', params),
  },
};

export const RedHue: Story = {
  args: {
    initialPalette: {
      hue: 0,
      saturation: 80,
      lightness: 50,
      angle: 60,
      theta: 30,
      spacing: 20,
    },
  },
};
