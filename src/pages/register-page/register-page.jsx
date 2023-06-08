import styles from './register-page.module.scss';
import RegisterForm from '../../components/register-form/register-form';

function RergisterPage() {
	return (
		<section className={styles['register-page']}>
			<div className={styles['register-page__buffer-top']} />
			<RegisterForm onSubmit={(e) => e.preventDefault()} />
			<div className={styles['register-page__buffer-bottom']} />
		</section>
	);
}

export default RergisterPage;
