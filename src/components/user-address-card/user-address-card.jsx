import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import styles from './user-address-card.module.scss';
import BorderGradient from '../common/border-gradient/border-gradient';

function UserAddressCard({
  id,
  avatar,
  firstName,
  middleName,
  lastName,
  position,
  jobEmail,
  jobPhone,
}) {
  return (
    <Link className={styles.card__link} to={`/contacts/${id}`}>
      <section className={styles.card}>
        <div className={styles.card__avatarBlock}>
          <BorderGradient size="medium">
            {avatar && (
              <img
                className={styles.card__avatarImg}
                src={avatar}
                alt="Avatar"
              />
            )}
          </BorderGradient>
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__fio}>
            {lastName} {firstName} {middleName}
          </div>
          <div>{position}</div>
        </div>
        <div className={styles.card__contact}>{jobPhone}</div>
        <div className={styles.card__contact}>{jobEmail}</div>
      </section>
    </Link>
  );
}

export default memo(UserAddressCard);

UserAddressCard.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  jobEmail: PropTypes.string.isRequired,
  jobPhone: PropTypes.string.isRequired,
};

UserAddressCard.defaultProps = {
  avatar: '',
};
