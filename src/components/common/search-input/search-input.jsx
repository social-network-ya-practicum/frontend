import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SearchIcon from './search-icon.svg';
import CanselIcon from './cansel-icon.svg';
import { debounce } from '../../../utils/utils';
import styles from './search-input.module.scss';

function SearchInput({ searchFromStore, handleChange, placeholder, mix }) {
  const [search, setSearch] = useState(() => {
    if (searchFromStore) return searchFromStore;
    return '';
  });
  const cnSearchInput = clsx(styles.searchInput, mix);

  const debounceHandleChange = useMemo(
    () => debounce(handleChange, 250),
    [handleChange]
  );

  useEffect(() => {
    debounceHandleChange(search);
  }, [debounceHandleChange, search]);

  const onHandleEvent = (e) => {
    switch (e.target.name) {
      case 'search':
        setSearch(e.target.value);
        break;
      case 'close':
        setSearch('');
        break;
      default:
    }
  };

  return (
    <section className={cnSearchInput}>
      <img src={SearchIcon} alt="search" />
      <input
        type="text"
        name="search"
        className={styles.searchInput__input}
        placeholder={placeholder}
        value={search}
        onChange={onHandleEvent}
        autoComplete="search"
      />
      {search && (
        <button className={styles.searchInput__close} onClick={onHandleEvent}>
          <img src={CanselIcon} alt="cansel" name="close" />
        </button>
      )}
    </section>
  );
}

export default SearchInput;

SearchInput.propTypes = {
  searchFromStore: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  mix: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
  mix: null,
};
