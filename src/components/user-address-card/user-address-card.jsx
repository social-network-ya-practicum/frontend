import PropTypes from 'prop-types';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './user-address-card.module.scss';
import RoundIcon from '../common/round-icon/round-icon';
import defaultAvatar from '../../image/default-avatar.svg';

function UserAddressCard({
  linkPath,
  avatar,
  firstName,
  middleName,
  lastName,
  position,
  department,
  jobEmail,
  jobPhone,
}) {
  return (
    <Link className={styles.link} to={linkPath}>
      <section className={styles.card}>
        <div className={styles.card__info}>
          <RoundIcon size="medium" src={avatar || defaultAvatar} alt="Avatar" />
          <div className={styles.card__mainData}>
            <p>
              {lastName} {firstName} {middleName}
            </p>
            <p className={styles.card__position}>{position}</p>
          </div>
        </div>
        <div className={styles.card__department}>{department}</div>
        <div className={styles.card__contacts}>
          <p>{jobPhone}</p>
          <p>{jobEmail}</p>
        </div>
      </section>
    </Link>
  );
}

export default memo(UserAddressCard);

UserAddressCard.propTypes = {
  linkPath: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  middleName: PropTypes.string,
  lastName: PropTypes.string,
  position: PropTypes.string,
  department: PropTypes.string,
  jobEmail: PropTypes.string,
  jobPhone: PropTypes.string,
};

UserAddressCard.defaultProps = {
  avatar: '',
  department: 'Административный департамент',
  firstName: '-',
  middleName: '-',
  lastName: '-',
  position: '-',
  jobEmail: '-',
  jobPhone: '-',
};
