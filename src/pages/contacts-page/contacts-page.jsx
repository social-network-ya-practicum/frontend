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
    contacts,
    count,
    search,
    page,
    totalPages,
    loading,
    error,
    resetContacts,
    setPage,
    setSearch,
    getContacts,
    getNextPage,
  } = contactsStore;
  const {
    user: { id },
  } = userStore;
  const ref = useRef();

  usePagingObserver(ref, loading, page, totalPages, setPage);

  useEffect(() => () => resetContacts(), [resetContacts]);

  useEffect(() => {
    getContacts();
  }, [getContacts, search]);

  useEffect(() => {
    getNextPage();
  }, [getNextPage, page]);

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
      {search && !count && !error && (
        <p>К сожалению, поиск не дал результатов</p>
      )}
    </article>
  );
});

export default ContactsPage;
