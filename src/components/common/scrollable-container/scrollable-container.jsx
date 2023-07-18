/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styles from './scrollable-container.module.scss';

const ScrollableContainer = forwardRef(
  ({ elemScrollTo, onMouseUp, children, hidden, mix, variant }, ref) => {
    const scrollableAreaRef = useRef(null);
    const scrollRef = useRef(null);
    const thumbRef = useRef(null);
    const [scrollRatio, setScrollRatio] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [startScrollY, setStartScrollY] = useState(0);

    useLayoutEffect(() => {
      const scrollableElem = scrollableAreaRef.current;
      const scroll = scrollRef.current;
      const thumb = thumbRef.current;

      const getScrollRatio = () => {
        const maxRealScroll =
          scrollableElem.scrollHeight - scrollableElem.clientHeight;
        const maxCustomScroll = scroll.clientHeight - thumb.clientHeight;
        const ratio = maxCustomScroll / maxRealScroll;
        return ratio;
      };

      setScrollRatio(getScrollRatio());
    }, []);

    // установка прокрутки, если передан элемент, к которому нужно прокрутить(на позицию top = 0)
    useEffect(() => {
      if (!elemScrollTo) return;
      const setCurrentScroll = () => {
        const scrollableElem = scrollableAreaRef.current;
        const item = elemScrollTo;
        const scrollableElemOffset = scrollableElem.offsetTop;
        const itemOffset = item.offsetTop;
        const scrollPosition = itemOffset - scrollableElemOffset;
        scrollableElem.scrollTop = scrollPosition;
      };
      setCurrentScroll();
    }, [elemScrollTo]);

    const handleScroll = () => {
      thumbRef.current.style.top = `${
        scrollableAreaRef.current.scrollTop * scrollRatio
      }px`;
    };

    const handleMouseDown = (e) => {
      const scrollY = scrollRef.current.getBoundingClientRect().top;
      const mouseY = e.clientY;
      const delta = mouseY - scrollY;
      scrollableAreaRef.current.scrollTop = delta / scrollRatio;
      setStartScrollY(scrollY);
    };

    const handleMouseMove = (e) => {
      if (!isMouseDown) return;
      const delta = e.clientY - startScrollY;
      scrollableAreaRef.current.scrollTop = delta / scrollRatio;
    };

    useEffect(() => {
      const handleWindowMouseDown = () => {
        setIsMouseDown(true);
      };

      const handleWindowMouseUp = (e) => {
        setIsMouseDown(false);
        onMouseUp?.(e);
      };

      window.addEventListener('mousedown', handleWindowMouseDown);
      window.addEventListener('mouseup', handleWindowMouseUp);

      return () => {
        window.removeEventListener('mousedown', handleWindowMouseDown);
        window.removeEventListener('mouseup', handleWindowMouseUp);
      };
    }, [scrollRatio, onMouseUp]);

    const cnRoot = clsx(
      styles.root,
      {
        [styles.root_hidden]: hidden,
        [styles.root_variant_infoSelect]: variant === 'info-select',
        [styles.root_variant_birthdayPlate]: variant === 'birthday-plate',
      },
      mix
    );
    const cnScrollableArea = clsx(styles.root__scrollableArea, {
      [styles.root__scrollableArea_variant_infoSelect]:
        variant === 'info-select',
      [styles.root__scrollableArea_variant_birthdayPlate]:
        variant === 'birthday-plate',
    });
    const cnScroll = clsx(styles.scroll, {
      [styles.scroll_variant_infoSelect]: variant === 'info-select',
      [styles.scroll_variant_birthdayPlate]: variant === 'birthday-plate',
    });
    const cnScrollThumb = clsx(styles.scroll__thumb, {
      [styles.scroll__thumb_variant_infoSelect]: variant === 'info-select',
      [styles.scroll__thumb_variant_birthdayPlate]:
        variant === 'birthday-plate',
    });

    return (
      <div className={cnRoot} ref={ref}>
        <div
          className={cnScrollableArea}
          ref={scrollableAreaRef}
          onScroll={handleScroll}
        >
          {children}

          <div
            className={cnScroll}
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          >
            <div className={cnScrollThumb} ref={thumbRef} />
          </div>
        </div>
      </div>
    );
  }
);

export default ScrollableContainer;

ScrollableContainer.propTypes = {
  children: PropTypes.node.isRequired,
  elemScrollTo: PropTypes.instanceOf(Element),
  onMouseUp: PropTypes.func,
  hidden: PropTypes.bool,
  mix: PropTypes.string,
  variant: PropTypes.oneOf(['info-select', 'birthday-plate']).isRequired,
};

ScrollableContainer.defaultProps = {
  elemScrollTo: undefined,
  onMouseUp: undefined,
  hidden: false,
  mix: undefined,
};
