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

  // addPost = () =>
}

export default new PostsStore();
