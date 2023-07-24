import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import defaultImage from './images/default.jpeg';
import trashImage from './images/trash.svg';
import styles from './group-info.module.scss';

function GroupInfo({ id, title, description, imageLink, deleteGroup }) {
  const navigate = useNavigate();

  const unsubscribe = () => {
    deleteGroup(id);
    navigate('/groups');
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.container__image}
        src={imageLink || defaultImage}
        alt="group"
      />
      <h2 className={styles.container__title}>{title}</h2>
      <p className={styles.container__description}>{description}</p>
      <button className={styles.container__button} onClick={unsubscribe}>
        <img src={trashImage} alt="trash" />
        <span>Отписаться</span>
      </button>
    </div>
  );
}

export default GroupInfo;

GroupInfo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  imageLink: PropTypes.string,
  deleteGroup: PropTypes.func.isRequired,
};

GroupInfo.defaultProps = {
  id: 0,
  title: 'Фотогорафируй всё!',
  description: `Группа для тех, кто любит фотографировать 
  и делиться своими находками. 
  Добавляйте посты в сети, делитесь фотографиями из путешествий, 
  задавайте вопросы другим участникам, ставьте реакции. Погнали!`,
  imageLink: '',
};
