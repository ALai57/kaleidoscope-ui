import type { Meta, StoryObj } from '@storybook/react';
import { EditorToolbar } from './EditorToolbar';
import { createMockEditor } from '@/test/mockEditor';

const meta: Meta<typeof EditorToolbar> = {
  title: 'Editor/EditorToolbar',
  component: EditorToolbar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof EditorToolbar>;

export const Default: Story = {
  args: {
    editor: createMockEditor(),
  },
};

export const WithActiveStates: Story = {
  args: {
    editor: createMockEditor({
      isActive: (name: string) => ['bold', 'italic', 'underline'].includes(name),
    }),
  },
};

export const WithImageButton: Story = {
  args: {
    editor: createMockEditor(),
    onInsertImage: () => alert('Insert image clicked'),
  },
};

export const NullEditor: Story = {
  args: {
    editor: null,
  },
};
