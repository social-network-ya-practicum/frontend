/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { getCookie } from './utils';
import { TOKEN_NAME, MAINAPI_URL } from './settings';
import { CustomError, handleErrors } from './errors-handler';

class MainApi {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _handleResponse = async (res, funcName) => {
    if (res.status === 204) {
      return {};
    }
    if (res.ok) {
      return res.json();
    }

    try {
      return await res.json().then((err) => {
        const message = err.errors[0].detail;
        throw new CustomError(
          handleErrors({
            message,
            code: res.status,
            from: funcName,
          })
        );
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        handleErrors({
          message: error.message,
          code: res.status,
          from: funcName,
        })
      );
    }
  };

  _handleError = (error, funcName) => {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(
      handleErrors({
        message: error.message,
        from: funcName,
      })
    );
  };

  /**
   * Авторизация НАЧАЛО
   */

  /** Вход */

  login = ({ email, password }) =>
    fetch(`${this._url}/auth/token/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this._handleResponse(res, 'login'))
      .catch((err) => this._handleError(err, 'login'));

  /** Выход */
  logout = () =>
    fetch(`${this._url}/auth/token/logout/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'logout'))
      .catch((err) => this._handleError(err, 'logout'));

  /**
   * Авторизация - КОНЕЦ
   */

  /**
   * DELETE - запросы НАЧАЛО
   */

