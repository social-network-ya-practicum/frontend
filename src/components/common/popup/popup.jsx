import PropTypes from 'prop-types';
import styles from './popup.module.scss';

function Popup({ children, isOpen, handleClose }) {
  return (
    <div className={`${styles.popup} ${isOpen && styles.popup_active}`}>
      <div
        className={styles.popup__overlay}
        onClick={handleClose}
        onKeyDown={handleClose}
        role="presentation"
      />
      {children}
    </div>
  );
}

export default Popup;

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

Popup.defaultProps = {
  isOpen: false,
  handleClose: undefined,
};
