import styles from './conferences.module.scss';
import Button from '../button/button';
import poster from './images/poster.jpg';
import { CONFERENCES_URL } from '../../../utils/settings';

const Conferences = () => (
  <div className={styles.block}>
    <h2 className={styles.block__title}>Конференции</h2>
    <div className={styles.block__imageWrapper}>
      <img className={styles.block__image} src={poster} alt="Постер" />
    </div>
    <p className={styles.block__paragraph}>
      Присоединяйся к встрече и общайся
      <br />с другими участниками прямо сейчас!
    </p>
    <Button width="100%" link={CONFERENCES_URL}>
      Начать общаться
    </Button>
  </div>
);
export default Conferences;
