/* eslint-disable camelcase */
import { makeAutoObservable, runInAction } from 'mobx';
import api from '../../utils/main-api';
import errorStore from './error-store';

const { addError } = errorStore;

class PostsStore {
  posts = [];

  // limit = 1000;

  // offset = 5;

  // commentsData = {};

  userPosts = [];

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPage = () => {
    this.offset += this.limit;
  };

  setIsLoading = (bool) => {
    this.isLoading = bool;
  };

  setUserPosts = (posts) => {
    this.userPosts = posts;
  };

  cleanUserPosts = () => {
    this.userPosts = [];
  };

  setCommentsInPost = (postID, comments) => {
    const postIndex = this.posts.findIndex((p) => p.id === postID);
    const userPostIndex = this.userPosts.findIndex((p) => p.id === postID);
    if (postIndex >= 0) {
      // console.log(...this.posts[postIndex])
      this.posts.splice(postIndex, 1, {
        ...this.posts[postIndex],
        comments,
        // comments: this.posts[postIndex].comments.concat(comments),
      });
    }
    if (userPostIndex >= 0) {
      this.userPosts.splice(userPostIndex, 1, {
        ...this.userPosts[userPostIndex],
        comments,
      });
    }
  };

  changeCommentsInPost = (postID, updatedComment) => {
    const postIndex = this.posts.findIndex((p) => p.id === postID);
    const userPostIndex = this.userPosts.findIndex((p) => p.id === postID);

    if (postIndex >= 0) {
      const newComments = this.posts[postIndex].comments.map((c) => {
        if (c.id === updatedComment.id) {
          return updatedComment;
        }
        return c;
      });
      this.posts.splice(postIndex, 1, {
        ...this.posts[postIndex],
        comments: newComments,
        // comments: this.posts[postIndex].comments.concat(newComments),
      });
    }
    if (userPostIndex >= 0) {
      const newCommentsUser = this.userPosts[userPostIndex].comments.map(
        (c) => {
          if (c.id === updatedComment.id) {
            return updatedComment;
          }
          return c;
        }
      );
      this.userPosts.splice(userPostIndex, 1, {
        ...this.userPosts[userPostIndex],
        comments: newCommentsUser,
      });
    }
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
          this.userPosts = this.userPosts.filter((post) => post.id !== id);
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
          this.userPosts = this.userPosts.map((p) => {
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

  getComments = (postID, params) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';

    this.setIsLoading(true);
    api
      .getCommentsList(postID, queryString)
      .then((data) => {
        // console.log(data)
        // this.commentsData = data;
        this.setCommentsInPost(postID, data);
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
          const postIndex = this.posts.findIndex((p) => p.id === postID);
          const userPostIndex = this.userPosts.findIndex(
            (p) => p.id === postID
          );

          if (postIndex >= 0) {
            const updatedCommentsPosts = this.posts[postIndex].comments.filter(
              (c) => c.id !== commentID
            );
            this.posts.splice(postIndex, 1, {
              ...this.posts[postIndex],
              comments: updatedCommentsPosts,
            });
          }
          if (userPostIndex >= 0) {
            const updatedCommentsUser = this.userPosts[
              userPostIndex
            ].comments.filter((c) => c.id !== commentID);
            this.userPosts.splice(userPostIndex, 1, {
              ...this.userPosts[userPostIndex],
              comments: updatedCommentsUser,
            });
          }
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
        this.changeCommentsInPost(postID, updatedComment);
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };

  likeComment = (comment, postID) => {
    this.setIsLoading(true);
    api
      .postCommentLike({ ...comment, postID })
      .then((likedComment) => {
        this.changeCommentsInPost(postID, likedComment);
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };

  dislikeComment = (commentID, postID) => {
    this.setIsLoading(true);
    api
      .deleteCommentLike(commentID, postID)
      .then((dislikedComment) => {
        this.changeCommentsInPost(postID, dislikedComment);
      })
      .catch((err) => addError(err))
      .finally(this.setIsLoading(false));
  };
}

export default new PostsStore();
