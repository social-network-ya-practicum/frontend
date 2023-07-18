import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import BirthdayPlate from '../../components/birthday-plate/birthday-plate';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './main-page-content.module.scss';
import PostInput from '../../components/common/post-input/post-input';
import Post from '../../components/post/post';
import Conferences from '../../components/common/conferences/conferences';
import RightSidebarContainer from '../../components/common/right-sidebar-container/right-sidebar-container';
// import { TOKEN_NAME } from '../../utils/settings';
// import { getCookie } from '../../utils/utils';

const MainPageContent = observer(() => {
  const { postsStore, userStore, birthdaysStore } = useStore();
  const { posts, getPosts } = postsStore;
  const { user } = userStore;
  const { birthDays, getBirthdays } = birthdaysStore;

  useEffect(() => {
    // console.log(getCookie(TOKEN_NAME));
    getPosts();
    getBirthdays();
  }, [getPosts, getBirthdays]);

  // function handlePostLike(post) {
  //   console.log(post)
  // }

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
      postslikes={post.likes}
      currentUser={user}
      // onPostLike={handlePostLike}
    />
  ));

  return (
    <div className={styles.mainPageContent}>
      <div>
        <PostInput />
        <ul className={styles.mainPageContent__posts}>{postsElements}</ul>
      </div>
      <RightSidebarContainer gap="36px">
        <BirthdayPlate data={birthDays} id={user.id} />
        <Conferences />
      </RightSidebarContainer>
    </div>
  );
});

export default MainPageContent;
