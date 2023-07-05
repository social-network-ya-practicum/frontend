import PropTypes from 'prop-types';
import styles from './about-user.module.scss';
import { calendar } from '../../../utils/settings';

function AboutUser({ user }) {
  return (
    <section className={styles.aboutUser}>
      <h2 className={styles.aboutUser__title}>О себе</h2>
      <div className={styles.aboutUser__birthday}>
        <p className={styles.aboutUser__text}>День рождения</p>
        <p className={styles.aboutUser__value}>
          {user.birthday_day} {calendar[user.birthday_month].variant}
        </p>
      </div>
      <p className={styles.aboutUser__bio}>{user.bio}</p>
    </section>
  );
}

export default AboutUser;

AboutUser.propTypes = {
  user: PropTypes.shape({
    birthday_day: PropTypes.string,
    birthday_month: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};
