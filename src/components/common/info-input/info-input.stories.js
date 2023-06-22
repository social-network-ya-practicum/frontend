import { useState } from 'react';
import InfoInput from './info-input';
import '../../../index.scss';
// import useValidator from '../../../hooks/use-validator';

export default {
  title: 'InfoInput',
  component: InfoInput,
  tags: ['autodocs'],
};

export const Email = (args) => {
  const [state, setState] = useState({
    personal_email: '',
  });
  const [error, setError] = useState({
    personal_email: '',
  });

  // const { checkEmail } = useValidator();

  const handleInput = (e) => setState({ email: e.target.value });

  return (
    <div style={{ padding: 40 }}>
      <InfoInput
        type="email"
        name="personal_email"
        title="Личная почта"
        value={state.personal_email}
        onChange={handleInput}
        error={error.personal_email}
        setError={setError}
        // validator={checkEmail}
        {...args}
      />
    </div>
  );
};
