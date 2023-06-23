// import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './edit-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import MainAvatar from '../../components/main-avatar/main-avatar';
import InfoForm from '../../components/info-form/info-form';
// import { setCookie } from '../../utils/utils';
// import { TOKEN_NAME } from '../../utils/settings';

const EditPage = observer(() => {
  const { userStore } = useStore();
  const { user } = userStore;

  // const handleSubmit = useCallback((input) => input, []);
  if (!user) return null;
  return (
    <section className={styles['edit-page']}>
      <MainAvatar
        onSubmit={() => undefined}
        avatar={user.photo}
        mix={styles['mix-main-avatar']}
      />
      <InfoForm onSubmit={() => undefined} user={user} />
    </section>
  );
});

export default EditPage;
