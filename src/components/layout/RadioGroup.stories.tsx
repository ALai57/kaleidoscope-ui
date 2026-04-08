import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Layout/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    groupName: 'Notification Type',
    value: 'modal',
    elements: [
      { value: 'modal', label: 'Modal' },
      { value: 'snackbar', label: 'Snackbar' },
      { value: 'none', label: 'None' },
    ],
  },
};
