import PropTypes from 'prop-types';
import styles from './file-view.module.scss';

function FileView({ name, inPost, link }) {
  const lastDot = name.lastIndexOf('.');
  const fileName = name.slice(0, lastDot);
  const fileExtension = name.slice(lastDot + 1);

  return inPost ? (
    <a className={styles.fileView} href={link} download={name}>
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
    </a>
  ) : (
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
  link: PropTypes.string,
};

FileView.defaultProps = {
  name: 'Тестовое название файла.doc',
  inPost: false,
  link: 'Тестовое название файла.doc',
};
