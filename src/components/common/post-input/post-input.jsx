import { useEffect, useState } from 'react';
import styles from './post-input.module.scss';

function PostInput() {
  const [activeInput, setActiveInput] = useState(false);
  const [file, setFile] = useState(null);
  // const [preview, setPreview] = useState(null);

  function hanldeActiveInput() {
    setActiveInput(true);
  }

  function hanldeCloseActiveInput() {
    setActiveInput(false);
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // console.log(file);
  // console.log(preview);

  useEffect(() => {
    function hanldecloseActiveInput(event) {
      if (activeInput && !event.target.closest('#post-input')) {
        hanldeCloseActiveInput();
      }
    }

    document.addEventListener('click', hanldecloseActiveInput);
    return () => {
      document.removeEventListener('click', hanldecloseActiveInput);
    };
  }, [activeInput]);

  useEffect(() => {
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        // reader.onloadend = () => {
        //   setFile(reader.result);
        // };
        reader.readAsDataURL(file);
        // console.log('это изображение');
      } else {
        // console.log('это не изображение');
      }
    }
  }, [file]);

  return (
    <div id="post-input" className={styles['post-input']}>
      <form className={styles['post-input__form']}>
        <div className={styles['post-input__box']}>
          <div className={styles['post-input__avatar']}> </div>
          <input
            className={styles['post-input__input']}
            type="text"
            placeholder="Напишите сообщение..."
            maxLength={2000}
            onClick={hanldeActiveInput}
          />

          {!activeInput && (
            <button type="button" className={styles['post-input__file']}>
              {' '}
            </button>
          )}
        </div>

        {activeInput && (
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
              <button type="button" className={styles['post-input__smile']}>
                {' '}
              </button>
            </div>
            <button
              type="button"
              className={styles['post-input__btn']}
              onClick={hanldeCloseActiveInput}
            >
              Опубликовать
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default PostInput;
