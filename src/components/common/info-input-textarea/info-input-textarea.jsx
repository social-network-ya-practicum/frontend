import { memo, useId, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './info-input-textarea.module.scss';

const InfoInputTextarea = memo(
  ({
    title,
    name,
    value,
    onChange,
    placeholder,
    error,
    setError,
    validator,
    mix,
  }) => {
    const textareaRef = useRef(null);
    const id = useId();

    useLayoutEffect(() => {
      const el = textareaRef.current;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }, [value]);

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

    const cnRoot = clsx(styles.input, mix);
    const cnInput = clsx(styles.input__textarea, {
      [styles.input__textarea_type_error]: error,
    });

    return (
      <label className={cnRoot} htmlFor={id}>
        <div className={styles.input__wrapper}>
          <span className={styles.input__title}>{title}</span>

          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            id={id}
            className={cnInput}
            ref={textareaRef}
            spellCheck="false"
            rows={1}
          />
        </div>
        {error && <span className={styles.input__error}>{error}</span>}
      </label>
    );
  }
);

export default InfoInputTextarea;

InfoInputTextarea.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.oneOf(['job_title', 'department']).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  setError: PropTypes.func,
  validator: PropTypes.func,
  mix: PropTypes.string,
};

InfoInputTextarea.defaultProps = {
  placeholder: undefined,
  error: '',
  mix: undefined,
  validator: undefined,
  onChange: undefined,
  setError: undefined,
};
