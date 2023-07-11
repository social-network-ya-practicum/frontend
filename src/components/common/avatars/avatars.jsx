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
  return (
    <div className={styles.avatars}>
      <img src={Avatar1} alt="Аватар1" className={styles.avatars__img} />
      <img src={Avatar2} alt="Аватар2" className={styles.avatars__img} />
      <img src={Avatar3} alt="Аватар3" className={styles.avatars__img} />
      <img src={Avatar4} alt="Аватар4" className={styles.avatars__img} />
      <img src={Avatar5} alt="Аватар5" className={styles.avatars__img} />
      <img src={Avatar6} alt="Аватар6" className={styles.avatars__img} />
      <img src={Avatar7} alt="Аватар7" className={styles.avatars__img} />
      <img src={Avatar8} alt="Аватар8" className={styles.avatars__img} />
    </div>
  );
}

export default Avatars;

/* Avatars.propTypes = {
  
};

Avatars.defaultProps = {
  isOpen: false,
  handleClose: undefined,
}; */
