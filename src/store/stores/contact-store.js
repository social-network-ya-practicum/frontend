import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';

class ContactStore {
  contactRes = [];

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

  getContact = (n) => {
    this.isLoading = true;
    api
      .getUserData(n)
      .then((data) => {
        runInAction(() => {
          this.contactRes = data;
          this.isLoading = false;
        });
      })
      .catch((err) => console.log(err));
  };
}

export default new ContactStore();
