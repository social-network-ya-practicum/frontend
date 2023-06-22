import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '../common/button/button';
import styles from './info-form.module.scss';
import InfoInput from '../common/info-input/info-input';
import InfoSelect from '../common/info-select/info-select';
import InfoTextrea from '../common/info-textarea/info-textarea';
import useValidator from '../../hooks/use-validator';

const cn = classNames.bind(styles);

const initialUser = {
  last_name: '',
  first_name: '',
  middle_name: '',
  job_title: '',
  email: '',
  personal_email: '',
  corporate_phone_number: '',
  personal_phone_number: '',
  birthday_day: '1',
  birthday_month: '1',
  bio: '',
};

const initialErrors = {
  last_name: '',
  first_name: '',
  middle_name: '',
  job_title: '',
  email: '',
  personal_email: '',
  corporate_phone_number: '',
  personal_phone_number: '',
  bio: '',
};

const InfoForm = ({ onSubmit, mix, disabled, user }) => {
  const {
    checkEmail,
    checkEmailOnChange,
    checkText,
    checkTextOnChange,
    checkTel,
    checkTelOnChange,
    checkTextarea,
    checkTextareaOnChange,
  } = useValidator();

  const initialInputs = user
    ? {
        last_name: user.last_name,
        first_name: user.first_name,
        middle_name: user.middle_name,
        job_title: user.job_title,
        email: user.email,
        personal_email: user.personal_email,
        corporate_phone_number: user.corporate_phone_number,
        personal_phone_number: user.personal_phone_number,
        birthday_day: user.birthday_day,
        birthday_month: user.birthday_month,
        bio: user.bio,
      }
    : initialUser;

  const [inputValue, setInputValue] = useState(initialInputs);

  const [error, setError] = useState(initialErrors);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (
      ['last_name', 'first_name', 'middle_name', 'job_title'].includes(name)
    ) {
      const err = checkTextOnChange(value);
      setError((prev) => ({ ...prev, [name]: err }));
    }
    if (name === 'personal_email') {
      const err = checkEmailOnChange(value);
      setError((prev) => ({ ...prev, [name]: err }));
    }
    if (['corporate_phone_number', 'personal_phone_number'].includes(name)) {
      const err = checkTelOnChange(value);
      setError((prev) => ({ ...prev, [name]: err }));
    }
    if (name === 'bio') {
      const err = checkTextareaOnChange(value);
      setError((prev) => ({ ...prev, [name]: err }));
    }
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };

  const cnInfoForm = cn('form', mix);

  return (
    <form
      className={cnInfoForm}
      onSubmit={handleSubmit}
      disabled={disabled}
      noValidate
    >
      <fieldset className={styles.form__fieldset}>
        <h3 className={styles['form__fieldset-title']}>Общая инфомация</h3>
        <InfoInput
          type="text"
          name="last_name"
          title="Фамилия"
          value={inputValue.last_name}
          onChange={onChange}
          mix={styles[`mix-info-input`]}
          validator={checkText}
          error={error.last_name}
          setError={setError}
        />
        <InfoInput
          type="text"
          name="first_name"
          title="Имя"
          value={inputValue.first_name}
          onChange={onChange}
          mix={styles[`mix-info-input`]}
          validator={checkText}
          error={error.first_name}
          setError={setError}
        />
        <InfoInput
          type="text"
          name="middle_name"
          title="Отчество"
          value={inputValue.middle_name}
          onChange={onChange}
          mix={styles[`mix-info-input`]}
          validator={checkText}
          error={error.middle_name}
          setError={setError}
        />
        <InfoInput
          type="text"
          name="job_title"
          title="Должность"
          value={inputValue.job_title}
          onChange={onChange}
          mix={styles[`mix-info-input`]}
          validator={checkText}
          error={error.job_title}
          setError={setError}
        />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <h3 className={styles['form__fieldset-title']}>Контакты</h3>
        <InfoInput
          type="email"
          name="email"
          title="Корп почта"
          value={inputValue.email}
          mix={styles[`mix-info-input`]}
        />
        <InfoInput
          type="text"
          name="corporate_phone_number"
          title="Корп телефон"
          value={inputValue.corporate_phone_number}
          onChange={onChange}
          mix={styles[`mix-info-input`]}
          validator={checkTel}
          error={error.corporate_phone_number}
          setError={setError}
        />
        <InfoInput
          type="email"
          name="personal_email"
          title="Личная почта"
          value={inputValue.personal_email}
          onChange={onChange}
          mix={styles[`mix-info-input`]}
          validator={(value) => checkEmail(value, { isRequired: false })}
          error={error.personal_email}
          setError={setError}
        />
        <InfoInput
          type="text"
          name="personal_phone_number"
          title="Личный телефон"
          value={inputValue.personal_phone_number}
          onChange={onChange}
          mix={styles[`mix-info-input`]}
          validator={(value) => checkTel(value, { isRequired: false })}
          error={error.personal_phone_number}
          setError={setError}
        />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <h3 className={styles['form__fieldset-title']}>О себе</h3>
        <div className={styles.form__birthday}>
          <span className={styles['form__label-title']}>День рождения</span>
          <InfoSelect />
        </div>
        <InfoTextrea
          name="bio"
          title="О себе"
          value={inputValue.bio}
          onChange={onChange}
          validator={(value) => checkTextarea(value, { isRequired: false })}
          error={error.bio}
          setError={setError}
        />
      </fieldset>
      <div className={styles['form__btn-wrapper']}>
        <Button width="100%" variant="secondary" disabled={disabled}>
          Отменить
        </Button>
        <Button type="submit" width="100%" disabled={disabled}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default InfoForm;

InfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mix: PropTypes.string,
  disabled: PropTypes.bool,
  user: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
};

InfoForm.defaultProps = {
  mix: undefined,
  disabled: false,
  user: null,
};
