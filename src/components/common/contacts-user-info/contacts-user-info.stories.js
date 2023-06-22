import ContactsUserInfo from './contacts-user-info';
import '../../../index.scss';

export default {
  title: 'Contacts User Info',
  component: ContactsUserInfo,
  tags: ['autodocs'],
};

export const Default = {
  args: {
  },
};

export const Example = {
  args: {
    contact: {
      email: 'user@user.com',
      corporate_phone_number: '+ 7 (495) 999 99 99',
      personal_email: '—',
      personal_phone_number: '—',
    }
  }
};
