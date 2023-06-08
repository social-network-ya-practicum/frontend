import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import AuthInput from '../common/auth-input/auth-input';
import Button from '../common/button/button';
import styles from './login-form.module.scss';

const cn = classNames.bind(styles);

function LoginForm({ onSubmit, mix }) {
	const [inputValue, setInputValue] = useState({
		email: '',
		password: '',
	});

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputValue({ ...inputValue, [name]: value });
	};

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
					value={inputValue.email}
					onChange={onChange}
					mix={styles[`mix-auth-input`]}
				/>
				<AuthInput
					type="password"
					name="password"
					title="Пароль"
					value={inputValue.password}
					onChange={onChange}
					mix={styles[`mix-auth-input`]}
				/>
				<Button type="submit" width="100%">
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
