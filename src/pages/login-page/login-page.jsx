import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import LoginForm from '../../components/login-form/login-form';
import letterSmall from './images/letter-small.svg';
import letterMedium from './images/letter-medium.svg';
import styles from './login-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';

const LoginPage = observer(() => {
  const { userStore } = useStore();
  const { login, isLoading } = userStore;

  const handleSubmit = useCallback(
    (input) => {
      const { email, password } = input;
      login({ email, password });
    },
    [login]
  );

  const cnImageSm = clsx(
    styles.loginPage__image,
    styles.loginPage__image_size_small
  );
  const cnImageMd = clsx(
    styles.loginPage__image,
    styles.loginPage__image_size_medium
  );

  return (
    <section className={styles.loginPage}>
      <div className={styles.loginPage__bufferTop} />
      <div className={styles.loginPage__formWrapper}>
        <LoginForm onSubmit={handleSubmit} disabled={isLoading} />
        <img className={cnImageSm} src={letterSmall} alt="small letter" />
        <img className={cnImageMd} src={letterMedium} alt="medium letter" />
      </div>
      <div className={styles.loginPage__bufferBottom} />
    </section>
  );
});

export default LoginPage;
