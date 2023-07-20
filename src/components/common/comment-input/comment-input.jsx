import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './comment-input.module.scss';
import RoundIcon from '../round-icon/round-icon';
import defaultAvatar from '../../../image/default-avatar.svg';
import { useStore } from '../../../contexts/RootStoreContext';

function CommentInput({ postID }) {
  const [isInputActive, setIsInputActive] = useState(false);
  const [value, setValue] = useState('');
  const [heightText, setHeightText] = useState('px');
  const onChange = (event) => setValue(event.target.value);

  const { postsStore, userStore } = useStore();
  const { addComment } = postsStore;
  const { user } = userStore;
  // console.log(user)

  // авто высота
  const textStyle = {
    height: heightText,
  };

  useEffect(() => {
    setHeightText('auto');
  }, [value]);

  const handleChange = (event) => {
    setHeightText('auto');
    onChange(event);
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
    // console.log('коммент отправим но нет апи');
    addComment({ text: value, author: user }, postID);
    handleCleanClick();
  }

  return (
    <div className={styles.commentInput}>
      <form className={styles.commentInput__form}>
        <div className={styles.commentInput__box}>
          <RoundIcon
            size="small"
            src={user.photo || defaultAvatar}
            alt="аватар"
          />
          <textarea
            onChange={handleChange}
            placeholder="Добавить комментарий"
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

CommentInput.propTypes = {
  postID: PropTypes.number,
};

CommentInput.defaultProps = {
  postID: 1,
};
