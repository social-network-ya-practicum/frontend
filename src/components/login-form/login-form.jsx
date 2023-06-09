import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import AuthInput from '../common/auth-input/auth-input';
import Button from '../common/button/button';
import styles from './login-form.module.scss';
import useValidator from '../../hooks/use-validator';

const LoginForm = ({ onSubmit, mix, disabled }) => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const {
    checkEmail,
    checkPassword,
    checkEmailOnChange,
    checkPasswordOnChange,
  } = useValidator();

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === 'email') {
        const err = checkEmailOnChange(value);
        setError((prev) => ({ ...prev, [name]: err }));
      }
      if (name === 'password') {
        const err = checkPasswordOnChange(value);
        setError((prev) => ({ ...prev, [name]: err }));
      }
      setInputValue((prev) => ({ ...prev, [name]: value }));
    },
    [checkEmailOnChange, checkPasswordOnChange]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const errEmail = checkEmail(inputValue.email);
    const errPassword = checkPassword(inputValue.password);
    if (errEmail || errPassword) {
      setError({ email: errEmail, password: errPassword });
      return;
    }
    onSubmit(inputValue);
  };

  const cnLoginForm = clsx(styles.form, mix);

  return (
    <form className={cnLoginForm} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.form__title}>
        Добро пожаловать в корпоративную сеть
      </h2>
      <div className={styles.form__container}>
        <AuthInput
          type="email"
          name="email"
          title="Корпоративная почта"
          value={inputValue.email}
          onChange={onChange}
          mix={styles.mixAuthInput}
          placeholder="Введите email"
          error={error.email}
          setError={setError}
          validator={checkEmail}
        />
        <AuthInput
          type="password"
          name="password"
          title="Пароль"
          value={inputValue.password}
          onChange={onChange}
          mix={styles.mixAuthInput}
          placeholder="Введите пароль"
          error={error.password}
          setError={setError}
          validator={checkPassword}
        />
        <Button type="submit" width="249px" disabled={disabled}>
          Войти
        </Button>
      </div>

      {/* !ДЛЯ УДАЛЕНИЯ! Данные для входа под тестовым аккаунтом */}
      {/* <div style={{ position: 'absolute', left: -200 }}>
        Для входа
        <p>email: test@test.test </p>
        <p> password: Frontend23</p>
      </div> */}
      {/* --------------------------------------------------------- */}
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mix: PropTypes.string,
  disabled: PropTypes.bool,
};

LoginForm.defaultProps = {
  mix: undefined,
  disabled: false,
};
