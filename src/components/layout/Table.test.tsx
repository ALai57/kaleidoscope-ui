import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Table } from './Table';
import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const rows = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
  { id: 3, name: 'Carol White', email: 'carol@example.com' },
];

describe('Table', () => {
  it('renders without errors', () => {
    const { container } = render(<Table rows={rows} columns={columns} />);
    expect(container).toBeDefined();
  });

  it('renders column headers', () => {
    render(<Table rows={rows} columns={columns} />);
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('renders row data', () => {
    render(<Table rows={rows} columns={columns} />);
    expect(screen.getByText('Alice Smith')).toBeTruthy();
    expect(screen.getByText('Bob Jones')).toBeTruthy();
  });

  it('renders with custom maxWidth', () => {
    const { container } = render(
      <Table rows={rows} columns={columns} maxWidth={800} />,
    );
    expect(container).toBeDefined();
  });
});
