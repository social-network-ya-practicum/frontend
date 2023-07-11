import MainUserInfo from './main-user-info';
import '../../../index.scss';

export default {
  title: 'Main User Info',
  component: MainUserInfo,
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const Сolleague = {
  args: {
    isOwn: false,
    contact: {
      photo: null,
      first_name: 'Юлия',
      middle_name: 'Сергеевна',
      last_name: 'Левакова',
      job_title: 'Бухгалтер',
      department: 'Департамент IT',
    },
  },
};

export const Me = {
  args: {
    isOwn: true,
    contact: {
      photo: null,
      first_name: 'Юлия',
      middle_name: 'Сергеевна',
      last_name: 'Левакова',
      job_title: 'Бухгалтер',
      department: 'Департамент IT',
    },
  },
};
