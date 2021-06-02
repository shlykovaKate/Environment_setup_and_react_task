import React from 'react';
import Form from './Form';
import { render, fireEvent, screen } from '@testing-library/react';

describe('<Form />', () => {
  const props = {
    addTask: jest.fn()
  };

  beforeEach(() => {
    render(<Form {...props}/>);
  });

  it('should work', () => {
    const formElement = screen.getByTestId('form-element');
    const inputElement = screen.getByRole('textbox');
    expect(formElement).toBeTruthy();
    expect(inputElement).toBeTruthy();
  });

  it('changing the input value', () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement.getAttribute('value')).toBe('');
    fireEvent.change(inputElement, { target: { value: 'task1' } });
    expect(inputElement.getAttribute('value')).toBe('task1');
  });

  it('submitting form', () => {
    const formElement = screen.getByTestId('form-element');
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'task1' } });
    fireEvent.submit(formElement);
    expect(props.addTask).toHaveBeenNthCalledWith(1, 'task1');
  });

  it('submitting form when the task name is empty', () => {
    const formElement = screen.getByTestId('form-element');
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.submit(formElement);
    expect(props.addTask).not.toHaveBeenCalled();
  });
});
