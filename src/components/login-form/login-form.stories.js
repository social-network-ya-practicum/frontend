import LoginForm from './login-form';
import '../../index.scss';

export default {
  title: 'LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
};

export const Default = (args) => (
  <div
    style={{
      background: '#f3f9ff',
      padding: 40,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <LoginForm onSubmit={() => undefined} {...args} />
  </div>
);
