import { makeAutoObservable, runInAction } from 'mobx';
import { getCookie } from '../../utils/utils';
import { TOKEN_NAME } from '../../utils/settings';

class UserStore {
  userRes = null;

  isLoading = false;

  error = null;

  wasUserRequest = false;

  get user() {
    const user = this.userRes;
    return user
      ? {
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
        }
      : user;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading = (value) => {
    this.isLoading = value;
  };

  setError = (error) => {
    this.error = error;
  };

  getUser = async () => {
    const token = getCookie(TOKEN_NAME);
    if (!token) {
      this.wasUserRequest = true;
      return;
    }
    runInAction(() => {
      this.setIsLoading(true);
      this.error = null;
    });

    try {
      // -----------------------------------------------------------------------------
      // Тестовый захардкоженый запрос за юзером
      // После - заменить на запрос из api

      const res = await fetch('https://csn.sytes.net/api/v1/users/me', {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }).then((result) =>
        result.ok
          ? result.json()
          : result.json().then((r) => {
              throw new Error(JSON.stringify(r));
            })
      );

      // -----------------------------------------------------------------------------

      runInAction(() => {
        this.userRes = res;
        this.setIsLoading(false);
        if (!this.wasUserRequest) this.wasUserRequest = true;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err;
        this.setIsLoading(false);
        if (!this.wasUserRequest) this.wasUserRequest = true;
      });
      // Для develoop ---------------
      alert(err.message);
      // ---------------------------
    }
  };
}

export default new UserStore();
