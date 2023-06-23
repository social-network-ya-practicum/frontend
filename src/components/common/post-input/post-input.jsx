import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../../contexts/RootStoreContext';
import styles from './post-input.module.scss';

const PostInput = observer(() => {
  const { userStore, postsStore } = useStore();
  const { user } = userStore;

  const [value, setValue] = useState('');
  const [heightText, setHeightText] = useState('px');
  const [activeInput, setActiveInput] = useState(false);
  const [image, setImage] = useState({
    file: null,
    prewiev: null,
  });
  const [isSmilePopupOpened, setIsSmilePopupOpened] = useState(false);
  // const [preview, setPreview] = useState(null);

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
    setImage({
      file: fileImg,
      prewiev: URL.createObjectURL(fileImg),
    });
  };

  function handleOpenPopup() {
    setIsSmilePopupOpened(!isSmilePopupOpened);
  }

  // временная фукция для рендера смайликов

  function renderSmiles(length) {
    const arr = [];
    for (let i = 0; i <= length; i += 1) {
      arr[i] = <li className={styles['post-input__popup-item']}> </li>;
    }
    return arr;
  }

  // console.log(file);
  // console.log(isSmilePopupOpened);

  const onChange = (event) => setValue(event.target.value);

  useEffect(() => {
    setHeightText('auto');
  }, [value]);

  const handleChange = (event) => {
    setHeightText('auto');
    if (onChange) {
      onChange(event);
    }
  };

  const handleInput = (event) => {
    const { target } = event;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
    setHeightText(`${target.scrollHeight}px`);
  };

  function handleCancelfile() {
    setImage({
      file: null,
      prewiev: null,
    });
  }

  function handleAddPost() {
    console.log({ text: value, author: user, image: image.file });
    postsStore.addPost({ text: value, author: user, image: image.file });
  }

  useEffect(() => {
    function hanldecloseingActiveInput(event) {
      if (
        activeInput &&
        !event.target.closest('#post-input') &&
        !value &&
        !image.prewiev
      ) {
        hanldeCloseActiveInput();
      }
    }

    document.addEventListener('click', hanldecloseingActiveInput);
    return () => {
      document.removeEventListener('click', hanldecloseingActiveInput);
    };
  }, [activeInput, value, image]);

  // useEffect(() => {
  //   if (file) {
  //     if (file.type.startsWith('image/')) {
  //       const reader = new FileReader();
  //       // reader.onloadend = () => {
  //       //   setFile(reader.result);
  //       // };
  //       reader.readAsDataURL(file);
  //       // console.log('это изображение');
  //     } else {
  //       // console.log('это не изображение');
  //     }
  //   }
  // }, [file]);

  return (
    <div id="post-input" className={styles['post-input']}>
      <form className={styles['post-input__form']}>
        <div className={styles['post-input__box']}>
          <div className={styles['post-input__avatar']}> </div>
          <textarea
            className={styles['post-input__input']}
            type="text"
            placeholder="Напишите сообщение..."
            maxLength={2000}
            onClick={hanldeActiveInput}
            onChange={handleChange}
            onInput={handleInput}
            rows={1}
            style={textStyle}
          />

          {!activeInput && (
            <label
              htmlFor="post-input__file"
              className={styles['post-input__file-label']}
            >
              <input
                type="file"
                id="post-input__file"
                className={styles['post-input__file']}
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        {activeInput && (
          <>
            {image.prewiev && (
              <div className={styles['post-input__prewiev']}>
                <img
                  className={styles['post-input__img']}
                  src={image.prewiev}
                  alt="превью"
                />
                <button
                  className={styles['post-input__cansel-btn']}
                  type="button"
                  onClick={handleCancelfile}
                >
                  {' '}
                </button>
              </div>
            )}
            <div className={styles['post-input__stuff']}>
              <div>
                <label
                  htmlFor="post-input__file"
                  className={styles['post-input__file-label']}
                >
                  <input
                    type="file"
                    id="post-input__file"
                    className={styles['post-input__file']}
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  type="button"
                  className={styles['post-input__smile']}
                  onClick={handleOpenPopup}
                >
                  {' '}
                </button>
              </div>
              <button
                type="button"
                className={styles['post-input__btn']}
                onClick={handleAddPost}
              >
                Опубликовать
              </button>

              {isSmilePopupOpened && (
                <ul className={styles['post-input__popup']}>
                  {/* <li className={styles['post-input__popup-item']}> </li> */}
                  {renderSmiles(28)}
                </ul>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
});

export default PostInput;
