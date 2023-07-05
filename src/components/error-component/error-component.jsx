// import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { ReactComponent as CloseIcon } from './images/close-icon.svg';
import styles from './error-component.module.scss';

const ErrorComponent = () => {
  const cnError = clsx(styles.error);

  return createPortal(
    <div className={cnError}>
      <p className={styles.error__text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, deleniti
        magni placeat architecto, fugiat obcaecati commodi ex cum a, modi
        impedit quas doloribus neque. Vel facere esse voluptatibus adipisci
        animi.
      </p>
      <button className={styles.error__closeIcon}>
        <CloseIcon />
      </button>
    </div>,
    document.querySelector('#error-modal')
  );
};

export default ErrorComponent;

// ErrorComponent.propTypes = {  };

// ErrorComponent.defaultProps = {};
