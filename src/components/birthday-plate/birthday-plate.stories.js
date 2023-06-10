import BirthdayPlate from './birthday-plate';
import '../../index.scss';

export default {
	title: 'Birthday Plate',
	component: BirthdayPlate,
	tags: ['autodocs'],
};

export const ExampleBirthdayFree = {
	args: {
		data: [],
	},
};

export const ExampleOneBirthday = {
	args: {
		data: [
			{
				id: 0,
				first_name: 'Helen11111111111111111111111111',
				last_name: 'Montana',
				birthday_date: '10 July',
			},
		],
	},
};

export const ExampleFourBirthday = {
	args: {
		data: [
			{
				id: 0,
				first_name: 'Helen11111111111111111111111111',
				last_name: 'Montana11111111111111111111111111',
				birthday_date: '10 July',
			},
			{
				id: 1,
				first_name: 'Lora',
				last_name: 'Montana',
				birthday_date: '11 Desember',
			},
			{
				id: 2,
				first_name: 'Any',
				last_name: 'Montana',
				birthday_date: '1 Feb',
			},
			{
				id: 3,
				first_name: 'Mia',
				last_name: 'Montana',
				birthday_date: '12 Oct',
			},
		],
	},
};
