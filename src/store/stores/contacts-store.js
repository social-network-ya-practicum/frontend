import { makeAutoObservable } from 'mobx';

class ContactsStore {
  contacts = null;

  constructor() {
    makeAutoObservable(this);
  }

  // setContacts(contacts) {
  //   this.contacts = contacts;
  // }
}

export default new ContactsStore();
