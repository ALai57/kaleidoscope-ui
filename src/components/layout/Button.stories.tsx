import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Layout/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Click me',
    color: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled',
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary',
    color: 'secondary',
  },
};
