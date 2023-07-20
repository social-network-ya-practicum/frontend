import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import RoundIcon from '../round-icon/round-icon';
import styles from './comment.module.scss';
import defaultAvatar from '../../../image/default-avatar.svg';
import Popup from '../popup/popup';
import Textarea from '../textarea/textarea';
import { useStore } from '../../../contexts/RootStoreContext';

function Comment({ author, text, commentID, postID }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCommentChanging, setIsCommentChanging] = useState(false);
  const [value, setValue] = useState(text);

  const { postsStore } = useStore();
  const { editComment, deleteComment } = postsStore;

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  const handleOpenClick = () => {
    setIsPopupOpen(true);
  };

  const handleChangeClick = () => {
    setIsCommentChanging(true);
    handleClosePopup();
  };

  const handleDeleteComment = () => {
    deleteComment(commentID, postID);
  };

  const handleCancelClick = () => {
    setValue(text);
    setIsCommentChanging(false);
  };

  const handleSaveChange = () => {
    // setValue('сохранили изменения');
    editComment({ id: commentID, author, text: value }, postID);
    setIsCommentChanging(false);
  };

  return (
    <li className={styles.comment}>
      <div className={styles.comment__avatar}>
        <RoundIcon
          size="small"
          src={author.photo || defaultAvatar}
          alt="аватар"
        />
      </div>
      <div className={styles.comment__box}>
        {!isCommentChanging && (
          <button className={styles.comment__more} onClick={handleOpenClick}>
            {' '}
          </button>
        )}
        <p className={styles.comment__owner}>
          {author.first_name} {author.last_name}
        </p>

        {!isCommentChanging ? (
          <p className={styles.comment__text}>{value}</p>
        ) : (
          <>
            <Textarea
              charLimit={300}
              isPostChanging={isCommentChanging}
              value={value}
              setValue={setValue}
            />

            <div className={styles.comment__btns}>
              <button
                className={styles.comment__btnCancel}
                onClick={handleCancelClick}
              >
                Отменить
              </button>
              <button
                className={styles.comment__btnSave}
                onClick={handleSaveChange}
              >
                Применить
              </button>
            </div>
          </>
        )}
      </div>

      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} handleClose={handleClosePopup}>
          <div className={styles.comment__popup}>
            <button
              className={`${styles.comment__btn} ${styles.comment__btn_type_edit}`}
              onClick={handleChangeClick}
            >
              Редактировать
            </button>
            <button
              className={`${styles.comment__btn} ${styles.comment__btn_type_delete}`}
              onClick={handleDeleteComment}
            >
              Удалить комментарий
            </button>
          </div>
        </Popup>
      )}
    </li>
  );
}

export default Comment;

Comment.propTypes = {
  commentID: PropTypes.number,
  postID: PropTypes.number,
  text: PropTypes.string,
  author: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    photo: PropTypes.string,
  }),
};

Comment.defaultProps = {
  commentID: 3,
  postID: 3,
  text: 'текст коммента',
  author: {
    id: 16,
    first_name: 'Ларри',
    last_name: 'Трейнор',
    photo: null,
  },
};
