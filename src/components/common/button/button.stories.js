import Button from './button';
import '../../../index.scss';
import avatar from './images/sbExampleAfter.svg';

export default {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: 'Button',
  },
};

export const Primary = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Button width="100%" {...args}>
      Button
    </Button>
    <Button width="100%" disabled {...args}>
      Button
    </Button>
    <Button width="max-content" {...args}>
      Button
    </Button>
    <Button width="max-content" disabled {...args}>
      Button
    </Button>
  </div>
);

export const Secondary = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Button width="100%" variant="secondary" {...args}>
      Button
    </Button>
    <Button width="100%" variant="secondary" disabled {...args}>
      Button
    </Button>
    <Button variant="secondary" width="max-content" {...args}>
      Button
    </Button>
    <Button variant="secondary" width="max-content" disabled {...args}>
      Button
    </Button>
  </div>
);

export const Text = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Button variant="text" outlined {...args}>
      Лента
    </Button>
    <Button variant="text" outlined active {...args}>
      Лента
    </Button>
    <Button variant="text" {...args}>
      <span style={{ marginRight: '8px' }}>Юзер</span>
      <img src={avatar} alt="avatar" />
    </Button>
  </div>
);
