import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class ContactStore {
  contactRes = null;

  error = null;

  isLoading = false;

  get contact() {
    const contact = this.contactRes;
    return contact
      ? {
          id: contact?.id ?? null,
          last_name: contact?.last_name ?? '',
          first_name: contact?.first_name ?? '',
          middle_name: contact?.middle_name ?? '',
          job_title: contact?.job_title ?? '',
          email: contact?.email ?? '',
          personal_email: contact?.personal_email ?? '',
          corporate_phone_number: contact?.corporate_phone_number ?? '',
          personal_phone_number: contact?.personal_phone_number ?? '',
          birthday_day: contact?.birthday_day
            ? String(contact.birthday_day)
            : '1',
          birthday_month: contact?.birthday_month
            ? String(contact.birthday_month)
            : '1',
          bio: contact?.bio ?? '',
          photo: contact?.photo ?? null,
        }
      : contact;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setContactRes = (res) => {
    this.contactRes = res;
  };

  setError = (error) => {
    this.error = error;
  };

  setIsLoading = (bool) => {
    this.isLoading = bool;
  };

  getContact = (n) => {
    this.setIsLoading(true);
    api
      .getUserData(n)
      .then((data) => {
        runInAction(() => {
          this.setContactRes(data);
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
}

export default new ContactStore();
