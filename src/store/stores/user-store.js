import { makeAutoObservable, runInAction } from 'mobx';
import { deleteCookie, getCookie, setCookie } from '../../utils/utils';
import { COOKIES_OPTIONS, TOKEN_NAME, dates } from '../../utils/settings';
import api from '../../utils/main-api';

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
            ? dates[user.birthday_month].month
            : 'Январь',
          bio: user?.bio ?? '',
          photo: user?.photo ?? null,
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

  logout = () => {
    api.logout().catch((err) => console.log(err));
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
        // Для develoop ---------------
        alert(err.message);
        // ---------------------------
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
        // Для develoop ---------------
        alert(err.message);
        // ---------------------------
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
      .catch((err) => alert(err))
      .finally(() => {
        this.setIsLoading(false);
      });
  };

  patchUserAvatar = (data) => {
    this.setIsLoadingAvatar(true);
    this.setError(null);
    api
      .patchUserAvatar(data)
      .then((res) => {
        this.setUserRes(res);
      })
      .catch((err) => alert(err))
      .finally(() => {
        this.setIsLoadingAvatar(false);
      });
  };
}

export default new UserStore();
