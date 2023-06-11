import PropTypes from 'prop-types';
import iconCake from './icon-birthday-cake.svg';
import styles from './birthday-plate.module.scss';

function BirthdayPlate({ data }) {
  return (
    <section className={styles.birthdayPlate}>
      <div className={styles.birthdayPlate__header}>
        <h2 className={styles.birthdayPlate__title}>Дни рождения</h2>
      </div>
      <ul className={styles.birthdayPlate__list}>
        {data.length > 0 ? (
          data.slice(0, 3).map((person) => (
            <li key={person.id} className={styles.birthdayPlate__item}>
              <div className={styles.birthdayPlate__imgWrapper}>
                <img src={person.photo} alt="Аватар пользователя" />
              </div>
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string,
    })
  ),
};

BirthdayPlate.getDefaultProps = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      photo: '',
    })
  ),
};
