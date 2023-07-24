import React from 'react';
import PropTypes from 'prop-types';
import styles from './user-page-content.module.scss';
import MainUserInfo from '../common/main-user-info/main-user-info';
import ContactsUserInfo from '../common/contacts-user-info/contacts-user-info';
import AboutUser from '../common/about-user/about-user';
import Post from '../post/post';

function UserPageContent({ posts, user, ownUser, isOwn }) {
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
      postslikes={post.likes}
      comments={post.comments}
      currentUser={ownUser}
    />
  ));

  return (
    <section className={styles.userPage}>
      <div className={styles.userPage__container}>
        <MainUserInfo user={user} isOwn={isOwn} />
        <ContactsUserInfo user={user} />
        <AboutUser user={user} />
      </div>
      <ul className={styles.userPage__post}>{postsElements}</ul>
    </section>
  );
}

export default UserPageContent;

const userType = PropTypes.shape({
  photo: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  middle_name: PropTypes.string,
  job_title: PropTypes.string,
  id: PropTypes.number,
  email: PropTypes.string,
  corporate_phone_number: PropTypes.string,
  personal_email: PropTypes.string,
  personal_phone_number: PropTypes.string,
  birthday_day: PropTypes.string,
  birthday_month: PropTypes.string,
  bio: PropTypes.string,
});

UserPageContent.propTypes = {
  user: userType.isRequired,
  posts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  isOwn: PropTypes.bool,
  ownUser: userType.isRequired,
};

UserPageContent.defaultProps = {
  isOwn: false,
};
