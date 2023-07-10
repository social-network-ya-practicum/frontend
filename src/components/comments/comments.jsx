import CommentInput from '../common/comment-input/comment-input';
import Comment from '../common/comment/comment';
import styles from './comments.module.scss';

function Comments() {
  return (
    <div className={styles.comments}>
      <ul className={styles.comments__list}>
        <Comment />
        <Comment />
        <button className={styles.comments__more}>
          Показать следующие комментарии
        </button>
      </ul>

      <CommentInput />
    </div>
  );
}

export default Comments;
