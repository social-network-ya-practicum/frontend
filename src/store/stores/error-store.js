import { makeAutoObservable } from 'mobx';
import { generateId } from '../../utils/utils';

class ErrorStore {
  errors = [];

  privateError = {};

  get isInvalidToken() {
    const { message } = this.privateError;
    return message === 'Недопустимый токен';
  }

  get isContactExist() {
    const { message, from } = this.privateError;
    if (!message && !from) return true;

    return from === 'getUserData' && message !== 'Запрошенный ресурс не найден';
  }

  constructor() {
    makeAutoObservable(this);
  }

  addError = ({ message, id, isPrivate, from }) => {
    const errId = id || generateId();
    if (isPrivate) {
      this.privateError = { id: errId, message, from };
      console.error(`Error from ${from}\n${message}`);
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
