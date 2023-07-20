import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import SearchInput from '../../components/common/search-input/search-input';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './groups-page.module.scss';
import AllGroupsList from '../../components/all-groups-list/all-groups-list';
import UserGroupsList from '../../components/user-groups-list/user-groups-list';

function GroupsPage() {
  const { groupsStore } = useStore();
  const {
    error,
    loading,
    search,
    searchGroups,
    allGroups,
    userGroups,
    setSearch,
    getGroups,
  } = groupsStore;

  useEffect(() => {
    getGroups();
  }, [getGroups, search]);

  let rendered;

  if (error) rendered = <p>{error}</p>;
  else if (!search && userGroups.length)
    rendered = (
      <>
        <UserGroupsList groups={userGroups} />
        <AllGroupsList header="Популярные группы" groups={allGroups} />
      </>
    );
  else if (search && !searchGroups.length)
    rendered = (
      <>
        {!loading && (
          <p className={styles.empty}>К сожалению, поиск не дал результатов</p>
        )}
        <AllGroupsList header="Популярные группы" groups={allGroups} />
      </>
    );
  else if (search && searchGroups.length)
    rendered = <AllGroupsList groups={searchGroups} />;
  else rendered = <AllGroupsList groups={allGroups} />;

  return (
    <article>
      <SearchInput
        searchFromStore={search}
        handleChange={setSearch}
        placeholder="Введите название группы"
        mix={styles.mixSearchInput}
      />
      {rendered}
    </article>
  );
}

export default observer(GroupsPage);
