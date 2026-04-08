import type { Meta, StoryObj } from '@storybook/react';
import { ColorFamily } from './ColorFamily';

const meta: Meta<typeof ColorFamily> = {
  title: 'Colors/ColorFamily',
  component: ColorFamily,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ColorFamily>;

export const Default: Story = {
  args: {
    familyName: 'primary',
    baseColor: '#1139c9',
    backgroundColors: ['#ffffff', '#333333'],
    themeProps: {
      lightness: 0.1,
      saturation: 0.1,
      contrast: 30,
    },
  },
};
