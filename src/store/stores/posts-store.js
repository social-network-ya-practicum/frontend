/* eslint-disable camelcase */
import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class PostsStore {
  posts = [];

  userPosts = [];

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading = (bool) => {
    this.isLoading = bool;
  };

  setUserPosts = (posts) => {
    this.userPosts = posts;
  };

  cleanUserPosts = () => {
    this.userPosts = [];
  };

  getPosts = () => {
    this.setIsLoading(true);
    api
      .getPostsList()
      .then((data) => {
        runInAction(() => {
          this.posts = data.results;
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  getPostsUser = (userID) => {
    this.setIsLoading(true);
    api
      .getUserPostsList(userID)
      .then((data) => {
        this.setUserPosts(data.results);
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  addPost = (post) => {
    this.setIsLoading(true);
    api
      .postUserPost(post)
      .then((newPost) => {
        runInAction(() => {
          this.posts.unshift(newPost);
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  deletePost = (id) => {
    this.setIsLoading(true);
    api
      .deletePost(id)
      .then(() => {
        runInAction(() => {
          this.posts = this.posts.filter((post) => post.id !== id);
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  editPost = (post) => {
    this.setIsLoading(true);
    api
      .patchUserPost(post)
      .then((updatedPost) => {
        runInAction(() => {
          this.posts = this.posts.map((p) => {
            if (p.id === updatedPost.id) {
              return updatedPost;
            }
            return p;
          });
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  likePost = (post) => {
    this.setIsLoading(true);
    api
      .postLike(post)
      .then((likededPost) => {
        const { like_count, likes } = likededPost;
        const indexInPosts = this.posts.findIndex((i) => i.id === post.id);
        const indexInUserPosts = this.userPosts.findIndex(
          (i) => i.id === post.id
        );
        runInAction(() => {
          if (indexInPosts >= 0) {
            this.posts.splice(indexInPosts, 1, {
              ...post,
              like_count,
              likes,
            });
          }
          if (indexInUserPosts >= 0) {
            this.userPosts.splice(indexInUserPosts, 1, {
              ...post,
              like_count,
              likes,
            });
          }
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  dislikePost = (post) => {
    this.setIsLoading(true);
    api
      .deleteLike(post)
      .then((dislikededPost) => {
        const { like_count, likes } = dislikededPost;
        const indexInPosts = this.posts.findIndex((i) => i.id === post.id);
        const indexInUserPosts = this.userPosts.findIndex(
          (i) => i.id === post.id
        );
        runInAction(() => {
          if (indexInPosts >= 0) {
            this.posts.splice(indexInPosts, 1, {
              ...post,
              like_count,
              likes,
            });
          }
          if (indexInUserPosts >= 0) {
            this.userPosts.splice(indexInUserPosts, 1, {
              ...post,
              like_count,
              likes,
            });
          }
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };
}

export default new PostsStore();
