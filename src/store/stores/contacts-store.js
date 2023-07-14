import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class ContactsStore {
  limit = 10;

  offset = 0;

  isNextPages = false;

  search = '';

  contacts = [];

  error = '';

  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch = (value) => {
    this.search = value;
  };

  setPage = () => {
    this.offset += this.limit;
  };

  getContacts = (isPaging = false) => {
    if (isPaging && (this.offset === 0 || !this.isNextPage)) return;
    if (!isPaging) this.offset = 0;
    this.loading = true;
    api
      .getAddressBook(
        `?limit=${this.limit}&offset=${this.offset}&search=${this.search}`
      )
      .then((data) => {
        runInAction(() => {
          this.contacts = isPaging
            ? [...this.contacts, ...data.results]
            : data.results;
          this.isNextPage = !!data.next;
          this.error = '';
          this.loading = false;
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.error = 'Ошибка при получении данных с сервера';
          this.loading = false;
        });
        addError(err);
      });
  };
}

export default new ContactsStore();
