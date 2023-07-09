import { useState } from 'react';
import styles from './comment-input.module.scss';
import RoundIcon from '../round-icon/round-icon';
import defaultAvatar from '../../../image/defaultAvatar.svg';

function CommentInput() {
  // const [isInputActive, setIsInputActive] = useState(false);
  const [value, setValue] = useState('');
  const onChange = (event) => setValue(event.target.value);
  const handleChange = (event) => {
    // setHeightText('auto');
    if (onChange) {
      onChange(event);
    }
  };
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
          >
            cc
          </textarea>
        </div>

        <div className={styles.commentInput__btns}>
          <button type="button" className={styles.commentInput__btnCancel}>
            Отменить
          </button>

          <button type="button" className={styles.commentInput__btnSave}>
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommentInput;
