import { Outlet } from 'react-router-dom';
import styles from './main-layout.module.scss';
import Header from '../../header/header';
import Footer from '../../footer/footer';

function MainLayout() {
	return (
		<div className={styles.layout}>
			<Header
				mix={styles['mix-header']}
				user={{
					first_name: 'Юлия',
					photo: '',
					userId: 'string',
				}}
			/>
			<main className={styles.layout__content}>
				<Outlet />
			</main>
			<Footer
				user={{
					first_name: 'Юлия',
					photo: '',
					userId: 'string',
				}}
			/>
		</div>
	);
}

export default MainLayout;
