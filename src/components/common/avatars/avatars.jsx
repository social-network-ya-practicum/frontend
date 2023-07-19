import PropTypes from 'prop-types';
import clsx from 'clsx';
import { avatarsData } from './data';
import styles from './avatars.module.scss';

const Avatars = ({ setSelectedFile, hidden }) => {
  const cnAvatars = clsx(styles.avatars, { [styles.avatars_hidden]: hidden });

  const handleSelection = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cnAvatars}>
      <ul className={styles.avatars__list}>
        {avatarsData.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              className={styles.avatars__btn}
              onClick={() => handleSelection(i.avatar)}
            >
              <img
                src={i.avatar}
                alt="Аватар"
                className={styles.avatars__img}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Avatars;

Avatars.propTypes = {
  setSelectedFile: PropTypes.func,
  hidden: PropTypes.bool,
};

Avatars.defaultProps = {
  setSelectedFile: undefined,
  hidden: false,
};
