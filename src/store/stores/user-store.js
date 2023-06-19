import { makeAutoObservable, runInAction } from 'mobx';
import { getCookie } from '../../utils/utils';
import { TOKEN_NAME } from '../../utils/settings';

class UserStore {
  user = null;

  isLoading = false;

  error = null;

  wasUserRequest = false;

  constructor() {
    makeAutoObservable(this);
  }

  get avatar() {
    return this.user ? this.user?.photo : null;
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
        this.user = res;
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
