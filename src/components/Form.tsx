import React, { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';

interface FormProps {
  addTask: (str: string) => void
}

const Form: FC<FormProps> = ({ addTask }: FormProps) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      addTask(value.trim());
    }
    setValue('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
      <TextField
        label='Type the task title to add it'
        variant='outlined'        
        value={value}
        onChange={handleChange}
        fullWidth
      />
    </form>
  );
};

export default Form;
