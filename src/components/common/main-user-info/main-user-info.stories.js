import MainUserInfo from './main-user-info';
import '../../../index.scss';

export default {
  title: 'Main User Info',
  component: MainUserInfo,
  tags: ['autodocs'],
};

export const Default = {
  args: {
  },
};

export const Сolleague = {
  args: {
    id: '2',
    contact: {
      id: '1',
      photo: null,
      firstName: 'Юлия',
      middle_name: 'Сергеевна',
      lastName: 'Левакова',
      job_title: 'Бухгалтер',
    },
  }
};

export const Me = {
  args: {
    id: '2',
    contact: {
      id: '2',
      photo: null,
      firstName: 'Юлия',
      middle_name: 'Сергеевна',
      lastName: 'Левакова',
      job_title: 'Бухгалтер',
    },
  }
};