import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BirthdayPlate from '../../birthday-plate/birthday-plate';
import { useStore } from '../../../contexts/RootStoreContext';
import styles from './main-page-content.module.scss';
import PostInput from '../../common/post-input/post-input';
import Post from '../../post/post';
import { TOKEN_NAME } from '../../../utils/settings';
import { getCookie } from '../../../utils/utils';

const MainPageContent = observer(() => {
  const { postsStore, userStore, birthdaysStore } = useStore();
  const { posts, getPosts } = postsStore;
  const { user } = userStore;
  const { birthDays, getBirthdays } = birthdaysStore;

  useEffect(() => {
    console.log(getCookie(TOKEN_NAME));
    getPosts();
    getBirthdays();
  }, [getPosts, getBirthdays]);

  const postsElements = posts.map((post) => (
    <Post
      {...post}
      post={post}
      id={post.id}
      key={post.id}
      text={post.text}
      author={post.author}
      pubdate={post.pub_date}
      images={post.images}
      likecount={post.like_count}
      currentUser={user}
    />
  ));

  return (
    <div className={styles.mainPageContent}>
      <div>
        <PostInput />
        <ul className={styles.mainPageContent__posts}>{postsElements}</ul>
      </div>
      <BirthdayPlate data={birthDays} id={user.id} />
    </div>
  );
});

export default MainPageContent;
