import { useCallback } from 'react';

/**
 * Хук возвращает либо функцию-валидатор(если передан тип input в качестве аргумента), либо объект с набором доступных функций-валидаторов.
 *
 * @param {string} inputType - тип проверяемого iput
 * @returns {Object|Function} - объект с функциями-валидаторами, или функция-валидатор
 * @property {Function} -  функция-валидатор, которая возвращает текст ошибки.
 */

function useValidator(inputType) {
	const checkEmail = useCallback((value) => {
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
			return 'Для ввода почты используйте только латинский алфавит, цифры, нижнее подчеркивание и @. Пример ввода user_1@example.com';
		}
		if (!/@[^_]+$/.test(value)) {
			return 'Часть адреса после @ не может содержать символ "_"';
		}
		return '';
	}, []);

	const checkPassword = useCallback((value) => {
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

	if (inputType === undefined) {
		return { checkEmail, checkPassword };
	}

	switch (inputType) {
		case 'email': {
			return checkEmail;
		}
		case 'password': {
			return checkPassword;
		}
		default: {
			return () =>
				console.trace({
					message: 'Переданный в input тип отсутствует в useValidator',
				});
		}
	}
}

export default useValidator;
