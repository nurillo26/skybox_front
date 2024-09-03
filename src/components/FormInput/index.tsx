import React from 'react';

import styles from './FormInput.module.css';
import { IFormInputProps } from '../../interfaces/InputProps';

const Input: React.FC<IFormInputProps> = ({
  title,
  inputType,
  inputName,
  iconPath,
  placeholder,
  eyeIcon,
  register,
  errors,
  authErrors,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const getValidationRules = (type: string) => {
    switch (type) {
      case 'email':
        return {
          required: 'Введите email',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Неправильный формат email',
          },
        };
      case 'password':
        return {
          required: 'Введите пароль',
          minLength: {
            value: 8,
            message: 'Пароль должен быть не менее 8 символов',
          },
        };
      default:
        return { required: 'Заполните поле' };
    }
  };

  return (
    <div className={styles.input_block}>
      <span>{title}</span>

      <div className={styles.input_wrap}>
        <div className={`${styles.input_icon} ${styles.input_type_icon}`}>
          <img src={iconPath} alt="icon" />
        </div>

        <input
          className={styles.form_input}
          type={inputType === 'password' ? (showPassword ? 'text' : 'password') : inputType}
          placeholder={placeholder}
          {...register(inputName, getValidationRules(inputType))}
        />
        {inputType === 'password' && (
          <div
            className={`${styles.input_icon} ${styles.input_password_eye}`}
            onClick={() => {
              setShowPassword((prevShowPassword) => !prevShowPassword);
            }}>
            <img src={showPassword ? eyeIcon?.close : eyeIcon?.open} alt="icon" />
          </div>
        )}
      </div>

      {errors[inputName] && <span className={styles.error_block}>{errors[inputName].message}</span>}
      {authErrors && authErrors[inputName] && (
        <span className={styles.error_block}>{authErrors[inputName]}</span>
      )}
    </div>
  );
};

export default Input;
