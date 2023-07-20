import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import SearchInput from '../../components/common/search-input/search-input';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './groups-page.module.scss';
import AllGroupsList from '../../components/all-groups-list/all-groups-list';
import UserGroupsList from '../../components/user-groups-list/user-groups-list';

function GroupsPage() {
  const { groupsStore } = useStore();
  const { error, allGroups, userGroups, getGroups } = groupsStore;

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  let rendered;

  if (error) rendered = <p>{error}</p>;
  else if (userGroups.length)
    rendered = (
      <>
        <UserGroupsList groups={userGroups} />
        <AllGroupsList header="Популярные группы" groups={allGroups} />
      </>
    );
  else rendered = <AllGroupsList groups={allGroups} />;

  return (
    <article>
      <SearchInput
        searchFromStore=""
        handleChange={() => {}}
        placeholder="Введите название группы"
        mix={styles.mixSearchInput}
      />
      {rendered}
    </article>
  );
}

export default observer(GroupsPage);
