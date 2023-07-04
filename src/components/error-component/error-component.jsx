import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ReactComponent as CloseIcon } from './images/close-icon.svg';
import styles from './error-component.module.scss';

const ErrorComponent = ({ mix }) => {
  const cnError = clsx(styles.error, mix);
  return (
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
    </div>
  );
};

export default ErrorComponent;

ErrorComponent.propTypes = { mix: PropTypes.string };

ErrorComponent.defaultProps = { mix: undefined };
