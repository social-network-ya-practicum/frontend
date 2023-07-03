import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import styles from './user-address-card.module.scss';
import BorderGradient from '../common/border-gradient/border-gradient';
import { useStore } from '../../contexts/RootStoreContext';

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
  const { userStore } = useStore();
  const { user } = userStore;

  const toPath = user.id === id ? `/${id}` : `/contacts/${id}`;

  return (
    <Link className={styles.card__link} to={toPath}>
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

export default observer(UserAddressCard);

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
