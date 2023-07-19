import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './profile-block.module.scss';
import RoundIcon from '../common/round-icon/round-icon';
import defaultAvatar from '../../image/default-avatar.svg';

function ProfileBlock({ id, avatar, firstName, lastName, role, postsCount }) {
  return (
    <div className={styles.profileBlock}>
      <NavLink to={`/${id}`}>
        <RoundIcon size="large" src={avatar || defaultAvatar} alt="аватар" />
      </NavLink>

      <NavLink to={`/${id}`} className={styles.profileBlock__name}>
        <h2 className={styles.profileBlock__name}>
          {firstName} {lastName}
        </h2>
      </NavLink>
      <p className={styles.profileBlock__role}>{role}</p>
      <div className={styles.profileBlock__item}>
        <p className={styles.profileBlock__text}>Публикации</p>
        <span className={styles.profileBlock__span}>{postsCount}</span>
      </div>
      <div className={styles.profileBlock__help}>
        <p className={styles.profileBlock__text}>Помощь</p>
      </div>
    </div>
  );
}

export default ProfileBlock;

ProfileBlock.propTypes = {
  id: PropTypes.number,
  role: PropTypes.string,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  postsCount: PropTypes.number,
};

ProfileBlock.defaultProps = {
  id: '#',
  role: '',
  avatar: '',
  firstName: '',
  lastName: '',
  postsCount: null,
};
