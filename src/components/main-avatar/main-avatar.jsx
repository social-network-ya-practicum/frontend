import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import Button from '../common/button/button';
import styles from './main-avatar.module.scss';
import useValidator from '../../hooks/use-validator';
import defaultAvatar from '../../image/default-avatar.svg';
import editAvatar from '../../image/edit-avatar.svg';
import Avatars from '../common/avatars/avatars';
import { ReactComponent as CloseIcon } from '../../image/close-icon.svg';
import useError from '../../hooks/use-error';

const MainAvatar = ({ onSubmit, mix, disabled, avatar }) => {
  const refForm = useRef(null);
  const refInput = useRef(null);
  const { checkImage } = useValidator();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(avatar);
  const { setError, clearError } = useError();

  let imgSrc = selectedFile;
  if (selectedFile === null && !isEditMode) {
    imgSrc = defaultAvatar;
  }
  if (selectedFile === null && isEditMode) {
    imgSrc = editAvatar;
  }

  const handleEditBtnClick = () => {
    setSelectedFile(null);
    setIsEditMode(true);
    refInput.current.click();
  };

  const handleImgClick = () => {
    if (!isEditMode) return;
    clearError();
    refInput.current.click();
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const err = checkImage(file);
    if (err) {
      setError(err);
      refInput.current.value = null;
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataURL = event.target.result;
      setSelectedFile(imageDataURL);
    };
    reader.readAsDataURL(file);
  };

  const handleCancelEdit = () => {
    setSelectedFile(avatar);
    clearError();
    setIsEditMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile === avatar || selectedFile === null) {
      handleCancelEdit();
      return;
    }
    onSubmit(selectedFile, () => setIsEditMode(false));
  };

  const cnMainAvatar = clsx(styles.avatar, mix);
  const cnImg = clsx(styles.avatar__img, {
    [styles.avatar__img_type_default]: imgSrc === defaultAvatar,
  });
  const cnRestriction = clsx(styles.avatar__restriction, {
    [styles.avatar__restriction_hidden]: !isEditMode || imgSrc === selectedFile,
  });

  return (
    <div className={cnMainAvatar}>
      {imgSrc !== editAvatar && (
        <img className={cnImg} src={imgSrc} alt="аватар" />
      )}
      {imgSrc === editAvatar && (
        <button
          onClick={handleImgClick}
          tabIndex={-1}
          className={styles.avatar__btnPicture}
        >
          <img className={styles.avatar__imgEdit} src={imgSrc} alt="аватар" />
          <span className={styles.avatar__editTitle}>Добавить фотографию</span>
        </button>
      )}

      <p className={cnRestriction}>Размер изображения не более 5мб</p>

      {imgSrc !== editAvatar && isEditMode && (
        <CloseIcon
          className={styles.avatar__close}
          onClick={() => {
            refInput.current.value = null;
            setSelectedFile(null);
          }}
        />
      )}
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
        <Avatars hidden={!isEditMode} setSelectedFile={setSelectedFile} />
        {!isEditMode && (
          <div className={styles.form__btn}>
            <Button width="100%" onClick={handleEditBtnClick}>
              Редактировать фотографию
            </Button>
          </div>
        )}
        {isEditMode && (
          <div className={styles.form__btnWrapper}>
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
