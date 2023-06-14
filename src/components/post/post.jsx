import { useState } from 'react';
import styles from './post.module.scss'


function Post(){
  const [isPostChanging, setIsPostchanging] = useState(false) ;
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  function handleEditClick() {
    setIsPostchanging(true)
    setIsPopupOpened(false)
  }

  function handleCancelClick() {
    setIsPostchanging(false)
  }

  function handleOpenPopup() {
    setIsPopupOpened(true)
  }



  return (
  <li className={styles.post}>
    <div className={styles.post__info}>
      <div className={styles.post__avatar}> </div>
      <div className={styles['post__info-box']}>
        <p className={styles.post__owner}>Тамара Райкина</p>
        <span className={styles.post__date}>14 июня 2023</ span>
      </div>
    </div>
    
    <img src='' alt='' className={styles.post__img}/>
    <textarea className={styles.post__text}>Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем?</textarea>
    
    {
    !isPostChanging 
    ?
    <div className= {styles['post__like-container']}>
      <button className={styles.post__like}> </button>
      <span className={styles['post__like-countner']}>8</span>
    </div>
    
    :
    <div className={styles.post__change}>
      <div className={styles.post__add}>
        <button className={styles.post__file}> </button>
        <button className={styles.post__smile}> </button>
      </div>
      <div className={styles.post__btns}>
        <button className={styles['post__btn-cancel']} onClick={handleCancelClick}>Отменить</button>
        <button className ={styles['post__btn-save']}>Сохранить</button> 
      </div>
    </div>
    }
    {/* кнопка редактировать и попап */}
    
    <button className={styles.post__edit} onClick={handleOpenPopup}> </button>

    <div className={`${styles.post__actions} ${isPopupOpened&& styles.post__actions_active}`}>
      <button className={`${styles.post__action}  ${styles.post__action_type_edit}`}  onClick={handleEditClick}>Редактировать пост</button>
      <button className={`${styles.post__action}  ${styles.post__action_type_delete}`}>Удалить пост</button>
    </div>
    
    
  </li>
  )
}

export default Post;
