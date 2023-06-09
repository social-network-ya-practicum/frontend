import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../image/logo.svg';
import styles from './footer.module.scss';

const Footer = ({ user, mix }) => {

	const navigate = useNavigate();

	return (
		<footer className={mix}>
			<div className={styles.footer}>
        <div className={styles.foooter__info}>
          {user ? (
            <div className={styles.footer__menu}>
              <p className={styles.footer__text}>Помощь</p>
              <p className={styles.footer__text}>Документы</p>
              <p className={styles.footer__text}>Реквизиты компании</p>
            </div>
          ) : (
              <>
              </>
          )}
        </div>
        <a className={styles.footer__logo} href={() => navigate('/')}>
          <div className={styles.footer__imgBlock}>
            <img className={styles.footer__img} src={Logo} alt="Логотип" />
          </div>
        </a>
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
