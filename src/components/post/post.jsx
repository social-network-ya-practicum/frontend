import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './post.module.scss';
import Textarea from '../common/textarea/textarea';
import { handlerDataFormat } from '../../utils/data-format';
import RoundIcon from '../common/round-icon/round-icon';
import defaultAvatar from '../../image/default-avatar.svg';
import Comments from '../comments/comments';
import FileView from '../common/file-view/file-view';
import { generateId } from '../../utils/utils';

const Post = observer(
  ({
    post,
    text,
    author,
    pubdate,
    images,
    likecount,
    postslikes,
    id,
    admin,
    currentUser,
    comments,
    files,
  }) => {
    const [value, setValue] = useState(text);
    const [isPostChanging, setIsPostchanging] = useState(false);
    const [isPopupOpened, setIsPopupOpened] = useState(false);
    const popupRef = useRef(null);

    const { postsStore } = useStore();
    const { editPost, deletePost, likePost, dislikePost } = postsStore;

    const isLiked = postslikes.some((item) => item === currentUser.id);

    const postFiles = files.map((file) => (
      <FileView
        inPost
        link={file.file_link}
        name={file.file_title}
        key={generateId()}
      />
    ));

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
    }

    function handleSaveChange() {
      // вытщить пост из пропсов? но надо еще данные записать новые
      editPost({ ...post, text: value });
      setIsPostchanging(false);
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

    const toPath =
      author.id === currentUser.id ? `/${author.id}` : `/contacts/${author.id}`;

    return (
      <li className={styles.post}>
        <div className={styles.post__info}>
          <NavLink to={toPath}>
            <RoundIcon
              size="small-plus"
              src={author.photo || defaultAvatar}
              alt="фото"
            />
          </NavLink>
          <div className={styles['post__info-box']}>
            <NavLink to={toPath} className={styles.post__owner}>
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
          <>
            <ul className={styles.post__fileList}>{postFiles}</ul>
            <div className={styles.post__container}>
              <div className={styles.post__likeContainer}>
                <button
                  className={
                    !isLiked
                      ? `${styles.post__like}`
                      : `${styles.post__like} ${styles.post__like_active}`
                  }
                  onClick={handleLikePost}
                >
                  {' '}
                </button>
                <span className={styles.post__likeCounter}>{likecount}</span>
              </div>
              {comments.length !== 0 && (
                <div className={styles.post__likeContainer}>
                  <button className={styles.post__comments}> </button>
                  <span className={styles.post__likeCounter}>
                    {comments.length}
                  </span>
                </div>
              )}
            </div>

            <Comments comments={comments} postID={id} />
          </>
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
  files: PropTypes.arrayOf(
    PropTypes.shape({
      file_link: PropTypes.string,
    })
  ),
  postslikes: PropTypes.arrayOf(PropTypes.number),
  likecount: PropTypes.number,
  id: PropTypes.number,
  admin: PropTypes.bool,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      author: PropTypes.shape({
        id: PropTypes.number,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      }),
    })
  ),
};

Post.defaultProps = {
  text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаемся?',
  author: {
    id: 1,
    first_name: 'Тамара',
    last_name: 'Райкина',
  },
  pubdate: '2019-08-24',
  images: [
    {
      image_link: '',
    },
  ],
  files: [
    {
      file_link: '',
    },
  ],
  postslikes: [3, 4, 5],
  likecount: 18,
  id: 1,
  admin: false,
  currentUser: {
    id: 4,
  },
  comments: [
    {
      id: 3,
      text: 'текст коммента',
      author: {
        id: 16,
        first_name: 'Ларри',
        last_name: 'Трейнор',
      },
    },
  ],
};
