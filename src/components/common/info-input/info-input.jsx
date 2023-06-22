import { useId } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './info-input.module.scss';

const cn = classNames.bind(styles);

function InfoInput({
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

  const onFocus = () => {
    if (!validator) return;
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const onBlur = (e) => {
    if (!validator) return;
    if (e.target.value) {
      setError((prev) => ({ ...prev, [name]: validator(e.target.value) }));
      return;
    }
    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const cnRoot = cn('info-input', mix);
  const cnInput = cn('info-input__input', {
    'info-input__input_type_error': error,
  });

  return (
    <label className={cnRoot} htmlFor={id}>
      <div className={styles['info-input__wrapper']}>
        <span className={styles['info-input__title']}>{title}</span>

        <input
          className={cnInput}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={!onChange}
          autoComplete="on"
          placeholder={placeholder}
          id={id}
          onFocus={onFocus}
          onBlur={onBlur}
          spellCheck="false"
        />
      </div>
      {error && <span className={styles['info-input__error']}>{error}</span>}
    </label>
  );
}

export default InfoInput;

InfoInput.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'text']).isRequired,
  name: PropTypes.oneOf([
    'last_name',
    'first_name',
    'middle_name',
    'job_title',
    'email',
    'personal_email',
    'corporate_phone_number',
    'personal_phone_number',
  ]).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  setError: PropTypes.func,
  validator: PropTypes.func,
  mix: PropTypes.string,
};

InfoInput.defaultProps = {
  placeholder: undefined,
  error: '',
  mix: undefined,
  validator: undefined,
  onChange: undefined,
  setError: undefined,
};
