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
  if (message === 'Failed to fetch') {
    return {
      message:
        'К сожалению, сервер временно недоступен. Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова позже. Извините за возможные неудобства',
      code,
      isPrivate: false,
      from,
    };
  }
  // ----------------------------------------------------------------
  // Ждём, когда бэки вернут ошибки под унифицированным ключом, чтобы можно было их извлечь
  //  и обработать

  // !!! Временно через match !!! Для logout при невалидном токене
  if (message.match(/Недопустимый токен/)) {
    return {
      isPrivate: true,
      message: 'Недопустимый токен',
      code,
      from,
    };
  }

  // !!! Временно через match !!! Для redirect при несуществующем юзере
  if (message.match(/Запрошенный ресурс не найден/) && from === 'getUserData') {
    return {
      isPrivate: true,
      message: 'Запрошенный ресурс не найден',
      code,
      from,
    };
  }

  const mes = `!!!Временно выводим все ошибки!!!\n ${message}`;
  return { message: mes, code, from, isPrivate: false };
};
