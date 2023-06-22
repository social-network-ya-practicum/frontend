// import BirthdayPlate from '../../birthday-plate/birthday-plate';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../contexts/RootStoreContext';
import styles from './main-page-content.module.scss';
import PostInput from '../../common/post-input/post-input';
import Post from '../../post/post';
// import { getCookie } from '../../../utils/utils';
// import { TOKEN_NAME } from '../../../utils/settings';
// import api from '../../../utils/main-api';

const MainPageContent = observer(() => {
  // временнная мера, чтобы начать работу с апи постов
  // const [posts, setPost] = useState([]);

  // const token = getCookie(TOKEN_NAME);
  // console.log(token)

  const { postsStore } = useStore();

  useEffect(() => {
    //   fetch('https://csn.sytes.net/api/v1/posts?page=1', {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Token ${token}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => setPost(data.results))
    //     .catch((err) => console.log(err));
    postsStore.getPosts();
  }, [postsStore]);

  const postsElements = postsStore.posts.map((post) => (
    <Post
      {...post}
      key={post.id}
      text={post.text}
      author={post.author}
      pubdate={post.pub_date}
      images={post.images[0]}
      likecount={post.like_count}
    />
  ));
  console.log(postsStore.posts);

  return (
    <div className={styles['main-page-content']}>
      <div>
        <PostInput />
        <ul className={styles['main-page-content__posts']}>
          {postsElements}
          {/* <Post />
          <Post /> */}
        </ul>
      </div>
      <div>Дни рождения</div>
      {/* <BirthdayPlate/> */}
    </div>
  );
});

export default MainPageContent;
