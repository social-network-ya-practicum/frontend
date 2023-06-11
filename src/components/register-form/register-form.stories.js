import RegisterForm from './register-form';
import '../../index.scss';

export default {
  title: 'RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    onSubmit: () => undefined,
  },
};
