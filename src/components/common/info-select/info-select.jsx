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
    const getScrollRatio = () => {
      const list = listRef.current;
      list.style.overflowY = 'scroll';
      list.style.height = '139px';
      const scroll = scrollRef.current;
      const thumb = thumbRef.current;
      const maxRealScroll = list.scrollHeight - list.clientHeight;
      const maxCustomScroll = scroll.clientHeight - thumb.clientHeight;
      const ratio = maxCustomScroll / maxRealScroll;
      list.style.overflowY = 'hidden';
      list.style.height = '28px';
      setScrollRatio(ratio);
    };

    const setCurrentScroll = () => {
      const item = itemsRef.current[value];
      const paddingY = 3;
      const list = listRef.current;
      const listOffset = list.offsetTop;
      const itemOffset = item.offsetTop;
      const maxRealScroll = list.scrollHeight - list.clientHeight;
      const scrollPosition = itemOffset - listOffset;
      list.scrollTop =
        scrollPosition < maxRealScroll
          ? scrollPosition
          : maxRealScroll + paddingY;
    };

    getScrollRatio();
    setCurrentScroll();
  }, [value]);

  const open = () => {
    const list = listRef.current;
    list.style.overflowY = 'scroll';
    list.style.height = '139px';
    setIsOpen(true);
  };

  const close = () => {
    const list = listRef.current;
    list.style.overflowY = 'hidden';
    list.style.height = '28px';
    setIsOpen(false);
  };

  const setScrollPos = (e) => {
    const paddingY = 3;
    const item = e.target.closest('label');
    const list = listRef.current;
    const listOffset = list.offsetTop;
    const itemOffset = item.offsetTop;
    const maxRealScroll = list.scrollHeight - list.clientHeight;
    const scrollPosition = itemOffset - listOffset;
    list.scrollTop =
      scrollPosition < maxRealScroll
        ? scrollPosition
        : maxRealScroll + paddingY;
  };

  const handleChange = (e) => {
    setScrollPos(e);
    onChange(e);
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
      // !!!! Не удалять
      // console.log(e.target, e.target.id);
      // if (e.target.id === 'selector') return;
      // console.log(888);
      // scrollRef.current.style.pointerEvents = 'auto';
      // scrollRef.current.dispatchEvent(
      //   new MouseEvent('mousedown', {
      //     bubbles: true,
      //     cancelable: true,
      //   })
      // );
    };
    const handleWindowMouseUp = (e) => {
      // scrollRef.current.style.pointerEvents = 'none';
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

  const cnRoot = cn('select', mix, { select_opened: isOpen });
  const cnArrow = cn('select__arrow', { select__arrow_up: isOpen });
  const cnList = cn('select__list', { select__list_closed: !isOpen });
  const cnItem = cn('select__item', { select__item_opened: isOpen });
  const cnScroll = cn('scroll', { scroll_hidden: !isOpen });

  return (
    <div className={cnRoot} ref={rootRef}>
      <div className={cnList} ref={listRef} onScroll={handleScroll}>
        {optionsList.map((option) => (
          <label
            key={option}
            className={cnItem}
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
              onChange={handleChange}
            />
            <span
              className={styles.select__text}
              onClick={() => (isOpen ? close() : open())}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
      <Arrow className={cnArrow} onClick={() => (isOpen ? close() : open())} />
      <div
        className={cnScroll}
        ref={scrollRef}
        id="selector"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div className={styles.scroll__thumb} ref={thumbRef} />
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
