import PropTypes from 'prop-types';
import styles from './file-view.module.scss';

function FileView({ name, inPost }) {
  const lastDot = name.lastIndexOf('.');
  const fileName = name.slice(0, lastDot);
  const fileExtension = name.slice(lastDot + 1);

  return (
    <div className={styles.fileView}>
      <p
        className={`${styles.fileView__name} ${
          inPost && styles.fileView__name_notPost
        }`}
      >
        {fileName}
      </p>
      <span
        className={`${styles.fileView__span} ${
          inPost && styles.fileView__span_notPost
        }`}
      >
        .{fileExtension}
      </span>
    </div>
  );
}

export default FileView;

FileView.propTypes = {
  name: PropTypes.string,
  inPost: PropTypes.bool,
};

FileView.defaultProps = {
  name: 'Тестовое название файла.doc',
  inPost: false,
};
