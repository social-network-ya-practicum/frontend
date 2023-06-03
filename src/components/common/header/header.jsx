import React from 'react';
import PropTypes from 'prop-types';
import Lenta from './image/lenta-icon.svg';
import Contacts from './image/contact-icon.svg';

import Button from './button/button';
import styles from './header.module.scss';

export const Header = ({ user, onLogin, onRegister, onClick }) => (
	<header>
		<div className={styles.header}>
			<div className={styles.header__logo}>
				<div className={styles.header__img} />
				<h1 className={styles.header__title}>Корпоративная сеть</h1>
			</div>
			<div>
				{user ? (
					<div className={styles.header__wrapper}>
            <div className={styles.header__wrapper}>
              <Button primary backgroundColor="button__link" onClick={onClick} label={
                <div className={styles.header__wrapper}>
                  <img className={styles.header__icon} src={Lenta} alt="Лента"/>
                  <p className={styles.header__text}>Лента</p>
                </div>
              } />
              <Button primary backgroundColor="button__link" onClick={onClick} label={
                <div className={styles.header__wrapper}>
                  <img className={styles.header__icon} src={Contacts} alt="Контакты"/>
                  <p className={styles.header__text}>Контакты</p>
                </div>
              } />
            </div>
            <div className={styles.header__user}>
              <p className={styles.header__name}>{user.name}</p>
              <div className={styles.header__avatar} />
            </div>
					</div>
				) : (
					<>
						<Button primary backgroundColor="button__primary" onClick={onLogin} label="Вход" />
						<Button onClick={onRegister} label="Регистрация"/>
					</>
				)}
			</div>
		</div>
	</header>
);

Header.propTypes = {
	user: PropTypes.shape({
		name: PropTypes.string.isRequired,
	}),
	onLogin: PropTypes.func.isRequired,
	onRegister: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
	user: null,
};
