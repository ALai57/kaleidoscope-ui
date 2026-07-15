import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCard } from './NotificationCard';
import { PrismThemeProvider } from '../prism';

const meta: Meta<typeof NotificationCard> = {
  title: 'Layout/NotificationCard',
  component: NotificationCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const ErrorNotification: Story = {
  args: {
    level: 'error',
    title: 'Connection Error',
    message: 'Failed to connect to the database.',
  },
};

export const WarnNotification: Story = {
  args: {
    level: 'warn',
    title: 'Low Disk Space',
    message: 'Your disk is almost full.',
  },
};

export const InfoNotification: Story = {
  args: {
    level: 'info',
    title: 'Heads up',
    message: 'A new version is available.',
  },
};

// Token-driven: the same component under a Prism-dark ancestor.
export const PrismDark: Story = {
  args: {
    level: 'error',
    title: 'Connection Error',
    message: 'Failed to connect to the database.',
  },
  decorators: [
    (Story) => (
      <PrismThemeProvider>
        <Story />
      </PrismThemeProvider>
    ),
  ],
};
