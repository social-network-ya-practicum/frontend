import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import user from './images/user.svg';
import styles from './group-card.module.scss';

function GroupCard({ linkpath, imgSrc, title, description, followCount }) {
  return (
    <Link className={styles.link} to={linkpath}>
      <section
        style={{
          background: `url("${imgSrc}") center/cover no-repeat #D7E9FA`,
        }}
        className={styles.card}
      >
        <h3 className={styles.card__header}>{title}</h3>
        <div className={styles.card__descriptionContainer}>
          <div className={styles.card__description}>
            <p className={styles.card__paragraph}>{description}</p>
            <div className={styles.card__followers}>
              <img src={user} alt="Иконка" />
              <span className={styles.card__followCnt}>{followCount}</span>
            </div>
            <button className={styles.card__btn}>Открыть</button>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default GroupCard;

GroupCard.propTypes = {
  linkpath: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  followCount: PropTypes.number.isRequired,
};
