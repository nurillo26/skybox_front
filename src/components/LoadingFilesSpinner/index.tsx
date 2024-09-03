import styles from './LoadingFilesSpinner.module.css';
import { Watch } from 'react-loader-spinner';

const LoadingFilesSpinner = () => {
  return (
    <div className={styles.spinner_wrap}>
      <Watch
        visible={true}
        height="80"
        width="80"
        radius="48"
        color="#37A0F4"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingFilesSpinner;
