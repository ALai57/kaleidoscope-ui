import type { Meta, StoryObj } from '@storybook/react-vite';
import WorkflowCard from './WorkflowCard';
import type { Workflow } from '../../types/workflow';

const base: Workflow = {
  id: 'wf-1',
  name: 'Autonomous PR review',
  description: 'Runs advisors over an incoming change and drafts a decision.',
  status: 'live',
  is_default: false,
  steps: [],
};

const meta: Meta<typeof WorkflowCard> = {
  title: 'Workflows/WorkflowCard',
  component: WorkflowCard,
  parameters: { layout: 'padded' },
  args: { onEdit: () => {}, onArchive: () => {}, archiving: false },
};

export default meta;
type Story = StoryObj<typeof WorkflowCard>;

export const Live: Story = { args: { workflow: base } };
export const Draft: Story = { args: { workflow: { ...base, status: 'draft' } } };
export const Archived: Story = { args: { workflow: { ...base, status: 'archived' } } };
export const IsDefault: Story = { args: { workflow: { ...base, is_default: true } } };
