import MainAvatar from './main-avatar';
import '../../index.scss';
import foto from './imagesSb/template.jpg';

export default {
  title: 'MainAvatar',
  component: MainAvatar,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    avatar: {
      options: ['withFoto', 'withoutFoto'],
      mapping: { withFoto: foto, withoutFoto: null },
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
    <MainAvatar onSubmit={() => undefined} {...args} />
  </div>
);
