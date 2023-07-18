import PropTypes from 'prop-types';
import styles from './file-bubble.module.scss';
import FileView from '../file-view/file-view';

function FileBubble({ name, handleDelete }) {
  // const lastDot = name.lastIndexOf('.');
  // const fileName = name.slice(0, lastDot);
  // const fileExtension = name.slice(lastDot + 1);

  return (
    <div className={styles.fileBubble}>
      {/* <div className={styles.fileBubble__nameBox}>
        <p className={styles.fileBubble__name}>{fileName}</p>
        <span className={styles.fileBubble__span}>.{fileExtension}</span>
      </div> */}

      <FileView name={name} />

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
  name: 'Тестовое название файла.doc',
};
