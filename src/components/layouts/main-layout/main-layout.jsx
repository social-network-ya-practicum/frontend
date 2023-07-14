import { Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './main-layout.module.scss';
import Header from '../../header/header';
import Footer from '../../footer/footer';
import ErrorComponent from '../../error-component/error-component';

const LOGIN_PATH = '/login';

const MainLayout = () => {
  const { pathname: path } = useLocation();

  const cnLayoutContent = clsx(styles.layout__content, {
    [styles.layout__content_type_login]: path === LOGIN_PATH,
  });

  return (
    <>
      <div className={styles.layout}>
        <Header
          mix={path === LOGIN_PATH ? styles.mixHeaderLogin : styles.mixHeader}
          type={path === LOGIN_PATH ? 'login' : undefined}
        />
        <main className={cnLayoutContent}>
          <Outlet />
        </main>
        <Footer
          type={path === LOGIN_PATH ? 'login' : undefined}
          mix={path === LOGIN_PATH ? styles.mixFooterLogin : undefined}
        />
      </div>
      <ErrorComponent />
    </>
  );
};

export default MainLayout;
