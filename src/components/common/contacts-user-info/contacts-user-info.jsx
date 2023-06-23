import PropTypes from 'prop-types';
import styles from './contacts-user-info.module.scss';

function ContactsUserInfo({ contact }) {

  return (
    <section className={styles['contacts-user-info']}>
      <h2 className={styles['contacts-user-info__title']}>Контакты</h2>
      <div className={styles['contacts-user-info__contacts']}>
        <div className={styles['contacts-user-info__container']}>
          <p className={styles['contacts-user-info__text']}>
            Корпоративная почта
          </p>
          <p className={styles['contacts-user-info__text']}>
            Корпоративный телефон
          </p>
          <p className={styles['contacts-user-info__text']}>
            Личная почта
          </p>
          <p className={styles['contacts-user-info__text']}>
            Личный телефон
          </p>
        </div>
        <div className={styles['contacts-user-info__container']}>
          <p className={styles['contacts-user-info__value']}>
            {contact.email}
          </p>
          <p className={styles['contacts-user-info__value']}>
            {contact.corporate_phone_number}
          </p>
          <p className={styles['contacts-user-info__value']}>
            {contact.personal_email}
          </p>
          <p className={styles['contacts-user-info__value']}>
            {contact.personal_phone_number}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactsUserInfo;

ContactsUserInfo.propTypes = {
  contact: PropTypes.shape({
    email: PropTypes.string,
    corporate_phone_number: PropTypes.string,
    personal_email: PropTypes.string,
    personal_phone_number: PropTypes.string,
  }),
};

ContactsUserInfo.defaultProps = {
  contact: {
    email: '—',
    corporate_phone_number: '—',
    personal_email: '—',
    personal_phone_number: '—',
  },
};
