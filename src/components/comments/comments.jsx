import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import CommentInput from '../common/comment-input/comment-input';
import Comment from '../common/comment/comment';
import styles from './comments.module.scss';

const Comments = observer(({ comments, postID }) => {
  const commentsList = comments.map((comment) => (
    <Comment key={comment.id} author={comment.author} text={comment.text} />
  ));

  return (
    <div className={styles.comments}>
      <ul className={styles.comments__list}>
        {commentsList}
        <button className={styles.comments__more}>
          Показать следующие комментарии
        </button>
      </ul>

      <CommentInput postID={postID} />
    </div>
  );
});

export default Comments;

Comments.propTypes = {
  postID: PropTypes.number,
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

Comments.defaultProps = {
  postID: 1,
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
