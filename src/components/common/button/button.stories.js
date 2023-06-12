import Button from './button';
import '../../../index.scss';

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
    <Button {...args}>Button</Button>
    <Button disabled {...args}>
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
    <Button variant="secondary" {...args}>
      Button
    </Button>
    <Button variant="secondary" disabled {...args}>
      Button
    </Button>
  </div>
);
