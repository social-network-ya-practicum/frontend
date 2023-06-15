import { makeAutoObservable } from 'mobx';

class ContactsStore {
  // Заглушка для токена, в дальнейшем будем брать из куков
  token = 'Token 600e5fa5739de7d4b0902ec01cd63f500b111203';

  search = '';

  page = 1;

  totalPages = 0;

  contacts = null;

  error = '';

  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch = (value) => {
    this.search = value;
  };

  setPage = (value) => {
    this.page = value;
  };

  setTotalPages = (value) => {
    this.totalPages = value;
  };

  setContacts = (data) => {
    this.contacts = data;
  };

  setError = (error) => {
    this.error = error;
  };

  setLoading = (value) => {
    this.loading = value;
  };

  getContacts = () => {
    this.setLoading(true);
    fetch(
      `https://csn.sytes.net/api/v1/addressbook?page=1&search=${this.search}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setContacts(data);
        this.setTotalPages(Math.ceil(data.count / 5));
        this.setError('');
      })
      .catch(() => this.setError('Ошибка при получении данных с сервера'))
      .finally(() => this.setLoading(false));
  };

  getNextPage = () => {
    this.setLoading(true);
    fetch(
      `https://csn.sytes.net/api/v1/addressbook?page=${this.page}&search=${this.search}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${this.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setContacts({
          ...this.contacts,
          ...data,
          results: [...this.contacts.results, ...data.results],
        });
        this.setError('');
        this.setLoading(false);
      })
      .catch(() => this.setError('Ошибка при получении данных с сервера'))
      .finally(() => this.setLoading(false));
  };
}

export default new ContactsStore();
