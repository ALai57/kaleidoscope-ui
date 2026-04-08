import type { Meta, StoryObj } from '@storybook/react';
import { InputTags } from './InputTags';

const meta: Meta<typeof InputTags> = {
  title: 'Inputs/InputTags',
  component: InputTags,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InputTags>;

export const Default: Story = {
  args: {
    options: ['rock', 'jazz', 'blues', 'classical'],
    vals: ['jazz'],
    tagType: 'Genres',
    onAdd: (val) => console.log('Added:', val),
    onRemove: (val) => console.log('Removed:', val),
  },
};

export const Disabled: Story = {
  args: {
    options: ['rock', 'jazz', 'blues'],
    vals: ['rock'],
    tagType: 'Genres',
    disabled: true,
    onAdd: () => {},
    onRemove: () => {},
  },
};
