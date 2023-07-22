import userStore from './stores/user-store';
import postsStore from './stores/posts-store';
import contactsStore from './stores/contacts-store';
import groupsStore from './stores/groups-store';
import contactStore from './stores/contact-store';
import groupStore from './stores/group-store';
import birthdaysStore from './stores/birthdays-store';
import errorStore from './stores/error-store';

class RootStore {
  userStore = userStore;

  postsStore = postsStore;

  contactsStore = contactsStore;

  groupsStore = groupsStore;

  contactStore = contactStore;

  groupStore = groupStore;

  birthdaysStore = birthdaysStore;

  errorStore = errorStore;
}

export default new RootStore();
