import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './contacts-page.module.scss';
import SearchInput from '../../components/search-input/search-input';
import ContactsList from '../../components/contacts-list/contacts-list';
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
          <ContactsList contacts={contactsStore.contacts} />
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
