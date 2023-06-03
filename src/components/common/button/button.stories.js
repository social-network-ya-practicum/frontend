import Button from './button';
import '../../../index.scss';

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
		<Button shape="rounded" {...args}>
			Button
		</Button>
		<Button shape="rounded" variant="outlined" {...args}>
			Button
		</Button>
	</div>
);