  /** Удаляем пост */
  deletePost = (postID) =>
    fetch(`${this._url}/posts/${postID}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'deletePost'))
      .catch((err) => this._handleError(err, 'deletePost'));

  /**  Удаляем like */
  deleteLike = (data) =>
    fetch(`${this._url}/posts/${data.id}/like/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'deleteLike'))
      .catch((err) => this._handleError(err, 'deleteLike'));

  /** Удаляем пользователя */
  deleteUser = (userID) =>
    fetch(`${this._url}/users/${userID}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'deleteUser'))
      .catch((err) => this._handleError(err, 'deleteUser'));

  /** Удаляем комментарий */
  deleteComment = (commentID, postID) =>
    fetch(`${this._url}/posts/${postID}/comments/${commentID}/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'deleteComment'))
      .catch((err) => this._handleError(err, 'deleteComment'));

  /** Удаляем like комментарию */
  deleteCommentLike = (commentID, postID) =>
    fetch(`${this._url}/posts/${postID}/comments/${commentID}/like/`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'deleteCommentLike'))
      .catch((err) => this._handleError(err, 'deleteCommentLike'));

  /**
   * DELETE - запросы конец
   */

  /**
   * GET - запросы НАЧАЛО
   */

  /** Получаем адресную книгу */
  getAddressBook = (params) =>
    fetch(`${this._url}/addressbook${params}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getAddressBook'))
      .catch((err) => this._handleError(err, 'getAddressBook'));

  /** Получаем список дней рождений */
  getBirthdayList = () =>
    fetch(`${this._url}/birthday_list`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getBirthdayList'))
      .catch((err) => this._handleError(err, 'getBirthdayList'));

  /** Получаем список постов */
  getPostsList = () =>
    fetch(`${this._url}/posts`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getPostsList'))
      .catch((err) => this._handleError(err, 'getPostsList'));

  /** Получаем пост */
  getPost = (postID) =>
    fetch(`${this._url}/posts/${postID}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getPost'))
      .catch((err) => this._handleError(err, 'getPost'));

  /** Получаем список пользователей */
  getUsersList = () =>
    fetch(`${this._url}/users`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getUsersList'))
      .catch((err) => this._handleError(err, 'getUsersList'));

  /** Получаем данные текущего пользователя */
  getCurrentUserData = () =>
    fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getCurrentUserData'))
      .catch((err) => this._handleError(err, 'getCurrentUserData'));

  /** Получаем данные стороннего пользователя */
  getUserData = (userID) =>
    fetch(`${this._url}/users/${userID}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getUserData'))
      .catch((err) => this._handleError(err, 'getUserData'));

  /** Получаем краткую информацию о пльзователе */
  getUserShortData = (userID) =>
    fetch(`${this._url}/users/short_info/${userID}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getUserShortData'))
      .catch((err) => this._handleError(err, 'getUserShortData'));

  /** Получаем список постов пользователя */
  getUserPostsList = (userID) =>
    fetch(`${this._url}/users/${userID}/posts`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getUserPostsList'))
      .catch((err) => this._handleError(err, 'getUserPostsList'));

  /** Получаем список комментариев */
  getCommentsList = (postID, params = '') =>
    fetch(`${this._url}/posts/${postID}/comments${params}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getCommentsList'))
      .catch((err) => this._handleError(err, 'getCommentsList'));

  /** Получаем комментарий */
  getComment = (commentID, postID) =>
    fetch(`${this._url}/posts/${postID}/comments/${commentID}`, {
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
    })
      .then((res) => this._handleResponse(res, 'getComment'))
      .catch((err) => this._handleError(err, 'getComment'));

  /**
   * GET - запросы конец
   */

  /**
   * PATCH - запросы НАЧАЛО
   */

  /**  Редактируем данные пользователя */
  patchUserData = (data) =>
    fetch(`${this._url}/users/${data.id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
      body: JSON.stringify({
        first_name: data.first_name,
        last_name: data.last_name,
        middle_name: data.middle_name,
        job_title: data.job_title,
        personal_email: data.personal_email,
        corporate_phone_number: data.corporate_phone_number,
        personal_phone_number: data.personal_phone_number,
        birthday_day: data.birthday_day,
        birthday_month: data.birthday_month,
        bio: data.bio,
        photo: data.photo,
        department: data.department,
      }),
    })
      .then((res) => this._handleResponse(res, 'patchUserData'))
      .catch((err) => this._handleError(err, 'patchUserData'));

  /** Редактируем пост пользователя */
  patchUserPost = (data) =>
    fetch(`${this._url}/posts/${data.id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
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
    })
      .then((res) => this._handleResponse(res, 'patchUserPost'))
      .catch((err) => this._handleError(err, 'patchUserPost'));

  /** Редактируем комментарий */
  patchComment = (data) =>
    fetch(`${this._url}/posts/${data.postID}/comments/${data.id}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
      body: JSON.stringify({
        text: data.text,
        author: data.author,
      }),
    })
      .then((res) => this._handleResponse(res, 'patchComment'))
      .catch((err) => this._handleError(err, 'patchComment'));

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
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
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
        files: data.files,
        group: data.group,
      }),
    })
      .then((res) => this._handleResponse(res, 'postUserPost'))
      .catch((err) => this._handleError(err, 'postUserPost'));

  /**  Ставим like посту */
  postLike = (data) =>
    fetch(`${this._url}/posts/${data.id}/like/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
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
    })
      .then((res) => this._handleResponse(res, 'postLike'))
      .catch((err) => this._handleError(err, 'postLike'));

  /** Сменить пароля */
  setNewPass = (data) =>
    fetch(`${this._url}/users/set_password/`, {
      method: 'POST',
      credentials: 'includes',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
      body: JSON.stringify({
        new_password: data.newPassword,
        current_password: data.currentPassword,
      }),
    })
      .then((res) => this._handleResponse(res, 'setNewPass'))
      .catch((err) => this._handleError(err, 'setNewPass'));

  /** Создаем комментарий */
  postComment = (data) =>
    fetch(`${this._url}/posts/${data.postID}/comments/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
      body: JSON.stringify({
        text: data.text,
        author: data.author,
      }),
    })
      .then((res) => this._handleResponse(res, 'postComment'))
      .catch((err) => this._handleError(err, 'postComment'));

  /** Ставим like комментарию */
  postCommentLike = (data) =>
    fetch(`${this._url}/posts/${data.postID}/comments/${data.id}/like/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
      body: JSON.stringify({
        text: data.text,
        author: data.author,
      }),
    })
      .then((res) => this._handleResponse(res, 'postCommentLike'))
      .catch((err) => this._handleError(err, 'postCommentLike'));

  /**
   * POST - запросы конец
   */

  /**
   * PUT - запросы НАЧАЛО
   */

  /** Редактируем пост пользователя */
  putUserPost = (data) =>
    fetch(`${this._url}/posts/${data.postID}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
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
    })
      .then((res) => this._handleResponse(res, 'putUserPost'))
      .catch((err) => this._handleError(err, 'putUserPost'));

  /** Редактируем комментарий */
  putComment = (data) =>
    fetch(`${this._url}/posts/${data.postID}/comments/${data.id}/`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        ...this._headers,
        Authorization: `Token ${getCookie(TOKEN_NAME)}`,
      },
      body: JSON.stringify({
        text: data.text,
        author: data.author,
      }),
    })
      .then((res) => this._handleResponse(res, 'putComment'))
      .catch((err) => this._handleError(err, 'putComment'));

  /**
   * PUT - запросы конец
   */
}

const api = new MainApi({
  baseUrl: `${MAINAPI_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
