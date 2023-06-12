import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SearchIcon from './search-icon.svg';
import CanselIcon from './cansel-icon.svg';
import styles from './search-input.module.scss';

const cn = classNames.bind(styles);

function SearchInput({ value, handleChange, mix }) {
  const cnSearchInput = cn('searchInput', mix);

  const onHandleEvent = (e) => {
    switch (e.target.name) {
      case 'search':
        handleChange(e.target.value);
        break;
      case 'close':
        handleChange('');
        break;
      default:
    }
  };

  return (
    <div className={cnSearchInput}>
      <img src={SearchIcon} alt="search" />
      <input
        type="text"
        name="search"
        className={styles.searchInput__input}
        placeholder="Должность или фамилия сотрудника"
        value={value}
        onChange={onHandleEvent}
        autoComplete="search"
      />
      {value && (
        <button className={styles.searchInput__close} onClick={onHandleEvent}>
          <img src={CanselIcon} alt="cansel" name="close" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  mix: PropTypes.string,
};

SearchInput.defaultProps = {
  mix: null,
};
