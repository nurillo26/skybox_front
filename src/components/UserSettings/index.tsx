import { useSelector } from 'react-redux';
import styles from './UserSettings.module.css';
import { RootState } from '../../redux/store';

const UserSettings = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);

  return (
    <div className={styles.wrapper}>
      <div className={styles.settings_title}>User Settings</div>

      <div className={styles.user_info}>
        <div className={styles.full_name}>{user?.fullName}</div>
        <div className={styles.email}>{user?.email}</div>
      </div>
    </div>
  );
};

export default UserSettings;
