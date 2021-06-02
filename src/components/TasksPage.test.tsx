import React from 'react';
import TasksPage from './TasksPage';
import { render, screen, fireEvent, within, cleanup } from '@testing-library/react';
import Storage from '../storage/storage';

describe('<TasksPage />', () => {
  const storage = new Storage();

  beforeEach(() => {
    storage.setData('data', JSON.stringify([
      {
        id: 'c929b973-6cb1-4883-a2a1-f764e9024a2e',
        name: 'task3',
        date: 1622522353474
      },
      {
        id: '3549315b-a22d-4306-ba61-66f07817f2b1',
        name: 'task2',
        date: 1622522348258
      },
      {
        id: '77cf539f-f5c2-4a10-a18d-38de0ecbcdfd',
        name: 'task1',
        date: 1622522343730
      }
    ]));
    render(<TasksPage/>);
  });

  it('should work', () => {
    const formElement = screen.getByTestId('form-element');
    const tasksListElement = screen.getByRole('grid');
    expect(formElement).toBeTruthy();
    expect(tasksListElement).toBeTruthy();
  });

  it('should work when tasks were not created', () => {
    storage.clearData('data');
    cleanup();
    render(<TasksPage/>);
    expect(screen.getAllByRole('row').length).toEqual(1);
  });

  it('should work the addTask function', () => {
    const formElement = screen.getByTestId('form-element');
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new task' } });
    fireEvent.submit(formElement);
    expect(JSON.parse(storage.getData('data'))[0].name).toEqual('new task');
  });

  it('should work the editTask function', () => {
      expect(JSON.parse(window.localStorage.getItem('data'))[0].name).toEqual('task3');
      const rows = screen.getAllByRole('row');
      const taskNameCell = within(rows[1]).getAllByRole('cell')[0];
      fireEvent.dblClick(taskNameCell);
      const inputElement = within(taskNameCell).getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: 'edited task name' } });
      fireEvent.blur(inputElement);
      expect(JSON.parse(storage.getData('data'))[0].name).toEqual('edited task name');
  });

  it('should work the removeTask function', () => {
    expect(JSON.parse(window.localStorage.getItem('data'))[1].name).toEqual('task2');
    const rows = screen.getAllByRole('row');
    const removeCell = within(rows[2]).getAllByRole('cell')[2];
    const removeButton = within(removeCell).getByRole('button');
    fireEvent.click(removeButton);
    expect(JSON.parse(storage.getData('data'))[1].name).toEqual('task1');
  });
});
