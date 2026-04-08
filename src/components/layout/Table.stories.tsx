import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'User ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 120 },
];

const rows = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'User' },
];

const meta: Meta<typeof Table> = {
  title: 'Layout/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    rows,
    columns,
    maxWidth: 650,
  },
};
