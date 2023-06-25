import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';

class ContactsStore {
  search = '';

  page = 1;

  contacts = [];

  count = 0;

  error = '';

  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get totalPages() {
    return Math.ceil(this.count / 5);
  }

  setSearch = (value) => {
    this.search = value;
  };

  setPage = (value) => {
    this.page = value;
  };

  resetContacts = () => {
    this.contacts = [];
  };

  getContacts = () => {
    this.loading = true;
    if (this.page > 1) this.page = 1;
    api
      .getAddressBook(`?page=1&search=${this.search}`)
      .then((data) => {
        runInAction(() => {
          this.contacts = data.results;
          this.count = data.count;
          this.error = '';
          this.loading = false;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.error = 'Ошибка при получении данных с сервера';
          this.loading = false;
        });
      });
  };

  getNextPage = () => {
    if (this.page > 1) {
      this.loading = true;
      api
        .getAddressBook(`?page=${this.page}&search=${this.search}`)
        .then((data) => {
          runInAction(() => {
            this.contacts = [...this.contacts, ...data.results];
            this.error = '';
            this.loading = false;
          });
        })
        .catch(() => {
          runInAction(() => {
            this.error = 'Ошибка при получении данных с сервера';
            this.loading = false;
          });
        });
    }
  };
}

export default new ContactsStore();
