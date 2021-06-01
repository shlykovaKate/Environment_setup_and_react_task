import React, { FC, useEffect, useState } from 'react';
import Form from './Form';
import TasksList from './TasksList';
import { ITask } from '../types/types';
import Storage from '../storage/storage';
import { v4 as uuidv4 } from 'uuid';

const TasksPage: FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const storage  = new Storage();

  const fetchTasks = () => {    
    const data: ITask[] = JSON.parse(storage.getData('data'));
    if (data?.length) {      
      setTasks(data);
    }
  };

  const updateStorage = (data: ITask[]) => {
    storage.setData('data', JSON.stringify(data));
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
      updateStorage(sortedTasks);
    }
  }; 

  const removeTask = (id: string) => {
    const newlist = tasks.filter(task => task.id !== id);
    setTasks(newlist);
    updateStorage(newlist);
  };

  const addTask = (name: string) => {
    const date = Date.now();
    const newTask = {
      id: uuidv4(),
      name,
      date
    };
    const sortedTasks = sortTasks([...tasks, newTask]);
    setTasks(sortedTasks);
    updateStorage(sortedTasks);
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
