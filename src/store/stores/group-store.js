import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class GroupStore {
  groupRes = null;

  error = null;

  isLoading = false;

  userGroups = [];

  get group() {
    const group = this.groupRes;
    return group
      ? {
          id: group?.id ?? null,
          title: group?.title ?? '',
          description: group?.description ?? '',
          followers_count: group?.followers_count ?? null,
          image_link: group?.image_link ?? '',
          followers: group?.followers ?? [],
          posts_group: group?.posts_group ?? [],
        }
      : group;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setGroupRes = (res) => {
    this.groupRes = res;
  };

  setError = (error) => {
    this.error = error;
  };

  setIsLoading = (bool) => {
    this.isLoading = bool;
  };

  // хак для обновления постов на странице группы при изменении поста
  updateGroup = () => {
    if (this.groupRes) this.getGroup(this.groupRes.id);
  };

  getGroup = (n) => {
    this.setIsLoading(true);
    api
      .getGroup(n)
      .then((data) => {
        runInAction(() => {
          this.setGroupRes(data);
          this.setIsLoading(false);
        });
      })
      .catch((err) => {
        runInAction(() => {
          this.setError(err);
          this.setIsLoading(false);
        });
        addError(err);
      });
  };

  postGroup = (data) => {
    this.setIsLoading(true);
    api
      .postGroup(data)
      .then((group) => {
        runInAction(() => {
          const userGroups = [];
          userGroups.push(group);
          this.userGroups = userGroups;
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  deleteGroup = (id) => {
    this.setIsLoading(true);
    api
      .deleteGroup(id)
      .then(() => {
        runInAction(() => {
          this.userGroups = this.userGroups.filter((group) => group.id !== id);
          // const userGroups = [];
          // userGroups.push(group);
          // this.userGroups = userGroups;
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };
}

export default new GroupStore();
