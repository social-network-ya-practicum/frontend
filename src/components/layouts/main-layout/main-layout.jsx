import { Outlet } from 'react-router-dom';
import styles from './main-layout.module.scss';
import Header from '../../header/header';

function MainLayout() {
  return (
    <div className={styles.layout}>
      <Header mix={styles['mix-header']} />
      <main className={styles.layout__content}>
        <Outlet />
      </main>

      {/* @TODO:  Заменить <footer> на Footer */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'var(--footer_height)',
          backgroundColor: '#EAEAEA',
          width: '100%',
        }}
      >
        Заглушка Footer
      </footer>
    </div>
  );
}

export default MainLayout;
