import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './textarea.module.scss';

function Textarea({ value, setValue, charLimit, isPostChanging }) {
  const [textExpanded, setTextExpanded] = useState(false);

  const [height, setHeight] = useState('auto');

  const onChange = (event) => setValue(event.target.value);

  useEffect(() => {
    setHeight('auto');
  }, [value, isPostChanging]);

  const handleChange = (event) => {
    setHeight('auto');
    if (onChange) {
      onChange(event);
    }
  };
  // тагретом является именно инпут надо придумать как при нажатии сразу проверять
  const handleInput = (event) => {
    const { target } = event;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setHeight(`${target.scrollHeight}px`);
  };

  if (value.length <= charLimit) {
    return isPostChanging ? (
      <textarea
        className={styles.textarea}
        minLength={1}
        maxLength={2000}
        // ref={textAreaRef}
        value={value}
        onChange={handleChange}
        onInput={handleInput}
        style={{ height }}
        id="textarea"
      />
    ) : (
      <p className={styles.textarea}>{value}</p>
    );
  }

  const limitedText = textExpanded ? value : value.substring(0, charLimit);

  return isPostChanging ? (
    <textarea
      className={styles.textarea}
      minLength={1}
      maxLength={2000}
      // ref={textAreaRef}
      value={value}
      onChange={handleChange}
      onInput={handleInput}
      style={{ height }}
      id="textarea"
    />
  ) : (
    <p className={styles.textarea}>
      {limitedText}
      {!textExpanded && (
        <button
          className={styles.textarea__btn}
          onClick={() => setTextExpanded(!textExpanded)}
        >
          ...еще
        </button>
      )}
    </p>
  );
}

export default Textarea;

Textarea.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  charLimit: PropTypes.number,
  isPostChanging: PropTypes.bool,
};

Textarea.defaultProps = {
  value:
    'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаемся?',
  charLimit: 300,
  isPostChanging: false,
};
