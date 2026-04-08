import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

export interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  maxWidth?: number | undefined;
}

export const Table: React.FC<TableProps> = ({
  rows,
  columns,
  maxWidth = 650,
}) => (
  <Box style={{ height: 400, maxWidth }}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10 },
        },
      }}
      rowHeight={32}
      disableRowSelectionOnClick
    />
  </Box>
);
