import { makeAutoObservable, runInAction } from 'mobx';
import { deleteCookie, getCookie, setCookie } from '../../utils/utils';
import { COOKIES_OPTIONS, TOKEN_NAME } from '../../utils/settings';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class UserStore {
  userRes = null;

  isLoading = false;

  isLoadingAvatar = false;

  error = null;

  wasUserRequest = false;

  get user() {
    const user = this.userRes;
    return user
      ? {
          id: user?.id ?? null,
          last_name: user?.last_name ?? '',
          first_name: user?.first_name ?? '',
          middle_name: user?.middle_name ?? '',
          job_title: user?.job_title ?? '',
          email: user?.email ?? '',
          personal_email: user?.personal_email ?? '',
          corporate_phone_number: user?.corporate_phone_number ?? '',
          personal_phone_number: user?.personal_phone_number ?? '',
          birthday_day: user?.birthday_day ? String(user.birthday_day) : '1',
          birthday_month: user?.birthday_month
            ? String(user.birthday_month)
            : '1',
          bio: user?.bio ?? '',
          photo: user?.photo ?? null,
          followings: user?.followings ?? [],
          department: user?.department ?? '',
        }
      : user;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setError = (error) => {
    this.error = error;
  };

  setWasUserRequest = (bool) => {
    this.wasUserRequest = bool;
  };

  setUserRes = (res) => {
    this.userRes = res;
  };

  setIsLoading = (bool) => {
    this.isLoading = bool;
  };

  setIsLoadingAvatar = (bool) => {
    this.isLoadingAvatar = bool;
  };

  logout = (isInvalidToken = false) => {
    if (!isInvalidToken) {
      api.logout().catch((err) => addError(err));
    }
    deleteCookie(TOKEN_NAME);
    this.setUserRes(null);
  };

  login = ({ email, password }) => {
    this.setError(null);
    this.setIsLoading(true);
    api
      .login({ email, password })
      .then((res) => {
        const token = res.auth_token;
        setCookie(TOKEN_NAME, token, COOKIES_OPTIONS);
        this.getUser();
      })
      .catch((err) => {
        runInAction(() => {
          this.setError(err);
          this.setIsLoading(false);
        });
        addError(err);
      });
  };

  getUser = () => {
    const token = getCookie(TOKEN_NAME);
    if (!token) {
      this.setWasUserRequest(true);
      return;
    }
    runInAction(() => {
      this.setIsLoading(true);
      this.setError(null);
    });

    api
      .getCurrentUserData()
      .then((res) => this.setUserRes(res))
      .catch((err) => {
        this.setError(err);
        addError(err);
      })
      .finally(() => {
        this.setIsLoading(false);
        if (!this.wasUserRequest) this.setWasUserRequest(true);
      });
  };

  patchUser = (data) => {
    this.setIsLoading(true);
    this.setError(null);
    api
      .patchUserData(data)
      .then((res) => {
        this.setUserRes(res);
      })
      .catch((err) => addError(err))
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  patchUserAvatar = async (data) => {
    this.setIsLoadingAvatar(true);
    this.setError(null);
    let isSuccess = false;
    try {
      const res = await api.patchUserData(data);
      this.setUserRes(res);
      isSuccess = true;
    } catch (err) {
      addError(err);
    } finally {
      this.setIsLoadingAvatar(false);
    }
    return isSuccess;
  };
}

export default new UserStore();
