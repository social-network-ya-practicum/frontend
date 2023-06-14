import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './contacts-page.module.scss';
import SearchInput from '../../components/search-input/search-input';
import UserAddressCard from '../../components/user-address-card/user-address-card';
import usePagingObserver from '../../hooks/use-paging-observer';

// Заглушка получения для токена, в дальнейшем будем брать из хранилища
const token = 'Token 600e5fa5739de7d4b0902ec01cd63f500b111203';

function ContactsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  usePagingObserver(ref, loading, page, totalPages, setPage);

  useEffect(() => {
    setLoading(true);
    fetch(`https://csn.sytes.net/api/v1/addressbook?page=1&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setPage(1);
        setTotalPages(Math.ceil(data.count / 5));
        setError('');
      })
      .catch(() => setError('Ошибка при получении данных с сервера'))
      .finally(() => setLoading(false));
  }, [search]);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      fetch(
        `https://csn.sytes.net/api/v1/addressbook?page=${page}&search=${search}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setContacts({
            ...contacts,
            ...data,
            results: [...contacts.results, ...data.results],
          });
          setError('');
        })
        .catch(() => setError('Ошибка при получении данных с сервера'))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <article>
      <SearchInput
        value={search}
        handleChange={setSearch}
        mix={styles['mix-search-input']}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {contacts?.results.map((employee) => (
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
      {search && !contacts?.count && !error && (
        <p>К сожалению, поиск не дал результатов</p>
      )}
    </article>
  );
}

export default ContactsPage;
