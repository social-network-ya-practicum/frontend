import { useCallback } from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames/bind';
import LoginForm from '../../components/login-form/login-form';
import letterSmall from './images/letter-small.svg';
import letterMedium from './images/letter-medium.svg';
import styles from './login-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import { setCookie } from '../../utils/utils';
import { COOKIES_OPTIONS, TOKEN_NAME } from '../../utils/settings';

const cn = classNames.bind(styles);

const LoginPage = observer(() => {
  const { userStore } = useStore();
  const { getUser, setIsLoading, setError, isLoading } = userStore;

  const handleSubmit = useCallback(
    (input) => {
      const { email, password } = input;
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
          email,
          password,
        }),
      })
        .then((res) =>
          res.ok
            ? res.json()
            : res.json().then((r) => {
                throw new Error(JSON.stringify(r));
              })
        )
        .then((res) => {
          const token = res.auth_token;
          setCookie(TOKEN_NAME, token, COOKIES_OPTIONS);
          getUser();
        })
        .catch((err) => {
          runInAction(() => {
            setError(err);
            setIsLoading(false);
          });
          // Для develoop ---------------
          alert(err.message);
          // ---------------------------
        });

      // -------------------------------------------------------------------------------
    },
    [getUser, setIsLoading, setError]
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
