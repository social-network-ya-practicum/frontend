import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './user-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import UserPageContent from '../../components/user-page-content/user-page-content';

const UserPage = observer(() => {
  const { userStore, postsStore } = useStore();
  const { user } = userStore;
  const { userPosts, getPostsUser, posts } = postsStore;
  console.log('UserPage-userPosts', userPosts);
  console.log('UserPage-posts', posts);

  useEffect(() => {
    getPostsUser(user.id);
  }, [user, getPostsUser]);

  return (
    <section className={styles.userPage}>
      <UserPageContent posts={userPosts} user={user} ownUser={user} isOwn />
    </section>
  );
});

export default UserPage;
