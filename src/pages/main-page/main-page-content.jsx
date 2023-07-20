import { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import BirthdayPlate from '../../components/birthday-plate/birthday-plate';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './main-page-content.module.scss';
import PostInput from '../../components/common/post-input/post-input';
import Post from '../../components/post/post';
import Conferences from '../../components/common/conferences/conferences';
import RightSidebarContainer from '../../components/common/right-sidebar-container/right-sidebar-container';
import usePagingObserver from '../../hooks/use-paging-observer';
// import { TOKEN_NAME } from '../../utils/settings';
// import { getCookie } from '../../utils/utils';

const MainPageContent = observer(() => {
  const [filter, setFilter] = useState(null);
  const [choosenButton, setChoosenButton] = useState(1);
  const { postsStore, userStore, birthdaysStore } = useStore();
  const { posts, getPosts, isLoading, limit, isNextPage } = postsStore;
  const { user } = userStore;
  const { birthDays, getBirthdays } = birthdaysStore;
  const ref = useRef();

  const [offset, setOffset] = useState(0);
  const setPage = useCallback(() => {
    setOffset((prevState) => prevState + limit);
  }, [limit]);

  usePagingObserver(ref, isLoading, setPage, isNextPage);

  const filteredPosts = filter
    ? posts.filter((item) => item.text === filter)
    : posts;

  useEffect(() => {
    getPosts(offset);
  }, [getPosts, offset]);

  useEffect(() => {
    getBirthdays();
  }, [getBirthdays]);

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
      files={post.files}
      likecount={post.like_count}
      postslikes={post.likes}
      comments={post.comments}
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
          <div ref={ref} />
        </div>
      </div>
      <RightSidebarContainer gap="36px">
        <BirthdayPlate data={birthDays} id={user.id} />
        <Conferences />
      </RightSidebarContainer>
    </div>
  );
});

export default MainPageContent;
