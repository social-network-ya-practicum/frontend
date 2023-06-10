// import BirthdayPlate from '../../birthday-plate/birthday-plate';
import styles from './main-page-content.module.scss';
import PostInput from '../../common/post-input/post-input';

function MainPageContent() {
  return (
    <div className={styles['main-page-content']}>
      <div>
        <PostInput/>
        <ul>
          <li>пост 3</li>
          <li>пост 2</li>
        </ul>
      </div>
      <div>Дни рождения</div>
      {/* <BirthdayPlate/> */}
    </div>
  )
}

export default MainPageContent;
