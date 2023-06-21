import InfoForm from './info-form';
import '../../index.scss';

export default {
  title: 'InfoForm',
  component: InfoForm,
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
    <InfoForm onSubmit={() => undefined} {...args} />
  </div>
);
