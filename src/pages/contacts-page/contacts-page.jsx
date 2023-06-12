import { useState } from 'react';
import styles from './contacts-page.module.scss';
import SearchInput from '../../components/search-input/search-input';
import UserAddressCard from '../../components/user-address-card/user-address-card';

// Заглушка данных
const data = [];
for (let i = 0; i < 10; i += 1) {
  data.push({
    id: i,
    avatar: null,
    info: {
      firstName: 'Эльвира',
      middleName: 'Ароновна',
      lastName: 'Зойкина',
      position: 'Администратор офиса',
    },
    contacts: {
      jobEmail: 'zoykina@yandex.ru',
      jobPhone: '+7 926 567 34 33',
    },
  });
}

function ContactsPage() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <article>
      <SearchInput
        value={searchValue}
        handleChange={setSearchValue}
        mix={styles['mix-search-input']}
      />
      {data.map((employee) => (
        <UserAddressCard
          key={employee.id}
          avatar={employee.avatar}
          info={employee.info}
          contacts={employee.contacts}
        />
      ))}
    </article>
  );
}

export default ContactsPage;
