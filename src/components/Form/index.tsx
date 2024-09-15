import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/user/userSlice';
import axios from 'axios';

import emailIcon from '../../assets/img/form-icons/email_icon.svg';
import passwordIcon from '../../assets/img/form-icons/password_icon.svg';
import userIcon from '../../assets/img/form-icons/user.svg';
import eyeOpenIcon from '../../assets/img/form-icons/eye.svg';
import eyeCloseIcon from '../../assets/img/form-icons/eye-slash.svg';

import styles from './Form.module.css';
import Input from '../FormInput';

import { IFormData } from '../../interfaces/IFormData';

// Описание инпутов для рендера
const loginInputs = [
  {
    title: 'Email',
    inputType: 'email',
    inputName: 'email',
    iconPath: emailIcon,
    placeholder: 'example@gmail.com',
  },
  {
    title: 'Пароль',
    inputType: 'password',
    inputName: 'password',
    iconPath: passwordIcon,
    placeholder: 'Введите пароль',
    eyeIcon: {
      open: eyeOpenIcon,
      close: eyeCloseIcon,
    },
  },
];

const registerInputs = [
  {
    title: 'Полное имя',
    inputType: 'text',
    inputName: 'fullName',
    iconPath: userIcon,
    placeholder: 'Юрий Бойко',
  },
  {
    title: 'Email',
    inputType: 'email',
    inputName: 'email',
    iconPath: 'src/assets/img/form-icons/email_icon.svg',
    placeholder: 'example@gmail.com',
  },
  {
    title: 'Пароль',
    inputType: 'password',
    inputName: 'password',
    iconPath: 'src/assets/img/form-icons/password_icon.svg',
    placeholder: 'Минимум 8 символов',
    eyeIcon: {
      open: 'src/assets/img/form-icons/eye.svg',
      close: 'src/assets/img/form-icons/eye-slash.svg',
    },
  },
];

const Form = () => {
  const { pathname } = useLocation();
  const [authErrors, setAuthErrors] = React.useState<Partial<IFormData>>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendFormData = async (route: string, data: IFormData) => {
    try {
      axios
        .post(`https://skybox-server-17db72aab202.herokuapp.com${route}`, data)
        .then((res) => {
          dispatch(setUser(res.data.user));
          navigate('/');
        })
        .catch((e) => {
          console.log(e);
          setAuthErrors(e.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Работа с данными формы
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    if (pathname === '/signin') {
      sendFormData(pathname, data);
    } else if (pathname === '/signup') {
      sendFormData(pathname, data);
    }
  };

  return (
    <form className={styles.form_wrap} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.form_title}>Welcome to SkyBox</h1>

      {pathname === '/signin' && (
        <>
          {loginInputs.map((inputDescrip) => (
            <Input
              key={inputDescrip.inputName}
              {...inputDescrip}
              register={register}
              errors={errors}
              authErrors={authErrors}
            />
          ))}

          <button className={styles.form_btn} type="submit">
            Войти
          </button>

          <span className={styles.change_form_block}>
            Нет аккаунта? <Link to="/signup">Зарегистрируйся</Link>
          </span>
        </>
      )}

      {pathname === '/signup' && (
        <>
          {registerInputs.map((inputDescrip) => (
            <Input
              key={inputDescrip.inputName}
              {...inputDescrip}
              register={register}
              errors={errors}
              authErrors={authErrors}
            />
          ))}

          <button className={styles.form_btn} type="submit">
            Зарегистрироваться
          </button>

          <span className={styles.change_form_block}>
            Уже зарегистрированы? <Link to="/signin">Войти</Link>
          </span>
        </>
      )}
    </form>
  );
};

export default Form;
