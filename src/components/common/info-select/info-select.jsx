/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
// import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './info-select.module.scss';
import { ReactComponent as Arrow } from './images/arrow.svg';

const cn = classNames.bind(styles);
// НЕ СДЕЛАН, в работе
const InfoSelect = ({ mix }) => {
  const cnRoot = cn('select', mix);
  const cnArrow = cn('select__arrow', { select__arrow_up: false });
  // const [selectedValue, setSelectedValue] = useState('');
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const options = [
  //   { value: 'option1', label: 'Option 1' },
  //   { value: 'option2', label: 'Option 2' },
  //   { value: 'option3', label: 'Option 3' },
  //   { value: 'option4', label: 'Option 4' },
  //   { value: 'option5', label: 'Option 5' },
  // ];

  // const handleSelectOption = (optionValue) => {
  //   setSelectedValue(optionValue);
  //   setIsDropdownOpen(false);
  // };

  return (
    <div className={cnRoot}>
      <div className={styles.select__box}>
        <span className={styles.select__value}>14</span>
      </div>
      <Arrow className={cnArrow} />
      {/* <ul className={styles.select__list}>
        {options.map((option) => (
          <li
            key={option.value}
            className={styles.select__item}
            onClick={() => undefined}
          >
            {option.label}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default InfoSelect;

InfoSelect.propTypes = {
  mix: PropTypes.string,
};

InfoSelect.defaultProps = {
  mix: undefined,
};
