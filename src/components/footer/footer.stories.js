import { withRouter } from 'storybook-addon-react-router-v6';
import Footer from './footer';

export default {
	title: 'Footer',
	component: Footer,
	tags: ['autodocs'],
	decorators: [withRouter],
	parameters: {
		layout: 'fullscreen',
	},
};

export const LoggedIn = {
	args: {
		user: {},
	},
};

export const LoggedOut = {
	args: {},
};
