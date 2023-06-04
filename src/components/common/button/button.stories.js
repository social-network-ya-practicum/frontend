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

export const Rect = (args) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
		<Button fullWidth {...args}>
			Button
		</Button>
		<Button fullWidth color="secondary" {...args}>
			Button
		</Button>
	</div>
);

export const Rounded = (args) => (
	<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
		<Button variant="rounded" {...args}>
			Button
		</Button>
		<Button variant="rounded" viewType="outlined" {...args}>
			Button
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
