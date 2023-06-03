import Button from './button';

export default {
	title: 'Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: ['button__primary', 'button__secondary'],
	},
};

export const Primary = {
	args: {
		primary: true,
		label: 'Button',
		backgroundColor: 'button__primary',
	},
};

export const Active = {
	args: {
		label: 'Button',
	},
};

export const Secondary = {
	args: {
		label: 'Button',
		backgroundColor: 'button__secondary',
	},
};
