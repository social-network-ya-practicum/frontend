import React from 'react';
import PropTypes from 'prop-types';
import Lenta from './image/lenta-icon.svg';
import Contacts from './image/contact-icon.svg';

import Button from '../common/button/button';
import styles from './header.module.scss';

export const Header = ({ user, onLogin, onRegister, onClick, ...args }) => (
	<header>
		<div className={styles.header}>
			<a className={styles.header__logo} href="/#">
				<div className={styles.header__img} />
				<h1 className={styles.header__title}>Корпоративная сеть</h1>
			</a>
			<div className={styles.header__wrapper}>
				{user ? (
					<div className={styles.header__wrapper}>
            <div className={styles.header__wrapper}>
              <Button variant="text" onClick={onClick} {...args}>
                <img className={styles.header__icon} src={Lenta} alt="Лента"/>
                <p className={styles.header__text}>Лента</p>
              </Button>
              <Button variant="text" onClick={onClick} {...args}>
                <img className={styles.header__icon} src={Contacts} alt="Контакты"/>
                <p className={styles.header__text}>Контакты</p>
              </Button>
            </div>
            <div className={styles.header__user}>
              <p className={styles.header__name}>{user.name}</p>
              <div className={styles.header__avatar} />
            </div>
					</div>
				) : (
					<>
						<Button variant="rounded" onClick={onLogin} {...args}>Вход</Button>
						<Button variant="rounded" viewType="outlined" onClick={onRegister} {...args}>Регистрация</Button>
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
