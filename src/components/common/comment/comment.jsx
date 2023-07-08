// import PropTypes from 'prop-types';
import { useState } from 'react';
import RoundIcon from '../round-icon/round-icon';
import styles from './comment.module.scss';
import defaultAvatar from '../../../image/defaultAvatar.svg';
import Popup from '../popup/popup';
import Textarea from '../textarea/textarea';

function Comment() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCommentChanging, setIsCommentChanging] = useState(false);
  const [value, setValue] = useState(
    'Отлично! Поздравляю Вас! Вы столько трудились, такой сложный заказчик вам попался!'
  );

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenClick = () => {
    setIsPopupOpen(true);
  };

  const handleChangeClick = () => {
    setIsCommentChanging(true);
    handleClosePopup();
  };

  const handleCancelClick = () => {
    setValue('отменили изменения');
    setIsCommentChanging(false);
  };

  const handleSaveChange = () => {
    setValue('сохранили изменения');
    setIsCommentChanging(false);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment__avatar}>
        <RoundIcon size="small" src={defaultAvatar} alt="аватар" />
      </div>
      <div className={styles.comment__box}>
        {!isCommentChanging && (
          <button className={styles.comment__more} onClick={handleOpenClick}>
            {' '}
          </button>
        )}
        <p className={styles.comment__owner}>имя фамилия</p>

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
          >
            Удалить комментарий
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default Comment;

// ProfileBlock.propTypes = {
//   role: PropTypes.string,
//   avatar: PropTypes.string,
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   postsCount: PropTypes.number,
// };

// ProfileBlock.defaultProps = {
//   role: 'Бухгалтер',
//   avatar: '',
//   firstName: 'Юлия',
//   lastName: 'Леденцова',
//   postsCount: 8,
// };
