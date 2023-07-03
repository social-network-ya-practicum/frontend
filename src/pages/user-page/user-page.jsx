import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './user-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import UserPageContent from '../../components/user-page-content/user-page-content';

const UserPage = observer(() => {
  const { userStore, postsStore } = useStore();
  const { user } = userStore;
  const { userPosts, getPostsUser } = postsStore;

  useEffect(() => {
    getPostsUser(user.id);
  }, [user, getPostsUser]);

  return (
    <section className={styles.userPage}>
      <UserPageContent posts={userPosts} user={user} isOwn />
    </section>
  );
});

export default UserPage;
