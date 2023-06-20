import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './main-layout.module.scss';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import { useStore } from '../../../contexts/RootStoreContext';

const MainLayout = observer(() => {
  const { userStore } = useStore();
  const { user, logout } = userStore;

  return (
    <div className={styles.layout}>
      <Header mix={styles['mix-header']} user={user} logout={logout} />
      <main className={styles.layout__content}>
        <Outlet />
      </main>
      <Footer user={user} />
    </div>
  );
});

export default MainLayout;
