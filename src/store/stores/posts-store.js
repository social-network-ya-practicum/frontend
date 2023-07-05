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
    this.setIsLoading(true);
    api
      .getUserPostsList(userID)
      .then((data) => {
        this.setUserPosts(data.results);
      })
      // setPost(data.results))
      .catch((err) => console.log(err))
      .finally(() => this.setIsLoading(false));
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
      .then((likededPost) => {
        runInAction(() => {
          this.posts = this.posts.map((p) => {
            if (p.id === likededPost.id) {
              return likededPost;
            }
            return p;
          });
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
          this.posts = this.posts.map((p) => {
            if (p.id === post.id) {
              return post;
            }
            return p;
          });
          this.isLoading = false;
        });
      })
      .catch((err) => console.log(err));
  };
}

export default new PostsStore();
