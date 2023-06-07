import Button from './button';
import '../../../index.scss';
import svgIcon from './images/sbExampleBefore.svg';
import avatar from './images/sbExampleAfter.svg';

export default {
	title: 'Button',
	component: Button,
	tags: ['autodocs'],
};

export const Default = {
	args: {
		children: 'Button',
	},
};

export const Rounded = (args) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
		<Button {...args}>Button</Button>
		<Button viewType="outlined" {...args}>
			Button
		</Button>
		<Button maxWidth="147px" {...args}>
			Вход
		</Button>
		<Button viewType="outlined" maxWidth="147px" {...args}>
			Регистрация
		</Button>
	</div>
);

export const Text = (args) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
		<Button variant="text" {...args}>
			<img src={svgIcon} alt="icon" />
			<span style={{ marginLeft: '8px' }}>Лента</span>
		</Button>
		<Button variant="text" {...args}>
			<span style={{ marginRight: '8px' }}>Юзер</span>
			<img src={avatar} alt="avatar" />
		</Button>
	</div>
);
