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
    (photo) => {
      const data = {
        id: user.id,
        photo,
      };

      patchUserAvatar(data);
    },
    [user.id, patchUserAvatar]
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
    [user.id, patchUser]
  );

  if (!user) return null;

  return (
    <section className={styles['edit-page']}>
      <MainAvatar
        onSubmit={handleSubmitAvatar}
        avatar={user ? user.photo : null}
        mix={styles['mix-main-avatar']}
        disabled={isLoadingAvatar}
      />
      <InfoForm onSubmit={handleSubmitForm} user={user} disabled={isLoading} />
    </section>
  );
});

export default EditPage;
