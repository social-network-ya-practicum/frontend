import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './user-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import UserPageContent from '../../components/layouts/user-page-content/user-page-content';

const UserPage = observer(() => {
  const { userStore, postsStore } = useStore();
  const { user } = userStore;
  const contactId = useParams();
  const { posts, getPostsUser } = postsStore;

  useEffect(() => {
    getPostsUser(contactId.userId);
  }, [contactId, getPostsUser]);

  return (
    <section className={styles.userPage}>
      <UserPageContent
        posts={posts}
        contact={user}
        user={user}
        isOwn="true"
      />
    </section>
  );
});

export default UserPage;
