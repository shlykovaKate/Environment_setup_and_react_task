import React, { FC, useEffect, useState } from 'react';
import Form from './Form';
import TasksList from './TasksList';
import { ITask } from '../types/types';

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = () => {    
    const data: ITask[] = JSON.parse(localStorage.getItem('data'));

    if (data?.length) {
      const tasks = data.map(task => ({
        name: task.name,
        id: task.id
      }));
      setTasks(tasks);
    }
  };

  const updateLocalStorage = (data: ITask[]) => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  const editTask = (task: ITask) => {
    const newName: string = prompt('Type new title', task.name);

    if (newName?.trim() && newName !== task.name) {
      const taskId = tasks.findIndex(item => item.id === task.id);
      tasks[taskId].name = newName;
      setTasks([...tasks]);
      updateLocalStorage([...tasks]);      
    }
  };

  const removeTask = (id: number) => {
    const newlist = tasks.filter(task => task.id !== id);
    setTasks(newlist);
    updateLocalStorage(newlist);
  };

  const addTask = (name: string) => {
    const newTask = {
      id: tasks[tasks.length - 1]?.id + 1 || 0,
      name
    };
    setTasks([...tasks, newTask]);
    updateLocalStorage([...tasks, newTask]); 
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Form addTask={addTask} />
      <hr />
      <TasksList tasks={tasks} removeTask={removeTask} editTask={editTask} />
    </div>
  );
};

export default TasksPage;
