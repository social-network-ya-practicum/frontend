import PropTypes from 'prop-types';
import styles from './profile-block.module.scss';

function ProfileBlock({ avatar, firstName, lastName, role, postsCount }) {
  return (
    <div className={styles['profile-block']}>
      <div className={styles['profile-block__photo']}>
        {avatar && (
          <img
            className={styles['profile-block__avatar']}
            src={avatar}
            alt="аватар"
          />
        )}
      </div>
      <h2 className={styles['profile-block__name']}>
        {firstName} {lastName}
      </h2>
      <p className={styles['profile-block__role']}>{role}</p>
      <div className={styles['profile-block__item']}>
        <p className={styles['profile-block__text']}>Публикации</p>
        <span className={styles['profile-block__span']}>{postsCount}</span>
      </div>
    </div>
  );
}

export default ProfileBlock;

ProfileBlock.propTypes = {
  role: PropTypes.string,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  postsCount: PropTypes.number,
};

ProfileBlock.defaultProps = {
  role: 'Бухгалтер',
  avatar: '',
  firstName: 'Юлия',
  lastName: 'Леденцова',
  postsCount: 8,
};
