import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames/bind';
import LoginForm from '../../components/login-form/login-form';
import letterSmall from './images/letter-small.svg';
import letterMedium from './images/letter-medium.svg';
import styles from './login-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';

const cn = classNames.bind(styles);

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

  const cnImageSm = cn('login-page__image', 'login-page__image_size_small');
  const cnImageMd = cn('login-page__image', 'login-page__image_size_medium');

  return (
    <section className={styles['login-page']}>
      <div className={styles['login-page__buffer-top']} />
      <div className={styles['login-page__form-wrapper']}>
        <LoginForm onSubmit={handleSubmit} disabled={isLoading} />
        <img className={cnImageSm} src={letterSmall} alt="small letter" />
        <img className={cnImageMd} src={letterMedium} alt="medium letter" />
      </div>
      <div className={styles['login-page__buffer-bottom']} />
    </section>
  );
});

export default LoginPage;
