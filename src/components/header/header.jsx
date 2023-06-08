import React from 'react';
import PropTypes from 'prop-types';
import Logo from './image/logo.svg';
import Button from '../common/button/button';
import styles from './header.module.scss';

export const Header = ({ user, onLogin, onRegister, onClick }) => (
	<header>
		<div className={styles.header}>
			<a className={styles.header__logo} href="/#">
				<div className={styles.header__imgBlock}><img className={styles.header__img} src={Logo} alt="Логотип" /></div>
				<span className={styles.header__title}>Корпоративная сеть</span>
			</a>
			<div className={styles.header__info}>
				{user ? (
					<div className={styles.header__wrapper}>
            <div className={styles.header__wrapper}>
              <Button variant="text" onClick={onClick}>
                <p className={styles.header__text}>Лента</p>
              </Button>
              <Button variant="text" onClick={onClick}>
                <p className={styles.header__text}>Контакты</p>
              </Button>
            </div>
            <div className={styles.header__user}>
              <p className={styles.header__name}>{user.first_name}</p>
              <div className={styles.header__imgBlock}><img className={styles.header__img} src={user.photo || ''} alt="Фото" /></div>
            </div>
					</div>
				) : (
					<>
						<Button variant="active" color="secondary" viewType="outlined"  width="123px" onClick={onLogin}>Вход</Button>
						<Button variant="passive" viewType="outlined" width="123px" onClick={onRegister}>Регистрация</Button>
					</>
				)}
			</div>
		</div>
	</header>
);

Header.propTypes = {
	user: PropTypes.shape({
		first_name: PropTypes.string.isRequired,
    photo: PropTypes.string,
	}),
	onLogin: PropTypes.func.isRequired,
	onRegister: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
	user: null,
};
