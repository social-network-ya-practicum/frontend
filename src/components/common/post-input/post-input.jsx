import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../../contexts/RootStoreContext';
import styles from './post-input.module.scss';
import RoundIcon from '../round-icon/round-icon';
import defaultAvatar from '../../../image/default-avatar.svg';
import FileBubble from '../file-bubble/file-bubble';
import { generateId } from '../../../utils/utils';
import { regex } from '../../../utils/settings';
import useValidator from '../../../hooks/use-validator';
import useError from '../../../hooks/use-error';

const PostInput = observer(() => {
  const { userStore, postsStore } = useStore();
  const { user } = userStore;
  const { addPost } = postsStore;
  // console.log(isLoading);

  const [value, setValue] = useState('');
  const [heightText, setHeightText] = useState('px');
  const [activeInput, setActiveInput] = useState(false);

  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const [isSmilePopupOpened, setIsSmilePopupOpened] = useState(false);

  const { checkImage } = useValidator();
  const { setError, clearError } = useError();

  function handleCancelFile(id) {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
  }
  const fileList = files.map((file) => (
    <FileBubble
      name={file.file_title}
      key={file.id}
      handleDelete={() => handleCancelFile(file.id)}
    />
  ));

  const textStyle = {
    height: heightText,
  };

  function hanldeActiveInput() {
    setActiveInput(true);
  }

  function hanldeCloseActiveInput() {
    setActiveInput(false);
    setHeightText('19px');
  }

  const handleFileChange = (event) => {
    setActiveInput(true);
    const fileImg = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(fileImg);
    reader.onloadend = () => {
      if (fileImg.type.startsWith('image/')) {
        const err = checkImage(fileImg);
        if (err) {
          setError(err);
          //  refInput.current.value = null;
          return;
        }
        // временное ограничение на добавление картинок
        if (images.length > 1) {
          return;
        }
        setImages([
          ...images,
          {
            image_link: reader.result,
          },
        ]);
      } else {
        if (files.length > 10) {
          return;
        }
        setFiles([
          ...files,
          {
            id: generateId(),
            file_title: fileImg.name,
            file_link: reader.result,
          },
        ]);
      }
    };
  };

  function handleOpenPopup() {
    setIsSmilePopupOpened(!isSmilePopupOpened);
  }

  // временная фукция для рендера смайликов

  function renderSmiles(length) {
    const arr = [];
    for (let i = 0; i <= length; i += 1) {
      arr[i] = <li className={styles.postInput__popupItem}> </li>;
    }
    return arr;
  }

  const onChange = (event) => {
    const inputValue = event.target.value;
    if (regex.test(inputValue)) {
      setValue(inputValue);
    }
  };

  useEffect(() => {
    setHeightText('auto');
  }, [value]);

  const handleChange = (event) => {
    setHeightText('auto');
    onChange(event);
  };

  const handleInput = (event) => {
    const { target } = event;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setHeightText(`${target.scrollHeight}px`);
  };

  function handleCancelImg() {
    setImages([]);
    setFiles([]);
  }

  function handleAddPost() {
    // console.log(files);

    addPost({
      text: value,
      author: user,
      images: images === [] ? [] : images,
      files: files === [] ? [] : files,
    });
    setValue('');
    handleCancelImg();
    setIsSmilePopupOpened(false);
    hanldeCloseActiveInput();
  }

  useEffect(() => {
    function hanldecloseingActiveInput(event) {
      if (
        activeInput &&
        !event.target.closest('#post-input') &&
        !value &&
        !images[0] &&
        files.length === 0
      ) {
        hanldeCloseActiveInput();
      }
    }

    document.addEventListener('click', hanldecloseingActiveInput);
    return () => {
      document.removeEventListener('click', hanldecloseingActiveInput);
    };
  }, [activeInput, value, images, files]);

  return (
    <div id="post-input" className={styles.postInput}>
      <form className={styles.postInput__form}>
        <div className={styles.postInput__box}>
          <RoundIcon
            size="small"
            src={user.photo || defaultAvatar}
            alt="фото"
          />
          <textarea
            className={styles.postInput__input}
            type="text"
            placeholder="Напишите сообщение..."
            minLength={1}
            maxLength={2000}
            onClick={hanldeActiveInput}
            onChange={handleChange}
            onInput={handleInput}
            rows={1}
            style={textStyle}
            value={value}
          />

          {!activeInput && (
            <div className={styles.postInput__fileBox}>
              <label
                htmlFor="post-input__img"
                className={`${styles.postInput__fileLabel} ${styles.postInput__fileLabel_img}`}
              >
                <input
                  type="file"
                  id="post-input__img"
                  className={styles.postInput__file}
                  onChange={handleFileChange}
                  onClick={() => clearError()}
                />
              </label>

              <label
                htmlFor="post-input__file"
                className={styles.postInput__fileLabel}
              >
                <input
                  type="file"
                  id="post-input__file"
                  className={styles.postInput__file}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>

        {activeInput && (
          <>
            <div className={styles.postInput__prewievBox}>
              {/* превью картинки */}
              {images[0] && (
                <div className={styles.postInput__prewiev}>
                  <img
                    className={styles.postInput__img}
                    src={images[0].image_link}
                    alt="превью"
                  />
                  <button
                    className={styles.postInput__canselBtn}
                    type="button"
                    onClick={handleCancelImg}
                  >
                    {' '}
                  </button>
                </div>
              )}

              {/* превью файлов */}
              {files.length !== 0 && (
                <ul className={styles.postInput__fileList}>{fileList}</ul>
              )}
            </div>

            <div className={styles.postInput__stuff}>
              <div className={styles.postInput__fileBox}>
                <label
                  htmlFor="post-input__img"
                  className={`${styles.postInput__fileLabel} ${styles.postInput__fileLabel_img}`}
                >
                  <input
                    type="file"
                    id="post-input__img"
                    className={styles.postInput__file}
                    onChange={handleFileChange}
                    onClick={() => clearError()}
                  />
                </label>

                <label
                  htmlFor="post-input__file"
                  className={styles.postInput__fileLabel}
                >
                  <input
                    type="file"
                    id="post-input__file"
                    className={styles.postInput__file}
                    onChange={handleFileChange}
                    onClick={() => clearError()}
                  />
                </label>
                <button
                  type="button"
                  className={styles.postInput__smile}
                  onClick={handleOpenPopup}
                >
                  {' '}
                </button>
              </div>
              <button
                type="button"
                className={styles.postInput__btn}
                onClick={handleAddPost}
              >
                Опубликовать
              </button>

              {isSmilePopupOpened && (
                <ul className={styles.postInput__popup}>{renderSmiles(28)}</ul>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
});

export default PostInput;
