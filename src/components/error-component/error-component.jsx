import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { ReactComponent as CloseIcon } from './images/close-icon.svg';
import styles from './error-component.module.scss';
import { useStore } from '../../contexts/RootStoreContext';

const ErrorComponent = observer(({ lifeTime }) => {
  const refPrevious = useRef([]);
  const [items, setItems] = useState({});
  const { pathname } = useLocation();
  const { errorStore } = useStore();
  const { errors, deleteError, clearErrStore } = errorStore;

  useEffect(() => {
    clearErrStore();
  }, [pathname, clearErrStore]);

  // Установка таймера, и для анимации (идёт добавление error__item_shown после рендера)
  useEffect(() => {
    const previous = refPrevious.current;
    if (previous === errors) return;

    const obj = {};

    errors.forEach((err) => {
      const isExist = previous.find((p) => p.id === err.id);
      if (!isExist) {
        setTimeout(() => deleteError(err.id), lifeTime);
      }
      obj[err.id] = true;
    });

    refPrevious.current = errors;
    setItems(obj);
  }, [errors, deleteError, lifeTime]);

  const cnRoot = clsx(styles.error, {
    [styles.error_hidden]: errors.length === 0,
  });

  return createPortal(
    <ul className={cnRoot}>
      {errors.map((err, i) => (
        <li
          className={clsx(styles.error__item, {
            [styles.error__item_shown]: items[err.id],
          })}
          key={err.id}
          style={{
            transform: `translateY(${i * 15}px)`,
          }}
        >
          <p className={styles.error__text}>{err.message}</p>
          <button
            className={styles.error__closeIcon}
            onClick={() => deleteError(err.id)}
          >
            <CloseIcon />
          </button>
        </li>
      ))}
    </ul>,
    document.querySelector('#error-modal')
  );
});

export default ErrorComponent;

ErrorComponent.propTypes = {
  lifeTime: PropTypes.number,
};

ErrorComponent.defaultProps = {
  lifeTime: 30000,
};
