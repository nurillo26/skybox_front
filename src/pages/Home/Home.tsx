import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/user/userSlice';

import styles from './Home.module.css';
import MenuBlock from '../../components/Menu';
import { Outlet, useLocation } from 'react-router-dom';
import { fetchUserFiles } from '../../redux/file/filesSlice';

const Home = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);

  React.useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));

    return () => {
      localStorage.removeItem('user');
      dispatch(setUser(null));
    };
  }, []);

  React.useEffect(() => {
    if (user?.files && user.files.length > 0) {
      appDispatch(fetchUserFiles(user.files));
    }
  }, []);

  return (
    <div className={styles.home_wrapper}>
      <MenuBlock />

      {pathname === '/' ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2>Hello {user?.fullName}</h2>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Home;
