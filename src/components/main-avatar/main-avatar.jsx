import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '../common/button/button';
import styles from './main-avatar.module.scss';
import useValidator from '../../hooks/use-validator';
import defaultAvatar from '../../image/defaultAvatar.svg';

const cn = classNames.bind(styles);

const MainAvatar = ({ onSubmit, mix, disabled, avatar }) => {
  const refForm = useRef(null);
  const refInput = useRef(null);
  const { checkImage } = useValidator();

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  // @TODO: после ответа дизайнеров, вывести ошибку
  console.log('err', error);

  const handleBtnClick = () => {
    setFile(null);
    setError('');
    refInput.current.value = null;
    refInput.current.click();
  };

  const onChange = (e) => {
    const value = e.target.files[0];
    const err = checkImage(value);
    if (err) {
      setError(err);
      return;
    }
    setFile(value);
    // setTimeout - для того, чтобы отработал setFile(value)
    // и в handleSubmit переменная file была не null
    setTimeout(() =>
      refForm.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    onSubmit(formData);
  };

  const cnMainAvatar = cn('avatar', mix);

  return (
    <div className={cnMainAvatar}>
      <picture className={styles['avatar__img-wrapper']}>
        <source srcSet={avatar ?? defaultAvatar} media="(min-width: 800px)" />
        <img
          className={styles.avatar__img}
          src={avatar ?? defaultAvatar}
          alt="аватар"
        />
      </picture>
      <p className={styles.avatar__restriction}>
        Размер изображения не более 5мб
      </p>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        disabled={disabled}
        ref={refForm}
        noValidate
      >
        <input
          className={styles.form__input}
          type="file"
          id="main-avatar-file"
          name="image"
          accept=".jpeg, .jpg"
          onChange={onChange}
          ref={refInput}
        />
        <Button width="100%" disabled={disabled} onClick={handleBtnClick}>
          Добавить фотографию
        </Button>
      </form>
    </div>
  );
};

export default MainAvatar;

MainAvatar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mix: PropTypes.string,
  disabled: PropTypes.bool,
  avatar: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
};

MainAvatar.defaultProps = {
  mix: undefined,
  disabled: false,
  avatar: null,
};
