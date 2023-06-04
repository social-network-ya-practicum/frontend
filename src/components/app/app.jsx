import styles from './app.module.scss';
import BirthdayPlate from '../birthday-plate/birthday-plate';

const data = [
	{
		id: 0,
		photo: null,
		first_name: 'Helen11111111111111111111111111',
		last_name: 'Montana11111111111111111111111111',
		birthday_date: '10 July',
	},
	{
		id: 1,
		photo:
			'https://avatars.mds.yandex.net/i?id=d09d19224c896df74b406968dcf677afdda39416-9151370-images-thumbs&n=13',
		first_name: 'Lora',
		last_name: 'Montana',
		birthday_date: '11 Desember',
	},
	{
		id: 2,
		photo:
			'https://avatars.mds.yandex.net/i?id=d09d19224c896df74b406968dcf677afdda39416-9151370-images-thumbs&n=13',
		first_name: 'Any',
		last_name: 'Montana',
		birthday_date: '1 Feb',
	},
	{
		id: 3,
		photo:
			'https://avatars.mds.yandex.net/i?id=d09d19224c896df74b406968dcf677afdda39416-9151370-images-thumbs&n=13',
		first_name: 'Mia',
		last_name: 'Montana',
		birthday_date: '12 Oct',
	},
];

function App() {
	return (
		<>
			<div className={styles.app}>hello</div>
			<BirthdayPlate data={data} />
		</>
	);
}

export default App;
