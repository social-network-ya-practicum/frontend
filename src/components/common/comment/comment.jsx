// import PropTypes from 'prop-types';
import { useState } from 'react';
import RoundIcon from '../round-icon/round-icon';
import styles from './comment.module.scss';
// import RoundIcon from '../common/round-icon/round-icon';
import defaultAvatar from '../../../image/defaultAvatar.svg';
import Popup from '../popup/popup';

function Comment() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment__avatar}>
        <RoundIcon size="small" src={defaultAvatar} alt="аватар" />
      </div>
      <div className={styles.comment__box}>
        <p className={styles.comment__owner}>имя фамилия</p>
        <p className={styles.comment__text}>
          Отлично! Поздравляю Вас! Вы столько трудились, такой сложный заказчик
          вам попался!
        </p>
        <button className={styles.comment__more} onClick={handleOpenClick}>
          {' '}
        </button>
      </div>

      <Popup isOpen={isPopupOpen} handleClose={handleClosePopup}>
        <div className={styles.comment__popup}>
          <button
            className={`${styles.comment__btn} ${styles.comment__btn_type_edit}`}
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
