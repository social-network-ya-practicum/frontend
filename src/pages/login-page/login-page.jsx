import { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import LoginForm from '../../components/login-form/login-form';
import poster from './images/poster.jpg';
import { ReactComponent as CakeIcon } from './images/cake-icon.svg';
import { ReactComponent as CalendarIcon } from './images/calendar-icon.svg';
import { ReactComponent as MessageIcon } from './images/messages-icon.svg';

import styles from './login-page.module.scss';
import { useStore } from '../../contexts/RootStoreContext';
import FakePost from '../../components/common/fake-post/fake-post';

const LoginPage = observer(() => {
  const { userStore } = useStore();
  const { login, isLoading } = userStore;
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  const handleSubmit = useCallback(
    (input) => {
      const { email, password } = input;
      login({ email, password });
    },
    [login]
  );

  const cnRoot = clsx(styles.loginPage, {
    [styles.loginPage_hidden]: !isPosterLoaded,
  });
  const cnLeftBlock = clsx(styles.block, styles.block_type_left);
  const cnRightBlock = clsx(styles.block, styles.block_type_right);
  const cnCakeChip = clsx(styles.block__chip, styles.block__chip_variant_cake);
  const cnCalendarChip = clsx(
    styles.block__chip,
    styles.block__chip_variant_calendar
  );
  const cnMessageChip = clsx(
    styles.block__chip,
    styles.block__chip_variant_message
  );

  return (
    <section className={cnRoot}>
      <div className={cnLeftBlock}>
        <div className={styles.block__leftWrapper}>
          <LoginForm onSubmit={handleSubmit} disabled={isLoading} />
        </div>
      </div>

      <div className={cnRightBlock}>
        <div className={styles.block__rightWrapper}>
          <img
            src={poster}
            alt="Постер"
            className={styles.block__poster}
            onLoad={() => setIsPosterLoaded(true)}
            onError={() => setIsPosterLoaded(true)}
          />

          <div className={cnCakeChip}>
            <CakeIcon />
            Будь в курсе важного
          </div>
          <div className={cnCalendarChip}>
            <CalendarIcon />
            Назначай встречи
          </div>
          <div className={cnMessageChip}>
            <MessageIcon />
            Общайся
          </div>
          <FakePost variant="first" mix={styles.mixFirstFakePost} />
          <FakePost variant="second" mix={styles.mixSecondFakePost} />
        </div>
      </div>
    </section>
  );
});

export default LoginPage;
