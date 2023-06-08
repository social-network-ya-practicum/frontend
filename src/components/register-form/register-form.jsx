import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './register-form.module.scss';
import AuthInput from '../common/auth-input/auth-input';
import Button from '../common/button/button';

const cn = classNames.bind(styles);

function RegisterForm({ onSubmit, mix }) {
	const cnLoginForm = cn('form', mix);

	const [inputValue, setInputValue] = useState({
		email: '',
		passwordFirst: '',
		passwordSecond: '',
	});

	const onChange = (e) => {
		const { name, value } = e.target;
		setInputValue({ ...inputValue, [name]: value });
	};

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
					value={inputValue.email}
					onChange={onChange}
					mix={styles[`mix-auth-input`]}
				/>
				<AuthInput
					type="password"
					name="passwordFirst"
					title="Введите пароль"
					value={inputValue.passwordFirst}
					onChange={onChange}
					mix={styles[`mix-auth-input`]}
				/>
				<AuthInput
					type="password"
					name="passwordSecond"
					title="Повторите пароль"
					value={inputValue.passwordSecond}
					onChange={onChange}
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
