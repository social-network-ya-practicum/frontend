import styles from './login-page.module.scss';
import LoginForm from '../../components/login-form/login-form';

function LoginPage() {
  return (
    <section className={styles['login-page']}>
      <div className={styles['login-page__buffer-top']} />
      <LoginForm onSubmit={(e) => e.preventDefault()} />
      <div className={styles['login-page__buffer-bottom']} />
    </section>
  );
}

export default LoginPage;
