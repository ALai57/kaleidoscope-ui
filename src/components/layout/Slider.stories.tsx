import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Layout/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    title: 'Volume',
    initialValue: 50,
    min: 0,
    max: 100,
  },
};

export const WithRange: Story = {
  args: {
    title: 'Hue',
    initialValue: 180,
    min: 0,
    max: 360,
  },
};
