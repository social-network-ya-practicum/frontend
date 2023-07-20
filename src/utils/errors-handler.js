export class CustomError extends Error {
  constructor({ message, code, from, isPrivate }) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.isPrivate = isPrivate;
    this.from = from;
  }
}

export const handleErrors = ({ message, code, from }) => {
  const errData = {
    message,
    code,
    from,
    isPrivate: true,
  };
  console.error(`${code ?? ''} Error from ${from}:\n${message}`);

  if (message === 'Failed to fetch') {
    return {
      ...errData,
      message:
        'К сожалению, сервер временно недоступен. Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова позже. Извините за возможные неудобства',
      isPrivate: false,
    };
  }

  if (
    message === 'Невозможно войти с предоставленными учетными данными.' &&
    from === 'login'
  ) {
    return {
      ...errData,
      message: 'Неверное имя пользователя или пароль',
      isPrivate: false,
    };
  }

  if (from === 'login') {
    return {
      ...errData,
      message: 'Извините, не удалось выполнить вход. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'deletePost') {
    return {
      ...errData,
      message: 'Извините, не удалось удалить пост. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'deleteComment') {
    return {
      ...errData,
      message:
        'Извините, не удалось удалить комментарий. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'getAddressBook') {
    return {
      ...errData,
      message:
        'Извините, не удалось загрузить данные контактов. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'getPostsList') {
    return {
      ...errData,
      message:
        'Извините, произошла ошибка загрузки данных. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'getCurrentUserData' || from === 'getUserData') {
    return {
      ...errData,
      message: 'Извините, произошла ошибка. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'patchUserData') {
    return {
      ...errData,
      message:
        'Извините, не удалось обновить данные пользователя. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (
    from === 'patchComment' ||
    from === 'putUserPost' ||
    from === 'putComment'
  ) {
    return {
      ...errData,
      message: 'Извините, произошла ошибка. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'postUserPost') {
    return {
      ...errData,
      message: 'Извините, не удалось создать пост. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  if (from === 'postComment') {
    return {
      ...errData,
      message:
        'Извините, не удалось оставить комментарий. Свяжитесь с поддержкой',
      isPrivate: false,
    };
  }

  // Данная ошибка обработана в errorStore для redirect при невалидном token
  if (message === 'Недопустимый токен.') {
    return {
      ...errData,
      isPrivate: true,
      message,
    };
  }

  // Данная ошибка обработана в errorStore для redirect при несуществующем юзере
  if (message === 'Страница не найдена.' && from === 'getUserData') {
    return { ...errData, isPrivate: true, message };
  }

  return errData;
};
