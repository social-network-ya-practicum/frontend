import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../image/logo.svg';
import BorderGradient from '../common/border-gradient/border-gradient';
import styles from './footer.module.scss';

function Footer({ user, mix }) {
  return (
    <footer className={mix}>
      <div className={styles.footer}>
        <div className={styles.foooter__info}>
          {user ? (
            <nav>
              <ul className={styles.footer__menu}>
                <li>
                  <NavLink to="/#" className={styles.footer__text}>
                    Помощь
                  </NavLink>
                </li>
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
              </ul>
            </nav>
          ) : (
              <>
              </>
          )}
        </div>
        <NavLink to='/' className={styles.footer__logo}>
          <BorderGradient>
            <img className={styles.footer__img} src={Logo} alt="Логотип" />
          </BorderGradient>
        </NavLink>
        <p className={styles.footer__text_size_s}>{new Date().getFullYear()} Все права защищены</p>
      </div>
    </footer>
  );
};

export default Footer;

Footer.propTypes = {
	user: PropTypes.string,
	mix: PropTypes.string,
};

Footer.defaultProps = {
	user: null,
	mix: undefined,
};
