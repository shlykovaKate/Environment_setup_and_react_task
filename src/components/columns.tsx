import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { GridCellParams, GridAlignment, GridColDef } from '@material-ui/data-grid';

type TgetColumnDefinitions = (removeTask: (id: string) => void) => GridColDef[];

export const getColumnDefinitions: TgetColumnDefinitions = (removeTask: (id: string) => void) => {
  const alignCenter: GridAlignment = 'center';
  return [
    {
      field: 'name',
      type: 'string',
      sortable: false,
      flex: 3,
      editable: true,
      renderHeader: () => (
        <strong>
          {'Title'}
        </strong>
      )
    },
    {
      field: 'date',
      sortable: false,
      flex: 3,
      type: 'dateTime',
      renderHeader: () => (
        <strong>
          {'Date Created/Edited'}
        </strong>
      ),
    },
    {
      field: 'delete',
      sortable: false,
      align: alignCenter,
      flex: 1,
      headerName: ' ',
      renderCell: (params: GridCellParams) => (
        <IconButton
          aria-label='delete'
          onClick={() => removeTask(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ] as GridColDef[];
};
