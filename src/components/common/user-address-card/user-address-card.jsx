import PropTypes from 'prop-types';
import styles from './user-address-card.module.scss';

function UserAddressCard({ avatar, info, contacts }) {
  return (
    <section className={styles.card}>
      <div className={styles.card__avatarBlock}>
        {avatar && (
          <img className={styles.card__avatarImg} src={avatar} alt="" />
        )}
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__fio}>
          {info.lastName} {info.firstName} {info.middleName}
        </div>
        <div>{info.position}</div>
      </div>
      <div className={styles.card__contacts}>
        <div className={styles.card__contact}>
          <span>{contacts.jobEmail}</span>
        </div>
        <div className={styles.card__contact}>
          <span>{contacts.jobPhone}</span>
        </div>
      </div>
    </section>
  );
}

export default UserAddressCard;

UserAddressCard.propTypes = {
  avatar: PropTypes.string,
  info: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
  }).isRequired,
  contacts: PropTypes.shape({
    jobEmail: PropTypes.string.isRequired,
    jobPhone: PropTypes.string.isRequired,
  }).isRequired,
};

UserAddressCard.defaultProps = {
  avatar: '',
};
