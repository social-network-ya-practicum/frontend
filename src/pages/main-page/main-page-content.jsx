import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BirthdayPlate from '../../components/birthday-plate/birthday-plate';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './main-page-content.module.scss';
import PostInput from '../../components/common/post-input/post-input';
import Post from '../../components/post/post';
// import { TOKEN_NAME } from '../../utils/settings';
// import { getCookie } from '../../utils/utils';

const MainPageContent = observer(() => {
  const [filter, setFilter] = useState(null);
  const [choosenButton, setChoosenButton] = useState(1);
  const { postsStore, userStore, birthdaysStore } = useStore();
  const { posts, getPosts } = postsStore;
  const { user } = userStore;
  const { birthDays, getBirthdays } = birthdaysStore;

  const filteredPosts = filter
    ? posts.filter((item) => item.group === filter)
    : posts;

  useEffect(() => {
    // console.log(getCookie(TOKEN_NAME));
    getPosts();
    getBirthdays();
  }, [getPosts, getBirthdays]);

  function handleButtonClick(button) {
    setChoosenButton(button);
    if (button === 2) {
      setFilter(1);
    } else {
      setFilter(null);
    }
  }

  const postsElements = filteredPosts.map((post) => (
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
      postslikes={post.likes}
      currentUser={user}
      // onPostLike={handlePostLike}
    />
  ));

  return (
    <div className={styles.mainPageContent}>
      <div>
        <PostInput />
        <div>
          <div className={styles.mainPageContent__btns}>
            <button
              className={`${styles.mainPageContent__btn} ${
                choosenButton === 1 ? styles.mainPageContent__btn_active : ''
              }`}
              // }
              onClick={() => handleButtonClick(1)}
            >
              Лента
            </button>
            <button
              className={`${styles.mainPageContent__btn} ${
                choosenButton === 2 ? styles.mainPageContent__btn_active : ''
              }`}
              onClick={() => handleButtonClick(2)}
            >
              Новости компании
            </button>
          </div>
          <ul className={styles.mainPageContent__posts}>{postsElements}</ul>
        </div>
      </div>
      <BirthdayPlate data={birthDays} id={user.id} />
    </div>
  );
});

export default MainPageContent;
