import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './auth-input.module.scss';
import eye from './images/eye.svg';
import eyeError from './images/eye-error.svg';
import eyeSlash from './images/eye-slash.svg';
import eyeSlashError from './images/eye-slash-error.svg';

const cn = classNames.bind(styles);

function AuthInput({
  title,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  setError,
  validator,
  mix,
}) {
  const id = useId();
  const [shownPassword, setShownPassword] = useState(false);
  const typeIcon = !shownPassword ? eye : eyeSlash;
  const typeIconOnError = !shownPassword ? eyeError : eyeSlashError;
  const attrType = type === 'password' && shownPassword ? 'text' : type;

  const onFocus = () => {
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const onBlur = (e) => {
    if (e.target.value) {
      setError((prev) => ({ ...prev, [name]: validator(e.target.value) }));
      return;
    }
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const cnRoot = cn('auth-input', mix);
  const cnInput = cn('auth-input__input', {
    'auth-input__input_type_error': error,
  });

  return (
    <label className={cnRoot} htmlFor={id}>
      <span className={styles['auth-input__title']}>{title}</span>
      <div className={styles['auth-input__wrapper']}>
        <input
          className={cnInput}
          type={attrType}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="on"
          placeholder={placeholder}
          id={id}
          onFocus={onFocus}
          onBlur={onBlur}
          spellCheck="false"
        />
        {type === 'password' && (
          <button
            className={styles['auth-input__icon-btn']}
            onClick={(e) => {
              e.preventDefault();
              setShownPassword(!shownPassword);
            }}
          >
            <img src={error ? typeIconOnError : typeIcon} alt="eye-icon" />
          </button>
        )}
      </div>
      {error && <span className={styles['auth-input__error']}>{error}</span>}
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
  placeholder: PropTypes.string,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  mix: PropTypes.string,
};

AuthInput.defaultProps = {
  placeholder: undefined,
  error: '',
  mix: undefined,
};
