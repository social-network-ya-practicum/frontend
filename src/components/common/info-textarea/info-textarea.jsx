import PropTypes from 'prop-types';
import { useId, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './info-textarea.module.scss';

const InfoTextrea = ({
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
  const cnRoot = clsx(styles.textarea, mix);
  const cnTextarea = clsx(styles.textarea__textarea, {
    [styles.textarea__textarea_type_error]: error,
  });

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

  return (
    <label className={cnRoot} htmlFor={id}>
      <span className={styles.textarea__title}>{title}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
        className={cnTextarea}
        ref={textareaRef}
        spellCheck="true"
      />
      {error && <span className={styles.textarea__error}>{error}</span>}
    </label>
  );
};

export default InfoTextrea;

InfoTextrea.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.oneOf(['bio']).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  setError: PropTypes.func.isRequired,
  validator: PropTypes.func,
  mix: PropTypes.string,
};

InfoTextrea.defaultProps = {
  placeholder: undefined,
  error: '',
  mix: undefined,
  validator: undefined,
};
