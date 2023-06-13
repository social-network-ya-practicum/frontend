import { makeAutoObservable } from 'mobx';

class PostsStore {
  posts = null;

  constructor() {
    makeAutoObservable(this);
  }

  // setPosts(posts) {
  //   this.posts = posts;
  // }
}

export default new PostsStore();
