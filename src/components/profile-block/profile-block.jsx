import PropTypes from 'prop-types';
import styles from './profile-block.module.scss';
import BorderGradient from '../common/border-gradient/border-gradient';
import defaultAvatar from '../../image/defaultAvatar.svg';

function ProfileBlock({ avatar, firstName, lastName, role, postsCount }) {
  return (
    <div className={styles.profileBlock}>
      <div className={styles.profileBlock__photo}>
        {avatar && (
          <BorderGradient size="large">
            <img
              className={styles.profileBlock__avatar}
              src={avatar || defaultAvatar}
              alt="аватар"
            />
          </BorderGradient>
        )}
      </div>
      <h2 className={styles.profileBlock__name}>
        {firstName} {lastName}
      </h2>
      <p className={styles.profileBlock__role}>{role}</p>
      <div className={styles.profileBlock__item}>
        <p className={styles.profileBlock__text}>Публикации</p>
        <span className={styles.profileBlock__span}>{postsCount}</span>
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
