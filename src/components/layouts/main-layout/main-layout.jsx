import { Outlet } from 'react-router-dom';
import styles from './main-layout.module.scss';
// import MainPageShell from '../../main-page-shell/main-page-shell';

function MainLayout() {
	return (
		<div className={styles.layout}>
			{/* @TODO:  Заменить <header> на Header */}
			<header
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: 83,
					backgroundColor: '#EAEAEA',
					width: '100%',
				}}
			>
				Заглушка Header
			</header>

			<main className={styles.layout__content}>
				<Outlet />
			</main>
		</div>
	);
}

export default MainLayout;
