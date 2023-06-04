import { useState } from 'react';
import AuthInput from './auth-input';
import '../../../index.scss';

export default {
	title: 'AuthInput',
	component: AuthInput,
	tags: ['autodocs'],
};

export const Email = (args) => {
	const [state, setState] = useState('Ivanova@ya.ru');

	const handleInput = (e) => setState(e.target.value);

	return (
		<AuthInput
			title="Корпоративная почта"
			type="email"
			name="email"
			value={state}
			onChange={handleInput}
			{...args}
		/>
	);
};

export const Password = (args) => {
	const [state, setState] = useState('12345678');

	const handleInput = (e) => setState(e.target.value);

	return (
		<AuthInput
			title="Пароль"
			type="password"
			name="password"
			value={state}
			onChange={handleInput}
			{...args}
		/>
	);
};
