import { useCallback } from 'react';

/**
 * Хук возвращает объект с набором доступных функций-валидаторов {
 *    checkEmail,
 *    checkEmailOnChange,
 *    checkPassword,
 *    checkPasswordOnChange,
 *    checkImage
 *    checkText,
 *    checkTextOnChange
 *    checkTel
 *    checkTelOnChange,
 *    checkTextarea,
 *    checkTextareaOnChange,
 * }.
 * Функции  с префиксом OnChange предназначены
 * для немедленной валидации на каждый ввод символа
 *
 * @returns {Object} - объект с функциями-валидаторами
 *
 * Функции-валидаторы принимают два аргумента - строку для проверки и объект опций.
 * Для общих функций валидаторов:
 * @param {string} value - первый аргумент - строка.
 * @param {Object} options - второй аргумент - объект опций.
 * @param {number} [options.min] - опция min - минимальная длинна строки
 * @param {number} [options.max] - опция max - максимальная длинна строки
 * @param {boolean} [options.isRequired] - опция isRequired указывает на статус поля ввода.
 * @returns {string} - функция возвращает текст ошибки, либо пустую строку при успешной
 * валидации
 *
 * Для функций валидаторов с постфиксом OnChange:
 * @param {string} value - первый аргумент - строка.
 * @param {Object} options - второй аргумент - объект опций.
 * @param {number} [options.max] - опция max - максимальная длинна строки
 * @returns {string} - функция возвращает текст ошибки, либо пустую строку при успешной
 * валидации
 */

