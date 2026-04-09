import React, { type ComponentType } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

export interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  maxWidth?: number | string | undefined;
  rowHeight?: number;
  Toolbar?: ComponentType;
  toolbarProps?: Record<string, unknown>;
}

export const Table: React.FC<TableProps> = ({
  rows,
  columns,
  maxWidth = 650,
  rowHeight = 40,
  Toolbar,
  toolbarProps,
}) => (
  <Box sx={{ maxWidth, mx: 'auto' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 },
        },
      }}
      rowHeight={rowHeight}
      disableRowSelectionOnClick
      slots={Toolbar ? { toolbar: Toolbar } : undefined}
      slotProps={toolbarProps ? { toolbar: toolbarProps } : undefined}
    />
  </Box>
);
