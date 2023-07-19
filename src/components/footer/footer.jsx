import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './footer.module.scss';

function Footer({ mix, type }) {
  const cnRoot = clsx(styles.root, styles[`root_type_${type}`], mix);
  const cnFooterContainer = clsx(
    styles.footer__container,
    styles[`footer__container_type_${type}`]
  );
  return (
    <footer className={cnRoot}>
      <div className={styles.footer}>
        <div className={cnFooterContainer}>
          <div className={styles.footer__info}>
            <nav>
              <ul className={styles.footer__menu}>
                <li>
                  <NavLink to="/#" className={styles.footer__text}>
                    Помощь
                  </NavLink>
                </li>
                {type !== 'login' && (
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
  mix: PropTypes.string,
  type: PropTypes.oneOf(['login']),
};

Footer.defaultProps = {
  mix: undefined,
  type: undefined,
};
