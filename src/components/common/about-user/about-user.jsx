import PropTypes from 'prop-types';
import styles from './about-user.module.scss';

function AboutUser({ contact }) {
  return (
    <section className={styles.aboutUser}>
      <h2 className={styles.aboutUser__title}>О себе</h2>
      <div className={styles.aboutUser__birthday}>
        <p className={styles.aboutUser__text}>День рождения</p>
        <p className={styles.aboutUser__value}>
          {contact.birthday_day} {contact.birthday_month}
        </p>
      </div>
      <p className={styles.aboutUser__bio}>{contact.bio}</p>
    </section>
  );
}

export default AboutUser;

AboutUser.propTypes = {
  contact: PropTypes.shape({
    birthday_day: PropTypes.string,
    birthday_month: PropTypes.string,
    bio: PropTypes.string,
  }),
};

AboutUser.defaultProps = {
  contact: {
    birthday_day: null,
    birthday_month: null,
    bio: null,
  },
};
