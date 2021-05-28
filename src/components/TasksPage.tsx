import React, { FC, useEffect, useState } from 'react';
import Form from './Form';
import TasksList from './TasksList';
import { ITask } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const fetchTasks = () => {    
    const data: ITask[] = JSON.parse(localStorage.getItem('data'));
    setTasks(data);
  };

  const updateLocalStorage = (data: ITask[]) => {
    localStorage.setItem('data', JSON.stringify(data));
  };

  const sortTasks = (tasks: ITask[]) => (
    tasks.sort((a: ITask, b: ITask) => b.date - a.date)
  );

  const editTask = (id: string, newName: string) => {    
    const date = Date.now();

    if (newName?.trim()) {
      const taskId = tasks.findIndex(item => item.id === id);
      tasks[taskId].name = newName;
      tasks[taskId].date = date;
      const sortedTasks = sortTasks([...tasks]);
      setTasks(sortedTasks);
      updateLocalStorage(sortedTasks);
    }
  }; 

  const removeTask = (id: string) => {
    const newlist = tasks.filter(task => task.id !== id);
    setTasks(newlist);
    updateLocalStorage(newlist);
  };

  const addTask = (name: string) => {
    const date = Date.now();
    const newTask = {
      id: uuidv4(),
      name,
      date
    };
    const sortedTasks = sortTasks([...tasks, newTask]);
    console.log('sortedTasks', sortedTasks);
    setTasks(sortedTasks);
    updateLocalStorage(sortedTasks);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Form addTask={addTask} />
      <hr />
      <TasksList tasks={tasks} removeTask={removeTask} editTask={editTask} />
    </>
  );
};

export default TasksPage;
