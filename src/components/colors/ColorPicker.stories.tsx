import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, BasicColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Colors/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    initialColor: '#1139c9',
    collapsable: false,
    onChange: (color) => console.log('Color changed:', color),
  },
};

export const Collapsable: Story = {
  args: {
    initialColor: '#FF5733',
    collapsable: true,
    onChange: (color) => console.log('Color changed:', color),
  },
};

export const BasicPicker: StoryObj<typeof BasicColorPicker> = {
  render: () => (
    <BasicColorPicker
      color="#00CED1"
      onChange={(color) => console.log('Color:', color)}
    />
  ),
};
