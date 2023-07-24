import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './followers-slider.module.scss';
import RoundIcon from '../round-icon/round-icon';
import defaultAvatar from '../../../image/default-avatar.svg';

function FollowersSlider({ owner, followers }) {
  const [startIndex, setStartIndex] = useState(0);

  const folowersList = followers
    .slice(startIndex, startIndex + 10)
    .map((follower) => {
      const toPath =
        owner.id === follower.id
          ? `/${follower.id}`
          : `/contacts/${follower.id}`;

      return (
        <NavLink to={toPath} key={follower.id}>
          <RoundIcon
            size="medium"
            src={follower.photo || defaultAvatar}
            alt="аватар"
          />
        </NavLink>
      );
    });

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 10);
    }
  };

  const handleNextClick = () => {
    if (startIndex < followers.length - 10) {
      setStartIndex(startIndex + 10);
    }
  };

  return (
    <div className={styles.followersSlider}>
      <ul className={styles.followersSlider__followers}>{folowersList}</ul>
      <div className={styles.followersSlider__btns}>
        <button
          className={styles.followersSlider__btn}
          onClick={handlePrevClick}
        >
          {' '}
        </button>
        <button
          className={`${styles.followersSlider__btn} ${styles.followersSlider__btn_right}`}
          onClick={handleNextClick}
        >
          {' '}
        </button>
      </div>
    </div>
  );
}

export default FollowersSlider;

FollowersSlider.propTypes = {
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      photo: PropTypes.string,
    })
  ).isRequired,
  owner: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

FollowersSlider.defaultProps = {};
