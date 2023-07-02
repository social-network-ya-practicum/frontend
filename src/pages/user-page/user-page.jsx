// import { useCallback } from 'react';
import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './user-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import MainUserInfo from '../../components/common/main-user-info/main-user-info';
import ContactsUserInfo from '../../components/common/contacts-user-info/contacts-user-info';
import AboutUser from '../../components/common/about-user/about-user';
import Post from '../../components/post/post';

const UserPage = observer(() => {
  const { userStore, contactStore, postsStore } = useStore();
  const { user } = userStore;
  const contactId = useParams();
  const { contact, getContact } = contactStore;
  const { posts, getPostsUser } = postsStore;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/contacts/${contactId.contactId}`) {
      getContact(contactId.contactId);
    }
    getContact(contactId.userId);
  }, [contactId, getContact, location]);

  useEffect(() => {
    if (location.pathname === `/contacts/${contactId.contactId}`) {
      getPostsUser(contactId.contactId);
    }
    getPostsUser(contactId.userId);
  }, [getPostsUser, contactId, location]);

  const postsElements = posts.map((post) => (
    <Post
      {...post}
      post={post}
      id={post.id}
      key={post.id}
      text={post.text}
      author={post.author}
      pubdate={post.pub_date}
      images={post.images}
      likecount={post.like_count}
      currentUser={user}
    />
  ));

  return (
    <section className={styles.userPage}>
      <div className={styles.userPage__container}>
        <MainUserInfo contact={contact} id={user.id} />
        <ContactsUserInfo contact={contact} />
        <AboutUser contact={contact} />
      </div>
      <ul className={styles.userPage__post}>{postsElements}</ul>
    </section>
  );
});

export default UserPage;
