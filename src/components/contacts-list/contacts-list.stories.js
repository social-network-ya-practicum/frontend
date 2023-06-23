import { BrowserRouter } from 'react-router-dom';
import ContactsList from './contacts-list';

export default {
  title: 'Contacts List',
  component: ContactsList,
  tags: ['autodocs'],
};

export const Example = (args) => (
  <BrowserRouter>
    <ContactsList
      contacts={[
        {
          id: '1',
          photo: '',
          first_name: 'Эльвира',
          middle_name: 'Ароновна',
          last_name: 'Зойкина',
          job_title: 'Администратор офиса',
          email: 'zoykina@yandex.ru',
          corporate_phone_number: '+7 926 567 34 34',
        },
        {
          id: '2',
          photo: '',
          first_name: 'Эльвира',
          middle_name: 'Ароновна',
          last_name: 'Зойкина',
          job_title: 'Администратор офиса',
          email: 'zoykina@yandex.ru',
          corporate_phone_number: '+7 926 567 34 34',
        },
      ]}
      {...args}
    />
  </BrowserRouter>
);
