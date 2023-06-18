import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../image/logo.svg';
import Arrow from '../../image/arrow-down.svg';
import BorderGradient from '../common/border-gradient/border-gradient';
import styles from './header.module.scss';
import defaultAvatar from '../../image/defaultAvatar.svg';

function Header({ user, mix }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleOpenClick = () => {
    setIsMenuOpen(true);
  };

  function handleClose() {
    setIsMenuOpen(false);
  }

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
          <BorderGradient>
            <img
              className={styles['header__img-logo']}
              src={Logo}
              alt="Логотип"
            />
          </BorderGradient>
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
                    <div className={styles.header__container}>
                      <NavLink
                        to={`/${user.email}`}
                        className={styles.header__user}
                      >
                        <p className={styles.header__name}>{user.first_name}</p>
                        <BorderGradient>
                          <img
                            className={styles['header__img-avatar']}
                            src={user.photo || defaultAvatar}
                            alt="Фото"
                          />
                        </BorderGradient>
                      </NavLink>
                      <button
                        className={styles['header__menu-button']}
                        type="button"
                        onClick={handleOpenClick}
                      >
                        <img
                          className={styles['header__img-arrow']}
                          src={Arrow}
                          alt="Настройка профиля"
                        />
                      </button>
                      <nav
                        className={`${styles['header__user-actions']} ${
                          isMenuOpen && styles['header__user-actions_active']
                        }`}
                      >
                        <NavLink
                          to="/:user/edit"
                          className={styles.header__action}
                        >
                          Редактировать профиль
                        </NavLink>
                        <NavLink to="/logout" className={styles.header__action}>
                          Выйти
                        </NavLink>
                      </nav>
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
    email: PropTypes.string,
    first_name: PropTypes.string,
    photo: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  }),
  mix: PropTypes.string,
};

Header.defaultProps = {
  user: null,
  mix: undefined,
};
