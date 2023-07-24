import styles from './group-followers.module.scss';

function GroupFollowers() {
  return (
    <div className={styles.groupFollowers}>
      <div className={styles.groupFollowers__info}>
        <h2 className={styles.groupFollowers__title}>Участники</h2>
        <span className={styles.groupFollowers__span}>148 человек</span>
      </div>
      <div>slider</div>
    </div>
  );
}

export default GroupFollowers;
