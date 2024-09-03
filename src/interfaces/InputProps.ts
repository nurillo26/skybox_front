import { DeepMap, FieldError, FieldValues } from 'react-hook-form';

export interface IFormInputProps {
  title: string;
  inputType: string;
  inputName: string;
  iconPath: string;
  placeholder: string;
  eyeIcon?: {
    open: string;
    close: string;
  };
  register: any;
  errors: DeepMap<FieldValues, FieldError>;
  authErrors: any;
}
