import PropTypes from 'prop-types';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './post.module.scss';
import Textarea from '../common/textarea/textarea';
import { handlerDataFormat } from '../../utils/data-format';

const Post = observer(
  ({ text, author, pubdate, images, likecount, id, admin }) => {
    const [value, setValue] = useState(text);
    const [isPostChanging, setIsPostchanging] = useState(false);
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    const { postsStore } = useStore();

    function handleEditClick() {
      setIsPostchanging(true);
      setIsPopupOpened(false);
    }

    function handleCancelClick() {
      setValue(text);
      setIsPostchanging(false);
    }

    function handleOpenPopup() {
      setIsPopupOpened(!isPopupOpened);
    }

    function handleDeleteClick() {
      postsStore.deletePost(id);
    }

    function handleSaveChange() {
      // вытщить пост из пропсов? но надо еще данные записать новые
      // postsStore.editPost(post)
      setIsPostchanging(false);
    }

    return (
      <li className={styles.post}>
        <div className={styles.post__info}>
          <div className={styles.post__avatar}> </div>
          <div className={styles['post__info-box']}>
            <p className={styles.post__owner}>
              {author.first_name} {author.last_name}
            </p>
            <span className={styles.post__date}>
              {handlerDataFormat(`${pubdate}`)}
            </span>
          </div>
        </div>

        {images && <img src={images} alt="" className={styles.post__img} />}
        <Textarea
          // text={text}
          charLimit={300}
          isPostChanging={isPostChanging}
          value={value}
          setValue={setValue}
        />

        {!isPostChanging ? (
          <div className={styles['post__like-container']}>
            <button className={styles.post__like}> </button>
            <span className={styles['post__like-countner']}>{likecount}</span>
          </div>
        ) : (
          <div className={styles.post__change}>
            <div className={styles.post__add}>
              <button className={styles.post__file}> </button>
              <button className={styles.post__smile}> </button>
            </div>
            <div className={styles.post__btns}>
              <button
                className={styles['post__btn-cancel']}
                onClick={handleCancelClick}
              >
                Отменить
              </button>
              <button
                className={styles['post__btn-save']}
                onClick={handleSaveChange}
              >
                Сохранить
              </button>
            </div>
          </div>
        )}
        {/* кнопка редактировать и попап */}

        <button className={styles.post__edit} onClick={handleOpenPopup}>
          {' '}
        </button>

        <div
          className={`${styles.post__actions} ${
            isPopupOpened && styles.post__actions_active
          }`}
        >
          {!admin && (
            <button
              className={`${styles.post__action}  ${styles.post__action_type_edit}`}
              onClick={handleEditClick}
            >
              Редактировать пост
            </button>
          )}
          <button
            className={`${styles.post__action}  ${styles.post__action_type_delete}`}
            onClick={handleDeleteClick}
          >
            Удалить пост
          </button>
        </div>
      </li>
    );
  }
);

export default Post;

Post.propTypes = {
  text: PropTypes.string,
  author: PropTypes.string,
  pubdate: PropTypes.instanceOf(Date),
  images: PropTypes.string,
  likecount: PropTypes.number,
  id: PropTypes.number,
  admin: PropTypes.bolean,
};

Post.defaultProps = {
  text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаемся?',
  author: 'Тамара Райкина',
  pubdate: '2019-08-24',
  images: '',
  likecount: 18,
  id: 1,
  admin: false,
};
