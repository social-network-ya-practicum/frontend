import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ProfileBlock from '../../profile-block/profile-block';
import styles from './main-page-shell.module.scss';

import api from '../../../utils/main-api';
import { useStore } from '../../../contexts/RootStoreContext';

function MainPageShell() {
  const [data, setData] = useState({});
  const { userStore } = useStore();
  const { user } = userStore;
  console.log(user);
  console.log(data);

  useEffect(() => {
    api
      .getUserShortData(user.id)
      .then((res) => setData(res.results[0]))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <div className={styles['main-page-shell']}>
      <div className={styles['main-page-shell__box']}>
        <ProfileBlock
          avatar={user.photo}
          firstName={data.first_name}
          lastName={data.middle_name}
          role={data.job_title}
          postsCount={data.posts_count}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default MainPageShell;
