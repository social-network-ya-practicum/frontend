import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './footer.module.scss';

function Footer({ user, mix }) {
  return (
    <footer className={mix}>
      <div className={styles.footer}>
        <div className={styles.footer__container}>
          <div className={styles.footer__info}>
            <nav>
              <ul className={styles.footer__menu}>
                <li>
                  <NavLink to="/#" className={styles.footer__text}>
                    Помощь
                  </NavLink>
                </li>
                {user && (
                  <>
                  <li>
                    <NavLink to="/#" className={styles.footer__text}>
                      Документы
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/#" className={styles.footer__text}>
                      Реквизиты компании
                    </NavLink>
                  </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
          <p className={styles.footer__text_size_s}>
            {new Date().getFullYear()} Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

Footer.propTypes = {
  user: PropTypes.oneOfType([PropTypes.objectOf([null]), PropTypes.object]),
  mix: PropTypes.string,
};

Footer.defaultProps = {
  user: null,
  mix: undefined,
};
