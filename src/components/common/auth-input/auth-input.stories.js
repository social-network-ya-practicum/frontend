import { useState } from 'react';
import AuthInput from './auth-input';
import '../../../index.scss';
import useValidator from '../../../hooks/use-validator';

export default {
  title: 'AuthInput',
  component: AuthInput,
  tags: ['autodocs'],
};

export const Email = (args) => {
  const [state, setState] = useState({
    email: '',
  });
  const [error, setError] = useState({
    email: '',
  });

  const { checkEmail } = useValidator();

  const handleInput = (e) => setState({ email: e.target.value });

  return (
    <div style={{ background: '#f3f9ff', padding: 40 }}>
      <AuthInput
        title="Корпоративная почта"
        type="email"
        name="email"
        value={state.email}
        onChange={handleInput}
        placeholder="Введите email"
        error={error.email}
        setError={setError}
        validator={checkEmail}
        {...args}
      />
    </div>
  );
};

export const Password = (args) => {
  const [state, setState] = useState({
    password: '',
  });
  const [error, setError] = useState({
    password: '',
  });

  const { checkPassword } = useValidator();

  const handleInput = (e) => setState({ password: e.target.value });

  return (
    <div style={{ background: '#f3f9ff', padding: 40 }}>
      <AuthInput
        title="Пароль"
        type="password"
        name="password"
        value={state.password}
        onChange={handleInput}
        placeholder="Введите пароль"
        error={error.password}
        setError={setError}
        validator={checkPassword}
        {...args}
      />
    </div>
  );
};
