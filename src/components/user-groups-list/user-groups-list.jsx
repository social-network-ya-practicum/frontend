import PropTypes from 'prop-types';
import { useRef } from 'react';
import GroupCard from '../group-card/group-card';
import arrow from './images/arrow.svg';
import styles from './user-groups-list.module.scss';

function UserGroupsList({ groups }) {
  const listRef = useRef();
  const scrollRef = useRef({
    pos: 0,
    max: 336.5 * groups.length - 3 * 336.5,
  });

  const onRightClick = () => {
    if (scrollRef.current.pos >= scrollRef.current.max) return;
    scrollRef.current.pos += 336.5;
    listRef.current.scroll({
      left: scrollRef.current.pos,
      behavior: 'smooth',
    });
  };

  const onLeftClick = () => {
    if (scrollRef.current.pos === 0) return;
    scrollRef.current.pos -= 336.5;
    listRef.current.scroll({
      left: scrollRef.current.pos,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.container__header}>
        Группы, в которых вы состоите
      </h2>
      <ul ref={listRef} className={styles.container__groupsList}>
        {groups.map((group) => (
          <li key={group.id}>
            <GroupCard
              linkpath={`/groups/${group.id}`}
              imgSrc={group.image_link}
              title={group.title}
              description={group.description}
              followCount={group.followers_count}
            />
          </li>
        ))}
      </ul>
      {groups.length > 3 && (
        <div className={styles.scrollArrows}>
          <button className={styles.scrollArrows__arrow} onClick={onLeftClick}>
            <img src={arrow} alt="Влево" />
          </button>
          <button className={styles.scrollArrows__arrow} onClick={onRightClick}>
            <img
              className={styles.scrollArrows__arrowRight}
              src={arrow}
              alt="Вправо"
            />
          </button>
        </div>
      )}
    </section>
  );
}

export default UserGroupsList;

UserGroupsList.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      followers_count: PropTypes.number.isRequired,
      image_link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
