import SearchInput from '../../components/common/search-input/search-input';
import styles from './groups-page.module.scss';

function GroupsPage() {
  return (
    <article className={styles.groups}>
      <SearchInput
        searchFromStore=""
        handleChange={() => {}}
        placeholder="Введите название группы"
        mix={styles.mixSearchInput}
      />
    </article>
  );
}

export default GroupsPage;
