import { useState } from 'react';
import styles from './post-input.module.scss'

function PostInput () {

  const [activeInput, setActiveInput] = useState(false)

  function hanldeActiveInput (){
    setActiveInput(!activeInput)
  }

  return (
  <div className={styles['post-input']}>
    <form className={styles['post-input__form']}>
      <div className={styles['post-input__avatar']}> </div>
      <input 
        className={styles['post-input__input']}
        type="text" 
        onClick={hanldeActiveInput}
        placeholder='Напишите сообщение...'
      />
      <div className={styles['post-input__file']}> </div>
      {activeInput&& 
        <button type='submit'>Опубликовать</button>
      }

    </form>
  </div>
  )
}

export default PostInput;
