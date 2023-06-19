import { useCallback } from 'react';

/**
 * Хук возвращает объект с набором доступных функций-валидаторов. Функции  с префиксом OnChange предназначены
 * для немедленной валидации на каждый ввод символа
 *
 * @returns {Object} - объект с функциями-валидаторами
 * @property {Function} -  функция-валидатор, которая возвращает текст ошибки.
 */

function useValidator() {
  const checkEmail = useCallback((value) => {
    if (!value) return 'Введите почту';
    if (value.length < 6) {
      return `Минимальное количество символов: 6. Длинна текста сейчас: ${value.length}`;
    }
    if (value.length > 100) {
      return `Максимальное количество символов: 100. Длинна текста сейчас: ${value.length}`;
    }
    if (value.startsWith('@')) {
      return 'Это не полный адрес. Введите его целиком, вместе с той частью, которая находится слева от символа @';
    }
    if (!/@/.test(value)) {
      return 'Пропущен обязательный символ @';
    }
    if (value.match(/@/g)?.[1]) {
      return 'Часть адреса после @ не может содержать другие символы @';
    }
    if (!/^\w+@\w+\.\w+$/.test(value)) {
      return 'Некорректный email. Пример ввода user_1@example.com';
    }
    if (!/@[^_]+$/.test(value)) {
      return 'Часть адреса после @ не может содержать символ "_"';
    }

    return '';
  }, []);

  const checkEmailOnChange = useCallback((value) => {
    if (/[^\w@.]/.test(value)) {
      return 'Для ввода почты используйте только латинский алфавит, цифры, нижнее подчеркивание и @';
    }
    if (value.length > 100) {
      return `Максимальное количество символов: 100. Длинна текста сейчас: ${value.length}`;
    }

    if (/@/.test(value)) {
      if (value.startsWith('@')) {
        return 'Это не полный адрес. Введите его целиком, вместе с той частью, которая находится слева от символа @';
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

  const checkPassword = useCallback((value) => {
    if (!value) return 'Введите пароль';
    if (value.length < 8) {
      return `Минимальное количество символов: 8. Длинна пароля сейчас: ${value.length}`;
    }
    if (value.length > 20) {
      return `Максимальное количество символов: 20. Длинна пароля сейчас: ${value.length}`;
    }
    if (!/^[\w.,!?]+$/.test(value)) {
      return 'Для ввода почты используйте только латинский алфавит, цифры и перечисленные символы: точка, запятая, нижнее подчёркивание, ?,!';
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
  }, []);

  const checkPasswordOnChange = useCallback((value) => {
    if (/[^\w.,!?]/.test(value)) {
      return 'Для ввода почты используйте только латинский алфавит, цифры и перечисленные символы: точка, запятая, нижнее подчёркивание, ?,!';
    }
    if (value.length > 20) {
      return `Максимальное количество символов: 20. Длинна пароля сейчас: ${value.length}`;
    }

    return '';
  }, []);

  return {
    checkEmail,
    checkPassword,
    checkEmailOnChange,
    checkPasswordOnChange,
  };
}

export default useValidator;
