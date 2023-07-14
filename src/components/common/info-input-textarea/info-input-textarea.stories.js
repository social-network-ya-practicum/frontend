import { useState } from 'react';
import InfoInputTextarea from './info-input-textarea';
import '../../../index.scss';

export default {
  title: 'InfoInputTextarea',
  component: InfoInputTextarea,
  tags: ['autodocs'],
};

export const Input = (args) => {
  const [state, setState] = useState({
    job_title: 'Разработчик',
  });
  const [error, setError] = useState({
    job_title: '',
  });

  const handleInput = (e) => setState({ email: e.target.value });

  return (
    <div style={{ padding: 40 }}>
      <InfoInputTextarea
        name="job_title"
        title="Должность"
        value={state.job_title}
        onChange={handleInput}
        error={error.personal_email}
        setError={setError}
        // validator={checkEmail}
        {...args}
      />
    </div>
  );
};
