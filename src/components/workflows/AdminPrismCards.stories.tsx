import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { PrismThemeProvider } from '../prism';
import WorkflowCard from './WorkflowCard';
import type { Workflow } from '../../types/workflow';

// Visual QA workbench for Task 2 of the Admin Shell → Prism initiative: proves
// (and lets a human eyeball) that EntityCard/StatusChip-based admin cards
// re-skin correctly under PrismThemeProvider with zero per-card changes.
const workflows: Workflow[] = [
  {
    id: '1',
    name: 'Refactor auth flow',
    description: 'Consolidate all authz through a single helper module.',
    status: 'live',
    is_default: true,
    steps: [
      { id: 's1', workflow_id: '1', position: 0, name: 'Plan', description: '' },
      { id: 's2', workflow_id: '1', position: 1, name: 'Implement', description: '' },
      { id: 's3', workflow_id: '1', position: 2, name: 'Review', description: '' },
    ],
  },
  {
    id: '2',
    name: 'Nightly ingest',
    description: 'Scrape, parse and normalize new recipe sources.',
    status: 'draft',
    is_default: false,
    steps: [{ id: 's1', workflow_id: '2', position: 0, name: 'Scrape', description: '' }],
  },
  {
    id: '3',
    name: 'Archived pipeline',
    description: 'Deprecated import path.',
    status: 'archived',
    is_default: false,
    steps: [],
  },
];

const meta: Meta = {
  title: 'Admin/Prism cards',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const WorkflowCards: StoryObj = {
  render: () => (
    <PrismThemeProvider>
      <Box
        sx={{
          bgcolor: 'background.default',
          p: 4,
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {workflows.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} onEdit={() => {}} onArchive={() => {}} archiving={false} />
        ))}
      </Box>
    </PrismThemeProvider>
  ),
};
