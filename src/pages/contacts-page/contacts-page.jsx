import { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './contacts-page.module.scss';
import SearchInput from '../../components/search-input/search-input';
import ContactsList from '../../components/contacts-list/contacts-list';
import usePagingObserver from '../../hooks/use-paging-observer';

const ContactsPage = observer(() => {
  const { contactsStore, userStore } = useStore();
  const {
    offset,
    isNextPage,
    search,
    contacts,
    loading,
    error,
    setPage,
    setSearch,
    getContacts,
  } = contactsStore;
  const {
    user: { id },
  } = userStore;
  const ref = useRef();

  usePagingObserver(ref, loading, setPage, isNextPage);

  useEffect(() => {
    getContacts();
  }, [getContacts, search]);

  useEffect(() => {
    getContacts(true);
  }, [getContacts, offset]);

  return (
    <article>
      <SearchInput
        searchFromStore={search}
        handleChange={setSearch}
        mix={styles.mixSearchInput}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <ContactsList contacts={contacts} userId={id} />
          <div ref={ref} />
        </>
      )}
      {search && !contacts.length && !error && !loading && (
        <p>К сожалению, поиск не дал результатов</p>
      )}
    </article>
  );
});

export default ContactsPage;
