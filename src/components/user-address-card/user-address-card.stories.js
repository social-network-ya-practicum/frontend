import { BrowserRouter } from 'react-router-dom';
import UserAddressCard from './user-address-card';

export default {
  title: 'User Address Card',
  component: UserAddressCard,
  tags: ['autodocs'],
};

export const Example = (args) => (
  <BrowserRouter>
    <UserAddressCard
      linkPath="1"
      firstName="Эльвира"
      middleName="Ароновна"
      lastName="Зойкина"
      position="Администратор офиса"
      jobEmail="zoykina@yandex.ru"
      jobPhone="+7 926 567 34 34"
      {...args}
    />
  </BrowserRouter>
);
