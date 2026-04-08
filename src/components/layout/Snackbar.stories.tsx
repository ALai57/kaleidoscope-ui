import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';

const meta: Meta<typeof Snackbar> = {
  title: 'Layout/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Info: Story = {
  args: {
    message: 'This is an informational message',
    level: 'info',
    open: true,
  },
};

export const Success: Story = {
  args: {
    message: 'Operation completed successfully',
    level: 'success',
    open: true,
  },
};

export const Error: Story = {
  args: {
    message: 'Something went wrong!',
    level: 'error',
    open: true,
  },
};
