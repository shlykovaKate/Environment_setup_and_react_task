import React, { useEffect, useState } from 'react';
import Form from './Form';
import TasksList from './TasksList';

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    const res = [
      { id: 1, name: 'AAAAAA' },
      { id: 2, name: 'BBBBBB' }
    ];
    console.log('res', res);
    const tasks = res.map(task => ({
      name: task.name,
      id: task.id
    }));
    setTasks(tasks);
  };

  const removeTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = name => {
    const newTask = {
      name,
      id: tasks[tasks.length - 1].id + 1
    };
    setTasks([...tasks, newTask]);
    console.log(`The task ${name} was added`);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Form addTask={addTask} />
      <hr />
      <TasksList tasks={tasks} removeTask={removeTask} />
    </div>
  );
};

export default Tasks;
