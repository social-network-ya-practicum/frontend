import { memo, useId } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './info-input.module.scss';

const InfoInput = memo(
  ({
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
  }) => {
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

    const cnRoot = clsx(styles.infoInput, mix);
    const cnInput = clsx(styles.infoInput__input, {
      [styles.infoInput__input_type_error]: error,
    });

    return (
      <label className={cnRoot} htmlFor={id}>
        <div className={styles.infoInput__wrapper}>
          <span className={styles.infoInput__title}>{title}</span>

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
        {error && <span className={styles.infoInput__error}>{error}</span>}
      </label>
    );
  }
);

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
