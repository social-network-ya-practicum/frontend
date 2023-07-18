import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import iconCake from './icon-birthday-cake.svg';
import RoundIcon from '../common/round-icon/round-icon';
import defaultAvatar from '../../image/default-avatar.svg';
import styles from './birthday-plate.module.scss';
import ScrollableContainer from '../common/scrollable-container/scrollable-container';
import { monthsMap } from '../../utils/settings';

function BirthdayPlate({ id, data, mix }) {
  const cnBirthdayPlate = clsx(styles.birthdayPlate, mix);

  const handleDate = (date) => {
    const arr = date.split(' ');
    const day = arr[0];
    const month = monthsMap.get(arr[1]);
    return `${day} ${month}`;
  };

  return (
    <div className={cnBirthdayPlate}>
      <div className={styles.birthdayPlate__header}>
        <h2 className={styles.birthdayPlate__title}>Дни рождения</h2>
      </div>
      {data && data.length > 0 && (
        <ScrollableContainer variant="birthday-plate">
          {data.map((person) => (
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
                  <p>{handleDate(person.birthday_date)}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ScrollableContainer>
      )}
      {data && data.length === 0 && (
        <div className={styles.birthdayPlate__birthdayFreeDay}>
          <img src={iconCake} alt="cake" />
          <p>
            Сегодня в нашей компании никто не отмечает День рождения,
            <br /> но мы желаем вам хорошего дня!
          </p>
        </div>
      )}
    </div>
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
  ),
  mix: PropTypes.string,
};

BirthdayPlate.defaultProps = {
  id: 1,
  data: null,
  mix: null,
};
