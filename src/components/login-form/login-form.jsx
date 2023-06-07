import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './login-form.module.scss';
import AuthInput from '../common/auth-input/auth-input';
import Button from '../common/button/button';

const cn = classNames.bind(styles);

function LoginForm({ onSubmit, mix }) {
	const cnLoginForm = cn('form', mix);

	return (
		<form className={cnLoginForm} onSubmit={onSubmit}>
			<h2 className={styles.form__title}>
				Добро пожаловать в корпоративную сеть
			</h2>
			<div className={styles.form__container}>
				<AuthInput
					type="email"
					name="email"
					title="Корпоративнаая почта"
					value="xxxxxxxxxxxxx@f.rr"
					onChange={(e) => console.log(e)}
					mix={styles[`mix-auth-input`]}
				/>
				<AuthInput
					type="password"
					name="password"
					title="Пароль"
					value="ffffffff"
					onChange={(e) => console.log(e)}
					mix={styles[`mix-auth-input`]}
				/>
				<Button type="submit" fullWidth>
					Войти
				</Button>
			</div>
		</form>
	);
}

export default LoginForm;

LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	mix: PropTypes.string,
};

LoginForm.defaultProps = {
	mix: undefined,
};
