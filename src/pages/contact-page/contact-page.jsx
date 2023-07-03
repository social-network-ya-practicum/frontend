import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './contact-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import UserPageContent from '../../components/layouts/user-page-content/user-page-content';

const ContactPage = observer(() => {
  const { userStore, contactStore, postsStore } = useStore();
  const { user } = userStore;
  const { contact, getContact } = contactStore;
  const contactId = useParams();
  const { posts, getPostsUser } = postsStore;

  const isOwn = contact.id === user.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (isOwn) {
      navigate(`/${user.id}`);
    }
    getContact(contactId.contactId);
    getPostsUser(contactId.contactId);
  }, [contactId, getContact, getPostsUser, isOwn, navigate, user]);

  return (
    <section className={styles.userPage}>
      <UserPageContent
        posts={posts}
        contact={contact}
        user={user}
        isOwn={isOwn}
      />
    </section>
  );
});

export default ContactPage;
