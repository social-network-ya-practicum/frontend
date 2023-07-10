import { useState, useEffect } from 'react';
import styles from './comment-input.module.scss';
import RoundIcon from '../round-icon/round-icon';
import defaultAvatar from '../../../image/defaultAvatar.svg';

function CommentInput() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [value, setValue] = useState('');
  const [heightText, setHeightText] = useState('px');
  const onChange = (event) => setValue(event.target.value);

  // авто высота
  const textStyle = {
    height: heightText,
  };

  useEffect(() => {
    setHeightText('auto');
  }, [value]);

  const handleChange = (event) => {
    setHeightText('auto');
    if (onChange) {
      onChange(event);
    }
  };

  const handleInput = (event) => {
    const { target } = event;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setHeightText(`${target.scrollHeight}px`);
  };

  // остальной функционал
  function hanldeActiveInput() {
    setIsInputActive(true);
  }

  function handleCleanClick() {
    setIsInputActive(false);
    setValue('');
    setHeightText('32px');
  }

  function handleAddComment() {
    console.log('коммент отправим но нет апи');
    handleCleanClick();
  }

  return (
    <div className={styles.commentInput}>
      <form className={styles.commentInput__form}>
        <div className={styles.commentInput__box}>
          <RoundIcon size="small" src={defaultAvatar} alt="аватар" />
          <textarea
            onChange={handleChange}
            placeholder="Добавит комментарий"
            value={value}
            type="text"
            minLength={1}
            maxLength={2000}
            className={styles.commentInput__textarea}
            onClick={hanldeActiveInput}
            onInput={handleInput}
            style={textStyle}
            rows={1}
          >
            cc
          </textarea>
        </div>

        {isInputActive && (
          <div className={styles.commentInput__btns}>
            <button
              type="button"
              className={styles.commentInput__btnCancel}
              onClick={handleCleanClick}
            >
              Отменить
            </button>

            <button
              type="button"
              className={styles.commentInput__btnSave}
              onClick={handleAddComment}
            >
              Опубликовать
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CommentInput;
