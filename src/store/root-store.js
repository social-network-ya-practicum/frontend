import userStore from './stores/user-store';
import postsStore from './stores/posts-store';
import contactsStore from './stores/contacts-store';
import contactStore from './stores/contact-store';
import birthdaysStore from './stores/birthdays-store';
import errorStore from './stores/error-store';

class RootStore {
  userStore = userStore;

  postsStore = postsStore;

  contactsStore = contactsStore;

  contactStore = contactStore;

  birthdaysStore = birthdaysStore;

  errorStore = errorStore;
}

export default new RootStore();
