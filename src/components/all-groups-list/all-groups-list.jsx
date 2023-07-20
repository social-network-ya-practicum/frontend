import PropTypes from 'prop-types';
import GroupCard from '../group-card/group-card';
import styles from './all-groups-list.module.scss';

function AllGroupsList({ header, groups }) {
  return (
    <section>
      {header && <h2 className={styles.header}>{header}</h2>}
      <ul className={styles.groupsList}>
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
    </section>
  );
}

export default AllGroupsList;

AllGroupsList.propTypes = {
  header: PropTypes.string,
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

AllGroupsList.defaultProps = {
  header: null,
};
