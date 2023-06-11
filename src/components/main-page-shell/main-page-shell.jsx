import { Outlet } from 'react-router-dom';
import ProfileBlock from '../profile-block/profile-block';
import BirthdayPlate from '../birthday-plate/birthday-plate';
import styles from './main-page-shell.module.scss';

/** НЕ УДАЛЯТЬ, заглушка для birthdayPlate до настройки api */
// const data = [];
const data = [
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
];

function MainPageShell() {
  return (
    <div className={styles['main-page-shell']}>
      <div className={styles['main-page-shell__box']}>
        <ProfileBlock />
        <BirthdayPlate data={data} mix={styles[`mix-birthday-plate`]} />
        <Outlet />
      </div>
    </div>
  );
}

export default MainPageShell;
