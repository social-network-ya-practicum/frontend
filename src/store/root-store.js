import userStore from './stores/user-store';
import postsStore from './stores/posts-store';
import contactsStore from './stores/contacts-store';
import contactStore from './stores/contact-store';

class RootStore {
  userStore = userStore;

  postsStore = postsStore;

  contactsStore = contactsStore;

  contactStore = contactStore;
}

export default new RootStore();
