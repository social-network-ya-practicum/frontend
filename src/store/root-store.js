import userStore from './stores/user-store';
import postsStore from './stores/posts-store';
import contactsStore from './stores/contacts-store';

class RootStore {
  userStore = userStore;

  postsStore = postsStore;

  contactsStore = contactsStore;
}

export default new RootStore();
