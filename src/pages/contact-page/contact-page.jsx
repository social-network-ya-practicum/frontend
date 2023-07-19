import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './contact-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import UserPageContent from '../../components/user-page-content/user-page-content';

const ContactPage = observer(() => {
  const { contactStore, postsStore, userStore } = useStore();
  const { contact, getContact } = contactStore;
  const { userPosts, getPostsUser, cleanUserPosts, posts, isLoading } =
    postsStore;
  const { user } = userStore;

  console.log('ContactPage-userPosts', userPosts);
  console.log('ContactPage-posts', posts);
  console.log('ContactPage-isLoading', isLoading);

  const { contactId } = useParams();

  useEffect(() => {
    cleanUserPosts();
    return () => {
      cleanUserPosts();
    };
  }, [cleanUserPosts]);

  const shouldUpdContact = useMemo(
    () => !contact || contactId !== String(contact.id),
    [contact, contactId]
  );

  useEffect(() => {
    if (shouldUpdContact) {
      getContact(contactId);
    }
    if (contact && contactId === String(contact.id)) {
      getPostsUser(contactId);
    }
  }, [contactId, getContact, getPostsUser, contact, shouldUpdContact]);

  if (shouldUpdContact) return null;

  return (
    <section className={styles.userPage}>
      <UserPageContent posts={userPosts} user={contact} ownUser={user} />
    </section>
  );
});

export default ContactPage;
