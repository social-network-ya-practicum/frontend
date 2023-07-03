import React from 'react';
import PropTypes from 'prop-types';
import styles from './user-page-content.module.scss';
import MainUserInfo from '../../common/main-user-info/main-user-info';
import ContactsUserInfo from '../../common/contacts-user-info/contacts-user-info';
import AboutUser from '../../common/about-user/about-user';
import Post from '../../post/post';

function UserPageContent({ posts, contact, isOwn, user }) {

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
        <MainUserInfo contact={contact} isOwn={isOwn} />
        <ContactsUserInfo contact={contact} />
        <AboutUser contact={contact} />
      </div>
      <ul className={styles.userPage__post}>{postsElements}</ul>
    </section>
  );
};

export default UserPageContent;

UserPageContent.propTypes = {
  contact: PropTypes.arrayOf,
  user: PropTypes.arrayOf,
  posts: PropTypes.arrayOf,
  isOwn: PropTypes.bool,
};

UserPageContent.defaultProps = {
  contact: [],
  user: [],
  posts: [],
  isOwn: false,
};
