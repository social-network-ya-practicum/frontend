import PropTypes from 'prop-types';
import FollowersSlider from '../common/followers-slider/followers-slider';
import styles from './group-followers.module.scss';

function GroupFollowers({ followers, followersCount }) {
  return (
    <div className={styles.groupFollowers}>
      <div className={styles.groupFollowers__info}>
        <h2 className={styles.groupFollowers__title}>Участники</h2>
        <span className={styles.groupFollowers__span}>
          {followersCount} человек
        </span>
      </div>
      <FollowersSlider followers={followers} />
    </div>
  );
}

export default GroupFollowers;

GroupFollowers.propTypes = {
  followersCount: PropTypes.number,
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      photo: PropTypes.string,
    })
  ).isRequired,
};

GroupFollowers.defaultProps = {
  followersCount: 145,
};
