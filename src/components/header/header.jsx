import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../image/logo.svg';
import Arrow from '../../image/arrow-down.svg';
import RoundIcon from '../common/round-icon/round-icon';
import styles from './header.module.scss';
import defaultAvatar from '../../image/defaultAvatar.svg';
import Popup from '../common/popup/popup';
import Notify from './image/notification.svg';

function Header({ user, mix, logout }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  React.useEffect(() => {
    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        handleClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  });

  return (
    <header className={mix}>
      <div className={styles.header}>
        <NavLink to="/" className={styles.header__logo}>
          <RoundIcon src={Logo} alt="Логотип" mixImg={styles.header__imgLogo} />
          <span className={styles.header__title}>Корпоративная сеть</span>
        </NavLink>
        <div className={styles.header__info}>
          {user && (
            <div className={styles.header__wrapper}>
              <nav>
                <ul className={styles.header__wrapper}>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `${styles.header__link} ${
                          isActive ? styles.header__link_active : ''
                        }`
                      }
                    >
                      Лента
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contacts"
                      className={({ isActive }) =>
                        `${styles.header__link} ${
                          isActive ? styles.header__link_active : ''
                        }`
                      }
                    >
                      Контакты
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/groups"
                      className={({ isActive }) =>
                        `${styles.header__link} ${
                          isActive ? styles.header__link_active : ''
                        }`
                      }
                    >
                      Группы
                    </NavLink>
                  </li>
                  <li>
                    <div className={styles.header__notify}>
                      <img src={Notify} alt="Уведомление" />
                      <div className={styles.header__notifyCount}>3</div>
                    </div>
                  </li>
                  <li>
                    <div className={styles.header__container}>
                      <NavLink
                        to={`/${user.id}`}
                        className={styles.header__user}
                      >
                        <RoundIcon
                          src={user.photo || defaultAvatar}
                          alt="Фото"
                        />
                        <p className={styles.header__name}>{user.first_name}</p>
                      </NavLink>
                      <button
                        className={styles.header__menuButton}
                        type="button"
                        onClick={handleOpenClick}
                      >
                        <img
                          className={styles.header__imgArrow}
                          src={Arrow}
                          alt="Настройка профиля"
                        />
                      </button>
                      <Popup isOpen={isOpen} handleClose={handleClose}>
                        <NavLink
                          to={`/${user.id}/edit`}
                          className={`${styles.header__action} ${styles.header__action_type_edit}`}
                          onClick={handleClose}
                        >
                          Редактировать профиль
                        </NavLink>
                        <NavLink
                          to="/login"
                          className={`${styles.header__action} ${styles.header__action_type_logout}`}
                          onClick={() => logout()}
                        >
                          Выйти
                        </NavLink>
                      </Popup>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    photo: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  }),
  mix: PropTypes.string,
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
  mix: undefined,
};
