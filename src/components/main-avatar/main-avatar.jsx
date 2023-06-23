import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '../common/button/button';
import styles from './main-avatar.module.scss';
import useValidator from '../../hooks/use-validator';
import defaultAvatar from '../../image/defaultAvatar.svg';
import { ReactComponent as CloseIcon } from '../../image/close-icon.svg';

const cn = classNames.bind(styles);

const MainAvatar = ({ onSubmit, mix, disabled, avatar }) => {
  const refForm = useRef(null);
  const refInput = useRef(null);
  const { checkImage } = useValidator();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(avatar);
  const [error, setError] = useState('');
  // @TODO: после ответа дизайнеров, вывести ошибку
  console.log('err', error);

  const imgSrc = selectedFile ?? defaultAvatar;

  const handleEditBtnClick = () => {
    setError('');
    setIsEditMode(true);
    refInput.current.click();
  };

  const handleImgClick = () => {
    if (!isEditMode) return;
    setError('');
    refInput.current.click();
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const err = checkImage(file);
    if (err) {
      setError(err);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataURL = event.target.result;
      setSelectedFile(imageDataURL);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(111);
    onSubmit(selectedFile);
  };

  const handleCancelEdit = () => {
    setSelectedFile(avatar);
    setError('');
    setIsEditMode(false);
  };

  const cnMainAvatar = cn('avatar', mix);
  const cnBtnPic = cn('avatar__btn-picture', {
    'avatar__btn-picture_clickable': isEditMode,
  });
  const cnImg = cn('avatar__img', {
    avatar__img_type_default: imgSrc === defaultAvatar,
    avatar__img_clickable: isEditMode && imgSrc === defaultAvatar,
  });
  const cnCloseIcon = cn('avatar__close', {
    avatar__close_disabled: imgSrc === defaultAvatar || !isEditMode,
  });

  return (
    <div className={cnMainAvatar}>
      {imgSrc !== defaultAvatar && (
        <picture className={styles['avatar__img-wrapper']}>
          <source srcSet={imgSrc} media="(min-width: 800px)" />
          <img className={cnImg} src={imgSrc} alt="аватар" />
        </picture>
      )}
      {imgSrc === defaultAvatar && (
        <button onClick={handleImgClick} tabIndex={-1} className={cnBtnPic}>
          <img className={cnImg} src={imgSrc} alt="аватар" />
          {isEditMode && (
            <span className={styles['avatar__default-title']}>
              Добавить фотографию
            </span>
          )}
        </button>
      )}
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
        {!isEditMode && (
          <Button width="100%" onClick={handleEditBtnClick}>
            Редактировать фотографию
          </Button>
        )}
        {isEditMode && (
          <div className={styles['form__btn-wrapper']}>
            <Button
              width="100%"
              variant="secondary"
              disabled={disabled}
              onClick={handleCancelEdit}
            >
              Отменить
            </Button>
            <Button type="submit" width="100%" disabled={disabled}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
      <CloseIcon
        className={cnCloseIcon}
        onClick={() => {
          refInput.current.value = null;
          setSelectedFile(null);
        }}
      />
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
