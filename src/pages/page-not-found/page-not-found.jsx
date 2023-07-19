import { NavLink } from 'react-router-dom';
import styles from './page-not-found.module.scss';
import Button from '../../components/common/button/button';
import photo from './image/photo.jpg';

function PageNotFound() {
  return (
    <div className={styles.pageNotFound}>
      <img src={photo} className={styles.pageNotFound__img} alt="Фото" />
      <div className={styles.pageNotFound__container}>
        <h2 className={styles.pageNotFound__title}>404</h2>
        <p className={styles.pageNotFound__text_bold}>Страница не найдена</p>
        <p className={styles.pageNotFound__text}>
          Предлагаем вернуться на главную и&nbsp;попробовать снова
        </p>
        <NavLink to="/" className={styles.pageNotFound__btn}>
          <Button width="139px">На главную</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default PageNotFound;
