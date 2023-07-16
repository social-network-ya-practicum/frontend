import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './edit-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import MainAvatar from '../../components/main-avatar/main-avatar';
import InfoForm from '../../components/info-form/info-form';
import { getMonthNumber } from '../../utils/utils';

const EditPage = observer(() => {
  const { userStore } = useStore();
  const { user, patchUser, patchUserAvatar, isLoading, isLoadingAvatar } =
    userStore;

  const handleSubmitAvatar = useCallback(
    (photo, closeEditMode) => {
      patchUserAvatar({ ...user, photo }).then((isSuccess) => {
        if (isSuccess) closeEditMode();
      });
    },
    [user, patchUserAvatar]
  );

  const handleSubmitForm = useCallback(
    (inputs) => {
      const data = {
        ...inputs,
        id: user.id,
        birthday_day: Number(inputs.birthday_day),
        birthday_month: getMonthNumber(inputs.birthday_month),
      };

      patchUser(data);
    },
    [user, patchUser]
  );

  return (
    <section className={styles.editPage}>
      <MainAvatar
        onSubmit={handleSubmitAvatar}
        avatar={user ? user.photo : null}
        mix={styles.mixMainAvatar}
        disabled={isLoadingAvatar}
      />
      <InfoForm onSubmit={handleSubmitForm} user={user} disabled={isLoading} />
    </section>
  );
});

export default EditPage;
