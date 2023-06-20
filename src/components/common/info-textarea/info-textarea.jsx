import PropTypes from 'prop-types';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './info-textarea.module.scss';

const cn = classNames.bind(styles);

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
  // Установка высоты для авторесайза textarea
  const [heigth, setHeight] = useState('66px');

  const id = useId();
  const cnRoot = cn('textarea', mix);

  useLayoutEffect(() => {
    const textareaHeight = textareaRef.current.scrollHeight;
    setHeight(`${textareaHeight}px`);
  }, []);

  const handleChange = (e) => {
    const textareaHeight = textareaRef.current.scrollHeight;
    setHeight(`${textareaHeight}px`);
    onChange(e);
  };

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
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        id={id}
        className={styles.textarea__textarea}
        ref={textareaRef}
        style={{ height: heigth }}
      />
      {error && <span className={styles['info-input__error']}>{error}</span>}
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
