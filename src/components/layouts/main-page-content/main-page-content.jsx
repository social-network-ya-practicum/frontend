// import BirthdayPlate from '../../birthday-plate/birthday-plate';
import styles from './main-page-content.module.scss';
import PostInput from '../../common/post-input/post-input';
import Post from '../../post/post';

function MainPageContent() {
  return (
    <div className={styles['main-page-content']}>
      <div>
        <PostInput/>
        <ul className={styles['main-page-content__posts']}>
          <Post/>
          <Post/>
        </ul>
      </div>
      <div>Дни рождения</div>
      {/* <BirthdayPlate/> */}
    </div>
  )
}

export default MainPageContent;
