import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './register-form.module.scss';
import AuthInput from '../common/auth-input/auth-input';
import Button from '../common/button/button';

const cn = classNames.bind(styles);

function RegisterForm({ onSubmit, mix }) {
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
					title="Введите корпоративную почту"
					value=""
					onChange={(e) => console.log(e)}
					mix={styles[`mix-auth-input`]}
				/>
				<AuthInput
					type="password"
					name="password"
					title="Введите пароль"
					value=""
					onChange={(e) => console.log(e)}
					mix={styles[`mix-auth-input`]}
				/>
				<AuthInput
					type="password"
					name="password"
					title="Повторите пароль"
					value=""
					onChange={(e) => console.log(e)}
					mix={styles[`mix-auth-input`]}
				/>
				<Button type="submit" fullWidth>
					Зарегистрироваться
				</Button>
			</div>
		</form>
	);
}

export default RegisterForm;

RegisterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	mix: PropTypes.string,
};

RegisterForm.defaultProps = {
	mix: undefined,
};
