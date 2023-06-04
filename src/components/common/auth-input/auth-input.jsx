import { useId } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './auth-input.module.scss';

const cn = classNames.bind(styles);

function AuthInput({ title, type, name, value, onChange, mix }) {
	const id = useId();

	const cnAuthInput = cn('auth-input', mix);

	return (
		<label className={cnAuthInput} htmlFor={id}>
			<span className={styles['auth-input__title']}>{title}</span>
			<input
				className={styles['auth-input__input']}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				id={id}
			/>
		</label>
	);
}

export default AuthInput;

AuthInput.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['email', 'password']).isRequired,
	name: PropTypes.oneOf(['email', 'password']).isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	mix: PropTypes.string,
};

AuthInput.defaultProps = {
	mix: undefined,
};
