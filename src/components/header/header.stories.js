import { Header } from './header';

export default {
	title: 'Header',
	component: Header,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export const LoggedIn = {
	args: {
		user: {
			name: 'Юлия',
		},
	},
};

export const LoggedOut = {
	args: {
	},
};
