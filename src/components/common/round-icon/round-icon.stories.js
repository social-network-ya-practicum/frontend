import RoundIcon from './round-icon';
import '../../../index.scss';
import DefaultAvatar from '../../../image/default-avatar.svg';

export default {
  title: 'RoundIcon',
  component: RoundIcon,
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const Small = (args) => (
  <div>
    <RoundIcon size="small" src={DefaultAvatar} alt="Логотип" {...args} />
  </div>
);

export const Medium = (args) => (
  <div>
    <RoundIcon size="medium" src={DefaultAvatar} alt="Логотип" {...args} />
  </div>
);

export const Large = (args) => (
  <div>
    <RoundIcon size="large" src={DefaultAvatar} alt="Логотип" {...args} />
  </div>
);
