// import BirthdayPlate from '../../birthday-plate/birthday-plate';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../contexts/RootStoreContext';
import styles from './main-page-content.module.scss';
import PostInput from '../../common/post-input/post-input';
import Post from '../../post/post';
import { TOKEN_NAME } from '../../../utils/settings';
import { getCookie } from '../../../utils/utils';

const MainPageContent = observer(() => {
  const { postsStore } = useStore();
  const { posts, getPosts } = postsStore;

  useEffect(() => {
    console.log(getCookie(TOKEN_NAME));
    getPosts();
  }, [getPosts]);

  const postsElements = posts.map((post) => (
    <Post
      {...post}
      post={post}
      id={post.id}
      key={post.id}
      text={post.text}
      author={post.author}
      pubdate={post.pub_date}
      images={post.images[0]}
      likecount={post.like_count}
    />
  ));

  return (
    <div className={styles['main-page-content']}>
      <div>
        <PostInput />
        <ul className={styles['main-page-content__posts']}>{postsElements}</ul>
      </div>
      <div>Дни рождения</div>
      {/* <BirthdayPlate/> */}
    </div>
  );
});

export default MainPageContent;
