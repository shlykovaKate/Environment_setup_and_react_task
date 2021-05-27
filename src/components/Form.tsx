import React, { FC, useState } from 'react';

interface FormProps {
  addTask: (str: string) => void
}

const Form: FC<FormProps> = ({ addTask }: FormProps) => {
  const [value, setValue] = useState<string>('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      addTask(value.trim());
    }
    setValue('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type='text'
          placeholder='Type the task name'
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
    </form>
  );
};

export default Form;
