import React, { FC, useCallback, useState } from 'react';
import { ITask } from '../types/types';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid, GridCellParams, GridColDef, GridEditRowsModel } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';

interface TaskListProps {
  tasks: ITask[],
  removeTask: (id: string) => void,
  editTask: (id: string, name: string) => void  
}

const TasksList: FC<TaskListProps> = ({ tasks, removeTask, editTask }: TaskListProps) => {
  const useStyles = makeStyles({
      root: {
        '& .Mui-error': {
          backgroundColor: 'rgb(126,10,15, 0.3)',
          color: '#750f0f',
        }      
      }
    }
  );

  const columns: GridColDef[] = [ 
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
      align: 'center',
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
  ];

  const rows = tasks.map(task => (
    {
      id: task.id,
      name: task.name,
      date: new Date(task.date)      
    }    
  ));

  const classes = useStyles();
  const [editRowsModel, setEditRowsModel] = useState<GridEditRowsModel>({});

  const handleEditCellChange = useCallback(
    ({ id, field, props }) => {
      if (field === 'name') {
        const data = props;
        const isValid = !!(String(data.value).trim());
        const newState: GridEditRowsModel = {};
        newState[id] = {
          ...editRowsModel[id],
          name: { ...props, error: !isValid },
        };

        setEditRowsModel((state) => ({ ...state, ...newState }));
      }
    },
    [editRowsModel]
  );
  
  return (
    <div>
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        editRowsModel={editRowsModel}
        onEditCellChange={handleEditCellChange}
        onEditCellChangeCommitted={params => {
          editTask(String(params.id), String(params.props.value));
        }}
        autoHeight
        disableColumnFilter
      />
    </div>
  );
};

export default TasksList;
