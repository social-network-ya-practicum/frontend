import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ReactComponent as LikeIcon } from './images/like-icon.svg';
import { ReactComponent as MoreIcon } from './images/more-icon.svg';
import { data } from './data';
import styles from './fake-post.module.scss';

const FakePost = ({ mix, variant }) => {
  const { userImg, userName, date, text, likes, commentatorImg } =
    data[variant];

  const cnPost = clsx(styles.post, mix);
  return (
    <div className={cnPost}>
      <div className={styles.post__header}>
        <img src={userImg} alt="Аватар" className={styles.post__userAvatar} />
        <div className={styles.post__userInfo}>
          <span className={styles.post__userName}>{userName}</span>
          <span className={styles.post__textSecondary}>{date}</span>
        </div>
        {variant === 'first' && <MoreIcon className={styles.post__moreIcon} />}
      </div>
      <p className={styles.post__message}>{text}</p>
      <div className={styles.post__footer}>
        <LikeIcon />
        <span className={styles.post__likeCount}>{likes}</span>
      </div>
      <div className={styles.post__comment}>
        <img
          src={commentatorImg}
          alt="Аватар"
          className={styles.post__commentatorAvatar}
        />
        <div className={styles.post__commentInput}>
          <span className={styles.post__textSecondary}>
            Добавить комментарий
          </span>
        </div>
      </div>
    </div>
  );
};

export default FakePost;

FakePost.propTypes = {
  mix: PropTypes.string,
  variant: PropTypes.oneOf(['first', 'second']).isRequired,
};

FakePost.defaultProps = {
  mix: undefined,
};
