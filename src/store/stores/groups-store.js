import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import { groupsSort } from '../../utils/utils';
import errorStore from './error-store';
import userStore from './user-store';

const { addError } = errorStore;

class GroupsStore {
  search = '';

  searchGroups = [];

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
      .getGroups(`?limit=50&offset=0&search=${this.search}`)
      .then((data) => {
        runInAction(() => {
          if (this.search) {
            this.searchGroups = data.results.sort(groupsSort);
          } else {
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
              .sort(groupsSort);
            this.userGroups = userGroups;
            this.searchGroups = [];
          }
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
