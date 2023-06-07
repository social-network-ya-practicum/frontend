import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './auth-input.module.scss';
import eye from './images/eye.svg';
import eyeSlash from './images/eye-slash.svg';

const cn = classNames.bind(styles);

function AuthInput({ title, type, name, value, onChange, mix }) {
	const id = useId();
	const [shownPassword, setShownPassword] = useState(false);
	const typeIcon = !shownPassword ? eye : eyeSlash;
	const attrType = type === 'password' && shownPassword ? 'text' : type;

	const cnAuthInput = cn('auth-input', mix);

	return (
		<label className={cnAuthInput} htmlFor={id}>
			<span className={styles['auth-input__title']}>{title}</span>
			<div className={styles['auth-input__wrapper']}>
				<input
					className={styles['auth-input__input']}
					type={attrType}
					name={name}
					value={value}
					onChange={onChange}
					autoComplete="on"
					id={id}
				/>
				{type === 'password' && (
					<button
						className={styles['auth-input__icon-btn']}
						onClick={() => setShownPassword(!shownPassword)}
					>
						<img src={typeIcon} alt="eye-icon" />
					</button>
				)}
			</div>
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
