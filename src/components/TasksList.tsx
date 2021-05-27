import React, { FC } from 'react';
import { ITask } from '../types/types';

interface TaskListProps {
  tasks: ITask[],
  removeTask: (num: number) => void,
  editTask: (task: ITask) => void
}

const TasksList: FC<TaskListProps> = ({ tasks, removeTask, editTask }: TaskListProps) => (
  <ul>
    {tasks.map(task => (
      <li
        key={task.id}
      >
        <span onClick={() => editTask(task)}>{task.name}</span>
        <button
          type="button"
          onClick={() => removeTask(task.id)}
        >
          &times;
        </button>
      </li>
    ))}
  </ul>
);

export default TasksList;
