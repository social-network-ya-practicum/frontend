import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './main-user-info.module.scss';
import defaultAvatar from '../../../image/defaultAvatar.svg';

function MainUserInfo({ contact, id }) {
  
  const isOwn = contact.id === id;

  return (
    <section className={styles['main-user-info']}>
      <div className={styles['main-user-info__container']}>
        <div className={styles['main-user-info__photo']}>
          <img
            className={`${styles['main-user-info__avatar']} ${
              contact.photo ? '' : styles['main-user-info__avatar_default']
            }`}
            src={contact.photo || defaultAvatar}
            alt="Фото"
          />
        </div>
        <h2 className={styles['main-user-info__name']}>
          {contact.first_name} {contact.middle_name} {contact.last_name}
        </h2>
        <p className={styles['main-user-info__text']}>Должность</p>
        <div className={styles['main-user-info__wrapper']}>
          <p className={styles['main-user-info__role']}>{contact.job_title}</p>
          {isOwn && (
            <NavLink
              to="/:user/edit"
              className={styles['main-user-info__action']}
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
  id: PropTypes.number,
  contact: PropTypes.shape({
    id: PropTypes.number,
    photo: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    middle_name: PropTypes.string,
    job_title: PropTypes.string,
  }),
};

MainUserInfo.defaultProps = {
  id: '2',
  contact: {
    id: '1',
    photo: null,
    first_name: 'Имя',
    middle_name: 'Отчество',
    last_name: 'Фамилия',
    job_title: 'Должность',
  },
};
