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
        // console.log(likededPost)
        runInAction(() => {
          this.posts = this.posts.map((p) => {
            if (p.id === likededPost.id) {
              return likededPost;
            }
            return p;
          });
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
        // console.log(dislikededPost)
        runInAction(() => {
          this.posts = this.posts.map((p) => {
            if (p.id === dislikededPost.id) {
              return dislikededPost;
            }
            return p;
          });
        });
      })
      .catch((err) => addError(err))
      .finally(() => this.setIsLoading(false));
  };

  getComments = (postID, params) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';

    this.setIsLoading(true);
    api
      .getCommentsList(postID, queryString)
      .then((data) => {
        runInAction(() => {
          this.posts = this.posts.map((post) => {
            if (post.id === postID) {
              return { ...post, comments: data.results };
            }
            return post;
          });
        });
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };

  addComment = (comment, postID) => {
    this.setIsLoading(true);
    api
      .postComment({ ...comment, postID })
      .then(() => {
        this.getComments(postID);
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };

  deleteComment = (commentID, postID) => {
    this.setIsLoading(true);
    api
      .deleteComment(commentID, postID)
      .then(() => {
        runInAction(() => {
          this.posts = this.posts.map((post) => {
            if (post.id === postID) {
              const updatedComments = post.comments.filter(
                (c) => c.id !== commentID
              );
              return { ...post, comments: updatedComments };
            }
            return post;
          });
        });
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };

  editComment = (comment, postID) => {
    this.setIsLoading(true);
    api
      .patchComment({ ...comment, postID })
      .then((updatedComment) => {
        runInAction(() => {
          this.posts = this.posts.map((post) => {
            if (post.id === postID) {
              const updatedComments = post.comments.map((c) => {
                if (c.id === updatedComment.id) {
                  return updatedComment;
                }
                return c;
              });
              return { ...post, comments: updatedComments };
            }
            return post;
          });
        });
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };

  likeComment = (comment, postID) => {
    this.setIsLoading(true);
    api
      .postCommentLike({ ...comment, postID })
      .then((likedComment) => {
        runInAction(() => {
          this.posts = this.posts.map((post) => {
            if (post.id === postID) {
              const updatedComments = post.comments.map((c) => {
                if (c.id === likedComment.id) {
                  return likedComment;
                }
                return c;
              });
              return { ...post, comments: updatedComments };
            }
            return post;
          });
        });
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };

  dislikeComment = (commentID, postID) => {
    this.setIsLoading(true);
    api
      .deleteCommentLike(commentID, postID)
      .then((dislikedComment) => {
        runInAction(() => {
          this.posts = this.posts.map((post) => {
            if (post.id === postID) {
              const updatedComments = post.comments.map((c) => {
                if (c.id === dislikedComment.id) {
                  return dislikedComment;
                }
                return c;
              });
              return { ...post, comments: updatedComments };
            }
            return post;
          });
        });
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };
}

export default new PostsStore();
