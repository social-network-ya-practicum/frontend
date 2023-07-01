import PropTypes from 'prop-types';
import clsx from 'clsx';
import iconCake from './icon-birthday-cake.svg';
import BorderGradient from '../common/border-gradient/border-gradient';
import styles from './birthday-plate.module.scss';

function BirthdayPlate({ data, mix }) {
  const cnBirthdayPlate = clsx(styles.birthdayPlate, mix);

  return (
    <section className={cnBirthdayPlate}>
      <div className={styles.birthdayPlate__header}>
        <h2 className={styles.birthdayPlate__title}>Дни рождения</h2>
      </div>
      <ul className={styles.birthdayPlate__list}>
        {data.length > 0 ? (
          data.slice(0, 3).map((person) => (
            <li key={person.id} className={styles.birthdayPlate__item}>
              <BorderGradient size="medium" mix={styles.mixBorderGradient}>
                <img src={person.photo || ''} alt="Фото" />
              </BorderGradient>
              <div className={styles.birthdayPlate__info}>
                <p>
                  {person.first_name} {person.last_name}
                </p>
                <p>{person.birthday_date}</p>
              </div>
            </li>
          ))
        ) : (
          <li className={styles.birthdayPlate__birthdayFreeDay}>
            <img src={iconCake} alt="cake" />
            <p>
              Сегодня в нашей компании никто не отмечает День рождения, но мы
              желаем вам хорошего дня!
            </p>
          </li>
        )}
      </ul>
    </section>
  );
}

export default BirthdayPlate;

BirthdayPlate.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      birthday_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

BirthdayPlate.propTypes = {
  mix: PropTypes.string,
};

BirthdayPlate.defaultProps = {
  mix: null,
};
