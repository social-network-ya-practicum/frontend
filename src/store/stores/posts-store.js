import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';

class PostsStore {
  posts = [];

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // setPosts(posts) {
  //   this.posts = posts;
  // }

  getPosts = () => {
    this.isLoading = true;
    api
      .getPostsList()
      .then((data) => {
        runInAction(() => {
          this.posts = data.results;
          this.isLoading = false;
        });
      })
      // setPost(data.results))
      .catch((err) => console.log(err));
  };

  getPostsUser = (userID) => {
    this.isLoading = true;
    api
      .getUserPostsList(userID)
      .then((data) => {
        runInAction(() => {
          this.posts = data.results;
          this.isLoading = false;
        });
      })
      // setPost(data.results))
      .catch((err) => console.log(err));
  };

  addPost = (post) => {
    this.isLoading = true;
    api
      .postUserPost(post)
      .then((newPost) => {
        runInAction(() => {
          this.posts.unshift(newPost);
          this.isLoading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  deletePost = (id) => {
    this.isLoading = true;
    api
      .deletePost(id)
      .then(() => {
        runInAction(() => {
          this.posts = this.posts.filter((post) => post.id !== id);
          this.isLoading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  editPost = (post) => {
    this.isLoading = true;
    api.patchUserPost(post).then((updatedPost) => {
      runInAction(() => {
        this.posts = this.posts.map((p) => {
          if (p.id === updatedPost.id) {
            return updatedPost;
          }
          return p;
        });
        this.isLoading = false;
      });
    });
  };

  likePost = (post) => {
    this.isLoading = true;
    api
      .postLike(post)
      .then(() => {
        runInAction(() => {
          console.log('пост лайкнут');
          this.isLoading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  dislikePost = (post) => {
    this.isLoading = true;
    api
      .deleteLike(post)
      .then(() => {
        runInAction(() => {
          console.log('пост дизлайкнут');
          this.isLoading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  changePostLike(post, isLiked) {
    return isLiked ? this.likePost(post) : this.dislikePost(post);
  }
}

export default new PostsStore();
