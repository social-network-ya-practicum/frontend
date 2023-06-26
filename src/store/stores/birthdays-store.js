import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';

class BirthdaysStore {
  birthDays = [];

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
        console.log(err);
        this.isLoading = false;
      });
  };
}

export default new BirthdaysStore();
