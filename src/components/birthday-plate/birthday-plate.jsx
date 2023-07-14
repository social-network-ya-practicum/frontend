import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import iconCake from './icon-birthday-cake.svg';
import RoundIcon from '../common/round-icon/round-icon';
import defaultAvatar from '../../image/default-avatar.svg';
import styles from './birthday-plate.module.scss';

function BirthdayPlate({ id, data, mix }) {
  const cnBirthdayPlate = clsx(styles.birthdayPlate, mix);

  function date(birthdaydate) {
    const d = new Date(birthdaydate);
    const options = {
      day: 'numeric',
      month: 'long',
    };
    return d.toLocaleString('ru', options);
  }

  return (
    <section className={cnBirthdayPlate}>
      <div className={styles.birthdayPlate__header}>
        <h2 className={styles.birthdayPlate__title}>Дни рождения</h2>
      </div>
      <ul className={styles.birthdayPlate__list}>
        {data.length > 0 ? (
          data.slice(0, 3).map((person) => (
            <li key={person.id} className={styles.birthdayPlate__item}>
              <NavLink
                className={styles.birthdayPlate__link}
                to={
                  person.id === id ? `/${person.id}` : `/contacts/${person.id}`
                }
              >
                <RoundIcon
                  src={person.photo || defaultAvatar}
                  alt="Фото"
                  size="medium"
                  mixBlock={styles.mixRoundIconBlock}
                />
                <div className={styles.birthdayPlate__info}>
                  <p>
                    {person.first_name} {person.last_name}
                  </p>
                  <p>{date(person.birthday_date)}</p>
                </div>
              </NavLink>
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
  id: PropTypes.number,
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
  id: PropTypes.number,
  mix: PropTypes.string,
};

BirthdayPlate.defaultProps = {
  id: 1,
  mix: null,
};
