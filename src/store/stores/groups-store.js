import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class GroupsStore {
  search = '';

  allGroups = [];

  userGroups = [];

  error = '';

  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch = (value) => {
    this.search = value;
  };

  getGroups = () => {
    this.loading = true;
    api
      .getGroups()
      .then((data) => {
        runInAction(() => {
          this.allGroups = data.results;
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

export default new GroupsStore();
