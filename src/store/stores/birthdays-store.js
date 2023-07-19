import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class BirthdaysStore {
  birthDays = null;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  getBirthdays = () => {
    this.isLoading = true;
    api
      .getBirthdayList()
      .then((data) => {
        runInAction(() => {
          this.birthDays = data;
        });
      })
      .catch((err) => {
        addError(err);
        this.isLoading = false;
      });
  };
}

export default new BirthdaysStore();
