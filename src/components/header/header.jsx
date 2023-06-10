import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../image/logo.svg';
import BorderGradient from '../common/border-gradient/border-gradient';
import styles from './header.module.scss';

function Header({ user }) {
	// Мы получим юзера из хука react query
	// const user = {
	// 	first_name: 'Юлия',
	// 	photo: '',
	// 	userId: 'string',
	// };

	return (
		<header>
			<div className={styles.header}>
				<NavLink to='/' className={styles.header__logo}>
					<BorderGradient>
						<img className={styles.header__img} src={Logo} alt="Логотип" />
					</BorderGradient>
					<span className={styles.header__title}>Корпоративная сеть</span>
				</NavLink>
				<div className={styles.header__info}>
					{user ? (
						<div className={styles.header__wrapper}>
							<nav>
                <ul className={styles.header__wrapper}>
                  <li>
                    <NavLink
                      to='/'
                      className={(isActive) => `${styles.header__link} ${isActive ? styles.header__link_active : ""}`}
                    >
                      Лента
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/contacts'
                      className={(isActive) => `${styles.header__link} ${isActive ? styles.header__link_active : ""}`}
                    >
                      Контакты
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/${user.userId}`}
                      className={styles.header__user}
                    >
                      <p className={styles.header__name}>{user.first_name}</p>
                      <BorderGradient>
                        <img
                          className={styles.header__img}
                          src={user.photo || ''}
                          alt="Фото"
                        />
                      </BorderGradient>
                    </NavLink>
                  </li>
                </ul>
							</nav>
						</div>
					) : (
						<>
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
};

Header.defaultProps = {
	user: null,
};
