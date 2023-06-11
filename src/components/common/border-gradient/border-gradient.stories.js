import BorderGradient from './border-gradient';
import '../../../index.scss';
import Logo from '../../../image/logo.svg';

export default {
  title: 'BorderGradient',
  component: BorderGradient,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: '',
  },
};

export const Small = (args) => (
  <div>
    <BorderGradient size="small" {...args}>
      <img width="100%" src={Logo} alt="Логотип" />
    </BorderGradient>
  </div>
);

export const Medium = (args) => (
  <div>
    <BorderGradient size="medium" {...args}>
      <img width="100%" src={Logo} alt="Логотип" />
    </BorderGradient>
  </div>
);

export const Large = (args) => (
  <div>
    <BorderGradient size="large" {...args}>
      <img width="100%" src={Logo} alt="Логотип" />
    </BorderGradient>
  </div>
);
