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
					height: 'var(--header_height)',
					backgroundColor: '#EAEAEA',
					width: '100%',
					position: 'fixed',
				}}
			>
				Заглушка Header
			</header>

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
