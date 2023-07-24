import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './enter-the-group-page.module.scss';
import Post from '../../components/post/post';
import EnterTheGroup from '../../components/enter-the-group/enter-the-group';
import GroupInfo from '../../components/group-info/group-info';
import Conferences from '../../components/common/conferences/conferences';
import GroupFollowers from '../../components/group-followers/group-followers';

const EnterTheGroupPage = observer(() => {
  const { userStore, groupStore } = useStore();
  const { group, getGroup, postGroup } = groupStore;
  const { user } = userStore;

  const { groupId } = useParams();

  useEffect(() => {
    getGroup(groupId);
  }, [getGroup, groupId]);

  const handleSubscribe = () => {
    postGroup(groupId);
  };

  if (!group) return null;

  const postsElements = group.posts_group.map((post) => (
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

  let rendered;

  if (user.followings.findIndex((id) => id === group.id) !== -1)
    rendered = (
      <>
        <div>
          <ul className={styles.enterTheGroupPage__posts}>{postsElements}</ul>
        </div>
        <div className={styles.enterTheGroupPage__container}>
          <GroupInfo />
          <Conferences />
          <GroupFollowers
            followers={group.followers}
            followersCount={group.followers_count}
          />
        </div>
      </>
    );
  else
    rendered = (
      <>
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
      </>
    );

  return <div className={styles.enterTheGroupPage}>{rendered}</div>;
});

export default EnterTheGroupPage;
