import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  useEffect(
    () => () => {
      contactsStore.setContacts(null);
      contactsStore.setSearch('');
    },
    [contactsStore]
  );

  useEffect(() => {
    contactsStore.getContacts();
    return () => {
      contactsStore.setPage(1);
    };
  }, [contactsStore, contactsStore.search]);

  useEffect(() => {
    if (contactsStore.page > 1) {
      contactsStore.getNextPage();
    }
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
          {contactsStore.contacts?.results.map((employee) => (
            <Link
              key={employee.id}
              to={`/contacts/${employee.id}`}
              className={styles.contactsPage__link}
            >
              <UserAddressCard
                avatar={employee.photo}
                info={{
                  firstName: employee.first_name,
                  middleName: employee.middle_name,
                  lastName: employee.last_name,
                  position: employee.job_title,
                }}
                contacts={{
                  jobEmail: employee.email,
                  jobPhone: employee.corporate_phone_number,
                }}
              />
            </Link>
          ))}
          <div ref={ref} />
        </>
      )}
      {contactsStore.search &&
        !contactsStore.contacts?.count &&
        !contactsStore.error && <p>К сожалению, поиск не дал результатов</p>}
    </article>
  );
});

export default ContactsPage;
