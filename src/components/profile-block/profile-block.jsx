import styles from './profile-block.module.scss';

function ProfileBlock() {
  return (
    <div className={styles.block}>
      <div className={styles.photo}> </div>
      <h2 className={styles.name}>Юлия Левакова</h2>
      <p className={styles.role}>Админ</p>
      <div className={styles.item}>
        <p className={styles.text}>Публикации</p>
        <span className={styles.span}>8</span>
      </div>
    </div>
  )
}

export default ProfileBlock;
