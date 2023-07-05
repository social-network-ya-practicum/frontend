import PropTypes from 'prop-types';
import styles from './contacts-user-info.module.scss';

function ContactsUserInfo({ user }) {
  return (
    <section className={styles.contactsUserInfo}>
      <h2 className={styles.contactsUserInfo__title}>Контакты</h2>
      <div className={styles.contactsUserInfo__contacts}>
        <div className={styles.contactsUserInfo__container}>
          <p className={styles.contactsUserInfo__text}>Корпоративная почта</p>
          <p className={styles.contactsUserInfo__text}>Корпоративный телефон</p>
          <p className={styles.contactsUserInfo__text}>Личная почта</p>
          <p className={styles.contactsUserInfo__text}>Личный телефон</p>
        </div>
        <div className={styles.contactsUserInfo__container}>
          <p className={styles.contactsUserInfo__value}>{user.email || '—'}</p>
          <p className={styles.contactsUserInfo__value}>
            {user.corporate_phone_number || '—'}
          </p>
          <p className={styles.contactsUserInfo__value}>
            {user.personal_email || '—'}
          </p>
          <p className={styles.contactsUserInfo__value}>
            {user.personal_phone_number || '—'}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactsUserInfo;

ContactsUserInfo.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    corporate_phone_number: PropTypes.string,
    personal_email: PropTypes.string,
    personal_phone_number: PropTypes.string,
  }).isRequired,
};
