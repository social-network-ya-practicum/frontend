import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './main-user-info.module.scss';
import defaultAvatar from '../../../image/defaultAvatar.svg';

function MainUserInfo({ user, isOwn }) {
  return (
    <section className={styles.mainUserInfo}>
      <div className={styles.mainUserInfo__container}>
        <div className={styles.mainUserInfo__photo}>
          <img
            className={`${styles.mainUserInfo__avatar} ${
              user.photo ? '' : styles.mainUserInfo__avatar_default
            }`}
            src={user.photo || defaultAvatar}
            alt="Фото"
          />
        </div>
        <h2 className={styles.mainUserInfo__name}>
          {user.first_name} {user.middle_name} {user.last_name}
        </h2>
        <p className={styles.mainUserInfo__text}>Должность</p>
        <div className={styles.mainUserInfo__wrapper}>
          <p className={styles.mainUserInfo__role}>{user.job_title}</p>
          {isOwn && (
            <NavLink
              to={`/${user.id}/edit`}
              className={styles.mainUserInfo__action}
            >
              Редактировать профиль
            </NavLink>
          )}
        </div>
      </div>
    </section>
  );
}

export default MainUserInfo;

MainUserInfo.propTypes = {
  isOwn: PropTypes.bool,
  user: PropTypes.shape({
    photo: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    middle_name: PropTypes.string,
    job_title: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

MainUserInfo.defaultProps = {
  isOwn: false,
};
