import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './enter-the-group-page.module.scss';
import Post from '../../components/post/post';
import EnterTheGroup from '../../components/enter-the-group/enter-the-group';

const EnterTheGroupPage = observer(() => {
  const { userStore, groupStore, postsStore } = useStore();
  const { posts } = postsStore;
  const { group, getGroup, postGroup } = groupStore;
  const { user } = userStore;

  const { groupId } = useParams();

  useEffect(() => {
    getGroup(groupId);
  }, [getGroup, groupId]);

  console.log(group);

  // const { posts } = group.posts_group;

  const handleSubscribe = () => {
    postGroup(groupId);
  };

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
    />
  ));

  return (
    <div className={styles.enterTheGroupPage}>
      <EnterTheGroup
        title={group.title}
        imageLink={group.image_link}
        description={group.description}
        followers={group.followers}
        followersCount={group.followers_count}
        handleSubscribe={handleSubscribe}
      />
      <div>
        <ul className={styles.enterTheGroupPage__posts}>{postsElements}</ul>
      </div>
    </div>
  );
});

export default EnterTheGroupPage;
