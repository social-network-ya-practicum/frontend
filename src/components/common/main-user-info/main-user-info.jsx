import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './main-user-info.module.scss';
import defaultAvatar from '../../../image/defaultAvatar.svg';

function MainUserInfo({ user, userStore }) {
  const isOwn = user.id === userStore.id;

  return (
    <section className={styles['main-user-info']}>
      <div className={styles['main-user-info__container']}>
        <div className={styles['main-user-info__photo']}>
          <img
            className={styles['main-user-info__avatar']}
            src={user.photo || defaultAvatar}
            alt="Фото"
          />
        </div>
        <h2 className={styles['main-user-info__name']}>
          {user.firstName} {user.middle_name} {user.lastName}
        </h2>
        <p className={styles['main-user-info__text']}>Должность</p>
        <div className={styles['main-user-info__wrapper']}>
          <p className={styles['main-user-info__role']}>{user.job_title}</p>
          { isOwn &&
            <NavLink
              to="/:user/edit"
              className={styles['main-user-info__action']}
            >
              Редактировать профиль
            </NavLink>
          }
        </div>
      </div>
    </section>
  )
};

export default MainUserInfo;

MainUserInfo.propTypes = {
  userStore: PropTypes.shape({
    id: PropTypes.number,
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middle_name: PropTypes.string,
    job_title: PropTypes.string,
  }),
};

MainUserInfo.defaultProps = {
  userStore: {
    id: '2',
  },
  user: {
    id: '1',
    photo: null,
    firstName: 'Имя',
    middle_name: 'Отчество',
    lastName: 'Фамилия',
    job_title: 'Должность',
  },
};
