import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '../common/button/button';
import styles from './info-form.module.scss';
import InfoInput from '../common/info-input/info-input';
import InfoSelect from '../common/info-select/info-select';
import InfoTextrea from '../common/info-textarea/info-textarea';
import useValidator from '../../hooks/use-validator';
import { getDatesList } from '../../utils/utils';
import { monthes } from '../../utils/settings';

const cn = classNames.bind(styles);

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

  const initialInputs = {
    last_name: user ? user.last_name : '',
    first_name: user ? user.first_name : '',
    middle_name: user ? user.middle_name : '',
    job_title: user ? user.job_title : '',
    email: user ? user.email : '',
    personal_email: user ? user.personal_email : '',
    corporate_phone_number: user ? user.corporate_phone_number : '',
    personal_phone_number: user ? user.personal_phone_number : '',
    birthday_day: user ? user.birthday_day : '1',
    birthday_month: user ? user.birthday_month : 'Январь',
    bio: user ? user.bio : '',
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

  const validators = {
    last_name: checkText,
    first_name: checkText,
    middle_name: checkText,
    job_title: (value) => checkText(value, { max: 50 }),
    personal_email: (value) => checkEmail(value, { isRequired: false }),
    corporate_phone_number: checkTel,
    personal_phone_number: (value) => checkTel(value, { isRequired: false }),
    bio: (value) => checkTextarea(value, { isRequired: false }),
  };

  const validatorsOnChange = useMemo(
    () => ({
      last_name: checkTextOnChange,
      first_name: checkTextOnChange,
      middle_name: checkTextOnChange,
      job_title: (value) => checkTextOnChange(value, { max: 50 }),
      personal_email: checkEmailOnChange,
      corporate_phone_number: checkTelOnChange,
      personal_phone_number: checkTelOnChange,
      bio: checkTextareaOnChange,
    }),
    [
      checkTextOnChange,
      checkEmailOnChange,
      checkTelOnChange,
      checkTextareaOnChange,
    ]
  );

  const [inputValue, setInputValue] = useState(initialInputs);

  const [error, setError] = useState(initialErrors);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (validatorsOnChange[name]) {
        const err = validatorsOnChange[name](value);
        setError((prev) => ({ ...prev, [name]: err }));
      }
      setInputValue({ ...inputValue, [name]: value });
    },
    [validatorsOnChange, inputValue]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = false;
    Object.entries(validators).forEach(([k, func]) => {
      const errVal = func(inputValue[k]);
      setError((prev) => ({ ...prev, [k]: errVal }));
      if (err) err = true;
    });
    if (err) return;
    onSubmit(inputValue);
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
          validator={validators.last_name}
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
          validator={validators.first_name}
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
          validator={validators.middle_name}
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
          validator={validators.job_title}
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
          validator={validators.corporate_phone_number}
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
          validator={validators.personal_email}
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
          validator={validators.personal_phone_number}
          error={error.personal_phone_number}
          setError={setError}
        />
      </fieldset>
      <fieldset className={styles.form__fieldset}>
        <h3 className={styles['form__fieldset-title']}>О себе</h3>
        <div className={styles.form__birthday}>
          <span className={styles['form__label-title']}>День рождения</span>
          <InfoSelect
            mix={styles['mix-info-select-day']}
            name="birthday_day"
            optionsList={getDatesList(inputValue.birthday_month)}
            value={inputValue.birthday_day}
            onChange={onChange}
          />
          <InfoSelect
            mix={styles['mix-info-select-month']}
            name="birthday_month"
            optionsList={monthes}
            value={inputValue.birthday_month}
            onChange={onChange}
          />
        </div>
        <InfoTextrea
          name="bio"
          title="О себе"
          value={inputValue.bio}
          onChange={onChange}
          validator={validators.bio}
          error={error.bio}
          setError={setError}
        />
      </fieldset>
      <div className={styles['form__btn-wrapper']}>
        <Button
          width="100%"
          variant="secondary"
          disabled={disabled}
          onClick={() => {
            setInputValue(initialInputs);
            setError(initialErrors);
          }}
        >
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
  user: PropTypes.shape({
    last_name: PropTypes.string,
    first_name: PropTypes.string,
    middle_name: PropTypes.string,
    job_title: PropTypes.string,
    email: PropTypes.string,
    personal_email: PropTypes.string,
    corporate_phone_number: PropTypes.string,
    personal_phone_number: PropTypes.string,
    birthday_day: PropTypes.string,
    birthday_month: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

InfoForm.defaultProps = {
  mix: undefined,
  disabled: false,
};
