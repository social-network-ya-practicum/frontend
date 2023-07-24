import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/RootStoreContext';
import styles from './enter-the-group-page.module.scss';
import Post from '../../components/post/post';
import EnterTheGroup from '../../components/enter-the-group/enter-the-group';
import PostInput from '../../components/common/post-input/post-input';
import GroupInfo from '../../components/group-info/group-info';
import Conferences from '../../components/common/conferences/conferences';

const EnterTheGroupPage = observer(() => {
  const { userStore, groupStore } = useStore();
  const { group, getGroup, postGroup, deleteGroup } = groupStore;
  const { user } = userStore;

  const { groupId } = useParams();

  useEffect(() => {
    getGroup(groupId);
  }, [getGroup, groupId]);

  const handleSubscribe = () => {
    postGroup(groupId);
    window.location.reload(true);
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
      files={post.files}
      likecount={post.like_count}
      postslikes={post.likes}
      comments={post.comments}
      currentUser={user}
    />
  ));

  let rendered;

  if (user.followings.findIndex((id) => id === group.id) !== -1)
    rendered = (
      <>
        <div>
          <PostInput />
          <ul className={styles.enterTheGroupPage__posts}>{postsElements}</ul>
        </div>
        <div className={styles.enterTheGroupPage__container}>
          <GroupInfo
            id={group.id}
            title={group.title}
            description={group.description}
            imageLink={group.image_link}
            deleteGroup={deleteGroup}
          />
          <Conferences />
        </div>
      </>
    );
  else
    rendered = (
      <div className={styles.enterTheGroupPage__wrapper}>
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

  return <div className={styles.enterTheGroupPage}>{rendered}</div>;
});

export default EnterTheGroupPage;
