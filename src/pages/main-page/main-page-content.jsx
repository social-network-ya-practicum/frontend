import { useEffect, useRef, useState } from 'react';
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

const filterValues = {
  feed: { id: null, title: 'Лента' },
  news: { id: 1, title: 'Новости компании' },
};

const MainPageContent = observer(() => {
  const { feed, news } = filterValues;
  const [filter, setFilter] = useState(feed.title);
  const { postsStore, userStore, birthdaysStore } = useStore();
  const {
    posts,
    getPosts,
    isLoading,
    offset,
    setPage,
    resetOffset,
    isNextPage,
  } = postsStore;
  const { user } = userStore;
  const { birthDays, getBirthdays } = birthdaysStore;
  const ref = useRef();
  usePagingObserver(ref, isLoading, setPage, isNextPage);

  const filteredPosts =
    filter === news.title
      ? posts.filter((item) => item.group === news.id)
      : posts.filter(
          (item) =>
            user.followings.includes(item.group) ||
            item.group === news.id ||
            item.group === null
        );

  useEffect(() => {
    getPosts();
    resetOffset();
  }, [getPosts, resetOffset]);

  useEffect(() => {
    if (offset !== 0) getPosts();
  }, [getPosts, offset]);

  useEffect(() => {
    getBirthdays();
  }, [getBirthdays]);

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
                filter === feed.title ? styles.mainPageContent__btn_active : ''
              }`}
              // }
              onClick={() => setFilter(feed.title)}
            >
              {feed.title}
            </button>
            <button
              className={`${styles.mainPageContent__btn} ${
                filter === news.title ? styles.mainPageContent__btn_active : ''
              }`}
              onClick={() => setFilter(news.title)}
            >
              {news.title}
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
