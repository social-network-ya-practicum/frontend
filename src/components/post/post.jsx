import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './post.module.scss';
import Textarea from '../common/textarea/textarea';
import { handlerDataFormat } from '../../utils/data-format';
import BorderGradient from '../common/border-gradient/border-gradient';
import defaultAvatar from '../../image/defaultAvatar.svg';

const Post = observer(
  ({
    post,
    text,
    author,
    pubdate,
    images,
    likecount,
    id,
    admin,
    currentUser,
  }) => {
    const [value, setValue] = useState(text);
    const [isPostChanging, setIsPostchanging] = useState(false);
    const [isPopupOpened, setIsPopupOpened] = useState(false);
    const popupRef = useRef(null);

    const { postsStore } = useStore();
    const { getPosts, editPost, deletePost, likePost, dislikePost } =
      postsStore;

    const isLiked = post.users_like.some((item) => item === currentUser.id);

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
      deletePost(id);
      getPosts();
    }

    function handleSaveChange() {
      // вытщить пост из пропсов? но надо еще данные записать новые
      editPost({ ...post, text: value });
      setIsPostchanging(false);
      // likePost(post);
      // dislikePost(post);
    }

    function handleLikePost() {
      return !isLiked ? likePost(post) : dislikePost(post);
    }

    useEffect(() => {
      const handleClosePopup = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          // setIsPopupOpened(!isPopupOpened);
          // console.log(event.target)
          // console.log(isPopupOpened)
          // console.log(popupRef.current)
          // console.log(popupRef.current.contains(event.target))
        }
      };
      document.addEventListener('click', handleClosePopup);
      return () => {
        document.removeEventListener('click', handleClosePopup);
      };
    }, [isPopupOpened]);

    return (
      <li className={styles.post}>
        <div className={styles.post__info}>
          {/* <div className={styles.post__avatar}> </div> */}
          <NavLink to={`/${author.id}`}>
            <BorderGradient size="small-plus">
              <img
                src={author.photo || defaultAvatar}
                alt="фото"
                className={styles.post__avatar}
              />
            </BorderGradient>
          </NavLink>
          <div className={styles['post__info-box']}>
            <NavLink to={`/${author.id}`} className={styles.post__owner}>
              <p className={styles.post__owner}>
                {author.first_name} {author.last_name}
              </p>
            </NavLink>
            <span className={styles.post__date}>
              {handlerDataFormat(`${pubdate}`)}
            </span>
          </div>
        </div>

        {images[0] && (
          <img src={images[0].image_link} alt="" className={styles.post__img} />
        )}
        <Textarea
          // text={text}
          charLimit={300}
          isPostChanging={isPostChanging}
          value={value}
          setValue={setValue}
        />

        {!isPostChanging ? (
          <div className={styles.post__likeContainer}>
            <button className={styles.post__like} onClick={handleLikePost}>
              {' '}
            </button>
            <span className={styles.post__likeCounter}>{likecount}</span>
          </div>
        ) : (
          <div className={styles.post__change}>
            <div className={styles.post__add}>
              <button className={styles.post__file}> </button>
              <button className={styles.post__smile}> </button>
            </div>
            <div className={styles.post__btns}>
              <button
                className={styles.post__btnCancel}
                onClick={handleCancelClick}
              >
                Отменить
              </button>
              <button
                className={styles.post__btnSave}
                onClick={handleSaveChange}
              >
                Сохранить
              </button>
            </div>
          </div>
        )}
        {/* кнопка редактировать и попап */}

        {(admin || currentUser.id === author.id) && (
          <button className={styles.post__edit} onClick={handleOpenPopup}>
            {' '}
          </button>
        )}

        <div
          className={`${styles.post__actions} ${
            isPopupOpened && styles.post__actions_active
          }`}
          ref={popupRef}
        >
          {currentUser.id === author.id && (
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
  author: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
  pubdate: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image_link: PropTypes.string,
    })
  ),
  likecount: PropTypes.number,
  id: PropTypes.number,
  admin: PropTypes.bool,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

Post.defaultProps = {
  text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаемся?',
  author: {
    id: 1,
    first_name: 'Томара',
    last_name: 'Райкина',
  },
  pubdate: '2019-08-24',
  images: [
    {
      image_link: '',
    },
  ],
  likecount: 18,
  id: 1,
  admin: false,
  currentUser: {
    id: 4,
  },
};
