import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';

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
      .catch((err) => console.log(err))
      .finally(() => this.setIsLoading(false));
  };

  getPostsUser = (userID) => {
    this.setIsLoading(true);
    api
      .getUserPostsList(userID)
      .then((data) => {
        this.setUserPosts(data.results);
      })
      .catch((err) => console.log(err))
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
      .catch((err) => console.log(err))
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
      .catch((err) => console.log(err))
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
      .catch((err) => console.log(err))
      .finally(() => this.setIsLoading(false));
  };

  likePost = (post) => {
    this.setIsLoading(true);
    api
      .postLike(post)
      .then((likededPost) => {
        runInAction(() => {
          this.posts = this.posts.map((p) => {
            if (p.id === likededPost.id) {
              return likededPost;
            }
            return p;
          });
        });
      })
      .catch((err) => console.log(err))
      .finally(() => this.setIsLoading(false));
  };

  dislikePost = (post) => {
    this.setIsLoading(true);
    api
      .deleteLike(post)
      .then((dislikededPost) => {
        runInAction(() => {
          this.posts = this.posts.map((p) => {
            if (p.id === dislikededPost.id) {
              return dislikededPost;
            }
            return p;
          });
        });
      })
      .catch((err) => console.log(err))
      .finally(() => this.setIsLoading(false));
  };
}

export default new PostsStore();
