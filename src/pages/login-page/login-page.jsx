import classNames from 'classnames/bind';
import LoginForm from '../../components/login-form/login-form';
import letterSmall from './images/letter-small.svg';
import letterMedium from './images/letter-medium.svg';
import letterLarge from './images/letter-large.svg';
import styles from './login-page.module.scss';

const cn = classNames.bind(styles);

function LoginPage() {
  const cnImageSm = cn('login-page__image', 'login-page__image_size_small');
  const cnImageMd = cn('login-page__image', 'login-page__image_size_medium');
  const cnImageLg = cn('login-page__image', 'login-page__image_size_large');

  return (
    <section className={styles['login-page']}>
      <div className={styles['login-page__buffer-top']} />
      <div className={styles['login-page__form-wrapper']}>
        <LoginForm onSubmit={() => undefined} />
        <img className={cnImageSm} src={letterSmall} alt="small letter" />
        <img className={cnImageMd} src={letterMedium} alt="medium letter" />
        <img className={cnImageLg} src={letterLarge} alt="large letter" />
      </div>
      <div className={styles['login-page__buffer-bottom']} />
    </section>
  );
}

export default LoginPage;
