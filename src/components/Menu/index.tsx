import { Link, NavLink } from 'react-router-dom';

import styles from './MenuBlock.module.css';
import MenuLink from '../MenuLink';

import logo from '../../assets/img/logo.svg';
import storageIcon from '../../assets/img/nav_menu-icons/storage-icon.svg';
import statisticsIcon from '../../assets/img/nav_menu-icons/statistics.svg';
import settingsIcon from '../../assets/img/nav_menu-icons/settings.svg';
import cloudIcon from '../../assets/img/nav_menu-icons/cloud-icon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MenuBlock = () => {
  const diskUsedSpace = useSelector((state: RootState) => state.filesSlice.totalFileSize);
  const user = useSelector((state: RootState) => state.userSlice.user);

  const convertBytesToMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2);

  const usedSpacePercentage = (diskUsedSpace / user!.diskSpace) * 100;

  const progressBarColor = (percentage: number): string => {
    if (percentage <= 30) return '#2d6930 '; // Green
    if (percentage <= 60) return '#ffeb3b'; // Yellow
    if (percentage <= 85) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  return (
    <nav className={styles.menu_block_wrap}>
      <div className={styles.menu_header}>
        <Link to="/">
          <img src={logo} alt="logo" />
          <span className={styles.menu_header_title}>sky.box</span>
        </Link>
      </div>

      <div className={styles.menu}>
        <div className={styles.menu_links}>
          <MenuLink imgUrl={storageIcon} title="Storage" />
          <MenuLink imgUrl={statisticsIcon} title="Statistics" />
          <MenuLink imgUrl={settingsIcon} title="Setting" />
        </div>

        <div className={styles.menu_footer}>
          <NavLink className={styles.logout_btn} to={'/signin'}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.9999 11.6667V9.66671C10.9999 9.29852 10.7014 9.00004 10.3333 9.00004C9.96506 9.00004 9.66658 9.29852 9.66658 9.66671V11.6667C9.66658 12.0349 9.36811 12.3334 8.99992 12.3334H2.33325C1.96506 12.3334 1.66659 12.0349 1.66659 11.6667V2.33337C1.66659 1.96518 1.96506 1.66671 2.33325 1.66671H8.99992C9.36811 1.66671 9.66658 1.96518 9.66658 2.33337V4.33337C9.66658 4.70156 9.96506 5.00004 10.3333 5.00004C10.7014 5.00004 10.9999 4.70156 10.9999 4.33337V2.33337C10.9999 1.2288 10.1045 0.333374 8.99992 0.333374H2.33325C1.22868 0.333374 0.333252 1.2288 0.333252 2.33337V11.6667C0.333252 12.7713 1.22868 13.6667 2.33325 13.6667H8.99992C10.1045 13.6667 10.9999 12.7713 10.9999 11.6667ZM12.1399 5.19337L13.4733 6.52671C13.5995 6.65189 13.6705 6.82228 13.6705 7.00004C13.6705 7.1778 13.5995 7.3482 13.4733 7.47337L12.1399 8.80671C12.0147 8.93292 11.8443 9.00391 11.6666 9.00391C11.4888 9.00391 11.3184 8.93292 11.1933 8.80671C11.067 8.68153 10.9961 8.51113 10.9961 8.33337C10.9961 8.15562 11.067 7.98522 11.1933 7.86004L11.3933 7.66671H6.99992C6.63173 7.66671 6.33325 7.36823 6.33325 7.00004C6.33325 6.63185 6.63173 6.33337 6.99992 6.33337H11.3933L11.1933 6.14004C10.9318 5.87863 10.9318 5.45479 11.1933 5.19337C11.4547 4.93196 11.8785 4.93196 12.1399 5.19337Z"
                fill="#fff"
              />
            </svg>
          </NavLink>

          <div className={styles.menu_footer_title}>
            <img src={cloudIcon} alt="icon" />
            <span>My Storage</span>
          </div>

          <div className={styles.storage_progress_wrap}>
            <div
              className={styles.storage_progress_bar}
              style={{
                width: `${usedSpacePercentage}%`,
                backgroundColor: progressBarColor(usedSpacePercentage),
              }}></div>
          </div>
          <span>You have used {convertBytesToMB(diskUsedSpace)} MB out of 1 GB.</span>
        </div>
      </div>
    </nav>
  );
};

export default MenuBlock;
