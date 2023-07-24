import React from 'react';
import PropTypes from 'prop-types';
import styles from './enter-the-group.module.scss';
import Button from '../common/button/button';
import RoundIcon from '../common/round-icon/round-icon';
import defaultAvatar from '../../image/default-avatar.svg';
import { getSign } from '../../utils/utils';

function EnterTheGroup({
  title,
  imageLink,
  description,
  followers,
  followersCount,
  handleSubscribe,
}) {
  const followersNew = followers.slice(-5);
  const followersElements = followersNew.map((follower) => (
    <li key={follower.id} className={styles.enterTheGroup__avatar}>
      <RoundIcon size="medium-minus" src={follower.photo || defaultAvatar} />
    </li>
  ));

  return (
    <div className={styles.enterTheGroup}>
      <h2 className={styles.enterTheGroup__title}>{title}</h2>
      <img src={imageLink} alt="Фото" className={styles.enterTheGroup__img} />
      <p className={styles.enterTheGroup__text}>{description}</p>
      <div className={styles.enterTheGroup__container}>
        <div className={styles.enterTheGroup__followers}>
          <ul className={styles.enterTheGroup__avatars}>{followersElements}</ul>
          <p className={styles.enterTheGroup__count}>
            {`${followersCount} ${getSign(followersCount)}`}
          </p>
        </div>
        <Button width="189px" onClick={handleSubscribe}>
          Вступить в группу
        </Button>
      </div>
    </div>
  );
}

export default EnterTheGroup;

EnterTheGroup.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  followersCount: PropTypes.number,
  imageLink: PropTypes.string,
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      photo: PropTypes.string,
    })
  ).isRequired,
  handleSubscribe: PropTypes.func.isRequired,
};

EnterTheGroup.defaultProps = {
  title: 'Фотографируй всё!',
  description:
    'Группа для тех, кто любит фотографировать и делиться своими находками со всеми. Добавляйте свои посты в сети, делитесь своими фотографиями из путешествий, задавайте свои вопросы другим участникам, ставьте свои реакции. Погнали!',
  followersCount: 148,
  imageLink:
    'https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg',
};
