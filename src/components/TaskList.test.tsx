import React from 'react';
import TasksList from './TasksList';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';

describe('<TasksList />', () => {
  const props = {
    removeTask: jest.fn(),
    editTask: jest.fn(),
    tasks: [
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
    ]
  };

  beforeEach(() => {
    render(<TasksList {...props}/>);
  });

  it('should work', () => {
    const tasksListElement = screen.getByRole('grid');
    expect(tasksListElement).toBeTruthy();
    const rows = screen.getAllByRole('row');
    expect(rows.length).toEqual(4);
  });

  it('editing task', async() => {
    const rows = screen.getAllByRole('row');
    const taskNameCell = within(rows[1]).getAllByRole('cell')[0];
    fireEvent.dblClick(taskNameCell);
    const inputElement = within(taskNameCell).getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'task4' } });
    expect(inputElement.getAttribute('value')).toBe('task4');
    fireEvent.blur(inputElement);
    await waitFor(() => expect(props.editTask).toHaveBeenCalledWith('c929b973-6cb1-4883-a2a1-f764e9024a2e', 'task4'));
  });

  it('editing task if new task name is empty', async() => {
    const rows = screen.getAllByRole('row');
    const taskNameCell = within(rows[1]).getAllByRole('cell')[0];
    fireEvent.dblClick(taskNameCell);
    const inputElement = within(taskNameCell).getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.blur(inputElement);
    await waitFor(() => expect(props.editTask).not.toHaveBeenCalled());
  });

  it('removing task', () => {
    const rows = screen.getAllByRole('row');
    const removeCell = within(rows[1]).getAllByRole('cell')[2];
    const removeButton = within(removeCell).getByRole('button');
    fireEvent.click(removeButton);
    expect(props.removeTask).toHaveBeenCalledWith('c929b973-6cb1-4883-a2a1-f764e9024a2e');
  });
});
