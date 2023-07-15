import PropTypes from 'prop-types';
import styles from './file-bubble.module.scss';

function FileBubble({ name, handleDelete }) {
  return (
    <div className={styles.fileBubble}>
      <p className={styles.fileBubble__name}>{name}</p>
      <button
        className={styles.fileBubble__btn}
        type="button"
        onClick={handleDelete}
      >
        {' '}
      </button>
    </div>
  );
}

export default FileBubble;

FileBubble.propTypes = {
  name: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
};

FileBubble.defaultProps = {
  name: 'Тестовое название файла',
};
