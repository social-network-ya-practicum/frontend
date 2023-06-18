import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './textarea.module.scss';

function Textarea({ text, charLimit, isPostChanging }) {
  const [textExpanded, setTextExpanded] = useState(false);

  if (text.length <= charLimit) {
    return isPostChanging ? (
      <textarea className={styles.post__text} minLength={1} maxLength={2000}>
        {text}
      </textarea>
    ) : (
      <p>{text}</p>
    );
  }

  const limitedText = textExpanded ? text : text.substring(0, charLimit);

  return isPostChanging ? (
    <textarea
      className={styles.textarea}
      minLength={1}
      maxLength={2000}
      value={text}
    >
      ''
    </textarea>
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

  // {
  //   isPostChanging ?
  //       <textarea
  //       className={styles.textarea}
  //       minLength={1}
  //       maxLength={2000}
  //       value={text}
  //     >
  // ''
  // </textarea>
  // :

  // <p>
  //   {limitedText}
  // </p>

  //   // {!textExpanded&& <button className={styles.textarea__btn} onClick={()=>setTextExpanded(!textExpanded)}>...eще</button>}
  // }
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
