import React from 'react';

import downloadFileIcon from '../../assets/img/storage-icons/download_file.svg';
import deleteFileIcon from '../../assets/img/storage-icons/delete_file.svg';
import documentIcon from '../../assets/img/storage-icons/document-icon.svg';
import imgIcon from '../../assets/img/storage-icons/img-icon.svg';
import videoIcon from '../../assets/img/storage-icons/video.svg';

import styles from './FileItem.module.css';
import { IFile } from '../../interfaces/IFiles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteFileState } from '../../redux/file/filesSlice';

const FileItem: React.FC<IFile> = ({ originalName, _id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSlice.user);

  const downloadFile = async (fileName: string, userId: string | undefined) => {
    try {
      await axios
        .get('https://skybox-server-17db72aab202.herokuapp.com/dowloadfile', {
          params: { fileName, userId },
          responseType: 'blob',
        })
        .then((response) => {
          const href = window.URL.createObjectURL(response.data);
          const linkElem = document.createElement('a');
          linkElem.href = href;
          linkElem.download = fileName;

          document.body.appendChild(linkElem);
          linkElem.click();
          document.body.removeChild(linkElem);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = async (fileName: string, userId: string | undefined, fileId: string) => {
    try {
      const response = await axios.delete(
        'https://skybox-server-17db72aab202.herokuapp.com/deletefile',
        {
          data: { fileName, userId, fileId },
        },
      );

      if (response.status === 200) {
        dispatch(deleteFileState(fileId));
        const currentUserFromLC = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedFiles = currentUserFromLC.files.filter((id: string) => id !== fileId);
        const updatedUserData = { ...currentUserFromLC, files: updatedFiles };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (
      extension === 'jpg' ||
      extension === 'jpeg' ||
      extension === 'png' ||
      extension === 'gif' ||
      extension === 'svg'
    ) {
      return imgIcon;
    } else if (extension === 'mp4' || extension === 'avi' || extension === 'mov') {
      return videoIcon;
    } else if (extension === 'pdf' || extension === 'doc' || extension === 'docx') {
      return documentIcon;
    } else {
      return documentIcon;
    }
  };

  return (
    <div className={styles.file_item_wrap}>
      <img className={styles.file_item_icon} src={getFileIcon(originalName)} alt="icon" />
      <span className={styles.file_item_name}>{originalName}</span>
      <div className={styles.file_item_tools}>
        <button
          className={styles.file_item_tools_btn}
          onClick={() => downloadFile(originalName, user?._id)}>
          <img className={styles.file_item_tools_icon} src={downloadFileIcon} alt="download" />
        </button>
        <button
          className={styles.file_item_tools_btn}
          onClick={() => deleteFile(originalName, user?._id, _id)}>
          <img className={styles.file_item_tools_icon} src={deleteFileIcon} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default FileItem;
