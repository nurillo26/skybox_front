import React from 'react';

import styles from './Storage.module.css';
import FileItem from '../FileItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios, { AxiosProgressEvent } from 'axios';
import { addFile, setUploadProgress } from '../../redux/file/filesSlice';
import StorageEmpty from '../StorageEmpty';
import LoadingFilesSpinner from '../LoadingFilesSpinner';
import { IFile } from '../../interfaces/IFiles';

const Storage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const { files, status } = useSelector((state: RootState) => state.filesSlice);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<IFile[]>([]);

  const [bgColor, setBgColor] = React.useState<string>('#fff');

  React.useEffect(() => {
    if (searchValue.trim() === '') {
      setSearchResults([]);
    } else {
      setSearchResults(
        files.filter((file) =>
          file.originalName.toLowerCase().includes(searchValue.trim().toLowerCase()),
        ),
      );
    }
  }, [searchValue]);

  const uploadFile = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user?._id || '');

      try {
        const response = await axios.post(
          'https://skybox-server-17db72aab202.herokuapp.com/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total,
                );

                dispatch(setUploadProgress(percentCompleted));
              }
            },
          },
        );

        dispatch(addFile(response.data.file));
        const currentUserFromLC = JSON.parse(localStorage.getItem('user') || '{}');
        currentUserFromLC.files.push(response.data.file._id);
        localStorage.setItem('user', JSON.stringify(currentUserFromLC));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileInputChange = (event: any) => {
    uploadFile(event.target.files[0]);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setBgColor('#fff');

    uploadFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    setBgColor('#A0D1F1');
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    setBgColor('#fff');
  };

  return (
    <div className={styles.storage_wrap}>
      <div className={styles.storage_header}>
        <div className={styles.storage_header_title}>
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5469 16.1354C10.8155 16.1354 11.0406 16.0446 11.2223 15.8629C11.4039 15.6812 11.4948 15.4561 11.4948 15.1875C11.4948 14.9189 11.4039 14.6938 11.2223 14.5121C11.0406 14.3304 10.8155 14.2396 10.5469 14.2396C10.2783 14.2396 10.0532 14.3304 9.87148 14.5121C9.6898 14.6938 9.59896 14.9189 9.59896 15.1875C9.59896 15.4561 9.6898 15.6812 9.87148 15.8629C10.0532 16.0446 10.2783 16.1354 10.5469 16.1354ZM13.8646 16.1354C14.1332 16.1354 14.3583 16.0446 14.54 15.8629C14.7217 15.6812 14.8125 15.4561 14.8125 15.1875C14.8125 14.9189 14.7217 14.6938 14.54 14.5121C14.3583 14.3304 14.1332 14.2396 13.8646 14.2396C13.596 14.2396 13.3709 14.3304 13.1892 14.5121C13.0075 14.6938 12.9167 14.9189 12.9167 15.1875C12.9167 15.4561 13.0075 15.6812 13.1892 15.8629C13.3709 16.0446 13.596 16.1354 13.8646 16.1354ZM0.59375 10.6849V1.44272C0.59375 1.06355 0.735937 0.731781 1.02031 0.447406C1.30469 0.163031 1.63646 0.0208435 2.01562 0.0208435H16.2344C16.6135 0.0208435 16.9453 0.163031 17.2297 0.447406C17.5141 0.731781 17.6562 1.06355 17.6562 1.44272V10.6849H0.59375ZM2.01562 18.9792C1.63646 18.9792 1.30469 18.837 1.02031 18.5526C0.735937 18.2682 0.59375 17.9365 0.59375 17.5573V12.1068H17.6562V17.5573C17.6562 17.9365 17.5141 18.2682 17.2297 18.5526C16.9453 18.837 16.6135 18.9792 16.2344 18.9792H2.01562Z"
              fill="#2E2E2E"
            />
          </svg>
          <span>Storage</span>
        </div>

        {/* ПОИСК */}
        <div className={styles.search_block}>
          <svg
            className={styles.search_icon}
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.5436 12.6297C12.3483 12.825 12.0317 12.825 11.8365 12.6297L8.13587 8.92914C7.95039 8.74365 7.65483 8.7365 7.43548 8.88036C7.19387 9.03882 6.92894 9.17034 6.64069 9.27494C6.1967 9.43605 5.72425 9.51661 5.22334 9.51661C4.02154 9.51661 3.00442 9.09994 2.17199 8.26661C1.33956 7.43328 0.92334 6.42772 0.92334 5.24994C0.92334 4.07217 1.34001 3.06661 2.17334 2.23328C3.00667 1.39994 4.01501 0.983276 5.19834 0.983276C6.38167 0.983276 7.38723 1.39994 8.21501 2.23328C9.04278 3.06661 9.45667 4.073 9.45667 5.25244C9.45667 5.72855 9.3789 6.18883 9.22334 6.63328C9.11527 6.94206 8.96965 7.23743 8.78649 7.51939C8.64731 7.73366 8.66085 8.01975 8.8422 8.19972L12.5671 11.8964C12.7636 12.0914 12.7642 12.4091 12.5684 12.6048L12.5436 12.6297ZM5.20667 8.51661C6.10945 8.51661 6.87681 8.19717 7.50876 7.55828C8.1407 6.91939 8.45667 6.14994 8.45667 5.24994C8.45667 4.34994 8.1407 3.5805 7.50876 2.94161C6.87681 2.30272 6.10945 1.98328 5.20667 1.98328C4.29464 1.98328 3.51941 2.30272 2.88097 2.94161C2.24255 3.5805 1.92334 4.34994 1.92334 5.24994C1.92334 6.14994 2.24255 6.91939 2.88097 7.55828C3.51941 8.19717 4.29464 8.51661 5.20667 8.51661Z"
              fill="#757575"
              stroke="#757575"
              strokeWidth="0.3"
            />
          </svg>
          <input
            className={styles.search_input}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search here..."
          />
          {searchValue && (
            <svg
              onClick={() => setSearchValue('')}
              className={styles.search_clear_btn}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L11 11M1 11L11 1"
                stroke="#757575"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>

      <div className={styles.storage_body}>
        <div className={styles.storage_body_title}>
          <span className={styles.body_title}>My Files</span>

          {/* можно позже сделать отображение файлов (плиткой, строчкой) */}

          <div className={styles.new_file_block}>
            <label>
              <input style={{ display: 'none' }} type="file" onChange={handleFileInputChange} />
              <span className={styles.add_file_btn}>+ New</span>
            </label>
          </div>
        </div>
        <div
          className={
            files.length === 0 || (searchResults.length === 0 && searchValue.trim() !== '')
              ? styles.storage_body_file_list
              : styles.storage_body_file_list_grid
          }
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{ backgroundColor: bgColor }}>
          {searchResults.length === 0 && searchValue.trim() === '' ? (
            <>
              {status === 'loading' && <LoadingFilesSpinner />}
              {status === 'idle' && files.length === 0 && <StorageEmpty />}
              {status === 'succeeded' && files.length === 0 && <StorageEmpty />}
              {status === 'idle' &&
                files.length > 0 &&
                files.map((file) => <FileItem key={file._id} {...file} />)}
              {status === 'succeeded' && files.map((file) => <FileItem key={file._id} {...file} />)}
              {status === 'failed' && (
                <div className={styles.storage_error}>Упс, ошибка, попробуйте позже</div>
              )}
            </>
          ) : (
            <>
              {searchResults.length === 0 ? (
                <div className={styles.search_not_found}>Совпадений нет</div>
              ) : (
                searchResults.map((file) => <FileItem key={file._id} {...file} />)
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Storage;
