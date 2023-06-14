import UserAddressCard from './user-address-card';

export default {
  title: 'User Address Card',
  component: UserAddressCard,
  tags: ['autodocs'],
};

export const Example = {
  args: {
    info: {
      firstName: 'Эльвира',
      middleName: 'Ароновна',
      lastName: 'Зойкина',
      position: 'Администратор офиса',
    },
    contacts: {
      jobEmail: 'zoykina@yandex.ru',
      jobPhone: '+7 926 567 34 34',
    },
  },
};
