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
  const { userStore, contactStore } = useStore();
  const { user } = userStore;
  const contactId = useParams();
  const { contact, getContact } = contactStore;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/contacts/${contactId.contactId}`) {
      getContact(contactId.contactId);
    }
    getContact(contactId.userId);
  }, [contactId, getContact, location]);

  // --------------------------------------------------------
  // Добавить после изменения компонента Post
  /* 
  useEffect(() => {
    postsStore.getPosts();
  }, [postsStore]);

  const postsElements = postsStore.posts.map((post) => (
    <Post
      {...post}
      post={post}
      id={post.id}
      key={post.id}
      text={post.text}
      author={post.author}
      pubdate={post.pub_date}
      images={post.images[0]}
      likecount={post.like_count}
    />
  ));
  // ---------------------------------------------------------
  */

  return (
    <section className={styles['user-page']}>
      <div className={styles['user-page__container']}>
        <MainUserInfo contact={contact} id={user.id} />
        <ContactsUserInfo contact={contact} />
        <AboutUser contact={contact} />
      </div>
      <div className={styles['user-page__post']}>
        <Post
        // text={text}
        // author={author}
        // pubdate={pubdate}
        // images={images}
        // likecount={likecount}
        />
      </div>
    </section>
  );
});

export default UserPage;
