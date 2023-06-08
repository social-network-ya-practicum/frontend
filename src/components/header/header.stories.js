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
			first_name: 'Юлия',
      photo: null,
		},
	},
};

export const LoggedOut = {
	args: {
	},
};
