import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './contacts-page.module.scss';
import SearchInput from '../../components/search-input/search-input';
import UserAddressCard from '../../components/user-address-card/user-address-card';
import usePagingObserver from '../../hooks/use-paging-observer';

const ContactsPage = observer(() => {
  const { contactsStore } = useStore();
  const ref = useRef();

  usePagingObserver(
    ref,
    contactsStore.loading,
    contactsStore.page,
    contactsStore.totalPages,
    contactsStore.setPage
  );

  useEffect(() => () => contactsStore.resetContacts(), [contactsStore]);

  useEffect(() => {
    contactsStore.getContacts();
  }, [contactsStore, contactsStore.search]);

  useEffect(() => {
    contactsStore.getNextPage();
  }, [contactsStore, contactsStore.page]);

  return (
    <article>
      <SearchInput
        value={contactsStore.search}
        handleChange={contactsStore.setSearch}
        mix={styles['mix-search-input']}
      />
      {contactsStore.error ? (
        <p>{contactsStore.error}</p>
      ) : (
        <>
          {contactsStore.contacts.map((employee) => (
            <UserAddressCard
              key={employee.id}
              id={employee.id}
              avatar={employee.photo}
              firstName={employee.first_name}
              middleName={employee.middle_name}
              lastName={employee.last_name}
              position={employee.job_title}
              jobEmail={employee.email}
              jobPhone={employee.corporate_phone_number}
            />
          ))}
          <div ref={ref} />
        </>
      )}
      {contactsStore.search && !contactsStore.count && !contactsStore.error && (
        <p>К сожалению, поиск не дал результатов</p>
      )}
    </article>
  );
});

export default ContactsPage;
