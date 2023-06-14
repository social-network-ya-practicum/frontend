import { useState } from 'react';
import SearchInput from './search-input';
import '../../index.scss';

export default {
  title: 'SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    value: '',
    handleChange: () => {},
    mix: '',
  },
};

export const Filled = (args) => {
  const [value, setValue] = useState('');

  const handleInput = (newValue) => setValue(newValue);

  return <SearchInput value={value} handleChange={handleInput} {...args} />;
};
