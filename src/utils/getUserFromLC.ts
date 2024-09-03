import { IUser } from '../interfaces/IUser';

export const getUserFromLS = () => {
  const data = localStorage.getItem('user');
  const user: IUser = data ? JSON.parse(data) : null;
  return user;
};
