import MainAvatar from './main-avatar';
import '../../index.scss';

export default {
  title: 'MainAvatar',
  component: MainAvatar,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
};

// eslint-disable-next-line no-unused-vars
export const Default = (args) => (
  <div
    style={{
      background: '#f3f9ff',
      padding: 40,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    Временно недоступен(нужно добавить аддон для контекста)
    {/* <MainAvatar onSubmit={() => undefined} {...args} /> */}
  </div>
);