function useValidator() {
  const checkEmail = useCallback(
    (value, { min = 6, max = 100, isRequired = true } = {}) => {
      if (!isRequired && !value) return '';
      if (!value) return 'Поле обязательно для заполнения';
      if (/[^\w@.]/.test(value)) {
        return 'Недопустимый символ ввода';
      }
      if (value.length > max) {
        return `Максимальное количество символов: ${max}`;
      }
      if (value.startsWith('@')) {
        return 'Пропущена часть почты слева от символа @';
      }
      if (value.match(/@/g)?.[1]) {
        return 'Часть адреса после @ не может содержать другие символы @';
      }
      if (value.length < min) {
        return `Минимальное количество символов: ${min}`;
      }
      if (!/@/.test(value)) {
        return 'Пропущен обязательный символ @';
      }
      if (!/^\w+@\w+\.\w+$/.test(value)) {
        return 'Некорректный email. Пример ввода user_1@example.com';
      }
      if (!/@[^_]+$/.test(value)) {
        return 'Часть адреса после @ не может содержать символ "_"';
      }

      return '';
    },
    []
  );

  const checkEmailOnChange = useCallback((value, { max = 100 } = {}) => {
    if (/[^\w@.]/.test(value)) {
      return 'Недопустимый символ ввода';
    }
    if (value.length > max) {
      return `Максимальное количество символов: ${max}`;
    }

    if (/@/.test(value)) {
      if (value.startsWith('@')) {
        return 'Пропущена часть почты слева от символа @';
      }

      if (value.match(/@/g)?.[1]) {
        return 'Часть адреса после @ не может содержать другие символы @';
      }
      if (!/@[^_]*$/.test(value)) {
        return 'Часть адреса после @ не может содержать символ "_"';
      }
    }

    return '';
  }, []);

  const checkPassword = useCallback(
    (value, { min = 8, max = 20, isRequired = true } = {}) => {
      if (!isRequired && !value) return '';
      if (!value) return 'Поле обязательно для заполнения';
      if (/[^\w.,!?]/.test(value)) {
        return 'Недопустимый символ ввода';
      }
      if (value.length > max) {
        return `Максимальное количество символов: ${max}`;
      }
      if (value.length < min) {
        return `Минимальное количество символов: ${min}`;
      }
      if (!/^[\w.,!?]+$/.test(value)) {
        return 'Недопустимый символ ввода';
      }
      if (!/[A-Z]/.test(value)) {
        return 'Обязательна минимум одна заглавная буква';
      }
      if (!/[a-z]/.test(value)) {
        return 'Обязательна минимум одна строчная буква';
      }
      if (!/[0-9]/.test(value)) {
        return 'Обязательна минимум одна цифра';
      }
      return '';
    },
    []
  );

  const checkPasswordOnChange = useCallback((value, { max = 20 } = {}) => {
    if (/[^\w.,!?]/.test(value)) {
      return 'Недопустимый символ ввода';
    }
    if (value.length > max) {
      return `Максимальное количество символов: ${max}`;
    }
    return '';
  }, []);

  const checkImage = useCallback((value) => {
    const maxSize = 5 * 1024 * 1024; // 5 MB
    const { name, size } = value;
    if (!/(.jpg)|(.jpeg)$/.test(name)) {
      return 'Допустимый формат для фото: .jpg, .jpeg';
    }
    if (size > maxSize) {
      return 'Размер изображения не более 5мб';
    }
    return '';
  }, []);

  const checkText = useCallback(
    (value, { min = 2, max = 15, isRequired = true } = {}) => {
      if (!isRequired && !value) return '';
      if (!value) return 'Поле обязательно для заполнения';
      if (value.length > max) {
        return `Максимальное количество символов: ${max}`;
      }
      if (/[^А-Яа-я-\s]/.test(value)) {
        return 'Недопустимый символ ввода';
      }
      if (value.length < min) {
        return `Минимальное количество символов: ${min}`;
      }
      if (/[^А-Яа-я-\s]/.test(value)) {
        return 'Недопустимый символ ввода';
      }
      return '';
    },
    []
  );

  const checkTextOnChange = useCallback((value, { max = 15 } = {}) => {
    if (value.length > max) {
      return `Максимальное количество символов: ${max}`;
    }
    if (/[^А-Яа-я-\s]/.test(value)) {
      return 'Недопустимый символ ввода';
    }
    return '';
  }, []);

  const checkTel = useCallback(
    (value, { min = 10, max = 12, isRequired = true } = {}) => {
      if (!isRequired && !value) return '';
      if (!value) return 'Поле обязательно для заполнения';
      if (/[^+\d]/.test(value)) {
        return 'Недопустимый символ ввода';
      }
      if (!/^\+\d*$/.test(value)) {
        return 'Недопустимый формат ввода. Следуйте шаблону +7123456789 ';
      }
      if (value.length > max) {
        return `Максимальное количество символов: ${max}`;
      }
      if (value.length < min) {
        return `Минимальное количество символов: ${min}`;
      }

      return '';
    },
    []
  );

  const checkTelOnChange = useCallback((value, { max = 12 } = {}) => {
    if (!value) return '';
    if (/[^+\d]/.test(value)) {
      return 'Недопустимый символ ввода';
    }

    if (!/^\+\d*$/.test(value)) {
      return 'Недопустимый формат ввода. Следуйте шаблону +7123456789 ';
    }
    if (value.length > max) {
      return `Максимальное количество символов: ${max}`;
    }
    return '';
  }, []);

  const checkTextarea = useCallback(
    (value, { min = 0, max = 500, isRequired = true } = {}) => {
      if (!isRequired && !value) return '';
      if (!value) return 'Поле обязательно для заполнения';
      if (value.length > max) {
        return `Максимальное количество символов: ${max}`;
      }
      if (value.length < min) {
        return `Минимальное количество символов: ${min}`;
      }
      return '';
    },
    []
  );

  const checkTextareaOnChange = useCallback((value, { max = 500 } = {}) => {
    if (value.length > max) {
      return `Максимальное количество символов: ${max}`;
    }
    return '';
  }, []);

  return {
    checkEmail,
    checkPassword,
    checkEmailOnChange,
    checkPasswordOnChange,
    checkImage,
    checkText,
    checkTextOnChange,
    checkTel,
    checkTelOnChange,
    checkTextarea,
    checkTextareaOnChange,
  };
}

export default useValidator;
