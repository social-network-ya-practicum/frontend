import FakePost from './fake-post';
import '../../../index.scss';

export default {
  title: 'FakePost',
  component: FakePost,
  tags: ['autodocs'],
};

export const First = {
  args: {
    variant: 'first',
  },
};

export const Second = {
  args: {
    variant: 'second',
  },
};
