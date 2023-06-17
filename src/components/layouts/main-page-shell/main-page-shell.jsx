import { Outlet } from 'react-router-dom';
import ProfileBlock from '../../profile-block/profile-block';
import styles from './main-page-shell.module.scss';

function MainPageShell() {
  return (
    <div className={styles['main-page-shell']}>
      <div className={styles['main-page-shell__box']}>
        <ProfileBlock />
        <Outlet />
      </div>
    </div>
  );
}

export default MainPageShell;
