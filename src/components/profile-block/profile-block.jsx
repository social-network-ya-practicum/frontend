import styles from './profile-block.module.scss';

function ProfileBlock() {
  return (
    <div className={styles.block}>
      <div className={styles.photo}> </div>
      <h2 className={styles.name}>Юлия Левакова</h2>
      <p className={styles.prof}>Бухгалтер</p>

      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={styles.text}>Публикации</p>
          <span className={styles.span}>8</span>
        </li>
        <li className={styles.item}>
          <p className={styles.text}>Группы</p>
          <span className={styles.span}>3</span>
        </li>
        <li className={styles.item}>
          <p className={styles.text}>Репосты</p>
          <span className={styles.span}>3</span>
        </li>
      </ul>
    </div>
  )
}

export default ProfileBlock;
