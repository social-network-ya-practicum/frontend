import ProfileBlock from './profile-block';
import '../../index.scss';

export default {
  title: 'Profile Block',
  component: ProfileBlock,
  tags: ['autodocs'],
};

export const AdminExample = {
  args: {
    role: 'admin',
    info: {
      firstName: 'Андрей',
      lastName: 'Иванов',
    },
  },
};

export const UserExample = {
  args: {
    role: 'user',
    info: {
      firstName: 'Юлия',
      lastName: 'Леденцова',
    },
  },
};
