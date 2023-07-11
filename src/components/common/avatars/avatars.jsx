// import PropTypes from 'prop-types';
import styles from './avatars.module.scss';
import Avatar1 from './image/AvatarsDefault1.svg';
import Avatar2 from './image/AvatarsDefault2.svg';
import Avatar3 from './image/AvatarsDefault3.svg';
import Avatar4 from './image/AvatarsDefault4.svg';
import Avatar5 from './image/AvatarsDefault5.svg';
import Avatar6 from './image/AvatarsDefault6.svg';
import Avatar7 from './image/AvatarsDefault7.svg';
import Avatar8 from './image/AvatarsDefault8.svg';


function Avatars() {

  const avatars = [ Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8 ];

  const avatarsElement = avatars.map((avatar) => (
    <li key={avatars.indexOf(avatar)}>
      <img src={avatar} alt="Аватар" className={styles.avatars__img}/>
    </li>
  ))

  return (
    <div className={styles.avatars}>
      <ul className={styles.avatars__elements}>{avatarsElement}</ul>
    </div>
  );
}

export default Avatars;
