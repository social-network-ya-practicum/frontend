/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './info-select.module.scss';
import { ReactComponent as Arrow } from './images/arrow.svg';

const cn = classNames.bind(styles);

const InfoSelect = ({ mix, name, optionsList, value, onChange }) => {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const itemsRef = useRef({});
  const scrollRef = useRef(null);
  const thumbRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startScrollY, setStartScrollY] = useState(0);

  useLayoutEffect(() => {
    const select = rootRef.current;
    const list = listRef.current;
    const scroll = scrollRef.current;
    const thumb = thumbRef.current;

    const setSelectWidth = () => {
      const listWidth = list
        .closest('#list-wrapper')
        .getBoundingClientRect().width;
      select.style.width = `${listWidth}px`;
    };

    const getScrollRatio = () => {
      const maxRealScroll = list.scrollHeight - list.clientHeight;
      const maxCustomScroll = scroll.clientHeight - thumb.clientHeight;
      const ratio = maxCustomScroll / maxRealScroll;
      return ratio;
    };

    setSelectWidth();
    setScrollRatio(getScrollRatio());
  }, [optionsList]);

  useEffect(() => {
    const setCurrentScroll = () => {
      const list = listRef.current;
      const item = itemsRef.current[value];
      const listOffset = list.offsetTop;
      const itemOffset = item.offsetTop;
      const scrollPosition = itemOffset - listOffset;
      list.scrollTop = scrollPosition;
    };
    setCurrentScroll();
  }, [value]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleScroll = () => {
    thumbRef.current.style.top = `${listRef.current.scrollTop * scrollRatio}px`;
  };

  const handleMouseDown = (e) => {
    const scrollY = scrollRef.current.getBoundingClientRect().top;
    const mouseY = e.clientY;
    const delta = mouseY - scrollY;
    listRef.current.scrollTop = delta / scrollRatio;
    setStartScrollY(scrollY);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const delta = e.clientY - startScrollY;
    listRef.current.scrollTop = delta / scrollRatio;
  };

  useEffect(() => {
    const handleWindowMouseDown = () => {
      setIsMouseDown(true);
    };

    const handleWindowMouseUp = (e) => {
      setIsMouseDown(false);
      if (!rootRef.current.contains(e.target) && isOpen) {
        close();
      }
    };

    window.addEventListener('mousedown', handleWindowMouseDown);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleWindowMouseDown);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [scrollRatio, isOpen]);

  const cnRoot = cn('select', mix);
  const cnArrow = cn('select__arrow', { select__arrow_up: isOpen });
  const cnListWrapper = cn('select__wrapper', {
    select__wrapper_hidden: !isOpen,
  });

  return (
    <div className={cnRoot} ref={rootRef}>
      <button type="button" className={styles.select__button} onClick={open}>
        <span className={styles.select__text}> {value} </span>
        <Arrow className={cnArrow} />
      </button>

      <div className={cnListWrapper} id="list-wrapper">
        <div
          className={styles.select__list}
          ref={listRef}
          onScroll={handleScroll}
        >
          {optionsList.map((option) => (
            <label
              key={option}
              className={styles.select__item}
              ref={(el) => {
                if (el) itemsRef.current[option] = el;
              }}
              htmlFor={option}
            >
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
          ))}
          <Arrow className={cnArrow} />

          <div
            className={styles.scroll}
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.scroll__thumb} ref={thumbRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

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
