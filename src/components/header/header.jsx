import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from './image/logo.svg';
import Button from '../common/button/button';
import styles from './header.module.scss';

const Header = ({ user, mix }) => {
	// Мы получим юзера из хука react query
	// const user = {
	// 	first_name: 'Юлия',
	// 	photo: '',
	// 	userId: 'string',
	// };

	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<header className={mix}>
			<div className={styles.header}>
				<a className={styles.header__logo} href="/#">
					<div className={styles.header__imgBlock}>
						<img className={styles.header__img} src={Logo} alt="Логотип" />
					</div>
					<span className={styles.header__title}>Корпоративная сеть</span>
				</a>
				<div className={styles.header__info}>
					{user ? (
						<div className={styles.header__wrapper}>
							<div className={styles.header__wrapper}>
								<Button
									variant="text"
									outlined
									active={pathname === '/'}
									onClick={() => navigate('/')}
									mix={styles['mix-button']}
								>
									<p className={styles.header__text}>Лента</p>
								</Button>
								<Button
									variant="text"
									outlined
									active={pathname === '/contacts'}
									onClick={() => navigate('/contacts')}
								>
									<p className={styles.header__text}>Контакты</p>
								</Button>
							</div>
							<Button
								variant="text"
								onClick={() => navigate(`/${user.userId}`)}
								mix={styles['mix-button-user']}
							>
								<p className={styles.header__name}>{user.first_name}</p>
								<div className={styles.header__imgBlock}>
									<img
										className={styles.header__img}
										src={user.photo || ''}
										alt="Фото"
									/>
								</div>
							</Button>
						</div>
					) : (
						<>
							<Button
								variant="text"
								outlined
								width="123px"
								active={pathname === '/login'}
								onClick={() => navigate('/login')}
								mix={styles['mix-button']}
							>
								Вход
							</Button>
							<Button
								variant="text"
								outlined
								width="123px"
								active={pathname === '/register'}
								onClick={() => navigate('/register')}
							>
								Регистрация
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;

Header.propTypes = {
	user: PropTypes.shape({
		first_name: PropTypes.string.isRequired,
		photo: PropTypes.string,
		userId: PropTypes.string.isRequired,
	}),
	mix: PropTypes.string,
};

Header.defaultProps = {
	user: null,
	mix: undefined,
};
