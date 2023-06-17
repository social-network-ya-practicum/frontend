import { useEffect, useState } from 'react';
import styles from './post-input.module.scss';

function PostInput() {
  const [activeInput, setActiveInput] = useState(false);

  function hanldeActiveInput() {
    setActiveInput(true);
  }

  function hanldeCloseActiveInput() {
    setActiveInput(false);
  }

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
              <button type="button" className={styles['post-input__file']}>
                {' '}
              </button>
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
