import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './textarea.module.scss';

function Textarea({ text, charLimit, isPostChanging }) {
  const [value, setValue] = useState(text);

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

  const handleInput = (event) => {
    const { target } = event;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setHeight(`${target.scrollHeight}px`);
  };

  if (text.length <= charLimit) {
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
      />
    ) : (
      <p className={styles.textarea}>{text}</p>
    );
  }

  const limitedText = textExpanded ? text : text.substring(0, charLimit);

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
  text: PropTypes.string,
  charLimit: PropTypes.number,
  isPostChanging: PropTypes.bool,
};

Textarea.defaultProps = {
  text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаемся?',
  charLimit: 300,
  isPostChanging: false,
};
