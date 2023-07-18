import { useEffect } from 'react';
import SearchInput from '../../components/common/search-input/search-input';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './groups-page.module.scss';
import GroupCard from '../../components/group-card/group-card';

function GroupsPage() {
  const { groupsStore } = useStore();
  const { error, allGroups, getGroups } = groupsStore;

  useEffect(() => {
    getGroups();
  }, [getGroups]);
  return (
    <article>
      <SearchInput
        searchFromStore=""
        handleChange={() => {}}
        placeholder="Введите название группы"
        mix={styles.mixSearchInput}
      />
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.groupsList}>
          {allGroups.map((group) => (
            <li key={group.id}>
              <GroupCard
                title={group.title}
                description={group.description}
                followCount={group.followers_count}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default GroupsPage;
