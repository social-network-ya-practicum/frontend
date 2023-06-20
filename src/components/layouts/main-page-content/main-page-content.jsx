// import BirthdayPlate from '../../birthday-plate/birthday-plate';
import { useEffect, useState } from 'react';
import styles from './main-page-content.module.scss';
import PostInput from '../../common/post-input/post-input';
import Post from '../../post/post';
import { getCookie } from '../../../utils/utils';
import { TOKEN_NAME } from '../../../utils/settings';

function MainPageContent() {
  // временнная мера, чтобы начать работу с апи постов
  const [posts, setPost] = useState([]);

  const token = getCookie(TOKEN_NAME);
  // console.log(token)

  useEffect(() => {
    fetch('https://csn.sytes.net/api/v1/posts?page=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPost(data.results))
      .catch((err) => console.log(err));
  }, [token]);

  const postsElements = posts.map((post) => (
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
  console.log(posts);

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
}

export default MainPageContent;
