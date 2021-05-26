/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Form = ({ addTask }) => {
  const [value, setValue] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    if (value.trim()) {
      addTask(value.trim());
    }
    setValue('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Type the task name'
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
    </form>
  );
};

export default Form;
