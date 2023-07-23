import SearchInput from './search-input';
import '../../../index.scss';

export default {
  title: 'SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    searchFromStore: '',
    handleChange: () => {},
    mix: '',
  },
};
