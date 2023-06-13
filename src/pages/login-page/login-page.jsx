import { useCallback } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames/bind';
import LoginForm from '../../components/login-form/login-form';
import letterSmall from './images/letter-small.svg';
import letterMedium from './images/letter-medium.svg';
import letterLarge from './images/letter-large.svg';
import styles from './login-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import { setCookie } from '../../utils/utils';
import { TOKEN_NAME } from '../../utils/settings';

const cn = classNames.bind(styles);

const LoginPage = observer(() => {
  const { userStore } = useStore();
  const { getUser, setIsLoading, setError, isLoading } = userStore;

  const handleSubmit = useCallback(() => {
    runInAction(() => {
      setError(null);
      setIsLoading(true);
    });

    // -----------------------------------------------------------------------------
    // Тестовый захардкоженый запрос за токеном
    // После - заменить на запрос из api
    fetch('https://csn.sytes.net/api/v1/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.test',
        password: 'Frontend23',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const token = res.auth_token;
        setCookie(TOKEN_NAME, token);
        getUser();
      })
      .catch((err) => {
        runInAction(() => {
          setError(err);
          setIsLoading(false);
        });
      });

    // -------------------------------------------------------------------------------
  }, [getUser, setIsLoading, setError]);

  const cnImageSm = cn('login-page__image', 'login-page__image_size_small');
  const cnImageMd = cn('login-page__image', 'login-page__image_size_medium');
  const cnImageLg = cn('login-page__image', 'login-page__image_size_large');

  return (
    <section className={styles['login-page']}>
      <div className={styles['login-page__buffer-top']} />
      <div className={styles['login-page__form-wrapper']}>
        <LoginForm onSubmit={handleSubmit} disabled={isLoading} />
        <img className={cnImageSm} src={letterSmall} alt="small letter" />
        <img className={cnImageMd} src={letterMedium} alt="medium letter" />
        <img className={cnImageLg} src={letterLarge} alt="large letter" />
      </div>
      <div className={styles['login-page__buffer-bottom']} />
    </section>
  );
});

export default LoginPage;
