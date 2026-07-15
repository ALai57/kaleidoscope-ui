import React, { type ComponentType } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import type { SxProps, Theme } from '@mui/material/styles';

export interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  maxWidth?: number | string | undefined;
  rowHeight?: number;
  Toolbar?: ComponentType;
}

const gridSx: SxProps<Theme> = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: (t) => `${t.shape.borderRadius}px`,
  '& .MuiDataGrid-columnHeaders': { borderColor: 'divider' },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontFamily: (t) => t.tokens?.typography.mono ?? 'monospace',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'text.secondary',
  },
  '& .MuiDataGrid-columnSeparator': { display: 'none' },
  '& .MuiDataGrid-cell': { borderColor: 'divider', fontVariantNumeric: 'tabular-nums' },
  // Drop the default (mouse-click) focus outline, but keep a visible keyboard
  // focus ring for a11y — a token accent ring on :focus-visible.
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': { outline: 'none' },
  '& .MuiDataGrid-cell:focus-visible': {
    outline: '2px solid',
    outlineColor: 'primary.main',
    outlineOffset: '-2px',
  },
  '& .MuiDataGrid-row:hover': { backgroundColor: 'action.hover' },
  '& .MuiDataGrid-footerContainer': { borderColor: 'divider' },
};

export const Table: React.FC<TableProps> = ({
  rows,
  columns,
  maxWidth = 650,
  rowHeight = 40,
  Toolbar,
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
      pageSizeOptions={[10, 25, 50]}
      disableRowSelectionOnClick
      sx={gridSx}
      {...(Toolbar ? { slots: { toolbar: Toolbar }, showToolbar: true } : {})}
    />
  </Box>
);
