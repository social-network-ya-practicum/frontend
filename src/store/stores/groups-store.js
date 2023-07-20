import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';
import userStore from './user-store';

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
          const { user } = userStore;
          const userGroups = [];
          this.allGroups = data.results
            .filter((group) => {
              if (group.id === 1) return false;
              if (user?.followings.findIndex((id) => id === group.id) === -1)
                return true;
              userGroups.push(group);
              return false;
            })
            .sort((group1, group2) => {
              if (group1.followers_count > group2.followers_count) return -1;
              if (group1.followers_count < group2.followers_count) return 1;
              return 0;
            });
          this.userGroups = userGroups;
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
