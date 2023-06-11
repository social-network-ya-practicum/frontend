import LoginForm from './login-form';
import '../../index.scss';

export default {
  title: 'LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    onSubmit: () => undefined,
  },
};
