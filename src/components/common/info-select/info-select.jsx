import PropTypes from 'prop-types';
import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './info-select.module.scss';
import { ReactComponent as Arrow } from './images/arrow.svg';
import ScrollableContainer from '../scrollable-container/scrollable-container';

const InfoSelect = memo(({ mix, name, optionsList, value, onChange }) => {
  const rootRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const itemsRef = useRef({});
  const [isOpen, setIsOpen] = useState(false);

  // Устанавливаю ширину для корневого элемента равной ширине ScrollableContainer
  // (ширина ScrollableContainer меняется в зависимости от содержания optionsList)
  useLayoutEffect(() => {
    const select = rootRef.current;
    const scrollContainer = scrollContainerRef.current;

    const setSelectWidth = () => {
      const scrollContainerWidth =
        scrollContainer.getBoundingClientRect().width;
      select.style.width = `${scrollContainerWidth}px`;
    };

    setSelectWidth();
  }, [optionsList]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleMouseUp = useCallback(
    (e) => {
      // закрытие раскрытого select списка при mouseUp вне  rootRef
      if (!rootRef.current.contains(e.target) && isOpen) {
        close();
      }
    },
    [isOpen]
  );

  const cnRoot = clsx(styles.select, mix);
  const cnArrow = clsx(styles.select__arrow, {
    [styles.select__arrow_up]: isOpen,
  });

  return (
    <div className={cnRoot} ref={rootRef}>
      <button type="button" className={styles.select__button} onClick={open}>
        <span className={styles.select__text}> {value} </span>
        <Arrow className={cnArrow} />
      </button>

      <ScrollableContainer
        ref={scrollContainerRef}
        elemScrollTo={itemsRef.current[value]}
        onMouseUp={handleMouseUp}
        hidden={!isOpen}
        mix={styles.mixScrollableContainer}
        variant="info-select"
      >
        {optionsList.map((option) => (
          <li
            key={option}
            className={styles.select__item}
            ref={(el) => {
              if (el) itemsRef.current[option] = el;
            }}
          >
            <label className={styles.select__label} htmlFor={option}>
              <input
                className={styles.select__radio}
                type="radio"
                name={name}
                id={option}
                value={option}
                checked={value === option}
                onChange={onChange}
                onClick={close}
              />
              <span className={styles.select__text}>{option}</span>
            </label>
          </li>
        ))}
        <Arrow
          className={cnArrow}
          onClick={() => (isOpen ? close() : open())}
        />
      </ScrollableContainer>
    </div>
  );
});

export default InfoSelect;

InfoSelect.propTypes = {
  mix: PropTypes.string,
  name: PropTypes.oneOf(['birthday_day', 'birthday_month']).isRequired,
  optionsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

InfoSelect.defaultProps = {
  mix: undefined,
};
