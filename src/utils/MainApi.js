import { MAINAPI_URL } from './constants';
import { getCookie } from './utils';
import { TOKEN_NAME } from './settings';

const token = getCookie(TOKEN_NAME);

/* eslint no-underscore-dangle: ["error", { "allow": [
    "_url",
    "_headers",
    "_checkResponse",
    "",
   ] }]
*/
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["_checkResponse"] }] */

class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise((reject) => {
      reject(`Error: ${res.status} ${res.statusText}`);
    });
  }

  /**
   * DELETE - запросы НАЧАЛО
   */

  /** Удаляем пост */
  deletePost = (postID) =>
    fetch(`${this._url}/posts/${postID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /**  Удаляем like */
  deleteLike = (data) =>
    fetch(`${this._url}/posts/${data.postID}/like`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      // .then(res => this._checkResponse(res));
      .then((res) => {
        if (res.ok) {
          return null;
        }
        return Promise((reject) => {
          reject(`Error: ${res.status} ${res.statusText}`);
        });
      });

  /** Удаляем пользователя */
  deleteUser = (userID) =>
    fetch(`${this._url}/users/${userID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /**
   * DELETE - запросы конец
   */

  /**
   * GET - запросы НАЧАЛО
   */

  /** Получаем адресную книгу */
  getAddressBook = () =>
    fetch(`${this._url}/addressbook`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем список дней рождений */
  getBirthdayList = () =>
    fetch(`${this._url}/birthday_list`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем список постов */
  getPostsList = () =>
    fetch(`${this._url}/posts`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем пост */
  getPost = (postID) =>
    fetch(`${this._url}/posts/${postID}`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем список пользователей */
  getUsersList = () =>
    fetch(`${this._url}/users`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем данные текущего пользователя */
  getCurrentUserData = () =>
    fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем данные стороннего пользователя */
  getUserData = (userID) =>
    fetch(`${this._url}/users/${userID}`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем краткую информацию о пльзователе */
  getUserShortData = (userID) =>
    fetch(`${this._url}/users/short_info/${userID}`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /** Получаем список постов пользователя */
  getUserPostsList = (userID) =>
    fetch(`${this._url}/users/${userID}/posts`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResponse(res));

  /**
   * GET - запросы конец
   */

  /**
   * PATCH - запросы НАЧАЛО
   */

  /**  Редактируем данные пользователя */
  patchUserData = (data) =>
    fetch(`${this._url}/users/${data.userID}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName,
        job_title: data.jobTitle,
        personal_email: data.personalEmail,
        corporate_phone_number: data.corporatePhoneNumber,
        personal_phone_number: data.personalPhoneNumber,
        bio: data.bio,
      }),
    }).then((res) => this._checkResponse(res));

  /** Редактируем пост пользователя */
  patchUserPost = (data) =>
    fetch(`${this._url}/posts/${data.postID}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        text: data.text,
        author: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName,
          job_title: data.jobTitle,
          personal_email: data.personalEmail,
          corporate_phone_number: data.corporatePhoneNumber,
          personal_phone_number: data.personalPhoneNumber,
          bio: data.bio,
        },
        images: data.images,
      }),
    }).then((res) => this._checkResponse(res));

  /**
   * PATCH - запросы конец
   */

  /**
   * POST - запросы НАЧАЛО
   */

  /**  Создаём пост */
  postUserPost = (data) =>
    fetch(`${this._url}/posts/`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        text: data.text,
        author: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName,
          job_title: data.jobTitle,
          personal_email: data.personalEmail,
          corporate_phone_number: data.corporatePhoneNumber,
          personal_phone_number: data.personalPhoneNumber,
          bio: data.bio,
        },
        images: data.images,
      }),
    }).then((res) => this._checkResponse(res));

  /**  Ставим like посту */
  postLike = (data) =>
    fetch(`${this._url}/posts/${data.postID}/like/`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        text: data.text,
        author: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName,
          job_title: data.jobTitle,
          personal_email: data.personalEmail,
          corporate_phone_number: data.corporatePhoneNumber,
          personal_phone_number: data.personalPhoneNumber,
          bio: data.bio,
        },
        images: data.images,
      }),
    }).then((res) => this._checkResponse(res));

  /** Сменить пароля */
  setNewPass = (data) =>
    fetch(`${this._url}/users/set_password/`, {
      method: 'POST',
      credentials: 'includes',
      headers: this._headers,
      body: JSON.stringify({
        new_password: data.newPassword,
        current_password: data.currentPassword,
      }),
    }).then((res) => this._checkResponse(res));

  /**
   * POST - запросы конец
   */

  /**
   * PUT - запросы НАЧАЛО
   */

  /**  Редактируем данные пользователя */
  putUserData = (data) =>
    fetch(`${this._url}/users/${data.userID}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        middle_name: data.middleName,
        job_title: data.jobTitle,
        personal_email: data.personalEmail,
        corporate_phone_number: data.corporatePhoneNumber,
        personal_phone_number: data.personalPhoneNumber,
        bio: data.bio,
      }),
    }).then((res) => this._checkResponse(res));

  /** Редактируем пост пользователя */
  putUserPost = (data) =>
    fetch(`${this._url}/posts/${data.postID}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        text: data.text,
        author: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName,
          job_title: data.jobTitle,
          personal_email: data.personalEmail,
          corporate_phone_number: data.corporatePhoneNumber,
          personal_phone_number: data.personalPhoneNumber,
          bio: data.bio,
        },
        images: data.images,
      }),
    }).then((res) => this._checkResponse(res));

  /**
   * PUT - запросы конец
   */
}

const api = new MainApi({
  baseUrl: `${MAINAPI_URL}`,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  },
});

export default api;
