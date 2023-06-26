import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import AuthInput from '../common/auth-input/auth-input';
import Button from '../common/button/button';
import styles from './login-form.module.scss';
import useValidator from '../../hooks/use-validator';

const cn = classNames.bind(styles);

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

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      const err = checkEmailOnChange(value);
      setError((prev) => ({ ...prev, [name]: err }));
    }
    if (name === 'password') {
      const err = checkPasswordOnChange(value);
      setError((prev) => ({ ...prev, [name]: err }));
    }
    setInputValue({ ...inputValue, [name]: value });
  };

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

  const cnLoginForm = cn('form', mix);

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
          mix={styles[`mix-auth-input`]}
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
          mix={styles[`mix-auth-input`]}
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
