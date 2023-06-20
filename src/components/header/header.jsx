import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../image/logo.svg';
import Arrow from '../../image/arrow-down.svg';
import BorderGradient from '../common/border-gradient/border-gradient';
import styles from './header.module.scss';
import defaultAvatar from '../../image/defaultAvatar.svg';
import { useStore } from '../../contexts/RootStoreContext';
import { getCookie, deleteCookie } from '../../utils/utils';
import { TOKEN_NAME } from '../../utils/settings';
import Popup from '../common/popup/popup';

function Header({ user, mix }) {

  const [isOpen, setIsOpen] = React.useState(false);
  const { userStore } = useStore();
  const { setError } = userStore;
  const token = getCookie(TOKEN_NAME);
  const navigate = useNavigate();

  const handleLogout = () => {
    // -----------------------------------------------------------------------------
    // После - заменить на запрос из api (mainApi.logout())
    fetch('https://csn.sytes.net/api/v1/auth/token/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    // ---------------------------------------------------------------
      .then(() => {
        deleteCookie();
        navigate(0);
      })
      .catch((err) => setError(err))
  }

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
    
    document.addEventListener('keydown', handleEscapeKey)
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
                      <button className={styles['header__menu-button']} type="button" onClick={handleOpenClick}>
                          <img className={styles['header__img-arrow']} src={Arrow} alt="Настройка профиля" />
                      </button>
                      <Popup isOpen={isOpen} handleClose={handleClose} >
                        <NavLink
                          to="/:user/edit"
                          className={styles.header__action}
                        >
                          Редактировать профиль
                        </NavLink>
                        <NavLink
                          to="/login"
                          className={styles.header__action}
                          onClick={handleLogout}
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
