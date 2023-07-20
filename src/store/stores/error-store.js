import { makeAutoObservable } from 'mobx';
import { generateId } from '../../utils/utils';

class ErrorStore {
  errors = [];

  privateError = {};

  get isInvalidToken() {
    const { message } = this.privateError;
    return message === 'Недопустимый токен.';
  }

  get isContactExist() {
    const { message, from } = this.privateError;
    return !(from === 'getUserData' && message === 'Страница не найдена');
  }

  constructor() {
    makeAutoObservable(this);
  }

  addError = ({ message, id, isPrivate, from }) => {
    const errId = id || generateId();
    if (isPrivate) {
      this.privateError = { id: errId, message, from };
    } else {
      this.errors = [{ id: errId, message, from }, ...this.errors];
    }
  };

  deleteError = (id) => {
    const newArr = this.errors.flatMap((i) => (i.id === id ? [] : i));
    this.errors = newArr;
  };

  clearErrStore = () => {
    this.errors = [];
    this.privateError = {};
  };
}

export default new ErrorStore();
